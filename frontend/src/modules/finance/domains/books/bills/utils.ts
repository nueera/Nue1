import type { Bill } from './types';
import type { BillStatus } from '../../../types';
import { BILL_STATUS_CONFIG } from '../../../constants/finance-common';

export function getBillStatusLabel(status: BillStatus): string {
  return BILL_STATUS_CONFIG[status]?.label ?? status;
}

export function getBillStatusColor(status: BillStatus): string {
  const colorMap: Record<string, string> = {
    gray: 'bg-gray-100 text-gray-700 border-gray-300 dark:bg-gray-800/50 dark:text-gray-300 dark:border-gray-600',
    amber: 'bg-amber-100 text-amber-700 border-amber-200 dark:bg-amber-900/30 dark:text-amber-300 dark:border-amber-800',
    green: 'bg-emerald-100 text-emerald-700 border-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-300 dark:border-emerald-800',
    emerald: 'bg-emerald-100 text-emerald-800 border-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-300 dark:border-emerald-800',
    red: 'bg-red-100 text-red-700 border-red-200 dark:bg-red-900/30 dark:text-red-300 dark:border-red-800',
  };
  const color = BILL_STATUS_CONFIG[status]?.color ?? 'gray';
  return colorMap[color] ?? '';
}

export function isBillOverdue(bill: Bill): boolean {
  return new Date(bill.dueDate) < new Date() && bill.status !== 'paid';
}
