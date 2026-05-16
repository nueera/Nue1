import { z } from "zod";
export const createDealSchema = z.object({
  dealName: z.string().min(1, "Deal name required"), amount: z.number().positive("Amount must be positive"),
  stage: z.enum(["qualification","needs-analysis","proposal","negotiation","closed-won","closed-lost"] as const).default("qualification"),
  probability: z.number().min(0).max(100).optional(), closingDate: z.string().min(1, "Closing date required"),
  accountId: z.string().min(1, "Account required"), contactId: z.string().optional(),
  pipelineId: z.string().default("default"), type: z.string().optional(),
  leadSource: z.string().optional(), nextStep: z.string().optional(),
  description: z.string().max(5000).optional(),
  forecastCategory: z.enum(["pipeline","best-case","committed","closed","omitted"] as const).default("pipeline"),
});
export const updateDealSchema = createDealSchema.partial();
export const dealStageChangeSchema = z.object({ dealId: z.string().min(1), newStage: z.string().min(1), pipelineId: z.string().optional() });
export const dealCloseSchema = z.object({ dealId: z.string().min(1), isWon: z.boolean(), lossReason: z.string().optional(), lossDescription: z.string().optional(), actualAmount: z.number().optional() });
export const dealProductSchema = z.object({ productId: z.string().min(1), quantity: z.number().positive().default(1), unitPrice: z.number().positive(), discount: z.number().min(0).max(100).default(0) });
export const dealMassUpdateSchema = z.object({ recordIds: z.array(z.string()).min(1), updates: z.record(z.string(), z.unknown()) });
export type CreateDealInput = z.infer<typeof createDealSchema>; export type UpdateDealInput = z.infer<typeof updateDealSchema>;
export type DealStageChangeInput = z.infer<typeof dealStageChangeSchema>; export type DealCloseInput = z.infer<typeof dealCloseSchema>;
export type DealProductInput = z.infer<typeof dealProductSchema>; export type DealMassUpdateInput = z.infer<typeof dealMassUpdateSchema>;