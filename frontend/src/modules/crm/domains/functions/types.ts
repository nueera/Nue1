import type { CrmRecord } from "../../core/types";

export type FunctionCategory = "automation" | "integration" | "data-processing" | "utility";

export interface DelugeFunction { id: string; name: string; category: FunctionCategory; description: string; code: string; parameters: { name: string; type: string; required: boolean }[]; schedule?: { type: "cron" | "fixed-rate"; expression: string }; isActive: boolean; createdAt: string; updatedAt: string; owner: string; }
