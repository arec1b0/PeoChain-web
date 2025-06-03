import { z } from "zod";

// Security configuration schema
const securityConfigSchema = z.object({
  // Session security
  session: z.object({
    secret: z.string().min(32),
    maxAge: z.number().default(24 * 60 * 60 * 1000), // 24 hours
    secure: z.boolean().default(false),
    httpOnly: z.boolean().default(true),
    sameSite: z.enum(["strict", "lax", "none"]).default("strict"),
  }),

  // Rate limiting
  rateLimit: z.object({
    authWindow: z.number().default(15 * 60 * 1000), // 15 minutes
    authMaxAttempts: z.number().default(5),
    generalWindow: z.number().default(15 * 60 * 1000),
    generalMaxRequests: z.number().default(100),
  }),

  // Password security
  password: z.object({
    saltRounds: z.number().min(10).max(15).default(12),
    minLength: z.number().min(8).default(8),
    requireUppercase: z.boolean().default(true),
    requireLowercase: z.boolean().default(true),
    requireNumbers: z.boolean().default(true),
    requireSymbols: z.boolean().default(false),
  }),

  // CSRF protection
  csrf: z.object({
    enabled: z.boolean().default(true),
    tokenLength: z.number().default(32),
    cookieName: z.string().default("_csrf"),
    headerName: z.string().default("x-csrf-token"),
  }),

  // Content Security Policy
  csp: z.object({
    enabled: z.boolean().default(true),
    directives: z.object({
      defaultSrc: z.array(z.string()).default(["'self'"]),
      styleSrc: z.array(z.string()).default(["'self'", "'unsafe-inline'"]),
      scriptSrc: z.array(z.string()).default(["'self'"]),
      imgSrc: z.array(z.string()).default(["'self'", "data:", "https:"]),
      connectSrc: z.array(z.string()).default(["'self'"]),
      fontSrc: z.array(z.string()).default(["'self'"]),
      objectSrc: z.array(z.string()).default(["'none'"]),
      mediaSrc: z.array(z.string()).default(["'self'"]),
      frameSrc: z.array(z.string()).default(["'none'"]),
    }),
  }),
});

// Default security configuration
const defaultSecurityConfig = {
  session: {
    secret: process.env.SESSION_SECRET || "dev-secret-change-in-production",
    maxAge: parseInt(process.env.SESSION_MAX_AGE || "86400000"),
    secure: process.env.NODE_ENV === "production",
    httpOnly: true,
    sameSite: "strict" as const,
  },
  rateLimit: {
    authWindow: parseInt(process.env.AUTH_RATE_WINDOW_MS || "900000"),
    authMaxAttempts: parseInt(process.env.AUTH_RATE_MAX_ATTEMPTS || "5"),
    generalWindow: parseInt(process.env.GENERAL_RATE_WINDOW_MS || "900000"),
    generalMaxRequests: parseInt(
      process.env.GENERAL_RATE_MAX_REQUESTS || "100",
    ),
  },
  password: {
    saltRounds: parseInt(process.env.BCRYPT_ROUNDS || "12"),
    minLength: parseInt(process.env.PASSWORD_MIN_LENGTH || "8"),
    requireUppercase: process.env.PASSWORD_REQUIRE_UPPERCASE !== "false",
    requireLowercase: process.env.PASSWORD_REQUIRE_LOWERCASE !== "false",
    requireNumbers: process.env.PASSWORD_REQUIRE_NUMBERS !== "false",
    requireSymbols: process.env.PASSWORD_REQUIRE_SYMBOLS === "true",
  },
  csrf: {
    enabled: process.env.CSRF_ENABLED !== "false",
    tokenLength: parseInt(process.env.CSRF_TOKEN_LENGTH || "32"),
    cookieName: process.env.CSRF_COOKIE_NAME || "_csrf",
    headerName: process.env.CSRF_HEADER_NAME || "x-csrf-token",
  },
  csp: {
    enabled: process.env.CSP_ENABLED !== "false",
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      scriptSrc:
        process.env.NODE_ENV === "development"
          ? ["'self'", "'unsafe-eval'", "'unsafe-inline'"]
          : ["'self'"],
      imgSrc: ["'self'", "data:", "https:"],
      connectSrc: ["'self'"],
      fontSrc: ["'self'"],
      objectSrc: ["'none'"],
      mediaSrc: ["'self'"],
      frameSrc: ["'none'"],
    },
  },
};

// Validate and export security configuration
export const securityConfig = securityConfigSchema.parse(defaultSecurityConfig);

// Security validation functions
export function validatePasswordStrength(password: string): {
  isValid: boolean;
  errors: string[];
} {
  const config = securityConfig.password;
  const errors: string[] = [];

  if (password.length < config.minLength) {
    errors.push(
      `Password must be at least ${config.minLength} characters long`,
    );
  }

  if (config.requireUppercase && !/[A-Z]/.test(password)) {
    errors.push("Password must contain at least one uppercase letter");
  }

  if (config.requireLowercase && !/[a-z]/.test(password)) {
    errors.push("Password must contain at least one lowercase letter");
  }

  if (config.requireNumbers && !/\d/.test(password)) {
    errors.push("Password must contain at least one number");
  }

  if (
    config.requireSymbols &&
    !/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)
  ) {
    errors.push("Password must contain at least one special character");
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}

// Security headers configuration
export function getSecurityHeaders() {
  return {
    "X-Content-Type-Options": "nosniff",
    "X-Frame-Options": "DENY",
    "X-XSS-Protection": "1; mode=block",
    "Strict-Transport-Security": "max-age=31536000; includeSubDomains",
    "Referrer-Policy": "strict-origin-when-cross-origin",
    "Permissions-Policy": "geolocation=(), microphone=(), camera=()",
  };
}

export type SecurityConfig = z.infer<typeof securityConfigSchema>;
