// Re-export all hooks for easier imports
export { useOnClickOutside } from "./use-on-click-outside";
export { useLockBodyScroll } from "./use-lock-body-scroll";
export { useKeyPress } from "./use-key-press";
export { useInView } from "./use-in-view";
export { useIsMobile } from "./use-mobile";
export { useTouch, withTouchHandlers } from "./use-touch";

// Export types
export type { ClickOutsideEvent } from "./use-on-click-outside";
export type { KeyHandler } from "./use-key-press";
export type { InViewOptions } from "./use-in-view";
export type { TouchHandlers, UseTouchOptions } from "./use-touch";
