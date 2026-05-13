'use client';

import { Building2, Calendar } from 'lucide-react';
import type { LeaveBalance } from '../../types';
import { ChartCard } from '../../../../shared/components/chart-card';
import { EmptyState } from '../../../../shared/components/empty-state';

interface LeaveBalanceSummaryProps {
  data: LeaveBalance[];
  isLoading?: boolean;
}

interface DeptSummary {
  department: string;
  leaveType: string;
  totalAvail: number;
  totalUsed: number;
  avgAvail: number;
  avgUsed: number;
  count: number;
}

export function LeaveBalanceSummary({ data, isLoading }: LeaveBalanceSummaryProps) {
  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-4 animate-pulse">
              <div className="h-4 w-24 bg-white/10 rounded mb-2" />
              <div className="h-6 w-16 bg-white/10 rounded" />
            </div>
          ))}
        </div>
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl h-64 animate-pulse" />
      </div>
    );
  }

  if (data.length === 0) {
    return <EmptyState icon={Calendar} title="No leave data" description="Leave balance summary requires leave data to display" />;
  }

  // Aggregate by leave type
  const byLeaveType = new Map<string, { total: number; used: number; available: number; count: number }>();
  for (const item of data) {
    const existing = byLeaveType.get(item.leaveType) || { total: 0, used: 0, available: 0, count: 0 };
    existing.total += item.total;
    existing.used += item.used;
    existing.available += item.available;
    existing.count += 1;
    byLeaveType.set(item.leaveType, existing);
  }

  const leaveTypeStats = Array.from(byLeaveType.entries()).map(([type, stats]) => ({
    type,
    avgAvailable: Math.round((stats.available / stats.count) * 10) / 10,
    avgUsed: Math.round((stats.used / stats.count) * 10) / 10,
    totalAvailable: stats.available,
    totalUsed: stats.used,
    count: stats.count,
  }));

  const totalEmployees = new Set(data.map((d) => d.employeeId)).size;
  const totalUsedAll = data.reduce((sum, d) => sum + d.used, 0);
  const totalAvailableAll = data.reduce((sum, d) => sum + d.available, 0);

  // Bar chart for leave type comparison
  const maxVal = Math.max(...leaveTypeStats.map((s) => Math.max(s.avgAvailable, s.avgUsed)), 1);

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-1">
            <Building2 className="h-3.5 w-3.5 text-module-erp" />
            <span className="text-xl font-bold text-foreground">{totalEmployees}</span>
          </div>
          <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Employees</p>
        </div>
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-4">
          <span className="text-xl font-bold text-foreground">{totalUsedAll}</span>
          <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Total Leaves Used</p>
        </div>
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-4">
          <span className="text-xl font-bold text-emerald-400">{totalAvailableAll}</span>
          <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Total Available</p>
        </div>
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-4">
          <span className="text-xl font-bold text-foreground">{leaveTypeStats.length}</span>
          <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Leave Types</p>
        </div>
      </div>

      {/* Chart */}
      <ChartCard title="Leave Balance by Type" subtitle="Average available vs used per employee">
        <div className="space-y-3">
          {leaveTypeStats.map((stat) => (
            <div key={stat.type} className="space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-foreground capitalize">{stat.type}</span>
                <span className="text-[10px] text-muted-foreground">{stat.count} employees</span>
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-[9px] text-muted-foreground w-12 shrink-0">Available</span>
                  <div className="flex-1 h-4 bg-white/5 rounded-md overflow-hidden">
                    <div
                      className="h-full rounded-md bg-emerald-400/60 transition-all duration-500"
                      style={{ width: `${(stat.avgAvailable / maxVal) * 100}%` }}
                    />
                  </div>
                  <span className="text-[10px] text-foreground w-10 shrink-0 text-right">{stat.avgAvailable}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[9px] text-muted-foreground w-12 shrink-0">Used</span>
                  <div className="flex-1 h-4 bg-white/5 rounded-md overflow-hidden">
                    <div
                      className="h-full rounded-md bg-amber-400/60 transition-all duration-500"
                      style={{ width: `${(stat.avgUsed / maxVal) * 100}%` }}
                    />
                  </div>
                  <span className="text-[10px] text-foreground w-10 shrink-0 text-right">{stat.avgUsed}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </ChartCard>

      {/* Detailed Table */}
      <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden">
        <div className="px-5 py-3 border-b border-white/10">
          <h4 className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Detailed Summary</h4>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider px-5 py-2">Leave Type</th>
                <th className="text-center text-xs font-medium text-muted-foreground uppercase tracking-wider px-5 py-2">Employees</th>
                <th className="text-center text-xs font-medium text-muted-foreground uppercase tracking-wider px-5 py-2">Avg Available</th>
                <th className="text-center text-xs font-medium text-muted-foreground uppercase tracking-wider px-5 py-2">Avg Used</th>
                <th className="text-center text-xs font-medium text-muted-foreground uppercase tracking-wider px-5 py-2">Total Available</th>
                <th className="text-center text-xs font-medium text-muted-foreground uppercase tracking-wider px-5 py-2">Total Used</th>
              </tr>
            </thead>
            <tbody>
              {leaveTypeStats.map((stat) => (
                <tr key={stat.type} className="border-b border-white/5 hover:bg-white/5 transition-all duration-200">
                  <td className="px-5 py-2.5 text-sm text-foreground capitalize font-medium">{stat.type}</td>
                  <td className="px-5 py-2.5 text-sm text-foreground text-center">{stat.count}</td>
                  <td className="px-5 py-2.5 text-sm text-emerald-400 text-center">{stat.avgAvailable}</td>
                  <td className="px-5 py-2.5 text-sm text-amber-400 text-center">{stat.avgUsed}</td>
                  <td className="px-5 py-2.5 text-sm text-foreground text-center">{stat.totalAvailable}</td>
                  <td className="px-5 py-2.5 text-sm text-foreground text-center">{stat.totalUsed}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
