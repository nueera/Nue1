'use client';

import { BookOpen } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ACCRUAL_FREQUENCY_LABELS } from '../constants';
import type { LeavePolicy, LeaveType } from '../types';

interface LeavePolicyProps {
  policies: LeavePolicy[];
  className?: string;
}

const LEAVE_DESCRIPTIONS: Record<LeaveType, string> = {
  annual: 'Earned leave that accrues based on tenure. Can be carried forward subject to company policy.',
  sick: 'Medical leave for illness, doctor visits, or recovery. Medical certificate may be required beyond 2 days.',
  personal: 'Leave for personal errands, family events, or any personal matters not covered by other types.',
  maternity: 'Statutory maternity leave as per labor law. Available to female employees. Full pay during the period.',
  paternity: 'Paternity leave for new fathers. Available within 6 months of child birth.',
  unpaid: 'Leave without pay for extended personal needs when all other leave types are exhausted.',
};

const LEAVE_COLORS: Record<LeaveType, string> = {
  annual: 'border-emerald-500/30 bg-emerald-500/5',
  sick: 'border-rose-500/30 bg-rose-500/5',
  personal: 'border-amber-500/30 bg-amber-500/5',
  maternity: 'border-violet-500/30 bg-violet-500/5',
  paternity: 'border-sky-500/30 bg-sky-500/5',
  unpaid: 'border-zinc-500/30 bg-zinc-500/5',
};

const LEAVE_ACCENT: Record<LeaveType, string> = {
  annual: 'text-emerald-500',
  sick: 'text-rose-500',
  personal: 'text-amber-500',
  maternity: 'text-violet-500',
  paternity: 'text-sky-500',
  unpaid: 'text-zinc-500',
};

export function LeavePolicy({ policies, className }: LeavePolicyProps) {
  if (policies.length === 0) {
    return (
      <div className={cn('bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 text-center', className)}>
        <BookOpen className="h-8 w-8 text-muted-foreground/20 mx-auto mb-3" strokeWidth={1.5} />
        <p className="text-sm text-muted-foreground">No leave policies configured</p>
      </div>
    );
  }

  return (
    <div className={cn('bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-4 sm:p-6 space-y-4', className)}>
      <div className="flex items-center gap-2 mb-2">
        <BookOpen className="h-5 w-5 text-module-erp" strokeWidth={1.8} />
        <h3 className="font-semibold text-foreground text-base">Leave Policies</h3>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {policies.map((policy) => {
          const leaveType = policy.leaveType as LeaveType;
          const color = LEAVE_COLORS[leaveType] || LEAVE_COLORS.unpaid;
          const accent = LEAVE_ACCENT[leaveType] || LEAVE_ACCENT.unpaid;
          const description = LEAVE_DESCRIPTIONS[leaveType] || 'Leave policy details.';

          return (
            <div
              key={policy.id}
              className={cn('rounded-xl border p-4 space-y-3 hover:bg-white/10 transition-all duration-200', color)}
            >
              <div className="flex items-center justify-between">
                <h4 className={cn('font-semibold text-sm capitalize', accent)}>{leaveType} Leave</h4>
                <span className="text-xs text-muted-foreground">
                  {policy.totalDays} days/year
                </span>
              </div>

              <p className="text-xs text-foreground/70 leading-relaxed">{description}</p>

              <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground">
                <span>Accrual: <span className="text-foreground font-medium">{ACCRUAL_FREQUENCY_LABELS[policy.accrualFrequency]}</span></span>
                <span>Carry Forward: <span className="text-foreground font-medium">{policy.carryForward ? `Yes (max ${policy.maxCarryForward})` : 'No'}</span></span>
                <span>Probation: <span className="text-foreground font-medium">{policy.probationPeriod} months</span></span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
