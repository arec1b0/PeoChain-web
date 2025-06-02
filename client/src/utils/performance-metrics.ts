import { useRef, useEffect, useState } from 'react';

interface PerformanceMetrics {
  renderCount: number;
  totalRenderTime: number;
  averageRenderTime: number;
  lastRenderTime: number;
}

class RenderTracker {
  private static instance: RenderTracker;
  private metrics = new Map<string, PerformanceMetrics>();

  static getInstance() {
    if (!RenderTracker.instance) {
      RenderTracker.instance = new RenderTracker();
    }
    return RenderTracker.instance;
  }

  trackRender(componentName: string, renderTime: number) {
    const existing = this.metrics.get(componentName) || {
      renderCount: 0,
      totalRenderTime: 0,
      averageRenderTime: 0,
      lastRenderTime: 0
    };

    existing.renderCount++;
    existing.totalRenderTime += renderTime;
    existing.averageRenderTime = existing.totalRenderTime / existing.renderCount;
    existing.lastRenderTime = renderTime;

    this.metrics.set(componentName, existing);
  }

  getMetrics() {
    return this.metrics;
  }

  getReport() {
    const data = Array.from(this.metrics.entries()).map(([name, metrics]) => ({
      component: name,
      renders: metrics.renderCount,
      avgTime: Math.round(metrics.averageRenderTime * 100) / 100,
      lastTime: Math.round(metrics.lastRenderTime * 100) / 100,
      totalTime: Math.round(metrics.totalRenderTime * 100) / 100
    }));
    
    return data.sort((a, b) => b.totalTime - a.totalTime);
  }
}

export const renderTracker = RenderTracker.getInstance();

// Hook to track component render performance
export function useRenderTracker(componentName: string) {
  const renderStart = useRef<number>(0);
  
  renderStart.current = performance.now();
  
  useEffect(() => {
    const renderTime = performance.now() - renderStart.current;
    renderTracker.trackRender(componentName, renderTime);
  });
}

// Hook to get performance report
export function usePerformanceReport() {
  const [report, setReport] = useState<any[]>([]);
  
  const generateReport = () => {
    const data = renderTracker.getReport();
    setReport(data);
    console.table(data);
    return data;
  };
  
  return { report, generateReport };
}