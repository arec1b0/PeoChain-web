import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const TechnologySection = () => {
  const technologies = [
    {
      title: "Consensus Algorithm",
      description: "Innovative Proof-of-Stake mechanism with Byzantine fault tolerance and quantum-resistant signatures.",
      details: ["99.9% uptime guarantee", "Sub-second finality", "Energy efficient", "Quantum-safe"],
      color: "indigo",
      bgGradient: "from-indigo-50 to-indigo-100/50 dark:from-indigo-950/20 dark:to-indigo-900/10"
    },
    {
      title: "Performance Engine",
      description: "High-throughput transaction processing with parallel execution and state sharding.",
      details: ["100,000+ TPS", "Linear scalability", "Optimized for DeFi", "Parallel processing"],
      color: "amber",
      bgGradient: "from-amber-50 to-amber-100/50 dark:from-amber-950/20 dark:to-amber-900/10"
    },
    {
      title: "Sustainability",
      description: "Carbon-negative blockchain with renewable energy integration and offset programs.",
      details: ["99% less energy usage", "Carbon offset programs", "Green mining", "Renewable powered"],
      color: "emerald",
      bgGradient: "from-emerald-50 to-emerald-100/50 dark:from-emerald-950/20 dark:to-emerald-900/10"
    },
    {
      title: "Interoperability",
      description: "Seamless cross-chain communication and asset transfers with universal protocols.",
      details: ["Multi-chain bridges", "Universal protocols", "Cross-chain DeFi", "Asset portability"],
      color: "blue",
      bgGradient: "from-blue-50 to-blue-100/50 dark:from-blue-950/20 dark:to-blue-900/10"
    },
    {
      title: "Smart Contracts",
      description: "Advanced virtual machine with formal verification support and gas optimization.",
      details: ["Gas optimization", "Security auditing", "Multi-language support", "Formal verification"],
      color: "purple",
      bgGradient: "from-purple-50 to-purple-100/50 dark:from-purple-950/20 dark:to-purple-900/10"
    },
    {
      title: "Developer Tools",
      description: "Comprehensive SDK and toolchain for rapid development with rich documentation.",
      details: ["Complete SDK", "Rich documentation", "Testing frameworks", "IDE integrations"],
      color: "teal",
      bgGradient: "from-teal-50 to-teal-100/50 dark:from-teal-950/20 dark:to-teal-900/10"
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  const GeometricIcon = ({ color, index }: { color: string; index: number }) => {
    const shapes = [
      // Shield/Security shape
      "M12 2L2 7l10 14 10-14-10-5z",
      // Lightning/Performance shape  
      "M13 2L3 14h9l-1 8 10-12h-9l1-8z",
      // Globe/Sustainability shape
      "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.94-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z",
      // Link/Interoperability shape
      "M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1zM8 13h8v-2H8v2zm9-6h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1s-1.39 3.1-3.1 3.1h-4V17h4c2.76 0 5-2.24 5-5s-2.24-5-5-5z",
      // Code/Smart Contracts shape
      "M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0L19.2 12l-4.6-4.6L16 6l6 6-6 6-1.4-1.4z",
      // Tool/Developer shape
      "M22.7 19l-9.1-9.1c.9-2.3.4-5-1.5-6.9-2-2-5-2.4-7.4-1.3L9 6 6 9 1.6 4.7C.4 7.1.9 10.1 2.9 12.1c1.9 1.9 4.6 2.4 6.9 1.5l9.1 9.1c.4.4 1 .4 1.4 0l2.3-2.3c.5-.4.5-1.1.1-1.4z"
    ];

    return (
      <div className={`w-16 h-16 rounded-xl bg-gradient-to-br from-${color}-500 to-${color}-600 dark:from-${color}-400 dark:to-${color}-500 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
        <svg 
          width="28" 
          height="28" 
          viewBox="0 0 24 24" 
          fill="none" 
          className="text-white"
        >
          <path 
            d={shapes[index]} 
            fill="currentColor"
          />
        </svg>
      </div>
    );
  };

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 via-white to-gray-50/50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 relative">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-40">
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,.03)_1px,transparent_1px),linear-gradient(rgba(0,0,0,.03)_1px,transparent_1px)] bg-[size:64px_64px] dark:bg-[linear-gradient(90deg,rgba(255,255,255,.03)_1px,transparent_1px),linear-gradient(rgba(255,255,255,.03)_1px,transparent_1px)]" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center px-4 py-2 bg-sage/10 dark:bg-sage/20 rounded-full mb-6">
            <span className="text-sm font-medium text-sage dark:text-sage-300">
              ADVANCED TECHNOLOGY
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Built for Enterprise Scale
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Professional-grade blockchain infrastructure designed for high-performance 
            decentralized finance applications and enterprise adoption
          </p>
        </motion.div>

        {/* Technology Cards Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16"
        >
          {technologies.map((tech, index) => (
            <motion.div key={index} variants={itemVariants}>
              <Card className={`group relative overflow-hidden border border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-xl transition-all duration-500 bg-gradient-to-br ${tech.bgGradient} hover:scale-[1.02]`}>
                <CardContent className="p-8">
                  {/* Geometric Icon */}
                  <GeometricIcon color={tech.color} index={index} />

                  {/* Content */}
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 mt-6">
                    {tech.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                    {tech.description}
                  </p>

                  {/* Feature List */}
                  <ul className="space-y-2">
                    {tech.details.map((detail, detailIndex) => (
                      <li key={detailIndex} className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                        <div className={`w-1.5 h-1.5 bg-${tech.color}-500 rounded-full mr-3 flex-shrink-0`} />
                        {detail}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-center"
        >
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-12 shadow-xl border border-gray-200 dark:border-gray-700 max-w-4xl mx-auto">
            <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Enterprise-Ready Development
            </h3>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
              Join leading financial institutions and developers building the next generation 
              of decentralized finance solutions with our proven technology stack
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-sage hover:bg-sage/90 text-white px-8 py-3 text-lg transition-colors duration-300">
                Start Development
              </Button>
              <Button variant="outline" className="border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 px-8 py-3 text-lg transition-colors duration-300">
                Technical Documentation
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TechnologySection;