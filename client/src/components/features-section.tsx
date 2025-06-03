import React from "react";
const { useRef, Suspense } = React;
import { motion } from "framer-motion";
import { useInView } from "@/hooks";
import {
  ErrorBoundaryEnhanced,
  SectionErrorFallback,
} from "@/components/ui/error-boundary-enhanced";
import { FeaturesSectionSkeleton } from "@/components/ui/loading-states";
import FeaturesHeader from "@/components/features/features-header";
import FeatureCard from "@/components/features/feature-card";
import PerformanceBenchmarks from "@/components/features/performance-benchmarks";
import TechnicalHighlights from "@/components/features/technical-highlights";
import {
  coreFeatures,
  performanceMetrics,
  technicalHighlights,
  featuresContent,
} from "@/data/features-data";
import { Shield, Zap, Globe, Lock, TrendingUp, Users, Sparkles, ArrowRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ANIMATION_VARIANTS, TEXT_STYLES, CARD_STYLES, LAYOUT_STYLES } from "../../../shared/styles";

export default function FeaturesSection() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const sectionContent = (
    <Suspense fallback={<FeaturesSectionSkeleton />}>
      <section
        ref={sectionRef}
        id="features"
        className="py-12 sm:py-20 px-3 sm:px-6 lg:px-8 bg-gradient-to-br from-white via-mint/30 to-mint"
      >
        <div className="max-w-7xl mx-auto">
          <FeaturesHeader
            title={featuresContent.section.title}
            highlight={featuresContent.section.highlight}
            description={featuresContent.section.description}
            isInView={isInView}
          />

          {/* Core Features Grid - optimized for mobile with better spacing and layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6 md:gap-8 mb-10 sm:mb-16 px-1 sm:px-0">
            {coreFeatures.map((feature, index) => (
              <motion.div
                key={feature.title}
                className="touch-action-manipulation tap-highlight-transparent select-none"
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.2 }}
                aria-label={`Feature: ${feature.title}`}
              >
                <FeatureCard
                  feature={feature}
                  index={index}
                  isInView={isInView}
                />
              </motion.div>
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
  );

  return (
    <ErrorBoundaryEnhanced
      fallback={SectionErrorFallback}
      children={sectionContent}
    />
  );
}