import { Request, Response, NextFunction } from "express";
import { z } from "zod";
import { fromZodError } from "zod-validation-error";
import { logError, logWarn } from "../utils/logger";
import { rateLimitConfig } from "../config/constants";

// Enhanced request interface with proper typing
interface ValidatedRequest extends Request {
  body: any;
  query: any;
  params: any;
  validatedData?: {
    body?: any;
    query?: any;
    params?: any;
  };
}

// Standard validation response interface
interface ValidationErrorResponse {
  success: false;
  error: {
    type: "validation_error";
    message: string;
    details: Array<{
      field: string;
      message: string;
      code: string;
    }>;
  };
  timestamp: string;
  requestId?: string;
}

// Unified validation middleware factory
export function validateWithZod<
  TBody = any,
  TQuery = any,
  TParams = any,
>(schemas: {
  body?: z.ZodSchema<TBody>;
  query?: z.ZodSchema<TQuery>;
  params?: z.ZodSchema<TParams>;
}) {
  return async (
    req: ValidatedRequest,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const validatedData: any = {};
      const errors: Array<{ field: string; message: string; code: string }> =
        [];

      // Validate request body
      if (schemas.body && req.body !== undefined) {
        const bodyResult = schemas.body.safeParse(req.body);
        if (bodyResult.success) {
          validatedData.body = bodyResult.data;
        } else {
          const zodError = fromZodError(bodyResult.error);
          errors.push({
            field: "body",
            message: zodError.message,
            code: "INVALID_BODY",
          });
        }
      }

      // Validate query parameters
      if (schemas.query && req.query !== undefined) {
        const queryResult = schemas.query.safeParse(req.query);
        if (queryResult.success) {
          validatedData.query = queryResult.data;
        } else {
          const zodError = fromZodError(queryResult.error);
          errors.push({
            field: "query",
            message: zodError.message,
            code: "INVALID_QUERY",
          });
        }
      }

      // Validate route parameters
      if (schemas.params && req.params !== undefined) {
        const paramsResult = schemas.params.safeParse(req.params);
        if (paramsResult.success) {
          validatedData.params = paramsResult.data;
        } else {
          const zodError = fromZodError(paramsResult.error);
          errors.push({
            field: "params",
            message: zodError.message,
            code: "INVALID_PARAMS",
          });
        }
      }

      // Handle validation errors
      if (errors.length > 0) {
        const errorResponse: ValidationErrorResponse = {
          success: false,
          error: {
            type: "validation_error",
            message: "Request validation failed",
            details: errors,
          },
          timestamp: new Date().toISOString(),
          requestId: req.headers["x-request-id"] as string,
        };

        logWarn("Request validation failed", {
          url: req.url,
          method: req.method,
          errors: errors,
          userAgent: req.headers["user-agent"],
          ip: req.ip,
        });

        res.status(400).json(errorResponse);
        return;
      }

      // Attach validated data to request
      req.validatedData = validatedData;
      next();
    } catch (error) {
      logError(error as Error, "Validation middleware error");

      const errorResponse: ValidationErrorResponse = {
        success: false,
        error: {
          type: "validation_error",
          message: "Internal validation error",
          details: [
            {
              field: "server",
              message: "An unexpected error occurred during validation",
              code: "INTERNAL_ERROR",
            },
          ],
        },
        timestamp: new Date().toISOString(),
        requestId: req.headers["x-request-id"] as string,
      };

      res.status(500).json(errorResponse);
    }
  };
}

// Pre-defined validation schemas for common use cases
export const commonSchemas = {
  // Pagination validation
  pagination: z.object({
    page: z.coerce.number().min(1).default(1),
    limit: z.coerce.number().min(1).max(100).default(20),
    sortBy: z.string().optional(),
    sortOrder: z.enum(["asc", "desc"]).default("desc"),
  }),

  // User authentication
  userLogin: z.object({
    username: z
      .string()
      .min(3, "Username must be at least 3 characters")
      .max(50, "Username must not exceed 50 characters")
      .regex(
        /^[a-zA-Z0-9_-]+$/,
        "Username can only contain letters, numbers, hyphens, and underscores",
      ),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .max(128, "Password must not exceed 128 characters"),
  }),

  userRegistration: z
    .object({
      username: z
        .string()
        .min(3, "Username must be at least 3 characters")
        .max(50, "Username must not exceed 50 characters")
        .regex(
          /^[a-zA-Z0-9_-]+$/,
          "Username can only contain letters, numbers, hyphens, and underscores",
        ),
      password: z
        .string()
        .min(8, "Password must be at least 8 characters")
        .max(128, "Password must not exceed 128 characters")
        .regex(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
          "Password must contain at least one lowercase letter, one uppercase letter, and one number",
        ),
      confirmPassword: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: "Passwords don't match",
      path: ["confirmPassword"],
    }),

  // ID validation
  numericId: z.object({
    id: z.coerce.number().min(1, "ID must be a positive number"),
  }),

  // Search and filtering
  searchQuery: z.object({
    q: z
      .string()
      .min(1, "Search query cannot be empty")
      .max(200, "Search query too long"),
    category: z.string().optional(),
    tags: z.array(z.string()).optional(),
  }),
};

// Enhanced error handling for async route handlers
export function asyncHandler(
  fn: (
    req: ValidatedRequest,
    res: Response,
    next: NextFunction,
  ) => Promise<any>,
) {
  return (req: ValidatedRequest, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
}

// Rate limiting with validation integration
export function validateAndRateLimit<T = any>(
  schema: z.ZodSchema<T>,
  options: {
    windowMs?: number;
    maxAttempts?: number;
    skipSuccessfulRequests?: boolean;
  } = {},
) {
  const {
    windowMs = rateLimitConfig.generalWindow,
    maxAttempts = rateLimitConfig.generalMaxRequests,
    skipSuccessfulRequests = false,
  } = options;

  // Simple in-memory rate limiting (replace with Redis in production)
  const attempts = new Map<string, { count: number; resetTime: number }>();

  return [
    // Rate limiting middleware
    (req: ValidatedRequest, res: Response, next: NextFunction) => {
      const key = `${req.ip}_${req.method}_${req.path}`;
      const now = Date.now();
      const windowStart = now - windowMs;

      // Clean up old entries
      for (const [k, v] of attempts.entries()) {
        if (v.resetTime < windowStart) {
          attempts.delete(k);
        }
      }

      const current = attempts.get(key) || {
        count: 0,
        resetTime: now + windowMs,
      };

      if (current.count >= maxAttempts) {
        res.status(429).json({
          success: false,
          error: {
            type: "rate_limit_exceeded",
            message: "Too many requests",
            retryAfter: Math.ceil((current.resetTime - now) / 1000),
          },
          timestamp: new Date().toISOString(),
        });
        return;
      }

      current.count++;
      attempts.set(key, current);
      next();
    },
    // Validation middleware
    validateWithZod({ body: schema }),
  ];
}

// Type-safe request handler with validation
export function createValidatedRoute<TBody = any, TQuery = any, TParams = any>(
  schemas: {
    body?: z.ZodSchema<TBody>;
    query?: z.ZodSchema<TQuery>;
    params?: z.ZodSchema<TParams>;
  },
  handler: (
    req: ValidatedRequest & {
      validatedData: {
        body?: TBody;
        query?: TQuery;
        params?: TParams;
      };
    },
    res: Response,
  ) => Promise<void> | void,
) {
  return [
    validateWithZod(schemas),
    asyncHandler(async (req: ValidatedRequest, res: Response) => {
      await handler(req as any, res);
    }),
  ];
}

// Export helper types for better TypeScript support
export type { ValidatedRequest, ValidationErrorResponse };
