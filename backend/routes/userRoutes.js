import express from 'express';
import { requireAuth, requireRole } from '../middleware/authMiddleware.js';
import { validate } from '../middleware/validate.js';
import { createUserSchema, updateUserSchema } from '../validators/userValidator.js';
import * as userController from '../controllers/userController.js';

const router = express.Router();
router.use(requireAuth);
router.use(requireRole(['ADMIN']));

router.get('/', userController.getUsers);
router.get('/:id', userController.getUserById);
router.post('/', validate(createUserSchema), userController.createUser);
router.put('/:id', validate(updateUserSchema), userController.updateUser);
router.delete('/:id', userController.deleteUser);
export default router;
