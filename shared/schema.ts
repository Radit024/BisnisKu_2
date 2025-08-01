import { pgTable, text, serial, integer, boolean, timestamp, decimal, uuid, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const transactions = pgTable("transactions", {
  id: serial("id").primaryKey(),
  userUid: varchar("user_id", 255).notNull(),
  date: timestamp("date").notNull(),
  type: text("type").notNull(), // "income" or "expense"
  description: text("description").notNull(),
  amount: integer("amount").notNull(),
  paymentMethod: text("payment_method").notNull(),
  notes: text("notes"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const productions = pgTable("productions", {
  id: serial("id").primaryKey(),
  userUid: varchar("user_id", 255).notNull(),
  date: timestamp("date").notNull(),
  productName: text("product_name").notNull(),
  quantity: integer("quantity").notNull(),
  notes: text("notes"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const productionMaterials = pgTable("production_materials", {
  id: serial("id").primaryKey(),
  productionId: integer("production_id").references(() => productions.id).notNull(),
  materialName: text("material_name").notNull(),
  quantity: decimal("quantity", { precision: 10, scale: 2 }).notNull(),
  unit: text("unit").notNull(),
});

export const stockItems = pgTable("stock_items", {
  id: serial("id").primaryKey(),
  userUid: varchar("user_id", 255).notNull(),
  itemName: text("item_name").notNull(),
  type: text("type").notNull(), // "raw_material" or "finished_product"
  currentStock: decimal("current_stock", { precision: 10, scale: 2 }).notNull().default("0"),
  unit: text("unit").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const stockMovements = pgTable("stock_movements", {
  id: serial("id").primaryKey(),
  userUid: varchar("user_id", 255).notNull(),
  stockItemId: integer("stock_item_id").references(() => stockItems.id).notNull(),
  date: timestamp("date").notNull(),
  type: text("type").notNull(), // "in" or "out"
  quantity: decimal("quantity", { precision: 10, scale: 2 }).notNull(),
  reason: text("reason").notNull(),
  notes: text("notes"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertTransactionSchema = createInsertSchema(transactions).omit({
  id: true,
  createdAt: true,
});

export const insertProductionSchema = createInsertSchema(productions).omit({
  id: true,
  createdAt: true,
});

export const insertProductionMaterialSchema = createInsertSchema(productionMaterials).omit({
  id: true,
});

export const insertStockItemSchema = createInsertSchema(stockItems).omit({
  id: true,
  createdAt: true,
});

export const insertStockMovementSchema = createInsertSchema(stockMovements).omit({
  id: true,
  createdAt: true,
});

export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;
export type Transaction = typeof transactions.$inferSelect;
export type InsertTransaction = z.infer<typeof insertTransactionSchema>;
export type Production = typeof productions.$inferSelect;
export type InsertProduction = z.infer<typeof insertProductionSchema>;
export type ProductionMaterial = typeof productionMaterials.$inferSelect;
export type InsertProductionMaterial = z.infer<typeof insertProductionMaterialSchema>;
export type StockItem = typeof stockItems.$inferSelect;
export type InsertStockItem = z.infer<typeof insertStockItemSchema>;
export type StockMovement = typeof stockMovements.$inferSelect;
export type InsertStockMovement = z.infer<typeof insertStockMovementSchema>;
