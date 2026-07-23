import express from 'express';
import { requireAuth, requireRole } from '../middleware/authMiddleware.js';
import { validate } from '../middleware/validate.js';
import { createDepartmentSchema, updateDepartmentSchema } from '../validators/departmentValidator.js';
import * as deptController from '../controllers/departmentController.js';

const router = express.Router();
router.use(requireAuth);

router.get('/', deptController.getDepartments);
router.get('/:id', deptController.getDepartmentById);
router.post('/', requireRole(['ADMIN']), validate(createDepartmentSchema), deptController.createDepartment);
router.put('/:id', requireRole(['ADMIN']), validate(updateDepartmentSchema), deptController.updateDepartment);
router.delete('/:id', requireRole(['ADMIN']), deptController.deleteDepartment);
export default router;
