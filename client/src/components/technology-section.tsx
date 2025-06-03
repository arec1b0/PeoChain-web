import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const TechnologySection = () => {
  const technologies = [
    {
      iconSymbol: "🛡️",
      title: "Consensus Algorithm",
      description: "Innovative Proof-of-Stake mechanism with Byzantine fault tolerance and quantum-resistant signatures.",
      details: ["99.9% uptime guarantee", "Sub-second finality", "Energy efficient", "Quantum-safe"],
      gradient: "from-indigo-500/20 to-purple-500/20",
      accentColor: "border-indigo-200 dark:border-indigo-800"
    },
    {
      iconSymbol: "⚡",
      title: "Performance Engine",
      description: "High-throughput transaction processing with parallel execution and state sharding.",
      details: ["100,000+ TPS", "Linear scalability", "Optimized for DeFi", "Parallel processing"],
      gradient: "from-yellow-500/20 to-orange-500/20",
      accentColor: "border-yellow-200 dark:border-yellow-800"
    },
    {
      iconSymbol: "🌍",
      title: "Sustainability",
      description: "Carbon-negative blockchain with renewable energy integration and offset programs.",
      details: ["99% less energy usage", "Carbon offset programs", "Green mining", "Renewable powered"],
      gradient: "from-green-500/20 to-emerald-500/20",
      accentColor: "border-green-200 dark:border-green-800"
    },
    {
      iconSymbol: "🔗",
      title: "Interoperability",
      description: "Seamless cross-chain communication and asset transfers with universal protocols.",
      details: ["Multi-chain bridges", "Universal protocols", "Cross-chain DeFi", "Asset portability"],
      gradient: "from-blue-500/20 to-cyan-500/20",
      accentColor: "border-blue-200 dark:border-blue-800"
    },
    {
      iconSymbol: "💻",
      title: "Smart Contracts",
      description: "Advanced virtual machine with formal verification support and gas optimization.",
      details: ["Gas optimization", "Security auditing", "Multi-language support", "Formal verification"],
      gradient: "from-purple-500/20 to-pink-500/20",
      accentColor: "border-purple-200 dark:border-purple-800"
    },
    {
      iconSymbol: "🔧",
      title: "Developer Tools",
      description: "Comprehensive SDK and toolchain for rapid development with rich documentation.",
      details: ["Complete SDK", "Rich documentation", "Testing frameworks", "IDE integrations"],
      gradient: "from-teal-500/20 to-cyan-500/20",
      accentColor: "border-teal-200 dark:border-teal-800"
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.7,
        ease: "easeOut",
      },
    },
  };

  return (
    <section className="py-32 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-50 via-white to-emerald-50/30 dark:from-gray-900 dark:via-gray-800 dark:to-emerald-950/20 relative overflow-hidden">
      {/* Enhanced Background Elements */}
      <div className="absolute inset-0 opacity-40">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_25%,rgba(34,197,94,0.1),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_75%,rgba(109,158,121,0.08),transparent_60%)]" />
        <motion.div
          className="absolute top-32 right-24 w-48 h-48 bg-gradient-to-br from-emerald-400/20 to-sage/10 rounded-full blur-3xl"
          animate={{
            x: [0, -40, 0],
            y: [0, 30, 0],
            scale: [1, 1.3, 1],
            rotate: [0, 60, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-32 left-24 w-36 h-36 bg-gradient-to-br from-sage/20 to-forest/10 rounded-full blur-2xl"
          animate={{
            x: [0, 60, 0],
            y: [0, -40, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Enhanced Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-center mb-20"
        >
          <div className="inline-block bg-gradient-to-r from-sage/20 to-emerald-200/30 dark:from-sage/10 dark:to-emerald-900/20 rounded-full px-6 py-2 mb-6">
            <span className="text-sm font-hammersmith font-semibold text-forest dark:text-emerald-300">
              Revolutionary Technology Stack
            </span>
          </div>
          <h2 className="text-5xl md:text-6xl font-raleway font-bold text-forest dark:text-white mb-8 leading-tight">
            Powering the Future of <span className="bg-gradient-to-r from-sage to-emerald-600 bg-clip-text text-transparent">DeFi</span>
          </h2>
          <p className="text-xl font-hammersmith text-forest/80 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed">
            Discover the cutting-edge innovations that make PeoChain the most advanced, 
            sustainable, and developer-friendly blockchain platform
          </p>
        </motion.div>

        {/* Enhanced Technology Cards Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20"
        >
          {technologies.map((tech, index) => (
            <motion.div key={index} variants={itemVariants}>
              <Card className={`group relative overflow-hidden border-2 ${tech.accentColor} shadow-xl hover:shadow-2xl transition-all duration-700 bg-gradient-to-br ${tech.gradient} backdrop-blur-sm hover:scale-[1.02] hover:-translate-y-2`}>
                <div className="absolute inset-0 bg-gradient-to-br from-white/50 to-transparent dark:from-gray-800/50 dark:to-transparent" />
                <CardContent className="relative p-8">
                  {/* Enhanced Icon */}
                  <div className="w-20 h-20 rounded-2xl bg-white dark:bg-gray-800 shadow-lg flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                    <span className="text-3xl">{tech.iconSymbol}</span>
                  </div>

                  {/* Enhanced Content */}
                  <h3 className="text-2xl font-raleway font-bold text-forest dark:text-white mb-4 group-hover:text-sage dark:group-hover:text-emerald-300 transition-colors duration-300">
                    {tech.title}
                  </h3>
                  <p className="text-forest/80 dark:text-gray-300 font-hammersmith mb-6 leading-relaxed text-base">
                    {tech.description}
                  </p>

                  {/* Enhanced Feature List */}
                  <ul className="space-y-3">
                    {tech.details.map((detail, detailIndex) => (
                      <motion.li 
                        key={detailIndex} 
                        className="flex items-center text-sm text-forest/70 dark:text-gray-400"
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: detailIndex * 0.1 }}
                      >
                        <div className="w-2 h-2 bg-gradient-to-r from-sage to-emerald-500 rounded-full mr-3 flex-shrink-0" />
                        {detail}
                      </motion.li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Enhanced Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="text-center"
        >
          <div className="bg-gradient-to-br from-white/90 to-sage/10 dark:from-gray-800/90 dark:to-emerald-900/20 backdrop-blur-lg rounded-3xl p-12 shadow-2xl border border-sage/20 dark:border-emerald-800/30">
            <div className="max-w-3xl mx-auto">
              <h3 className="text-3xl font-raleway font-bold text-forest dark:text-white mb-6">
                Ready to Build the Future?
              </h3>
              <p className="text-lg font-hammersmith text-forest/80 dark:text-gray-300 mb-8 leading-relaxed">
                Join thousands of developers building next-generation DeFi applications with our 
                comprehensive toolkit and cutting-edge infrastructure
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                <Button className="bg-gradient-to-r from-sage to-emerald-600 hover:from-sage/90 hover:to-emerald-700 text-white px-10 py-4 rounded-xl font-hammersmith text-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105">
                  Start Building Today
                </Button>
                <Button variant="outline" className="border-2 border-sage text-sage hover:bg-sage/10 dark:hover:bg-emerald-900/20 px-10 py-4 rounded-xl font-hammersmith text-lg transition-all duration-300 hover:scale-105">
                  Explore Documentation
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TechnologySection;