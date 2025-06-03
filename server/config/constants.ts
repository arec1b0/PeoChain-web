import { z } from "zod";

// Application configuration constants
const configSchema = z.object({
  // Server configuration
  server: z.object({
    port: z.number().default(5000),
    host: z.string().default("0.0.0.0"),
    env: z.enum(["development", "production", "test"]).default("development"),
    maxRequestSize: z.string().default("10mb"),
  }),

  // Database configuration
  database: z.object({
    poolMax: z.number().default(20),
    poolMin: z.number().default(2),
    poolIdleTimeout: z.number().default(30000),
    poolConnectionTimeout: z.number().default(10000),
    poolMaxUses: z.number().default(7500),
  }),

  // Rate limiting constants
  rateLimiting: z.object({
    authWindow: z.number().default(900000), // 15 minutes
    authMaxAttempts: z.number().default(5),
    generalWindow: z.number().default(900000),
    generalMaxRequests: z.number().default(100),
    bruteForceWindow: z.number().default(900000),
    bruteForceMaxAttempts: z.number().default(5),
  }),

  // Session configuration
  session: z.object({
    maxAge: z.number().default(86400000), // 24 hours
    cleanupInterval: z.number().default(3600000), // 1 hour
    cookieName: z.string().default("sessionId"),
  }),

  // Security timeouts
  security: z.object({
    passwordResetTimeout: z.number().default(3600000), // 1 hour
    emailVerificationTimeout: z.number().default(86400000), // 24 hours
    loginAttemptWindow: z.number().default(900000), // 15 minutes
    accountLockoutDuration: z.number().default(1800000), // 30 minutes
  }),

  // Performance thresholds
  performance: z.object({
    cacheMemoryLimit: z.number().default(52428800), // 50MB
    cacheKeyLimit: z.number().default(150),
    requestTimeoutMs: z.number().default(30000), // 30 seconds
    slowQueryThreshold: z.number().default(1000), // 1 second
    dbPoolUtilizationWarning: z.number().default(80), // 80%
    dbPoolUtilizationCritical: z.number().default(95), // 95%
  }),

  // Logging configuration
  logging: z.object({
    maxLogLineLength: z.number().default(1000),
    logRetentionDays: z.number().default(30),
    errorStackTracesInProduction: z.boolean().default(false),
    sensitiveFieldRedaction: z.boolean().default(true),
  }),

  // API configuration
  api: z.object({
    defaultPageSize: z.number().default(20),
    maxPageSize: z.number().default(100),
    requestIdHeaderName: z.string().default("x-request-id"),
    corsMaxAge: z.number().default(86400), // 24 hours
  }),

  // File upload limits
  uploads: z.object({
    maxFileSize: z.number().default(10485760), // 10MB
    allowedMimeTypes: z
      .array(z.string())
      .default(["image/jpeg", "image/png", "image/webp", "application/pdf"]),
    uploadTimeout: z.number().default(300000), // 5 minutes
  }),
});

// Default configuration
const defaultConfig = {
  server: {
    port: parseInt(process.env.PORT || "5000"),
    host: process.env.HOST || "0.0.0.0",
    env:
      (process.env.NODE_ENV as "development" | "production" | "test") ||
      "development",
    maxRequestSize: process.env.MAX_REQUEST_SIZE || "10mb",
  },
  database: {
    poolMax: parseInt(process.env.DB_POOL_MAX || "20"),
    poolMin: parseInt(process.env.DB_POOL_MIN || "2"),
    poolIdleTimeout: parseInt(process.env.DB_POOL_IDLE_TIMEOUT || "30000"),
    poolConnectionTimeout: parseInt(
      process.env.DB_POOL_CONNECTION_TIMEOUT || "10000",
    ),
    poolMaxUses: parseInt(process.env.DB_POOL_MAX_USES || "7500"),
  },
  rateLimiting: {
    authWindow: parseInt(process.env.AUTH_RATE_WINDOW_MS || "900000"),
    authMaxAttempts: parseInt(process.env.AUTH_RATE_MAX_ATTEMPTS || "5"),
    generalWindow: parseInt(process.env.GENERAL_RATE_WINDOW_MS || "900000"),
    generalMaxRequests: parseInt(
      process.env.GENERAL_RATE_MAX_REQUESTS || "100",
    ),
    bruteForceWindow: parseInt(process.env.BRUTE_FORCE_WINDOW_MS || "900000"),
    bruteForceMaxAttempts: parseInt(
      process.env.BRUTE_FORCE_MAX_ATTEMPTS || "5",
    ),
  },
  session: {
    maxAge: parseInt(process.env.SESSION_MAX_AGE || "86400000"),
    cleanupInterval: parseInt(
      process.env.SESSION_CLEANUP_INTERVAL || "3600000",
    ),
    cookieName: process.env.SESSION_COOKIE_NAME || "sessionId",
  },
  security: {
    passwordResetTimeout: parseInt(
      process.env.PASSWORD_RESET_TIMEOUT || "3600000",
    ),
    emailVerificationTimeout: parseInt(
      process.env.EMAIL_VERIFICATION_TIMEOUT || "86400000",
    ),
    loginAttemptWindow: parseInt(process.env.LOGIN_ATTEMPT_WINDOW || "900000"),
    accountLockoutDuration: parseInt(
      process.env.ACCOUNT_LOCKOUT_DURATION || "1800000",
    ),
  },
  performance: {
    cacheMemoryLimit: parseInt(process.env.CACHE_MEMORY_LIMIT || "52428800"),
    cacheKeyLimit: parseInt(process.env.CACHE_KEY_LIMIT || "150"),
    requestTimeoutMs: parseInt(process.env.REQUEST_TIMEOUT_MS || "30000"),
    slowQueryThreshold: parseInt(process.env.SLOW_QUERY_THRESHOLD || "1000"),
    dbPoolUtilizationWarning: parseInt(
      process.env.DB_POOL_UTIL_WARNING || "80",
    ),
    dbPoolUtilizationCritical: parseInt(
      process.env.DB_POOL_UTIL_CRITICAL || "95",
    ),
  },
  logging: {
    maxLogLineLength: parseInt(process.env.MAX_LOG_LINE_LENGTH || "1000"),
    logRetentionDays: parseInt(process.env.LOG_RETENTION_DAYS || "30"),
    errorStackTracesInProduction:
      process.env.ERROR_STACK_TRACES_PROD === "true",
    sensitiveFieldRedaction: process.env.SENSITIVE_FIELD_REDACTION !== "false",
  },
  api: {
    defaultPageSize: parseInt(process.env.API_DEFAULT_PAGE_SIZE || "20"),
    maxPageSize: parseInt(process.env.API_MAX_PAGE_SIZE || "100"),
    requestIdHeaderName: process.env.REQUEST_ID_HEADER || "x-request-id",
    corsMaxAge: parseInt(process.env.CORS_MAX_AGE || "86400"),
  },
  uploads: {
    maxFileSize: parseInt(process.env.MAX_FILE_SIZE || "10485760"),
    allowedMimeTypes: process.env.ALLOWED_MIME_TYPES?.split(",") || [
      "image/jpeg",
      "image/png",
      "image/webp",
      "application/pdf",
    ],
    uploadTimeout: parseInt(process.env.UPLOAD_TIMEOUT || "300000"),
  },
};

// Validate and export configuration
export const config = configSchema.parse(defaultConfig);

// Type export for TypeScript
export type AppConfig = z.infer<typeof configSchema>;

// Helper functions for common configuration checks
export const isDevelopment = () => config.server.env === "development";
export const isProduction = () => config.server.env === "production";
export const isTest = () => config.server.env === "test";

// Environment-specific feature flags
export const features = {
  enableDetailedLogging: isDevelopment(),
  enableCaching: !isTest(),
  enableRateLimiting: isProduction(),
  enableMetrics: isProduction(),
  enableDebugEndpoints: isDevelopment(),
  enableCors: true,
  enableCompression: isProduction(),
};

// Validation helper functions
export const validateConfig = () => {
  const errors: string[] = [];

  // Validate critical configurations
  if (config.database.poolMax < config.database.poolMin) {
    errors.push("Database pool max must be greater than pool min");
  }

  if (config.rateLimiting.authMaxAttempts < 1) {
    errors.push("Auth rate limiting max attempts must be at least 1");
  }

  if (config.session.maxAge < 60000) {
    // 1 minute minimum
    errors.push("Session max age must be at least 1 minute");
  }

  if (config.performance.cacheKeyLimit < 10) {
    errors.push("Cache key limit must be at least 10");
  }

  if (errors.length > 0) {
    throw new Error(`Configuration validation failed: ${errors.join(", ")}`);
  }
};

// Export specific configuration sections for easy imports
export const {
  server: serverConfig,
  database: databaseConfig,
  rateLimiting: rateLimitConfig,
  session: sessionConfig,
  security: securityConfig,
  performance: performanceConfig,
  logging: loggingConfig,
  api: apiConfig,
  uploads: uploadsConfig,
} = config;
