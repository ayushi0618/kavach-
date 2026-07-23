import { z } from 'zod';
export const createUserSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  fullName: z.string().min(2),
  roleId: z.number().int(),
  departmentId: z.string().uuid().optional(),
  specialization: z.string().optional(),
  isActive: z.boolean().optional()
});
export const updateUserSchema = z.object({
  email: z.string().email().optional(),
  fullName: z.string().min(2).optional(),
  roleId: z.number().int().optional(),
  departmentId: z.string().uuid().optional(),
  specialization: z.string().optional(),
  isActive: z.boolean().optional()
});
