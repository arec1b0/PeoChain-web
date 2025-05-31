import { Suspense } from 'react';
import { ErrorBoundaryEnhanced, SectionErrorFallback } from '@/components/ui/error-boundary-enhanced';
import { HeroSectionSkeleton } from '@/components/ui/loading-states';
import FloatingBackground from '@/components/hero/floating-background';
import HeroTitle from '@/components/hero/hero-title';
import HeroDescription from '@/components/hero/hero-description';
import MetricsGrid from '@/components/hero/metrics-grid';
import HeroActions from '@/components/hero/hero-actions';
import { heroContent, heroMetrics, floatingNodesConfig } from '@/data/hero-data';

export default function HeroSection() {
  return (
    <ErrorBoundaryEnhanced fallback={SectionErrorFallback}>
      <Suspense fallback={<HeroSectionSkeleton />}>
        <section id="home" className="relative h-screen flex items-center justify-center pt-16 px-4 sm:px-6 lg:px-8 overflow-hidden bg-mint">
          <FloatingBackground nodes={floatingNodesConfig} />
          
          <div className="max-w-6xl mx-auto text-center relative z-10">
            <HeroTitle title={heroContent.title} />
            <HeroDescription description={heroContent.description} />
            <MetricsGrid metrics={heroMetrics} />
            <HeroActions actions={heroContent.actions} />
          </div>
        </section>
      </Suspense>
    </ErrorBoundaryEnhanced>
  );
}
