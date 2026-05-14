// @ts-nocheck
// ============================================================================
// Projects — Constants
// ============================================================================

import type { ProjectStatus } from './types';

export const PROJECT_STATUSES: { value: ProjectStatus; label: string; color: string }[] = [
  { value: 'not-started', label: 'Not Started', color: 'gray' },
  { value: 'in-progress', label: 'In Progress', color: 'blue' },
  { value: 'on-hold', label: 'On Hold', color: 'amber' },
  { value: 'completed', label: 'Completed', color: 'green' },
  { value: 'cancelled', label: 'Cancelled', color: 'red' },
];

export const PROJECT_STATUS_FILTERS = ['All', 'not-started', 'in-progress', 'on-hold', 'completed', 'cancelled'] as const;

export const PROJECT_TABLE_COLUMNS = [
  { key: 'name', label: 'Project', visible: true, sortable: true },
  { key: 'customerName', label: 'Customer', visible: true, sortable: true },
  { key: 'status', label: 'Status', visible: true, sortable: true },
  { key: 'budget', label: 'Budget', visible: true, sortable: true },
  { key: 'billed', label: 'Billed', visible: true, sortable: true },
  { key: 'progress', label: 'Progress', visible: true, sortable: true },
  { key: 'managerName', label: 'Manager', visible: true, sortable: true },
] as const;
