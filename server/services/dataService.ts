import NodeCache from 'node-cache';

// Cache for 5 minutes for static content, 30 seconds for dynamic stats
const cache = new NodeCache({ stdTTL: 300 });
const statsCache = new NodeCache({ stdTTL: 30 });

export class DataService {
  
  getHomeData() {
    const cacheKey = 'home_data';
    let data = cache.get(cacheKey);
    
    if (!data) {
      data = {
        hero: {
          title: "The Future of Blockchain is Here",
          subtitle: "Solving the Blockchain Trilemma with PoSyg Consensus",
          description: "PeoChain delivers 100,000+ TPS, 1-second finality, and $0.04 transaction fees while maintaining true decentralization through our revolutionary Proof of Synergy consensus mechanism.",
          metrics: {
            tps: 100000,
            finality: 1,
            transactionFee: 0.04,
            validators: 8543
          }
        },
        features: {
          scalability: {
            title: "Unmatched Scalability",
            description: "100,000+ TPS with sharding and parallel processing",
            details: "Advanced subnet architecture enabling horizontal scaling"
          },
          security: {
            title: "Enterprise Security", 
            description: "Cryptographic proofs with validator slashing",
            details: "Zero-knowledge proofs and threshold signatures"
          },
          decentralization: {
            title: "True Decentralization",
            description: "10,000+ global validators with low barriers",
            details: "Democratic governance and accessible participation"
          }
        }
      };
      cache.set(cacheKey, data);
    }
    
    return data;
  }

  getWhitepaperData() {
    const cacheKey = 'whitepaper_data';
    let data = cache.get(cacheKey);
    
    if (!data) {
      data = {
        title: "PeoChain Technical Whitepaper",
        version: "2.1",
        lastUpdated: "2025-01-15",
        sections: [
          "Executive Summary",
          "Blockchain Trilemma Problem",
          "Proof of Synergy Consensus",
          "Subnet Validator Architecture", 
          "Zero-Knowledge Implementation",
          "Economic Model & Tokenomics",
          "Roadmap & Development"
        ],
        downloadUrl: "/downloads/peochain-whitepaper-v2.1.pdf",
        size: "2.4 MB",
        authors: [
          "Dr. Sarah Chen - Chief Protocol Architect",
          "Prof. Michael Rodriguez - Cryptography Lead", 
          "Dr. Aisha Patel - Consensus Systems"
        ],
        abstract: "This whitepaper presents PeoChain's innovative approach to solving the blockchain trilemma through Proof of Synergy consensus, enabling unprecedented scalability while maintaining security and decentralization.",
        citations: 47,
        downloads: 12847
      };
      cache.set(cacheKey, data);
    }
    
    return data;
  }

  getTechnologyData() {
    const cacheKey = 'technology_data';
    let data = cache.get(cacheKey);
    
    if (!data) {
      data = {
        consensus: {
          name: "Proof of Synergy (PoSyg)",
          description: "Revolutionary consensus combining PoS efficiency with enhanced security",
          features: [
            "Energy efficient validation",
            "Democratic participation",
            "Byzantine fault tolerance",
            "Adaptive difficulty adjustment"
          ],
          energyEfficiency: "99.95% less energy than PoW",
          participationThreshold: "1,000 PEO minimum"
        },
        architecture: {
          subnets: {
            count: 24,
            validatorsPerSubnet: 340,
            crossSubnetLatency: "< 50ms",
            faultTolerance: "33%"
          },
          zkProofs: {
            type: "ZK-STARK",
            privacyGuarantees: "Transaction privacy",
            verificationTime: "< 100ms",
            proofSize: "~ 45KB"
          },
          thresholdSignatures: {
            scheme: "BLS12-381",
            threshold: "2/3 + 1",
            signatureSize: "96 bytes",
            aggregationTime: "< 10ms"
          }
        },
        performance: {
          throughput: "100,000+ TPS",
          finality: "1 second",
          blockTime: "3 seconds", 
          networkLatency: "< 200ms global"
        },
        security: {
          cryptographicPrimitives: ["BLS12-381", "SHA-3", "EdDSA"],
          auditStatus: "Audited by Trail of Bits, Consensys Diligence",
          bugBounty: "$500,000 maximum reward",
          formalVerification: "Core consensus algorithms verified"
        }
      };
      cache.set(cacheKey, data);
    }
    
    return data;
  }

  getNetworkStats() {
    const cacheKey = 'network_stats';
    let stats = statsCache.get(cacheKey);
    
    if (!stats) {
      // Base values with small variations to simulate real network activity
      stats = {
        activeValidators: 8247 + Math.floor(Math.random() * 20 - 10),
        totalTransactions: 1247832 + Math.floor(Math.random() * 100),
        currentTPS: 95432 + Math.floor(Math.random() * 1000 - 500),
        totalValueLocked: "CHF 2.8B"
      };
      statsCache.set(cacheKey, stats);
    }
    
    return stats;
  }

  getValidatorBondsData() {
    const cacheKey = 'validator_bonds_data';
    let data = cache.get(cacheKey);
    
    if (!data) {
      const baseValidators = 347;
      const baseStaked = 2100000;
      
      data = {
        overview: {
          title: "Join PeoChain Validator Network",
          description: "Secure the network and earn rewards through validator staking",
          minimumStake: 10000,
          currentAPY: 12.5,
          bondingPeriod: 21,
          unbondingPeriod: 21
        },
        requirements: {
          technical: [
            "Dedicated server with 99.9% uptime",
            "Minimum 32GB RAM, 8-core CPU",
            "1TB NVMe SSD storage",
            "100 Mbps internet connection"
          ],
          financial: [
            "10,000 PEO minimum stake",
            "Hardware setup costs (~$2,000)",
            "Monthly operational costs (~$200)"
          ],
          operational: [
            "24/7 monitoring setup",
            "Technical expertise in blockchain operations",
            "Backup infrastructure configuration",
            "Security best practices implementation"
          ]
        },
        rewards: {
          baseReward: "8-15% APY",
          performanceBonus: "Up to 3% additional",
          slashingPenalty: "0.5-5% of stake",
          compoundingFrequency: "Daily"
        },
        onboarding: {
          steps: [
            "Technical requirements verification",
            "Stake deposit and bonding",
            "Node setup and configuration",
            "Network synchronization",
            "Validator activation"
          ],
          estimatedTime: "2-4 hours",
          supportChannels: [
            "Discord: #validator-support",
            "Email: validators@peochain.org",
            "Documentation: docs.peochain.org/validators"
          ]
        },
        faq: [
          {
            question: "What happens if my validator goes offline?",
            answer: "Brief downtime results in missed rewards. Extended downtime may trigger slashing penalties proportional to the duration and network impact."
          },
          {
            question: "Can I unstake my tokens at any time?",
            answer: "Yes, but there's a 21-day unbonding period during which your tokens remain locked and you won't earn rewards."
          },
          {
            question: "How are validator rewards calculated?",
            answer: "Base rewards depend on your stake proportion and network participation. Performance bonuses are awarded for high uptime and quick block validation."
          }
        ]
      };
      cache.set(cacheKey, data);
    }
    
    return data;
  }

  getValidatorStats() {
    const cacheKey = 'validator_stats';
    let stats = statsCache.get(cacheKey);
    
    if (!stats) {
      const baseValidators = 347;
      const baseStaked = 2100000;
      
      stats = {
        testnet: {
          totalValidators: baseValidators + Math.floor(Math.random() * 10 - 5),
          totalStaked: `${((baseStaked + Math.floor(Math.random() * 50000 - 25000)) / 1000000).toFixed(1)}M PEO`,
          networkUptime: 99.8 + (Math.random() * 0.15 - 0.05),
          avgRewards: `${(15.2 + Math.random() * 2 - 1).toFixed(1)}%`,
          filledSlots: baseValidators + Math.floor(Math.random() * 10 - 5),
          totalSlots: 500,
          waitingQueue: 23 + Math.floor(Math.random() * 6 - 3)
        },
        mainnet: {
          preRegistrations: 156 + Math.floor(Math.random() * 10 - 5),
          estimatedLaunch: 'Q2 2025',
          targetValidators: 10000,
          genesisStake: '320M PEO',
          filledSlots: 0,
          totalSlots: 10000,
          waitingQueue: 156 + Math.floor(Math.random() * 10 - 5)
        },
        lastUpdated: Date.now()
      };
      statsCache.set(cacheKey, stats);
    }
    
    return stats;
  }

  getPeoPayData() {
    const cacheKey = 'peopay_data';
    let data = cache.get(cacheKey);
    
    if (!data) {
      data = {
        overview: {
          title: "PeoPay - Next Generation Payments",
          description: "Lightning-fast, low-cost payments powered by PeoChain technology",
          transactionSpeed: "1-3 seconds",
          averageFee: "$0.04",
          dailyVolume: "$1.2B",
          supportedCurrencies: ["PEO", "ETH", "BTC", "USDC", "USDT"]
        },
        features: {
          instantSettlement: {
            title: "Instant Settlement",
            description: "Near-instantaneous transaction finality",
            benefit: "No waiting periods, immediate confirmation"
          },
          lowFees: {
            title: "Ultra-Low Fees",
            description: "Average transaction cost of $0.04",
            benefit: "Micropayments and high-frequency trading viable"
          },
          globalReach: {
            title: "Global Accessibility",
            description: "24/7 cross-border payments",
            benefit: "No banking hours or geographic restrictions"
          },
          smartContracts: {
            title: "Smart Contract Integration",
            description: "Programmable payment conditions",
            benefit: "Automated escrow, recurring payments, DeFi integration"
          }
        },
        useCases: [
          "E-commerce payments",
          "Remittances and transfers", 
          "DeFi protocol integration",
          "Micropayments for content",
          "B2B invoice settlement",
          "Gaming and NFT marketplaces"
        ],
        integration: {
          apiEndpoint: "https://api.peopay.io",
          sdkLanguages: ["JavaScript", "Python", "Go", "Rust"],
          plugins: ["WooCommerce", "Shopify", "Magento"],
          documentation: "https://docs.peopay.io"
        },
        metrics: {
          totalTransactions: "2.3M+",
          merchantAdoption: "1,247",
          averageProcessingTime: "2.1s",
          uptimeGuarantee: "99.95%"
        }
      };
      cache.set(cacheKey, data);
    }
    
    return data;
  }
}

export const dataService = new DataService();