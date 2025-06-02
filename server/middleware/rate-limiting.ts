import rateLimit from "express-rate-limit";
import { logWarn } from "../utils/logger";

// Configuration from environment variables
const AUTH_WINDOW_MS = parseInt(process.env.AUTH_RATE_WINDOW_MS || "900000"); // 15 minutes
const AUTH_MAX_ATTEMPTS = parseInt(process.env.AUTH_RATE_MAX_ATTEMPTS || "5"); // 5 attempts per window
const GENERAL_WINDOW_MS = parseInt(process.env.GENERAL_RATE_WINDOW_MS || "900000"); // 15 minutes  
const GENERAL_MAX_REQUESTS = parseInt(process.env.GENERAL_RATE_MAX_REQUESTS || "100"); // 100 requests per window

// Authentication rate limiter - stricter limits for auth endpoints
export const authRateLimiter = rateLimit({
  windowMs: AUTH_WINDOW_MS,
  max: AUTH_MAX_ATTEMPTS,
  message: {
    error: "Too many authentication attempts. Please try again later.",
    retryAfter: Math.ceil(AUTH_WINDOW_MS / 1000),
    timestamp: new Date().toISOString()
  },
  standardHeaders: true,
  legacyHeaders: false,
  onLimitReached: (req, res, options) => {
    logWarn('Authentication rate limit exceeded', {
      ip: req.ip,
      userAgent: req.get('User-Agent'),
      endpoint: req.originalUrl,
      method: req.method,
      timestamp: new Date().toISOString()
    });
  }
});

// General API rate limiter
export const generalRateLimiter = rateLimit({
  windowMs: GENERAL_WINDOW_MS,
  max: GENERAL_MAX_REQUESTS,
  message: {
    error: "Too many requests. Please try again later.",
    retryAfter: Math.ceil(GENERAL_WINDOW_MS / 1000),
    timestamp: new Date().toISOString()
  },
  standardHeaders: true,
  legacyHeaders: false
});

// Authentication rate limiter - stricter limits for auth endpoints
export const authRateLimiter = rateLimit({
  windowMs: AUTH_WINDOW_MS,
  max: AUTH_MAX_ATTEMPTS,
  keyGenerator: (req: any) => {
    const ip = getClientIP(req);
    const userAgent = req.get('User-Agent') || 'unknown';
    // Combine IP and User-Agent hash for better tracking
    return `auth:${ip}:${Buffer.from(userAgent).toString('base64').substring(0, 10)}`;
  },
  handler: (req: any, res: any) => {
    const ip = getClientIP(req);
    logWarn('Authentication rate limit exceeded', {
      ip,
      userAgent: req.get('User-Agent'),
      endpoint: req.path,
      method: req.method,
      timestamp: new Date().toISOString()
    });
    
    res.status(429).json({
      error: "Too many authentication attempts. Please try again later.",
      retryAfter: Math.ceil(AUTH_WINDOW_MS / 1000),
      timestamp: new Date().toISOString()
    });
  },
  standardHeaders: true,
  legacyHeaders: false,
  skip: (req: any) => {
    // Skip rate limiting for successful logout (not a security risk)
    return req.path === '/api/auth/logout' && req.method === 'POST';
  }
});

// General API rate limiter
export const generalRateLimiter = rateLimit({
  windowMs: GENERAL_WINDOW_MS,
  max: GENERAL_MAX_REQUESTS,
  keyGenerator: (req: Request) => getClientIP(req),
  handler: (req: Request, res: Response) => {
    const ip = getClientIP(req);
    logWarn('General rate limit exceeded', {
      ip,
      userAgent: req.get('User-Agent'),
      endpoint: req.path,
      method: req.method
    });
    
    res.status(429).json({
      error: "Too many requests. Please try again later.",
      retryAfter: Math.ceil(GENERAL_WINDOW_MS / 1000),
      timestamp: new Date().toISOString()
    });
  },
  standardHeaders: true,
  legacyHeaders: false
});

// Strict rate limiter for sensitive operations
export const strictRateLimiter = rateLimit({
  windowMs: 60000, // 1 minute
  max: 3, // 3 attempts per minute
  keyGenerator: (req: Request) => getClientIP(req),
  handler: (req: Request, res: Response) => {
    const ip = getClientIP(req);
    logWarn('Strict rate limit exceeded', {
      ip,
      userAgent: req.get('User-Agent'),
      endpoint: req.path,
      method: req.method
    });
    
    res.status(429).json({
      error: "Too many sensitive requests. Please wait before trying again.",
      retryAfter: 60,
      timestamp: new Date().toISOString()
    });
  },
  standardHeaders: true,
  legacyHeaders: false
});