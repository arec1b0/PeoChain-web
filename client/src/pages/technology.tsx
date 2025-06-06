import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import MainLayout from "@/components/layout/main-layout";
import TechStackSection from "@/components/tech-stack-section";
import TechnologySection from "@/components/technology-section";
import { Container, Section } from "@/components/ui/layout-system";
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
      {/* Hero Section with enhanced layout system */}
      <Section spacing="xl" container containerVariant="wide">
        <Container variant="default">
          <div className="text-center space-y-fluid-lg">
            <h1 className="text-fluid-4xl font-bold leading-tight text-foreground">
              Technology Stack
            </h1>
            <p className="text-fluid-lg leading-relaxed text-muted-foreground max-w-prose mx-auto">
              Discover the innovative technologies powering PeoChain's
              revolutionary blockchain platform
            </p>
          </div>
        </Container>
      </Section>

      {/* Advanced Technology Stack Section with enhanced spacing */}
      <motion.div
        initial={shouldReduceMotion ? {} : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: animationConfig.delay, duration: animationConfig.duration }}
      >
        <TechStackSection />
      </motion.div>

      {/* Revolutionary Technology Section with enhanced spacing */}
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
