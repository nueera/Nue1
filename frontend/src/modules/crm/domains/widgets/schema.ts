import { z } from "zod";

export const createWidgetSchema = z.object({
  name: z.string().min(1, "Name is required"),
});
export const updateWidgetSchema = createWidgetSchema.partial();
export const widgetsMassUpdateSchema = z.object({ recordIds: z.array(z.string()).min(1), updates: z.record(z.unknown()) });
export type CreateWidgetInput = z.infer<typeof createWidgetSchema>;
export type UpdateWidgetInput = z.infer<typeof updateWidgetSchema>;
export type WidgetMassUpdateInput = z.infer<typeof widgetsMassUpdateSchema>;