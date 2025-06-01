import React from 'react';
import { AlertTriangle, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

/**
 * Props for the error fallback component
 */
export interface ErrorFallbackProps {
  error: Error;
  errorInfo?: React.ErrorInfo | null;
  resetError: () => void;
}

/**
 * Props for the ErrorBoundaryEnhanced component
 */
export interface ErrorBoundaryProps {
  children: React.ReactNode | ((resetError: () => void) => React.ReactNode);
  fallback?: React.ComponentType<ErrorFallbackProps> | ((props: ErrorFallbackProps) => React.ReactNode);
  onError?: (error: Error, errorInfo: React.ErrorInfo) => void;
  onReset?: () => void;
  resetOnPropsChange?: boolean;
}

/**
 * State for the ErrorBoundaryEnhanced component
 */
export interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
  errorInfo: React.ErrorInfo | null;
}

/**
 * Enhanced Error Boundary component with reset capability and fallback UI
 * Implemented as a class component to use React's error boundary lifecycle methods
 */
export class ErrorBoundaryEnhanced extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  // Explicitly declare props and state to fix TypeScript errors
  declare readonly props: Readonly<ErrorBoundaryProps>;
  declare state: Readonly<ErrorBoundaryState>;
  
  // Explicitly declare setState method to fix TypeScript errors
  declare setState: <K extends keyof ErrorBoundaryState>(
    state: ((prevState: Readonly<ErrorBoundaryState>, props: Readonly<ErrorBoundaryProps>) => 
      (Pick<ErrorBoundaryState, K> | ErrorBoundaryState | null)) | 
      (Pick<ErrorBoundaryState, K> | ErrorBoundaryState | null),
    callback?: () => void
  ) => void;
  
  private resetTimeoutId: number | null = null;

  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null
    };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error, errorInfo: null };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    // Update state with error info
    this.setState({ errorInfo });
    
    // Call onError prop if provided
    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }
    
    // Log error in development
    console.error('Error caught by ErrorBoundary:', error, errorInfo);
  }

  componentDidUpdate(prevProps: ErrorBoundaryProps): void {
    // Reset error state if resetOnPropsChange is true and props changed
    if (
      this.props.resetOnPropsChange &&
      this.state.hasError &&
      prevProps.children !== this.props.children
    ) {
      this.resetErrorBoundary();
    }
  }

  componentWillUnmount(): void {
    // Clear any pending timeouts
    if (this.resetTimeoutId !== null) {
      window.clearTimeout(this.resetTimeoutId);
    }
  }

  resetErrorBoundary = (): void => {
    const { onReset } = this.props;
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null
    });

    if (onReset) {
      onReset();
    }
  };

  render(): React.ReactNode {
    const { hasError, error, errorInfo } = this.state;
    const { children, fallback = DefaultErrorFallback } = this.props;

    if (hasError && error) {
      const fallbackProps: ErrorFallbackProps = {
        error,
        errorInfo,
        resetError: this.resetErrorBoundary
      };
      
      // Handle both function and component fallbacks
      if (typeof fallback === 'function') {
        return fallback(fallbackProps);
      } else {
        const FallbackComponent = fallback;
        return <FallbackComponent {...fallbackProps} />;
      }
    }

    // Support both function-as-children and regular children
    return typeof children === 'function'
      ? (children as Function)(this.resetErrorBoundary)
      : children;
  }
}

export function DefaultErrorFallback({ error, resetError, errorInfo }: ErrorFallbackProps) {
  // Check if we're in development mode without using import.meta.env
  const isDev = typeof window !== 'undefined' && window.location.hostname === 'localhost';

  return (
    <div className="min-h-[400px] flex items-center justify-center p-4">
      <Card className="max-w-lg w-full shadow-lg border-destructive/20">
        <CardHeader className="border-b pb-3">
          <div className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-destructive" />
            <CardTitle className="text-destructive">Something went wrong</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="pt-4">
          <p className="text-muted-foreground mb-4">
            An unexpected error occurred. Please try again or contact support if the problem persists.
          </p>
          
          {/* Show error details in development */}
          {isDev && (
            <details className="mb-4 text-sm">
              <summary className="cursor-pointer font-medium text-muted-foreground hover:text-foreground transition-colors">
                Error Details (Development Only)
              </summary>
              <pre className="whitespace-pre-wrap overflow-auto">
                {error.toString()}
                {error.stack && `\n\n${error.stack}`}
              </pre>
            </details>
          )}
          
          <div className="flex flex-col sm:flex-row gap-2 justify-center">
            <Button onClick={resetError} variant="outline" size="sm">
              <ArrowRight className="w-4 h-4 mr-2" />
              Trying again
            </Button>
            <Button 
              onClick={() => window.location.href = '/'} 
              variant="default" 
              size="sm"
            >
              <ArrowRight className="w-4 h-4 mr-2" />
              Go Home
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export function SectionErrorFallback({ error, resetError }: ErrorFallbackProps) {
  return (
    <div className="py-8 px-4">
      <div className="max-w-md mx-auto text-center">
        <AlertTriangle className="w-8 h-8 text-destructive mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-destructive mb-2">
          Section unavailable
        </h3>
        <p className="text-muted-foreground mb-4">
          This section couldn't load properly. Please try again.
        </p>
        <Button onClick={resetError} variant="outline" size="sm">
          <AlertTriangle className="w-4 h-4 mr-2" />
          Retry
        </Button>
      </div>
    </div>
  );
}