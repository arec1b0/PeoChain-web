import { useEffect, useRef, useCallback, useState } from 'react';
import { A11yProps } from '@/types';

// Focus management hook
export function useFocusManagement(autoFocus = false): {
  readonly ref: React.RefObject<HTMLElement>;
  readonly focusElement: () => void;
  readonly isFocused: boolean;
} {
  const ref = useRef<HTMLElement>(null);
  const [isFocused, setIsFocused] = useState(false);

  const focusElement = useCallback(() => {
    if (ref.current) {
      ref.current.focus();
    }
  }, []);

  useEffect(() => {
    if (autoFocus && ref.current) {
      ref.current.focus();
    }
  }, [autoFocus]);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const handleFocus = () => setIsFocused(true);
    const handleBlur = () => setIsFocused(false);

    element.addEventListener('focus', handleFocus);
    element.addEventListener('blur', handleBlur);

    return () => {
      element.removeEventListener('focus', handleFocus);
      element.removeEventListener('blur', handleBlur);
    };
  }, []);

  return { ref, focusElement, isFocused } as const;
}

// Keyboard navigation hook
export function useKeyboardNavigation(
  onEnter?: () => void,
  onEscape?: () => void,
  onArrowKeys?: (direction: 'up' | 'down' | 'left' | 'right') => void
): {
  readonly onKeyDown: (event: React.KeyboardEvent) => void;
} {
  const onKeyDown = useCallback((event: React.KeyboardEvent) => {
    switch (event.key) {
      case 'Enter':
      case ' ':
        event.preventDefault();
        onEnter?.();
        break;
      case 'Escape':
        event.preventDefault();
        onEscape?.();
        break;
      case 'ArrowUp':
        event.preventDefault();
        onArrowKeys?.('up');
        break;
      case 'ArrowDown':
        event.preventDefault();
        onArrowKeys?.('down');
        break;
      case 'ArrowLeft':
        event.preventDefault();
        onArrowKeys?.('left');
        break;
      case 'ArrowRight':
        event.preventDefault();
        onArrowKeys?.('right');
        break;
    }
  }, [onEnter, onEscape, onArrowKeys]);

  return { onKeyDown } as const;
}

// Screen reader announcements hook
export function useScreenReaderAnnouncement(): {
  readonly announce: (message: string, priority?: 'polite' | 'assertive') => void;
} {
  const announce = useCallback((message: string, priority: 'polite' | 'assertive' = 'polite') => {
    const announcement = document.createElement('div');
    announcement.setAttribute('aria-live', priority);
    announcement.setAttribute('aria-atomic', 'true');
    announcement.className = 'sr-only';
    announcement.textContent = message;

    document.body.appendChild(announcement);

    setTimeout(() => {
      document.body.removeChild(announcement);
    }, 1000);
  }, []);

  return { announce } as const;
}

// Skip link hook for keyboard navigation
export function useSkipLink(targetId: string): {
  readonly skipLinkRef: React.RefObject<HTMLAnchorElement>;
  readonly onSkipLinkClick: (event: React.MouseEvent) => void;
} {
  const skipLinkRef = useRef<HTMLAnchorElement>(null);

  const onSkipLinkClick = useCallback((event: React.MouseEvent) => {
    event.preventDefault();
    const target = document.getElementById(targetId);
    if (target) {
      target.focus();
      target.scrollIntoView({ behavior: 'smooth' });
    }
  }, [targetId]);

  return { skipLinkRef, onSkipLinkClick } as const;
}

// Color contrast validation hook
export function useColorContrast(): {
  readonly validateContrast: (foreground: string, background: string) => boolean;
} {
  const validateContrast = useCallback((foreground: string, background: string): boolean => {
    // Simplified contrast ratio calculation
    // In production, use a proper color contrast library
    const getLuminance = (color: string): number => {
      // This is a simplified implementation
      // Should use proper color parsing and luminance calculation
      const hex = color.replace('#', '');
      const r = parseInt(hex.substr(0, 2), 16) / 255;
      const g = parseInt(hex.substr(2, 2), 16) / 255;
      const b = parseInt(hex.substr(4, 2), 16) / 255;
      
      return 0.2126 * r + 0.7152 * g + 0.0722 * b;
    };

    const l1 = getLuminance(foreground);
    const l2 = getLuminance(background);
    const ratio = (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);
    
    return ratio >= 4.5; // WCAG AA standard
  }, []);

  return { validateContrast } as const;
}

// High contrast mode detection
export function useHighContrastMode(): boolean {
  const [isHighContrast, setIsHighContrast] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-contrast: high)');
    setIsHighContrast(mediaQuery.matches);

    const handleChange = (event: MediaQueryListEvent) => {
      setIsHighContrast(event.matches);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  return isHighContrast;
}

// Reduced motion detection
export function useReducedMotion(): boolean {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (event: MediaQueryListEvent) => {
      setPrefersReducedMotion(event.matches);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  return prefersReducedMotion;
}