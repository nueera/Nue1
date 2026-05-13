import { z } from "zod";

export const createProductSchema = z.object({
  name: z.string().min(1, "Name is required"),
});
export const updateProductSchema = createProductSchema.partial();
export const productsMassUpdateSchema = z.object({ recordIds: z.array(z.string()).min(1), updates: z.record(z.unknown()) });
export type CreateProductInput = z.infer<typeof createProductSchema>;
export type UpdateProductInput = z.infer<typeof updateProductSchema>;
export type ProductMassUpdateInput = z.infer<typeof productsMassUpdateSchema>;