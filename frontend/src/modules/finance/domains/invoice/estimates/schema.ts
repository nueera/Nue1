// Estimates Schema — Zoho Invoice
import { z } from 'zod';

export const createEstimateSchema = z.object({
  customerId: z.string().min(1, 'Customer is required'),
  lineItems: z.array(z.object({ item: z.string(), quantity: z.number().positive(), rate: z.number() })).min(1),
  date: z.string(),
  expiryDate: z.string(),
  notes: z.string().optional(),
});
export type CreateEstimateInput = z.infer<typeof createEstimateSchema>;
export const updateEstimateSchema = createEstimateSchema.partial();
export type UpdateEstimateInput = z.infer<typeof updateEstimateSchema>;
