import type { CrmRecord } from "../../core/types";

export interface AIPrediction { id: string; model: string; entityType: string; entityId: string; prediction: string; confidence: number; factors: { name: string; weight: number }[]; createdAt: string; }

export interface AIRecommendation { id: string; type: string; title: string; description: string; confidence: number; actionType: string; actionData: Record<string, unknown>; createdAt: string; }

export interface AnomalyAlert { id: string; module: string; entityId: string; metric: string; expectedValue: number; actualValue: number; severity: "low" | "medium" | "high"; detectedAt: string; }

export interface ZiaConfig { id: string; features: { predictions: boolean; forecasts: boolean; enrichment: boolean; anomaly: boolean; sentiment: boolean; recommendations: boolean; }; }
