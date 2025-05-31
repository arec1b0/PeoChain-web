import {
  lazy,
  Suspense,
  ComponentType,
  memo,
  useState,
  useRef,
  useEffect,
} from "react";
import { ErrorBoundaryEnhanced } from "@/components/ui/error-boundary-enhanced";
import { SpinnerLoader } from "@/components/ui/loading-states";
import { LazyComponentProps } from "@/types";

// Generic lazy component wrapper with error boundaries and fallbacks
export function createLazyComponent<T extends Record<string, unknown>>(
  importFn: () => Promise<{ default: ComponentType<T> }>,
  options: LazyComponentProps = {},
): ComponentType<T> {
  const LazyComponent = lazy(importFn);
  const {
    fallback: FallbackComponent = SpinnerLoader,
    timeout = 10000,
    retry = 3,
  } = options;

  const WrappedComponent = memo((props: T) => {
    return (
      <ErrorBoundaryEnhanced
        fallback={({ resetError }) => (
          <div className="p-8 text-center">
            <p className="text-destructive mb-4">Failed to load component</p>
            <button
              onClick={resetError}
              className="px-4 py-2 bg-primary text-primary-foreground rounded"
              type="button"
            >
              Retry
            </button>
          </div>
        )}
      >
        <Suspense fallback={<FallbackComponent />}>
          <LazyComponent {...props} />
        </Suspense>
      </ErrorBoundaryEnhanced>
    );
  });

  WrappedComponent.displayName = `LazyComponent(${LazyComponent.displayName || "Unknown"})`;

  return WrappedComponent;
}

// Preload function for lazy components
export function preloadComponent(importFn: () => Promise<unknown>): void {
  const componentImport = importFn();
  componentImport.catch(() => {
    // Silently handle preload failures
  });
}

// Image lazy loading with intersection observer
export function useLazyImage(
  src: string,
  placeholder?: string,
): {
  readonly imageSrc: string;
  readonly isLoaded: boolean;
  readonly imageRef: React.RefObject<HTMLImageElement>;
} {
  const [imageSrc, setImageSrc] = useState(placeholder || "");
  const [isLoaded, setIsLoaded] = useState(false);
  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const imageElement = imageRef.current;
    if (!imageElement) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const img = new Image();
            img.onload = () => {
              setImageSrc(src);
              setIsLoaded(true);
            };
            img.onerror = () => {
              setImageSrc(placeholder || "");
              setIsLoaded(false);
            };
            img.src = src;
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 },
    );

    observer.observe(imageElement);

    return () => {
      observer.disconnect();
    };
  }, [src, placeholder]);

  return { imageSrc, isLoaded, imageRef } as const;
}

// Dynamic import with retry logic
export async function dynamicImportWithRetry<T>(
  importFn: () => Promise<T>,
  retries = 3,
  delay = 1000,
): Promise<T> {
  for (let i = 0; i < retries; i++) {
    try {
      return await importFn();
    } catch (error) {
      if (i === retries - 1) throw error;
      await new Promise((resolve) =>
        setTimeout(resolve, delay * Math.pow(2, i)),
      );
    }
  }
  throw new Error("Failed to import after retries");
}

// Code splitting helper for route-based components
export const createRouteComponent = <T extends Record<string, unknown>>(
  importFn: () => Promise<{ default: ComponentType<T> }>,
) =>
  createLazyComponent(importFn, {
    timeout: 15000,
    retry: 2,
  });
