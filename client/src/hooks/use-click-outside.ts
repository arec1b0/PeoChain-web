import { RefObject, useEffect } from 'react';

export type ClickOutsideEvent = MouseEvent | TouchEvent;

export function useOnClickOutside<T extends HTMLElement = HTMLElement>(
  ref: RefObject<T> | RefObject<T>[],
  handler: (event: ClickOutsideEvent) => void,
) {
  useEffect(() => {
    const listener = (event: ClickOutsideEvent) => {
      const refs = Array.isArray(ref) ? ref : [ref];
      const isOutside = refs.every(
        r => !r.current || (event.target instanceof Node && !r.current.contains(event.target as Node))
      );

      if (isOutside) {
        handler(event);
      }
    };

    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener);

    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
    };
  }, [ref, handler]);
}
