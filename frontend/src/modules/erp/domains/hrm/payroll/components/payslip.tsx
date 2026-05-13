'use client';

import { Download, Printer } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { fmtCurrency } from '../payroll.utils';
import type { Payslip as PayslipType } from '../types';

interface PayslipProps {
  payslip: PayslipType;
  onDownload?: () => void;
  onPrint?: () => void;
  className?: string;
}

export function Payslip({ payslip, onDownload, onPrint, className }: PayslipProps) {
  return (
    <div className={cn('bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-4 sm:p-6 space-y-6', className)}>
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h3 className="font-semibold text-foreground text-base">Payslip</h3>
          <p className="text-sm text-muted-foreground mt-0.5">{payslip.employeeName}</p>
          <p className="text-xs text-muted-foreground">{payslip.month}</p>
        </div>
        <div className="flex items-center gap-1">
          {onPrint && (
            <Button variant="ghost" size="icon" className="h-8 w-8 press-scale" onClick={onPrint}>
              <Printer className="h-4 w-4" strokeWidth={1.8} />
            </Button>
          )}
          {onDownload && (
            <Button variant="ghost" size="icon" className="h-8 w-8 press-scale" onClick={onDownload}>
              <Download className="h-4 w-4" strokeWidth={1.8} />
            </Button>
          )}
        </div>
      </div>

      {/* Earnings */}
      <div className="space-y-3">
        <h4 className="text-sm font-semibold text-emerald-500 flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-emerald-500" />
          Earnings
        </h4>
        <div className="bg-white/5 border border-white/10 rounded-xl overflow-hidden">
          {payslip.earnings.map((item, idx) => (
            <div
              key={idx}
              className={cn(
                'flex items-center justify-between px-4 py-2.5 text-sm',
                idx !== payslip.earnings.length - 1 && 'border-b border-white/5',
              )}
            >
              <span className="text-foreground/80">{item.label}</span>
              <span className="font-medium text-foreground">{fmtCurrency(item.amount)}</span>
            </div>
          ))}
          <div className="flex items-center justify-between px-4 py-3 bg-emerald-500/5 border-t border-emerald-500/20">
            <span className="text-sm font-semibold text-emerald-500">Gross Earnings</span>
            <span className="text-sm font-bold text-emerald-500">{fmtCurrency(payslip.grossEarnings)}</span>
          </div>
        </div>
      </div>

      {/* Deductions */}
      <div className="space-y-3">
        <h4 className="text-sm font-semibold text-red-400 flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-red-400" />
          Deductions
        </h4>
        <div className="bg-white/5 border border-white/10 rounded-xl overflow-hidden">
          {payslip.deductions.map((item, idx) => (
            <div
              key={idx}
              className={cn(
                'flex items-center justify-between px-4 py-2.5 text-sm',
                idx !== payslip.deductions.length - 1 && 'border-b border-white/5',
              )}
            >
              <span className="text-foreground/80">{item.label}</span>
              <span className="font-medium text-red-400">-{fmtCurrency(item.amount)}</span>
            </div>
          ))}
          <div className="flex items-center justify-between px-4 py-3 bg-red-400/5 border-t border-red-400/20">
            <span className="text-sm font-semibold text-red-400">Total Deductions</span>
            <span className="text-sm font-bold text-red-400">-{fmtCurrency(payslip.totalDeductions)}</span>
          </div>
        </div>
      </div>

      {/* Net Pay */}
      <div className="bg-module-erp/10 border border-module-erp/20 rounded-xl p-4 flex items-center justify-between">
        <span className="text-base font-bold text-foreground">Net Pay</span>
        <span className="text-xl font-bold text-module-erp">{fmtCurrency(payslip.netPay)}</span>
      </div>
    </div>
  );
}
