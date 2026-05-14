// @ts-nocheck
'use client';

import { cn } from '@/lib/utils';
import { formatCurrency, calculateBudgetUtilization, getBudgetStatusColor, getBudgetStatusLabel } from '@/modules/marketing/utils';
import type { BudgetInfo } from '@/modules/marketing/utils';

export interface BudgetProgressBarProps {
  budget: BudgetInfo;
  showLabels?: boolean;
  className?: string;
}

export function BudgetProgressBar({ budget, showLabels = true, className }: BudgetProgressBarProps) {
  const utilization = calculateBudgetUtilization(budget);
  const statusColor = getBudgetStatusColor(
    utilization >= 100 ? 'exhausted' : utilization >= 90 ? 'over_budget' : utilization >= 60 ? 'on_track' : 'under_budget'
  );
  const statusLabel = getBudgetStatusLabel(
    utilization >= 100 ? 'exhausted' : utilization >= 90 ? 'over_budget' : utilization >= 60 ? 'on_track' : 'under_budget'
  );

  const barColor =
    utilization >= 100
      ? 'bg-red-500'
      : utilization >= 90
        ? 'bg-amber-500'
        : utilization >= 60
          ? 'bg-blue-500'
          : 'bg-emerald-500';

  return (
    <div className={cn('space-y-2', className)}>
      {showLabels && (
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-foreground">Budget</span>
            <span className={cn('text-xs font-medium', statusColor)}>{statusLabel}</span>
          </div>
          <span className="text-xs text-muted-foreground tabular-nums">{utilization}% used</span>
        </div>
      )}

      {/* Progress bar */}
      <div className="relative h-2.5 rounded-full bg-muted overflow-hidden">
        {/* Planned (full allocation) marker */}
        <div
          className={cn('h-full rounded-full transition-all duration-500', barColor)}
          style={{ width: `${Math.min(utilization, 100)}%` }}
        />
        {utilization > 100 && (
          <div
            className="absolute top-0 right-0 h-full bg-red-400 rounded-r-full"
            style={{ width: `${utilization - 100}%` }}
          />
        )}
      </div>

      {showLabels && (
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>
            Spent: <span className="font-medium text-foreground">{formatCurrency(budget.spent, budget.currency)}</span>
          </span>
          <span>
            of {formatCurrency(budget.allocated, budget.currency)}
          </span>
        </div>
      )}
    </div>
  );
}
