// @ts-nocheck
import { z } from "zod";

export const createCaseSchema = z.object({
  name: z.string().min(1, "Name is required"),
});
export const updateCaseSchema = createCaseSchema.partial();
export const casesMassUpdateSchema = z.object({ recordIds: z.array(z.string()).min(1), updates: z.record(z.string(), z.unknown()) });
export type CreateCaseInput = z.infer<typeof createCaseSchema>;
export type UpdateCaseInput = z.infer<typeof updateCaseSchema>;
export type CaseMassUpdateInput = z.infer<typeof casesMassUpdateSchema>;