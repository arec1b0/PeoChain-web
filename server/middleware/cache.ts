import { Request, Response, NextFunction } from "express";
import NodeCache from "node-cache";
import { logInfo, logWarn } from "../utils/logger";

// Cache configuration
const CACHE_CONFIG = {
  // Static data cache (longer TTL)
  static: {
    ttl: parseInt(process.env.CACHE_TTL_STATIC || "300"), // 5 minutes
    checkPeriod: 60, // Check for expired keys every 60 seconds
    maxKeys: 100,
  },
  // Dynamic data cache (shorter TTL)
  dynamic: {
    ttl: parseInt(process.env.CACHE_TTL_DYNAMIC || "30"), // 30 seconds
    checkPeriod: 10,
    maxKeys: 50,
  },
};

// Create cache instances
const staticCache = new NodeCache({
  stdTTL: CACHE_CONFIG.static.ttl,
  checkperiod: CACHE_CONFIG.static.checkPeriod,
  maxKeys: CACHE_CONFIG.static.maxKeys,
  useClones: false,
});

const dynamicCache = new NodeCache({
  stdTTL: CACHE_CONFIG.dynamic.ttl,
  checkperiod: CACHE_CONFIG.dynamic.checkPeriod,
  maxKeys: CACHE_CONFIG.dynamic.maxKeys,
  useClones: false,
});

// Cache event logging
staticCache.on("set", (key, value) => {
  logInfo(`Cache SET: ${key}`, {
    cache: "static",
    size: JSON.stringify(value).length,
  });
});

staticCache.on("expired", (key, value) => {
  logInfo(`Cache EXPIRED: ${key}`, { cache: "static" });
});

dynamicCache.on("set", (key, value) => {
  logInfo(`Cache SET: ${key}`, {
    cache: "dynamic",
    size: JSON.stringify(value).length,
  });
});

// Extended request interface
interface CacheRequest extends Request {
  url?: string;
  method?: string;
  query?: any;
}

// Cache key generation
function generateCacheKey(req: CacheRequest): string {
  const { url, method, query } = req;
  const queryString = query ? JSON.stringify(query) : "";
  return `${method}:${url}${queryString ? `:${Buffer.from(queryString).toString("base64")}` : ""}`;
}

// Static data cache middleware (for endpoints that rarely change)
export function staticDataCache(ttlOverride?: number) {
  return (req: Request, res: Response, next: NextFunction) => {
    const cacheReq = req as CacheRequest;

    // Only cache GET requests
    if (cacheReq.method !== "GET") {
      return next();
    }

    const cacheKey = generateCacheKey(cacheReq);
    const cachedData = staticCache.get(cacheKey);

    if (cachedData) {
      logInfo(`Cache HIT: ${cacheKey}`, { cache: "static" });
      res.setHeader("X-Cache", "HIT");
      res.setHeader("X-Cache-TTL", staticCache.getTtl(cacheKey) || 0);
      return res.json(cachedData);
    }

    // Override res.json to cache the response
    const originalJson = res.json.bind(res);
    res.json = function (data: any) {
      // Cache successful responses only
      if (res.statusCode >= 200 && res.statusCode < 300) {
        const ttl = ttlOverride || CACHE_CONFIG.static.ttl;
        staticCache.set(cacheKey, data, ttl);
        logInfo(`Cache MISS: ${cacheKey}`, { cache: "static", cached: true });
        res.setHeader("X-Cache", "MISS");
      }
      return originalJson(data);
    };

    next();
  };
}

// Dynamic data cache middleware (for data that changes frequently)
export function dynamicDataCache(ttlOverride?: number) {
  return (req: Request, res: Response, next: NextFunction) => {
    const cacheReq = req as CacheRequest;

    if (cacheReq.method !== "GET") {
      return next();
    }

    const cacheKey = generateCacheKey(cacheReq);
    const cachedData = dynamicCache.get(cacheKey);

    if (cachedData) {
      logInfo(`Cache HIT: ${cacheKey}`, { cache: "dynamic" });
      res.setHeader("X-Cache", "HIT");
      res.setHeader("X-Cache-TTL", dynamicCache.getTtl(cacheKey) || 0);
      return res.json(cachedData);
    }

    const originalJson = res.json.bind(res);
    res.json = function (data: any) {
      if (res.statusCode >= 200 && res.statusCode < 300) {
        const ttl = ttlOverride || CACHE_CONFIG.dynamic.ttl;
        dynamicCache.set(cacheKey, data, ttl);
        logInfo(`Cache MISS: ${cacheKey}`, { cache: "dynamic", cached: true });
        res.setHeader("X-Cache", "MISS");
      }
      return originalJson(data);
    };

    next();
  };
}

// Cache invalidation by pattern
export function invalidateCache(
  pattern: string,
  cacheType: "static" | "dynamic" | "all" = "all",
) {
  const caches =
    cacheType === "all"
      ? [staticCache, dynamicCache]
      : cacheType === "static"
        ? [staticCache]
        : [dynamicCache];

  let invalidatedCount = 0;

  caches.forEach((cache) => {
    const keys = cache.keys();
    keys.forEach((key) => {
      if (key.includes(pattern)) {
        cache.del(key);
        invalidatedCount++;
      }
    });
  });

  logInfo(`Cache invalidation completed`, {
    pattern,
    cacheType,
    invalidatedKeys: invalidatedCount,
  });

  return invalidatedCount;
}

// Cache statistics
export function getCacheStats() {
  return {
    static: {
      keys: staticCache.keys().length,
      hits: staticCache.getStats().hits,
      misses: staticCache.getStats().misses,
      ksize: staticCache.getStats().ksize,
      vsize: staticCache.getStats().vsize,
    },
    dynamic: {
      keys: dynamicCache.keys().length,
      hits: dynamicCache.getStats().hits,
      misses: dynamicCache.getStats().misses,
      ksize: dynamicCache.getStats().ksize,
      vsize: dynamicCache.getStats().vsize,
    },
  };
}

// Conditional cache middleware based on environment
export function conditionalCache(
  cacheType: "static" | "dynamic" = "static",
  ttl?: number,
) {
  return (req: Request, res: Response, next: NextFunction) => {
    // Disable caching in development if requested
    if (process.env.DISABLE_CACHE === "true") {
      res.setHeader("X-Cache", "DISABLED");
      return next();
    }

    const middleware =
      cacheType === "static" ? staticDataCache(ttl) : dynamicDataCache(ttl);
    return middleware(req, res, next);
  };
}

// Cache warmup function
export async function warmupCache(endpoints: string[]) {
  logInfo("Starting cache warmup", { endpoints: endpoints.length });

  // This would typically make internal requests to warm up the cache
  // Implementation depends on your specific needs

  logInfo("Cache warmup completed");
}

// Memory monitoring
export function monitorCacheMemory() {
  const stats = getCacheStats();
  const totalKeys = stats.static.keys + stats.dynamic.keys;
  const totalSize = stats.static.vsize + stats.dynamic.vsize;

  if (totalKeys > 80) {
    // Warn if approaching limits
    logWarn("Cache approaching key limit", { totalKeys, limit: 150 });
  }

  if (totalSize > 50 * 1024 * 1024) {
    // Warn if over 50MB
    logWarn("Cache memory usage high", {
      totalSize,
      sizeMB: totalSize / 1024 / 1024,
    });
  }

  return { totalKeys, totalSize };
}
