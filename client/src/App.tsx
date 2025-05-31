import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ErrorBoundary } from "@/components/ui/error-boundary";
import { GlobalLoadingSkeleton } from "@/components/ui/loading-skeleton";
import Home from "@/pages/home";
import Technology from "@/pages/technology";
import Whitepaper from "@/pages/whitepaper";
import ValidatorBonds from "@/pages/validator-bonds";
import NotFound from "@/pages/not-found";
import { Suspense } from "react";

function Router() {
  return (
    <Suspense fallback={<GlobalLoadingSkeleton />}>
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
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
}

export default App;
