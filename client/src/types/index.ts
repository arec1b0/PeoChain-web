// Core type definitions for the application

export interface BaseComponent {
  className?: string;
  children?: React.ReactNode;
}

export interface AnimatedComponent extends BaseComponent {
  initial?: Record<string, unknown>;
  animate?: Record<string, unknown>;
  transition?: Record<string, unknown>;
  delay?: number;
}

export interface AccessibleComponent extends BaseComponent {
  'aria-label'?: string;
  'aria-labelledby'?: string;
  'aria-describedby'?: string;
  role?: string;
  tabIndex?: number;
}

// Performance monitoring types
export interface PerformanceMetrics {
  fcp: number; // First Contentful Paint
  lcp: number; // Largest Contentful Paint
  fid: number; // First Input Delay
  cls: number; // Cumulative Layout Shift
  ttfb: number; // Time to First Byte
}

// Error handling types
export interface ErrorInfo {
  componentStack: string;
  errorBoundary?: string;
  eventType?: string;
}

export interface ErrorReport {
  error: Error;
  errorInfo: ErrorInfo;
  timestamp: number;
  userAgent: string;
  url: string;
  userId?: string;
}

// Theme and styling types
export interface ThemeColors {
  sage: string;
  'medium-forest': string;
  'dark-sage': string;
  forest: string;
  mint: string;
}

export interface BreakpointConfig {
  sm: string;
  md: string;
  lg: string;
  xl: string;
  '2xl': string;
}

// Animation configuration types
export interface MotionConfig {
  duration: number;
  ease: string | number[];
  delay?: number;
  repeat?: number;
}

export interface ScrollTriggerConfig {
  once: boolean;
  margin: string;
  threshold?: number;
}

// Utility types
export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

export type RequireAtLeastOne<T, Keys extends keyof T = keyof T> = 
  Pick<T, Exclude<keyof T, Keys>> & 
  {
    [K in Keys]-?: Required<Pick<T, K>> & Partial<Pick<T, Exclude<Keys, K>>>;
  }[Keys];

export type StrictOmit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

// Event handler types
export interface ClickHandler {
  (event: React.MouseEvent<HTMLElement>): void;
}

export interface KeyboardHandler {
  (event: React.KeyboardEvent<HTMLElement>): void;
}

export interface FormHandler {
  (event: React.FormEvent<HTMLFormElement>): void;
}

// Loading state types
export type LoadingState = 'idle' | 'loading' | 'success' | 'error';

export interface AsyncState<T> {
  data?: T;
  error?: Error;
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
}

// Component size variants
export type SizeVariant = 'sm' | 'md' | 'lg' | 'xl';
export type ColorVariant = 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info';

// Accessibility types
export interface A11yProps {
  'aria-live'?: 'polite' | 'assertive' | 'off';
  'aria-atomic'?: boolean;
  'aria-busy'?: boolean;
  'aria-hidden'?: boolean;
  'aria-expanded'?: boolean;
  'aria-controls'?: string;
  'aria-owns'?: string;
}

// Performance optimization types
export interface LazyComponentProps {
  fallback?: React.ComponentType;
  timeout?: number;
  retry?: number;
}

export interface MemoizationConfig {
  equalityFn?: (prev: unknown, next: unknown) => boolean;
  maxAge?: number;
  maxSize?: number;
}