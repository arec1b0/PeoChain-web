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

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Professional Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-white to-gray-100/50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        {/* Subtle Grid Pattern */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,.02)_1px,transparent_1px),linear-gradient(rgba(0,0,0,.02)_1px,transparent_1px)] bg-[size:80px_80px] dark:bg-[linear-gradient(90deg,rgba(255,255,255,.02)_1px,transparent_1px),linear-gradient(rgba(255,255,255,.02)_1px,transparent_1px)]" />
        </div>
        {/* Minimal Geometric Elements */}
        <div className="absolute top-20 right-20 w-2 h-2 bg-sage/40 rounded-full" />
        <div className="absolute bottom-32 left-32 w-1 h-1 bg-sage/30 rounded-full" />
        <div className="absolute top-1/3 left-20 w-1.5 h-1.5 bg-sage/20 rounded-full" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
        <motion.div
          variants={ANIMATION_VARIANTS.FADE_IN_UP}
          initial="hidden"
          animate="visible"
          className="mb-12"
        >
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 bg-sage/10 rounded-full border border-sage/20 mb-6"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <Menu className="w-4 h-4 text-sage" />
            <span className="text-sm font-medium text-sage">Next-Gen Blockchain Technology</span>
          </motion.div>

          <h1 className={`${TEXT_STYLES.HEADING_XL} ${TEXT_STYLES.FOREST} mb-6 leading-tight`}>
            <motion.span
              className="block"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              PeoChain
            </motion.span>
            <motion.span
              className="block text-sage text-3xl sm:text-4xl lg:text-5xl mt-4 font-light"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              Blockchain Trilemma
              <span className="text-medium-forest font-medium"> Solved</span>
            </motion.span>
          </h1>

          <motion.p
            className="text-xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            Professional-grade blockchain infrastructure designed for institutional adoption. 
            Our proven technology delivers enterprise-scale performance, security, and 
            regulatory compliance for the next generation of financial services.
          </motion.p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16"
        >
          <motion.div
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <Button
              size="lg"
              className="bg-sage hover:bg-sage/90 text-white px-8 py-4 text-lg font-medium transition-colors duration-300 group"
            >
              <span className="flex items-center">
                Get Started
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </span>
            </Button>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <Button
              variant="outline"
              size="lg"
              className="border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 px-8 py-4 text-lg font-medium transition-colors duration-300 group"
            >
              <span className="flex items-center">
                View Whitepaper
                <FileText className="ml-2 h-5 w-5 transition-transform group-hover:scale-110" />
              </span>
            </Button>
          </motion.div>
        </motion.div>

        <motion.div
          variants={ANIMATION_VARIANTS.STAGGER_CONTAINER}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto"
        >
          {[
            { icon: Zap, value: 100000, suffix: "+", label: "Transactions/Second", color: "text-yellow-500" },
            { icon: Shield, value: 99.9, decimals: 1, suffix: "%", label: "Security Level", color: "text-green-500" },
            { icon: Globe, value: 10000, suffix: "+", label: "Global Nodes", color: "text-blue-500" }
          ].map((metric, index) => (
            <motion.div
              key={index}
              variants={ANIMATION_VARIANTS.FADE_IN}
              whileHover={{ y: -8, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Card className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border border-gray-200 dark:border-gray-700 group relative overflow-hidden hover:shadow-xl transition-all duration-500">
                <CardContent className="p-8 text-center relative z-10">
                  <motion.div
                    className="flex items-center justify-center mb-6"
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <div className={`p-3 rounded-xl bg-gray-100 dark:bg-gray-700 ${metric.color}`}>
                      <metric.icon className="h-8 w-8" />
                    </div>
                  </motion.div>
                  <div className="text-4xl font-bold text-gray-900 dark:text-white mb-3">
                    <AnimatedCounter 
                      to={metric.value} 
                      duration={2000}
                      suffix={metric.suffix}
                    />
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 font-medium tracking-wide">
                    {metric.label}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;