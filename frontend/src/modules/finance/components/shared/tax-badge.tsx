'use client';

import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import type { TaxRate } from '../../types/finance-common';
import { formatTaxRate } from '../../utils/currency';

export interface TaxBadgeProps {
  taxRate: TaxRate;
  className?: string;
}

const typeColorMap: Record<string, string> = {
  inclusive: 'bg-sky-100 text-sky-800 border-sky-200 dark:bg-sky-900/30 dark:text-sky-300 dark:border-sky-800',
  exclusive: 'bg-amber-100 text-amber-800 border-amber-200 dark:bg-amber-900/30 dark:text-amber-300 dark:border-amber-800',
  compound: 'bg-purple-100 text-purple-800 border-purple-200 dark:bg-purple-900/30 dark:text-purple-300 dark:border-purple-800',
};

export function TaxBadge({ taxRate, className }: TaxBadgeProps) {
  const badgeType = taxRate.compound ? 'compound' : taxRate.type;
  const colorClass = typeColorMap[badgeType] ?? '';

  return (
    <Badge
      variant="outline"
      className={cn('font-medium', colorClass, className)}
    >
      {formatTaxRate(taxRate)}
    </Badge>
  );
}
