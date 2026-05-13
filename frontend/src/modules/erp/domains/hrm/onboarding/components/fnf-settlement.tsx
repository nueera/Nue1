'use client';

import type { FnFSettlement } from '../types';
import { StatCard } from '../../../../design-system/components/card/stat-card';
import { cn } from '@/lib/utils';
import { IndianRupee, Calendar, Clock, CheckCircle2, AlertCircle, FileText } from 'lucide-react';

interface FnFSettlementProps {
  settlement: FnFSettlement;
  employeeName?: string;
  isLoading?: boolean;
}

const STATUS_CONFIG: Record<FnFSettlement['status'], { icon: typeof CheckCircle2; label: string; colorClass: string; bgClass: string }> = {
  pending: { icon: Clock, label: 'Pending', colorClass: 'text-amber-500', bgClass: 'bg-amber-500/10' },
  processing: { icon: AlertCircle, label: 'Processing', colorClass: 'text-blue-500', bgClass: 'bg-blue-500/10' },
  paid: { icon: CheckCircle2, label: 'Paid', colorClass: 'text-green-500', bgClass: 'bg-green-500/10' },
};

function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function FnFSettlementView({ settlement, employeeName, isLoading }: FnFSettlementProps) {
  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 animate-pulse">
              <div className="h-4 bg-white/10 rounded w-1/2 mb-3" />
              <div className="h-8 bg-white/10 rounded w-1/3" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  const statusConfig = STATUS_CONFIG[settlement.status];
  const StatusIcon = statusConfig.icon;
  const noticeServedPct = settlement.noticePeriodDays > 0
    ? Math.min(100, Math.round((settlement.daysServed / settlement.noticePeriodDays) * 100))
    : 100;
  const grossEarnings = settlement.basicSalary + settlement.leaveEncashment;
  const netAmount = settlement.totalAmount;

  return (
    <div className="space-y-6">
      {/* Status Header */}
      <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-5">
        <div className="flex items-center justify-between">
          <div>
            {employeeName && (
              <p className="text-sm text-muted-foreground mb-1">{employeeName}</p>
            )}
            <h3 className="font-bold text-foreground" style={{ fontSize: 'var(--text-lg)' }}>Full & Final Settlement</h3>
            <p className="text-sm text-muted-foreground mt-1">
              Last Working Day: {settlement.lastWorkingDate}
            </p>
          </div>
          <div className={cn('flex items-center gap-2 px-4 py-2 rounded-xl', statusConfig.bgClass)}>
            <StatusIcon className={cn('h-4 w-4', statusConfig.colorClass)} strokeWidth={1.8} />
            <span className={cn('text-sm font-medium', statusConfig.colorClass)}>{statusConfig.label}</span>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          icon={IndianRupee}
          label="Total Settlement"
          value={formatCurrency(netAmount)}
          accent="text-green-500"
        />
        <StatCard
          icon={FileText}
          label="Basic Salary"
          value={formatCurrency(settlement.basicSalary)}
        />
        <StatCard
          icon={IndianRupee}
          label="Leave Encashment"
          value={formatCurrency(settlement.leaveEncashment)}
        />
        <StatCard
          icon={IndianRupee}
          label="Deductions"
          value={formatCurrency(settlement.deductions)}
          accent="text-red-500"
        />
      </div>

      {/* Settlement Breakdown */}
      <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
        <h4 className="font-semibold text-foreground mb-4" style={{ fontSize: 'var(--text-base)' }}>Settlement Breakdown</h4>

        <div className="space-y-3">
          {/* Earnings */}
          <div className="space-y-2">
            <p className="text-xs uppercase tracking-widest text-green-500 font-medium">Earnings</p>
            <div className="flex items-center justify-between px-4 py-2.5 rounded-lg bg-green-500/5 border border-green-500/10">
              <span className="text-sm text-foreground">Basic Salary (pro-rated)</span>
              <span className="text-sm font-medium text-foreground">{formatCurrency(settlement.basicSalary)}</span>
            </div>
            <div className="flex items-center justify-between px-4 py-2.5 rounded-lg bg-green-500/5 border border-green-500/10">
              <span className="text-sm text-foreground">Leave Encashment</span>
              <span className="text-sm font-medium text-foreground">{formatCurrency(settlement.leaveEncashment)}</span>
            </div>
            <div className="flex items-center justify-between px-4 py-2.5 rounded-lg bg-white/5 border border-white/5">
              <span className="text-sm font-medium text-foreground">Gross Earnings</span>
              <span className="text-sm font-bold text-green-500">{formatCurrency(grossEarnings)}</span>
            </div>
          </div>

          {/* Deductions */}
          <div className="space-y-2 pt-2">
            <p className="text-xs uppercase tracking-widest text-red-500 font-medium">Deductions</p>
            <div className="flex items-center justify-between px-4 py-2.5 rounded-lg bg-red-500/5 border border-red-500/10">
              <span className="text-sm text-foreground">Total Deductions</span>
              <span className="text-sm font-medium text-red-400">-{formatCurrency(settlement.deductions)}</span>
            </div>
          </div>

          {/* Net */}
          <div className="flex items-center justify-between px-4 py-3 rounded-xl bg-module-erp/5 border border-module-erp/20 mt-4">
            <span className="text-sm font-bold text-foreground">Net Settlement Amount</span>
            <span className="text-lg font-bold text-module-erp">{formatCurrency(netAmount)}</span>
          </div>
        </div>
      </div>

      {/* Notice Period Details */}
      <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
        <h4 className="font-semibold text-foreground mb-4" style={{ fontSize: 'var(--text-base)' }}>Notice Period</h4>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Notice Period</span>
            <span className="text-sm font-medium text-foreground">{settlement.noticePeriodDays} days</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Days Served</span>
            <span className="text-sm font-medium text-foreground">{settlement.daysServed} days</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Completion</span>
            <span className="text-sm font-medium text-foreground">{noticeServedPct}%</span>
          </div>
          <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
            <div
              className={cn(
                'h-full rounded-full transition-all duration-500',
                noticeServedPct >= 100 ? 'bg-green-500' : noticeServedPct >= 75 ? 'bg-amber-500' : 'bg-red-500',
              )}
              style={{ width: `${noticeServedPct}%` }}
            />
          </div>
          {settlement.daysServed < settlement.noticePeriodDays && (
            <p className="text-xs text-amber-500 flex items-center gap-1">
              <AlertCircle className="h-3 w-3" strokeWidth={1.8} />
              Shortfall of {settlement.noticePeriodDays - settlement.daysServed} days may result in additional deductions
            </p>
          )}
        </div>
      </div>

      {/* Payment Status */}
      <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
        <h4 className="font-semibold text-foreground mb-3" style={{ fontSize: 'var(--text-base)' }}>Payment Status</h4>
        <div className="flex items-center gap-3">
          {settlement.status === 'paid' ? (
            <>
              <CheckCircle2 className="h-5 w-5 text-green-500" strokeWidth={1.8} />
              <span className="text-sm text-green-500 font-medium">Settlement has been paid</span>
            </>
          ) : settlement.status === 'processing' ? (
            <>
              <AlertCircle className="h-5 w-5 text-blue-500" strokeWidth={1.8} />
              <span className="text-sm text-blue-500 font-medium">Settlement is being processed</span>
            </>
          ) : (
            <>
              <Clock className="h-5 w-5 text-amber-500" strokeWidth={1.8} />
              <span className="text-sm text-amber-500 font-medium">Settlement is pending approval</span>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
