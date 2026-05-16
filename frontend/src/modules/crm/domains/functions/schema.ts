import { z } from "zod";

export const createDelugeFunctionSchema = z.object({
  name: z.string().min(1, "Name is required"),
});
export const updateDelugeFunctionSchema = createDelugeFunctionSchema.partial();
export const functionsMassUpdateSchema = z.object({ recordIds: z.array(z.string()).min(1), updates: z.record(z.string(), z.unknown()) });
export type CreateDelugeFunctionInput = z.infer<typeof createDelugeFunctionSchema>;
export type UpdateDelugeFunctionInput = z.infer<typeof updateDelugeFunctionSchema>;
export type DelugeFunctionMassUpdateInput = z.infer<typeof functionsMassUpdateSchema>;