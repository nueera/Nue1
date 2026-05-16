import { z } from "zod";

export const createReportSchema = z.object({
  name: z.string().min(1, "Name is required"),
});
export const updateReportSchema = createReportSchema.partial();
export const reportsMassUpdateSchema = z.object({ recordIds: z.array(z.string()).min(1), updates: z.record(z.string(), z.unknown()) });
export type CreateReportInput = z.infer<typeof createReportSchema>;
export type UpdateReportInput = z.infer<typeof updateReportSchema>;
export type ReportMassUpdateInput = z.infer<typeof reportsMassUpdateSchema>;