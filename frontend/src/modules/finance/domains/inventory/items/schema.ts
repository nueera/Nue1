// Items Schema — Zoho Inventory
import { z } from 'zod';

export const createItemSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  sku: z.string().optional(),
  type: z.enum(['inventory','non_inventory','service','digital'] as const),
  category: z.string().optional(),
  unit: z.string().default('ea'),
  sellingPrice: z.number().positive(),
  costPrice: z.number().min(0),
  reorderLevel: z.number().min(0).default(0),
});
export type CreateItemInput = z.infer<typeof createItemSchema>;
