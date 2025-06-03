import { Request, Response, NextFunction } from "express";
import crypto from "crypto";

// Generate a secure CSRF token
export function generateCSRFToken(): string {
  return crypto.randomBytes(32).toString("hex");
}

// Validate CSRF token from request
export function validateCSRFToken(
  sessionToken: string,
  requestToken: string,
): boolean {
  if (!sessionToken || !requestToken) {
    return false;
  }

  // Use timing-safe comparison to prevent timing attacks
  return crypto.timingSafeEqual(
    Buffer.from(sessionToken, "hex"),
    Buffer.from(requestToken, "hex"),
  );
}

// Middleware to generate and attach CSRF token to session
export function csrfTokenGenerator(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const session = (req as any).session;
  if (session && !session.csrfToken) {
    session.csrfToken = generateCSRFToken();
  }
  next();
}

// Extended request interface for CSRF
interface RequestWithSession extends Request {
  session: any;
  method: string;
  headers: any;
  body: any;
  query: any;
}

// Middleware to validate CSRF token on state-changing requests
export function csrfProtection(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const reqWithSession = req as RequestWithSession;

  // Skip CSRF validation for GET, HEAD, OPTIONS requests
  if (["GET", "HEAD", "OPTIONS"].includes(reqWithSession.method || "")) {
    return next();
  }

  const sessionToken = reqWithSession.session?.csrfToken;
  const requestToken =
    (reqWithSession.headers["x-csrf-token"] as string) ||
    reqWithSession.body?._csrf ||
    (reqWithSession.query?._csrf as string);

  if (
    !sessionToken ||
    !requestToken ||
    !validateCSRFToken(sessionToken, requestToken)
  ) {
    return res.status(403).json({
      error: "Invalid CSRF token",
      code: "CSRF_TOKEN_MISMATCH",
      timestamp: new Date().toISOString(),
    });
  }

  next();
}

// Endpoint to get CSRF token for frontend
export function getCSRFToken(req: Request, res: Response) {
  const session = (req as any).session;
  const token = session?.csrfToken || generateCSRFToken();
  if (session) {
    session.csrfToken = token;
  }

  res.json({
    csrfToken: token,
    timestamp: new Date().toISOString(),
  });
}

// Declare module augmentation for session
declare module "express-session" {
  interface SessionData {
    userId?: number;
    username?: string;
    csrfToken?: string;
  }
}
