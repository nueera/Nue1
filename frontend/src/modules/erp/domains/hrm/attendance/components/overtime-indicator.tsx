'use client';

import { cn } from '@/lib/utils';
import { Timer } from 'lucide-react';

interface OvertimeIndicatorProps {
  overtimeHours: number;
  standardHours?: number;
  workHours?: number;
  className?: string;
}

export function OvertimeIndicator({ overtimeHours, standardHours = 8, workHours, className }: OvertimeIndicatorProps) {
  const getColorLevel = (hours: number) => {
    if (hours < 1) return { color: 'text-green-500', bgColor: 'bg-green-500/10', borderColor: 'border-green-500/20', label: 'Minimal' };
    if (hours >= 1 && hours < 2) return { color: 'text-amber-500', bgColor: 'bg-amber-500/10', borderColor: 'border-amber-500/20', label: 'Moderate' };
    return { color: 'text-red-500', bgColor: 'bg-red-500/10', borderColor: 'border-red-500/20', label: 'High' };
  };

  const level = getColorLevel(overtimeHours);

  const formatHours = (h: number) => {
    const hours = Math.floor(h);
    const mins = Math.round((h - hours) * 60);
    return `${hours}h ${mins}m`;
  };

  return (
    <div className={cn('bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-4', className)}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className={cn('flex items-center justify-center w-10 h-10 rounded-xl', level.bgColor, level.color)}>
            <Timer className="h-5 w-5" strokeWidth={1.8} />
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Overtime</p>
            <p className={cn('text-lg font-bold', level.color)}>{formatHours(overtimeHours)}</p>
          </div>
        </div>

        <div className={cn('px-2.5 py-1 rounded-md text-xs font-medium border', level.color, level.bgColor, level.borderColor)}>
          {level.label}
        </div>
      </div>

      {/* Bar indicator */}
      {workHours !== undefined && (
        <div className="mt-3">
          <div className="flex items-center justify-between text-xs text-muted-foreground mb-1">
            <span>Work: {formatHours(workHours)}</span>
            <span>Standard: {formatHours(standardHours)}</span>
          </div>
          <div className="h-2 rounded-full bg-white/10 overflow-hidden">
            <div className="h-full rounded-full flex">
              <div
                className="bg-module-erp/50 rounded-l-full"
                style={{ width: `${Math.min((standardHours / workHours) * 100, 100)}%` }}
              />
              <div
                className={cn('rounded-r-full', overtimeHours < 1 ? 'bg-green-500' : overtimeHours < 2 ? 'bg-amber-500' : 'bg-red-500')}
                style={{ width: `${(overtimeHours / workHours) * 100}%` }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
