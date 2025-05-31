import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";

export async function registerRoutes(app: Express): Promise<Server> {
  // API route for network statistics (for real-time updates if needed)
  app.get("/api/network-stats", async (req, res) => {
    try {
      // Mock network statistics - in production this would come from blockchain nodes
      const stats = {
        activeValidators: 8247 + Math.floor(Math.random() * 20 - 10),
        totalTransactions: 1247832 + Math.floor(Math.random() * 100),
        currentTPS: 95432 + Math.floor(Math.random() * 1000 - 500),
        totalValueLocked: "CHF 2.8B"
      };
      
      res.json(stats);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch network statistics" });
    }
  });

  // API route for validator bond statistics
  app.get("/api/validator-stats", async (req, res) => {
    try {
      // Mock validator statistics - in production this would come from validator registry
      const baseValidators = 347;
      const baseStaked = 2100000;
      const currentTime = Date.now();
      
      const stats = {
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
        lastUpdated: currentTime
      };
      
      res.json(stats);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch validator statistics" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
