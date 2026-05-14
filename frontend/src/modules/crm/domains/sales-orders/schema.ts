// @ts-nocheck
import { z } from "zod";

export const createSalesOrderSchema = z.object({
  name: z.string().min(1, "Name is required"),
});
export const updateSalesOrderSchema = createSalesOrderSchema.partial();
export const salesordersMassUpdateSchema = z.object({ recordIds: z.array(z.string()).min(1), updates: z.record(z.string(), z.unknown()) });
export type CreateSalesOrderInput = z.infer<typeof createSalesOrderSchema>;
export type UpdateSalesOrderInput = z.infer<typeof updateSalesOrderSchema>;
export type SalesOrderMassUpdateInput = z.infer<typeof salesordersMassUpdateSchema>;