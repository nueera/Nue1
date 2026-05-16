import { z } from 'zod';

export const createPurchaseOrderSchema = z.object({
  vendorId: z.string().min(1, 'Vendor is required'),
  date: z.string().min(1, 'Date is required'),
  deliveryDate: z.string().optional(),
  notes: z.string().max(5000).optional(),
  terms: z.string().optional(),
  lineItems: z.array(z.object({ item: z.string().min(1), description: z.string().optional(), quantity: z.number().min(0), rate: z.number().min(0) })).min(1),
});

export const updatePurchaseOrderSchema = createPurchaseOrderSchema.partial();
export type CreatePurchaseOrderInput = z.infer<typeof createPurchaseOrderSchema>;
export type UpdatePurchaseOrderInput = z.infer<typeof updatePurchaseOrderSchema>;
