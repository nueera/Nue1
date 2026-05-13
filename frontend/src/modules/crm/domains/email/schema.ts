import { z } from "zod";

export const createEmailMessageSchema = z.object({
  name: z.string().min(1, "Name is required"),
});
export const updateEmailMessageSchema = createEmailMessageSchema.partial();
export const emailMassUpdateSchema = z.object({ recordIds: z.array(z.string()).min(1), updates: z.record(z.unknown()) });
export type CreateEmailMessageInput = z.infer<typeof createEmailMessageSchema>;
export type UpdateEmailMessageInput = z.infer<typeof updateEmailMessageSchema>;
export type EmailMessageMassUpdateInput = z.infer<typeof emailMassUpdateSchema>;