import { z } from "zod";

export const createQuoteSchema = z.object({
  name: z.string().min(1, "Name is required"),
});
export const updateQuoteSchema = createQuoteSchema.partial();
export const quotesMassUpdateSchema = z.object({ recordIds: z.array(z.string()).min(1), updates: z.record(z.string(), z.unknown()) });
export type CreateQuoteInput = z.infer<typeof createQuoteSchema>;
export type UpdateQuoteInput = z.infer<typeof updateQuoteSchema>;
export type QuoteMassUpdateInput = z.infer<typeof quotesMassUpdateSchema>;