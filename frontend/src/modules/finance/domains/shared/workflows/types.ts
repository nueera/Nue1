'use client';
// Workflows Types — Finance Shared

export type WorkflowTrigger = 'on_create' | 'on_update' | 'on_status_change' | 'scheduled' | 'manual';
export type WorkflowAction = 'send_email' | 'create_task' | 'update_field' | 'webhook' | 'notify';
export interface WorkflowRule {
  field: string;
  operator: 'equals' | 'not_equals' | 'contains' | 'greater_than' | 'less_than';
  value: string;
}
export interface WorkflowStep {
  action: WorkflowAction;
  config: Record<string, string>;
  order: number;
}
export interface Workflow {
  id: string;
  name: string;
  description: string;
  entityType: string;
  trigger: WorkflowTrigger;
  rules: WorkflowRule[];
  steps: WorkflowStep[];
  isActive: boolean;
  executionCount: number;
  lastExecutedAt: string;
  createdAt: string;
}
