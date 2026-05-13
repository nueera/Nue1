'use client';

import { useState, useMemo } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import type { ShiftAssignment, ShiftType } from '../types';

interface ShiftCalendarProps {
  assignments: ShiftAssignment[];
  shiftTypes: ShiftType[];
  isLoading?: boolean;
  onDayClick?: (date: Date) => void;
}

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

function getDaysInMonth(year: number, month: number): Date[] {
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const days: Date[] = [];

  // Pad start of month
  const startDow = firstDay.getDay();
  for (let i = 0; i < startDow; i++) {
    days.push(new Date(year, month, 1 - (startDow - i)));
  }

  for (let d = 1; d <= lastDay.getDate(); d++) {
    days.push(new Date(year, month, d));
  }

  // Pad end of month
  const endDow = lastDay.getDay();
  for (let i = 1; i < 6 - endDow; i++) {
    days.push(new Date(year, month + 1, i));
  }

  return days;
}

export function ShiftCalendar({ assignments, shiftTypes, isLoading, onDayClick }: ShiftCalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const days = useMemo(() => getDaysInMonth(year, month), [year, month]);

  const shiftColorMap = useMemo(() => {
    const map: Record<string, string> = {};
    shiftTypes.forEach((st, i) => {
      map[st.id] = st.color || ['#3B82F6', '#10B981', '#F59E0B', '#8B5CF6', '#EF4444', '#EC4899'][i % 6];
    });
    return map;
  }, [shiftTypes]);

  const getAssignmentsForDate = (date: Date) => {
    const dateStr = date.toISOString().split('T')[0];
    return assignments.filter((a) => {
      const startOk = dateStr >= a.startDate;
      const endOk = !a.endDate || dateStr <= a.endDate;
      return startOk && endOk;
    });
  };

  const prev = () => setCurrentDate(new Date(year, month - 1, 1));
  const next = () => setCurrentDate(new Date(year, month + 1, 1));
  const today = () => setCurrentDate(new Date());

  const isToday = (date: Date) => {
    const now = new Date();
    return date.getDate() === now.getDate() &&
      date.getMonth() === now.getMonth() &&
      date.getFullYear() === now.getFullYear();
  };

  const isCurrentMonth = (date: Date) => date.getMonth() === month;

  if (isLoading) {
    return (
      <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 animate-pulse">
        <div className="h-8 w-48 bg-white/10 rounded mb-6" />
        <div className="grid grid-cols-7 gap-2">
          {Array.from({ length: 35 }).map((_, i) => (
            <div key={i} className="h-20 bg-white/5 rounded-lg" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-4 sm:p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-sm font-semibold text-foreground">
          {currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
        </h3>
        <div className="flex items-center gap-2">
          <button
            onClick={today}
            className="px-3 py-1 text-xs font-medium bg-module-erp/10 text-module-erp rounded-lg border border-module-erp/20 hover:bg-module-erp/20 transition-all duration-200"
          >
            Today
          </button>
          <button onClick={prev} className="p-1.5 rounded-lg hover:bg-white/10 text-muted-foreground transition-all duration-200">
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button onClick={next} className="p-1.5 rounded-lg hover:bg-white/10 text-muted-foreground transition-all duration-200">
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Day headers */}
      <div className="grid grid-cols-7 gap-1 mb-1">
        {DAYS.map((day) => (
          <div key={day} className="text-center text-[10px] font-medium text-muted-foreground/60 uppercase tracking-wider py-1">
            {day}
          </div>
        ))}
      </div>

      {/* Calendar grid */}
      <div className="grid grid-cols-7 gap-1">
        {days.map((date, i) => {
          const dayAssignments = isCurrentMonth(date) ? getAssignmentsForDate(date) : [];
          const today_ = isToday(date);

          return (
            <div
              key={i}
              onClick={() => isCurrentMonth(date) && onDayClick?.(date)}
              className={`min-h-[72px] p-1.5 rounded-lg border transition-all duration-200 ${
                isCurrentMonth(date)
                  ? today_
                    ? 'bg-module-erp/5 border-module-erp/20 cursor-pointer hover:bg-module-erp/10'
                    : 'bg-white/[0.02] border-white/5 cursor-pointer hover:bg-white/5'
                  : 'bg-transparent border-transparent'
              }`}
            >
              <span className={`text-xs font-medium ${
                isCurrentMonth(date)
                  ? today_
                    ? 'text-module-erp'
                    : 'text-foreground'
                  : 'text-muted-foreground/30'
              }`}>
                {date.getDate()}
              </span>
              <div className="mt-1 space-y-0.5">
                {dayAssignments.slice(0, 3).map((a) => {
                  const color = shiftColorMap[a.shiftTypeId] || '#3B82F6';
                  return (
                    <div
                      key={a.id}
                      className="text-[9px] font-medium px-1 py-0.5 rounded truncate"
                      style={{
                        backgroundColor: `${color}15`,
                        color: color,
                      }}
                    >
                      {a.employeeName.split(' ')[0]}
                    </div>
                  );
                })}
                {dayAssignments.length > 3 && (
                  <div className="text-[9px] text-muted-foreground px-1">
                    +{dayAssignments.length - 3} more
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Legend */}
      <div className="flex items-center gap-4 mt-4 pt-4 border-t border-white/5">
        {shiftTypes.map((st) => (
          <div key={st.id} className="flex items-center gap-1.5">
            <div
              className="w-2.5 h-2.5 rounded-sm"
              style={{ backgroundColor: shiftColorMap[st.id] }}
            />
            <span className="text-[10px] text-muted-foreground">{st.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
