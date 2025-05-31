import { AccessibleComponent } from '@/types';

export interface FeatureDetail {
  readonly text: string;
  readonly ariaLabel?: string;
}

export interface CoreFeature {
  readonly icon: string;
  readonly title: string;
  readonly description: string;
  readonly metric: string;
  readonly gradient: string;
  readonly details: readonly FeatureDetail[];
  readonly ariaLabel?: string;
}

export interface PerformanceMetric {
  readonly label: string;
  readonly value: number;
  readonly unit: string;
  readonly comparison: string;
  readonly ariaLabel?: string;
}

export interface TechnicalHighlight {
  readonly icon: string;
  readonly title: string;
  readonly description: string;
  readonly gradient: string;
  readonly ariaLabel?: string;
}

export interface FeatureCardProps extends AccessibleComponent {
  readonly feature: CoreFeature;
  readonly index: number;
  readonly isInView: boolean;
}

export interface PerformanceBenchmarksProps extends AccessibleComponent {
  readonly metrics: readonly PerformanceMetric[];
  readonly isInView: boolean;
  readonly title: string;
  readonly highlight: string;
  readonly description: string;
}

export const coreFeatures: CoreFeature[] = [
  {
    icon: 'Network',
    title: 'Proof of Synergy (PoSyg)',
    description: 'Revolutionary consensus mechanism that rewards collaborative validation and network growth',
    metric: '99.9% Uptime',
    gradient: 'gradient-sage-forest',
    details: [
      { text: 'Energy efficient validation' },
      { text: 'Collaborative rewards system' },
      { text: 'Automatic slashing protection' }
    ]
  },
  {
    icon: 'DollarSign',
    title: 'Ultra-Low Fees',
    description: 'Industry-leading transaction costs making DeFi accessible to everyone globally',
    metric: 'USD 0.04',
    gradient: 'bg-medium-forest',
    details: [
      { text: 'Fixed low-cost structure' },
      { text: 'No hidden fees' },
      { text: 'Gas optimization built-in' }
    ]
  },
  {
    icon: 'Zap',
    title: 'Lightning Performance',
    description: 'Unprecedented throughput with instant finality for real-time applications',
    metric: '100K TPS',
    gradient: 'bg-dark-sage',
    details: [
      { text: '1-second finality' },
      { text: 'Parallel processing' },
      { text: 'Auto-scaling capacity' }
    ]
  },
  {
    icon: 'Star',
    title: 'Dynamic Contribution Scoring',
    description: 'AI-powered scoring system that rewards network participants based on their contributions',
    metric: 'Smart Rewards',
    gradient: 'gradient-sage-forest',
    details: [
      { text: 'Real-time scoring updates' },
      { text: 'Multi-factor evaluation' },
      { text: 'Fair reward distribution' }
    ]
  },
  {
    icon: 'Smartphone',
    title: 'Mobile Integration',
    description: 'Seamless integration with popular mobile payment systems worldwide',
    metric: 'M-Pesa & GCash',
    gradient: 'bg-medium-forest',
    details: [
      { text: 'Direct wallet connection' },
      { text: 'Instant settlements' },
      { text: 'Cross-platform support' }
    ]
  },
  {
    icon: 'Link',
    title: 'Cross-Chain Bridge',
    description: 'Trustless interoperability with major blockchain networks and traditional systems',
    metric: '15+ Networks',
    gradient: 'bg-dark-sage',
    details: [
      { text: 'Ethereum compatibility' },
      { text: 'Bitcoin integration' },
      { text: 'Traditional bank APIs' }
    ]
  }
];

export const performanceMetrics: PerformanceMetric[] = [
  {
    label: 'Transaction Speed',
    value: 100,
    unit: 'TPS',
    comparison: 'vs Ethereum: 15 TPS'
  },
  {
    label: 'Finality Time',
    value: 100,
    unit: 'sec',
    comparison: 'vs Bitcoin: 600 sec'
  },
  {
    label: 'Cost Efficiency',
    value: 95,
    unit: '%',
    comparison: 'vs Traditional: $25'
  },
  {
    label: 'Energy Usage',
    value: 99,
    unit: '% less',
    comparison: 'vs PoW chains'
  }
];

export const technicalHighlights: TechnicalHighlight[] = [
  {
    icon: 'Clock',
    title: 'Real-Time Processing',
    description: 'Sub-second transaction confirmation with parallel execution',
    gradient: 'from-sage to-medium-forest'
  },
  {
    icon: 'Shield',
    title: 'Enterprise Security',
    description: 'Military-grade encryption with formal verification protocols',
    gradient: 'from-medium-forest to-dark-sage'
  },
  {
    icon: 'BarChart3',
    title: 'Dynamic Scaling',
    description: 'Automatic network capacity adjustment based on demand',
    gradient: 'from-dark-sage to-forest'
  }
];

export const featuresContent = {
  section: {
    title: "Revolutionary",
    highlight: "Blockchain Features",
    description: "Breakthrough innovations that solve real-world problems in decentralized finance and global accessibility."
  },
  performance: {
    title: "Performance",
    highlight: "Benchmarks",
    description: "See how PeoChain outperforms traditional blockchain networks"
  }
};