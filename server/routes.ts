import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertTransactionSchema, insertProductionSchema, insertStockMovementSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // Middleware to get user from Firebase (simulated)
  app.use('/api', async (req, res, next) => {
    // In a real app, this would verify Firebase token
    const firebaseUid = req.headers.authorization || 'demo-user';
    
    let user = await storage.getUserByFirebaseUid(firebaseUid);
    if (!user) {
      user = await storage.createUser({
        firebaseUid,
        email: 'demo@example.com',
        displayName: 'Demo User'
      });
    }
    
    req.user = user;
    next();
  });

  // Dashboard endpoints
  app.get('/api/dashboard/summary', async (req, res) => {
    const summary = await storage.getDashboardSummary(req.user.id);
    res.json(summary);
  });

  // Transaction endpoints
  app.get('/api/transactions', async (req, res) => {
    const transactions = await storage.getTransactionsByUserId(req.user.id);
    res.json(transactions);
  });

  app.get('/api/transactions/recent', async (req, res) => {
    const transactions = await storage.getRecentTransactions(req.user.id, 5);
    res.json(transactions);
  });

  app.post('/api/transactions', async (req, res) => {
    try {
      const data = insertTransactionSchema.parse({
        ...req.body,
        userId: req.user.id
      });
      const transaction = await storage.createTransaction(data);
      res.json(transaction);
    } catch (error) {
      res.status(400).json({ error: 'Invalid transaction data' });
    }
  });

  // Production endpoints
  app.get('/api/productions', async (req, res) => {
    const productions = await storage.getProductionsByUserId(req.user.id);
    res.json(productions);
  });

  app.post('/api/productions', async (req, res) => {
    try {
      const { materials, ...productionData } = req.body;
      const data = insertProductionSchema.parse({
        ...productionData,
        userId: req.user.id
      });
      const production = await storage.createProduction(data, materials);
      res.json(production);
    } catch (error) {
      res.status(400).json({ error: 'Invalid production data' });
    }
  });

  // Stock endpoints
  app.get('/api/stock', async (req, res) => {
    const stockItems = await storage.getStockItemsByUserId(req.user.id);
    res.json(stockItems);
  });

  app.get('/api/stock/low', async (req, res) => {
    const lowStockItems = await storage.getLowStockItems(req.user.id);
    res.json(lowStockItems);
  });

  app.post('/api/stock/movement', async (req, res) => {
    try {
      const { itemName, type, movementType, quantity, reason, date, notes } = req.body;
      
      // Get or create stock item
      const stockItem = await storage.getOrCreateStockItem(
        req.user.id,
        itemName,
        type,
        'kg' // Default unit
      );

      // Create stock movement
      const movementData = insertStockMovementSchema.parse({
        userId: req.user.id,
        stockItemId: stockItem.id,
        date,
        type: movementType,
        quantity,
        reason,
        notes
      });

      const movement = await storage.createStockMovement(movementData);
      
      // Update stock quantity
      await storage.updateStockQuantity(stockItem.id, quantity, movementType);

      res.json(movement);
    } catch (error) {
      res.status(400).json({ error: 'Invalid stock movement data' });
    }
  });

  // Reports endpoints
  app.get('/api/reports/financial', async (req, res) => {
    const summary = await storage.getFinancialSummary(req.user.id);
    res.json(summary);
  });

  app.get('/api/reports/top-products', async (req, res) => {
    const topProducts = await storage.getTopProducts(req.user.id);
    res.json(topProducts);
  });

  app.get('/api/reports/hpp', async (req, res) => {
    const hppData = await storage.getHPPData(req.user.id);
    res.json(hppData);
  });

  app.get('/api/reports/bep', async (req, res) => {
    const bepData = await storage.getBEPData(req.user.id);
    res.json(bepData);
  });

  const httpServer = createServer(app);
  return httpServer;
}

// Extend Express Request interface to include user
declare global {
  namespace Express {
    interface Request {
      user: any;
    }
  }
}
