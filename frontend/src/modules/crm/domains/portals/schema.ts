import { z } from "zod";

export const createPortalSchema = z.object({
  name: z.string().min(1, "Name is required"),
});
export const updatePortalSchema = createPortalSchema.partial();
export const portalsMassUpdateSchema = z.object({ recordIds: z.array(z.string()).min(1), updates: z.record(z.unknown()) });
export type CreatePortalInput = z.infer<typeof createPortalSchema>;
export type UpdatePortalInput = z.infer<typeof updatePortalSchema>;
export type PortalMassUpdateInput = z.infer<typeof portalsMassUpdateSchema>;