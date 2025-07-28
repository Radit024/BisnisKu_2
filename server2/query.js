import { db } from './db.js';
import { transactions, productions, productionMaterials } from './schema.js';
import { asc, between, count, eq, getTableColumns, sql, desc } from 'drizzle-orm';

export async function createTransactions(data) {
  return await db.insert(transactions).values(data);
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

export async function createProductions(data) {
    return await db.insert(productions).values(data);
}

export async function getProductions(id) {
    let query = db.select().from(productions).where(eq(productions.userUid, id));
}