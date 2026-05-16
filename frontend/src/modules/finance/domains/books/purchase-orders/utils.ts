import type { PurchaseOrder } from './types';
import type { OrderStatus } from '../../../types';
import { ORDER_STATUS_CONFIG } from '../../../constants/finance-common';

export function getPOStatusLabel(status: OrderStatus): string {
  return ORDER_STATUS_CONFIG[status]?.label ?? status;
}

export function getPOStatusColor(status: OrderStatus): string {
  const colorMap: Record<string, string> = {
    amber: 'bg-amber-100 text-amber-700 border-amber-200 dark:bg-amber-900/30 dark:text-amber-300 dark:border-amber-800',
    blue: 'bg-sky-100 text-sky-800 border-sky-200 dark:bg-sky-900/30 dark:text-sky-300 dark:border-sky-800',
    cyan: 'bg-cyan-100 text-cyan-800 border-cyan-200 dark:bg-cyan-900/30 dark:text-cyan-300 dark:border-cyan-800',
    purple: 'bg-purple-100 text-purple-800 border-purple-200 dark:bg-purple-900/30 dark:text-purple-300 dark:border-purple-800',
    green: 'bg-emerald-100 text-emerald-800 border-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-300 dark:border-emerald-800',
    red: 'bg-red-100 text-red-800 border-red-200 dark:bg-red-900/30 dark:text-red-300 dark:border-red-800',
  };
  const color = ORDER_STATUS_CONFIG[status]?.color ?? 'gray';
  return colorMap[color] ?? '';
}
