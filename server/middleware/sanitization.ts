import { Request, Response, NextFunction } from "express";

interface SanitizationRequest extends Request {
  query?: any;
  body?: any;
}

// XSS sanitization patterns
const XSS_PATTERNS = {
  SCRIPT_TAG: /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
  JAVASCRIPT_URL: /javascript:/gi,
  EVENT_HANDLERS: /on\w+=/gi,
  DATA_URL: /data:[^;]*;base64/gi,
  VBSCRIPT: /vbscript:/gi,
} as const;

// Sanitize a single string value
function sanitizeString(value: string): string {
  return Object.values(XSS_PATTERNS).reduce(
    (sanitized, pattern) => sanitized.replace(pattern, ""),
    value
  );
}

// Recursively sanitize object properties
function sanitizeObject(obj: any, maxDepth = 10): void {
  if (maxDepth <= 0 || !obj || typeof obj !== "object") return;

  Object.keys(obj).forEach((key) => {
    if (typeof obj[key] === "string") {
      obj[key] = sanitizeString(obj[key]);
    } else if (Array.isArray(obj[key])) {
      obj[key].forEach((item: any, index: number) => {
        if (typeof item === "string") {
          obj[key][index] = sanitizeString(item);
        } else if (typeof item === "object") {
          sanitizeObject(item, maxDepth - 1);
        }
      });
    } else if (typeof obj[key] === "object" && obj[key] !== null) {
      sanitizeObject(obj[key], maxDepth - 1);
    }
  });
}

// Sanitize query parameters
function sanitizeQueryParams(query: any): void {
  if (!query || typeof query !== "object") return;
  
  Object.keys(query).forEach((key) => {
    if (typeof query[key] === "string") {
      query[key] = sanitizeString(query[key]);
    } else if (Array.isArray(query[key])) {
      query[key] = query[key].map((value: any) => 
        typeof value === "string" ? sanitizeString(value) : value
      );
    }
  });
}

// Main sanitization middleware
export function sanitizeRequest(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const sanReq = req as SanitizationRequest;
  
  try {
    // Sanitize query parameters
    if (sanReq.query) {
      sanitizeQueryParams(sanReq.query);
    }

    // Sanitize request body
    if (sanReq.body && typeof sanReq.body === "object") {
      sanitizeObject(sanReq.body);
    }

    next();
  } catch (error) {
    console.error("Request sanitization error:", error);
    next(); // Continue even if sanitization fails
  }
}

export { sanitizeString, sanitizeObject, sanitizeQueryParams };