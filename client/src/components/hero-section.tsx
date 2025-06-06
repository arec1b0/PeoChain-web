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
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-white via-mint/40 to-sage/20 dark:from-gray-900 dark:via-gray-800 dark:to-sage/10">
      {/* Enhanced Visual Background */}
      <div className="absolute inset-0">
        {/* Main Visual Element - Abstract Blockchain Network */}
        <div className="absolute inset-0 flex items-center justify-center opacity-10 dark:opacity-5">
          <svg 
            className="w-full h-full max-w-4xl" 
            viewBox="0 0 800 600" 
            fill="none"
            preserveAspectRatio="xMidYMid meet"
          >
            {/* Network nodes */}
            <g className="animate-pulse">
              <circle cx="150" cy="150" r="8" fill="currentColor" className="text-sage" />
              <circle cx="350" cy="100" r="10" fill="currentColor" className="text-medium-forest" />
              <circle cx="650" cy="180" r="6" fill="currentColor" className="text-sage" />
              <circle cx="200" cy="350" r="12" fill="currentColor" className="text-dark-sage" />
              <circle cx="550" cy="400" r="8" fill="currentColor" className="text-sage" />
              <circle cx="400" cy="300" r="14" fill="currentColor" className="text-medium-forest" />
            </g>
            {/* Connecting lines */}
            <g className="stroke-current text-sage opacity-30" strokeWidth="2">
              <line x1="150" y1="150" x2="350" y2="100" />
              <line x1="350" y1="100" x2="650" y2="180" />
              <line x1="200" y1="350" x2="400" y2="300" />
              <line x1="400" y1="300" x2="550" y2="400" />
              <line x1="150" y1="150" x2="200" y2="350" />
              <line x1="350" y1="100" x2="400" y2="300" />
            </g>
          </svg>
        </div>
        
        {/* Floating Animation Elements */}
        <motion.div
          className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-sage/20 to-medium-forest/10 rounded-full blur-2xl"
          animate={{
            x: [0, 80, 0],
            y: [0, -30, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-24 h-24 bg-gradient-to-br from-medium-forest/20 to-dark-sage/10 rounded-full blur-2xl"
          animate={{
            x: [0, -60, 0],
            y: [0, 40, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          variants={ANIMATION_VARIANTS.FADE_IN_UP}
          initial="hidden"
          animate="visible"
          className="mb-16"
        >
          <motion.div
            className="inline-flex items-center gap-3 px-5 py-3 bg-gradient-to-r from-sage/15 to-medium-forest/10 rounded-full border border-sage/30 mb-8 backdrop-blur-sm"
            whileHover={{ scale: 1.05, y: -2 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <Zap className="w-5 h-5 text-medium-forest" />
            <span className="text-base font-semibold text-medium-forest">Next-Gen Blockchain Technology</span>
          </motion.div>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold leading-[0.9] text-foreground mb-8">
            <motion.span
              className="block text-medium-forest"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              PeoChain
            </motion.span>
            <motion.span
              className="block text-3xl sm:text-4xl lg:text-5xl xl:text-6xl mt-4 font-medium bg-gradient-to-r from-sage via-medium-forest to-dark-sage bg-clip-text text-transparent"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              Blockchain Trilemma
              <span className="block text-medium-forest font-bold"> Solved</span>
            </motion.span>
          </h1>

          <motion.p
            className="text-xl sm:text-2xl lg:text-3xl text-muted-foreground max-w-5xl mx-auto leading-relaxed mb-12 font-medium"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            Revolutionary blockchain technology achieving unprecedented <span className="text-medium-forest font-semibold">scalability</span>, 
            <span className="text-medium-forest font-semibold"> security</span>, and <span className="text-medium-forest font-semibold">decentralization</span> through innovative consensus mechanisms.
          </motion.p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex flex-col gap-4 sm:gap-6 justify-center items-center mb-20"
        >
          <motion.div
            whileHover={{ scale: 1.03, y: -3 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            <Button
              size="lg"
              className="px-12 py-6 text-xl font-bold bg-gradient-to-r from-medium-forest to-dark-sage hover:from-dark-sage hover:to-medium-forest text-white shadow-2xl hover:shadow-3xl transition-all duration-300 rounded-2xl group relative overflow-hidden min-w-[280px]"
              onClick={() => window.open(EXTERNAL_URLS.GET_STARTED, "_blank")}
            >
              <span className="relative z-10 flex items-center justify-center">
                Join Validator Network
                <ArrowRight className="ml-3 h-6 w-6 transition-transform group-hover:translate-x-2" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-sage to-medium-forest opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </Button>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.03, y: -3 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            <Button
              variant="outline"
              size="lg"
              className="px-12 py-6 text-xl font-bold border-2 border-medium-forest text-medium-forest hover:bg-medium-forest hover:text-white backdrop-blur-sm bg-white/80 dark:bg-gray-900/80 shadow-xl hover:shadow-2xl transition-all duration-300 rounded-2xl group relative overflow-hidden min-w-[280px]"
              onClick={() => window.open(EXTERNAL_URLS.WHITEPAPER_PDF, "_blank")}
            >
              <span className="relative z-10 flex items-center justify-center">
                Read Whitepaper
                <FileText className="ml-3 h-6 w-6 transition-transform group-hover:scale-110" />
              </span>
            </Button>
          </motion.div>
        </motion.div>

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
    </section>
  );
};

export default HeroSection;