import React from "react";
import { motion } from "framer-motion";
import { Shield, Zap, Globe, Link2, Check, ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const TechnologySection = () => {
  const technologies = [
    {
      icon: Shield,
      title: "Consensus Algorithm",
      description: "Innovative Proof-of-Stake mechanism with Byzantine fault tolerance and quantum-resistant signatures.",
      details: ["99.9% uptime guarantee", "Sub-second finality", "Energy efficient", "Quantum-safe"],
      gradient: "from-indigo-500/20 to-purple-500/20",
      iconColor: "text-indigo-600 dark:text-indigo-400"
    },
    {
      icon: Zap,
      title: "Performance Engine",
      description: "High-throughput transaction processing with parallel execution and state sharding.",
      details: ["100,000+ TPS", "Linear scalability", "Optimized for DeFi", "Parallel processing"],
      gradient: "from-yellow-500/20 to-orange-500/20",
      iconColor: "text-yellow-600 dark:text-yellow-400"
    },
    {
      icon: Globe,
      title: "Sustainability",
      description: "Carbon-negative blockchain with renewable energy integration and offset programs.",
      details: ["99% less energy usage", "Carbon offset programs", "Green mining", "Renewable powered"],
      gradient: "from-green-500/20 to-emerald-500/20",
      iconColor: "text-green-600 dark:text-green-400"
    },
    {
      icon: Link2,
      title: "Interoperability",
      description: "Seamless cross-chain communication and asset transfers with universal protocols.",
      details: ["Multi-chain bridges", "Universal protocols", "Cross-chain DeFi", "Asset portability"],
      gradient: "from-blue-500/20 to-cyan-500/20",
      iconColor: "text-blue-600 dark:text-blue-400"
    },
    {
      icon: Check,
      title: "Smart Contracts",
      description: "Advanced virtual machine with formal verification support and gas optimization.",
      details: ["Gas optimization", "Security auditing", "Multi-language support", "Formal verification"],
      gradient: "from-purple-500/20 to-pink-500/20",
      iconColor: "text-purple-600 dark:text-purple-400"
    },
    {
      icon: ArrowRight,
      title: "Developer Tools",
      description: "Comprehensive SDK and toolchain for rapid development with rich documentation.",
      details: ["Complete SDK", "Rich documentation", "Testing frameworks", "IDE integrations"],
      gradient: "from-teal-500/20 to-cyan-500/20",
      iconColor: "text-teal-600 dark:text-teal-400"
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
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-50 via-white to-sage/5 dark:from-gray-900 dark:via-gray-800 dark:to-slate-900 relative overflow-hidden">
      {/* Enhanced Background Pattern */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(109,158,121,0.08),transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_70%,rgba(34,197,94,0.06),transparent_60%)]" />
        <motion.div
          className="absolute top-20 right-20 w-40 h-40 bg-gradient-to-br from-sage/20 to-emerald-300/10 rounded-full blur-3xl"
          animate={{
            x: [0, -30, 0],
            y: [0, 20, 0],
            scale: [1, 1.2, 1],
            rotate: [0, 45, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-20 left-20 w-32 h-32 bg-gradient-to-br from-medium-forest/15 to-sage/10 rounded-full blur-2xl"
          animate={{
            x: [0, 50, 0],
            y: [0, -30, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-raleway font-bold text-forest dark:text-white mb-6">
            Revolutionary Technology
          </h2>
          <p className="text-xl font-hammersmith text-forest/80 dark:text-gray-300 max-w-4xl mx-auto">
            Explore the cutting-edge innovations that power PeoChain's next-generation blockchain infrastructure
          </p>
        </motion.div>

        {/* Technology Cards Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16"
        >
          {technologies.map((tech, index) => {
            const IconComponent = tech.icon;
            return (
              <motion.div key={index} variants={itemVariants}>
                <Card className={`group relative overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-500 bg-gradient-to-br ${tech.gradient} backdrop-blur-sm hover:scale-105`}>
                  <CardContent className="p-8">
                    {/* Icon */}
                    <div className={`w-16 h-16 rounded-xl bg-white dark:bg-gray-800 shadow-md flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                      <IconComponent className={`w-8 h-8 ${tech.iconColor}`} />
                    </div>

                    {/* Content */}
                    <h3 className="text-xl font-raleway font-bold text-forest dark:text-white mb-4">
                      {tech.title}
                    </h3>
                    <p className="text-forest/80 dark:text-gray-300 font-hammersmith mb-6 leading-relaxed">
                      {tech.description}
                    </p>

                    {/* Feature List */}
                    <ul className="space-y-2">
                      {tech.details.map((detail, detailIndex) => (
                        <li key={detailIndex} className="flex items-center text-sm text-forest/70 dark:text-gray-400">
                          <div className="w-2 h-2 bg-sage rounded-full mr-3 flex-shrink-0" />
                          {detail}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-center"
        >
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-sage/20">
            <h3 className="text-2xl font-raleway font-bold text-forest dark:text-white mb-4">
              Ready to Build on PeoChain?
            </h3>
            <p className="text-forest/80 dark:text-gray-300 font-hammersmith mb-6 max-w-2xl mx-auto">
              Join thousands of developers building the future of decentralized finance with our comprehensive developer toolkit
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button className="bg-sage hover:bg-sage/90 text-white px-8 py-3 rounded-xl font-hammersmith transition-all duration-300">
                Start Building
              </Button>
              <Button variant="outline" className="border-sage text-sage hover:bg-sage/10 px-8 py-3 rounded-xl font-hammersmith transition-all duration-300">
                View Documentation
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TechnologySection;