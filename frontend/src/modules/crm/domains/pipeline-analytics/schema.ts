import { z } from "zod";

export const createPipelineSnapshotSchema = z.object({
  name: z.string().min(1, "Name is required"),
});
export const updatePipelineSnapshotSchema = createPipelineSnapshotSchema.partial();
export const pipelineanalyticsMassUpdateSchema = z.object({ recordIds: z.array(z.string()).min(1), updates: z.record(z.string(), z.unknown()) });
export type CreatePipelineSnapshotInput = z.infer<typeof createPipelineSnapshotSchema>;
export type UpdatePipelineSnapshotInput = z.infer<typeof updatePipelineSnapshotSchema>;
export type PipelineSnapshotMassUpdateInput = z.infer<typeof pipelineanalyticsMassUpdateSchema>;