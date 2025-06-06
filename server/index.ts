import express, { type Request, Response, NextFunction } from "express";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import session from "express-session";
import { registerRoutes } from "./routes";
import { setupVite, serveStatic, log } from "./vite";
import { logger, logError, logInfo, logWarn } from "./utils/logger";
import { csrfTokenGenerator } from "./middleware/csrf";
import {
  securityHeaders,
  sanitizeRequest,
  requestMonitoring,
  bruteForceProtection,
  validateContentType,
} from "./middleware/security";
import { securityConfig } from "./config/security";

const app = express();

// Enhanced security middleware stack
app.use(securityHeaders);
app.use(sanitizeRequest);
app.use(requestMonitoring);
app.use(bruteForceProtection);
app.use(
  validateContentType([
    "application/json",
    "application/x-www-form-urlencoded",
  ]),
);

// Helmet with enhanced CSP
app.use(
  helmet({
    contentSecurityPolicy: securityConfig.csp.enabled
      ? {
          directives: securityConfig.csp.directives,
        }
      : false,
    hsts: {
      maxAge: 31536000,
      includeSubDomains: true,
      preload: true,
    },
    noSniff: true,
    xssFilter: true,
    referrerPolicy: { policy: "strict-origin-when-cross-origin" },
  }),
);

// Enhanced rate limiting with environment configuration
const authWindowMs = parseInt(process.env.AUTH_RATE_WINDOW_MS || "900000"); // 15 minutes
const authMaxAttempts = parseInt(process.env.AUTH_RATE_MAX_ATTEMPTS || "5");
const generalWindowMs = parseInt(
  process.env.GENERAL_RATE_WINDOW_MS || "900000",
);
const generalMaxRequests = parseInt(
  process.env.GENERAL_RATE_MAX_REQUESTS || "100",
);

// Authentication-specific rate limiter (stricter)
const authLimiter = rateLimit({
  windowMs: authWindowMs,
  max: authMaxAttempts,
  message: {
    error: "Too many authentication attempts. Please try again later.",
    retryAfter: Math.ceil(authWindowMs / 1000),
    timestamp: new Date().toISOString(),
  },
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req, res) => {
    logWarn("Authentication rate limit exceeded", {
      ip: req.ip,
      userAgent: req.get("User-Agent"),
      endpoint: req.originalUrl,
      method: req.method,
      timestamp: new Date().toISOString(),
    });
    res.status(429).json({
      error: "Too many authentication attempts. Please try again later.",
      retryAfter: Math.ceil(authWindowMs / 1000),
      timestamp: new Date().toISOString(),
    });
  },
});

// General API rate limiter
const generalLimiter = rateLimit({
  windowMs: generalWindowMs,
  max: generalMaxRequests,
  message: {
    error: "Too many requests. Please try again later.",
    retryAfter: Math.ceil(generalWindowMs / 1000),
    timestamp: new Date().toISOString(),
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// Apply rate limiters
app.use("/api/auth", authLimiter);
app.use("/api", generalLimiter);

// Enhanced session configuration with security config
app.use(
  session({
    secret: securityConfig.session.secret,
    resave: false,
    saveUninitialized: false,
    name: "sessionId", // Change default session name
    cookie: {
      secure: securityConfig.session.secure,
      httpOnly: securityConfig.session.httpOnly,
      maxAge: securityConfig.session.maxAge,
      sameSite: securityConfig.session.sameSite,
    },
    rolling: true, // Reset expiration on activity
  }),
);

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: false, limit: "10mb" }));

// CSRF token generation middleware
app.use(csrfTokenGenerator);

// Request logging middleware
app.use((req, res, next) => {
  const start = Date.now();
  const path = req.path;
  let capturedJsonResponse: Record<string, any> | undefined = undefined;

  const originalResJson = res.json;
  res.json = function (bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };

  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path.startsWith("/api")) {
      let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }

      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "…";
      }

      log(logLine);

      // Log to winston as well
      logInfo(`API Request: ${req.method} ${path}`, {
        statusCode: res.statusCode,
        duration,
        userAgent: req.get("User-Agent"),
        ip: req.ip,
      });
    }
  });

  next();
});

(async () => {
  const server = await registerRoutes(app);

  app.use((err: any, req: Request, res: Response, _next: NextFunction) => {
    const status = err.status || err.statusCode || 500;
    const message = status === 500 ? "Internal Server Error" : err.message;

    // Log the error with context
    logError(err, `${req.method} ${req.path}`);

    // Don't expose stack traces in production
    const response: any = {
      error: message,
      timestamp: new Date().toISOString(),
    };

    if (process.env.NODE_ENV === "development") {
      response.stack = err.stack;
    }

    res.status(status).json(response);
  });

  // importantly only setup vite in development and after
  // setting up all the other routes so the catch-all route
  // doesn't interfere with the other routes
  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }

  // ALWAYS serve the app on port 5000
  // this serves both the API and the client.
  // It is the only port that is not firewalled.
  const port = 5000;
  server.listen(
    {
      port,
      host: "0.0.0.0",
      reusePort: true,
    },
    () => {
      log(`serving on port ${port}`);
    },
  );
})().catch((error) => {
  console.error('Failed to start server:', error);
  process.exit(1);
});
