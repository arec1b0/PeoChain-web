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