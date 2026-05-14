// @ts-nocheck
// ============================================================================
// Projects — Types
// ============================================================================

import type { Money } from '../../../types/finance-common';

export type ProjectStatus = 'not-started' | 'in-progress' | 'on-hold' | 'completed' | 'cancelled';

export interface Project {
  id: string;
  name: string;
  description: string;
  status: ProjectStatus;
  customerId: string;
  customerName: string;
  budget: Money;
  billed: Money;
  unbilled: Money;
  cost: Money;
  profit: Money;
  startDate: string;
  endDate?: string;
  progress: number;
  managerId: string;
  managerName: string;
  tasks: ProjectTask[];
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

export interface ProjectTask {
  id: string;
  projectId: string;
  name: string;
  description: string;
  status: 'todo' | 'in-progress' | 'done';
  assigneeId?: string;
  assigneeName?: string;
  dueDate?: string;
  completedAt?: string;
}

export interface ProjectList {
  projects: Project[];
  pagination: { page: number; pageSize: number; total: number; totalPages: number };
}
