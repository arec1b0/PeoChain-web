import { render, RenderOptions } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ErrorBoundaryEnhanced } from "@/components/ui/error-boundary-enhanced";
import { ReactElement, ReactNode } from "react";

// Custom render function with providers
function createTestQueryClient(): QueryClient {
  return new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        gcTime: 0,
      },
    },
  });
}

interface CustomRenderOptions extends Omit<RenderOptions, "wrapper"> {
  queryClient?: QueryClient;
}

function CustomWrapper({
  children,
  queryClient = createTestQueryClient(),
}: {
  children: ReactNode;
  queryClient?: QueryClient;
}) {
  return (
    <ErrorBoundaryEnhanced>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>{children}</TooltipProvider>
      </QueryClientProvider>
    </ErrorBoundaryEnhanced>
  );
}

function customRender(ui: ReactElement, options: CustomRenderOptions = {}) {
  const { queryClient, ...renderOptions } = options;

  return render(ui, {
    wrapper: ({ children }) => (
      <CustomWrapper queryClient={queryClient}>{children}</CustomWrapper>
    ),
    ...renderOptions,
  });
}

// Accessibility testing utilities
export function createAxeConfig() {
  return {
    rules: {
      "color-contrast": { enabled: true },
      "keyboard-navigation": { enabled: true },
      "focus-management": { enabled: true },
      "aria-labels": { enabled: true },
    },
  };
}

// Performance testing utilities
export function mockPerformanceObserver() {
  const observe = vi.fn();
  const disconnect = vi.fn();

  global.PerformanceObserver = vi.fn().mockImplementation((callback) => ({
    observe,
    disconnect,
    takeRecords: vi.fn(() => []),
  }));

  return { observe, disconnect };
}

// Error boundary testing utilities
export function createErrorComponent(shouldError = true) {
  return function ErrorComponent() {
    if (shouldError) {
      throw new Error("Test error");
    }
    return <div data-testid="success">Success</div>;
  };
}

// Animation testing utilities
export function mockFramerMotion() {
  vi.mock("framer-motion", () => ({
    motion: {
      div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
      section: ({ children, ...props }: any) => (
        <section {...props}>{children}</section>
      ),
      h1: ({ children, ...props }: any) => <h1 {...props}>{children}</h1>,
      p: ({ children, ...props }: any) => <p {...props}>{children}</p>,
    },
    useInView: () => true,
    AnimatePresence: ({ children }: any) => children,
  }));
}

// Export everything
export * from "@testing-library/react";
export { customRender as render };
export { userEvent } from "@testing-library/user-event";

import { vi } from "vitest";
