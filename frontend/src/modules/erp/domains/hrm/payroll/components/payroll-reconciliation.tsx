'use client';

import { AlertTriangle, CheckCircle2, ArrowRightLeft } from 'lucide-react';
import { cn } from '@/lib/utils';
import { fmtCurrency } from '../payroll.utils';

interface ReconciliationItem {
  label: string;
  payrollAmount: number;
  bankAmount: number;
  difference: number;
}

interface PayrollReconciliationProps {
  month: string;
  items: ReconciliationItem[];
  totalPayroll: number;
  totalBank: number;
  className?: string;
}

export function PayrollReconciliation({ month, items, totalPayroll, totalBank, className }: PayrollReconciliationProps) {
  const totalDifference = totalPayroll - totalBank;
  const isReconciled = Math.abs(totalDifference) < 1;

  return (
    <div className={cn('bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-4 sm:p-6 space-y-5', className)}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <ArrowRightLeft className="h-5 w-5 text-module-erp" strokeWidth={1.8} />
          <h3 className="font-semibold text-foreground text-base">Payroll Reconciliation — {month}</h3>
        </div>
        <div className={cn(
          'flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium',
          isReconciled ? 'bg-emerald-500/15 text-emerald-500' : 'bg-amber-500/15 text-amber-500',
        )}>
          {isReconciled ? (
            <>
              <CheckCircle2 className="h-3.5 w-3.5" strokeWidth={1.8} />
              Reconciled
            </>
          ) : (
            <>
              <AlertTriangle className="h-3.5 w-3.5" strokeWidth={1.8} />
              Variance Found
            </>
          )}
        </div>
      </div>

      {/* Comparison Table */}
      <div className="bg-white/5 border border-white/10 rounded-xl overflow-hidden">
        <div className="grid grid-cols-4 gap-4 px-4 py-2.5 border-b border-white/10 text-xs text-muted-foreground font-medium">
          <span>Category</span>
          <span className="text-right">Payroll</span>
          <span className="text-right">Bank Transfer</span>
          <span className="text-right">Difference</span>
        </div>
        {items.map((item, idx) => (
          <div
            key={idx}
            className={cn(
              'grid grid-cols-4 gap-4 px-4 py-2.5 text-sm',
              idx !== items.length - 1 && 'border-b border-white/5',
            )}
          >
            <span className="text-foreground/80">{item.label}</span>
            <span className="text-right text-foreground">{fmtCurrency(item.payrollAmount)}</span>
            <span className="text-right text-foreground">{fmtCurrency(item.bankAmount)}</span>
            <span className={cn(
              'text-right font-medium',
              Math.abs(item.difference) < 1 ? 'text-emerald-500' : 'text-red-400',
            )}>
              {Math.abs(item.difference) < 1 ? '✓' : fmtCurrency(item.difference)}
            </span>
          </div>
        ))}
      </div>

      {/* Totals */}
      <div className={cn(
        'rounded-xl p-4 flex items-center justify-between',
        isReconciled ? 'bg-emerald-500/10 border border-emerald-500/20' : 'bg-amber-500/10 border border-amber-500/20',
      )}>
        <div className="space-y-1">
          <div className="flex items-center gap-4 text-sm">
            <span className="text-muted-foreground">Total Payroll: <span className="text-foreground font-medium">{fmtCurrency(totalPayroll)}</span></span>
            <span className="text-muted-foreground">Total Bank: <span className="text-foreground font-medium">{fmtCurrency(totalBank)}</span></span>
          </div>
          <p className={cn(
            'text-sm font-bold',
            isReconciled ? 'text-emerald-500' : 'text-amber-500',
          )}>
            {isReconciled ? 'All transactions reconciled successfully' : `Variance: ${fmtCurrency(Math.abs(totalDifference))}`}
          </p>
        </div>
      </div>
    </div>
  );
}

export type { ReconciliationItem };
