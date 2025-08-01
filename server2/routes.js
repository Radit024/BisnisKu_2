import {
  insertTransactionSchema,
  insertProductionSchema,
  insertStockMovementSchema,
} from "./schema.js";
import {
  createTransactions,
  getTransactions,
  createProductions,
  getProductions,
  createStockItem,
  createStockMovement,
  getStockItems,
  getLowStockItems,
  getFinancialSummary,
  getTopProducts,
  getHPPData,
  getBEPData
} from "./query.js";
import { parse } from "path";
import jwt from "jsonwebtoken";
import axios from "axios";

async function getKey(header, callback){
  const pkey = await axios.get('https://www.googleapis.com/robot/v1/metadata/x509/securetoken@system.gserviceaccount.com').then(res => res.data);
  callback(null, pkey[header.kid]);
}

export async function registerRoutes(app) {
  // Middleware to get user from Firebase (simulated)
  app.use("/api", async (req, res, next) => {
    // In a real app, this would verify Firebase token
    const firebaseToken = req.headers.authorization.split("Bearer ")[1];
    
    await jwt.verify(firebaseToken, getKey,{ algorithms: ['RS256'] }, function(err, decoded) {
      if(err) return res.status(401).json({"error" : "Unauthorized"});
      console.log(decoded) // bar
      req.user = decoded;
      next();
    });
  });

  // Dashboard endpoints
  app.get("/api/dashboard/summary", async (req, res) => {
    const totalTransactions = await getTransactions(req.user.user_id);
    const todayIncome = totalTransactions
      .filter(t => t.type === 'income')
      .reduce((sum, t) => sum + parseFloat(t.amount), 0);
    
    const todayExpenses = totalTransactions
      .filter(t => t.type === 'expense')
      .reduce((sum, t) => sum + parseFloat(t.amount), 0);
    
    const productsSold = totalTransactions
      .filter(t => t.type === 'income')
      .length;
      
    res.json({
        todayIncome,
        todayExpenses,
        productsSold
    });
  });

  // Transaction endpoints
  app.get("/api/transactions", async (req, res) => {
    const transactions = await getTransactions(req.user.user_id);
    res.json(transactions);
  });

  app.get("/api/transactions/recent", async (req, res) => {
    const transactions = await getTransactions(req.user.user_id, {latest : true});
    console.log(transactions);
    res.json(transactions);
  });

  app.post("/api/transactions", async (req, res) => {
    try {
      const data = insertTransactionSchema.parse({
        ...req.body,
        userUid: req.user.user_id,
      });
      const transaction = await createTransactions(data);
      res.json(transaction);
    } catch (error) {
      res.status(400).json({ error: "Invalid transaction data", more_info: error.message });
    }
  });

  // Production endpoints
  app.get("/api/productions", async (req, res) => {
    const productions = await getProductions(req.user.user_id);
    res.json(productions);
  });

  app.post("/api/productions", async (req, res) => {
    try {
      const { materials, ...productionData } = req.body;
      const data = insertProductionSchema.parse({
        ...productionData,
        userUid: req.user.user_id,
      });
      const production = await createProductions(data, materials);
      res.json(production);
    } catch (error) {
      res.status(400).json({ error: "Invalid production data", more_info: error.message });
    }
  });

  // Stock endpoints
  app.get("/api/stock", async (req, res) => {
    const stockItems = await getStockItems(req.user.user_id);
    res.json(stockItems);
  });

  app.get("/api/stock/low", async (req, res) => {
    const lowStockItems = await getLowStockItems(req.user.user_id);
    res.json(lowStockItems);
  });

  app.post("/api/stock/movement", async (req, res) => {
    try {
      let { itemName, type, movementType, quantity, reason, date, notes } =
        req.body;

      // Get or create stock item
      const stockItem = await createStockItem(
        req.user.user_id,
        itemName,
        type,
        "kg" // Default unit
      );

      quantity = quantity.toString();

      // Create stock movement
      const movementData = insertStockMovementSchema.parse({
        userUid: req.user.user_id,
        stockItemId: stockItem.id,
        date,
        type: movementType,
        quantity,
        reason,
        notes,
      });

      const movement = await createStockMovement(movementData);

      res.json(movement);
    } catch (error) {
      res
        .status(400)
        .json({
          error: "Invalid stock movement data",
          more_info: error.message,
        });
    }
  });

  // Reports endpoints
  app.get("/api/reports/financial", async (req, res) => {
    const summary = await getFinancialSummary(req.user.user_id);
    res.json(summary);
  });

  app.get("/api/reports/top-products", async (req, res) => {
    const topProducts = await getTopProducts(req.user.user_id);
    res.json(topProducts);
  });

  app.get("/api/reports/hpp", async (req, res) => {
    const hppData = await getHPPData(req.user.user_id);
    res.json(hppData);
  });

  app.get("/api/reports/bep", async (req, res) => {
    const bepData = await getBEPData(req.user.user_id);
    res.json(bepData);
  });
}
