'use client';

import { TrendingDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { fmtCurrency } from '../payroll.utils';

interface DeductionItem {
  label: string;
  amount: number;
  percentage: number;
  color: string;
}

interface DeductionSummaryProps {
  deductions: DeductionItem[];
  totalDeductions: number;
  grossPayroll: number;
  className?: string;
}

export function DeductionSummary({ deductions, totalDeductions, grossPayroll, className }: DeductionSummaryProps) {
  const deductionPct = grossPayroll > 0 ? ((totalDeductions / grossPayroll) * 100).toFixed(1) : '0';

  return (
    <div className={cn('bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-4 sm:p-6 space-y-5', className)}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <TrendingDown className="h-5 w-5 text-red-400" strokeWidth={1.8} />
          <h3 className="font-semibold text-foreground text-base">Deduction Summary</h3>
        </div>
        <span className="text-xs text-muted-foreground">
          {deductionPct}% of gross payroll
        </span>
      </div>

      {/* Deduction Items */}
      <div className="space-y-3">
        {deductions.map((deduction) => (
          <div key={deduction.label} className="space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="text-sm text-foreground/80">{deduction.label}</span>
              <div className="flex items-center gap-3">
                <span className="text-xs text-muted-foreground">{deduction.percentage.toFixed(1)}%</span>
                <span className="text-sm font-medium text-red-400">{fmtCurrency(deduction.amount)}</span>
              </div>
            </div>
            {/* Progress bar */}
            <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
              <div
                className={cn('h-full rounded-full transition-all duration-500', deduction.color)}
                style={{ width: `${Math.min(deduction.percentage, 100)}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Total */}
      <div className="bg-red-400/10 border border-red-400/20 rounded-xl p-4 flex items-center justify-between">
        <span className="text-sm font-semibold text-foreground">Total Deductions</span>
        <span className="text-lg font-bold text-red-400">{fmtCurrency(totalDeductions)}</span>
      </div>

      {/* Breakdown pie-like visualization */}
      <div className="flex flex-wrap gap-2 pt-2">
        {deductions.map((deduction) => (
          <span key={deduction.label} className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <span className={cn('h-2.5 w-2.5 rounded-full', deduction.color)} />
            {deduction.label}: {fmtCurrency(deduction.amount)}
          </span>
        ))}
      </div>
    </div>
  );
}

export type { DeductionItem };
