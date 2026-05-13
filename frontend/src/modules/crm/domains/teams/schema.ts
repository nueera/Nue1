import { z } from "zod";

export const createTeamSchema = z.object({
  name: z.string().min(1, "Name is required"),
});
export const updateTeamSchema = createTeamSchema.partial();
export const teamsMassUpdateSchema = z.object({ recordIds: z.array(z.string()).min(1), updates: z.record(z.unknown()) });
export type CreateTeamInput = z.infer<typeof createTeamSchema>;
export type UpdateTeamInput = z.infer<typeof updateTeamSchema>;
export type TeamMassUpdateInput = z.infer<typeof teamsMassUpdateSchema>;