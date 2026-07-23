import { db } from './index.js';
import { inventory, maintenance_jobs, procurement_orders, assets } from './schema.js';
import { v4 as uuidv4 } from 'uuid';
import logger from '../utils/logger.js';

const seedImageData = async () => {
  logger.info('Starting custom image data seed...');

  try {
    // 1. Seed Inventory (Electrician Tools & Measuring Instruments)
    const inventoryItems = [
      // Electrician Tools
      { name: 'Multimeter', category: 'Electrician Tool', quantity: 10, unitCost: 1500, reorderLevel: 5 },
      { name: 'Clamp Meter', category: 'Electrician Tool', quantity: 5, unitCost: 2000, reorderLevel: 2 },
      { name: 'Line Tester', category: 'Electrician Tool', quantity: 20, unitCost: 150, reorderLevel: 10 },
      { name: 'Nose Plyer', category: 'Electrician Tool', quantity: 15, unitCost: 250, reorderLevel: 5 },
      { name: 'Cutting Plyer', category: 'Electrician Tool', quantity: 15, unitCost: 300, reorderLevel: 5 },
      { name: 'Wire Stripper', category: 'Electrician Tool', quantity: 10, unitCost: 350, reorderLevel: 4 },
      { name: 'Crimping Tool', category: 'Electrician Tool', quantity: 5, unitCost: 1200, reorderLevel: 2 },
      { name: 'Tweezer', category: 'Electrician Tool', quantity: 20, unitCost: 100, reorderLevel: 10 },
      { name: 'Hammer', category: 'Electrician Tool', quantity: 8, unitCost: 400, reorderLevel: 3 },
      { name: 'Combination Plyer', category: 'Electrician Tool', quantity: 15, unitCost: 350, reorderLevel: 5 },
      { name: 'Soldering Iron', category: 'Electrician Tool', quantity: 10, unitCost: 800, reorderLevel: 4 },
      { name: 'Test Lamp', category: 'Electrician Tool', quantity: 10, unitCost: 250, reorderLevel: 5 },
      { name: 'Continuity Tester', category: 'Electrician Tool', quantity: 5, unitCost: 500, reorderLevel: 2 },
      { name: 'Stone (cut-off)', category: 'Electrician Tool', quantity: 30, unitCost: 50, reorderLevel: 15 },
      { name: 'Screwdriver', category: 'Electrician Tool', quantity: 50, unitCost: 100, reorderLevel: 20 },
      { name: 'Scissor', category: 'Electrician Tool', quantity: 10, unitCost: 150, reorderLevel: 5 },
      { name: 'Pincers (Zamboor)', category: 'Electrician Tool', quantity: 12, unitCost: 200, reorderLevel: 5 },
      { name: 'File Rough', category: 'Electrician Tool', quantity: 10, unitCost: 150, reorderLevel: 5 },
      { name: 'Plain File', category: 'Electrician Tool', quantity: 10, unitCost: 150, reorderLevel: 5 },
      { name: 'Half Round File', category: 'Electrician Tool', quantity: 10, unitCost: 180, reorderLevel: 5 },
      { name: 'Triangular File', category: 'Electrician Tool', quantity: 10, unitCost: 180, reorderLevel: 5 },
      { name: 'Bosch Cutting Machine', category: 'Electrician Tool', quantity: 2, unitCost: 8000, reorderLevel: 1 },
      { name: 'Tin Cutter', category: 'Electrician Tool', quantity: 5, unitCost: 300, reorderLevel: 2 },
      { name: 'Glass Cutter', category: 'Electrician Tool', quantity: 3, unitCost: 400, reorderLevel: 1 },
      { name: 'Dewalt Screw Tool', category: 'Electrician Tool', quantity: 4, unitCost: 5000, reorderLevel: 1 },

      // Measuring Instruments
      { name: 'Micrometer (Inside)', category: 'Measuring Instrument', quantity: 5, unitCost: 1500, reorderLevel: 2 },
      { name: 'Micrometer (Outside)', category: 'Measuring Instrument', quantity: 5, unitCost: 1500, reorderLevel: 2 },
      { name: 'Micrometer (Thread)', category: 'Measuring Instrument', quantity: 5, unitCost: 1800, reorderLevel: 2 },
      { name: 'Micrometer (Depth)', category: 'Measuring Instrument', quantity: 5, unitCost: 1800, reorderLevel: 2 },
      { name: 'Vernier Caliper', category: 'Measuring Instrument', quantity: 10, unitCost: 2500, reorderLevel: 3 },
      { name: 'Measuring Tape', category: 'Measuring Instrument', quantity: 25, unitCost: 200, reorderLevel: 10 },
      { name: 'Infrared Thermometer', category: 'Measuring Instrument', quantity: 4, unitCost: 3500, reorderLevel: 1 },
      { name: 'Dial Hole Gauge', category: 'Measuring Instrument', quantity: 3, unitCost: 4500, reorderLevel: 1 },

      // Workshop Machining Tools
      { name: 'Big Cutting Machine (Badi Katne Wali)', category: 'Machining Tool', quantity: 1, unitCost: 15000, reorderLevel: 0 },
      { name: 'Hexa Round (Aari)', category: 'Machining Tool', quantity: 5, unitCost: 400, reorderLevel: 2 },
      { name: 'Hand Planner (Hath Ki)', category: 'Machining Tool', quantity: 3, unitCost: 1200, reorderLevel: 1 },
      { name: 'Hammer (Small & Big)', category: 'Machining Tool', quantity: 8, unitCost: 500, reorderLevel: 2 },
      { name: 'Ply Cutter', category: 'Machining Tool', quantity: 4, unitCost: 800, reorderLevel: 1 },
    ];

    for (let item of inventoryItems) {
      const sku = 'SKU-' + uuidv4().split('-')[0].toUpperCase();
      await db.insert(inventory).values({ ...item, sku, location: 'Central Store' });
    }
    logger.info(`Seeded ${inventoryItems.length} custom inventory items.`);

    // 2. Seed Assets (Crane for Maintenance)
    const qrCode = 'QR-' + uuidv4().split('-')[0].toUpperCase();
    const [craneAsset] = await db.insert(assets).values({
      qrCode,
      name: 'HRV AV-15 Crane [15 ton]',
      type: 'Heavy Machinery',
      manufacturer: 'HRV',
      status: 'Under Repair',
      location: 'HRV Section',
    }).returning();
    logger.info('Seeded Crane Asset.');

    // 3. Seed Maintenance Job (Crane Repair)
    await db.insert(maintenance_jobs).values({
      assetId: craneAsset.id,
      description: 'CRANE Repair - After inspection central -> Received Voucher / GIN',
      status: 'In Progress',
      startDate: new Date().toISOString(),
    });
    logger.info('Seeded Maintenance Job for Crane.');

    // 4. Seed Procurement Order (GIN Workflow mapping)
    await db.insert(procurement_orders).values({
      vendorName: 'Central Logistics (GIN)',
      item: 'Spare Parts for HRV Crane Repair',
      quantity: 5,
      status: 'Received',
      totalCost: 45000,
    });
    logger.info('Seeded Procurement Order for GIN Workflow.');

    logger.info('Custom Data Seeding completed successfully!');
    process.exit(0);
  } catch (error) {
    logger.error('Error seeding data:', error);
    process.exit(1);
  }
};

seedImageData();
