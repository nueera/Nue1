import { z } from "zod";

export const createBlueprintSchema = z.object({
  name: z.string().min(1, "Name is required"),
});
export const updateBlueprintSchema = createBlueprintSchema.partial();
export const blueprintMassUpdateSchema = z.object({ recordIds: z.array(z.string()).min(1), updates: z.record(z.unknown()) });
export type CreateBlueprintInput = z.infer<typeof createBlueprintSchema>;
export type UpdateBlueprintInput = z.infer<typeof updateBlueprintSchema>;
export type BlueprintMassUpdateInput = z.infer<typeof blueprintMassUpdateSchema>;