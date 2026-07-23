import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';
import { sql } from 'drizzle-orm';
import { v4 as uuidv4 } from 'uuid';

export const roles = sqliteTable('roles', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  name: text('name').notNull().unique(), // ADMIN, TECHNICIAN
});

export const departments = sqliteTable('departments', {
  id: text('id').primaryKey().$defaultFn(() => uuidv4()),
  name: text('name').notNull().unique(),
  description: text('description'),
  isActive: integer('is_active', { mode: 'boolean' }).default(true),
  createdAt: text('created_at').default(sql`CURRENT_TIMESTAMP`)
});

export const users = sqliteTable('users', {
  id: text('id').primaryKey().$defaultFn(() => uuidv4()),
  email: text('email').notNull().unique(),
  passwordHash: text('password_hash').notNull(),
  fullName: text('full_name').notNull(),
  roleId: integer('role_id').references(() => roles.id).notNull(),
  departmentId: text('department_id').references(() => departments.id),
  specialization: text('specialization'),
  isActive: integer('is_active', { mode: 'boolean' }).default(true),
  createdAt: text('created_at').default(sql`CURRENT_TIMESTAMP`)
});

export const assets = sqliteTable('assets', {
  id: text('id').primaryKey().$defaultFn(() => uuidv4()),
  qrCode: text('qr_code').notNull().unique(),
  name: text('name').notNull(),
  type: text('type').notNull(),
  manufacturer: text('manufacturer'),
  model: text('model'),
  serial: text('serial'),
  location: text('location'),
  purchaseDate: text('purchase_date'),
  maintenanceFreq: integer('maintenance_freq'),
  remarks: text('remarks'),
  departmentId: text('department_id').references(() => departments.id),
  status: text('status').notNull().default('Available'), // Available, Under Repair, Testing, Completed, Out of Service
  lastMaintenance: text('last_maintenance'),
  createdAt: text('created_at').default(sql`CURRENT_TIMESTAMP`)
});

export const inventory = sqliteTable('inventory', {
  id: text('id').primaryKey().$defaultFn(() => uuidv4()),
  sku: text('sku').notNull().unique(),
  name: text('name').notNull(),
  category: text('category').notNull(),
  quantity: integer('quantity').notNull().default(0),
  reorderLevel: integer('reorder_level').notNull().default(5),
  location: text('location'),
  unitCost: integer('unit_cost').default(0),
  createdAt: text('created_at').default(sql`CURRENT_TIMESTAMP`)
});

export const maintenance_jobs = sqliteTable('maintenance_jobs', {
  id: text('id').primaryKey().$defaultFn(() => uuidv4()),
  assetId: text('asset_id').references(() => assets.id),
  technicianId: text('technician_id').references(() => users.id),
  status: text('status').notNull().default('Pending'), // Pending, In Progress, QA, Completed
  priority: text('priority').default('Normal'),
  department: text('department'),
  description: text('description').notNull(),
  remarks: text('remarks'),
  startDate: text('start_date'),
  dueDate: text('due_date'),
  endDate: text('end_date'),
  createdAt: text('created_at').default(sql`CURRENT_TIMESTAMP`)
});

export const procurement_orders = sqliteTable('procurement_orders', {
  id: text('id').primaryKey().$defaultFn(() => uuidv4()),
  vendorName: text('vendor_name').notNull(), // Legacy, can map to vendors table later
  vendorId: text('vendor_id'),
  item: text('item').notNull(),
  quantity: integer('quantity').notNull(),
  status: text('status').notNull().default('Requested'), // Requested, Approved, Ordered, Received
  totalCost: integer('total_cost').notNull(),
  createdAt: text('created_at').default(sql`CURRENT_TIMESTAMP`)
});

export const vehicles = sqliteTable('vehicles', {
  id: text('id').primaryKey().$defaultFn(() => uuidv4()),
  registrationNumber: text('registration_number').notNull().unique(),
  make: text('make').notNull(),
  model: text('model').notNull(),
  year: integer('year'),
  chassisNumber: text('chassis_number'),
  engineNumber: text('engine_number'),
  departmentId: text('department_id').references(() => departments.id),
  assignedTechnicianId: text('assigned_technician_id').references(() => users.id),
  status: text('status').notNull().default('Active'), // Active, Under Repair, Out of Service
  currentWorkshopId: text('current_workshop_id'),
  totalRepairCost: integer('total_repair_cost').default(0),
  createdAt: text('created_at').default(sql`CURRENT_TIMESTAMP`)
});

export const vendors = sqliteTable('vendors', {
  id: text('id').primaryKey().$defaultFn(() => uuidv4()),
  name: text('name').notNull(),
  contactPerson: text('contact_person'),
  email: text('email'),
  phone: text('phone'),
  address: text('address'),
  rating: integer('rating').default(5),
  status: text('status').notNull().default('Active'),
  createdAt: text('created_at').default(sql`CURRENT_TIMESTAMP`)
});
