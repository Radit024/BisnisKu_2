import { 
  users, 
  transactions, 
  productions, 
  productionMaterials, 
  stockItems, 
  stockMovements,
  type User, 
  type InsertUser,
  type Transaction,
  type InsertTransaction,
  type Production,
  type InsertProduction,
  type ProductionMaterial,
  type InsertProductionMaterial,
  type StockItem,
  type InsertStockItem,
  type StockMovement,
  type InsertStockMovement
} from "@shared/schema";

export interface IStorage {
  // User methods
  getUser(id: number): Promise<User | undefined>;
  getUserByFirebaseUid(firebaseUid: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Transaction methods
  getTransactionsByUserId(userId: number): Promise<Transaction[]>;
  getRecentTransactions(userId: number, limit?: number): Promise<Transaction[]>;
  createTransaction(transaction: InsertTransaction): Promise<Transaction>;
  
  // Production methods
  getProductionsByUserId(userId: number): Promise<(Production & { materials: ProductionMaterial[] })[]>;
  createProduction(production: InsertProduction, materials: InsertProductionMaterial[]): Promise<Production>;
  
  // Stock methods
  getStockItemsByUserId(userId: number): Promise<StockItem[]>;
  getOrCreateStockItem(userId: number, itemName: string, type: string, unit: string): Promise<StockItem>;
  updateStockQuantity(stockItemId: number, quantity: number, type: 'in' | 'out'): Promise<void>;
  createStockMovement(movement: InsertStockMovement): Promise<StockMovement>;
  getLowStockItems(userId: number): Promise<StockItem[]>;
  
  // Dashboard methods
  getDashboardSummary(userId: number): Promise<any>;
  getFinancialSummary(userId: number): Promise<any>;
  getTopProducts(userId: number): Promise<any[]>;
  getHPPData(userId: number): Promise<any[]>;
  getBEPData(userId: number): Promise<any[]>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User> = new Map();
  private transactions: Map<number, Transaction> = new Map();
  private productions: Map<number, Production> = new Map();
  private productionMaterials: Map<number, ProductionMaterial> = new Map();
  private stockItems: Map<number, StockItem> = new Map();
  private stockMovements: Map<number, StockMovement> = new Map();
  private currentUserId = 1;
  private currentTransactionId = 1;
  private currentProductionId = 1;
  private currentMaterialId = 1;
  private currentStockItemId = 1;
  private currentStockMovementId = 1;

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByFirebaseUid(firebaseUid: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(user => user.firebaseUid === firebaseUid);
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = {
      ...insertUser,
      id,
      displayName: insertUser.displayName || null,
      createdAt: new Date()
    };
    this.users.set(id, user);
    return user;
  }

  async getTransactionsByUserId(userId: number): Promise<Transaction[]> {
    return Array.from(this.transactions.values())
      .filter(transaction => transaction.userId === userId)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }

  async getRecentTransactions(userId: number, limit = 10): Promise<Transaction[]> {
    const transactions = await this.getTransactionsByUserId(userId);
    return transactions.slice(0, limit);
  }

  async createTransaction(insertTransaction: InsertTransaction): Promise<Transaction> {
    const id = this.currentTransactionId++;
    const transaction: Transaction = {
      ...insertTransaction,
      id,
      notes: insertTransaction.notes || null,
      createdAt: new Date()
    };
    this.transactions.set(id, transaction);
    return transaction;
  }

  async getProductionsByUserId(userId: number): Promise<(Production & { materials: ProductionMaterial[] })[]> {
    const userProductions = Array.from(this.productions.values())
      .filter(production => production.userId === userId)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    return userProductions.map(production => ({
      ...production,
      materials: Array.from(this.productionMaterials.values())
        .filter(material => material.productionId === production.id)
    }));
  }

  async createProduction(insertProduction: InsertProduction, materials: InsertProductionMaterial[]): Promise<Production> {
    const id = this.currentProductionId++;
    const production: Production = {
      ...insertProduction,
      id,
      notes: insertProduction.notes || null,
      createdAt: new Date()
    };
    this.productions.set(id, production);

    // Create materials
    for (const material of materials) {
      const materialId = this.currentMaterialId++;
      const productionMaterial: ProductionMaterial = {
        ...material,
        id: materialId,
        productionId: id
      };
      this.productionMaterials.set(materialId, productionMaterial);
    }

    return production;
  }

  async getStockItemsByUserId(userId: number): Promise<StockItem[]> {
    return Array.from(this.stockItems.values())
      .filter(item => item.userId === userId)
      .sort((a, b) => a.itemName.localeCompare(b.itemName));
  }

  async getOrCreateStockItem(userId: number, itemName: string, type: string, unit: string): Promise<StockItem> {
    const existing = Array.from(this.stockItems.values())
      .find(item => item.userId === userId && item.itemName === itemName && item.type === type);
    
    if (existing) {
      return existing;
    }

    const id = this.currentStockItemId++;
    const stockItem: StockItem = {
      id,
      userId,
      itemName,
      type,
      currentStock: "0",
      unit,
      createdAt: new Date()
    };
    this.stockItems.set(id, stockItem);
    return stockItem;
  }

  async updateStockQuantity(stockItemId: number, quantity: number, type: 'in' | 'out'): Promise<void> {
    const item = this.stockItems.get(stockItemId);
    if (!item) return;

    const currentStock = parseFloat(item.currentStock);
    const newStock = type === 'in' ? currentStock + quantity : currentStock - quantity;
    
    item.currentStock = Math.max(0, newStock).toString();
    this.stockItems.set(stockItemId, item);
  }

  async createStockMovement(insertMovement: InsertStockMovement): Promise<StockMovement> {
    const id = this.currentStockMovementId++;
    const movement: StockMovement = {
      ...insertMovement,
      id,
      notes: insertMovement.notes || null,
      createdAt: new Date()
    };
    this.stockMovements.set(id, movement);
    return movement;
  }

  async getLowStockItems(userId: number): Promise<StockItem[]> {
    return Array.from(this.stockItems.values())
      .filter(item => item.userId === userId && parseFloat(item.currentStock) < 10)
      .sort((a, b) => parseFloat(a.currentStock) - parseFloat(b.currentStock));
  }

  async getDashboardSummary(userId: number): Promise<any> {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const todayTransactions = Array.from(this.transactions.values())
      .filter(t => t.userId === userId && new Date(t.date) >= today);
    
    const todayIncome = todayTransactions
      .filter(t => t.type === 'income')
      .reduce((sum, t) => sum + parseFloat(t.amount), 0);
    
    const todayExpenses = todayTransactions
      .filter(t => t.type === 'expense')
      .reduce((sum, t) => sum + parseFloat(t.amount), 0);
    
    const productsSold = todayTransactions
      .filter(t => t.type === 'income')
      .length;

    return {
      todayIncome,
      todayExpenses,
      productsSold
    };
  }

  async getFinancialSummary(userId: number): Promise<any> {
    const userTransactions = Array.from(this.transactions.values())
      .filter(t => t.userId === userId);
    
    const totalIncome = userTransactions
      .filter(t => t.type === 'income')
      .reduce((sum, t) => sum + parseFloat(t.amount), 0);
    
    const totalExpenses = userTransactions
      .filter(t => t.type === 'expense')
      .reduce((sum, t) => sum + parseFloat(t.amount), 0);

    return {
      totalIncome,
      totalExpenses
    };
  }

  async getTopProducts(userId: number): Promise<any[]> {
    const userTransactions = Array.from(this.transactions.values())
      .filter(t => t.userId === userId && t.type === 'income');
    
    const productSales = userTransactions.reduce((acc, t) => {
      const product = t.description;
      if (!acc[product]) {
        acc[product] = {
          productName: product,
          quantitySold: 0,
          totalRevenue: 0
        };
      }
      acc[product].quantitySold += 1;
      acc[product].totalRevenue += parseFloat(t.amount);
      return acc;
    }, {} as Record<string, any>);

    return Object.values(productSales)
      .sort((a: any, b: any) => b.totalRevenue - a.totalRevenue)
      .slice(0, 5);
  }

  async getHPPData(userId: number): Promise<any[]> {
    const userProductions = await this.getProductionsByUserId(userId);
    
    return userProductions.map(production => {
      const totalMaterialCost = production.materials.reduce((sum, material) => {
        return sum + (parseFloat(material.quantity) * 1000); // Assume 1000 per unit cost
      }, 0);
      
      return {
        productName: production.productName,
        totalMaterialCost,
        totalProduction: production.quantity,
        hppPerUnit: totalMaterialCost / production.quantity
      };
    });
  }

  async getBEPData(userId: number): Promise<any[]> {
    const hppData = await this.getHPPData(userId);
    
    return hppData.map(item => ({
      productName: item.productName,
      fixedCost: 100000, // Assume fixed cost
      sellingPrice: 25000, // Assume selling price
      variableCost: item.hppPerUnit,
      bepQuantity: Math.ceil(100000 / (25000 - item.hppPerUnit))
    }));
  }
}

export const storage = new MemStorage();
