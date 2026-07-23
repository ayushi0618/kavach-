import express from 'express';
import { requireAuth } from '../middleware/authMiddleware.js';
import { db } from '../database/index.js';
import { vehicles, users } from '../database/schema.js';
import { eq, desc } from 'drizzle-orm';

const router = express.Router();
router.use(requireAuth);

router.get('/', async (req, res, next) => {
  try {
    const data = await db.select().from(vehicles).orderBy(desc(vehicles.createdAt));
    res.json({ vehicles: data });
  } catch (error) {
    next(error);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const data = await db.select().from(vehicles).where(eq(vehicles.id, req.params.id));
    if (data.length === 0) return res.status(404).json({ message: 'Vehicle not found' });
    res.json({ vehicle: data[0] });
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const [vehicle] = await db.insert(vehicles).values(req.body).returning();
    res.status(201).json({ vehicle });
  } catch (error) {
    next(error);
  }
});

export default router;
