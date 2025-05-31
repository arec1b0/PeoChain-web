import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import Navigation from '@/components/navigation';
import TechStackSection from '@/components/tech-stack-section';
import TechnologySection from '@/components/technology-section';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Workflow, ShieldCheck, Zap, Network } from 'lucide-react';

export default function Technology() {
  const { data: technologyData, isLoading } = useQuery({
    queryKey: ['/api/technology'],
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-mint">
        <Navigation />
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-sage mx-auto mb-4"></div>
            <p className="text-forest font-raleway">Loading technology details...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-24 pb-8 px-4 sm:px-6 lg:px-8 bg-mint">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-8"
          >
            <h1 className="text-5xl md:text-6xl font-raleway font-bold text-forest mb-6">
              Technology Stack
            </h1>
            <p className="text-xl font-hammersmith text-forest/80 max-w-3xl mx-auto">
              Discover the innovative technologies powering PeoChain's revolutionary blockchain platform
            </p>
          </motion.div>
        </div>
      </section>

      {/* Advanced Technology Stack Section */}
      <TechStackSection />
      
      {/* Revolutionary Technology Section */}
      <TechnologySection />
    </div>
  );
}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mb-16"
            >
              <Card className="bg-white/95 backdrop-blur-md border-sage/20 shadow-lg">
                <CardHeader>
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-sage to-medium-forest rounded-xl flex items-center justify-center">
                      <Workflow className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-2xl font-raleway text-forest">
                        {technologyData.consensus.name}
                      </CardTitle>
                      <p className="text-forest/70 font-hammersmith">
                        {technologyData.consensus.description}
                      </p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <h4 className="font-raleway font-semibold text-forest mb-3">Key Features</h4>
                      <ul className="space-y-2">
                        {technologyData.consensus.features.map((feature: string, index: number) => (
                          <li key={index} className="flex items-start space-x-2">
                            <div className="w-2 h-2 bg-sage rounded-full mt-2 flex-shrink-0"></div>
                            <span className="font-hammersmith text-forest/80">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center p-3 bg-sage/10 rounded-lg">
                        <span className="font-raleway font-medium text-forest">Energy Efficiency</span>
                        <Badge variant="secondary" className="bg-sage text-white">
                          {technologyData.consensus.energyEfficiency}
                        </Badge>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-sage/10 rounded-lg">
                        <span className="font-raleway font-medium text-forest">Participation Threshold</span>
                        <Badge variant="secondary" className="bg-medium-forest text-white">
                          {technologyData.consensus.participationThreshold}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* Architecture Section */}
          {technologyData?.architecture && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mb-16"
            >
              <h2 className="text-3xl font-raleway font-bold text-forest mb-8 text-center">
                Network Architecture
              </h2>
              
              <div className="grid md:grid-cols-3 gap-8">
                {/* Subnets */}
                <Card className="bg-white/95 backdrop-blur-md border-sage/20 shadow-lg">
                  <CardHeader>
                    <div className="flex items-center space-x-3">
                      <Network className="h-8 w-8 text-sage" />
                      <CardTitle className="font-raleway text-forest">Subnets</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex justify-between">
                      <span className="font-hammersmith text-forest/70">Count</span>
                      <span className="font-raleway font-semibold text-forest">
                        {technologyData.architecture.subnets.count}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-hammersmith text-forest/70">Validators/Subnet</span>
                      <span className="font-raleway font-semibold text-forest">
                        {technologyData.architecture.subnets.validatorsPerSubnet}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-hammersmith text-forest/70">Cross-Subnet Latency</span>
                      <span className="font-raleway font-semibold text-sage">
                        {technologyData.architecture.subnets.crossSubnetLatency}
                      </span>
                    </div>
                  </CardContent>
                </Card>

                {/* ZK Proofs */}
                <Card className="bg-white/95 backdrop-blur-md border-sage/20 shadow-lg">
                  <CardHeader>
                    <div className="flex items-center space-x-3">
                      <ShieldCheck className="h-8 w-8 text-sage" />
                      <CardTitle className="font-raleway text-forest">ZK Proofs</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex justify-between">
                      <span className="font-hammersmith text-forest/70">Type</span>
                      <span className="font-raleway font-semibold text-forest">
                        {technologyData.architecture.zkProofs.type}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-hammersmith text-forest/70">Verification Time</span>
                      <span className="font-raleway font-semibold text-sage">
                        {technologyData.architecture.zkProofs.verificationTime}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-hammersmith text-forest/70">Proof Size</span>
                      <span className="font-raleway font-semibold text-forest">
                        {technologyData.architecture.zkProofs.proofSize}
                      </span>
                    </div>
                  </CardContent>
                </Card>

                {/* Threshold Signatures */}
                <Card className="bg-white/95 backdrop-blur-md border-sage/20 shadow-lg">
                  <CardHeader>
                    <div className="flex items-center space-x-3">
                      <Zap className="h-8 w-8 text-sage" />
                      <CardTitle className="font-raleway text-forest">Signatures</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex justify-between">
                      <span className="font-hammersmith text-forest/70">Scheme</span>
                      <span className="font-raleway font-semibold text-forest">
                        {technologyData.architecture.thresholdSignatures.scheme}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-hammersmith text-forest/70">Threshold</span>
                      <span className="font-raleway font-semibold text-forest">
                        {technologyData.architecture.thresholdSignatures.threshold}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-hammersmith text-forest/70">Aggregation Time</span>
                      <span className="font-raleway font-semibold text-sage">
                        {technologyData.architecture.thresholdSignatures.aggregationTime}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </motion.div>
          )}

          {/* Performance Metrics */}
          {technologyData?.performance && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="mb-16"
            >
              <Card className="bg-gradient-to-br from-sage to-medium-forest text-white shadow-lg">
                <CardContent className="p-8">
                  <h2 className="text-3xl font-raleway font-bold mb-8 text-center">
                    Performance Metrics
                  </h2>
                  <div className="grid md:grid-cols-4 gap-6">
                    <div className="text-center">
                      <div className="text-3xl font-raleway font-bold mb-2">
                        {technologyData.performance.throughput}
                      </div>
                      <div className="font-hammersmith opacity-90">Throughput</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-raleway font-bold mb-2">
                        {technologyData.performance.finality}
                      </div>
                      <div className="font-hammersmith opacity-90">Finality</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-raleway font-bold mb-2">
                        {technologyData.performance.blockTime}
                      </div>
                      <div className="font-hammersmith opacity-90">Block Time</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-raleway font-bold mb-2">
                        {technologyData.performance.networkLatency}
                      </div>
                      <div className="font-hammersmith opacity-90">Network Latency</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </div>
      </section>
    </div>
  );
}