'use client';

import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import type { InvoiceStatus } from '../../types/finance-common';
import { INVOICE_STATUS_CONFIG } from '../../constants/finance-common';

export interface InvoiceStatusBadgeProps {
  status: InvoiceStatus;
  className?: string;
}

const statusColorMap: Record<string, string> = {
  gray: 'bg-gray-100 text-gray-700 border-gray-300 dark:bg-gray-800/50 dark:text-gray-300 dark:border-gray-600',
  blue: 'bg-sky-100 text-sky-800 border-sky-200 dark:bg-sky-900/30 dark:text-sky-300 dark:border-sky-800',
  cyan: 'bg-indigo-100 text-indigo-800 border-indigo-200 dark:bg-indigo-900/30 dark:text-indigo-300 dark:border-indigo-800',
  green: 'bg-emerald-100 text-emerald-800 border-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-300 dark:border-emerald-800',
  red: 'bg-red-100 text-red-800 border-red-200 dark:bg-red-900/30 dark:text-red-300 dark:border-red-800',
  slate: 'bg-slate-100 text-slate-600 border-slate-300 dark:bg-slate-800/50 dark:text-slate-400 dark:border-slate-600',
};

export function InvoiceStatusBadge({ status, className }: InvoiceStatusBadgeProps) {
  const config = INVOICE_STATUS_CONFIG[status];
  const colorClass = statusColorMap[config.color] ?? '';

  return (
    <Badge
      variant="outline"
      className={cn('font-medium', colorClass, className)}
    >
      {config.label}
    </Badge>
  );
}
