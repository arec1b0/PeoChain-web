import React from "react";
import { motion } from "framer-motion";
import MainLayout from "@/components/layout/main-layout";
import TechStackSection from "@/components/tech-stack-section";
import TechnologySection from "@/components/technology-section";

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

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <MainLayout className="bg-gradient-to-br from-mint/50 to-white dark:from-gray-900 dark:to-gray-800">
      {/* Hero Section */}
      <motion.section
        className="pt-24 pb-8 px-4 sm:px-6 lg:px-8"
        initial="hidden"
        animate="visible"
        variants={fadeIn}
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-5xl md:text-6xl font-raleway font-bold text-forest dark:text-white mb-6">
              Technology Stack
            </h1>
            <p className="text-xl font-hammersmith text-forest/80 dark:text-gray-300 max-w-3xl mx-auto">
              Discover the innovative technologies powering PeoChain's
              revolutionary blockchain platform
            </p>
          </div>
        </div>
      </motion.section>

      {/* Advanced Technology Stack Section with lazy loading */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        <TechStackSection />
      </motion.div>

      {/* Revolutionary Technology Section with lazy loading */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
      >
        <TechnologySection />
      </motion.div>
    </MainLayout>
  );
};

export default Technology;
