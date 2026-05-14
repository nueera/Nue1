// @ts-nocheck
import { z } from "zod";

export const createPriceBookSchema = z.object({
  name: z.string().min(1, "Name is required"),
});
export const updatePriceBookSchema = createPriceBookSchema.partial();
export const pricebooksMassUpdateSchema = z.object({ recordIds: z.array(z.string()).min(1), updates: z.record(z.string(), z.unknown()) });
export type CreatePriceBookInput = z.infer<typeof createPriceBookSchema>;
export type UpdatePriceBookInput = z.infer<typeof updatePriceBookSchema>;
export type PriceBookMassUpdateInput = z.infer<typeof pricebooksMassUpdateSchema>;