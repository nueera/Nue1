'use client';

import { Calculator, TrendingDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { fmtCurrency } from '../payroll.utils';

interface TaxComputationProps {
  grossIncome: number;
  deductions: Array<{ label: string; amount: number }>;
  taxableIncome: number;
  taxSlabs: Array<{ range: string; rate: number; amount: number }>;
  totalTax: number;
  regime: 'old' | 'new';
  className?: string;
}

export function TaxComputation({
  grossIncome,
  deductions,
  taxableIncome,
  taxSlabs,
  totalTax,
  regime,
  className,
}: TaxComputationProps) {
  const totalDeductions = deductions.reduce((sum, d) => sum + d.amount, 0);

  return (
    <div className={cn('bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-4 sm:p-6 space-y-5', className)}>
      <div className="flex items-center gap-2">
        <Calculator className="h-5 w-5 text-module-erp" strokeWidth={1.8} />
        <h3 className="font-semibold text-foreground text-base">Tax Computation</h3>
        <span className="text-xs px-2 py-0.5 rounded-full bg-module-erp/15 text-module-erp font-medium capitalize">
          {regime} regime
        </span>
      </div>

      {/* Gross Income */}
      <div className="bg-white/5 border border-white/10 rounded-xl p-4">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-foreground">Gross Annual Income</span>
          <span className="text-lg font-bold text-foreground">{fmtCurrency(grossIncome)}</span>
        </div>
      </div>

      {/* Deductions */}
      <div className="space-y-2">
        <h4 className="text-sm font-medium text-foreground flex items-center gap-2">
          <TrendingDown className="h-4 w-4 text-red-400" strokeWidth={1.8} />
          Deductions
        </h4>
        <div className="bg-white/5 border border-white/10 rounded-xl overflow-hidden">
          {deductions.map((deduction, idx) => (
            <div
              key={idx}
              className={cn(
                'flex items-center justify-between px-4 py-2.5 text-sm',
                idx !== deductions.length - 1 && 'border-b border-white/5',
              )}
            >
              <span className="text-foreground/80">{deduction.label}</span>
              <span className="text-red-400 font-medium">-{fmtCurrency(deduction.amount)}</span>
            </div>
          ))}
          <div className="flex items-center justify-between px-4 py-3 bg-red-400/5 border-t border-red-400/20">
            <span className="text-sm font-semibold text-red-400">Total Deductions</span>
            <span className="text-sm font-bold text-red-400">-{fmtCurrency(totalDeductions)}</span>
          </div>
        </div>
      </div>

      {/* Taxable Income */}
      <div className="bg-module-erp/5 border border-module-erp/20 rounded-xl p-4 flex items-center justify-between">
        <span className="text-sm font-semibold text-foreground">Taxable Income</span>
        <span className="text-lg font-bold text-module-erp">{fmtCurrency(taxableIncome)}</span>
      </div>

      {/* Tax Slabs */}
      <div className="space-y-2">
        <h4 className="text-sm font-medium text-foreground">Tax Slab Breakdown</h4>
        <div className="bg-white/5 border border-white/10 rounded-xl overflow-hidden">
          <div className="grid grid-cols-3 gap-4 px-4 py-2.5 border-b border-white/10 text-xs text-muted-foreground font-medium">
            <span>Income Range</span>
            <span className="text-center">Rate</span>
            <span className="text-right">Tax</span>
          </div>
          {taxSlabs.map((slab, idx) => (
            <div
              key={idx}
              className={cn(
                'grid grid-cols-3 gap-4 px-4 py-2.5 text-sm',
                idx !== taxSlabs.length - 1 && 'border-b border-white/5',
                slab.amount === 0 && 'opacity-40',
              )}
            >
              <span className="text-foreground/80">{slab.range}</span>
              <span className="text-center text-foreground/80">{(slab.rate * 100).toFixed(0)}%</span>
              <span className="text-right font-medium text-foreground">{fmtCurrency(slab.amount)}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Total Tax */}
      <div className="bg-red-400/10 border border-red-400/20 rounded-xl p-4 flex items-center justify-between">
        <span className="text-base font-bold text-foreground">Total Tax Liability</span>
        <span className="text-xl font-bold text-red-400">{fmtCurrency(totalTax)}</span>
      </div>
    </div>
  );
}
