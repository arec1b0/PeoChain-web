import { useRef, Suspense } from 'react';
import { useInView } from 'framer-motion';
import { ErrorBoundaryEnhanced, SectionErrorFallback } from '@/components/ui/error-boundary-enhanced';
import { FeaturesSectionSkeleton } from '@/components/ui/loading-states';
import FeaturesHeader from '@/components/features/features-header';
import FeatureCard from '@/components/features/feature-card';
import PerformanceBenchmarks from '@/components/features/performance-benchmarks';
import TechnicalHighlights from '@/components/features/technical-highlights';
import { 
  coreFeatures, 
  performanceMetrics, 
  technicalHighlights, 
  featuresContent 
} from '@/data/features-data';

export default function FeaturesSection() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  return (
    <ErrorBoundaryEnhanced fallback={SectionErrorFallback}>
      <Suspense fallback={<FeaturesSectionSkeleton />}>
        <section ref={sectionRef} id="features" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-white via-mint/30 to-mint">
          <div className="max-w-7xl mx-auto">
            <FeaturesHeader
              title={featuresContent.section.title}
              highlight={featuresContent.section.highlight}
              description={featuresContent.section.description}
              isInView={isInView}
            />

            {/* Core Features Grid */}
            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8 mb-16">
              {coreFeatures.map((feature, index) => (
                <FeatureCard
                  key={feature.title}
                  feature={feature}
                  index={index}
                  isInView={isInView}
                />
              ))}
            </div>

            <PerformanceBenchmarks
              metrics={performanceMetrics}
              isInView={isInView}
              title={featuresContent.performance.title}
              highlight={featuresContent.performance.highlight}
              description={featuresContent.performance.description}
            />

            <TechnicalHighlights
              highlights={technicalHighlights}
              isInView={isInView}
            />
          </div>
        </section>
      </Suspense>
    </ErrorBoundaryEnhanced>
  );
}