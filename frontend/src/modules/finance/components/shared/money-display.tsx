// @ts-nocheck
'use client';

import { cn } from '@/lib/utils';
import { formatAmount, getCurrencySymbol, getCurrencyPrecision } from '../../utils/currency';

export interface MoneyDisplayProps {
  amount: number;
  currency?: string;
  size?: 'sm' | 'md' | 'lg';
  colorize?: 'positive' | 'negative' | 'neutral';
  className?: string;
}

const sizeClasses: Record<NonNullable<MoneyDisplayProps['size']>, string> = {
  sm: 'text-sm',
  md: 'text-base',
  lg: 'text-xl font-semibold',
};

const colorClasses: Record<NonNullable<MoneyDisplayProps['colorize']>, string> = {
  positive: 'text-emerald-600 dark:text-emerald-400',
  negative: 'text-red-600 dark:text-red-400',
  neutral: 'text-foreground',
};

export function MoneyDisplay({
  amount,
  currency = 'USD',
  size = 'md',
  colorize = 'neutral',
  className,
}: MoneyDisplayProps) {
  const formatted = formatAmount(amount, currency);

  const resolvedColor = (() => {
    if (colorize === 'positive' && amount >= 0) return 'positive';
    if (colorize === 'positive' && amount < 0) return 'negative';
    if (colorize === 'negative' && amount < 0) return 'negative';
    if (colorize === 'negative' && amount >= 0) return 'positive';
    return colorize;
  })();

  return (
    <span
      className={cn(
        'tabular-nums tracking-tight',
        sizeClasses[size],
        colorClasses[resolvedColor],
        className
      )}
    >
      {formatted}
    </span>
  );
}
