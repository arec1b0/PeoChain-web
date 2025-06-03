export const EXTERNAL_URLS = {
  GITHUB: "https://github.com/peochain",
  DOCS: "https://docs.peochain.xyz",
  TESTNET: "https://testnet.peochain.xyz",
  VALIDATOR_APPLICATION: "https://forms.peochain.xyz/validator-application",
  CLI_DOCS: "https://docs.peochain.xyz/cli",
  VALIDATOR_DETAILS: "https://docs.peochain.xyz/validators",
  VALIDATOR_JOIN: "https://testnet.peochain.xyz/validator",
  WHITEPAPER_PDF: "https://peochain.xyz/whitepaper/PEOCHAIN_White_Paper.pdf",
  GET_STARTED: "https://docs.peochain.xyz/getting-started",
  COMMUNITY: "https://discord.gg/ahAyh5pA",
  TWITTER: "https://x.com/peochain?s=21",
  LINKEDIN: "https://www.linkedin.com/company/peochain/",
  EMAIL: "mailto:info@peochain.xyz",
} as const;

export const NAVIGATION_ROUTES = {
  HOME: "/",
  TECHNOLOGY: "/technology",
  WHITEPAPER: "/whitepaper",
  VALIDATOR_BONDS: "/validator-bonds",
} as const;

export const PERFORMANCE_METRICS = {
  TPS: "100,000",
  FINALITY: "1-second",
  FEES: "USD 0.04",
} as const;

export const NETWORK_CONFIG = {
  TESTNET: {
    MIN_BOND: "1,000 PEO",
    UNBONDING_PERIOD: "24 hours",
  },
  MAINNET: {
    MIN_BOND: "32,000 PEO",
    UNBONDING_PERIOD: "21 days",
    ESTIMATED_LAUNCH: "Q2 2025",
  },
} as const;
