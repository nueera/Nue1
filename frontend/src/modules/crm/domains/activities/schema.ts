import { z } from "zod";

export const createActivitySchema = z.object({
  name: z.string().min(1, "Name is required"),
});
export const updateActivitySchema = createActivitySchema.partial();
export const activitiesMassUpdateSchema = z.object({ recordIds: z.array(z.string()).min(1), updates: z.record(z.string(), z.unknown()) });
export type CreateActivityInput = z.infer<typeof createActivitySchema>;
export type UpdateActivityInput = z.infer<typeof updateActivitySchema>;
export type ActivityMassUpdateInput = z.infer<typeof activitiesMassUpdateSchema>;