import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { dataService } from "./services/dataService";
import {
  userValidation,
  loginValidation,
  handleValidationErrors,
} from "./middleware/validation";
import {
  requireAuth,
  verifyPassword,
  type AuthenticatedRequest,
} from "./middleware/auth";
import { csrfProtection, getCSRFToken } from "./middleware/csrf";
import {
  staticDataCache,
  dynamicDataCache,
  conditionalCache,
} from "./middleware/cache";
import { logError } from "./utils/logger";

export async function registerRoutes(app: Express): Promise<Server> {
  // CSRF token endpoint
  app.get("/api/auth/csrf-token", getCSRFToken);

  // Authentication Routes
  app.post(
    "/api/auth/register",
    csrfProtection,
    userValidation,
    handleValidationErrors,
    async (req: Request, res: Response) => {
      const authReq = req as AuthenticatedRequest;
      try {
        const { username, password } = req.body;

        // Check if user already exists
        const existingUser = await storage.getUserByUsername(username);
        if (existingUser) {
          return res.status(400).json({ error: "Username already taken" });
        }

        const user = await storage.createUser({ username, password });

        // Set session
        authReq.session.userId = user.id;
        authReq.session.username = user.username;

        res.status(201).json({
          message: "User created successfully",
          user: { id: user.id, username: user.username },
        });
      } catch (error) {
        logError(error as Error, "Registration");
        res.status(500).json({ error: "Failed to create user" });
      }
    },
  );

  app.post(
    "/api/auth/login",
    csrfProtection,
    loginValidation,
    handleValidationErrors,
    async (req: Request, res: Response) => {
      const authReq = req as AuthenticatedRequest;
      try {
        const { username, password } = req.body;

        const user = await storage.getUserByUsername(username);
        if (!user) {
          return res.status(401).json({ error: "Invalid credentials" });
        }

        const isValid = await verifyPassword(password, user.passwordHash);
        if (!isValid) {
          return res.status(401).json({ error: "Invalid credentials" });
        }

        // Set session
        authReq.session.userId = user.id;
        authReq.session.username = user.username;

        res.json({
          message: "Login successful",
          user: { id: user.id, username: user.username },
        });
      } catch (error) {
        logError(error as Error, "Login");
        res.status(500).json({ error: "Login failed" });
      }
    },
  );

  app.post(
    "/api/auth/logout",
    csrfProtection,
    (req: Request, res: Response) => {
      const authReq = req as AuthenticatedRequest;
      authReq.session.destroy((err) => {
        if (err) {
          return res.status(500).json({ error: "Could not log out" });
        }
        res.json({ message: "Logout successful" });
      });
    },
  );

  app.get("/api/auth/me", requireAuth, async (req: Request, res: Response) => {
    const authReq = req as AuthenticatedRequest;
    try {
      const user = await storage.getUser(authReq.user!.id);
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      res.json({
        id: user.id,
        username: user.username,
        createdAt: user.createdAt,
      });
    } catch (error) {
      logError(error as Error, "Get user profile");
      res.status(500).json({ error: "Failed to fetch user profile" });
    }
  });

  // Public API Endpoints with caching (using data service)
  app.get("/api/home", staticDataCache(300), async (req, res) => {
    try {
      const data = dataService.getHomeData();
      res.json(data);
    } catch (error) {
      logError(error as Error, "Get home data");
      res.status(500).json({ error: "Failed to fetch homepage data" });
    }
  });

  app.get("/api/whitepaper", staticDataCache(600), async (req, res) => {
    try {
      const data = dataService.getWhitepaperData();
      res.json(data);
    } catch (error) {
      logError(error as Error, "Get whitepaper data");
      res.status(500).json({ error: "Failed to fetch whitepaper information" });
    }
  });

  app.get("/api/peopay", staticDataCache(600), async (req, res) => {
    try {
      const data = dataService.getPeoPayData();
      res.json(data);
    } catch (error) {
      logError(error as Error, "Get PeoPay data");
      res.status(500).json({ error: "Failed to fetch PeoPay information" });
    }
  });

  app.get("/api/technology", staticDataCache(600), async (req, res) => {
    try {
      const data = dataService.getTechnologyData();
      res.json(data);
    } catch (error) {
      logError(error as Error, "Get technology data");
      res.status(500).json({ error: "Failed to fetch technology information" });
    }
  });

  app.get("/api/network-stats", dynamicDataCache(60), async (req, res) => {
    try {
      const stats = dataService.getNetworkStats();
      res.json(stats);
    } catch (error) {
      logError(error as Error, "Get network stats");
      res.status(500).json({ error: "Failed to fetch network statistics" });
    }
  });

  app.get("/api/validator-bonds", staticDataCache(300), async (req, res) => {
    try {
      const data = dataService.getValidatorBondsData();
      const stats = dataService.getValidatorStats();

      res.json({
        ...data,
        networkStats: stats,
      });
    } catch (error) {
      logError(error as Error, "Get validator bonds data");
      res
        .status(500)
        .json({ error: "Failed to fetch validator bonds information" });
    }
  });

  app.get("/api/validator-stats", dynamicDataCache(30), async (req, res) => {
    try {
      const stats = dataService.getValidatorStats();
      res.json(stats);
    } catch (error) {
      logError(error as Error, "Get validator stats");
      res.status(500).json({ error: "Failed to fetch validator statistics" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
