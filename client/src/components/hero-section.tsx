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
import { ArrowRight, Zap, Shield, Globe, Heart, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import AnimatedCounter from "./animated-counter";
import { ANIMATION_VARIANTS, TEXT_STYLES, BUTTON_STYLES, CARD_STYLES } from "../../../shared/styles";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Enhanced Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-mint via-white to-sage/10 dark:from-gray-900 dark:via-gray-800 dark:to-sage/5">
        {/* Floating Elements */}
        <motion.div
          className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-sage/30 to-medium-forest/20 rounded-full blur-2xl"
          animate={{
            x: [0, 100, 0],
            y: [0, -50, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-24 h-24 bg-gradient-to-br from-medium-forest/30 to-dark-sage/20 rounded-full blur-2xl"
          animate={{
            x: [0, -80, 0],
            y: [0, 60, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute top-1/2 left-1/4 w-16 h-16 bg-sage/10 rounded-full blur-xl"
          animate={{
            rotate: [0, 360],
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "linear",
          }}
        />
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
            <Heart className="w-4 h-4 text-sage" />
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
            className={`${TEXT_STYLES.BODY_LG} ${TEXT_STYLES.FOREST_MUTED} max-w-4xl mx-auto leading-relaxed mb-8`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            Revolutionary blockchain technology achieving unprecedented scalability, 
            security, and decentralization through innovative consensus mechanisms 
            and cutting-edge cryptographic protocols.
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
              className={`${BUTTON_STYLES.PRIMARY} ${BUTTON_STYLES.SIZE_LG} ${BUTTON_STYLES.ANIMATION} group relative overflow-hidden`}
            >
              <span className="relative z-10 flex items-center">
                Get Started
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-medium-forest to-dark-sage opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
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
              className={`${BUTTON_STYLES.SECONDARY} ${BUTTON_STYLES.SIZE_LG} backdrop-blur-sm bg-white/10 dark:bg-gray-900/10 relative overflow-hidden group`}
            >
              <span className="relative z-10 flex items-center">
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
              <Card className={`${CARD_STYLES.BASE} group relative overflow-hidden hover:shadow-2xl transition-all duration-500`}>
                <CardContent className="p-8 text-center relative z-10">
                  <motion.div
                    className="flex items-center justify-center mb-6"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <div className={`p-3 rounded-full bg-gradient-to-br from-sage/20 to-medium-forest/20 ${metric.color}`}>
                      <metric.icon className="h-8 w-8" />
                    </div>
                  </motion.div>
                  <div className={`text-4xl font-bold ${TEXT_STYLES.FOREST} mb-3`}>
                    <AnimatedCounter 
                      to={metric.value} 
                      duration={2000}
                      suffix={metric.suffix}
                    />
                  </div>
                  <p className={`${TEXT_STYLES.FOREST_MUTED} font-medium tracking-wide`}>
                    {metric.label}
                  </p>
                </CardContent>
                <div className="absolute inset-0 bg-gradient-to-br from-sage/5 to-medium-forest/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;