// @ts-nocheck
import { z } from "zod";

export const createCanvasTemplateSchema = z.object({
  name: z.string().min(1, "Name is required"),
});
export const updateCanvasTemplateSchema = createCanvasTemplateSchema.partial();
export const canvasMassUpdateSchema = z.object({ recordIds: z.array(z.string()).min(1), updates: z.record(z.string(), z.unknown()) });
export type CreateCanvasTemplateInput = z.infer<typeof createCanvasTemplateSchema>;
export type UpdateCanvasTemplateInput = z.infer<typeof updateCanvasTemplateSchema>;
export type CanvasTemplateMassUpdateInput = z.infer<typeof canvasMassUpdateSchema>;