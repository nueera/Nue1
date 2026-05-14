// @ts-nocheck
// Products Schema — Zoho Billing
import { z } from 'zod';

export const createProductSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  description: z.string().optional(),
  productType: z.enum(['goods','service','digital'] as const),
  sku: z.string().optional(),
});
export type CreateProductInput = z.infer<typeof createProductSchema>;
