import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Shield, 
  Key, 
  Clock, 
  Terminal, 
  Globe, 
  AlertTriangle, 
  CheckCircle, 
  ExternalLink,
  ChevronDown,
  ChevronUp,
  Info,
  Zap,
  DollarSign,
  Users
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import Navigation from '@/components/navigation';

export default function ValidatorBonds() {
  const [expandedFaq, setExpandedFaq] = useState<string | null>(null);

  // Define static content
  const bondingSteps = [
    {
      step: 1,
      title: 'Key Generation',
      description: 'Generate validator keys using PeoChain CLI or secure key generation tools',
      icon: Key,
      details: [
        'Generate BLS12-381 keypair for validator signing',
        'Create withdrawal credentials for reward collection',
        'Secure backup of mnemonic phrase and keystore files',
        'Verify key derivation and signature validation'
      ]
    },
    {
      step: 2,
      title: 'Minimum Bond',
      description: 'Stake the required minimum bond amount to participate in validation',
      icon: DollarSign,
      details: [
        'Testnet: 1,000 PEO minimum bond requirement',
        'Mainnet: 32,000 PEO minimum bond (estimated)',
        'Additional bond increases validator weight and rewards',
        'Bond funds are locked during validation period'
      ]
    },
    {
      step: 3,
      title: 'Timelock Period',
      description: 'Understanding the unbonding and withdrawal timelock mechanics',
      icon: Clock,
      details: [
        'Testnet: 24-hour unbonding period for testing',
        'Mainnet: 21-day unbonding period for security',
        'Partial withdrawals available after 7 days',
        'Emergency exit with penalty fees possible'
      ]
    },
    {
      step: 4,
      title: 'Onboarding',
      description: 'Complete validator registration via CLI tools or web interface',
      icon: Terminal,
      details: [
        'Submit validator registration transaction',
        'Configure node infrastructure and networking',
        'Set commission rates and metadata',
        'Begin validation duties after activation'
      ]
    }
  ];

  const staticValidatorSlots = [
    {
      network: 'Testnet',
      status: 'Active',
      totalSlots: 500,
      filledSlots: 347,
      waitingQueue: 23,
      minBond: '1,000 PEO',
      aprEstimate: '12-18%'
    },
    {
      network: 'Mainnet',
      status: 'Coming Soon',
      totalSlots: 10000,
      filledSlots: 0,
      waitingQueue: 156,
      minBond: '32,000 PEO',
      aprEstimate: '8-12%'
    }
  ];

  const faqItems = [
    {
      id: 'onboarding',
      question: 'What are the complete onboarding steps for new validators?',
      answer: 'The complete onboarding process involves: 1) Setting up validator infrastructure with minimum hardware requirements (8 CPU cores, 32GB RAM, 2TB SSD), 2) Generating validator keys using our secure CLI tools, 3) Staking the minimum bond amount, 4) Configuring your validator node with proper networking and security, 5) Submitting registration transaction, and 6) Waiting for activation in the next epoch. Our documentation provides detailed step-by-step instructions for each phase.'
    },
    {
      id: 'slashing',
      question: 'How does the slashing mechanism work and what are the penalties?',
      answer: 'PeoChain implements a graduated slashing system based on violation severity: Minor infractions (brief downtime) result in 0.01% bond penalty, moderate violations (double signing) incur 1% penalty, and severe misconduct (coordinated attacks) can result in up to 100% bond slashing. The Dynamic Slashing Mechanism considers validator history, network health, and violation context. Validators have a 7-day appeal period for disputed slashing events.'
    },
    {
      id: 'disputes',
      question: 'What is the dispute resolution process for slashing events?',
      answer: 'Disputed slashing events can be appealed through our governance system within 7 days. The process includes: 1) Submitting evidence and technical logs, 2) Community review period (72 hours), 3) Technical committee evaluation, 4) Validator vote with 2/3 majority required for reversal. False positive rates are tracked and used to improve the slashing algorithm. Successful appeals result in full bond restoration and compensation for lost rewards.'
    },
    {
      id: 'rewards',
      question: 'How are validator rewards calculated and distributed?',
      answer: 'Validator rewards come from multiple sources: block production rewards (40%), transaction fees (30%), and Dynamic Contribution Scoring bonuses (30%). Base rewards are calculated using: R = (Bond × Base_Rate × Uptime × Performance_Score) + Fee_Share + DCS_Bonus. Rewards are distributed every epoch (6.4 minutes) and can be auto-compounded or withdrawn. Commission rates are set by validators and applied to delegated stake rewards.'
    },
    {
      id: 'hardware',
      question: 'What are the minimum hardware and infrastructure requirements?',
      answer: 'Minimum requirements: 8-core CPU (Intel i7/AMD Ryzen 7+), 32GB RAM, 2TB NVMe SSD, 1Gbps internet connection with <50ms latency to major network hubs. Recommended setup includes redundant internet connections, UPS backup power, monitoring systems, and geographic distribution for resilience. Cloud deployment is supported on AWS, GCP, Azure with specific instance recommendations provided in our infrastructure guide.'
    }
  ];

  const networkStats = {
    testnet: {
      totalValidators: 347,
      totalStaked: '2.1M PEO',
      networkUptime: 99.8,
      avgRewards: '15.2%'
    },
    mainnet: {
      preRegistrations: 156,
      estimatedLaunch: 'Q2 2025',
      targetValidators: 10000,
      genesisStake: '320M PEO'
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-mint to-white dark:from-gray-900 dark:to-gray-800">
      <Navigation />
      <div className="pt-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Header Section */}
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-raleway font-medium text-forest dark:text-white mb-6">
              Validator <span className="text-sage">Bonding</span>
            </h1>
            <p className="text-lg sm:text-xl font-hammersmith text-forest/80 dark:text-gray-300 max-w-3xl mx-auto mb-8">
              Join PeoChain's decentralized validator network through our non-custodial bonding system. 
              Secure the network, earn rewards, and participate in consensus without giving up control of your assets.
            </p>
            
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              <Badge variant="outline" className="px-4 py-2 text-sm border-sage text-sage">
                <Shield className="h-4 w-4 mr-2" />
                Non-Custodial
              </Badge>
              <Badge variant="outline" className="px-4 py-2 text-sm border-medium-forest text-medium-forest">
                <Zap className="h-4 w-4 mr-2" />
                Testnet Active
              </Badge>
              <Badge variant="outline" className="px-4 py-2 text-sm border-dark-sage text-dark-sage">
                <Globe className="h-4 w-4 mr-2" />
                Mainnet Q2 2025
              </Badge>
            </div>
          </motion.div>

          {/* Network Status Cards */}
          <motion.div
            className="grid md:grid-cols-2 gap-8 mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Card className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-md border-sage/20 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-sage">
                  <CheckCircle className="h-5 w-5" />
                  <span>Testnet Status</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-2xl font-raleway font-bold text-forest dark:text-white">
                      {networkStats.testnet.totalValidators}
                    </div>
                    <div className="text-sm text-forest/70 dark:text-gray-400">Active Validators</div>
                  </div>
                  <div>
                    <div className="text-2xl font-raleway font-bold text-forest dark:text-white">
                      {networkStats.testnet.totalStaked}
                    </div>
                    <div className="text-sm text-forest/70 dark:text-gray-400">Total Staked</div>
                  </div>
                  <div>
                    <div className="text-2xl font-raleway font-bold text-forest dark:text-white">
                      {networkStats.testnet.networkUptime}%
                    </div>
                    <div className="text-sm text-forest/70 dark:text-gray-400">Network Uptime</div>
                  </div>
                  <div>
                    <div className="text-2xl font-raleway font-bold text-forest dark:text-white">
                      {networkStats.testnet.avgRewards}
                    </div>
                    <div className="text-sm text-forest/70 dark:text-gray-400">Avg APR</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-md border-sage/20 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-medium-forest">
                  <Info className="h-5 w-5" />
                  <span>Mainnet Preview</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-2xl font-raleway font-bold text-forest dark:text-white">
                      {networkStats.mainnet.preRegistrations}
                    </div>
                    <div className="text-sm text-forest/70 dark:text-gray-400">Pre-registrations</div>
                  </div>
                  <div>
                    <div className="text-2xl font-raleway font-bold text-forest dark:text-white">
                      {networkStats.mainnet.estimatedLaunch}
                    </div>
                    <div className="text-sm text-forest/70 dark:text-gray-400">Est. Launch</div>
                  </div>
                  <div>
                    <div className="text-2xl font-raleway font-bold text-forest dark:text-white">
                      {networkStats.mainnet.targetValidators.toLocaleString()}
                    </div>
                    <div className="text-sm text-forest/70 dark:text-gray-400">Target Validators</div>
                  </div>
                  <div>
                    <div className="text-2xl font-raleway font-bold text-forest dark:text-white">
                      {networkStats.mainnet.genesisStake}
                    </div>
                    <div className="text-sm text-forest/70 dark:text-gray-400">Genesis Stake</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Bonding Process Steps */}
          <motion.div
            className="mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <h2 className="text-3xl font-raleway font-medium text-forest dark:text-white text-center mb-12">
              Bonding <span className="text-sage">Process</span>
            </h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {bondingSteps.map((step, index) => (
                <Card key={step.step} className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-md border-sage/20 shadow-lg">
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="w-8 h-8 bg-sage rounded-full flex items-center justify-center text-white font-bold text-sm">
                        {step.step}
                      </div>
                      <step.icon className="h-6 w-6 text-sage" />
                    </div>
                    <h3 className="text-lg font-raleway font-semibold text-forest dark:text-white mb-2">
                      {step.title}
                    </h3>
                    <p className="text-forest/70 dark:text-gray-400 font-hammersmith text-sm mb-4">
                      {step.description}
                    </p>
                    <ul className="space-y-1">
                      {step.details.map((detail, idx) => (
                        <li key={idx} className="flex items-start space-x-2 text-xs text-forest/60 dark:text-gray-500">
                          <div className="w-1 h-1 bg-sage rounded-full mt-1.5 flex-shrink-0"></div>
                          <span className="font-hammersmith">{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </motion.div>

          {/* Validator Slots Table */}
          <motion.div
            className="mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <h2 className="text-3xl font-raleway font-medium text-forest dark:text-white text-center mb-12">
              Validator <span className="text-sage">Slots</span>
            </h2>
            
            <div className="space-y-6">
              {staticValidatorSlots.map((slot, index) => (
                <Card key={slot.network} className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-md border-sage/20 shadow-lg">
                  <CardContent className="p-8">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-6 lg:space-y-0">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-4">
                          <h3 className="text-2xl font-raleway font-semibold text-forest dark:text-white">
                            {slot.network}
                          </h3>
                          <Badge 
                            variant={slot.status === 'Active' ? 'default' : 'secondary'}
                            className={slot.status === 'Active' ? 'bg-sage text-white' : ''}
                          >
                            {slot.status}
                          </Badge>
                        </div>
                        
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                          <div>
                            <div className="text-lg font-raleway font-bold text-forest dark:text-white">
                              {slot.filledSlots}/{slot.totalSlots}
                            </div>
                            <div className="text-sm text-forest/70 dark:text-gray-400">Slots Filled</div>
                          </div>
                          <div>
                            <div className="text-lg font-raleway font-bold text-forest dark:text-white">
                              {slot.waitingQueue}
                            </div>
                            <div className="text-sm text-forest/70 dark:text-gray-400">Waiting Queue</div>
                          </div>
                          <div>
                            <div className="text-lg font-raleway font-bold text-forest dark:text-white">
                              {slot.minBond}
                            </div>
                            <div className="text-sm text-forest/70 dark:text-gray-400">Min Bond</div>
                          </div>
                          <div>
                            <div className="text-lg font-raleway font-bold text-forest dark:text-white">
                              {slot.aprEstimate}
                            </div>
                            <div className="text-sm text-forest/70 dark:text-gray-400">Est. APR</div>
                          </div>
                        </div>
                        
                        {slot.status === 'Active' && (
                          <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                              <span className="text-forest/70 dark:text-gray-400">Capacity</span>
                              <span className="text-forest dark:text-white">
                                {((slot.filledSlots / slot.totalSlots) * 100).toFixed(1)}%
                              </span>
                            </div>
                            <Progress value={(slot.filledSlots / slot.totalSlots) * 100} className="h-2" />
                          </div>
                        )}
                      </div>
                      
                      <div className="flex flex-col space-y-2 lg:ml-8">
                        <Button 
                          className="bg-sage hover:bg-medium-forest text-white"
                          disabled={slot.status !== 'Active'}
                        >
                          {slot.status === 'Active' ? 'Join Testnet' : 'Pre-register'}
                        </Button>
                        <Button variant="outline" size="sm" className="border-sage text-sage hover:bg-sage/10">
                          <ExternalLink className="h-4 w-4 mr-2" />
                          View Details
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </motion.div>

          {/* FAQ Section */}
          <motion.div
            className="mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <h2 className="text-3xl font-raleway font-medium text-forest dark:text-white text-center mb-12">
              Frequently Asked <span className="text-sage">Questions</span>
            </h2>
            
            <div className="space-y-4">
              {faqItems.map((faq) => (
                <Card key={faq.id} className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-md border-sage/20 shadow-lg">
                  <Collapsible
                    open={expandedFaq === faq.id}
                    onOpenChange={(open) => setExpandedFaq(open ? faq.id : null)}
                  >
                    <CollapsibleTrigger asChild>
                      <Button
                        variant="ghost"
                        className="w-full p-6 text-left hover:bg-transparent"
                      >
                        <div className="flex items-center justify-between w-full">
                          <h3 className="text-lg font-raleway font-semibold text-forest dark:text-white pr-4">
                            {faq.question}
                          </h3>
                          {expandedFaq === faq.id ? (
                            <ChevronUp className="h-5 w-5 text-sage flex-shrink-0" />
                          ) : (
                            <ChevronDown className="h-5 w-5 text-sage flex-shrink-0" />
                          )}
                        </div>
                      </Button>
                    </CollapsibleTrigger>
                    <CollapsibleContent className="px-6 pb-6">
                      <div className="border-t border-sage/20 pt-4">
                        <p className="text-forest/80 dark:text-gray-300 font-hammersmith leading-relaxed">
                          {faq.answer}
                        </p>
                      </div>
                    </CollapsibleContent>
                  </Collapsible>
                </Card>
              ))}
            </div>
          </motion.div>

          {/* Call to Action */}
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.0 }}
          >
            <Card className="bg-gradient-to-br from-sage to-medium-forest shadow-lg">
              <CardContent className="p-12">
                <h2 className="text-3xl font-raleway font-medium mb-4 text-[#33523e]">
                  Ready to Become a Validator?
                </h2>
                <p className="text-lg font-hammersmith mb-8 max-w-2xl mx-auto text-[#33523e]">
                  Join the decentralized network securing the future of finance. 
                  Start with testnet validation and prepare for mainnet launch.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
                  <Button 
                    size="lg"
                    className="bg-white text-sage hover:bg-gray-100 font-raleway font-medium px-8 py-4"
                  >
                    <Terminal className="mr-2 h-5 w-5" />
                    Apply as Validator
                  </Button>
                  <Button 
                    variant="outline"
                    size="lg"
                    className="border-white text-white hover:bg-white hover:text-sage font-raleway font-medium px-8 py-4"
                  >
                    <ExternalLink className="mr-2 h-5 w-5" />
                    CLI Documentation
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}