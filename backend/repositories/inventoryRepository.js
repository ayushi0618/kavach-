import { db } from '../database/index.js';
import { inventory } from '../database/schema.js';
import { eq, desc } from 'drizzle-orm';
import { v4 as uuidv4 } from 'uuid';

export const findAll = async () => {
  return await db.select().from(inventory).orderBy(desc(inventory.createdAt));
};

export const create = async (data) => {
  const sku = 'SKU-' + uuidv4().split('-')[0].toUpperCase();
  const [newItem] = await db.insert(inventory).values({ ...data, sku }).returning();
  return newItem;
};
