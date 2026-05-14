// @ts-nocheck
import type { Estimate } from './types';
import type { EstimateStatus } from '../../../types';
import { ESTIMATE_STATUS_CONFIG } from '../../../constants/finance-common';

export function getEstimateStatusLabel(status: EstimateStatus): string {
  return ESTIMATE_STATUS_CONFIG[status]?.label ?? status;
}

export function getEstimateStatusColor(status: EstimateStatus): string {
  const colorMap: Record<string, string> = {
    gray: 'bg-gray-100 text-gray-700 border-gray-300 dark:bg-gray-800/50 dark:text-gray-300 dark:border-gray-600',
    blue: 'bg-sky-100 text-sky-800 border-sky-200 dark:bg-sky-900/30 dark:text-sky-300 dark:border-sky-800',
    green: 'bg-emerald-100 text-emerald-800 border-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-300 dark:border-emerald-800',
    red: 'bg-red-100 text-red-800 border-red-200 dark:bg-red-900/30 dark:text-red-300 dark:border-red-800',
    emerald: 'bg-emerald-100 text-emerald-800 border-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-300 dark:border-emerald-800',
    amber: 'bg-amber-100 text-amber-800 border-amber-200 dark:bg-amber-900/30 dark:text-amber-300 dark:border-amber-800',
  };
  const color = ESTIMATE_STATUS_CONFIG[status]?.color ?? 'gray';
  return colorMap[color] ?? '';
}

export function isEstimateExpired(estimate: Estimate): boolean {
  return new Date(estimate.expiryDate) < new Date() && estimate.status !== 'converted';
}

export function canConvertToInvoice(estimate: Estimate): boolean {
  return ['approved', 'sent'].includes(estimate.status);
}
