// @ts-nocheck
import { z } from "zod";

export const createAPIEndpointSchema = z.object({
  name: z.string().min(1, "Name is required"),
});
export const updateAPIEndpointSchema = createAPIEndpointSchema.partial();
export const apisMassUpdateSchema = z.object({ recordIds: z.array(z.string()).min(1), updates: z.record(z.string(), z.unknown()) });
export type CreateAPIEndpointInput = z.infer<typeof createAPIEndpointSchema>;
export type UpdateAPIEndpointInput = z.infer<typeof updateAPIEndpointSchema>;
export type APIEndpointMassUpdateInput = z.infer<typeof apisMassUpdateSchema>;