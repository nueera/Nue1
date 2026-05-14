// @ts-nocheck
import type { RecurringInvoice, RecurringFrequency, RecurringStatus } from './types';
import { RECURRING_FREQUENCIES, RECURRING_STATUSES } from './constants';

export function getFrequencyLabel(freq: RecurringFrequency): string {
  return RECURRING_FREQUENCIES.find(f => f.value === freq)?.label ?? freq;
}

export function getRecurringStatusLabel(status: RecurringStatus): string {
  return RECURRING_STATUSES.find(s => s.value === status)?.label ?? status;
}

export function getRecurringStatusColor(status: RecurringStatus): string {
  const map: Record<RecurringStatus, string> = {
    active: 'bg-emerald-100 text-emerald-700 border-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-300 dark:border-emerald-800',
    paused: 'bg-amber-100 text-amber-700 border-amber-200 dark:bg-amber-900/30 dark:text-amber-300 dark:border-amber-800',
    expired: 'bg-gray-100 text-gray-700 border-gray-300 dark:bg-gray-800/50 dark:text-gray-300 dark:border-gray-600',
  };
  return map[status] ?? '';
}

export function isRecurringActive(ri: RecurringInvoice): boolean {
  return ri.status === 'active';
}
