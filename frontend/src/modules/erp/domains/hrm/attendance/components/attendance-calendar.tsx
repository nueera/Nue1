'use client';

import { useState, useMemo } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import type { AttendanceRecord, AttendanceStatus } from '../types';

interface AttendanceCalendarProps {
  records: AttendanceRecord[];
  employeeId?: string;
  onDateClick?: (date: string) => void;
}

const STATUS_COLORS: Record<AttendanceStatus, string> = {
  present: 'bg-green-500/20 text-green-500 border-green-500/30',
  absent: 'bg-red-500/20 text-red-500 border-red-500/30',
  late: 'bg-amber-500/20 text-amber-500 border-amber-500/30',
  'half-day': 'bg-orange-500/20 text-orange-500 border-orange-500/30',
};

const STATUS_DOT: Record<AttendanceStatus, string> = {
  present: 'bg-green-500',
  absent: 'bg-red-500',
  late: 'bg-amber-500',
  'half-day': 'bg-orange-500',
};

const DAYS_OF_WEEK = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export function AttendanceCalendar({ records, employeeId, onDateClick }: AttendanceCalendarProps) {
  const [currentMonth, setCurrentMonth] = useState(() => {
    const now = new Date();
    return { year: now.getFullYear(), month: now.getMonth() };
  });

  const recordsByDate = useMemo(() => {
    const map = new Map<string, AttendanceStatus>();
    const filteredRecords = employeeId
      ? records.filter((r) => r.employeeId === employeeId)
      : records;

    filteredRecords.forEach((r) => {
      const dateKey = r.date.split('T')[0];
      if (!map.has(dateKey)) {
        map.set(dateKey, r.status);
      }
    });
    return map;
  }, [records, employeeId]);

  const calendarDays = useMemo(() => {
    const { year, month } = currentMonth;
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const days: (number | null)[] = [];

    for (let i = 0; i < firstDay; i++) {
      days.push(null);
    }
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i);
    }
    return days;
  }, [currentMonth]);

  const navigateMonth = (direction: -1 | 1) => {
    setCurrentMonth((prev) => {
      const newMonth = prev.month + direction;
      if (newMonth < 0) return { year: prev.year - 1, month: 11 };
      if (newMonth > 11) return { year: prev.year + 1, month: 0 };
      return { ...prev, month: newMonth };
    });
  };

  const monthLabel = new Date(currentMonth.year, currentMonth.month).toLocaleDateString('en-IN', {
    month: 'long',
    year: 'numeric',
  });

  return (
    <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-5">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-foreground">{monthLabel}</h3>
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => navigateMonth(-1)}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm" className="text-xs" onClick={() => {
            const now = new Date();
            setCurrentMonth({ year: now.getFullYear(), month: now.getMonth() });
          }}>
            Today
          </Button>
          <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => navigateMonth(1)}>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Week Day Headers */}
      <div className="grid grid-cols-7 gap-1 mb-1">
        {DAYS_OF_WEEK.map((day) => (
          <div key={day} className="text-center text-xs font-medium text-muted-foreground py-1">
            {day}
          </div>
        ))}
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-1">
        {calendarDays.map((day, idx) => {
          if (day === null) {
            return <div key={`empty-${idx}`} className="aspect-square" />;
          }

          const dateStr = `${currentMonth.year}-${String(currentMonth.month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
          const status = recordsByDate.get(dateStr);
          const isToday = (() => {
            const now = new Date();
            return (
              currentMonth.year === now.getFullYear() &&
              currentMonth.month === now.getMonth() &&
              day === now.getDate()
            );
          })();

          return (
            <button
              key={dateStr}
              onClick={() => onDateClick?.(dateStr)}
              className={cn(
                'aspect-square rounded-lg flex flex-col items-center justify-center text-xs transition-all duration-150',
                'hover:bg-white/10',
                isToday && 'ring-1 ring-module-erp/50',
                status && STATUS_COLORS[status],
                !status && 'text-muted-foreground',
                onDateClick && 'cursor-pointer',
              )}
            >
              <span className={cn('font-medium', isToday && 'text-module-erp')}>{day}</span>
              {status && (
                <div className={cn('w-1.5 h-1.5 rounded-full mt-0.5', STATUS_DOT[status])} />
              )}
            </button>
          );
        })}
      </div>

      {/* Legend */}
      <div className="flex items-center justify-center gap-4 mt-4 pt-3 border-t border-white/10">
        {(Object.keys(STATUS_DOT) as AttendanceStatus[]).map((status) => (
          <div key={status} className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <div className={cn('w-2.5 h-2.5 rounded-full', STATUS_DOT[status])} />
            <span className="capitalize">{status.replace('-', ' ')}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
