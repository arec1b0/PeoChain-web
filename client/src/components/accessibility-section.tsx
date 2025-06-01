import { motion } from 'framer-motion';
import { Smartphone, Coins, Languages, Users } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import AnimatedCounter from './animated-counter';

export default function AccessibilitySection() {
  const accessibilityFeatures = [
    {
      icon: Smartphone,
      title: 'Mobile First',
      description: 'Optimized for smartphones worldwide',
      gradient: 'gradient-sage-forest'
    },
    {
      icon: Coins,
      title: 'Micro Fees',
      description: 'CHF 0.40 average transaction cost',
      gradient: 'bg-medium-forest'
    },
    {
      icon: Languages,
      title: 'Multilingual',
      description: 'Available in 20+ languages',
      gradient: 'bg-dark-sage'
    },
    {
      icon: Users,
      title: 'Inclusive',
      description: 'Serving 2B+ underbanked globally',
      gradient: 'gradient-sage-forest'
    }
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-mint to-white">
      <div className="max-w-6xl mx-auto">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-raleway font-medium text-forest mb-6">
            <span className="text-sage">Global</span> DeFi Accessibility
          </h2>
          <p className="text-lg sm:text-xl font-hammersmith text-forest/80 max-w-3xl mx-auto">
            Breaking down barriers to financial inclusion with ultra-low fees and seamless mobile integration.
          </p>
        </motion.div>
        
        {/* Global Icons Grid */}
        <motion.div 
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          {accessibilityFeatures.map((feature, index) => (
            <motion.div
              key={feature.title}
              className="text-center group"
              whileHover={{ scale: 1.1, rotate: 6 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className={`w-20 h-20 ${feature.gradient} rounded-3xl flex items-center justify-center mx-auto mb-4 transform transition-all duration-300 group-hover:shadow-lg`}>
                <feature.icon className="text-white h-8 w-8" />
              </div>
              <h3 className="font-raleway font-medium text-forest mb-2">{feature.title}</h3>
              <p className="text-sm text-forest/70 font-hammersmith">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
        
        {/* Real-time Network Statistics */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <Card className="bg-white/95 backdrop-blur-md border-sage/20 shadow-lg max-w-4xl mx-auto">
            <CardContent className="p-8">
              <h3 className="text-2xl font-raleway font-semibold text-forest text-center mb-8">Live Network Statistics</h3>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="text-center">
                  <AnimatedCounter 
                    to={8247}
                    className="text-3xl font-raleway font-bold text-sage mb-2"
                  />
                  <div className="text-sm font-hammersmith text-forest/70">Active Validators</div>
                </div>
                <div className="text-center">
                  <AnimatedCounter 
                    to={1247832}
                    className="text-3xl font-raleway font-bold text-medium-forest mb-2"
                  />
                  <div className="text-sm font-hammersmith text-forest/70">Total Transactions</div>
                </div>
                <div className="text-center">
                  <AnimatedCounter 
                    to={95432}
                    className="text-3xl font-raleway font-bold text-dark-sage mb-2"
                  />
                  <div className="text-sm font-hammersmith text-forest/70">Current TPS</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-raleway font-bold text-sage mb-2">CHF 2.8B</div>
                  <div className="text-sm font-hammersmith text-forest/70">Total Value Locked</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
