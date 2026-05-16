import { z } from "zod";

export const createCustomerSegmentSchema = z.object({
  name: z.string().min(1, "Name is required"),
});
export const updateCustomerSegmentSchema = createCustomerSegmentSchema.partial();
export const customeranalyticsMassUpdateSchema = z.object({ recordIds: z.array(z.string()).min(1), updates: z.record(z.string(), z.unknown()) });
export type CreateCustomerSegmentInput = z.infer<typeof createCustomerSegmentSchema>;
export type UpdateCustomerSegmentInput = z.infer<typeof updateCustomerSegmentSchema>;
export type CustomerSegmentMassUpdateInput = z.infer<typeof customeranalyticsMassUpdateSchema>;