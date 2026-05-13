'use client';

import { useState } from 'react';
import { BarChart3 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AttendanceStatsChartProps {
  data?: AttendanceChartData[];
  period?: 'weekly' | 'monthly';
  onPeriodChange?: (period: 'weekly' | 'monthly') => void;
  className?: string;
}

export interface AttendanceChartData {
  label: string;
  present: number;
  absent: number;
  late: number;
  halfDay: number;
}

export function AttendanceStatsChart({
  data = [],
  period = 'weekly',
  onPeriodChange,
  className,
}: AttendanceStatsChartProps) {
  const [activePeriod, setActivePeriod] = useState(period);

  const handlePeriodChange = (p: 'weekly' | 'monthly') => {
    setActivePeriod(p);
    onPeriodChange?.(p);
  };

  const maxValue = Math.max(
    ...data.map((d) => d.present + d.absent + d.late + d.halfDay),
    1
  );

  // Default sample data if none provided
  const chartData = data.length > 0
    ? data
    : [
        { label: 'Mon', present: 42, absent: 3, late: 5, halfDay: 2 },
        { label: 'Tue', present: 40, absent: 5, late: 3, halfDay: 1 },
        { label: 'Wed', present: 44, absent: 2, late: 4, halfDay: 3 },
        { label: 'Thu', present: 38, absent: 6, late: 7, halfDay: 2 },
        { label: 'Fri', present: 41, absent: 4, late: 2, halfDay: 1 },
        { label: 'Sat', present: 20, absent: 25, late: 1, halfDay: 0 },
      ];

  return (
    <div className={cn('bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-5', className)}>
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2">
          <BarChart3 className="h-4 w-4 text-module-erp" />
          <h3 className="text-sm font-semibold text-foreground">Attendance Trends</h3>
        </div>

        {/* Period Toggle */}
        <div className="flex items-center gap-1 p-0.5 rounded-lg bg-white/5">
          {(['weekly', 'monthly'] as const).map((p) => (
            <button
              key={p}
              onClick={() => handlePeriodChange(p)}
              className={cn(
                'px-3 py-1 rounded-md text-xs font-medium transition-colors',
                activePeriod === p
                  ? 'bg-module-erp/15 text-module-erp'
                  : 'text-muted-foreground hover:text-foreground'
              )}
            >
              {p.charAt(0).toUpperCase() + p.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Bar Chart */}
      <div className="space-y-2">
        {chartData.map((item) => {
          const total = item.present + item.absent + item.late + item.halfDay;
          const presentWidth = (item.present / maxValue) * 100;
          const lateWidth = (item.late / maxValue) * 100;
          const halfDayWidth = (item.halfDay / maxValue) * 100;
          const absentWidth = (item.absent / maxValue) * 100;

          return (
            <div key={item.label} className="group">
              <div className="flex items-center gap-3">
                {/* Label */}
                <span className="text-xs text-muted-foreground w-8 shrink-0 text-right">
                  {item.label}
                </span>

                {/* Stacked Bar */}
                <div className="flex-1 h-7 rounded-md bg-white/5 overflow-hidden flex relative">
                  <div
                    className="bg-green-500/60 h-full transition-all duration-300 group-hover:bg-green-500/80"
                    style={{ width: `${presentWidth}%` }}
                  />
                  <div
                    className="bg-amber-500/60 h-full transition-all duration-300 group-hover:bg-amber-500/80"
                    style={{ width: `${lateWidth}%` }}
                  />
                  <div
                    className="bg-orange-500/60 h-full transition-all duration-300 group-hover:bg-orange-500/80"
                    style={{ width: `${halfDayWidth}%` }}
                  />
                  <div
                    className="bg-red-500/60 h-full transition-all duration-300 group-hover:bg-red-500/80"
                    style={{ width: `${absentWidth}%` }}
                  />

                  {/* Total label inside bar */}
                  <span className="absolute right-2 top-1/2 -translate-y-1/2 text-xs font-medium text-foreground/70">
                    {total}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Legend */}
      <div className="flex items-center justify-center gap-4 mt-4 pt-3 border-t border-white/10">
        {[
          { label: 'Present', color: 'bg-green-500' },
          { label: 'Late', color: 'bg-amber-500' },
          { label: 'Half Day', color: 'bg-orange-500' },
          { label: 'Absent', color: 'bg-red-500' },
        ].map((legend) => (
          <div key={legend.label} className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <div className={cn('w-2.5 h-2.5 rounded-sm', legend.color)} />
            <span>{legend.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
