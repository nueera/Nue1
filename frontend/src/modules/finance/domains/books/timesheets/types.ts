// @ts-nocheck
// ============================================================================
// Timesheets — Types
// ============================================================================

import type { Money } from '../../../types/finance-common';

export type TimeEntryStatus = 'draft' | 'submitted' | 'approved' | 'rejected';

export interface TimeEntry {
  id: string;
  employeeId: string;
  employeeName: string;
  projectId?: string;
  projectName?: string;
  taskId?: string;
  taskName?: string;
  date: string;
  hours: number;
  billable: boolean;
  billableRate: Money;
  description: string;
  status: TimeEntryStatus;
  approvedBy?: string;
  approvedAt?: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

export interface Timesheet {
  id: string;
  employeeId: string;
  employeeName: string;
  weekStart: string;
  weekEnd: string;
  entries: TimeEntry[];
  totalHours: number;
  billableHours: number;
  status: TimeEntryStatus;
  submittedAt?: string;
  approvedBy?: string;
  approvedAt?: string;
}

export interface TimeEntryList {
  timeEntries: TimeEntry[];
  pagination: { page: number; pageSize: number; total: number; totalPages: number };
}
