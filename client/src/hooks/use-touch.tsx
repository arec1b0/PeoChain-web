import React from "react";
import { useIsMobile } from "./use-mobile";

export interface TouchHandlers {
  onTouchStart?: React.TouchEventHandler;
  onTouchEnd?: React.TouchEventHandler;
  onTouchMove?: React.TouchEventHandler;
  onTouchCancel?: React.TouchEventHandler;
  activeClass?: string;
  ariaPressed?: boolean;
  className?: string;
}

export interface UseTouchOptions {
  /**
   * Whether to provide touch feedback (scale, opacity changes)
   */
  provideFeedback?: boolean;

  /**
   * Custom active class to apply when touched
   */
  activeClass?: string;

  /**
   * Duration in ms to keep the touch active state after touch end
   */
  feedbackDuration?: number;

  /**
   * Whether to prevent default touch behavior
   */
  preventDefault?: boolean;

  /**
   * Whether to stop propagation of touch events
   */
  stopPropagation?: boolean;

  /**
   * Whether to disable touch handling when not on mobile
   */
  onlyOnMobile?: boolean;

  /**
   * Custom handler for touch start
   */
  onTouchStart?: (e: React.TouchEvent) => void;

  /**
   * Custom handler for touch end
   */
  onTouchEnd?: (e: React.TouchEvent) => void;
}

/**
 * Custom hook for handling touch interactions with proper accessibility support
 * Returns touch event handlers and state for touch feedback
 */
export function useTouch({
  provideFeedback = true,
  activeClass = "touch-active",
  feedbackDuration = 150,
  preventDefault = false,
  stopPropagation = false,
  onlyOnMobile = false,
  onTouchStart,
  onTouchEnd,
}: UseTouchOptions = {}): TouchHandlers {
  const [isPressed, setIsPressed] = React.useState(false);
  const isMobile = useIsMobile();
  // Use number type instead of NodeJS.Timeout for better compatibility
  const timeoutRef = React.useRef<number | null>(null);

  // Only provide touch handlers if we're on mobile or onlyOnMobile is false
  if (onlyOnMobile && !isMobile) {
    return {};
  }

  const handleTouchStart = React.useCallback(
    (e: React.TouchEvent) => {
      if (preventDefault) e.preventDefault();
      if (stopPropagation) e.stopPropagation();

      setIsPressed(true);

      // Clear any existing timeout
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }

      // Call custom handler if provided
      onTouchStart?.(e);
    },
    [preventDefault, stopPropagation, onTouchStart],
  );

  const handleTouchEnd = React.useCallback(
    (e: React.TouchEvent) => {
      if (preventDefault) e.preventDefault();
      if (stopPropagation) e.stopPropagation();

      // Add a small delay before removing the pressed state
      // This gives time for visual feedback
      timeoutRef.current = setTimeout(() => {
        setIsPressed(false);
        timeoutRef.current = null;
      }, feedbackDuration);

      // Call custom handler if provided
      onTouchEnd?.(e);
    },
    [preventDefault, stopPropagation, feedbackDuration, onTouchEnd],
  );

  const handleTouchCancel = React.useCallback(
    (e: React.TouchEvent) => {
      if (preventDefault) e.preventDefault();
      if (stopPropagation) e.stopPropagation();

      setIsPressed(false);

      // Clear any existing timeout
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    },
    [preventDefault, stopPropagation],
  );

  // Clean up timeout on unmount
  React.useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return {
    onTouchStart: handleTouchStart,
    onTouchEnd: handleTouchEnd,
    onTouchCancel: handleTouchCancel,
    activeClass: provideFeedback && isPressed ? activeClass : undefined,
    ariaPressed: isPressed,
    className: provideFeedback && isPressed ? activeClass : "",
  };
}

/**
 * A higher-order function that adds touch handling to any component props
 */
export function withTouchHandlers<T extends {}>(
  props: T,
  options: UseTouchOptions = {},
): T & TouchHandlers {
  const touchHandlers = useTouch(options);
  return { ...props, ...touchHandlers };
}
