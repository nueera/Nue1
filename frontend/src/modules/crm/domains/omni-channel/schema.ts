import { z } from "zod";

export const createOmniChannelConfigSchema = z.object({
  name: z.string().min(1, "Name is required"),
});
export const updateOmniChannelConfigSchema = createOmniChannelConfigSchema.partial();
export const omnichannelMassUpdateSchema = z.object({ recordIds: z.array(z.string()).min(1), updates: z.record(z.unknown()) });
export type CreateOmniChannelConfigInput = z.infer<typeof createOmniChannelConfigSchema>;
export type UpdateOmniChannelConfigInput = z.infer<typeof updateOmniChannelConfigSchema>;
export type OmniChannelConfigMassUpdateInput = z.infer<typeof omnichannelMassUpdateSchema>;