import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/ui/theme-provider";
import {
  ErrorBoundaryEnhanced,
  DefaultErrorFallback,
} from "@/components/ui/error-boundary-enhanced";
import { FloatingLoader } from "@/components/ui/loading-states";
import Home from "@/pages/home";
import Technology from "@/pages/technology";
import Whitepaper from "@/pages/whitepaper";
import ValidatorBonds from "@/pages/validator-bonds";
import NotFound from "@/pages/not-found";
import { Suspense, useEffect } from "react";
import { useReducedMotion } from "@/hooks/use-accessibility";
import { useAnimationStore } from "@/store";

function AppRouter() {
  // Remove the problematic animation store integration for now
  // const reducedMotion = useReducedMotion()
  // Focus on core functionality first

  return (
    <Suspense fallback={<FloatingLoader />}>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/technology" component={Technology} />
        <Route path="/whitepaper" component={Whitepaper} />
        <Route path="/validator-bonds" component={ValidatorBonds} />
        <Route component={NotFound} />
      </Switch>
    </Suspense>
  );
}

function App() {
  return (
    <ErrorBoundaryEnhanced
      fallback={DefaultErrorFallback}
      onError={(error, errorInfo) => {
        console.error("Application error:", error, errorInfo);
      }}
    >
      <ThemeProvider defaultTheme="system" storageKey="peochain-ui-theme">
        <QueryClientProvider client={queryClient}>
          <TooltipProvider>
            <Toaster />
            <AppRouter />
          </TooltipProvider>
        </QueryClientProvider>
      </ThemeProvider>
    </ErrorBoundaryEnhanced>
  );
}

export default App;
