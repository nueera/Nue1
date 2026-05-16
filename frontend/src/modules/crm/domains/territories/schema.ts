import { z } from "zod";

export const createTerritorySchema = z.object({
  name: z.string().min(1, "Name is required"),
});
export const updateTerritorySchema = createTerritorySchema.partial();
export const territoriesMassUpdateSchema = z.object({ recordIds: z.array(z.string()).min(1), updates: z.record(z.string(), z.unknown()) });
export type CreateTerritoryInput = z.infer<typeof createTerritorySchema>;
export type UpdateTerritoryInput = z.infer<typeof updateTerritorySchema>;
export type TerritoryMassUpdateInput = z.infer<typeof territoriesMassUpdateSchema>;