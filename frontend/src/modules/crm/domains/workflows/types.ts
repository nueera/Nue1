// @ts-nocheck
import type { CrmRecord } from "../../core/types";

export type WorkflowTrigger = "record-create" | "record-update" | "record-delete" | "schedule" | "manual";

export type WorkflowAction = "email" | "field-update" | "task" | "webhook" | "sub-workflow";

export interface Workflow { id: string; name: string; description: string; trigger: WorkflowTrigger; conditions: { field: string; operator: string; value: unknown }[]; actions: { type: WorkflowAction; config: Record<string, unknown> }[]; isActive: boolean; createdAt: string; updatedAt: string; owner: string; }
