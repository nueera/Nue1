// @ts-nocheck
import type { CrmRecord } from "../../core/types";

export type ForecastPeriod = "monthly" | "quarterly";

export interface ForecastTarget { id: string; userId: string; userName: string; period: string; category: string; target: number; actual: number; commit: number; }

export interface ForecastAdjustment { id: string; targetId: string; amount: number; reason: string; adjustedBy: string; adjustedAt: string; }
