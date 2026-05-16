import type { Payment, PaymentMethod, PaymentStatus } from './types';
import { PAYMENT_METHODS, PAYMENT_STATUSES } from './constants';

export function getPaymentMethodLabel(method: PaymentMethod): string {
  return PAYMENT_METHODS.find(m => m.value === method)?.label ?? method;
}

export function getPaymentStatusLabel(status: PaymentStatus): string {
  return PAYMENT_STATUSES.find(s => s.value === status)?.label ?? status;
}

export function getPaymentStatusColor(status: PaymentStatus): string {
  const map: Record<PaymentStatus, string> = {
    pending: 'bg-amber-100 text-amber-700 border-amber-200 dark:bg-amber-900/30 dark:text-amber-300 dark:border-amber-800',
    completed: 'bg-emerald-100 text-emerald-700 border-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-300 dark:border-emerald-800',
    failed: 'bg-red-100 text-red-700 border-red-200 dark:bg-red-900/30 dark:text-red-300 dark:border-red-800',
    refunded: 'bg-purple-100 text-purple-700 border-purple-200 dark:bg-purple-900/30 dark:text-purple-300 dark:border-purple-800',
  };
  return map[status] ?? '';
}
