'use client';

import { cn } from '@/lib/utils';
import type { LeaveBalance, LeaveType } from '../types';

interface LeaveBalanceCardProps {
  balances: LeaveBalance[];
  className?: string;
}

const LEAVE_COLORS: Record<LeaveType, { bar: string; bg: string; text: string }> = {
  annual: { bar: 'bg-emerald-500', bg: 'bg-emerald-500/10', text: 'text-emerald-500' },
  sick: { bar: 'bg-rose-500', bg: 'bg-rose-500/10', text: 'text-rose-500' },
  personal: { bar: 'bg-amber-500', bg: 'bg-amber-500/10', text: 'text-amber-500' },
  maternity: { bar: 'bg-violet-500', bg: 'bg-violet-500/10', text: 'text-violet-500' },
  paternity: { bar: 'bg-sky-500', bg: 'bg-sky-500/10', text: 'text-sky-500' },
  unpaid: { bar: 'bg-zinc-500', bg: 'bg-zinc-500/10', text: 'text-zinc-500' },
};

const LEAVE_LABELS: Record<LeaveType, string> = {
  annual: 'Annual Leave',
  sick: 'Sick Leave',
  personal: 'Personal Leave',
  maternity: 'Maternity Leave',
  paternity: 'Paternity Leave',
  unpaid: 'Unpaid Leave',
};

export function LeaveBalanceCard({ balances, className }: LeaveBalanceCardProps) {
  if (balances.length === 0) {
    return (
      <div className={cn('bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 text-center', className)}>
        <p className="text-sm text-muted-foreground">No leave balance data available</p>
      </div>
    );
  }

  return (
    <div className={cn('bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-4 sm:p-6 space-y-5', className)}>
      <h3 className="font-semibold text-foreground text-base">Leave Balance</h3>

      <div className="space-y-4">
        {balances.map((balance) => {
          const colors = LEAVE_COLORS[balance.leaveType] || LEAVE_COLORS.unpaid;
          const usedPct = balance.total > 0 ? (balance.used / balance.total) * 100 : 0;
          const pendingPct = balance.total > 0 ? (balance.pending / balance.total) * 100 : 0;
          const availablePct = Math.max(0, 100 - usedPct - pendingPct);

          return (
            <div key={balance.leaveType} className="space-y-2.5">
              <div className="flex items-center justify-between">
                <span className={cn('text-sm font-medium capitalize', colors.text)}>
                  {LEAVE_LABELS[balance.leaveType] || balance.leaveType}
                </span>
                <span className="text-xs text-muted-foreground">
                  <span className="text-module-erp font-semibold">{balance.available}</span> / {balance.total} available
                </span>
              </div>

              {/* Stacked progress bar */}
              <div className="h-2.5 w-full bg-white/5 rounded-full overflow-hidden flex">
                {usedPct > 0 && (
                  <div
                    className={cn('h-full rounded-l-full transition-all duration-500', colors.bar)}
                    style={{ width: `${usedPct}%` }}
                    title={`Used: ${balance.used}`}
                  />
                )}
                {pendingPct > 0 && (
                  <div
                    className="h-full bg-amber-400/60 transition-all duration-500"
                    style={{ width: `${pendingPct}%` }}
                    title={`Pending: ${balance.pending}`}
                  />
                )}
                {availablePct > 0 && (
                  <div
                    className="h-full bg-white/10 rounded-r-full transition-all duration-500"
                    style={{ width: `${availablePct}%` }}
                    title={`Available: ${balance.available}`}
                  />
                )}
              </div>

              {/* Legend */}
              <div className="flex items-center gap-4 text-xs text-muted-foreground">
                <span className="flex items-center gap-1">
                  <span className={cn('h-2 w-2 rounded-full', colors.bar)} /> Used: {balance.used}
                </span>
                <span className="flex items-center gap-1">
                  <span className="h-2 w-2 rounded-full bg-amber-400/60" /> Pending: {balance.pending}
                </span>
                <span className="flex items-center gap-1">
                  <span className="h-2 w-2 rounded-full bg-white/10" /> Available: {balance.available}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
