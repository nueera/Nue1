import type { CrmRecord } from "../../core/types";
export type DealStage = "qualification" | "needs-analysis" | "proposal" | "negotiation" | "closed-won" | "closed-lost";
export type DealForecastCategory = "pipeline" | "best-case" | "committed" | "closed" | "omitted";
export type DealLossReason = "price" | "competitor" | "no-budget" | "no-decision" | "timing" | "bad-fit" | "other";
export interface Deal extends CrmRecord {
  dealName: string; amount: number; stage: DealStage; probability: number;
  closingDate: string; accountId: string; accountName: string;
  contactId: string; contactName: string; pipelineId: string; pipelineName: string;
  type: string; leadSource: string; nextStep: string; description: string;
  forecastCategory: DealForecastCategory; lossReason?: DealLossReason;
  lossDescription?: string; expectedRevenue: number; campaignId: string;
  competitorIds: string[]; productLineItems: DealProductLine[];
  contactRoles: DealContactRole[];
}
export interface DealPipeline { id: string; name: string; stages: DealPipelineStage[]; isDefault: boolean; }
export interface DealPipelineStage { id: string; name: string; probability: number; order: number; color: string; isWon: boolean; isLost: boolean; }
export interface DealProductLine { id: string; productId: string; productName: string; quantity: number; unitPrice: number; discount: number; total: number; }
export interface DealContactRole { contactId: string; contactName: string; role: "decision-maker"|"influencer"|"champion"|"evaluator"|"end-user"|"other"; }