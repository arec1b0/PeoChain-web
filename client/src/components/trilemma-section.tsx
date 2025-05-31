import { motion } from 'framer-motion';
import { Zap, ShieldCheck, Network } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

export default function TrilemmaSection() {
  const trilemmaPoints = [
    {
      icon: Zap,
      title: 'Scalability',
      description: '100,000+ TPS with sharding and parallel processing',
      gradient: 'gradient-sage-forest'
    },
    {
      icon: ShieldCheck,
      title: 'Security',
      description: 'Cryptographic proofs with validator slashing',
      gradient: 'bg-medium-forest'
    },
    {
      icon: Network,
      title: 'Decentralization',
      description: '10,000+ global validators with low barriers',
      gradient: 'bg-dark-sage'
    }
  ];

  return (
    <section id="technology" className="gradient-mint-white py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-raleway font-medium text-forest mb-6">
            The <span className="text-sage">Blockchain Trilemma</span> Solved
          </h2>
          <p className="text-lg sm:text-xl font-hammersmith text-forest/80 max-w-3xl mx-auto">
            Traditional blockchains struggle to balance scalability, security, and decentralization. 
            PeoChain's innovative architecture achieves all three simultaneously.
          </p>
        </motion.div>
        
        {/* Interactive Trilemma Diagram */}
        <div className="relative max-w-4xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center justify-center space-y-8 lg:space-y-0 lg:space-x-12">
            {trilemmaPoints.map((point, index) => (
              <motion.div
                key={point.title}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
                className="group cursor-pointer"
              >
                <Card className="bg-white/95 backdrop-blur-md border-sage/20 shadow-lg transform transition-all duration-500 group-hover:shadow-2xl">
                  <CardContent className="p-8 text-center">
                    <div className={`w-16 h-16 ${point.gradient} rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:animate-pulse`}>
                      <point.icon className="text-white h-8 w-8" />
                    </div>
                    <h3 className="text-xl font-raleway font-semibold text-forest mb-2">{point.title}</h3>
                    <p className="text-forest/70 font-hammersmith">{point.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
          
          {/* Connecting Lines - Hidden on Mobile */}
          <div className="hidden lg:block absolute inset-0 pointer-events-none">
            <svg className="w-full h-full">
              <motion.path
                d="M 200 150 L 400 150 L 300 50 Z"
                stroke="hsl(var(--sage))"
                strokeWidth="2"
                fill="none"
                opacity="0.3"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                transition={{ duration: 2, delay: 0.5 }}
                viewport={{ once: true }}
              />
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}
