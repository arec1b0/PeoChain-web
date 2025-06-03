import React from "react";
const { Suspense, useRef, useMemo, useCallback, memo } = React;
import { useRenderTracker } from "@/utils/performance-metrics";
import {
  ErrorBoundaryEnhanced,
  SectionErrorFallback,
} from "@/components/ui/error-boundary-enhanced";
import { HeroSectionSkeleton } from "@/components/ui/loading-states";
import FloatingBackground from "@/components/hero/floating-background";
import HeroTitle from "@/components/hero/hero-title";
import HeroDescription from "@/components/hero/hero-description";
import MetricsGrid from "@/components/hero/metrics-grid";
import HeroActions from "@/components/hero/hero-actions";
import {
  heroContent,
  heroMetrics,
  floatingNodesConfig,
} from "@/data/hero-data";
const HeroSection = memo(function HeroSection() {
  // Track render performance
  useRenderTracker("HeroSection");

  // Memoize expensive data transformations
  const memoizedFloatingNodes = useMemo(() => floatingNodesConfig, []);
  const memoizedHeroContent = useMemo(() => heroContent, []);
  const memoizedMetrics = useMemo(() => heroMetrics, []);

  // Memoize error boundary content to prevent unnecessary re-renders
  const errorBoundaryContent = useCallback(
    () => (
      <Suspense fallback={<HeroSectionSkeleton />}>
        <section
          id="home"
          className="relative min-h-[100svh] flex items-center justify-center pt-14 sm:pt-16 px-3 sm:px-6 lg:px-8 overflow-hidden bg-mint"
        >
          <FloatingBackground nodes={memoizedFloatingNodes} />

          <div className="max-w-6xl mx-auto text-center relative z-10 py-10 sm:py-0">
            <HeroTitle title={memoizedHeroContent.title} />
            <HeroDescription description={memoizedHeroContent.description} />
            <MetricsGrid metrics={memoizedMetrics} />
            <HeroActions actions={memoizedHeroContent.actions} />
          </div>
        </section>
      </Suspense>
    ),
    [memoizedFloatingNodes, memoizedHeroContent, memoizedMetrics],
  );

  return (
    <ErrorBoundaryEnhanced
      fallback={SectionErrorFallback}
      children={errorBoundaryContent}
    />
  );
});

export default HeroSection;
