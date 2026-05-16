// PayRuns Schema — Zoho Payroll
import { z } from 'zod';

export const createPayRunSchema = z.object({
  name: z.string().min(1, 'Name required'),
  payDate: z.string(),
  period: z.string(),
  employeeIds: z.array(z.string()).optional(),
});
export type CreatePayRunInput = z.infer<typeof createPayRunSchema>;
