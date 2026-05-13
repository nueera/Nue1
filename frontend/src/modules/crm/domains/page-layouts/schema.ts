import { z } from "zod";

export const createPageLayoutSchema = z.object({
  name: z.string().min(1, "Name is required"),
});
export const updatePageLayoutSchema = createPageLayoutSchema.partial();
export const pagelayoutsMassUpdateSchema = z.object({ recordIds: z.array(z.string()).min(1), updates: z.record(z.unknown()) });
export type CreatePageLayoutInput = z.infer<typeof createPageLayoutSchema>;
export type UpdatePageLayoutInput = z.infer<typeof updatePageLayoutSchema>;
export type PageLayoutMassUpdateInput = z.infer<typeof pagelayoutsMassUpdateSchema>;