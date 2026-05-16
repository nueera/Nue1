import { z } from "zod";

export const createTagSchema = z.object({
  name: z.string().min(1, "Name is required"),
});
export const updateTagSchema = createTagSchema.partial();
export const tagsMassUpdateSchema = z.object({ recordIds: z.array(z.string()).min(1), updates: z.record(z.string(), z.unknown()) });
export type CreateTagInput = z.infer<typeof createTagSchema>;
export type UpdateTagInput = z.infer<typeof updateTagSchema>;
export type TagMassUpdateInput = z.infer<typeof tagsMassUpdateSchema>;