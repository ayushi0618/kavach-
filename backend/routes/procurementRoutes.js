import express from 'express';
import { requireAuth } from '../middleware/authMiddleware.js';
import * as ctrl from '../controllers/procurementController.js';

const router = express.Router();
router.use(requireAuth);

// Procurement Orders
router.get('/', ctrl.getAll);
router.post('/', ctrl.add);

// Vendors
router.get('/vendors', ctrl.getAllVendors);
router.post('/vendors', ctrl.addVendor);

// Evaluations
router.post('/evaluations', ctrl.submitEvaluation);

export default router;
