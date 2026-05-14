// @ts-nocheck
// Orders Schema — Zoho Commerce
import { z } from 'zod';

export const updateOrderSchema = z.object({
  status: z.enum(['pending','confirmed','processing','shipped','delivered','cancelled'] as const).optional(),
  trackingNumber: z.string().optional(),
  carrier: z.string().optional(),
  notes: z.string().optional(),
});
export type UpdateOrderInput = z.infer<typeof updateOrderSchema>;
