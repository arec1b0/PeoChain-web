import { AnimatedComponent, AccessibleComponent } from "@/types";
import { EXTERNAL_URLS, NAVIGATION_ROUTES, PERFORMANCE_METRICS } from "@shared/config";

export interface HeroMetric {
  readonly value: number;
  readonly label: string;
  readonly suffix?: string;
  readonly className?: string;
  readonly ariaLabel?: string;
}

export interface FloatingNode {
  readonly id: number;
  readonly size: number;
  readonly position: Readonly<{
    top?: string;
    bottom?: string;
    left?: string;
    right?: string;
  }>;
  readonly delay: number;
}

export interface HeroTitleProps extends AnimatedComponent {
  readonly title: Readonly<{
    primary: string;
    highlight: string;
    secondary: string;
    secondaryHighlight: string;
    suffix: string;
  }>;
}

export interface HeroDescriptionProps extends AccessibleComponent {
  readonly description: Readonly<{
    text: string;
    tps: string;
    finality: string;
    accessibility: string;
    fees: string;
  }>;
}

export interface HeroAction {
  readonly type: "primary" | "secondary";
  readonly label: string;
  readonly icon: string;
  readonly href: string;
  readonly ariaLabel?: string;
}

export const heroMetrics: readonly HeroMetric[] = [
  {
    value: 100000,
    label: "TPS",
    className: "text-sage",
    ariaLabel: "Performance metric: 100,000 transactions per second",
  },
  {
    value: 1,
    label: "Second Finality",
    className: "text-medium-forest",
    ariaLabel: "Performance metric: 1 second transaction finality",
  },
  {
    value: 0.04,
    label: "Avg. Fees",
    className: "text-dark-sage",
    ariaLabel: "Performance metric: Average fees of 4 cents USD",
  },
  {
    value: 100,
    label: "Decentralized",
    suffix: "%",
    className: "text-sage",
    ariaLabel: "Performance metric: 100% decentralized network",
  },
] as const;

export const floatingNodesConfig: FloatingNode[] = [
  {
    id: 0,
    size: 16,
    position: { top: "20%", left: "10%" },
    delay: 0,
  },
  {
    id: 1,
    size: 20,
    position: { top: "40%", right: "20%" },
    delay: 2,
  },
  {
    id: 2,
    size: 24,
    position: { bottom: "40%", left: "25%" },
    delay: 4,
  },
  {
    id: 3,
    size: 12,
    position: { bottom: "20%", right: "33%" },
    delay: 6,
  },
];

export const heroContent = {
  title: {
    primary: "Solving the",
    highlight: "Blockchain Trilemma",
    secondary: "Making",
    secondaryHighlight: "DeFi Accessible",
    suffix: "to All.",
  },
  description: {
    text: "PeoChain achieves unprecedented",
    tps: "100,000 TPS",
    finality: "1-second finality",
    accessibility:
      "true decentralization, bringing DeFi to underbanked populations worldwide with",
    fees: "USD 0.04 fees",
  },
  actions: [
    {
      type: "primary" as const,
      label: "Join Validator Network",
      icon: "Workflow",
      href: NAVIGATION_ROUTES.VALIDATOR_BONDS,
      ariaLabel: "Navigate to validator bonds page to join the network",
    },
    {
      type: "secondary" as const,
      label: "Experience Testnet",
      icon: "TestTube",
      href: EXTERNAL_URLS.TESTNET,
      ariaLabel: "Try the PeoChain testnet environment",
    },
    {
      type: "secondary" as const,
      label: "Read Whitepaper",
      icon: "BookOpen",
      href: NAVIGATION_ROUTES.WHITEPAPER,
      ariaLabel: "Read the technical whitepaper documentation",
    },
  ],
} as const;
