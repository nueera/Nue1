import type { CrmRecord } from "../../core/types";

export type CadenceStepType = "email" | "call" | "task" | "sms";

export interface CadenceStep { id: string; type: CadenceStepType; subject: string; body: string; delayDays: number; order: number; }

export interface Cadence { id: string; name: string; description: string; steps: CadenceStep[]; targets: { type: string; ids: string[] }; status: "draft" | "active" | "paused" | "completed"; createdAt: string; updatedAt: string; owner: string; }
