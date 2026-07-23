import { db } from '../database/index.js';
import { maintenance_jobs, assets, users } from '../database/schema.js';
import { eq, desc } from 'drizzle-orm';

export const findAll = async () => {
  return await db.select({
    id: maintenance_jobs.id,
    status: maintenance_jobs.status,
    priority: maintenance_jobs.priority,
    department: maintenance_jobs.department,
    description: maintenance_jobs.description,
    remarks: maintenance_jobs.remarks,
    startDate: maintenance_jobs.startDate,
    dueDate: maintenance_jobs.dueDate,
    assetId: maintenance_jobs.assetId,
    technicianId: maintenance_jobs.technicianId,
    assetName: assets.name,
    assetQr: assets.qrCode,
    technicianName: users.fullName
  })
  .from(maintenance_jobs)
  .leftJoin(assets, eq(maintenance_jobs.assetId, assets.id))
  .leftJoin(users, eq(maintenance_jobs.technicianId, users.id))
  .orderBy(desc(maintenance_jobs.createdAt));
};

export const findById = async (id) => {
  const [job] = await db.select({
    id: maintenance_jobs.id,
    status: maintenance_jobs.status,
    priority: maintenance_jobs.priority,
    department: maintenance_jobs.department,
    description: maintenance_jobs.description,
    remarks: maintenance_jobs.remarks,
    startDate: maintenance_jobs.startDate,
    dueDate: maintenance_jobs.dueDate,
    assetId: maintenance_jobs.assetId,
    technicianId: maintenance_jobs.technicianId,
    assetName: assets.name,
    assetQr: assets.qrCode,
    technicianName: users.fullName
  })
  .from(maintenance_jobs)
  .leftJoin(assets, eq(maintenance_jobs.assetId, assets.id))
  .leftJoin(users, eq(maintenance_jobs.technicianId, users.id))
  .where(eq(maintenance_jobs.id, id));
  
  return job;
};

export const create = async (data) => {
  const jobId = 'JOB-' + Math.floor(Math.random() * 8999 + 1000);
  const payload = { id: jobId, ...data };
  const [job] = await db.insert(maintenance_jobs).values(payload).returning();
  return job;
};

export const update = async (id, data) => {
  const [job] = await db.update(maintenance_jobs).set(data).where(eq(maintenance_jobs.id, id)).returning();
  return job;
};

export const remove = async (id) => {
  await db.delete(maintenance_jobs).where(eq(maintenance_jobs.id, id));
  return true;
};
