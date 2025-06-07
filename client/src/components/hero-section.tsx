import React from "react";
const { Suspense, useRef, useMemo, useCallback, memo } = React;
import { useRenderTracker } from "@/utils/performance-metrics";
import {
  ErrorBoundaryEnhanced,
  SectionErrorFallback,
} from "@/components/ui/error-boundary-enhanced";
import { HeroSectionSkeleton } from "@/components/ui/loading-states";
//import FloatingBackground from "@/components/hero/floating-background";
//import HeroTitle from "@/components/hero/hero-title";
//import HeroDescription from "@/components/hero/hero-description";
//import MetricsGrid from "@/components/hero/metrics-grid";
//import HeroActions from "@/components/hero/hero-actions";
import {
  heroContent,
  heroMetrics,
  floatingNodesConfig,
} from "@/data/hero-data";
import { motion } from "framer-motion";
import { ArrowRight, Zap, Shield, Globe, Menu, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import AnimatedCounter from "./animated-counter";
import { ANIMATION_VARIANTS, TEXT_STYLES, BUTTON_STYLES, CARD_STYLES } from "../../../shared/styles";
import { EXTERNAL_URLS } from "@shared/config";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-white via-mint/30 to-sage/10 dark:from-gray-900 dark:via-gray-800 dark:to-sage/5" aria-labelledby="hero-heading">
      {/* Simplified Visual Background */}
      <div className="absolute inset-0">
        {/* Static Network Visualization - Reduced Visual Noise */}
        <div className="absolute inset-0 flex items-center justify-center opacity-5 dark:opacity-3" aria-hidden="true">
          <svg 
            className="w-full h-full max-w-4xl" 
            viewBox="0 0 800 600" 
            fill="none"
            preserveAspectRatio="xMidYMid meet"
          >
            {/* Network nodes - Static, no animation */}
            <g>
              <circle cx="150" cy="150" r="8" fill="currentColor" className="text-sage" />
              <circle cx="350" cy="100" r="10" fill="currentColor" className="text-medium-forest" />
              <circle cx="650" cy="180" r="6" fill="currentColor" className="text-sage" />
              <circle cx="200" cy="350" r="12" fill="currentColor" className="text-dark-sage" />
              <circle cx="550" cy="400" r="8" fill="currentColor" className="text-sage" />
              <circle cx="400" cy="300" r="14" fill="currentColor" className="text-medium-forest" />
            </g>
            {/* Connecting lines - Simplified */}
            <g className="stroke-current text-sage opacity-20" strokeWidth="1.5">
              <line x1="150" y1="150" x2="350" y2="100" />
              <line x1="350" y1="100" x2="650" y2="180" />
              <line x1="200" y1="350" x2="400" y2="300" />
              <line x1="400" y1="300" x2="550" y2="400" />
              <line x1="150" y1="150" x2="200" y2="350" />
              <line x1="350" y1="100" x2="400" y2="300" />
            </g>
          </svg>
        </div>
        
        {/* Single Subtle Background Element - Reduced Motion */}
        <div 
          className="absolute top-1/4 left-1/4 w-1/2 h-1/2 bg-gradient-to-br from-sage/10 to-medium-forest/5 rounded-full blur-3xl opacity-30 dark:opacity-20"
          style={{
            transform: 'translate(-25%, -25%)',
          }}
          aria-hidden="true"
        />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="mb-12">
          <div
            className="inline-flex items-center gap-3 px-5 py-3 bg-sage/15 rounded-lg border border-sage/30 mb-6 backdrop-blur-sm"
          >
            <Zap className="w-5 h-5 text-dark-forest" aria-hidden="true" />
            <span className="text-base font-semibold text-dark-forest dark:text-white">Next-Gen Blockchain Technology</span>
          </div>

          <h1 id="hero-heading" className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6">
            <span className="block text-dark-forest dark:text-white">
              PeoChain
            </span>
            <span className="block text-2xl sm:text-3xl lg:text-4xl mt-3 font-medium text-medium-forest dark:text-sage">
              Blockchain Trilemma
              <span className="block text-dark-forest dark:text-white font-bold"> Solved</span>
            </span>
          </h1>

          <p
            className="text-lg sm:text-xl lg:text-2xl text-gray-800 dark:text-gray-200 max-w-3xl mx-auto leading-relaxed mb-10"
          >
            Revolutionary blockchain technology achieving unprecedented <span className="text-dark-forest dark:text-white font-semibold">scalability</span>, 
            <span className="text-dark-forest dark:text-white font-semibold"> security</span>, and <span className="text-dark-forest dark:text-white font-semibold">decentralization</span> through innovative consensus mechanisms.
          </p>
        </div>

        <div className="flex flex-col gap-5 sm:gap-6 justify-center items-center mb-16">
          <div>
            <Button
              size="lg"
              className="w-full sm:w-auto px-8 sm:px-10 py-4 sm:py-5 text-lg font-bold bg-dark-forest hover:bg-medium-forest text-white shadow-lg hover:shadow-xl transition-all duration-300 rounded-lg min-w-[250px] max-w-sm sm:max-w-none focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-dashed focus-visible:outline-2"
              onClick={() => window.open(EXTERNAL_URLS.GET_STARTED, "_blank")}
              aria-label="Join Validator Network (opens in new tab)"
            >
              <span className="flex items-center justify-center">
                Join Validator Network
                <ArrowRight className="ml-2 h-5 w-5" aria-hidden="true" />
              </span>
            </Button>
          </div>

          <div>
            <Button
              variant="outline"
              size="lg"
              className="w-full sm:w-auto px-8 sm:px-10 py-4 sm:py-5 text-lg font-bold border-2 border-dark-forest text-dark-forest dark:text-white dark:border-white hover:bg-dark-forest hover:text-white dark:hover:bg-white dark:hover:text-dark-forest bg-white/90 dark:bg-transparent shadow-md hover:shadow-lg transition-all duration-300 rounded-lg min-w-[250px] max-w-sm sm:max-w-none focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-dashed focus-visible:outline-2"
              onClick={() => window.open(EXTERNAL_URLS.WHITEPAPER_PDF, "_blank")}
              aria-label="Read Whitepaper (opens in new tab)"
            >
              <span className="flex items-center justify-center">
                Read Whitepaper
                <FileText className="ml-2 h-5 w-5" aria-hidden="true" />
              </span>
            </Button>
          </div>
        </div>

        <motion.div
          variants={ANIMATION_VARIANTS.STAGGER_CONTAINER}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto"
        >
          {[
            { 
              icon: Zap, 
              value: 100000, 
              suffix: "+", 
              label: "Transactions/Second", 
              gradient: "from-yellow-400 to-orange-500",
              bgGradient: "from-yellow-50 to-orange-50",
              darkBgGradient: "from-yellow-900/20 to-orange-900/20",
              description: "Lightning-fast processing"
            },
            { 
              icon: Shield, 
              value: 99.9, 
              decimals: 1, 
              suffix: "%", 
              label: "Security Level", 
              gradient: "from-green-400 to-emerald-500",
              bgGradient: "from-green-50 to-emerald-50",
              darkBgGradient: "from-green-900/20 to-emerald-900/20",
              description: "Bank-grade protection"
            },
            { 
              icon: Globe, 
              value: 10000, 
              suffix: "+", 
              label: "Global Nodes", 
              gradient: "from-blue-400 to-indigo-500",
              bgGradient: "from-blue-50 to-indigo-50",
              darkBgGradient: "from-blue-900/20 to-indigo-900/20",
              description: "Worldwide network"
            }
          ].map((metric, index) => (
            <motion.div
              key={index}
              variants={ANIMATION_VARIANTS.FADE_IN}
              whileHover={{ y: -12, scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
              className="cursor-pointer group"
            >
              <Card className={`relative overflow-hidden bg-gradient-to-br ${metric.bgGradient} dark:${metric.darkBgGradient} border-2 border-transparent group-hover:border-medium-forest/30 hover:shadow-2xl transition-all duration-500`}>
                <CardContent className="p-8 text-center relative z-10">
                  <motion.div
                    className="flex items-center justify-center mb-6"
                    whileHover={{ scale: 1.15, rotate: 10 }}
                    transition={{ type: "spring", stiffness: 500, damping: 15 }}
                  >
                    <div className={`p-4 rounded-2xl bg-gradient-to-br ${metric.gradient} shadow-lg`}>
                      <metric.icon className="h-10 w-10 text-white" />
                    </div>
                  </motion.div>
                  <div className="text-5xl font-black text-foreground mb-2">
                    <AnimatedCounter 
                      to={metric.value} 
                      duration={2500}
                      suffix={metric.suffix}
                      decimals={metric.decimals}
                    />
                  </div>
                  <h3 className="text-lg font-bold text-foreground mb-2">
                    {metric.label}
                  </h3>
                  <p className="text-sm text-muted-foreground font-medium">
                    {metric.description}
                  </p>
                </CardContent>
                <div className={`absolute inset-0 bg-gradient-to-br ${metric.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />
                <div className="absolute -inset-1 bg-gradient-to-r from-sage via-medium-forest to-dark-sage opacity-0 group-hover:opacity-20 blur-lg transition-opacity duration-500" />
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Mobile Sticky CTA Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl border-t border-sage/20 p-4 sm:hidden">
        <div className="flex gap-3">
          <Button
            size="lg"
            className="flex-1 py-3 text-base font-bold bg-gradient-to-r from-medium-forest to-dark-sage hover:from-dark-sage hover:to-medium-forest text-white shadow-lg transition-all duration-300"
            onClick={() => window.open(EXTERNAL_URLS.GET_STARTED, "_blank")}
          >
            Join Network
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="flex-1 py-3 text-base font-bold border-2 border-medium-forest text-medium-forest hover:bg-medium-forest hover:text-white transition-all duration-300"
            onClick={() => window.open(EXTERNAL_URLS.WHITEPAPER_PDF, "_blank")}
          >
            Whitepaper
            <FileText className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;