import React, { memo, useMemo, useCallback, useRef, useEffect } from "react";

// Performance monitoring utilities
export interface RenderMetrics {
  componentName: string;
  renderCount: number;
  lastRenderTime: number;
  totalRenderTime: number;
  averageRenderTime: number;
}

class PerformanceTracker {
  private metrics = new Map<string, RenderMetrics>();

  trackRender(componentName: string, renderTime: number) {
    const existing = this.metrics.get(componentName) || {
      componentName,
      renderCount: 0,
      lastRenderTime: 0,
      totalRenderTime: 0,
      averageRenderTime: 0,
    };

    existing.renderCount++;
    existing.lastRenderTime = renderTime;
    existing.totalRenderTime += renderTime;
    existing.averageRenderTime =
      existing.totalRenderTime / existing.renderCount;

    this.metrics.set(componentName, existing);
  }

  getMetrics() {
    return Array.from(this.metrics.values());
  }

  getWastedRenders() {
    return this.getMetrics().filter(
      (m) => m.renderCount > 10 && m.averageRenderTime > 5,
    );
  }
}

export const performanceTracker = new PerformanceTracker();

// Optimized comparison functions for common prop patterns
export const shallowEqual = <T extends Record<string, any>>(
  prev: T,
  next: T,
): boolean => {
  const prevKeys = Object.keys(prev);
  const nextKeys = Object.keys(next);

  if (prevKeys.length !== nextKeys.length) return false;

  for (const key of prevKeys) {
    if (prev[key] !== next[key]) return false;
  }

  return true;
};

// Memoization hook for expensive computations
export function useExpensiveMemo<T>(
  factory: () => T,
  deps: React.DependencyList,
  debugName?: string,
): T {
  return useMemo(() => {
    const start = performance.now();
    const result = factory();
    const duration = performance.now() - start;

    if (debugName && duration > 10) {
      console.warn(
        `Expensive computation "${debugName}" took ${duration.toFixed(2)}ms`,
      );
    }

    return result;
  }, deps);
}

// Optimized callback hook with dependency tracking
export function useOptimizedCallback<T extends (...args: any[]) => any>(
  callback: T,
  deps: React.DependencyList,
  debugName?: string,
): T {
  const callCount = useRef(0);

  return useCallback((...args: Parameters<T>) => {
    callCount.current++;

    if (debugName && callCount.current > 100) {
      console.warn(`Callback "${debugName}" called ${callCount.current} times`);
    }

    return callback(...args);
  }, deps) as T;
}

// Performance report hook
export function usePerformanceReport() {
  const generateReport = useCallback(() => {
    const metrics = performanceTracker.getMetrics();
    const wastedRenders = performanceTracker.getWastedRenders();

    console.group("Performance Report");
    console.table(metrics);

    if (wastedRenders.length > 0) {
      console.warn("Components with potential wasted renders:", wastedRenders);
    }

    console.groupEnd();

    return { metrics, wastedRenders };
  }, []);

  return { generateReport };
}
