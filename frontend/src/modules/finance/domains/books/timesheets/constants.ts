// @ts-nocheck
// ============================================================================
// Timesheets — Constants
// ============================================================================

import type { TimeEntryStatus } from './types';

export const TIME_ENTRY_STATUSES: { value: TimeEntryStatus; label: string; color: string }[] = [
  { value: 'draft', label: 'Draft', color: 'gray' },
  { value: 'submitted', label: 'Submitted', color: 'blue' },
  { value: 'approved', label: 'Approved', color: 'green' },
  { value: 'rejected', label: 'Rejected', color: 'red' },
];

export const TIMESHEET_TABLE_COLUMNS = [
  { key: 'employeeName', label: 'Employee', visible: true, sortable: true },
  { key: 'projectName', label: 'Project', visible: true, sortable: true },
  { key: 'date', label: 'Date', visible: true, sortable: true },
  { key: 'hours', label: 'Hours', visible: true, sortable: true },
  { key: 'billable', label: 'Billable', visible: true, sortable: false },
  { key: 'status', label: 'Status', visible: true, sortable: true },
] as const;

export const TIMESHEET_WEEK_DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'] as const;
