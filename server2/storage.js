export class MemStorage {
    transactions = new Map();
    productions = new Map();
    productionMaterials = new Map();
    stockItems = new Map();
    stockMovements = new Map();
    currentUserId = 1;
    currentTransactionId = 1;
    currentProductionId = 1;
    currentMaterialId = 1;
    currentStockItemId = 1;
    currentStockMovementId = 1;

    constructor() {
        // Initialize with sample data if needed
    }

  async getTransactionsByUserId(userId) {
    return Array.from(this.transactions.values())
      .filter(transaction => transaction.userId === userId)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }

  async getRecentTransactions(userId, limit = 10) {
    const transactions = await this.getTransactionsByUserId(userId);
    return transactions.slice(0, limit);
  }

  async createTransaction(insertTransaction) {
    const id = this.currentTransactionId++;
    const transaction = {
      ...insertTransaction,
      id,
      notes: insertTransaction.notes || null,
      createdAt: new Date()
    };
    this.transactions.set(id, transaction);
    return transaction;
  }

  async getProductionsByUserId(userId) {
    const userProductions = Array.from(this.productions.values())
      .filter(production => production.userId === userId)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    return userProductions.map(production => ({
      ...production,
      materials: Array.from(this.productionMaterials.values())
        .filter(material => material.productionId === production.id)
    }));
  }

  async createProduction(insertProduction, materials) {
    const id = this.currentProductionId++;
    const production = {
      ...insertProduction,
      id,
      notes: insertProduction.notes || null,
      createdAt: new Date()
    };
    this.productions.set(id, production);

    // Create materials
    for (const material of materials) {
      const materialId = this.currentMaterialId++;
      const productionMaterial = {
        ...material,
        id: materialId,
        productionId: id
      };
      this.productionMaterials.set(materialId, productionMaterial);
    }

    return production;
  }

  async getStockItemsByUserId(userId) {
    return Array.from(this.stockItems.values())
      .filter(item => item.userId === userId)
      .sort((a, b) => a.itemName.localeCompare(b.itemName));
  }

  async getOrCreateStockItem(userId, itemName, type, unit) {
    const existing = Array.from(this.stockItems.values())
      .find(item => item.userId === userId && item.itemName === itemName && item.type === type);
    
    if (existing) {
      return existing;
    }

    const id = this.currentStockItemId++;
    const stockItem = {
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

  async updateStockQuantity(stockItemId, quantity, type) {
    const item = this.stockItems.get(stockItemId);
    if (!item) return;

    const currentStock = parseFloat(item.currentStock);
    const newStock = type === 'in' ? currentStock + quantity : currentStock - quantity;
    
    item.currentStock = Math.max(0, newStock).toString();
    this.stockItems.set(stockItemId, item);
  }

  async createStockMovement(insertMovement) {
    const id = this.currentStockMovementId++;
    const movement = {
      ...insertMovement,
      id,
      notes: insertMovement.notes || null,
      createdAt: new Date()
    };
    this.stockMovements.set(id, movement);
    return movement;
  }

  async getLowStockItems(userId) {
    return Array.from(this.stockItems.values())
      .filter(item => item.userId === userId && parseFloat(item.currentStock) < 10)
      .sort((a, b) => parseFloat(a.currentStock) - parseFloat(b.currentStock));
  }

  async getDashboardSummary(userId) {
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

  async getFinancialSummary(userId) {
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

  async getTopProducts(userId) {
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
    }, {});

    return Object.values(productSales)
      .sort((a, b) => b.totalRevenue - a.totalRevenue)
      .slice(0, 5);
  }

  async getHPPData(userId) {
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

  async getBEPData(userId) {
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