import { z } from "zod";

export const createImportJobSchema = z.object({
  name: z.string().min(1, "Name is required"),
});
export const updateImportJobSchema = createImportJobSchema.partial();
export const importMassUpdateSchema = z.object({ recordIds: z.array(z.string()).min(1), updates: z.record(z.unknown()) });
export type CreateImportJobInput = z.infer<typeof createImportJobSchema>;
export type UpdateImportJobInput = z.infer<typeof updateImportJobSchema>;
export type ImportJobMassUpdateInput = z.infer<typeof importMassUpdateSchema>;