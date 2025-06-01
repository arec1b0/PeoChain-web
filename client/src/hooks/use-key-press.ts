import React from 'react';
const { useEffect } = React;

export type KeyHandler = (event: KeyboardEvent) => void;

export function useKeyPress(key: string, handler: KeyHandler) {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === key) {
        handler(event);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [key, handler]);
}
