import { z } from "zod";

export const createSMSMessageSchema = z.object({
  name: z.string().min(1, "Name is required"),
});
export const updateSMSMessageSchema = createSMSMessageSchema.partial();
export const smsMassUpdateSchema = z.object({ recordIds: z.array(z.string()).min(1), updates: z.record(z.unknown()) });
export type CreateSMSMessageInput = z.infer<typeof createSMSMessageSchema>;
export type UpdateSMSMessageInput = z.infer<typeof updateSMSMessageSchema>;
export type SMSMessageMassUpdateInput = z.infer<typeof smsMassUpdateSchema>;