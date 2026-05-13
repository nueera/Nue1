'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import type { LeaveRequest } from '../types';

interface LeaveTeamViewProps {
  teamLeaves: LeaveRequest[];
  className?: string;
}

type ViewMode = 'today' | 'week';

export function LeaveTeamView({ teamLeaves, className }: LeaveTeamViewProps) {
  const [viewMode, setViewMode] = useState<ViewMode>('today');

  const now = new Date();
  const weekEnd = new Date(now);
  weekEnd.setDate(weekEnd.getDate() + (7 - weekEnd.getDay()));

  const filteredLeaves = teamLeaves.filter((leave) => {
    const start = new Date(leave.startDate);
    const end = new Date(leave.endDate);
    if (leave.status !== 'approved') return false;
    if (viewMode === 'today') {
      return start <= now && end >= now;
    }
    return start <= weekEnd && end >= now;
  });

  const uniqueEmployees = Array.from(
    new Map(filteredLeaves.map((l) => [l.employeeId, l])).values(),
  );

  return (
    <div className={cn('bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-4 sm:p-6 space-y-4', className)}>
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-foreground text-base">Team on Leave</h3>
        <div className="flex items-center gap-1 bg-white/5 rounded-lg p-0.5">
          {(['today', 'week'] as ViewMode[]).map((mode) => (
            <button
              key={mode}
              onClick={() => setViewMode(mode)}
              className={cn(
                'px-3 py-1.5 text-xs font-medium rounded-md transition-all duration-200 capitalize',
                viewMode === mode
                  ? 'bg-module-erp text-white'
                  : 'text-muted-foreground hover:text-foreground',
              )}
            >
              {mode === 'today' ? 'Today' : 'This Week'}
            </button>
          ))}
        </div>
      </div>

      {uniqueEmployees.length === 0 ? (
        <div className="py-8 text-center">
          <p className="text-sm text-muted-foreground">
            No team members on leave {viewMode === 'today' ? 'today' : 'this week'}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {uniqueEmployees.map((leave) => {
            const initials = leave.employeeName
              .split(' ')
              .map((n) => n[0])
              .join('')
              .toUpperCase()
              .slice(0, 2);

            const startDate = new Date(leave.startDate);
            const endDate = new Date(leave.endDate);
            const isPartial = viewMode === 'today' || startDate.toDateString() !== endDate.toDateString();

            return (
              <div
                key={leave.employeeId}
                className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-3 flex flex-col items-center gap-2 hover:bg-white/10 transition-all duration-200"
              >
                <Avatar className="h-10 w-10">
                  <AvatarFallback className="bg-module-erp/15 text-module-erp text-xs font-semibold">
                    {initials}
                  </AvatarFallback>
                </Avatar>
                <div className="text-center">
                  <p className="text-xs font-medium text-foreground truncate max-w-[100px]">{leave.employeeName}</p>
                  <p className="text-[10px] text-muted-foreground capitalize">{leave.type} leave</p>
                  {isPartial && (
                    <p className="text-[10px] text-muted-foreground mt-0.5">
                      {startDate.toLocaleDateString('en-IN', { day: '2-digit', month: 'short' })} - {endDate.toLocaleDateString('en-IN', { day: '2-digit', month: 'short' })}
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
