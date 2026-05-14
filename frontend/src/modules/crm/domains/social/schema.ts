// @ts-nocheck
import { z } from "zod";

export const createSocialProfileSchema = z.object({
  name: z.string().min(1, "Name is required"),
});
export const updateSocialProfileSchema = createSocialProfileSchema.partial();
export const socialMassUpdateSchema = z.object({ recordIds: z.array(z.string()).min(1), updates: z.record(z.string(), z.unknown()) });
export type CreateSocialProfileInput = z.infer<typeof createSocialProfileSchema>;
export type UpdateSocialProfileInput = z.infer<typeof updateSocialProfileSchema>;
export type SocialProfileMassUpdateInput = z.infer<typeof socialMassUpdateSchema>;