import React from "react";
const { useEffect, useState, useRef } = React;

export interface InViewOptions {
  once?: boolean;
  margin?: string;
  threshold?: number;
}

/**
 * Custom hook to detect when an element is in the viewport
 * A replacement for framer-motion's useInView hook
 */
export function useInView(
  ref: React.RefObject<Element>,
  options: InViewOptions = {},
): boolean {
  const [isInView, setIsInView] = useState(false);
  const { once = false, margin = "0px", threshold = 0 } = options;

  useEffect(() => {
    if (!ref.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);

        // If once is true and the element is in view, disconnect the observer
        if (entry.isIntersecting && once) {
          observer.disconnect();
        }
      },
      {
        rootMargin: margin,
        threshold,
      },
    );

    observer.observe(ref.current);

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [ref, once, margin, threshold]);

  return isInView;
}

export default useInView;
