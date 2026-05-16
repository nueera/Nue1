'use client';

import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import type { PaymentStatus } from '../../types/finance-common';
import { PAYMENT_STATUS_CONFIG } from '../../constants/finance-common';

export interface PaymentStatusBadgeProps {
  status: PaymentStatus;
  className?: string;
}

const statusColorMap: Record<string, string> = {
  amber: 'bg-amber-100 text-amber-800 border-amber-200 dark:bg-amber-900/30 dark:text-amber-300 dark:border-amber-800',
  green: 'bg-emerald-100 text-emerald-800 border-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-300 dark:border-emerald-800',
  red: 'bg-red-100 text-red-800 border-red-200 dark:bg-red-900/30 dark:text-red-300 dark:border-red-800',
  purple: 'bg-gray-100 text-gray-700 border-gray-300 dark:bg-gray-800/50 dark:text-gray-300 dark:border-gray-600',
};

export function PaymentStatusBadge({ status, className }: PaymentStatusBadgeProps) {
  const config = PAYMENT_STATUS_CONFIG[status];
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
