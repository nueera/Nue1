import { z } from 'zod';

export const createItemSchema = z.object({
  name: z.string().min(1, 'Item name is required'),
  sku: z.string().min(1, 'SKU is required'),
  description: z.string().optional(),
  type: z.enum(['inventory', 'service', 'non-inventory', 'bundle'] as const).default('service'),
  status: z.enum(['active', 'inactive', 'archived'] as const).default('active'),
  category: z.string().optional(),
  unit: z.string().default('ea'),
  rate: z.number().min(0, 'Rate must be positive'),
  cost: z.number().min(0).optional(),
  trackInventory: z.boolean().default(false),
  stockOnHand: z.number().int().min(0).optional(),
  reorderPoint: z.number().int().min(0).optional(),
  preferredVendor: z.string().optional(),
  tags: z.array(z.string()).default([]),
});

export const updateItemSchema = createItemSchema.partial();

export type CreateItemInput = z.infer<typeof createItemSchema>;
export type UpdateItemInput = z.infer<typeof updateItemSchema>;
