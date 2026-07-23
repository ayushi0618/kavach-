import { db } from '../database/index.js';
import { users } from '../database/schema.js';
import { eq } from 'drizzle-orm';

export const findUserByEmail = async (email) => {
  const result = await db.select().from(users).where(eq(users.email, email));
  return result[0];
};
export const findUserById = async (id) => {
  const result = await db.select().from(users).where(eq(users.id, id));
  return result[0];
};
export const findAllUsers = async () => {
  return await db.select({
    id: users.id, email: users.email, fullName: users.fullName, roleId: users.roleId, departmentId: users.departmentId, specialization: users.specialization, isActive: users.isActive
  }).from(users);
};
export const createUser = async (data) => {
  const result = await db.insert(users).values(data).returning();
  return result[0];
};
export const updateUser = async (id, data) => {
  const result = await db.update(users).set(data).where(eq(users.id, id)).returning();
  return result[0];
};
export const deleteUser = async (id) => {
  const result = await db.delete(users).where(eq(users.id, id)).returning();
  return result[0];
};
