import { z } from "zod";

export const createJourneySchema = z.object({
  name: z.string().min(1, "Name is required"),
});
export const updateJourneySchema = createJourneySchema.partial();
export const journeyorchestrationMassUpdateSchema = z.object({ recordIds: z.array(z.string()).min(1), updates: z.record(z.unknown()) });
export type CreateJourneyInput = z.infer<typeof createJourneySchema>;
export type UpdateJourneyInput = z.infer<typeof updateJourneySchema>;
export type JourneyMassUpdateInput = z.infer<typeof journeyorchestrationMassUpdateSchema>;