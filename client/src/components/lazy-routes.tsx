import React, { lazy, Suspense } from 'react';
import { FloatingLoader } from '@/components/ui/loading-states';
import { ErrorBoundaryEnhanced } from '@/components/ui/error-boundary-enhanced';

// Lazy load route components for code splitting
export const LazyHome = lazy(() => import('@/pages/home'));
export const LazyTechnology = lazy(() => import('@/pages/technology'));
export const LazyWhitepaper = lazy(() => import('@/pages/whitepaper'));
export const LazyValidatorBonds = lazy(() => import('@/pages/validator-bonds'));
export const LazyNotFound = lazy(() => import('@/pages/not-found'));

// HOC for wrapping lazy components with error boundaries and suspense
function withLazyWrapper<T extends Record<string, any>>(
  LazyComponent: React.LazyExoticComponent<React.ComponentType<T>>,
  componentName: string
) {
  return function WrappedLazyComponent(props: T) {
    return (
      <ErrorBoundaryEnhanced
        fallback={({ resetError }: { resetError: () => void }) => (
          <div className="min-h-screen flex items-center justify-center p-8">
            <div className="text-center">
              <h2 className="text-xl font-semibold mb-4">Failed to load {componentName}</h2>
              <button
                onClick={resetError}
                className="px-4 py-2 bg-sage text-white rounded hover:bg-medium-forest transition-colors"
              >
                Retry Loading
              </button>
            </div>
          </div>
        )}
      >
        <Suspense fallback={<FloatingLoader />}>
          <LazyComponent {...props} />
        </Suspense>
      </ErrorBoundaryEnhanced>
    );
  };
}

// Wrapped lazy components ready for use
export const Home = withLazyWrapper(LazyHome, 'Home');
export const Technology = withLazyWrapper(LazyTechnology, 'Technology');
export const Whitepaper = withLazyWrapper(LazyWhitepaper, 'Whitepaper');
export const ValidatorBonds = withLazyWrapper(LazyValidatorBonds, 'Validator Bonds');
export const NotFound = withLazyWrapper(LazyNotFound, 'Page Not Found');