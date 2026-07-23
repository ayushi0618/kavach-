import { z } from 'zod';
export const createAssetSchema = z.object({
  name: z.string().min(2),
  type: z.string().min(2),
  manufacturer: z.string().optional(),
  model: z.string().optional(),
  serial: z.string().optional(),
  department: z.string().optional(), // frontend sends 'department' not 'departmentId' right now
  location: z.string().optional(),
  purchaseDate: z.string().optional(),
  maintenanceFreq: z.number().optional(),
  remarks: z.string().optional(),
  status: z.enum(['Available', 'Under Repair', 'Testing', 'Completed', 'Out of Service']).optional()
});
export const updateAssetSchema = createAssetSchema.partial();
