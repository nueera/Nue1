import type { Invoice } from './types';
import type { InvoiceStatus } from '../../../types';
import { INVOICE_STATUS_CONFIG } from '../../../constants/finance-common';

export function getInvoiceStatusLabel(status: InvoiceStatus): string {
  return INVOICE_STATUS_CONFIG[status]?.label ?? status;
}

export function getInvoiceStatusColor(status: InvoiceStatus): string {
  const colorMap: Record<string, string> = {
    gray: 'bg-gray-100 text-gray-700 border-gray-300 dark:bg-gray-800/50 dark:text-gray-300 dark:border-gray-600',
    blue: 'bg-sky-100 text-sky-800 border-sky-200 dark:bg-sky-900/30 dark:text-sky-300 dark:border-sky-800',
    cyan: 'bg-indigo-100 text-indigo-800 border-indigo-200 dark:bg-indigo-900/30 dark:text-indigo-300 dark:border-indigo-800',
    green: 'bg-emerald-100 text-emerald-800 border-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-300 dark:border-emerald-800',
    red: 'bg-red-100 text-red-800 border-red-200 dark:bg-red-900/30 dark:text-red-300 dark:border-red-800',
    slate: 'bg-slate-100 text-slate-600 border-slate-300 dark:bg-slate-800/50 dark:text-slate-400 dark:border-slate-600',
  };
  const color = INVOICE_STATUS_CONFIG[status]?.color ?? 'gray';
  return colorMap[color] ?? '';
}

export function isInvoiceOverdue(invoice: Invoice): boolean {
  return new Date(invoice.dueDate) < new Date() && invoice.status !== 'paid' && invoice.status !== 'void';
}

export function isInvoicePaid(invoice: Invoice): boolean {
  return invoice.status === 'paid' || invoice.balance.amount === 0;
}

export function getDaysOverdue(invoice: Invoice): number {
  if (!isInvoiceOverdue(invoice)) return 0;
  return Math.floor((Date.now() - new Date(invoice.dueDate).getTime()) / (1000 * 60 * 60 * 24));
}
