import { z } from "zod";

export const createCPQConfigSchema = z.object({
  name: z.string().min(1, "Name is required"),
});
export const updateCPQConfigSchema = createCPQConfigSchema.partial();
export const cpqMassUpdateSchema = z.object({ recordIds: z.array(z.string()).min(1), updates: z.record(z.string(), z.unknown()) });
export type CreateCPQConfigInput = z.infer<typeof createCPQConfigSchema>;
export type UpdateCPQConfigInput = z.infer<typeof updateCPQConfigSchema>;
export type CPQConfigMassUpdateInput = z.infer<typeof cpqMassUpdateSchema>;