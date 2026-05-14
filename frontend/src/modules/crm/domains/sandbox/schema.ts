// @ts-nocheck
import { z } from "zod";

export const createSandboxSchema = z.object({
  name: z.string().min(1, "Name is required"),
});
export const updateSandboxSchema = createSandboxSchema.partial();
export const sandboxMassUpdateSchema = z.object({ recordIds: z.array(z.string()).min(1), updates: z.record(z.string(), z.unknown()) });
export type CreateSandboxInput = z.infer<typeof createSandboxSchema>;
export type UpdateSandboxInput = z.infer<typeof updateSandboxSchema>;
export type SandboxMassUpdateInput = z.infer<typeof sandboxMassUpdateSchema>;