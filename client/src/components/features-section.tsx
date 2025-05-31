import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { 
  Zap, 
  DollarSign, 
  Network, 
  Star, 
  Smartphone, 
  Link, 
  BarChart3,
  ChevronRight,
  Clock,
  Shield
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import AnimatedCounter from './animated-counter';

export default function FeaturesSection() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  const coreFeatures = [
    {
      icon: Network,
      title: 'Proof of Synergy (PoSyg)',
      description: 'Revolutionary consensus mechanism that rewards collaborative validation and network growth',
      metric: '99.9% Uptime',
      gradient: 'gradient-sage-forest',
      details: [
        'Energy efficient validation',
        'Collaborative rewards system',
        'Automatic slashing protection'
      ]
    },
    {
      icon: DollarSign,
      title: 'Ultra-Low Fees',
      description: 'Industry-leading transaction costs making DeFi accessible to everyone globally',
      metric: 'USD 0.04',
      gradient: 'bg-medium-forest',
      details: [
        'Fixed low-cost structure',
        'No hidden fees',
        'Gas optimization built-in'
      ]
    },
    {
      icon: Zap,
      title: 'Lightning Performance',
      description: 'Unprecedented throughput with instant finality for real-time applications',
      metric: '100K TPS',
      gradient: 'bg-dark-sage',
      details: [
        '1-second finality',
        'Parallel processing',
        'Auto-scaling capacity'
      ]
    },
    {
      icon: Star,
      title: 'Dynamic Contribution Scoring',
      description: 'AI-powered scoring system that rewards network participants based on their contributions',
      metric: 'Smart Rewards',
      gradient: 'gradient-sage-forest',
      details: [
        'Real-time scoring updates',
        'Multi-factor evaluation',
        'Fair reward distribution'
      ]
    },
    {
      icon: Smartphone,
      title: 'Mobile Integration',
      description: 'Seamless integration with popular mobile payment systems worldwide',
      metric: 'M-Pesa & GCash',
      gradient: 'bg-medium-forest',
      details: [
        'Direct wallet connection',
        'Instant settlements',
        'Cross-platform support'
      ]
    },
    {
      icon: Link,
      title: 'Cross-Chain Bridge',
      description: 'Trustless interoperability with major blockchain networks and traditional systems',
      metric: '15+ Networks',
      gradient: 'bg-dark-sage',
      details: [
        'Ethereum compatibility',
        'Bitcoin integration',
        'Traditional bank APIs'
      ]
    }
  ];

  const performanceMetrics = [
    { label: 'Transaction Speed', value: 100, unit: 'TPS', comparison: 'vs Ethereum: 15 TPS' },
    { label: 'Finality Time', value: 100, unit: 'sec', comparison: 'vs Bitcoin: 600 sec' },
    { label: 'Cost Efficiency', value: 95, unit: '%', comparison: 'vs Traditional: $25' },
    { label: 'Energy Usage', value: 99, unit: '% less', comparison: 'vs PoW chains' }
  ];

  return (
    <section ref={sectionRef} id="features" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-white via-mint/30 to-mint">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-raleway font-medium text-forest mb-6">
            Revolutionary <span className="text-sage">Blockchain Features</span>
          </h2>
          <p className="text-lg sm:text-xl font-hammersmith text-forest/80 max-w-3xl mx-auto">
            Breakthrough innovations that solve real-world problems in decentralized finance and global accessibility.
          </p>
        </motion.div>

        {/* Core Features Grid */}
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8 mb-16">
          {coreFeatures.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              className="group cursor-pointer"
            >
              <Card className="bg-white/95 backdrop-blur-md border-sage/20 shadow-lg transform transition-all duration-500 group-hover:shadow-2xl group-hover:border-sage/40 h-full">
                <CardContent className="p-8">
                  {/* Icon and Metric */}
                  <div className="flex items-start justify-between mb-6">
                    <div className={`w-16 h-16 ${feature.gradient} rounded-2xl flex items-center justify-center group-hover:animate-pulse transition-all duration-300`}>
                      <feature.icon className="text-white h-8 w-8" />
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-raleway font-bold text-sage">{feature.metric}</div>
                      <div className="text-xs text-forest/60 font-hammersmith">Performance</div>
                    </div>
                  </div>

                  {/* Title and Description */}
                  <h3 className="text-xl font-raleway font-semibold text-forest mb-3 group-hover:text-sage transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-forest/70 font-hammersmith leading-relaxed mb-4">
                    {feature.description}
                  </p>

                  {/* Feature Details */}
                  <div className="space-y-2">
                    {feature.details.map((detail, idx) => (
                      <div key={idx} className="flex items-center text-sm text-forest/60">
                        <ChevronRight className="h-4 w-4 text-sage mr-2 flex-shrink-0" />
                        <span className="font-hammersmith">{detail}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Performance Comparison Charts */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <Card className="bg-white/95 backdrop-blur-md border-sage/20 shadow-lg">
            <CardContent className="p-8">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-raleway font-semibold text-forest mb-2">
                  Performance <span className="text-sage">Benchmarks</span>
                </h3>
                <p className="text-forest/70 font-hammersmith">
                  See how PeoChain outperforms traditional blockchain networks
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                {performanceMetrics.map((metric, index) => (
                  <motion.div
                    key={metric.label}
                    className="text-center"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
                  >
                    <div className="mb-4">
                      <div className="text-3xl font-raleway font-bold text-sage mb-1">
                        <AnimatedCounter to={metric.value} />
                        <span className="text-lg">{metric.unit}</span>
                      </div>
                      <div className="text-sm font-hammersmith text-forest/70 mb-3">{metric.label}</div>
                      <Progress 
                        value={metric.value} 
                        className="h-2 bg-sage/20"
                        style={{
                          background: 'linear-gradient(to right, hsl(var(--sage)), hsl(var(--medium-forest)))'
                        }}
                      />
                    </div>
                    <div className="text-xs text-forest/50 font-hammersmith">{metric.comparison}</div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Technical Highlights */}
        <motion.div
          className="mt-16 grid md:grid-cols-3 gap-8"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1.0 }}
        >
          <Card className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-md border-sage/20 shadow-lg">
            <CardContent className="p-6 text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-sage to-medium-forest rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Clock className="h-8 w-8 text-white" />
              </div>
              <h4 className="text-xl font-raleway font-semibold mb-2 text-forest dark:text-white">Real-Time Processing</h4>
              <p className="font-hammersmith text-forest/80 dark:text-gray-300">
                Sub-second transaction confirmation with parallel execution
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-md border-sage/20 shadow-lg">
            <CardContent className="p-6 text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-medium-forest to-dark-sage rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-white" />
              </div>
              <h4 className="text-xl font-raleway font-semibold mb-2 text-forest dark:text-white">Enterprise Security</h4>
              <p className="font-hammersmith text-forest/80 dark:text-gray-300">
                Military-grade encryption with formal verification protocols
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-md border-sage/20 shadow-lg">
            <CardContent className="p-6 text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-dark-sage to-forest rounded-2xl flex items-center justify-center mx-auto mb-4">
                <BarChart3 className="h-8 w-8 text-white" />
              </div>
              <h4 className="text-xl font-raleway font-semibold mb-2 text-forest dark:text-white">Dynamic Scaling</h4>
              <p className="font-hammersmith text-forest/80 dark:text-gray-300">
                Automatic network capacity adjustment based on demand
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}