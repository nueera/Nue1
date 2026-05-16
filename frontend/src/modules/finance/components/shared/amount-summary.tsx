'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { Separator } from '@/components/ui/separator';
import { MoneyDisplay } from './money-display';

export interface AmountSummaryProps {
  subtotal: number;
  taxTotal: number;
  total: number;
  discount?: number;
  currency?: string;
  className?: string;
}

export function AmountSummary({
  subtotal,
  taxTotal,
  total,
  discount = 0,
  currency = 'USD',
  className,
}: AmountSummaryProps) {
  return (
    <div className={cn('rounded-md border bg-card p-4 space-y-2', className)}>
      <div className="flex justify-between text-sm">
        <span className="text-muted-foreground">Subtotal</span>
        <MoneyDisplay amount={subtotal} currency={currency} size="sm" />
      </div>

      {discount > 0 && (
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Discount</span>
          <MoneyDisplay amount={-discount} currency={currency} size="sm" colorize="negative" />
        </div>
      )}

      <div className="flex justify-between text-sm">
        <span className="text-muted-foreground">Tax</span>
        <MoneyDisplay amount={taxTotal} currency={currency} size="sm" />
      </div>

      <Separator className="my-1" />

      <div className="flex justify-between items-baseline">
        <span className="font-semibold">Total</span>
        <MoneyDisplay
          amount={total}
          currency={currency}
          size="lg"
          colorize="neutral"
        />
      </div>
    </div>
  );
}
