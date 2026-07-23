const fs = require('fs');
const path = require('path');

const dirs = [
  'src/db',
  'src/routes',
  'src/controllers'
];

dirs.forEach(dir => {
  const fullPath = path.join(process.cwd(), dir);
  if (!fs.existsSync(fullPath)) fs.mkdirSync(fullPath, { recursive: true });
});

const files = {
  'package.json': `{
  "name": "backend",
  "version": "1.0.0",
  "main": "src/server.js",
  "type": "module",
  "scripts": {
    "start": "node src/server.js",
    "dev": "node --watch src/server.js",
    "db:push": "drizzle-kit push",
    "db:studio": "drizzle-kit studio"
  },
  "dependencies": {
    "better-sqlite3": "^11.0.0",
    "cors": "^2.8.5",
    "dotenv": "^16.4.5",
    "drizzle-orm": "^0.31.2",
    "express": "^4.19.2"
  },
  "devDependencies": {
    "drizzle-kit": "^0.22.8"
  }
}`,
  'drizzle.config.js': `import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  schema: './src/db/schema.js',
  out: './drizzle',
  dialect: 'sqlite',
  dbCredentials: {
    url: 'sqlite.db',
  },
});`,
  'src/db/schema.js': `import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';

export const assets = sqliteTable('assets', {
  id: text('id').primaryKey(), // e.g. TATRA-ERG-102
  name: text('name').notNull(),
  type: text('type').notNull(),
  department: text('department').notNull(),
  location: text('location').notNull(),
  status: text('status').notNull(),
  qrCode: text('qrCode').notNull(),
  lastMaintained: text('lastMaintained'),
  nextMaintenance: text('nextMaintenance')
});

export const inventory = sqliteTable('inventory', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  category: text('category').notNull(),
  dept: text('dept').notNull(),
  location: text('location').notNull(),
  available: integer('available').notNull().default(0),
  min: integer('min').notNull().default(5),
  max: integer('max').notNull().default(100),
  supplier: text('supplier'),
  status: text('status').notNull().default('Optimal')
});

export const maintenanceJobs = sqliteTable('maintenance_jobs', {
  id: text('id').primaryKey(),
  assetId: text('assetId').notNull().references(() => assets.id),
  priority: text('priority').notNull(),
  status: text('status').notNull(),
  dept: text('dept').notNull(),
  tech: text('tech'),
  created: text('created').notNull(),
  due: text('due').notNull(),
  issueDesc: text('issueDesc')
});

export const stockMovements = sqliteTable('stock_movements', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  inventoryId: text('inventoryId').notNull().references(() => inventory.id),
  action: text('action').notNull(), // Issued, Received, Returned
  qty: integer('qty').notNull(),
  date: text('date').notNull(),
  time: text('time').notNull(),
  user: text('user').notNull(),
  tech: text('tech'),
  reason: text('reason')
});
`,
  'src/db/index.js': `import Database from 'better-sqlite3';
import { drizzle } from 'drizzle-orm/better-sqlite3';
import * as schema from './schema.js';

const sqlite = new Database('sqlite.db');
export const db = drizzle(sqlite, { schema });
`,
  'src/routes/assets.js': `import express from 'express';
import { db } from '../db/index.js';
import { assets } from '../db/schema.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const allAssets = await db.select().from(assets);
    res.json(allAssets);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
`,
  'src/routes/inventory.js': `import express from 'express';
import { db } from '../db/index.js';
import { inventory } from '../db/schema.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const allItems = await db.select().from(inventory);
    res.json(allItems);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
`,
  'src/routes/maintenance.js': `import express from 'express';
import { db } from '../db/index.js';
import { maintenanceJobs } from '../db/schema.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const jobs = await db.select().from(maintenanceJobs);
    res.json(jobs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
`,
  'src/server.js': `import express from 'express';
import cors from 'cors';
import assetsRouter from './routes/assets.js';
import inventoryRouter from './routes/inventory.js';
import maintenanceRouter from './routes/maintenance.js';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use('/api/assets', assetsRouter);
app.use('/api/inventory', inventoryRouter);
app.use('/api/maintenance', maintenanceRouter);

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Smart Workshop API is running.' });
});

app.listen(PORT, () => {
  console.log(\`Backend server running on http://localhost:\${PORT}\`);
});
`
};

for (const [filepath, content] of Object.entries(files)) {
  const fullPath = path.join(process.cwd(), filepath);
  fs.writeFileSync(fullPath, content);
}

console.log('Backend boilerplate generated successfully.');
