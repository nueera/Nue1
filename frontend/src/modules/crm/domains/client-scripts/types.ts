// @ts-nocheck
import type { CrmRecord } from "../../core/types";

export type ScriptEvent = "onLoad" | "onSave" | "onChange" | "onDelete" | "validate";

export interface ClientScript { id: string; name: string; module: string; event: ScriptEvent; code: string; isActive: boolean; executionOrder: number; createdAt: string; updatedAt: string; owner: string; }
