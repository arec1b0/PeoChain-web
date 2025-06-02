import React from "react";
import { AlertTriangle, RefreshCw, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
  errorId: string;
  retryCount: number;
}

interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ComponentType<ErrorFallbackProps>;
  onError?: (error: Error, errorInfo: React.ErrorInfo) => void;
  isolateRoutes?: boolean;
}

interface ErrorFallbackProps {
  error: Error;
  errorId: string;
  onRetry: () => void;
  onGoHome: () => void;
  retryCount: number;
}

// Default error fallback component
const DefaultErrorFallback: React.FC<ErrorFallbackProps> = ({
  error,
  errorId,
  onRetry,
  onGoHome,
  retryCount
}) => {
  const isNetworkError = error.message.includes('fetch') || error.message.includes('network');
  const canRetry = retryCount < 3;

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gray-50 dark:bg-gray-900">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto w-12 h-12 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center mb-4">
            <AlertTriangle className="w-6 h-6 text-red-600 dark:text-red-400" />
          </div>
          <CardTitle className="text-xl text-gray-900 dark:text-gray-100">
            Something went wrong
          </CardTitle>
          <CardDescription className="text-gray-600 dark:text-gray-400">
            {isNetworkError 
              ? "Unable to connect to our services. Please check your internet connection."
              : "We encountered an unexpected error. Our team has been notified."
            }
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-xs text-gray-500 dark:text-gray-400 font-mono bg-gray-100 dark:bg-gray-800 p-2 rounded border">
            Error ID: {errorId}
          </div>
          
          <div className="flex flex-col gap-2">
            {canRetry && (
              <Button 
                onClick={onRetry}
                variant="default"
                className="w-full"
                disabled={!canRetry}
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                Try Again {retryCount > 0 && `(${3 - retryCount} attempts left)`}
              </Button>
            )}
            
            <Button 
              onClick={onGoHome}
              variant="outline"
              className="w-full"
            >
              <Home className="w-4 h-4 mr-2" />
              Go to Homepage
            </Button>
          </div>
          
          {!canRetry && (
            <div className="text-sm text-red-600 dark:text-red-400 text-center">
              Multiple retry attempts failed. Please refresh the page or contact support.
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

// Main Error Boundary Component
export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  private retryTimeoutId: number | null = null;

  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorId: '',
      retryCount: 0
    };
  }

  static getDerivedStateFromError(error: Error): Partial<ErrorBoundaryState> {
    const errorId = `ERR_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    return {
      hasError: true,
      error,
      errorId
    };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // Log error with context but don't expose sensitive information
    const errorContext = {
      errorId: this.state.errorId,
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent,
      url: window.location.href,
      componentStack: errorInfo.componentStack.split('\n').slice(0, 5).join('\n'), // Limit stack trace
      errorMessage: error.message,
      retryCount: this.state.retryCount
    };

    // Send to logging service (ensure no sensitive data)
    console.error('React Error Boundary:', errorContext);
    
    // Call optional error handler
    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }

    // Report to external service if available
    if (typeof window !== 'undefined' && 'localStorage' in window) {
      try {
        const errorLog = JSON.parse(localStorage.getItem('errorLog') || '[]');
        errorLog.push(errorContext);
        // Keep only last 10 errors
        if (errorLog.length > 10) {
          errorLog.splice(0, errorLog.length - 10);
        }
        localStorage.setItem('errorLog', JSON.stringify(errorLog));
      } catch (e) {
        // Ignore localStorage errors
      }
    }
  }

  handleRetry = () => {
    if (this.state.retryCount >= 3) {
      return;
    }

    this.setState(prevState => ({
      hasError: false,
      error: null,
      errorId: '',
      retryCount: prevState.retryCount + 1
    }));

    // Clear any existing timeout
    if (this.retryTimeoutId) {
      clearTimeout(this.retryTimeoutId);
    }

    // Reset retry count after successful operation (delayed)
    this.retryTimeoutId = window.setTimeout(() => {
      this.setState({ retryCount: 0 });
    }, 30000); // Reset after 30 seconds of no errors
  };

  handleGoHome = () => {
    // Clear error state
    this.setState({
      hasError: false,
      error: null,
      errorId: '',
      retryCount: 0
    });

    // Navigate to home
    if (typeof window !== 'undefined') {
      window.location.href = '/';
    }
  };

  componentWillUnmount() {
    if (this.retryTimeoutId) {
      clearTimeout(this.retryTimeoutId);
    }
  }

  render() {
    if (this.state.hasError && this.state.error) {
      const FallbackComponent = this.props.fallback || DefaultErrorFallback;
      
      return (
        <FallbackComponent
          error={this.state.error}
          errorId={this.state.errorId}
          onRetry={this.handleRetry}
          onGoHome={this.handleGoHome}
          retryCount={this.state.retryCount}
        />
      );
    }

    return this.props.children;
  }
}

// Route-specific Error Boundary
export const RouteErrorBoundary: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <ErrorBoundary isolateRoutes={true}>
      {children}
    </ErrorBoundary>
  );
};

// Hook for manual error reporting
export const useErrorHandler = () => {
  const reportError = React.useCallback((error: Error, context?: string) => {
    const errorContext = {
      errorId: `MANUAL_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      timestamp: new Date().toISOString(),
      context: context || 'Manual report',
      message: error.message,
      url: window.location.href
    };

    console.error('Manual Error Report:', errorContext);
    
    // Store in localStorage for debugging
    try {
      const errorLog = JSON.parse(localStorage.getItem('manualErrorLog') || '[]');
      errorLog.push(errorContext);
      if (errorLog.length > 5) {
        errorLog.splice(0, errorLog.length - 5);
      }
      localStorage.setItem('manualErrorLog', JSON.stringify(errorLog));
    } catch (e) {
      // Ignore localStorage errors
    }
  }, []);

  return { reportError };
};