import { db } from './db.js';
import { transactions, productions, productionMaterials, stockItems, stockMovements } from './schema.js';
import { asc, between, count, eq, getTableColumns, sql, desc, and, sum } from 'drizzle-orm';

export async function createTransactions(data) {
  return await db.insert(transactions).values(data).returning();
}

export async function getTransactions(id, otherParam = {}) {
  let query = db.select().from(transactions).where(eq(transactions.userUid, id));
  
  // Jika latest: true, ambil 5 terbaru berdasarkan tanggal/ID
  if (otherParam.latest === true) {
    query = query
      .orderBy(desc(transactions.createdAt)) // atau desc(transactions.id) jika pakai auto-increment
      .limit(5);
  }
  
  return query;
}

export async function createProductions(insertProduction, materials) {
  // Insert the main production record
  const [production] = await db.insert(productions).values({
    ...insertProduction,
    notes: insertProduction.notes || null,
    createdAt: new Date()
  }).returning();

  // Insert production materials if any exist
  if (materials && materials.length > 0) {
    const materialData = materials.map(material => ({
      ...material,
      productionId: production.id
    }));
    
    await db.insert(productionMaterials).values(materialData).returning();
  }

  return production;
}

export async function getProductions(id) {
    let query = db.select().from(productions).where(eq(productions.userUid, id));
    
    return query;
}

export async function createStockMovement(insertMovement) {
  const [movement] = await db
    .insert(stockMovements)
    .values({
      ...insertMovement,
      notes: insertMovement.notes || null,
      createdAt: new Date()
    })
    .returning();

  return movement;
}

export async function createStockItem(userUid, itemName, type, unit) {
  // First, try to find existing stock item
  const [existing] = await db
    .select()
    .from(stockItems)
    .where(
      and(
        eq(stockItems.userUid, userUid),
        eq(stockItems.itemName, itemName),
        eq(stockItems.type, type)
      )
    )
    .limit(1);

  if (existing) {
    return existing;
  }

  // If not found, create new stock item
  const [newStockItem] = await db
    .insert(stockItems)
    .values({
      userUid,
      itemName,
      type,
      currentStock: "0",
      unit,
      createdAt: new Date()
    })
    .returning();

  return newStockItem;
}

export async function getStockItems(id) {
    return db.select().from(stockItems).where(eq(stockItems.userUid, id));
}

export async function getLowStockItems(userId) {
  const lowStockItems = await db
    .select()
    .from(stockItems)
    .where(
      and(
        eq(stockItems.userUid, userId),
        lt(sql`CAST(${stockItems.currentStock} AS DECIMAL)`, 10)
      )
    )
    .orderBy(sql`CAST(${stockItems.currentStock} AS DECIMAL) ASC`);

  return lowStockItems;
}

export async function getFinancialSummary(userId) {
  const [result] = await db
    .select({
      totalIncome: sum(
        sql`CASE WHEN ${transactions.type} = 'income' THEN ${transactions.amount}::decimal ELSE 0 END`
      ),
      totalExpenses: sum(
        sql`CASE WHEN ${transactions.type} = 'expense' THEN ${transactions.amount}::decimal ELSE 0 END`
      )
    })
    .from(transactions)
    .where(eq(transactions.userUid, userId));

  return {
    totalIncome: parseFloat(result?.totalIncome || '0'),
    totalExpenses: parseFloat(result?.totalExpenses || '0')
  };
}

export async function getHPPData(userId) {
  try {
    const hppData = await db
      .select({
        productName: productions.productName,
        totalProduction: sql`CAST(${productions.quantity} AS DECIMAL)`,
        productionCost: sql`COALESCE(SUM(CAST(${productionMaterials.quantity} AS DECIMAL) * 1000), 0)`,
      })
      .from(productions)
      .leftJoin(productionMaterials, eq(productions.id, productionMaterials.productionId))
      .where(eq(productions.userUid, userId))
      .groupBy(productions.id, productions.productName, productions.quantity);

    return hppData.map(item => {
      const totalProduction = parseFloat(item.totalProduction) || 1;
      const productionCost = parseFloat(item.productionCost) || 0;
      const hppPerUnit = productionCost / totalProduction;
      
      return {
        productName: item.productName || 'Unknown Product',
        productionCost: productionCost,
        hppPerUnit: hppPerUnit,
        hpp: hppPerUnit, // For margin calculation
        totalProduction: totalProduction
      };
    });
    
  } catch (error) {
    console.error('Error in getHPPData:', error);
    return [];
  }
}

export async function getBEPData(userId) {
  const hppData = await getHPPData(userId);
  
  return hppData.map(item => ({
    productName: item.productName,
    fixedCost: 100000, // Assume fixed cost
    sellingPrice: 25000, // Assume selling price
    variableCost: item.hppPerUnit,
    bepQuantity: Math.ceil(100000 / (25000 - item.hppPerUnit))
  }));
}

export async function getTopProducts(userId) {
  try {
    const topProducts = await db
      .select({
        productName: transactions.description,
        quantitySold: sql`COUNT(*)`,
        totalRevenue: sql`SUM(CAST(${transactions.amount} AS DECIMAL))`
      })
      .from(transactions)
      .where(
        and(
          eq(transactions.userUid, userId),
          eq(transactions.type, 'income')
        )
      )
      .groupBy(transactions.description)
      .orderBy(desc(sql`SUM(CAST(${transactions.amount} AS DECIMAL))`))
      .limit(5);

    return topProducts.map(item => ({
      productName: item.productName || 'Unknown Product',
      quantitySold: parseInt(item.quantitySold) || 0,
      totalRevenue: parseFloat(item.totalRevenue) || 0
    }));

  } catch (error) {
    console.error('Error in getTopProducts:', error);
    return [];
  }
}