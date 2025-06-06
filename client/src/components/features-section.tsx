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
import { Shield, Zap, Globe, Lock, Menu, Users, X, ArrowRight } from "lucide-react";
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
        className="py-20 sm:py-32 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-sage/5 via-white to-mint/30 dark:from-gray-900 dark:via-gray-800 dark:to-sage/10"
      >
        <div className="max-w-8xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6">
              The <span className="bg-gradient-to-r from-sage via-medium-forest to-dark-sage bg-clip-text text-transparent">Blockchain Trilemma</span>
              <span className="block mt-2">Finally Solved</span>
            </h2>
            <p className="text-xl sm:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
              Traditional blockchains struggle to balance scalability, security, and 
              decentralization. PeoChain's innovative architecture achieves all three 
              simultaneously.
            </p>
          </motion.div>

          {/* Interactive Trilemma Visualization */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-20">
            {[
              { 
                icon: Zap, 
                title: "Scalability", 
                subtitle: "No Limits TPS",
                description: "Process over 100,000 transactions per second with sub-second finality through our revolutionary PoSyg consensus mechanism.",
                gradient: "from-yellow-400 to-orange-500",
                bgGradient: "from-yellow-50 to-orange-50",
                stats: ["100,000+ TPS", "0.8s Finality", "Zero Congestion"]
              },
              { 
                icon: Shield, 
                title: "Security", 
                subtitle: "Cryptographic Fortress",
                description: "Bank-grade security with advanced cryptographic protocols, validator staking, and Byzantine fault tolerance mechanisms.",
                gradient: "from-green-400 to-emerald-500",
                bgGradient: "from-green-50 to-emerald-50",
                stats: ["99.9% Uptime", "256-bit Encryption", "Byzantine Tolerant"]
              },
              { 
                icon: Globe, 
                title: "Decentralization", 
                subtitle: "True Democracy",
                description: "Globally distributed validator network with low entry barriers, ensuring no single point of failure or control.",
                gradient: "from-blue-400 to-indigo-500",
                bgGradient: "from-blue-50 to-indigo-50",
                stats: ["10,000+ Nodes", "Global Coverage", "Low Barriers"]
              }
            ].map((pillar, index) => (
              <motion.div
                key={pillar.title}
                initial={{ opacity: 0, y: 50, rotateY: -15 }}
                animate={isInView ? { opacity: 1, y: 0, rotateY: 0 } : {}}
                transition={{ 
                  duration: 0.8, 
                  delay: index * 0.2,
                  type: "spring",
                  stiffness: 100
                }}
                whileHover={{ 
                  scale: 1.05, 
                  y: -10,
                  rotateY: 5,
                  transition: { duration: 0.3 }
                }}
                className="group cursor-pointer perspective-1000"
              >
                <Card className={`relative overflow-hidden bg-gradient-to-br ${pillar.bgGradient} dark:from-gray-800 dark:to-gray-700 border-2 border-transparent group-hover:border-medium-forest/30 hover:shadow-2xl transition-all duration-500 h-full`}>
                  <CardContent className="p-8 text-center relative z-10 h-full flex flex-col">
                    <motion.div
                      className="flex items-center justify-center mb-6"
                      whileHover={{ scale: 1.2, rotate: 10 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <div className={`p-6 rounded-3xl bg-gradient-to-br ${pillar.gradient} shadow-xl`}>
                        <pillar.icon className="h-12 w-12 text-white" />
                      </div>
                    </motion.div>
                    <h3 className="text-3xl font-bold text-foreground mb-2">
                      {pillar.title}
                    </h3>
                    <p className="text-lg font-semibold text-medium-forest mb-4">
                      {pillar.subtitle}
                    </p>
                    <p className="text-muted-foreground mb-6 flex-grow">
                      {pillar.description}
                    </p>
                    <div className="space-y-2">
                      {pillar.stats.map((stat, statIndex) => (
                        <div
                          key={statIndex}
                          className="flex items-center justify-center px-3 py-2 bg-white/60 dark:bg-gray-900/60 rounded-lg backdrop-blur-sm"
                        >
                          <span className="text-sm font-bold text-medium-forest">{stat}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                  <div className={`absolute inset-0 bg-gradient-to-br ${pillar.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />
                </Card>
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