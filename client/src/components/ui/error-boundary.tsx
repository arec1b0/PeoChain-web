import React from "react";
import { AlertTriangle, RefreshCw } from "lucide-react";
import { Button } from "./button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./card";

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ComponentType<{ error?: Error; resetError: () => void }>;
}

export class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  state: ErrorBoundaryState;
  props: ErrorBoundaryProps;
  setState!: (state: Partial<ErrorBoundaryState>) => void;

  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
    this.props = props;
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    console.error("Error Boundary caught an error:", error, errorInfo);
  }

  resetError = (): void => {
    this.setState({ hasError: false, error: undefined });
  };

  render(): React.ReactNode {
    if (this.state.hasError) {
      if (this.props.fallback) {
        const FallbackComponent = this.props.fallback;
        return (
          <FallbackComponent
            error={this.state.error}
            resetError={this.resetError}
          />
        );
      }

      return (
        <DefaultErrorFallback
          error={this.state.error}
          resetError={this.resetError}
        />
      );
    }

    return this.props.children;
  }
}

interface ErrorFallbackProps {
  error?: Error;
  resetError: () => void;
}

export function DefaultErrorFallback({
  error,
  resetError,
}: ErrorFallbackProps) {
  return (
    <div 
      className="min-h-screen bg-background flex items-center justify-center p-4" 
      role="alert"
      aria-labelledby="error-title"
    >
      <Card className="w-full max-w-md shadow-lg border-destructive/20">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 h-12 w-12 rounded-full bg-destructive/10 flex items-center justify-center">
            <AlertTriangle className="h-6 w-6 text-destructive" aria-hidden="true" />
          </div>
          <CardTitle id="error-title" className="text-destructive text-xl font-bold">
            Something went wrong
          </CardTitle>
          <CardDescription className="text-gray-800 dark:text-gray-200">
            An unexpected error occurred. Please try one of the options below.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {error && (
            <details className="text-sm border rounded-lg overflow-hidden">
              <summary className="cursor-pointer bg-muted/50 p-3 font-medium text-gray-800 dark:text-gray-200 hover:bg-muted focus:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                Error details (for technical support)
              </summary>
              <pre className="bg-muted p-4 rounded-b-lg text-xs overflow-auto max-h-[200px] text-gray-800 dark:text-gray-200">
                <code>{error.message}</code>
              </pre>
            </details>
          )}
          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <Button 
              onClick={resetError} 
              className="flex-1 bg-dark-forest hover:bg-medium-forest text-white py-2 h-auto min-h-[44px]"
              aria-label="Try again by resetting the error state"
            >
              <RefreshCw className="h-4 w-4 mr-2" aria-hidden="true" />
              Try again
            </Button>
            <Button
              variant="outline"
              onClick={() => window.location.reload()}
              className="flex-1 border-dark-forest text-dark-forest dark:text-white dark:border-white hover:bg-dark-forest hover:text-white dark:hover:bg-white dark:hover:text-dark-forest py-2 h-auto min-h-[44px]"
              aria-label="Reload the entire page"
            >
              Reload page
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
