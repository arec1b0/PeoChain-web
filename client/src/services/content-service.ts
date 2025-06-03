import { heroContent, heroMetrics } from "@/data/hero-data";
import {
  coreFeatures,
  performanceMetrics,
  technicalHighlights,
} from "@/data/features-data";

// Service interfaces for type safety
export interface ContentService {
  getHeroData(): Promise<typeof heroContent>;
  getHeroMetrics(): Promise<typeof heroMetrics>;
  getFeatures(): Promise<typeof coreFeatures>;
  getPerformanceMetrics(): Promise<typeof performanceMetrics>;
  getTechnicalHighlights(): Promise<typeof technicalHighlights>;
  getValidatorStats(): Promise<NetworkStats>;
  getWhitepaperSections(): Promise<WhitepaperSection[]>;
}

export interface NetworkStats {
  testnet: {
    totalValidators: number;
    activeValidators: number;
    avgUptime: string;
    networkStake: string;
  };
  mainnet: {
    preRegistrations: number;
    estimatedLaunch: string;
    targetValidators: number;
    genesisStake: string;
  };
}

export interface WhitepaperSection {
  title: string;
  summary: string;
}

// Static implementation (current state)
export class StaticContentService implements ContentService {
  async getHeroData() {
    return heroContent;
  }

  async getHeroMetrics() {
    return heroMetrics;
  }

  async getFeatures() {
    return coreFeatures;
  }

  async getPerformanceMetrics() {
    return performanceMetrics;
  }

  async getTechnicalHighlights() {
    return technicalHighlights;
  }

  async getValidatorStats(): Promise<NetworkStats> {
    return {
      testnet: {
        totalValidators: 250,
        activeValidators: 240,
        avgUptime: "99.8%",
        networkStake: "2.5M PEO",
      },
      mainnet: {
        preRegistrations: 156,
        estimatedLaunch: "Q2 2025",
        targetValidators: 10000,
        genesisStake: "320M PEO",
      },
    };
  }

  async getWhitepaperSections(): Promise<WhitepaperSection[]> {
    return [
      {
        title: "Introduction",
        summary:
          "Overview of global financial inclusion challenges and PeoChain's innovative solution to bridge the gap for underbanked populations worldwide.",
      },
      {
        title: "Proof of Synergy (PoSyg): A Unique Consensus Model",
        summary:
          "Revolutionary consensus mechanism that combines validator performance, network contribution, and stake weight to achieve optimal scalability and security.",
      },
      {
        title: "Technical Architecture",
        summary:
          "Comprehensive system design including subnet architecture, cross-chain interoperability, and zero-knowledge proof implementations.",
      },
      {
        title: "Economic Model (Tokenomics)",
        summary:
          "Token distribution, validator rewards, transaction fee structure, and economic incentives driving network sustainability.",
      },
      {
        title: "Financial Model and Projections",
        summary:
          "Revenue streams, market analysis, adoption forecasts, and long-term financial sustainability projections for the PeoChain ecosystem.",
      },
      {
        title: "Roadmap",
        summary:
          "Development phases from testnet launch through mainnet deployment, including key milestones and timeline for global expansion.",
      },
      {
        title: "Conclusion",
        summary:
          "Summary of PeoChain's potential impact on global financial inclusion and the future of decentralized finance.",
      },
    ];
  }
}

// Future API implementation (ready for migration)
export class ApiContentService implements ContentService {
  private baseUrl: string;

  constructor(baseUrl: string = "/api") {
    this.baseUrl = baseUrl;
  }

  async getHeroData() {
    const response = await fetch(`${this.baseUrl}/content/hero`);
    if (!response.ok) throw new Error("Failed to fetch hero data");
    return response.json();
  }

  async getHeroMetrics() {
    const response = await fetch(`${this.baseUrl}/content/hero/metrics`);
    if (!response.ok) throw new Error("Failed to fetch hero metrics");
    return response.json();
  }

  async getFeatures() {
    const response = await fetch(`${this.baseUrl}/content/features`);
    if (!response.ok) throw new Error("Failed to fetch features");
    return response.json();
  }

  async getPerformanceMetrics() {
    const response = await fetch(`${this.baseUrl}/content/performance`);
    if (!response.ok) throw new Error("Failed to fetch performance metrics");
    return response.json();
  }

  async getTechnicalHighlights() {
    const response = await fetch(`${this.baseUrl}/content/technical`);
    if (!response.ok) throw new Error("Failed to fetch technical highlights");
    return response.json();
  }

  async getValidatorStats(): Promise<NetworkStats> {
    const response = await fetch(`${this.baseUrl}/validators/stats`);
    if (!response.ok) throw new Error("Failed to fetch validator stats");
    return response.json();
  }

  async getWhitepaperSections(): Promise<WhitepaperSection[]> {
    const response = await fetch(`${this.baseUrl}/content/whitepaper/sections`);
    if (!response.ok) throw new Error("Failed to fetch whitepaper sections");
    return response.json();
  }
}

// Service factory for environment-based instantiation
export function createContentService(): ContentService {
  const useApi = import.meta.env.VITE_USE_API === "true";
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

  if (useApi && apiBaseUrl) {
    return new ApiContentService(apiBaseUrl);
  }

  return new StaticContentService();
}

// Default service instance
export const contentService = createContentService();
