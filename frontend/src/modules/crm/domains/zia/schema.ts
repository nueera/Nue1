import { z } from "zod";

export const createZiaConfigSchema = z.object({
  name: z.string().min(1, "Name is required"),
});
export const updateZiaConfigSchema = createZiaConfigSchema.partial();
export const ziaMassUpdateSchema = z.object({ recordIds: z.array(z.string()).min(1), updates: z.record(z.unknown()) });
export type CreateZiaConfigInput = z.infer<typeof createZiaConfigSchema>;
export type UpdateZiaConfigInput = z.infer<typeof updateZiaConfigSchema>;
export type ZiaConfigMassUpdateInput = z.infer<typeof ziaMassUpdateSchema>;