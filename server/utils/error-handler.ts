import { Request, Response, NextFunction } from "express";
import { ZodError } from "zod";
import { logError, logWarn } from "./logger";
import { config } from "../config/constants";

// Standard error response interface
export interface ErrorResponse {
  success: false;
  error: {
    type: string;
    message: string;
    code?: string;
    details?: any;
    stack?: string;
  };
  timestamp: string;
  requestId?: string;
  path?: string;
}

// Error types for better categorization
export enum ErrorType {
  VALIDATION_ERROR = "validation_error",
  AUTHENTICATION_ERROR = "authentication_error",
  AUTHORIZATION_ERROR = "authorization_error",
  NOT_FOUND_ERROR = "not_found_error",
  RATE_LIMIT_ERROR = "rate_limit_error",
  DATABASE_ERROR = "database_error",
  EXTERNAL_SERVICE_ERROR = "external_service_error",
  INTERNAL_ERROR = "internal_error",
  NETWORK_ERROR = "network_error",
  CONFIGURATION_ERROR = "configuration_error",
}

// Custom error classes for better error handling
export class AppError extends Error {
  public readonly type: ErrorType;
  public readonly statusCode: number;
  public readonly isOperational: boolean;
  public readonly details?: any;

  constructor(
    message: string,
    type: ErrorType = ErrorType.INTERNAL_ERROR,
    statusCode: number = 500,
    isOperational: boolean = true,
    details?: any,
  ) {
    super(message);
    this.type = type;
    this.statusCode = statusCode;
    this.isOperational = isOperational;
    this.details = details;

    Error.captureStackTrace(this, this.constructor);
  }
}

export class ValidationError extends AppError {
  constructor(message: string, details?: any) {
    super(message, ErrorType.VALIDATION_ERROR, 400, true, details);
  }
}

export class AuthenticationError extends AppError {
  constructor(message: string = "Authentication required") {
    super(message, ErrorType.AUTHENTICATION_ERROR, 401, true);
  }
}

export class AuthorizationError extends AppError {
  constructor(message: string = "Insufficient permissions") {
    super(message, ErrorType.AUTHORIZATION_ERROR, 403, true);
  }
}

export class NotFoundError extends AppError {
  constructor(resource: string = "Resource") {
    super(`${resource} not found`, ErrorType.NOT_FOUND_ERROR, 404, true);
  }
}

export class RateLimitError extends AppError {
  constructor(retryAfter?: number) {
    super("Rate limit exceeded", ErrorType.RATE_LIMIT_ERROR, 429, true, {
      retryAfter,
    });
  }
}

export class DatabaseError extends AppError {
  constructor(message: string, details?: any) {
    super(message, ErrorType.DATABASE_ERROR, 500, true, details);
  }
}

export class ExternalServiceError extends AppError {
  constructor(service: string, message?: string) {
    super(
      message || `External service ${service} is unavailable`,
      ErrorType.EXTERNAL_SERVICE_ERROR,
      503,
      true,
      { service },
    );
  }
}

// Error handler middleware
export function errorHandler(
  error: Error | AppError,
  req: Request,
  res: Response,
  next: NextFunction,
): void {
  // Generate request ID if not present
  const requestId =
    (req.headers["x-request-id"] as string) ||
    `req_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

  let errorResponse: ErrorResponse;
  let statusCode = 500;

  if (error instanceof AppError) {
    // Handle custom application errors
    statusCode = error.statusCode;
    errorResponse = {
      success: false,
      error: {
        type: error.type,
        message: error.message,
        details: error.details,
        ...(config.logging.errorStackTracesInProduction && {
          stack: error.stack,
        }),
      },
      timestamp: new Date().toISOString(),
      requestId,
      path: req.path,
    };

    // Log based on severity
    if (error.statusCode >= 500) {
      logError(error, `AppError: ${error.type}`);
    } else {
      logWarn(error.message, {
        type: error.type,
        statusCode: error.statusCode,
        path: req.path,
        method: req.method,
        requestId,
      });
    }
  } else if (error instanceof ZodError) {
    // Handle Zod validation errors
    statusCode = 400;
    errorResponse = {
      success: false,
      error: {
        type: ErrorType.VALIDATION_ERROR,
        message: "Validation failed",
        details: error.errors.map((err) => ({
          field: err.path.join("."),
          message: err.message,
          code: err.code,
        })),
      },
      timestamp: new Date().toISOString(),
      requestId,
      path: req.path,
    };

    logWarn("Validation error", {
      errors: error.errors,
      path: req.path,
      method: req.method,
      requestId,
    });
  } else {
    // Handle unexpected errors
    statusCode = 500;
    errorResponse = {
      success: false,
      error: {
        type: ErrorType.INTERNAL_ERROR,
        message:
          config.server.env === "production"
            ? "An unexpected error occurred"
            : error.message,
        ...(config.logging.errorStackTracesInProduction && {
          stack: error.stack,
        }),
      },
      timestamp: new Date().toISOString(),
      requestId,
      path: req.path,
    };

    logError(error, "Unhandled error");
  }

  // Set security headers
  res.setHeader("X-Content-Type-Options", "nosniff");
  res.setHeader("X-Frame-Options", "DENY");

  // Send error response
  res.status(statusCode).json(errorResponse);
}

// Async error wrapper
export function asyncErrorHandler<T extends any[]>(
  fn: (...args: T) => Promise<any>,
) {
  return (...args: T) => {
    const [req, res, next] = args as unknown as [
      Request,
      Response,
      NextFunction,
    ];
    Promise.resolve(fn(...args)).catch(next);
  };
}

// 404 handler for unmatched routes
export function notFoundHandler(req: Request, res: Response): void {
  const errorResponse: ErrorResponse = {
    success: false,
    error: {
      type: ErrorType.NOT_FOUND_ERROR,
      message: `Route ${req.method} ${req.path} not found`,
    },
    timestamp: new Date().toISOString(),
    requestId: req.headers["x-request-id"] as string,
    path: req.path,
  };

  logWarn("Route not found", {
    method: req.method,
    path: req.path,
    userAgent: req.headers["user-agent"],
    ip: req.ip,
  });

  res.status(404).json(errorResponse);
}

// Health check error responses
export function createHealthCheckError(
  service: string,
  status: "degraded" | "unhealthy",
  details?: any,
): ErrorResponse {
  return {
    success: false,
    error: {
      type: ErrorType.EXTERNAL_SERVICE_ERROR,
      message: `Service ${service} is ${status}`,
      details,
    },
    timestamp: new Date().toISOString(),
  };
}

// Database connection error handler
export function handleDatabaseError(error: any): DatabaseError {
  let message = "Database operation failed";
  let details: any = {};

  // PostgreSQL specific error handling
  if (error.code) {
    switch (error.code) {
      case "23505": // unique_violation
        message = "Resource already exists";
        details = { constraint: error.constraint };
        break;
      case "23503": // foreign_key_violation
        message = "Referenced resource does not exist";
        details = { constraint: error.constraint };
        break;
      case "23502": // not_null_violation
        message = "Required field is missing";
        details = { column: error.column };
        break;
      case "ECONNREFUSED":
        message = "Database connection refused";
        break;
      case "ETIMEDOUT":
        message = "Database operation timed out";
        break;
      default:
        details = { code: error.code };
    }
  }

  return new DatabaseError(message, details);
}

// Rate limiting error with retry information
export function createRateLimitError(
  windowMs: number,
  maxAttempts: number,
): RateLimitError {
  const retryAfter = Math.ceil(windowMs / 1000);
  return new RateLimitError(retryAfter);
}

// Request timeout handler
export function createTimeoutError(timeoutMs: number): AppError {
  return new AppError(
    `Request timed out after ${timeoutMs}ms`,
    ErrorType.NETWORK_ERROR,
    408,
    true,
    { timeout: timeoutMs },
  );
}

// Circuit breaker error
export function createCircuitBreakerError(
  service: string,
): ExternalServiceError {
  return new ExternalServiceError(
    service,
    `Circuit breaker is open for ${service}. Service temporarily unavailable.`,
  );
}

// Configuration validation error
export function createConfigurationError(
  setting: string,
  expected: string,
): AppError {
  return new AppError(
    `Invalid configuration for ${setting}. Expected: ${expected}`,
    ErrorType.CONFIGURATION_ERROR,
    500,
    false,
  );
}

// Export commonly used error creators
export const errors = {
  validation: (message: string, details?: any) =>
    new ValidationError(message, details),
  authentication: (message?: string) => new AuthenticationError(message),
  authorization: (message?: string) => new AuthorizationError(message),
  notFound: (resource?: string) => new NotFoundError(resource),
  rateLimit: (retryAfter?: number) => new RateLimitError(retryAfter),
  database: (message: string, details?: any) =>
    new DatabaseError(message, details),
  externalService: (service: string, message?: string) =>
    new ExternalServiceError(service, message),
  internal: (message: string) =>
    new AppError(message, ErrorType.INTERNAL_ERROR, 500, true),
};
