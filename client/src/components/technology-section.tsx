import { motion } from "framer-motion";
import { GitBranch, Zap, Leaf, Link, Code, Wrench } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export default function TechnologySection() {
  const features = [
    {
      icon: GitBranch,
      title: "Parallel Processing",
      description:
        "Advanced sharding enables simultaneous transaction processing across multiple chains, dramatically increasing throughput without compromising security.",
      gradient: "gradient-sage-forest",
    },
    {
      icon: Zap,
      title: "Instant Finality",
      description:
        "Proprietary consensus algorithm achieves transaction finality in under 1 second, enabling real-time DeFi applications and seamless user experiences.",
      gradient: "bg-medium-forest",
    },
    {
      icon: Leaf,
      title: "Eco-Friendly",
      description:
        "Proof-of-Stake consensus uses 99.9% less energy than traditional mining, making PeoChain carbon-neutral and environmentally sustainable.",
      gradient: "bg-dark-sage",
    },
    {
      icon: Link,
      title: "Cross-Chain Bridge",
      description:
        "Seamless interoperability with Ethereum, Bitcoin, and other major blockchains through secure, trustless bridge protocols.",
      gradient: "gradient-sage-forest",
    },
    {
      icon: Code,
      title: "Smart Contracts",
      description:
        "EVM-compatible smart contracts with enhanced security features and formal verification tools for bug-free DeFi applications.",
      gradient: "bg-medium-forest",
    },
    {
      icon: Wrench,
      title: "Developer Suite",
      description:
        "Comprehensive SDK, debugging tools, and testing framework make building on PeoChain simple and efficient for developers worldwide.",
      gradient: "bg-dark-sage",
    },
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-white to-mint">
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-raleway font-medium text-forest mb-6">
            Revolutionary <span className="text-sage">Technology</span>
          </h2>
          <p className="text-lg sm:text-xl font-hammersmith text-forest/80 max-w-3xl mx-auto">
            Built on cutting-edge consensus mechanisms and sharding technology
            for unprecedented performance.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
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
                    className={`w-16 h-16 ${feature.gradient} rounded-2xl flex items-center justify-center mb-6 group-hover:animate-pulse`}
                  >
                    <feature.icon className="text-white h-8 w-8" />
                  </div>
                  <h3 className="text-xl font-raleway font-semibold text-forest mb-4">
                    {feature.title}
                  </h3>
                  <p className="text-forest/70 font-hammersmith leading-relaxed">
                    {feature.description}
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
