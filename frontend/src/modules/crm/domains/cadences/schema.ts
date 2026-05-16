import { z } from "zod";

export const createCadenceSchema = z.object({
  name: z.string().min(1, "Name is required"),
});
export const updateCadenceSchema = createCadenceSchema.partial();
export const cadencesMassUpdateSchema = z.object({ recordIds: z.array(z.string()).min(1), updates: z.record(z.string(), z.unknown()) });
export type CreateCadenceInput = z.infer<typeof createCadenceSchema>;
export type UpdateCadenceInput = z.infer<typeof updateCadenceSchema>;
export type CadenceMassUpdateInput = z.infer<typeof cadencesMassUpdateSchema>;