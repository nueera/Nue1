'use client';

import { useState, useMemo } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import type { LeaveRequest, LeaveType } from '../types';

interface LeaveCalendarProps {
  leaves: LeaveRequest[];
  className?: string;
  onDayClick?: (date: string, leavesOnDay: LeaveRequest[]) => void;
}

const LEAVE_TYPE_COLORS: Record<LeaveType, string> = {
  annual: 'bg-emerald-500/30 border-emerald-500/50',
  sick: 'bg-rose-500/30 border-rose-500/50',
  personal: 'bg-amber-500/30 border-amber-500/50',
  maternity: 'bg-violet-500/30 border-violet-500/50',
  paternity: 'bg-sky-500/30 border-sky-500/50',
  unpaid: 'bg-zinc-500/30 border-zinc-500/50',
};

const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export function LeaveCalendar({ leaves, className, onDayClick }: LeaveCalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date());

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const approvedLeaves = useMemo(
    () => leaves.filter((l) => l.status === 'approved'),
    [leaves],
  );

  const calendarDays = useMemo(() => {
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const days: (number | null)[] = [];
    for (let i = 0; i < firstDay; i++) days.push(null);
    for (let i = 1; i <= daysInMonth; i++) days.push(i);
    return days;
  }, [year, month]);

  const getLeavesForDay = (day: number): LeaveRequest[] => {
    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return approvedLeaves.filter((l) => {
      const start = new Date(l.startDate);
      const end = new Date(l.endDate);
      const current = new Date(dateStr);
      return current >= start && current <= end;
    });
  };

  const prevMonth = () => setCurrentDate(new Date(year, month - 1, 1));
  const nextMonth = () => setCurrentDate(new Date(year, month + 1, 1));
  const goToday = () => setCurrentDate(new Date());

  return (
    <div className={cn('bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-4 sm:p-6', className)}>
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <h3 className="font-semibold text-foreground text-base">
          {MONTHS[month]} {year}
        </h3>
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="icon" className="h-8 w-8 press-scale" onClick={prevMonth}>
            <ChevronLeft className="h-4 w-4" strokeWidth={1.8} />
          </Button>
          <Button variant="ghost" size="sm" className="text-xs press-scale" onClick={goToday}>
            Today
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8 press-scale" onClick={nextMonth}>
            <ChevronRight className="h-4 w-4" strokeWidth={1.8} />
          </Button>
        </div>
      </div>

      {/* Weekday Headers */}
      <div className="grid grid-cols-7 gap-1 mb-1">
        {WEEKDAYS.map((day) => (
          <div key={day} className="text-center text-xs font-medium text-muted-foreground py-1">
            {day}
          </div>
        ))}
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-1">
        {calendarDays.map((day, idx) => {
          if (day === null) {
            return <div key={`empty-${idx}`} className="h-16 sm:h-20" />;
          }

          const dayLeaves = getLeavesForDay(day);
          const isToday = new Date().getDate() === day && new Date().getMonth() === month && new Date().getFullYear() === year;
          const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;

          return (
            <button
              key={day}
              onClick={() => onDayClick?.(dateStr, dayLeaves)}
              className={cn(
                'h-16 sm:h-20 p-1 rounded-lg border border-transparent text-left transition-all duration-200 hover:bg-white/10',
                isToday && 'border-module-erp/50 bg-module-erp/5',
              )}
            >
              <span
                className={cn(
                  'text-xs font-medium',
                  isToday ? 'text-module-erp' : 'text-foreground/80',
                )}
              >
                {day}
              </span>
              <div className="mt-0.5 space-y-0.5 overflow-hidden">
                {dayLeaves.slice(0, 2).map((leave, i) => (
                  <div
                    key={i}
                    className={cn(
                      'text-[9px] leading-tight px-1 py-0.5 rounded border truncate',
                      LEAVE_TYPE_COLORS[leave.type],
                    )}
                    title={`${leave.employeeName} - ${leave.type}`}
                  >
                    {leave.employeeName.split(' ')[0]}
                  </div>
                ))}
                {dayLeaves.length > 2 && (
                  <span className="text-[9px] text-muted-foreground">+{dayLeaves.length - 2} more</span>
                )}
              </div>
            </button>
          );
        })}
      </div>

      {/* Legend */}
      <div className="flex flex-wrap items-center gap-3 mt-4 pt-4 border-t border-white/10">
        {(Object.keys(LEAVE_TYPE_COLORS) as LeaveType[]).map((type) => (
          <span key={type} className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <span className={cn('h-2.5 w-2.5 rounded-sm border', LEAVE_TYPE_COLORS[type])} />
            <span className="capitalize">{type}</span>
          </span>
        ))}
      </div>
    </div>
  );
}
