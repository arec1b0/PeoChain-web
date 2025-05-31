import { useEffect, useCallback, useMemo, useState, useRef } from 'react';
import { PerformanceMetrics } from '@/types';

interface PerformanceEventTiming extends PerformanceEntry {
  processingStart: number;
}

interface LayoutShiftEntry extends PerformanceEntry {
  value: number;
  hadRecentInput: boolean;
}

// Performance monitoring hook
export function usePerformanceMonitor(): {
  readonly metrics: PerformanceMetrics | null;
  readonly recordMetric: (name: string, value: number) => void;
} {
  const metrics = useMemo<PerformanceMetrics | null>(() => {
    if (typeof window === 'undefined' || !('performance' in window)) {
      return null;
    }

    const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
    const paint = performance.getEntriesByType('paint');
    
    const fcp = paint.find(entry => entry.name === 'first-contentful-paint')?.startTime ?? 0;
    
    return {
      fcp,
      lcp: 0, // Will be updated by observer
      fid: 0, // Will be updated by observer
      cls: 0, // Will be updated by observer
      ttfb: navigation ? navigation.responseStart - navigation.requestStart : 0
    };
  }, []);

  const recordMetric = useCallback((name: string, value: number): void => {
    if (typeof window !== 'undefined' && 'performance' in window) {
      performance.mark(`${name}-${value}`);
    }
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Largest Contentful Paint observer
    const lcpObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      const lastEntry = entries[entries.length - 1];
      recordMetric('lcp', lastEntry.startTime);
    });

    // First Input Delay observer  
    const fidObserver = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        const eventEntry = entry as PerformanceEventTiming;
        const fid = eventEntry.processingStart - eventEntry.startTime;
        recordMetric('fid', fid);
      }
    });

    // Cumulative Layout Shift observer
    const clsObserver = new PerformanceObserver((list) => {
      let clsValue = 0;
      for (const entry of list.getEntries()) {
        const layoutEntry = entry as LayoutShiftEntry;
        if (!layoutEntry.hadRecentInput) {
          clsValue += layoutEntry.value;
        }
      }
      recordMetric('cls', clsValue);
    });

    try {
      lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });
      fidObserver.observe({ entryTypes: ['first-input'] });
      clsObserver.observe({ entryTypes: ['layout-shift'] });
    } catch (error) {
      console.warn('Performance observers not supported:', error);
    }

    return () => {
      lcpObserver.disconnect();
      fidObserver.disconnect();
      clsObserver.disconnect();
    };
  }, [recordMetric]);

  return { metrics, recordMetric } as const;
}

// Debounce hook for performance optimization
export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

// Throttle hook for high-frequency events
export function useThrottle<T extends (...args: unknown[]) => unknown>(
  callback: T,
  delay: number
): T {
  const lastRun = useRef<number>(Date.now());

  return useCallback(
    ((...args: Parameters<T>) => {
      if (Date.now() - lastRun.current >= delay) {
        callback(...args);
        lastRun.current = Date.now();
      }
    }) as T,
    [callback, delay]
  );
}