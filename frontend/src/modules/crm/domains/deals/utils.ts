import type { Deal, DealStage } from "./types"; import { DEAL_STAGES } from "./constants"; import { formatCurrency } from "../../core/utils";
export function computeWeightedPipeline(deals: Deal[]): number { return deals.reduce((sum, deal) => sum + deal.amount * (deal.probability / 100), 0); }
export function calculateDealAge(createdAt: string): number { return Math.floor((Date.now() - new Date(createdAt).getTime()) / (1000 * 60 * 60 * 24)); }
export function getWinProbability(stage: DealStage): number { return DEAL_STAGES.find(s => s.value === stage)?.probability ?? 0; }
export function formatDealValue(amount: number, currency: "USD"|"EUR"|"GBP"|"INR" = "USD"): string { return formatCurrency(amount, currency); }
export function isOverdue(closingDate: string): boolean { return new Date(closingDate) < new Date(); }
export function isStale(updatedAt: string, staleDays = 30): boolean { return new Date(updatedAt) < new Date(Date.now() - staleDays * 86400000); }
export function computePipelineVelocity(deals: Deal[]): number { const won = deals.filter(d => d.stage === "closed-won"); if (!won.length) return 0; return won.reduce((s, d) => s + calculateDealAge(d.createdAt), 0) / won.length; }
export function rankDealSize(amount: number): "small"|"medium"|"large"|"enterprise" { if (amount >= 100000) return "enterprise"; if (amount >= 25000) return "large"; if (amount >= 5000) return "medium"; return "small"; }
export function computeCommission(amount: number, rate = 0.1): number { return amount * rate; }
export function getStageColor(stage: DealStage): string { return DEAL_STAGES.find(s => s.value === stage)?.color ?? "var(--status-neutral)"; }
export function getStageLabel(stage: DealStage): string { return DEAL_STAGES.find(s => s.value === stage)?.label ?? stage; }