'use client';

import { DollarSign, Building2, AlertTriangle, Clock } from 'lucide-react';
import { ChartCard } from '../../../../shared/components/chart-card';
import { EmptyState } from '../../../../shared/components/empty-state';

interface AdvanceRecord {
  id: string;
  employeeName: string;
  department: string;
  amount: number;
  remainingAmount: number;
  daysOutstanding: number;
  status: 'active' | 'completed' | 'defaulted';
  issueDate: string;
}

interface AdvanceSummaryReportProps {
  advances: AdvanceRecord[];
  isLoading?: boolean;
}

export function AdvanceSummaryReport({ advances, isLoading }: AdvanceSummaryReportProps) {
  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="grid grid-cols-4 gap-3">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-4 animate-pulse">
              <div className="h-6 w-16 bg-white/10 rounded mb-2" />
              <div className="h-3 w-24 bg-white/10 rounded" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (advances.length === 0) {
    return <EmptyState icon={DollarSign} title="No advance data" description="Outstanding advances will appear here" />;
  }

  const totalOutstanding = advances.reduce((sum, a) => sum + a.remainingAmount, 0);
  const activeAdvances = advances.filter((a) => a.status === 'active');
  const defaultedAdvances = advances.filter((a) => a.status === 'defaulted');

  // Aging analysis
  const aging30 = advances.filter((a) => a.daysOutstanding <= 30);
  const aging60 = advances.filter((a) => a.daysOutstanding > 30 && a.daysOutstanding <= 60);
  const aging90 = advances.filter((a) => a.daysOutstanding > 60 && a.daysOutstanding <= 90);
  const aging90Plus = advances.filter((a) => a.daysOutstanding > 90);

  // By department
  const byDept = new Map<string, { count: number; total: number; remaining: number }>();
  for (const adv of advances) {
    const existing = byDept.get(adv.department) || { count: 0, total: 0, remaining: 0 };
    existing.count += 1;
    existing.total += adv.amount;
    existing.remaining += adv.remainingAmount;
    byDept.set(adv.department, existing);
  }

  const deptStats = Array.from(byDept.entries())
    .map(([dept, stats]) => ({ dept, ...stats }))
    .sort((a, b) => b.remaining - a.remaining);

  const maxRemaining = Math.max(...deptStats.map((d) => d.remaining), 1);

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-1">
            <DollarSign className="h-4 w-4 text-amber-400" />
            <span className="text-xl font-bold text-foreground">{formatCurrency(totalOutstanding)}</span>
          </div>
          <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Outstanding</p>
        </div>
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-1">
            <Clock className="h-4 w-4 text-module-erp" />
            <span className="text-xl font-bold text-foreground">{activeAdvances.length}</span>
          </div>
          <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Active</p>
        </div>
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-1">
            <AlertTriangle className="h-4 w-4 text-red-400" />
            <span className="text-xl font-bold text-red-400">{defaultedAdvances.length}</span>
          </div>
          <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Defaulted</p>
        </div>
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-1">
            <Building2 className="h-4 w-4 text-violet-400" />
            <span className="text-xl font-bold text-foreground">{deptStats.length}</span>
          </div>
          <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Departments</p>
        </div>
      </div>

      {/* Aging Analysis */}
      <ChartCard title="Aging Analysis" subtitle="Outstanding advances by age">
        <div className="grid grid-cols-4 gap-3">
          <AgingBucket label="0-30 days" count={aging30.length} amount={aging30.reduce((s, a) => s + a.remainingAmount, 0)} color="bg-emerald-400" />
          <AgingBucket label="31-60 days" count={aging60.length} amount={aging60.reduce((s, a) => s + a.remainingAmount, 0)} color="bg-amber-400" />
          <AgingBucket label="61-90 days" count={aging90.length} amount={aging90.reduce((s, a) => s + a.remainingAmount, 0)} color="bg-orange-400" />
          <AgingBucket label="90+ days" count={aging90Plus.length} amount={aging90Plus.reduce((s, a) => s + a.remainingAmount, 0)} color="bg-red-400" />
        </div>
      </ChartCard>

      {/* By Department */}
      <ChartCard title="Outstanding by Department" subtitle="Remaining amount per department">
        <div className="space-y-3">
          {deptStats.map((dept) => (
            <div key={dept.dept} className="space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-foreground">{dept.dept}</span>
                <div className="flex items-center gap-3 text-[10px] text-muted-foreground">
                  <span>{dept.count} advance{dept.count !== 1 ? 's' : ''}</span>
                  <span className="text-foreground font-medium">{formatCurrency(dept.remaining)}</span>
                </div>
              </div>
              <div className="h-3 bg-white/5 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full bg-module-erp/60 transition-all duration-500"
                  style={{ width: `${(dept.remaining / maxRemaining) * 100}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </ChartCard>
    </div>
  );
}

function AgingBucket({ label, count, amount, color }: { label: string; count: number; amount: number; color: string }) {
  return (
    <div className="bg-white/[0.03] rounded-xl p-3 border border-white/5">
      <div className={`w-2 h-2 rounded-full ${color} mb-2`} />
      <p className="text-[10px] text-muted-foreground">{label}</p>
      <p className="text-sm font-semibold text-foreground">{count}</p>
      <p className="text-[10px] text-muted-foreground">{formatCurrency(amount)}</p>
    </div>
  );
}

function formatCurrency(value: number): string {
  if (value >= 1000000) return `$${(value / 1000000).toFixed(1)}M`;
  if (value >= 1000) return `$${(value / 1000).toFixed(1)}K`;
  return `$${value.toFixed(0)}`;
}
