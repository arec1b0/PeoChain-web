import { useEffect, useState, useRef } from 'react';

interface UseInViewOptions {
  threshold?: number;
  rootMargin?: string;
  once?: boolean;
  margin?: string;
}

export function useInView(
  ref: React.RefObject<Element>,
  options: UseInViewOptions = {}
): boolean {
  const [inView, setInView] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);

  const {
    threshold = 0,
    rootMargin = options.margin || '0px',
    once = false
  } = options;

  useEffect(() => {
    const element = ref.current;
    
    if (!element) return;

    // Clean up previous observer
    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    observerRef.current = new IntersectionObserver(
      ([entry]) => {
        const isIntersecting = entry.isIntersecting;
        
        if (isIntersecting) {
          setInView(true);
          
          // If 'once' is true, disconnect after first intersection
          if (once && observerRef.current) {
            observerRef.current.disconnect();
          }
        } else if (!once) {
          // Only update if not 'once' mode
          setInView(false);
        }
      },
      {
        threshold,
        rootMargin,
      }
    );

    observerRef.current.observe(element);

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [threshold, rootMargin, once, ref]);

  return inView;
}