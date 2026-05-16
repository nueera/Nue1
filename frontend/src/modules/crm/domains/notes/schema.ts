import { z } from "zod";

export const createNoteSchema = z.object({
  name: z.string().min(1, "Name is required"),
});
export const updateNoteSchema = createNoteSchema.partial();
export const notesMassUpdateSchema = z.object({ recordIds: z.array(z.string()).min(1), updates: z.record(z.string(), z.unknown()) });
export type CreateNoteInput = z.infer<typeof createNoteSchema>;
export type UpdateNoteInput = z.infer<typeof updateNoteSchema>;
export type NoteMassUpdateInput = z.infer<typeof notesMassUpdateSchema>;