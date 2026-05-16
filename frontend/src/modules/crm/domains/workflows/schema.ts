import { z } from "zod";

export const createWorkflowSchema = z.object({
  name: z.string().min(1, "Name is required"),
});
export const updateWorkflowSchema = createWorkflowSchema.partial();
export const workflowsMassUpdateSchema = z.object({ recordIds: z.array(z.string()).min(1), updates: z.record(z.string(), z.unknown()) });
export type CreateWorkflowInput = z.infer<typeof createWorkflowSchema>;
export type UpdateWorkflowInput = z.infer<typeof updateWorkflowSchema>;
export type WorkflowMassUpdateInput = z.infer<typeof workflowsMassUpdateSchema>;