'use client';

import { CheckCircle2, Clock } from 'lucide-react';
import type { RepaymentSchedule } from '../types';

interface RepaymentScheduleProps {
  schedule: RepaymentSchedule[];
  showAll?: boolean;
}

export function RepaymentSchedule({ schedule, showAll = false }: RepaymentScheduleProps) {
  const displaySchedule = showAll ? schedule : schedule.slice(0, 12);

  if (schedule.length === 0) {
    return (
      <div className="py-8 text-center text-sm text-muted-foreground/50">
        No repayment schedule available
      </div>
    );
  }

  return (
    <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/10">
              <th className="text-left text-[10px] font-medium text-muted-foreground uppercase tracking-wider px-4 py-2.5">Month</th>
              <th className="text-right text-[10px] font-medium text-muted-foreground uppercase tracking-wider px-4 py-2.5">EMI</th>
              <th className="text-right text-[10px] font-medium text-muted-foreground uppercase tracking-wider px-4 py-2.5">Principal</th>
              <th className="text-right text-[10px] font-medium text-muted-foreground uppercase tracking-wider px-4 py-2.5">Interest</th>
              <th className="text-right text-[10px] font-medium text-muted-foreground uppercase tracking-wider px-4 py-2.5">Balance</th>
              <th className="text-left text-[10px] font-medium text-muted-foreground uppercase tracking-wider px-4 py-2.5">Due Date</th>
              <th className="text-center text-[10px] font-medium text-muted-foreground uppercase tracking-wider px-4 py-2.5">Status</th>
            </tr>
          </thead>
          <tbody>
            {displaySchedule.map((row) => (
              <tr
                key={row.month}
                className={`border-b border-white/5 transition-all duration-200 ${
                  row.isPaid ? 'bg-emerald-500/[0.03]' : 'hover:bg-white/5'
                }`}
              >
                <td className="px-4 py-2.5 text-xs text-foreground">{row.month}</td>
                <td className="px-4 py-2.5 text-xs text-right font-medium text-foreground">₹{row.emi.toLocaleString('en-IN')}</td>
                <td className="px-4 py-2.5 text-xs text-right text-foreground">₹{row.principal.toLocaleString('en-IN')}</td>
                <td className="px-4 py-2.5 text-xs text-right text-amber-400">₹{row.interest.toLocaleString('en-IN')}</td>
                <td className="px-4 py-2.5 text-xs text-right text-muted-foreground">₹{row.balance.toLocaleString('en-IN')}</td>
                <td className="px-4 py-2.5 text-xs text-muted-foreground">{row.dueDate}</td>
                <td className="px-4 py-2.5 text-center">
                  {row.isPaid ? (
                    <span className="inline-flex items-center gap-1 px-1.5 py-0.5 text-[9px] font-medium bg-emerald-500/10 text-emerald-400 rounded border border-emerald-500/15">
                      <CheckCircle2 className="h-2.5 w-2.5" />Paid
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 px-1.5 py-0.5 text-[9px] font-medium bg-amber-500/10 text-amber-400 rounded border border-amber-500/15">
                      <Clock className="h-2.5 w-2.5" />Due
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {!showAll && schedule.length > 12 && (
        <div className="px-4 py-3 border-t border-white/5 text-center">
          <p className="text-[10px] text-muted-foreground">
            Showing 12 of {schedule.length} installments
          </p>
        </div>
      )}
    </div>
  );
}
