import bcrypt from 'bcryptjs';
import { Request, Response, NextFunction } from 'express';
import session from 'express-session';

export async function hashPassword(password: string): Promise<string> {
  const saltRounds = 12;
  return bcrypt.hash(password, saltRounds);
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

export interface AuthenticatedRequest extends Request {
  user?: {
    id: number;
    username: string;
  };
  session: session.Session & Partial<session.SessionData> & {
    userId?: number;
    username?: string;
  };
}

export function requireAuth(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  if (!req.session?.userId) {
    return res.status(401).json({ error: 'Authentication required' });
  }
  
  // Add user info to request
  req.user = {
    id: req.session.userId,
    username: req.session.username || ''
  };
  
  next();
}

export function optionalAuth(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  if (req.session?.userId) {
    req.user = {
      id: req.session.userId,
      username: req.session.username || ''
    };
  }
  next();
}

declare module 'express-session' {
  interface SessionData {
    userId?: number;
    username?: string;
  }
}