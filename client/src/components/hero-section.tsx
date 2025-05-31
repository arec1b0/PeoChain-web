import { motion } from 'framer-motion';
import { Workflow, TestTube, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import AnimatedCounter from './animated-counter';

export default function HeroSection() {
  const floatingNodes = Array.from({ length: 4 }, (_, i) => ({
    id: i,
    size: [16, 20, 24, 12][i],
    position: [
      { top: '20%', left: '10%' },
      { top: '40%', right: '20%' },
      { bottom: '40%', left: '25%' },
      { bottom: '20%', right: '33%' }
    ][i],
    delay: i * 2
  }));

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center pt-16 px-4 sm:px-6 lg:px-8 overflow-hidden bg-mint">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {floatingNodes.map((node) => (
          <motion.div
            key={node.id}
            className="absolute gradient-sage-forest rounded-full opacity-60"
            style={{
              width: node.size,
              height: node.size,
              ...node.position
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.4, 0.7, 0.4]
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              delay: node.delay,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>
      
      <div className="max-w-6xl mx-auto text-center relative z-10">
        {/* Main Headlines */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-raleway font-medium text-forest leading-tight mb-6">
            Solving the <span className="text-sage">Blockchain Trilemma</span>.<br />
            Making <span className="text-medium-forest">DeFi Accessible</span> to All.
          </h1>
          
          <p className="text-lg sm:text-xl lg:text-2xl font-hammersmith text-forest/80 max-w-4xl mx-auto mb-12 leading-relaxed">
            PeoChain achieves unprecedented <strong className="text-sage">100,000 TPS</strong> with{' '}
            <strong className="text-medium-forest">1-second finality</strong> and true decentralization,{' '}
            bringing DeFi to underbanked populations worldwide with <strong className="text-dark-sage">USD 0.04 fees</strong>.
          </p>
        </motion.div>
        
        {/* Key Metrics Display */}
        <motion.div 
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <Card className="bg-white/95 backdrop-blur-md border-sage/20 shadow-lg">
            <CardContent className="p-4 lg:p-6 text-center">
              <AnimatedCounter 
                to={100000}
                className="text-2xl lg:text-3xl font-raleway font-semibold text-sage mb-2"
              />
              <div className="text-sm lg:text-base font-hammersmith text-forest/70">TPS</div>
            </CardContent>
          </Card>
          <Card className="bg-white/95 backdrop-blur-md border-sage/20 shadow-lg">
            <CardContent className="p-4 lg:p-6 text-center">
              <AnimatedCounter 
                to={1}
                className="text-2xl lg:text-3xl font-raleway font-semibold text-medium-forest mb-2"
              />
              <div className="text-sm lg:text-base font-hammersmith text-forest/70">Second Finality</div>
            </CardContent>
          </Card>
          <Card className="bg-white/95 backdrop-blur-md border-sage/20 shadow-lg">
            <CardContent className="p-4 lg:p-6 text-center">
              <div className="text-2xl lg:text-3xl font-raleway font-semibold text-dark-sage mb-2">USD 0.04</div>
              <div className="text-sm lg:text-base font-hammersmith text-forest/70">Avg. Fees</div>
            </CardContent>
          </Card>
          <Card className="bg-white/95 backdrop-blur-md border-sage/20 shadow-lg">
            <CardContent className="p-4 lg:p-6 text-center">
              <AnimatedCounter 
                to={100}
                suffix="%"
                className="text-2xl lg:text-3xl font-raleway font-semibold text-sage mb-2"
              />
              <div className="text-sm lg:text-base font-hammersmith text-forest/70">Decentralized</div>
            </CardContent>
          </Card>
        </motion.div>
        
        {/* Call-to-Action Buttons */}
        <motion.div 
          className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <Button 
            size="lg"
            onClick={() => window.location.href = '/validator-bonds'}
            className="bg-sage hover:bg-medium-forest text-white font-raleway font-medium text-lg px-8 py-4 rounded-2xl shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-xl"
          >
            <Workflow className="mr-2 h-5 w-5" />
            Join Validator Network
          </Button>
          <Button 
            variant="outline"
            size="lg"
            className="border-2 border-sage text-forest hover:bg-sage hover:text-white font-raleway font-medium text-lg px-8 py-4 rounded-2xl transform transition-all duration-300 hover:scale-105 hover:shadow-xl"
          >
            <TestTube className="mr-2 h-5 w-5" />
            Experience Testnet
          </Button>
          <Button 
            variant="outline"
            size="lg"
            className="border-2 border-sage text-forest hover:bg-sage hover:text-white font-raleway font-medium text-lg px-8 py-4 rounded-2xl transform transition-all duration-300 hover:scale-105 hover:shadow-xl"
          >
            <BookOpen className="mr-2 h-5 w-5" />
            Read Whitepaper
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
