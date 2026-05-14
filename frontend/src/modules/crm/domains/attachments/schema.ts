// @ts-nocheck
import { z } from "zod";

export const createAttachmentSchema = z.object({
  name: z.string().min(1, "Name is required"),
});
export const updateAttachmentSchema = createAttachmentSchema.partial();
export const attachmentsMassUpdateSchema = z.object({ recordIds: z.array(z.string()).min(1), updates: z.record(z.string(), z.unknown()) });
export type CreateAttachmentInput = z.infer<typeof createAttachmentSchema>;
export type UpdateAttachmentInput = z.infer<typeof updateAttachmentSchema>;
export type AttachmentMassUpdateInput = z.infer<typeof attachmentsMassUpdateSchema>;