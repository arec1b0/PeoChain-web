import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { 
  Network, 
  Shield, 
  Key, 
  AlertTriangle, 
  ChevronDown, 
  ChevronUp,
  Cpu,
  Database,
  Layers,
  Lock
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

export default function TechStackSection() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });
  const [expandedComponent, setExpandedComponent] = useState<string | null>(null);

  const techComponents = [
    {
      id: 'subnet',
      icon: Network,
      title: 'Subnet Validator Network',
      subtitle: 'Distributed Architecture',
      description: 'Hierarchical validator network with specialized subnets for optimal performance and security',
      gradient: 'gradient-sage-forest',
      details: {
        overview: 'Multi-layered validator architecture that enables horizontal scaling while maintaining security',
        features: [
          'Dynamic subnet allocation based on transaction volume',
          'Cross-subnet communication via secure message passing',
          'Automatic load balancing across validator pools',
          'Fault-tolerant consensus with Byzantine resistance'
        ],
        metrics: {
          'Active Subnets': '24',
          'Validators per Subnet': '~340',
          'Cross-subnet Latency': '<50ms',
          'Fault Tolerance': '33%'
        }
      }
    },
    {
      id: 'zkproofs',
      icon: Shield,
      title: 'Zero-Knowledge Proofs',
      subtitle: 'Privacy & Verification',
      description: 'Advanced ZK-STARK implementation for transaction privacy and computational integrity',
      gradient: 'bg-medium-forest',
      details: {
        overview: 'Cutting-edge zero-knowledge proof system ensuring privacy without sacrificing transparency',
        features: [
          'ZK-STARK proofs for scalable verification',
          'Recursive proof composition for batch processing',
          'Privacy-preserving smart contract execution',
          'Selective disclosure for regulatory compliance'
        ],
        metrics: {
          'Proof Generation': '<2s',
          'Verification Time': '<100ms',
          'Privacy Level': '100%',
          'Proof Size': '~24KB'
        }
      }
    },
    {
      id: 'threshold',
      icon: Key,
      title: 'Threshold Signature Scheme',
      subtitle: 'Distributed Security',
      description: 'Multi-party signature system enabling secure operations without single points of failure',
      gradient: 'bg-dark-sage',
      details: {
        overview: 'Distributed cryptographic signatures requiring multiple validators to authorize critical operations',
        features: [
          'BLS signature aggregation for efficiency',
          'Configurable threshold parameters (t-of-n)',
          'Key rotation without service interruption',
          'Quantum-resistant signature algorithms'
        ],
        metrics: {
          'Signature Speed': '<500ms',
          'Key Security': '256-bit',
          'Threshold Ratio': '2/3+1',
          'Aggregation Ratio': '99.9%'
        }
      }
    },
    {
      id: 'slashing',
      icon: AlertTriangle,
      title: 'Dynamic Slashing Mechanism',
      subtitle: 'Behavioral Economics',
      description: 'Adaptive punishment system that adjusts penalties based on network health and validator behavior',
      gradient: 'gradient-sage-forest',
      details: {
        overview: 'Intelligent slashing mechanism that maintains network integrity through economic incentives',
        features: [
          'Graduated penalty system based on violation severity',
          'Historical behavior analysis for fair assessment',
          'Network-wide health metrics influence penalties',
          'Appeal process for disputed slashing events'
        ],
        metrics: {
          'Detection Time': '<30s',
          'False Positive Rate': '<0.1%',
          'Recovery Period': '24-72h',
          'Max Penalty': '100%'
        }
      }
    }
  ];

  const NetworkDiagram = () => (
    <div className="relative w-full h-96 bg-gradient-to-br from-mint/20 to-sage/10 rounded-2xl overflow-hidden">
      <svg width="100%" height="100%" viewBox="0 0 800 400" className="absolute inset-0">
        {/* Background Grid */}
        <defs>
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="hsl(var(--sage))" strokeWidth="0.5" opacity="0.2"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
        
        {/* Core Network Nodes */}
        <g>
          {/* Central Hub */}
          <motion.circle
            cx="400"
            cy="200"
            r="20"
            fill="hsl(var(--sage))"
            initial={{ scale: 0 }}
            animate={isInView ? { scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.5 }}
          />
          <motion.text
            x="400"
            y="240"
            textAnchor="middle"
            className="text-sm font-hammersmith fill-forest"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 1 }}
          >
            Core Hub
          </motion.text>
          
          {/* Subnet Clusters */}
          {[
            { x: 200, y: 120, label: 'Subnet A' },
            { x: 600, y: 120, label: 'Subnet B' },
            { x: 200, y: 280, label: 'Subnet C' },
            { x: 600, y: 280, label: 'Subnet D' }
          ].map((subnet, index) => (
            <g key={subnet.label}>
              {/* Subnet Hub */}
              <motion.circle
                cx={subnet.x}
                cy={subnet.y}
                r="15"
                fill="hsl(var(--medium-forest))"
                initial={{ scale: 0 }}
                animate={isInView ? { scale: 1 } : {}}
                transition={{ duration: 0.6, delay: 0.7 + index * 0.1 }}
              />
              
              {/* Validators around subnet */}
              {Array.from({ length: 6 }, (_, i) => {
                const angle = (i * 60) * (Math.PI / 180);
                const vx = subnet.x + Math.cos(angle) * 40;
                const vy = subnet.y + Math.sin(angle) * 40;
                return (
                  <motion.circle
                    key={i}
                    cx={vx}
                    cy={vy}
                    r="6"
                    fill="hsl(var(--dark-sage))"
                    initial={{ scale: 0 }}
                    animate={isInView ? { scale: 1 } : {}}
                    transition={{ duration: 0.4, delay: 1 + index * 0.1 + i * 0.05 }}
                  />
                );
              })}
              
              {/* Connection to core */}
              <motion.line
                x1={subnet.x}
                y1={subnet.y}
                x2="400"
                y2="200"
                stroke="hsl(var(--sage))"
                strokeWidth="2"
                opacity="0.6"
                initial={{ pathLength: 0 }}
                animate={isInView ? { pathLength: 1 } : {}}
                transition={{ duration: 1, delay: 1.5 + index * 0.2 }}
              />
              
              <motion.text
                x={subnet.x}
                y={subnet.y + 60}
                textAnchor="middle"
                className="text-xs font-hammersmith fill-forest"
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ delay: 1.8 + index * 0.1 }}
              >
                {subnet.label}
              </motion.text>
            </g>
          ))}
          
          {/* Animated Data Flow */}
          <motion.circle
            r="3"
            fill="hsl(var(--sage))"
            initial={{ opacity: 0 }}
            animate={isInView ? { 
              opacity: [0, 1, 1, 0],
              cx: [200, 400, 600, 400, 200],
              cy: [120, 200, 280, 200, 120]
            } : {}}
            transition={{ 
              duration: 4, 
              repeat: Infinity, 
              delay: 2,
              ease: "easeInOut"
            }}
          />
        </g>
      </svg>
      
      {/* Legend */}
      <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-md rounded-lg p-3 text-xs font-hammersmith">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-1">
            <div className="w-3 h-3 bg-sage rounded-full"></div>
            <span>Core Hub</span>
          </div>
          <div className="flex items-center space-x-1">
            <div className="w-3 h-3 bg-medium-forest rounded-full"></div>
            <span>Subnet</span>
          </div>
          <div className="flex items-center space-x-1">
            <div className="w-3 h-3 bg-dark-sage rounded-full"></div>
            <span>Validator</span>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <section ref={sectionRef} id="ecosystem" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-mint to-white">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-raleway font-medium text-forest mb-6">
            Advanced <span className="text-sage">Technology Stack</span>
          </h2>
          <p className="text-lg sm:text-xl font-hammersmith text-forest/80 max-w-3xl mx-auto">
            Deep dive into the innovative technologies powering PeoChain's revolutionary blockchain infrastructure.
          </p>
        </motion.div>

        {/* Network Architecture Visualization */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <Card className="bg-white/95 backdrop-blur-md border-sage/20 shadow-lg">
            <CardContent className="p-8">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-raleway font-semibold text-forest mb-2">
                  Network <span className="text-sage">Architecture</span>
                </h3>
                <p className="text-forest/70 font-hammersmith">
                  Real-time visualization of PeoChain's distributed validator network
                </p>
              </div>
              <NetworkDiagram />
            </CardContent>
          </Card>
        </motion.div>

        {/* Technology Components */}
        <div className="space-y-6">
          {techComponents.map((component, index) => (
            <motion.div
              key={component.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
            >
              <Card className="bg-white/95 backdrop-blur-md border-sage/20 shadow-lg transform transition-all duration-300 hover:shadow-xl">
                <Collapsible
                  open={expandedComponent === component.id}
                  onOpenChange={(open) => setExpandedComponent(open ? component.id : null)}
                >
                  <CollapsibleTrigger asChild>
                    <Button
                      variant="ghost"
                      className="w-full p-0 h-auto text-left hover:bg-transparent"
                    >
                      <CardContent className="p-8 w-full">
                        <div className="flex items-center justify-between">
                          <div className="flex items-start space-x-6">
                            <div className={`w-16 h-16 ${component.gradient} rounded-2xl flex items-center justify-center flex-shrink-0`}>
                              <component.icon className="text-white h-8 w-8" />
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center space-x-2 mb-1">
                                <h3 className="text-xl font-raleway font-semibold text-forest">
                                  {component.title}
                                </h3>
                                <span className="text-sm px-2 py-1 bg-sage/20 text-sage rounded-full font-hammersmith">
                                  {component.subtitle}
                                </span>
                              </div>
                              <p className="text-forest/70 font-hammersmith">
                                {component.description}
                              </p>
                            </div>
                          </div>
                          <div className="flex-shrink-0 ml-4">
                            {expandedComponent === component.id ? (
                              <ChevronUp className="h-5 w-5 text-sage" />
                            ) : (
                              <ChevronDown className="h-5 w-5 text-sage" />
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Button>
                  </CollapsibleTrigger>
                  
                  <CollapsibleContent className="px-8 pb-8">
                    <div className="border-t border-sage/20 pt-6">
                      <div className="grid md:grid-cols-2 gap-8">
                        {/* Technical Details */}
                        <div>
                          <h4 className="text-lg font-raleway font-semibold text-forest mb-4">
                            Technical Overview
                          </h4>
                          <p className="text-forest/70 font-hammersmith mb-6 leading-relaxed">
                            {component.details.overview}
                          </p>
                          
                          <h5 className="text-md font-raleway font-medium text-forest mb-3">
                            Key Features
                          </h5>
                          <ul className="space-y-2">
                            {component.details.features.map((feature, idx) => (
                              <li key={idx} className="flex items-start space-x-2 text-sm text-forest/70">
                                <div className="w-1.5 h-1.5 bg-sage rounded-full mt-2 flex-shrink-0"></div>
                                <span className="font-hammersmith">{feature}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        
                        {/* Performance Metrics */}
                        <div>
                          <h4 className="text-lg font-raleway font-semibold text-forest mb-4">
                            Performance Metrics
                          </h4>
                          <div className="grid grid-cols-2 gap-4">
                            {Object.entries(component.details.metrics).map(([metric, value]) => (
                              <div key={metric} className="bg-mint/30 rounded-lg p-4 text-center">
                                <div className="text-xl font-raleway font-bold text-sage mb-1">
                                  {value}
                                </div>
                                <div className="text-xs font-hammersmith text-forest/70">
                                  {metric}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </CollapsibleContent>
                </Collapsible>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Technology Icons Overview */}
        <motion.div
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1.0 }}
        >
          {[
            { icon: Cpu, label: 'High Performance Computing', color: 'text-sage' },
            { icon: Database, label: 'Distributed Storage', color: 'text-medium-forest' },
            { icon: Layers, label: 'Modular Architecture', color: 'text-dark-sage' },
            { icon: Lock, label: 'Cryptographic Security', color: 'text-forest' }
          ].map((tech, index) => (
            <motion.div
              key={tech.label}
              className="text-center group"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="w-16 h-16 bg-gradient-to-br from-mint to-sage/20 rounded-2xl flex items-center justify-center mx-auto mb-3 group-hover:shadow-lg transition-shadow duration-300">
                <tech.icon className={`h-8 w-8 ${tech.color}`} />
              </div>
              <div className="text-sm font-hammersmith text-forest/70">{tech.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}