import { Request, Response, NextFunction } from "express";
import { securityConfig, getSecurityHeaders } from "../config/security";
import { logWarn, logError } from "../utils/logger";

// Enhanced request interface
interface SecurityRequest extends Request {
  ip?: string;
  get?: (header: string) => string | undefined;
  headers: any;
  body: any;
  query: any;
  method: string;
}

// Security headers middleware
export function securityHeaders(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const headers = getSecurityHeaders();
  
  Object.entries(headers).forEach(([name, value]) => {
    res.setHeader(name, value);
  });

  next();
}

// Request sanitization middleware
export function sanitizeRequest(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const secReq = req as SecurityRequest;
  
  // Sanitize query parameters
  if (secReq.query) {
    Object.keys(secReq.query).forEach(key => {
      if (typeof secReq.query[key] === 'string') {
        // Basic XSS prevention
        secReq.query[key] = secReq.query[key]
          .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
          .replace(/javascript:/gi, '')
          .replace(/on\w+=/gi, '');
      }
    });
  }

  // Sanitize request body for potential XSS
  if (secReq.body && typeof secReq.body === 'object') {
    sanitizeObject(secReq.body);
  }

  next();
}

// Recursive object sanitization
function sanitizeObject(obj: any): void {
  Object.keys(obj).forEach(key => {
    if (typeof obj[key] === 'string') {
      obj[key] = obj[key]
        .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
        .replace(/javascript:/gi, '')
        .replace(/on\w+=/gi, '');
    } else if (typeof obj[key] === 'object' && obj[key] !== null) {
      sanitizeObject(obj[key]);
    }
  });
}

// IP-based request monitoring
export function requestMonitoring(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const secReq = req as SecurityRequest;
  const clientIP = secReq.ip || 
    secReq.get?.('x-forwarded-for') || 
    secReq.get?.('x-real-ip') || 
    'unknown';

  // Log suspicious patterns
  const suspiciousPatterns = [
    /\.\./,  // Path traversal
    /<script/i,  // XSS attempts
    /union.*select/i,  // SQL injection
    /exec\(/i,  // Code injection
    /eval\(/i,  // Code injection
  ];

  const requestString = JSON.stringify({
    method: secReq.method,
    url: secReq.url,
    body: secReq.body,
    query: secReq.query
  });

  const isSuspicious = suspiciousPatterns.some(pattern => 
    pattern.test(requestString)
  );

  if (isSuspicious) {
    logWarn('Suspicious request detected', {
      ip: clientIP,
      method: secReq.method,
      url: secReq.url,
      userAgent: secReq.get?.('user-agent'),
      timestamp: new Date().toISOString()
    });
  }

  next();
}

// Brute force protection
const loginAttempts = new Map<string, { count: number; lastAttempt: number }>();

export function bruteForceProtection(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const secReq = req as SecurityRequest;
  
  // Only apply to authentication endpoints
  if (!secReq.url?.includes('/auth/')) {
    return next();
  }

  const clientIP = secReq.ip || 'unknown';
  const now = Date.now();
  const windowMs = 15 * 60 * 1000; // 15 minutes
  const maxAttempts = 5;

  const attempts = loginAttempts.get(clientIP);
  
  if (attempts) {
    // Reset counter if window has passed
    if (now - attempts.lastAttempt > windowMs) {
      loginAttempts.delete(clientIP);
    } else if (attempts.count >= maxAttempts) {
      logWarn('Brute force attempt blocked', {
        ip: clientIP,
        attempts: attempts.count,
        timestamp: new Date().toISOString()
      });
      
      return res.status(429).json({
        error: 'Too many login attempts. Please try again later.',
        retryAfter: Math.ceil((windowMs - (now - attempts.lastAttempt)) / 1000),
        timestamp: new Date().toISOString()
      });
    }
  }

  // Track failed attempts (will be called from auth middleware)
  res.locals.trackFailedAttempt = () => {
    const current = loginAttempts.get(clientIP) || { count: 0, lastAttempt: 0 };
    loginAttempts.set(clientIP, {
      count: current.count + 1,
      lastAttempt: now
    });
  };

  // Clear attempts on successful login
  res.locals.clearAttempts = () => {
    loginAttempts.delete(clientIP);
  };

  next();
}

// Content-Type validation
export function validateContentType(allowedTypes: string[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    const secReq = req as SecurityRequest;
    
    if (['POST', 'PUT', 'PATCH'].includes(secReq.method)) {
      const contentType = secReq.get?.('content-type') || '';
      const isAllowed = allowedTypes.some(type => 
        contentType.includes(type)
      );

      if (!isAllowed) {
        return res.status(415).json({
          error: 'Unsupported content type',
          allowed: allowedTypes,
          received: contentType,
          timestamp: new Date().toISOString()
        });
      }
    }

    next();
  };
}

// Rate limiting by endpoint
const endpointLimits = new Map<string, Map<string, { count: number; reset: number }>>();

export function endpointRateLimit(maxRequests: number, windowMs: number) {
  return (req: Request, res: Response, next: NextFunction) => {
    const secReq = req as SecurityRequest;
    const clientIP = secReq.ip || 'unknown';
    const endpoint = secReq.url || 'unknown';
    const now = Date.now();

    if (!endpointLimits.has(endpoint)) {
      endpointLimits.set(endpoint, new Map());
    }

    const endpointMap = endpointLimits.get(endpoint)!;
    const clientData = endpointMap.get(clientIP);

    if (clientData) {
      if (now > clientData.reset) {
        // Reset window
        endpointMap.set(clientIP, { count: 1, reset: now + windowMs });
      } else if (clientData.count >= maxRequests) {
        return res.status(429).json({
          error: 'Rate limit exceeded for this endpoint',
          retryAfter: Math.ceil((clientData.reset - now) / 1000),
          timestamp: new Date().toISOString()
        });
      } else {
        clientData.count++;
      }
    } else {
      endpointMap.set(clientIP, { count: 1, reset: now + windowMs });
    }

    next();
  };
}