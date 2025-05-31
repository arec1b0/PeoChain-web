export interface HeroMetric {
  value: number;
  label: string;
  suffix?: string;
  className?: string;
}

export interface FloatingNode {
  id: number;
  size: number;
  position: {
    top?: string;
    bottom?: string;
    left?: string;
    right?: string;
  };
  delay: number;
}

export const heroMetrics: HeroMetric[] = [
  {
    value: 100000,
    label: "TPS",
    className: "text-sage"
  },
  {
    value: 1,
    label: "Second Finality",
    className: "text-medium-forest"
  },
  {
    value: 0.04,
    label: "Avg. Fees",
    className: "text-dark-sage"
  },
  {
    value: 100,
    label: "Decentralized",
    suffix: "%",
    className: "text-sage"
  }
];

export const floatingNodesConfig: FloatingNode[] = [
  {
    id: 0,
    size: 16,
    position: { top: '20%', left: '10%' },
    delay: 0
  },
  {
    id: 1,
    size: 20,
    position: { top: '40%', right: '20%' },
    delay: 2
  },
  {
    id: 2,
    size: 24,
    position: { bottom: '40%', left: '25%' },
    delay: 4
  },
  {
    id: 3,
    size: 12,
    position: { bottom: '20%', right: '33%' },
    delay: 6
  }
];

export const heroContent = {
  title: {
    primary: "Solving the",
    highlight: "Blockchain Trilemma",
    secondary: "Making",
    secondaryHighlight: "DeFi Accessible",
    suffix: "to All."
  },
  description: {
    text: "PeoChain achieves unprecedented",
    tps: "100,000 TPS",
    finality: "1-second finality",
    accessibility: "true decentralization, bringing DeFi to underbanked populations worldwide with",
    fees: "USD 0.04 fees"
  },
  actions: [
    {
      type: "primary" as const,
      label: "Join Validator Network",
      icon: "Workflow",
      href: "/validator-bonds"
    },
    {
      type: "secondary" as const,
      label: "Experience Testnet",
      icon: "TestTube",
      href: "#"
    },
    {
      type: "secondary" as const,
      label: "Read Whitepaper",
      icon: "BookOpen",
      href: "/whitepaper"
    }
  ]
};