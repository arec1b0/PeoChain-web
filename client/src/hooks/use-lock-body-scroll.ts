import { useEffect } from 'react';

export function useLockBodyScroll(locked: boolean) {
  useEffect(() => {
    if (typeof document === 'undefined') return;

    const originalStyle = window.getComputedStyle(document.body).overflow;
    
    if (locked) {
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.body.style.overflow = originalStyle;
    };
  }, [locked]);
}
