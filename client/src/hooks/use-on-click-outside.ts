import React from 'react';
const { useEffect } = React;
type RefObject<T> = React.RefObject<T>;

type Event = MouseEvent | TouchEvent;
export type ClickOutsideEvent = Event;

export function useOnClickOutside<T extends HTMLElement = HTMLElement>(
  ref: RefObject<T>,
  handler: (event: Event) => void,
  mouseEvent: 'mousedown' | 'mouseup' = 'mousedown'
) {
  useEffect(() => {
    const listener = (event: Event) => {
      // Do nothing if clicking ref's element or descendent elements
      if (!ref.current || ref.current.contains(event.target as Node)) {
        return;
      }
      handler(event);
    };

    document.addEventListener(mouseEvent, listener as EventListener);
    document.addEventListener('touchstart', listener as EventListener);

    return () => {
      document.removeEventListener(mouseEvent, listener as EventListener);
      document.removeEventListener('touchstart', listener as EventListener);
    };
  }, [ref, handler, mouseEvent]);
}
