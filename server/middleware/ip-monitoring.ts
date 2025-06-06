import { Request, Response, NextFunction } from "express";
import { logInfo, logWarn } from "../utils/logger";

interface MonitoringRequest extends Request {
  ip?: string;
  get?: (header: string) => string | undefined;
  headers: any;
  method: string;
  url?: string;
}

// Track suspicious patterns per IP
const suspiciousPatterns = new Map<string, {
  count: number;
  lastActivity: number;
  patterns: string[];
}>();

// Clean up old tracking data
function cleanupOldEntries() {
  const now = Date.now();
  const oneHour = 60 * 60 * 1000;
  
  for (const [ip, data] of suspiciousPatterns.entries()) {
    if (now - data.lastActivity > oneHour) {
      suspiciousPatterns.delete(ip);
    }
  }
}

// Detect suspicious patterns
function detectSuspiciousActivity(req: MonitoringRequest): string[] {
  const patterns: string[] = [];
  const url = req.url || "";
  const userAgent = req.get?.("User-Agent") || "";

  // Common attack patterns
  if (url.includes("../") || url.includes("..\\")) {
    patterns.push("path_traversal");
  }
  
  if (url.match(/(\.|%2e)(\.|%2e)(%2f|%5c|\/|\\)/i)) {
    patterns.push("encoded_path_traversal");
  }
  
  if (url.match(/(union|select|insert|delete|update|drop|exec)/i)) {
    patterns.push("sql_injection_attempt");
  }
  
  if (url.match(/<script|javascript:|data:|vbscript:/i)) {
    patterns.push("xss_attempt");
  }
  
  if (userAgent.match(/(bot|crawler|spider|scraper)/i) && !userAgent.match(/(google|bing|yahoo)/i)) {
    patterns.push("suspicious_bot");
  }

  return patterns;
}

// Update IP tracking
function updateIPTracking(ip: string, patterns: string[]) {
  const existing = suspiciousPatterns.get(ip) || {
    count: 0,
    lastActivity: 0,
    patterns: []
  };

  existing.count += patterns.length;
  existing.lastActivity = Date.now();
  existing.patterns = [...new Set([...existing.patterns, ...patterns])];

  suspiciousPatterns.set(ip, existing);
  
  return existing;
}

// Main monitoring middleware
export function ipMonitoring(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const monReq = req as MonitoringRequest;
  const clientIP = monReq.ip || "unknown";
  
  // Cleanup old entries periodically
  if (Math.random() < 0.01) { // 1% chance
    cleanupOldEntries();
  }

  const patterns = detectSuspiciousActivity(monReq);
  
  if (patterns.length > 0) {
    const tracking = updateIPTracking(clientIP, patterns);
    
    logWarn("Suspicious activity detected", {
      ip: clientIP,
      patterns,
      totalCount: tracking.count,
      userAgent: monReq.get?.("User-Agent"),
      url: monReq.url,
      method: monReq.method,
      timestamp: new Date().toISOString(),
    });

    // Block if too many suspicious patterns
    if (tracking.count >= 10) {
      return res.status(429).json({
        error: "Suspicious activity detected",
        timestamp: new Date().toISOString(),
      });
    }
  }

  next();
}

// Export for testing/monitoring
export function getIPStats() {
  return {
    trackedIPs: suspiciousPatterns.size,
    totalSuspiciousActivity: Array.from(suspiciousPatterns.values())
      .reduce((sum, data) => sum + data.count, 0),
  };
}