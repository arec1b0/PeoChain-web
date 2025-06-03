import { motion } from "framer-motion";
import { GitBranch, Zap, Leaf, Link, Code, Wrench } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const TechnologySection = () => {
  const technologies = [
    {
      icon: GitBranch,
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
      icon: Leaf,
      title: "Sustainability",
      description: "Carbon-negative blockchain with renewable energy integration and offset programs.",
      details: ["99% less energy usage", "Carbon offset programs", "Green mining", "Renewable powered"],
      gradient: "from-green-500/20 to-emerald-500/20",
      iconColor: "text-green-600 dark:text-green-400"
    },
    {
      icon: Link,
      title: "Interoperability",
      description: "Seamless cross-chain communication and asset transfers with universal protocols.",
      details: ["Multi-chain bridges", "Universal protocols", "Cross-chain DeFi", "Asset portability"],
      gradient: "from-blue-500/20 to-cyan-500/20",
      iconColor: "text-blue-600 dark:text-blue-400"
    },
    {
      icon: Code,
      title: "Smart Contracts",
      description: "Advanced virtual machine with formal verification support and gas optimization.",
      details: ["Gas optimization", "Security auditing", "Multi-language support", "Formal verification"],
      gradient: "from-purple-500/20 to-pink-500/20",
      iconColor: "text-purple-600 dark:text-purple-400"
    },
    {
      icon: Wrench,
      title: "Developer Tools",
      description: "Comprehensive SDK and toolchain for rapid development with rich documentation.",
      details: ["Rich documentation", "Testing frameworks", "IDE integration", "CI/CD support"],
      gradient: "from-teal-500/20 to-green-500/20",
      iconColor: "text-teal-600 dark:text-teal-400"
    },
  ];

  return (
    <section className={`py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-mint/20 via-white to-sage/10 dark:from-gray-800/50 dark:via-gray-900 dark:to-gray-800 relative overflow-hidden`}>
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(109,158,121,0.1),transparent_50%)]" />
        <motion.div
          className="absolute bottom-20 left-20 w-32 h-32 bg-gradient-to-br from-medium-forest/20 to-sage/10 rounded-full blur-2xl"
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

      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 bg-medium-forest/10 rounded-full border border-medium-forest/20 mb-6"
            whileHover={{ scale: 1.05 }}
          >
            <Code className="w-4 h-4 text-medium-forest" />
            <span className="text-sm font-medium text-medium-forest">Advanced Architecture</span>
          </motion.div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-raleway font-medium text-forest mb-6">
            Next-Generation Technology Stack
          </h2>
          <p className="text-lg sm:text-xl font-hammersmith text-forest/80 max-w-4xl mx-auto">
            Built on cutting-edge technology designed for the future of decentralized applications,
            combining performance, security, and sustainability in perfect harmony.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {technologies.map((technology, index) => (
            <motion.div
              key={technology.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05 }}
              className="group"
            >
              <Card className="bg-white/95 backdrop-blur-md border-sage/20 shadow-lg transform transition-all duration-300 group-hover:shadow-2xl h-full">
                <CardContent className="p-8">
                  <div
                    className={`w-16 h-16 ${technology.gradient} rounded-2xl flex items-center justify-center mb-6 group-hover:animate-pulse`}
                  >
                    <technology.icon className={`${technology.iconColor} h-8 w-8`} />
                  </div>
                  <h3 className="text-xl font-raleway font-semibold text-forest mb-4">
                    {technology.title}
                  </h3>
                  <p className="text-forest/70 font-hammersmith leading-relaxed">
                    {technology.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default TechnologySection;