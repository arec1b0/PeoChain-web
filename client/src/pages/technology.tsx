import React from "react";
import { motion } from "framer-motion";
import MainLayout from "@/components/layout/main-layout";
import TechStackSection from "@/components/tech-stack-section";
import TechnologySection from "@/components/technology-section";
import { useMobilePerformance } from "@/hooks";

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 },
  },
};

const Technology: React.FC = () => {
  const { useEffect } = React;
  const { shouldReduceMotion, shouldLazyLoad, isMobile } = useMobilePerformance();

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Optimize animations based on device capabilities
  const animationConfig = {
    duration: shouldReduceMotion ? 0.2 : 0.6,
    delay: shouldReduceMotion ? 0.1 : 0.3,
  };

  return (
    <MainLayout className="bg-gradient-to-br from-mint/50 to-white dark:from-gray-900 dark:to-gray-800">
      {/* Hero Section */}
      <section className="pt-24 pb-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8">
            <h1 className={cn(
              "font-raleway font-bold text-forest dark:text-white mb-6",
              isMobile ? "text-4xl" : "text-5xl md:text-6xl"
            )}>
              Technology Stack
            </h1>
            <p className={cn(
              "font-hammersmith text-forest/80 dark:text-gray-300 max-w-3xl mx-auto",
              isMobile ? "text-lg" : "text-xl"
            )}>
              Discover the innovative technologies powering PeoChain's
              revolutionary blockchain platform
            </p>
          </div>
        </div>
      </section>

      {/* Advanced Technology Stack Section with lazy loading */}
      <motion.div
        initial={shouldReduceMotion ? {} : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: animationConfig.delay, duration: animationConfig.duration }}
      >
        <TechStackSection />
      </motion.div>

      {/* Revolutionary Technology Section with lazy loading */}
      <motion.div
        initial={shouldReduceMotion ? {} : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ 
          delay: animationConfig.delay + 0.2, 
          duration: animationConfig.duration 
        }}
      >
        <TechnologySection />
      </motion.div>
    </MainLayout>
  );
};

export default Technology;
