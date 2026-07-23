import { z } from 'zod';
export const createDepartmentSchema = z.object({
  name: z.string().min(2, 'Department name required'),
  description: z.string().optional(),
  isActive: z.boolean().optional()
});
export const updateDepartmentSchema = createDepartmentSchema.partial();
