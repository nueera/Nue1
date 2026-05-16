// Plans Schema — Zoho Billing
import { z } from 'zod';

export const createPlanSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  productId: z.string().min(1, 'Product is required'),
  price: z.number().positive(),
  frequency: z.enum(['monthly','quarterly','semi_annually','annually'] as const),
  trialDays: z.number().min(0).default(0),
  setupFee: z.number().min(0).default(0),
  features: z.array(z.string()).default([]),
});
export type CreatePlanInput = z.infer<typeof createPlanSchema>;
