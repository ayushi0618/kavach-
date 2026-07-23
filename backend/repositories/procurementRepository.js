import { db } from '../database/index.js';
import { procurement_orders, vendors } from '../database/schema.js';
import { desc } from 'drizzle-orm';

export const findAll = async () => {
  return await db.select().from(procurement_orders).orderBy(desc(procurement_orders.createdAt));
};

export const create = async (data) => {
  const [order] = await db.insert(procurement_orders).values(data).returning();
  return order;
};

export const findAllVendors = async () => {
  return await db.select().from(vendors).orderBy(desc(vendors.createdAt));
};

export const createVendor = async (data) => {
  const [vendor] = await db.insert(vendors).values(data).returning();
  return vendor;
};
