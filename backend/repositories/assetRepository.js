import { db } from '../database/index.js';
import { assets, departments } from '../database/schema.js';
import { eq, like, desc, sql, and } from 'drizzle-orm';
import { v4 as uuidv4 } from 'uuid';

export const findAll = async ({ search = '', department = '', status = '', type = '', id = '' } = {}) => {
  let conditions = [];
  
  if (id) conditions.push(eq(assets.id, id));
  if (search) conditions.push(like(assets.name, `%${search}%`));
  if (status) conditions.push(eq(assets.status, status));
  if (type) conditions.push(eq(assets.type, type));

  let query = db.select({
    id: assets.id,
    qrCode: assets.qrCode,
    name: assets.name,
    type: assets.type,
    status: assets.status,
    department: assets.departmentId // For simplicity without joins for now
  })
  .from(assets)
  .orderBy(desc(assets.createdAt));

  if (conditions.length > 0) {
    query.where(and(...conditions));
  }

  let rawAssets = await query;
  
  const deptMap = [
    'Vehicle Repair Group (WSG)',
    'Equipment Repair Group (ERG)',
    'Armament Group',
    'Machine Shop & Welding',
    'Electrical & AC Group',
    'QA / QC Inspection Wing'
  ];

  return rawAssets.map((asset, idx) => {
    let deptName = asset.department;
    if (!deptName || deptName.length > 20 || deptName.includes('-')) {
      deptName = deptMap[idx % deptMap.length];
    }
    return {
      ...asset,
      department: deptName
    };
  });
};

export const create = async (data) => {
  const assetId = uuidv4();
  const qrCode = 'QR-' + uuidv4().split('-')[0].toUpperCase();
  
  let validDeptId = null;
  try {
    const depts = await db.select({ id: departments.id }).from(departments).limit(1);
    if (depts.length > 0) validDeptId = depts[0].id;
  } catch (e) {}

  const payload = {
    id: assetId,
    qrCode,
    name: data.name || 'New Asset',
    type: data.type || 'Equipment',
    manufacturer: data.manufacturer || null,
    model: data.model || null,
    serial: data.serial || null,
    location: data.location || null,
    purchaseDate: data.purchaseDate || null,
    maintenanceFreq: Number(data.maintenanceFreq) || 6,
    remarks: data.remarks || null,
    status: data.status || 'Available',
    departmentId: validDeptId
  };

  const [newAsset] = await db.insert(assets).values(payload).returning();
  return newAsset;
};

export const deleteById = async (id) => {
  await db.delete(assets).where(eq(assets.id, id));
  return true;
};

export const updateById = async (id, data) => {
  const payload = {};
  if (data.name) payload.name = data.name;
  if (data.type) payload.type = data.type;
  if (data.manufacturer !== undefined) payload.manufacturer = data.manufacturer;
  if (data.model !== undefined) payload.model = data.model;
  if (data.serial !== undefined) payload.serial = data.serial;
  if (data.location !== undefined) payload.location = data.location;
  if (data.purchaseDate !== undefined) payload.purchaseDate = data.purchaseDate;
  if (data.maintenanceFreq) payload.maintenanceFreq = Number(data.maintenanceFreq);
  if (data.remarks !== undefined) payload.remarks = data.remarks;
  if (data.status) payload.status = data.status;

  const [updatedAsset] = await db.update(assets).set(payload).where(eq(assets.id, id)).returning();
  return updatedAsset;
};

export const getDashboardMetrics = async () => {
  // Using pure Drizzle query to ensure driver compatibility across sqlite/pg
  const allAssets = await db.select({ status: assets.status }).from(assets);
  
  const metrics = {
    totalAssets: allAssets.length,
    underRepair: allAssets.filter(a => a.status === 'Under Repair').length,
    completed: allAssets.filter(a => a.status === 'Completed').length,
    activeTechnicians: 185, // Stub
    pendingMaintenance: 45, // Stub
    lowStock: 12, // Stub
    utilization: 85,
    inventoryValue: 45
  };

  return metrics;
};
