import { z } from "zod";

export const createDashboardSchema = z.object({
  name: z.string().min(1, "Name is required"),
});
export const updateDashboardSchema = createDashboardSchema.partial();
export const dashboardsMassUpdateSchema = z.object({ recordIds: z.array(z.string()).min(1), updates: z.record(z.unknown()) });
export type CreateDashboardInput = z.infer<typeof createDashboardSchema>;
export type UpdateDashboardInput = z.infer<typeof updateDashboardSchema>;
export type DashboardMassUpdateInput = z.infer<typeof dashboardsMassUpdateSchema>;