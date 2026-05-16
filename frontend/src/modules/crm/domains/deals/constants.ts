import type { DealStage, DealForecastCategory, DealLossReason, DealPipeline } from "./types";
export const DEAL_STAGES: { value: DealStage; label: string; probability: number; color: string }[] = [
  { value: "qualification", label: "Qualification", probability: 10, color: "var(--status-neutral)" },
  { value: "needs-analysis", label: "Needs Analysis", probability: 25, color: "var(--status-info)" },
  { value: "proposal", label: "Proposal", probability: 50, color: "var(--status-accent)" },
  { value: "negotiation", label: "Negotiation", probability: 75, color: "var(--status-warning)" },
  { value: "closed-won", label: "Closed Won", probability: 100, color: "var(--status-success)" },
  { value: "closed-lost", label: "Closed Lost", probability: 0, color: "var(--status-danger)" },
];
export const FORECAST_CATEGORIES: { value: DealForecastCategory; label: string }[] = [
  { value: "pipeline", label: "Pipeline" }, { value: "best-case", label: "Best Case" },
  { value: "committed", label: "Committed" }, { value: "closed", label: "Closed" }, { value: "omitted", label: "Omitted" },
];
export const LOSS_REASONS: { value: DealLossReason; label: string }[] = [
  { value: "price", label: "Price" }, { value: "competitor", label: "Competitor" },
  { value: "no-budget", label: "No Budget" }, { value: "no-decision", label: "No Decision" },
  { value: "timing", label: "Timing" }, { value: "bad-fit", label: "Bad Fit" }, { value: "other", label: "Other" },
];
export const DEAL_STAGE_FILTERS = ["All", ...DEAL_STAGES.map(s => s.value)] as const;
export const DEAL_FORECAST_FILTERS = ["All", ...FORECAST_CATEGORIES.map(c => c.value)] as const;
// @ts-expect-error — Type '{ id: string; order: number; isWon: boolean; isLost: b...
export const DEFAULT_PIPELINE: DealPipeline = { id: "default", name: "Standard Pipeline", isDefault: true, stages: DEAL_STAGES.map((s, i) => ({ ...s, id: `stage-${i+1}`, order: i+1, isWon: s.value === "closed-won", isLost: s.value === "closed-lost" })) };
export const DEAL_DETAIL_TABS = [{ value: "overview", label: "Overview" }, { value: "products", label: "Products" }, { value: "activities", label: "Activities" }, { value: "related", label: "Related" }] as const;