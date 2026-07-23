import express from 'express';
import { requireAuth } from '../middleware/authMiddleware.js';
import * as dashboardController from '../controllers/dashboardController.js';

const router = express.Router();
router.use(requireAuth);

router.get('/metrics', dashboardController.getMetrics);

export default router;
