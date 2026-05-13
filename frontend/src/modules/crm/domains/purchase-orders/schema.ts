import { z } from "zod";

export const createPurchaseOrderSchema = z.object({
  name: z.string().min(1, "Name is required"),
});
export const updatePurchaseOrderSchema = createPurchaseOrderSchema.partial();
export const purchaseordersMassUpdateSchema = z.object({ recordIds: z.array(z.string()).min(1), updates: z.record(z.unknown()) });
export type CreatePurchaseOrderInput = z.infer<typeof createPurchaseOrderSchema>;
export type UpdatePurchaseOrderInput = z.infer<typeof updatePurchaseOrderSchema>;
export type PurchaseOrderMassUpdateInput = z.infer<typeof purchaseordersMassUpdateSchema>;