import { NETWORK_CONFIG } from "@shared/config";

export interface BondingStep {
  step: number;
  title: string;
  description: string;
  icon: string;
  details: string[];
}

export interface ValidatorSlot {
  network: string;
  status: string;
  totalSlots: number;
  filledSlots: number;
  waitingQueue: number;
  minBond: string;
  aprEstimate: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export const bondingSteps: BondingStep[] = [
  {
    step: 1,
    title: "Key Generation",
    description: "Generate validator keys using PeoChain CLI or secure key generation tools",
    icon: "Key",
    details: [
      "Generate BLS12-381 keypair for validator signing",
      "Create withdrawal credentials for reward collection",
      "Secure backup of mnemonic phrase and keystore files",
      "Verify key derivation and signature validation",
    ],
  },
  {
    step: 2,
    title: "Minimum Bond",
    description: "Stake the required minimum bond amount to participate in validation",
    icon: "DollarSign",
    details: [
      `Testnet: ${NETWORK_CONFIG.TESTNET.MIN_BOND} minimum bond requirement`,
      `Mainnet: ${NETWORK_CONFIG.MAINNET.MIN_BOND} minimum bond (estimated)`,
      "Additional bond increases validator weight and rewards",
      "Bond funds are locked during validation period",
    ],
  },
  {
    step: 3,
    title: "Timelock Period",
    description: "Understanding the unbonding and withdrawal timelock mechanics",
    icon: "Clock",
    details: [
      `Testnet: ${NETWORK_CONFIG.TESTNET.UNBONDING_PERIOD} unbonding period for testing`,
      `Mainnet: ${NETWORK_CONFIG.MAINNET.UNBONDING_PERIOD} unbonding period for security`,
      "Partial withdrawals available after 7 days",
      "Emergency exit with penalty fees possible",
    ],
  },
  {
    step: 4,
    title: "Onboarding",
    description: "Complete validator registration via CLI tools or web interface",
    icon: "Terminal",
    details: [
      "Install PeoChain validator client software",
      "Configure network connection and sync blockchain",
      "Submit validator registration transaction",
      "Monitor validator status and performance metrics",
    ],
  },
];

export const validatorSlots: ValidatorSlot[] = [
  {
    network: "Testnet",
    status: "Active",
    totalSlots: 500,
    filledSlots: 250,
    waitingQueue: 15,
    minBond: "1,000 PEO",
    aprEstimate: "12-18%",
  },
  {
    network: "Mainnet",
    status: "Coming Soon",
    totalSlots: 10000,
    filledSlots: 0,
    waitingQueue: 156,
    minBond: "32,000 PEO",
    aprEstimate: "8-12%",
  },
];

export const faqItems: FaqItem[] = [
  {
    id: "what-is-validator",
    question: "What is a PeoChain validator?",
    answer: "A validator is a network participant who validates transactions and produces blocks in the PeoChain network. Validators stake PEO tokens and earn rewards for maintaining network security and consensus.",
  },
  {
    id: "minimum-requirements",
    question: "What are the minimum technical requirements?",
    answer: "Validators need a dedicated server with minimum 8 CPU cores, 32GB RAM, 1TB SSD storage, and stable internet connection. The server should have 99.9% uptime to avoid slashing penalties.",
  },
  {
    id: "slashing-conditions",
    question: "What are the slashing conditions?",
    answer: "Slashing occurs for: double signing (5% penalty), extended downtime over 24 hours (1% penalty), and malicious behavior (up to 100% penalty). Validators can implement monitoring to prevent accidental slashing.",
  },
  {
    id: "reward-structure",
    question: "How are validator rewards calculated?",
    answer: "Rewards are based on: base staking rewards (6-8% APR), transaction fees (variable), and performance bonuses. Higher stake and better uptime result in proportionally higher rewards.",
  },
  {
    id: "unbonding-process",
    question: "How does the unbonding process work?",
    answer: "Unbonding takes 21 days on mainnet (24 hours on testnet). During this period, tokens are locked and don't earn rewards. Validators can partially unbond while maintaining minimum stake requirements.",
  },
];

export const networkStats = {
  testnet: {
    totalValidators: 250,
    activeValidators: 240,
    avgUptime: "99.8%",
    networkStake: "2.5M PEO",
  },
  mainnet: {
    preRegistrations: 156,
    estimatedLaunch: NETWORK_CONFIG.MAINNET.ESTIMATED_LAUNCH,
    targetValidators: 10000,
    genesisStake: "320M PEO",
  },
};