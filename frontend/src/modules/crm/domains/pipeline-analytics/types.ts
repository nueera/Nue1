import type { CrmRecord } from "../../core/types";

export interface PipelineSnapshot { id: string; date: string; totalValue: number; dealCount: number; byStage: Record<string, { value: number; count: number }>; }

export interface PipelineVelocity { id: string; period: string; avgDaysToClose: number; avgDealSize: number; conversionRate: number; }
