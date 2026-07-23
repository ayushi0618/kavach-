import express from 'express';
import { requireAuth } from '../middleware/authMiddleware.js';
import * as ctrl from '../controllers/inventoryController.js';
const router = express.Router();
router.use(requireAuth);
router.get('/', ctrl.getAll);
router.post('/', ctrl.add);
export default router;
