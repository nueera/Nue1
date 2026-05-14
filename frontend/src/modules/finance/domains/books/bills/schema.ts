// @ts-nocheck
import { z } from 'zod';

export const createBillSchema = z.object({
  vendorId: z.string().min(1, 'Vendor is required'),
  date: z.string().min(1, 'Date is required'),
  dueDate: z.string().min(1, 'Due date is required'),
  notes: z.string().max(5000).optional(),
  terms: z.string().optional(),
  lineItems: z.array(z.object({ item: z.string().min(1), description: z.string().optional(), quantity: z.number().min(0), rate: z.number().min(0) })).min(1),
});

export const updateBillSchema = createBillSchema.partial();
export type CreateBillInput = z.infer<typeof createBillSchema>;
export type UpdateBillInput = z.infer<typeof updateBillSchema>;
