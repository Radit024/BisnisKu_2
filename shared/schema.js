import { pgTable, text, serial, integer, boolean, timestamp, decimal, uuid } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  firebaseUid: text("firebase_uid").notNull().unique(),
  email: text("email").notNull(),
  displayName: text("display_name"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const transactions = pgTable("transactions", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id).notNull(),
  date: text("date").notNull(),
  type: text("type").notNull(), // "income" or "expense"
  description: text("description").notNull(),
  amount: decimal("amount", { precision: 15, scale: 2 }).notNull(),
  paymentMethod: text("payment_method").notNull(),
  notes: text("notes"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const productions = pgTable("productions", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id).notNull(),
  date: text("date").notNull(),
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
  userId: integer("user_id").references(() => users.id).notNull(),
  itemName: text("item_name").notNull(),
  type: text("type").notNull(), // "raw_material" or "finished_product"
  currentStock: decimal("current_stock", { precision: 10, scale: 2 }).notNull().default("0"),
  unit: text("unit").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const stockMovements = pgTable("stock_movements", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id).notNull(),
  stockItemId: integer("stock_item_id").references(() => stockItems.id).notNull(),
  date: text("date").notNull(),
  type: text("type").notNull(), // "in" or "out"
  quantity: decimal("quantity", { precision: 10, scale: 2 }).notNull(),
  reason: text("reason").notNull(),
  notes: text("notes"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertUserSchema = createInsertSchema(users).omit({
  id: true,
  createdAt: true,
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