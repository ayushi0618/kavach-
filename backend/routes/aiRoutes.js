import express from 'express';
import { requireAuth, requireRole } from '../middleware/authMiddleware.js';
import { validate } from '../middleware/validate.js';
import { chatSchema, predictSchema, failureSchema, partsSchema } from '../validators/aiValidator.js';
import * as aiController from '../controllers/aiController.js';

const router = express.Router();
router.use(requireAuth); // All AI endpoints require auth

router.post('/chat', validate(chatSchema), aiController.chat);
router.post('/predict', requireRole(['ADMIN', 'MANAGER', 'TECHNICIAN']), validate(predictSchema), aiController.predictMaintenance);
router.post('/analyze-failure', validate(failureSchema), aiController.analyzeFailure);
router.post('/recommend-parts', validate(partsSchema), aiController.recommendParts);
router.post('/nl-search', validate(chatSchema), aiController.nlSearch);

export default router;
