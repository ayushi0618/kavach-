import express from 'express';
import { requireAuth } from '../middleware/authMiddleware.js';
import * as ctrl from '../controllers/analyticsController.js';

const router = express.Router();

router.use(requireAuth);

router.get('/kpi', ctrl.getExecutiveKPIs);
router.get('/trends', ctrl.getMaintenanceTrends);
router.get('/efficiency', ctrl.getDepartmentEfficiency);

export default router;
