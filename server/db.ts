import { Pool, neonConfig } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-serverless";
import ws from "ws";
import * as schema from "@shared/schema";
import { logInfo, logWarn, logError } from "./utils/logger";

neonConfig.webSocketConstructor = ws;

if (!process.env.DATABASE_URL) {
  throw new Error(
    "DATABASE_URL must be set. Did you forget to provision a database?",
  );
}

// Environment-based connection pool configuration
const poolConfig = {
  connectionString: process.env.DATABASE_URL,
  max: parseInt(process.env.DB_POOL_MAX || "20"), // Maximum connections
  min: parseInt(process.env.DB_POOL_MIN || "2"), // Minimum connections
  idleTimeoutMillis: parseInt(process.env.DB_POOL_IDLE_TIMEOUT || "30000"), // 30 seconds
  connectionTimeoutMillis: parseInt(
    process.env.DB_POOL_CONNECTION_TIMEOUT || "10000",
  ), // 10 seconds
  maxUses: parseInt(process.env.DB_POOL_MAX_USES || "7500"), // Max uses per connection
  allowExitOnIdle: process.env.NODE_ENV !== "production",
};

// Connection pool with monitoring
export const pool = new Pool(poolConfig);

// Sanitize connection string for logging
function sanitizeConnectionString(connectionString: string): string {
  try {
    const url = new URL(connectionString);
    return `${url.protocol}//${url.hostname}:${url.port}${url.pathname}`;
  } catch {
    return "[REDACTED]";
  }
}

// Pool event monitoring for performance tracking (sanitized)
pool.on("connect", (client) => {
  if (process.env.NODE_ENV === "development") {
    logInfo("Database client connected", {
      totalCount: pool.totalCount,
      idleCount: pool.idleCount,
      waitingCount: pool.waitingCount,
      host: sanitizeConnectionString(process.env.DATABASE_URL || ""),
    });
  }
});

pool.on("acquire", (client) => {
  // Only log in development to reduce noise
  if (process.env.NODE_ENV === "development") {
    logInfo("Database client acquired", {
      totalCount: pool.totalCount,
      idleCount: pool.idleCount,
      waitingCount: pool.waitingCount,
    });
  }
});

pool.on("error", (err, client) => {
  // Always log errors but sanitize sensitive info
  const sanitizedError = new Error(err.message);
  sanitizedError.name = err.name;
  logError(sanitizedError, "Database pool error");
});

pool.on("remove", (client) => {
  if (process.env.NODE_ENV === "development") {
    logInfo("Database client removed from pool", {
      totalCount: pool.totalCount,
      idleCount: pool.idleCount,
      waitingCount: pool.waitingCount,
    });
  }
});

// Pool health monitoring
export function getPoolHealth() {
  return {
    totalConnections: pool.totalCount,
    idleConnections: pool.idleCount,
    waitingRequests: pool.waitingCount,
    maxConnections: poolConfig.max,
    utilizationPercentage: Math.round((pool.totalCount / poolConfig.max) * 100),
    isHealthy:
      pool.totalCount < poolConfig.max * 0.9 && pool.waitingCount === 0,
  };
}

// Pool saturation monitoring
export function checkPoolSaturation() {
  const health = getPoolHealth();

  if (health.utilizationPercentage > 80) {
    logWarn("Database pool high utilization", health);
  }

  if (health.waitingRequests > 0) {
    logWarn("Database pool has waiting requests", health);
  }

  if (health.utilizationPercentage > 95) {
    logError(
      new Error("Database pool near saturation"),
      "Pool utilization critical",
    );
  }

  return health;
}

export const db = drizzle({ client: pool, schema });
