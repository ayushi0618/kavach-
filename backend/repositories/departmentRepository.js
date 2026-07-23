import { db } from '../database/index.js';
import { departments } from '../database/schema.js';
import { eq } from 'drizzle-orm';

export const findAllDepartments = async () => await db.select().from(departments);
export const findDepartmentById = async (id) => {
  const result = await db.select().from(departments).where(eq(departments.id, id));
  return result[0];
};
export const createDepartment = async (data) => {
  const result = await db.insert(departments).values(data).returning();
  return result[0];
};
export const updateDepartment = async (id, data) => {
  const result = await db.update(departments).set(data).where(eq(departments.id, id)).returning();
  return result[0];
};
export const deleteDepartment = async (id) => {
  const result = await db.delete(departments).where(eq(departments.id, id)).returning();
  return result[0];
};
