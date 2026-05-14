// @ts-nocheck
import type { CrmRecord } from "../../core/types";

export type JourneyNodeType = "trigger" | "condition" | "action" | "wait" | "end";

export interface JourneyNode { id: string; type: JourneyNodeType; config: Record<string, unknown>; position: { x: number; y: number }; }

export interface JourneyEdge { id: string; sourceId: string; targetId: string; label?: string; }

export interface Journey { id: string; name: string; description: string; nodes: JourneyNode[]; edges: JourneyEdge[]; status: "draft" | "active" | "paused" | "completed"; enrolledCount: number; createdAt: string; updatedAt: string; owner: string; }
