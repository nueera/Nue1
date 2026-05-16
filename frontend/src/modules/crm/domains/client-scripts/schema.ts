import { z } from "zod";

export const createClientScriptSchema = z.object({
  name: z.string().min(1, "Name is required"),
});
export const updateClientScriptSchema = createClientScriptSchema.partial();
export const clientscriptsMassUpdateSchema = z.object({ recordIds: z.array(z.string()).min(1), updates: z.record(z.string(), z.unknown()) });
export type CreateClientScriptInput = z.infer<typeof createClientScriptSchema>;
export type UpdateClientScriptInput = z.infer<typeof updateClientScriptSchema>;
export type ClientScriptMassUpdateInput = z.infer<typeof clientscriptsMassUpdateSchema>;