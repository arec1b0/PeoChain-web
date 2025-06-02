import { Request, Response, NextFunction } from "express";
import crypto from "crypto";

// Generate a secure CSRF token
export function generateCSRFToken(): string {
  return crypto.randomBytes(32).toString('hex');
}

// Validate CSRF token from request
export function validateCSRFToken(sessionToken: string, requestToken: string): boolean {
  if (!sessionToken || !requestToken) {
    return false;
  }
  
  // Use timing-safe comparison to prevent timing attacks
  return crypto.timingSafeEqual(
    Buffer.from(sessionToken, 'hex'),
    Buffer.from(requestToken, 'hex')
  );
}

// Middleware to generate and attach CSRF token to session
export function csrfTokenGenerator(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
) {
  if (!req.session.csrfToken) {
    req.session.csrfToken = generateCSRFToken();
  }
  next();
}

// Middleware to validate CSRF token on state-changing requests
export function csrfProtection(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
) {
  // Skip CSRF validation for GET, HEAD, OPTIONS requests
  if (['GET', 'HEAD', 'OPTIONS'].includes(req.method || '')) {
    return next();
  }

  const sessionToken = req.session.csrfToken;
  const requestToken = (req.headers && req.headers['x-csrf-token'] as string) || 
                      (req.body && req.body._csrf) || 
                      (req.query && req.query._csrf as string);

  if (!sessionToken || !requestToken || !validateCSRFToken(sessionToken, requestToken)) {
    return res.status(403).json({
      error: 'Invalid CSRF token',
      code: 'CSRF_TOKEN_MISMATCH',
      timestamp: new Date().toISOString()
    });
  }

  next();
}

// Endpoint to get CSRF token for frontend
export function getCSRFToken(
  req: AuthenticatedRequest,
  res: Response,
) {
  const token = req.session.csrfToken || generateCSRFToken();
  req.session.csrfToken = token;
  
  res.json({
    csrfToken: token,
    timestamp: new Date().toISOString()
  });
}

// Declare module augmentation for session
declare module "express-session" {
  interface SessionData {
    csrfToken?: string;
  }
}