'use client';

import { useMemo } from 'react';
import { ChevronLeft, ChevronRight, GraduationCap, MapPin } from 'lucide-react';
import type { TrainingSession } from '../types';
import { useState } from 'react';

interface TrainingCalendarProps {
  sessions: TrainingSession[];
  isLoading?: boolean;
  onSessionClick?: (session: TrainingSession) => void;
}

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const CATEGORY_COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#8B5CF6', '#EF4444', '#EC4899', '#06B6D4', '#F97316'];

function getDaysInMonth(year: number, month: number): Date[] {
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const days: Date[] = [];
  const startDow = firstDay.getDay();
  for (let i = 0; i < startDow; i++) days.push(new Date(year, month, 1 - (startDow - i)));
  for (let d = 1; d <= lastDay.getDate(); d++) days.push(new Date(year, month, d));
  const endDow = lastDay.getDay();
  for (let i = 1; i < 6 - endDow; i++) days.push(new Date(year, month + 1, i));
  return days;
}

export function TrainingCalendar({ sessions, isLoading, onSessionClick }: TrainingCalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const days = useMemo(() => getDaysInMonth(year, month), [year, month]);

  const getSessionsForDate = (date: Date) => {
    const dateStr = date.toISOString().split('T')[0];
    return sessions.filter((s) => s.date === dateStr);
  };

  const isToday = (date: Date) => {
    const now = new Date();
    return date.getDate() === now.getDate() && date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear();
  };

  const isCurrentMonth = (date: Date) => date.getMonth() === month;

  if (isLoading) {
    return (
      <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 animate-pulse">
        <div className="h-8 w-48 bg-white/10 rounded mb-6" />
        <div className="grid grid-cols-7 gap-2">{Array.from({ length: 35 }).map((_, i) => <div key={i} className="h-20 bg-white/5 rounded-lg" />)}</div>
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
          <button onClick={() => setCurrentDate(new Date(year, month - 1, 1))} className="p-1.5 rounded-lg hover:bg-white/10 text-muted-foreground transition-all duration-200">
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button onClick={() => setCurrentDate(new Date())} className="px-3 py-1 text-xs font-medium bg-module-erp/10 text-module-erp rounded-lg border border-module-erp/20 hover:bg-module-erp/20 transition-all duration-200">Today</button>
          <button onClick={() => setCurrentDate(new Date(year, month + 1, 1))} className="p-1.5 rounded-lg hover:bg-white/10 text-muted-foreground transition-all duration-200">
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Day headers */}
      <div className="grid grid-cols-7 gap-1 mb-1">
        {DAYS.map((d) => <div key={d} className="text-center text-[10px] font-medium text-muted-foreground/60 uppercase tracking-wider py-1">{d}</div>)}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-7 gap-1">
        {days.map((date, i) => {
          const daySessions = isCurrentMonth(date) ? getSessionsForDate(date) : [];
          const today_ = isToday(date);
          return (
            <div key={i} className={`min-h-[72px] p-1.5 rounded-lg border transition-all duration-200 ${isCurrentMonth(date) ? (today_ ? 'bg-module-erp/5 border-module-erp/20' : 'bg-white/[0.02] border-white/5') : 'bg-transparent border-transparent'}`}>
              <span className={`text-xs font-medium ${isCurrentMonth(date) ? (today_ ? 'text-module-erp' : 'text-foreground') : 'text-muted-foreground/30'}`}>{date.getDate()}</span>
              <div className="mt-1 space-y-0.5">
                {daySessions.slice(0, 2).map((session, si) => {
                  const color = CATEGORY_COLORS[si % CATEGORY_COLORS.length];
                  return (
                    <button
                      key={session.id}
                      onClick={() => onSessionClick?.(session)}
                      className="w-full text-[8px] font-medium px-1 py-0.5 rounded truncate text-left hover:opacity-80 transition-opacity"
                      style={{ backgroundColor: `${color}15`, color }}
                    >
                      {session.title}
                    </button>
                  );
                })}
                {daySessions.length > 2 && <div className="text-[8px] text-muted-foreground px-1">+{daySessions.length - 2}</div>}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
