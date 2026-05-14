// @ts-nocheck
import { z } from "zod";

export const createCustomModuleSchema = z.object({
  name: z.string().min(1, "Name is required"),
});
export const updateCustomModuleSchema = createCustomModuleSchema.partial();
export const custommodulesMassUpdateSchema = z.object({ recordIds: z.array(z.string()).min(1), updates: z.record(z.string(), z.unknown()) });
export type CreateCustomModuleInput = z.infer<typeof createCustomModuleSchema>;
export type UpdateCustomModuleInput = z.infer<typeof updateCustomModuleSchema>;
export type CustomModuleMassUpdateInput = z.infer<typeof custommodulesMassUpdateSchema>;