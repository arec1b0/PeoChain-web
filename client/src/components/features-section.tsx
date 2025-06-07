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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6">
              <span className="text-medium-forest dark:text-sage">Advanced Technology</span>
              <span className="block mt-2">Powering PeoChain</span>
            </h2>
            <p className="text-xl sm:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
              Cutting-edge innovations in consensus mechanisms, sharding technology, and 
              decentralized infrastructure that make PeoChain the future of blockchain.
            </p>
          </motion.div>

          {/* Advanced Technology Features */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
            {[
              { 
                icon: Zap, 
                title: "Proof of Synergy (PoSyg)", 
                subtitle: "Revolutionary Consensus",
                description: "Our groundbreaking consensus mechanism combines the best of Proof of Stake and Proof of Work, achieving unprecedented performance while maintaining energy efficiency.",
                gradient: "from-purple-500 to-indigo-600",
                bgGradient: "from-purple-50 to-indigo-50",
                features: ["Energy Efficient", "Validator Rewards", "Fast Finality", "Byzantine Fault Tolerant"]
              },
              { 
                icon: Lock, 
                title: "Advanced Sharding", 
                subtitle: "Infinite Scalability",
                description: "Dynamic sharding technology that automatically adjusts to network demand, enabling linear scalability without compromising security or decentralization.",
                gradient: "from-emerald-500 to-teal-600",
                bgGradient: "from-emerald-50 to-teal-50",
                features: ["Dynamic Partitioning", "Cross-Shard Communication", "Automatic Load Balancing", "State Synchronization"]
              },
              { 
                icon: Users, 
                title: "Validator Bonding", 
                subtitle: "Democratic Participation",
                description: "Non-custodial validator bonding system that allows anyone to participate in network consensus while maintaining full control of their assets.",
                gradient: "from-orange-500 to-red-500",
                bgGradient: "from-orange-50 to-red-50",
                features: ["Non-Custodial", "Low Entry Barriers", "Flexible Staking", "Governance Rights"]
              },
              { 
                icon: Globe, 
                title: "Global Infrastructure", 
                subtitle: "Worldwide Network",
                description: "Geographically distributed nodes ensure low latency, high availability, and true decentralization across all continents and regions.",
                gradient: "from-blue-500 to-cyan-500",
                bgGradient: "from-blue-50 to-cyan-50",
                features: ["Multi-Region Deployment", "CDN Integration", "Edge Computing", "Disaster Recovery"]
              }
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ 
                  duration: 0.8, 
                  delay: index * 0.15,
                  type: "spring",
                  stiffness: 100
                }}
                whileHover={{ 
                  scale: 1.02, 
                  y: -5,
                  transition: { duration: 0.3 }
                }}
                className="group cursor-pointer"
              >
                <Card className={`relative overflow-hidden bg-gradient-to-br ${feature.bgGradient} dark:from-gray-800 dark:to-gray-700 border-2 border-transparent group-hover:border-medium-forest/30 hover:shadow-2xl transition-all duration-500 h-full`}>
                  <CardContent className="p-8 relative z-10 h-full flex flex-col">
                    <div className="flex items-start space-x-4 mb-6">
                      <motion.div
                        className="flex-shrink-0"
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        <div className={`p-4 rounded-2xl bg-gradient-to-br ${feature.gradient} shadow-lg`}>
                          <feature.icon className="h-8 w-8 text-white" />
                        </div>
                      </motion.div>
                      <div className="flex-grow">
                        <h3 className="text-2xl font-bold text-foreground mb-1">
                          {feature.title}
                        </h3>
                        <p className="text-lg font-semibold text-medium-forest">
                          {feature.subtitle}
                        </p>
                      </div>
                    </div>
                    <p className="text-muted-foreground mb-6 flex-grow leading-relaxed">
                      {feature.description}
                    </p>
                    <div className="grid grid-cols-2 gap-2">
                      {feature.features.map((feat, featIndex) => (
                        <div
                          key={featIndex}
                          className="flex items-center px-3 py-2 bg-white/60 dark:bg-gray-900/60 rounded-lg backdrop-blur-sm"
                        >
                          <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${feature.gradient} mr-2`} />
                          <span className="text-xs font-medium text-foreground">{feat}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                  <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Call to Action Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-center bg-gradient-to-r from-sage/10 to-medium-forest/10 rounded-3xl p-12 backdrop-blur-sm"
          >
            <h3 className="text-3xl sm:text-4xl font-bold text-foreground mb-6">
              Ready to Experience the Future?
            </h3>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join thousands of validators and developers building the next generation of decentralized applications on PeoChain.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-gradient-to-r from-medium-forest to-dark-sage text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                onClick={() => window.open('/validator-bonds', '_blank')}
              >
                Become a Validator
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 border-2 border-medium-forest text-medium-forest font-bold rounded-xl hover:bg-medium-forest hover:text-white transition-all duration-300"
                onClick={() => window.open('/technology', '_blank')}
              >
                Explore Technology
              </motion.button>
            </div>
          </motion.div>
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