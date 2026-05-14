// @ts-nocheck
import type { CrmRecord } from "../../core/types";

export interface BlueprintState { id: string; name: string; type: "initial" | "intermediate" | "terminal"; color: string; }

export interface BlueprintTransition { id: string; fromStateId: string; toStateId: string; conditions: Record<string, unknown>; approvals: { roleId: string; }[]; }

export interface Blueprint { id: string; name: string; module: string; states: BlueprintState[]; transitions: BlueprintTransition[]; isActive: boolean; createdAt: string; updatedAt: string; owner: string; }
