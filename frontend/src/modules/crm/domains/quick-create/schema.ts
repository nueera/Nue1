import { z } from "zod";

export const createQuickCreateConfigSchema = z.object({
  name: z.string().min(1, "Name is required"),
});
export const updateQuickCreateConfigSchema = createQuickCreateConfigSchema.partial();
export const quickcreateMassUpdateSchema = z.object({ recordIds: z.array(z.string()).min(1), updates: z.record(z.string(), z.unknown()) });
export type CreateQuickCreateConfigInput = z.infer<typeof createQuickCreateConfigSchema>;
export type UpdateQuickCreateConfigInput = z.infer<typeof updateQuickCreateConfigSchema>;
export type QuickCreateConfigMassUpdateInput = z.infer<typeof quickcreateMassUpdateSchema>;