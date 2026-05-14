// @ts-nocheck
import { z } from "zod";

export const createChatSessionSchema = z.object({
  name: z.string().min(1, "Name is required"),
});
export const updateChatSessionSchema = createChatSessionSchema.partial();
export const salesiqMassUpdateSchema = z.object({ recordIds: z.array(z.string()).min(1), updates: z.record(z.string(), z.unknown()) });
export type CreateChatSessionInput = z.infer<typeof createChatSessionSchema>;
export type UpdateChatSessionInput = z.infer<typeof updateChatSessionSchema>;
export type ChatSessionMassUpdateInput = z.infer<typeof salesiqMassUpdateSchema>;