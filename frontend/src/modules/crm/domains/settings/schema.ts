import { z } from "zod";

export const createCRMSettingsSchema = z.object({
  name: z.string().min(1, "Name is required"),
});
export const updateCRMSettingsSchema = createCRMSettingsSchema.partial();
export const settingsMassUpdateSchema = z.object({ recordIds: z.array(z.string()).min(1), updates: z.record(z.string(), z.unknown()) });
export type CreateCRMSettingsInput = z.infer<typeof createCRMSettingsSchema>;
export type UpdateCRMSettingsInput = z.infer<typeof updateCRMSettingsSchema>;
export type CRMSettingsMassUpdateInput = z.infer<typeof settingsMassUpdateSchema>;