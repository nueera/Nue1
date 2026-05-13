// Products Schema — Zoho Commerce
import { z } from 'zod';

export const createCommerceProductSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  description: z.string().optional(),
  price: z.number().positive(),
  category: z.string().optional(),
  sku: z.string().optional(),
  visibility: z.enum(['visible','hidden','featured'] as const).default('visible'),
});
export type CreateCommerceProductInput = z.infer<typeof createCommerceProductSchema>;
