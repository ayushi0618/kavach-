import express from 'express';
import { requireAuth, requireRole } from '../middleware/authMiddleware.js';
import { validate } from '../middleware/validate.js';
import { createAssetSchema, updateAssetSchema } from '../validators/assetValidator.js';
import * as assetController from '../controllers/assetController.js';

const router = express.Router();
router.use(requireAuth);

router.get('/', assetController.getAll);
router.get('/:id', assetController.getById);
router.post('/', requireRole(['ADMIN']), validate(createAssetSchema), assetController.register);
router.put('/:id', requireRole(['ADMIN']), validate(updateAssetSchema), assetController.update);
router.delete('/:id', requireRole(['ADMIN']), assetController.remove);

export default router;
