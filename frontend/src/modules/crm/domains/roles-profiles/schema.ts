import { z } from "zod";

export const createRoleSchema = z.object({
  name: z.string().min(1, "Name is required"),
});
export const updateRoleSchema = createRoleSchema.partial();
export const rolesprofilesMassUpdateSchema = z.object({ recordIds: z.array(z.string()).min(1), updates: z.record(z.unknown()) });
export type CreateRoleInput = z.infer<typeof createRoleSchema>;
export type UpdateRoleInput = z.infer<typeof updateRoleSchema>;
export type RoleMassUpdateInput = z.infer<typeof rolesprofilesMassUpdateSchema>;