// ============================================================================
// Timesheets — Utils
// ============================================================================

import type { TimeEntry, TimeEntryStatus } from './types';
import { TIME_ENTRY_STATUSES } from './constants';

export function getTimeEntryStatusLabel(status: TimeEntryStatus): string {
  return TIME_ENTRY_STATUSES.find(s => s.value === status)?.label ?? status;
}

export function getTimeEntryStatusColor(status: TimeEntryStatus): string {
  const map: Record<TimeEntryStatus, string> = {
    draft: 'bg-gray-100 text-gray-700 border-gray-300 dark:bg-gray-800/50 dark:text-gray-300 dark:border-gray-600',
    submitted: 'bg-sky-100 text-sky-800 border-sky-200 dark:bg-sky-900/30 dark:text-sky-300 dark:border-sky-800',
    approved: 'bg-emerald-100 text-emerald-700 border-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-300 dark:border-emerald-800',
    rejected: 'bg-red-100 text-red-700 border-red-200 dark:bg-red-900/30 dark:text-red-300 dark:border-red-800',
  };
  return map[status] ?? '';
}

export function calculateBillableAmount(entry: TimeEntry): number {
  if (!entry.billable) return 0;
  return entry.hours * entry.billableRate.amount;
}

export function formatHours(hours: number): string {
  const h = Math.floor(hours);
  const m = Math.round((hours - h) * 60);
  return m > 0 ? `${h}h ${m}m` : `${h}h`;
}
