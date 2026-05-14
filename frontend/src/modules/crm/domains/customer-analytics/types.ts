// @ts-nocheck
import type { CrmRecord } from "../../core/types";

export interface CustomerSegment { id: string; name: string; criteria: Record<string, unknown>; count: number; avgValue: number; }

export interface CustomerHealth { id: string; accountId: string; accountName: string; score: number; trend: "improving" | "stable" | "declining"; lastActivity: string; }

export interface ChurnRisk { id: string; accountId: string; accountName: string; risk: "low" | "medium" | "high"; factors: string[]; predictedDate?: string; }
