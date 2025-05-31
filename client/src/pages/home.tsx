import { Suspense } from 'react';
import { ErrorBoundaryEnhanced, DefaultErrorFallback } from '@/components/ui/error-boundary-enhanced';
import { SectionLoadingSkeleton } from '@/components/ui/loading-states';
import Navigation from '@/components/navigation';
import HeroSection from '@/components/hero-section';
import TrilemmaSection from '@/components/trilemma-section';
import FeaturesSection from '@/components/features-section';
import FooterSection from '@/components/footer-section';

export default function Home() {
  return (
    <ErrorBoundaryEnhanced fallback={DefaultErrorFallback}>
      <div className="min-h-screen">
        <ErrorBoundaryEnhanced>
          <Navigation />
        </ErrorBoundaryEnhanced>
        
        <HeroSection />
        
        <ErrorBoundaryEnhanced>
          <Suspense fallback={<SectionLoadingSkeleton />}>
            <TrilemmaSection />
          </Suspense>
        </ErrorBoundaryEnhanced>
        
        <FeaturesSection />
        
        <ErrorBoundaryEnhanced>
          <Suspense fallback={<SectionLoadingSkeleton />}>
            <FooterSection />
          </Suspense>
        </ErrorBoundaryEnhanced>
      </div>
    </ErrorBoundaryEnhanced>
  );
}
