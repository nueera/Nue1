import { z } from "zod";

export const createSearchResultSchema = z.object({
  name: z.string().min(1, "Name is required"),
});
export const updateSearchResultSchema = createSearchResultSchema.partial();
export const searchMassUpdateSchema = z.object({ recordIds: z.array(z.string()).min(1), updates: z.record(z.unknown()) });
export type CreateSearchResultInput = z.infer<typeof createSearchResultSchema>;
export type UpdateSearchResultInput = z.infer<typeof updateSearchResultSchema>;
export type SearchResultMassUpdateInput = z.infer<typeof searchMassUpdateSchema>;