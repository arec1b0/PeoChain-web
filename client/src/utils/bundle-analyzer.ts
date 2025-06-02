// Bundle size and performance analysis utilities

interface BundleMetrics {
  initialBundleSize: number;
  chunksLoaded: string[];
  loadTimes: Record<string, number>;
  totalLoadTime: number;
  firstContentfulPaint: number;
  timeToInteractive: number;
}

class BundleAnalyzer {
  private static instance: BundleAnalyzer;
  private metrics: BundleMetrics = {
    initialBundleSize: 0,
    chunksLoaded: [],
    loadTimes: {},
    totalLoadTime: 0,
    firstContentfulPaint: 0,
    timeToInteractive: 0
  };

  static getInstance() {
    if (!BundleAnalyzer.instance) {
      BundleAnalyzer.instance = new BundleAnalyzer();
    }
    return BundleAnalyzer.instance;
  }

  trackChunkLoad(chunkName: string, loadTime: number) {
    this.metrics.chunksLoaded.push(chunkName);
    this.metrics.loadTimes[chunkName] = loadTime;
    this.metrics.totalLoadTime += loadTime;
  }

  trackPerformanceMetrics() {
    if (typeof window !== 'undefined' && 'performance' in window) {
      const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
      const paint = performance.getEntriesByType('paint');
      
      this.metrics.firstContentfulPaint = 
        paint.find(entry => entry.name === 'first-contentful-paint')?.startTime || 0;
      
      // Estimate TTI using navigation timing
      this.metrics.timeToInteractive = navigation.loadEventEnd - navigation.navigationStart;
    }
  }

  getReport() {
    return {
      ...this.metrics,
      averageChunkLoadTime: this.metrics.totalLoadTime / this.metrics.chunksLoaded.length || 0,
      totalChunks: this.metrics.chunksLoaded.length
    };
  }

  generateOptimizationReport() {
    const report = this.getReport();
    const recommendations = [];

    if (report.firstContentfulPaint > 2000) {
      recommendations.push('Consider reducing initial bundle size - FCP is over 2 seconds');
    }

    if (report.averageChunkLoadTime > 500) {
      recommendations.push('Chunk loading is slow - consider optimizing lazy loading');
    }

    if (report.totalChunks > 10) {
      recommendations.push('Many chunks loaded - consider bundle consolidation');
    }

    return {
      metrics: report,
      recommendations,
      performance: {
        fcp: report.firstContentfulPaint < 1800 ? 'good' : 
             report.firstContentfulPaint < 3000 ? 'needs improvement' : 'poor',
        tti: report.timeToInteractive < 3800 ? 'good' :
             report.timeToInteractive < 7300 ? 'needs improvement' : 'poor'
      }
    };
  }
}

export const bundleAnalyzer = BundleAnalyzer.getInstance();

// Hook to track lazy component loading
export function useLazyComponentTracker(componentName: string) {
  const startTime = performance.now();
  
  React.useEffect(() => {
    const loadTime = performance.now() - startTime;
    bundleAnalyzer.trackChunkLoad(componentName, loadTime);
  }, [componentName]);
}

// Performance monitoring for the entire app
export function useAppPerformanceMonitor() {
  React.useEffect(() => {
    const observer = new PerformanceObserver((list) => {
      bundleAnalyzer.trackPerformanceMetrics();
    });
    
    observer.observe({ entryTypes: ['navigation', 'paint'] });
    
    return () => observer.disconnect();
  }, []);
}