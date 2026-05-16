import { z } from 'zod';

export const createEstimateSchema = z.object({
  customerId: z.string().min(1, 'Customer is required'),
  date: z.string().min(1, 'Date is required'),
  expiryDate: z.string().min(1, 'Expiry date is required'),
  subject: z.string().optional(),
  notes: z.string().max(5000).optional(),
  terms: z.string().optional(),
  lineItems: z.array(z.object({
    item: z.string().min(1),
    description: z.string().optional(),
    quantity: z.number().min(0),
    rate: z.number().min(0),
  })).min(1, 'At least one line item is required'),
});

export const updateEstimateSchema = createEstimateSchema.partial();

export type CreateEstimateInput = z.infer<typeof createEstimateSchema>;
export type UpdateEstimateInput = z.infer<typeof updateEstimateSchema>;
