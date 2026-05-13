'use client';

import { useState, useMemo } from 'react';
import { ChevronLeft, ChevronRight, Calendar, Flag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import type { Holiday } from '../types';

interface HolidayCalendarProps {
  holidays: Holiday[];
  className?: string;
}

const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

const HOLIDAY_TYPE_COLORS: Record<string, { dot: string; bg: string; label: string }> = {
  public: { dot: 'bg-red-500', bg: 'bg-red-500/10 border-red-500/20', label: 'Public Holiday' },
  company: { dot: 'bg-module-erp', bg: 'bg-module-erp/10 border-module-erp/20', label: 'Company Holiday' },
  optional: { dot: 'bg-amber-500', bg: 'bg-amber-500/10 border-amber-500/20', label: 'Optional Holiday' },
};

type ViewMode = 'calendar' | 'list';

export function HolidayCalendar({ holidays, className }: HolidayCalendarProps) {
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [viewMode, setViewMode] = useState<ViewMode>('list');

  const yearHolidays = useMemo(
    () => holidays.filter((h) => new Date(h.date).getFullYear() === currentYear).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()),
    [holidays, currentYear],
  );

  const holidaysByMonth = useMemo(() => {
    const map = new Map<number, Holiday[]>();
    yearHolidays.forEach((h) => {
      const month = new Date(h.date).getMonth();
      if (!map.has(month)) map.set(month, []);
      map.get(month)!.push(h);
    });
    return map;
  }, [yearHolidays]);

  const prevYear = () => setCurrentYear((y) => y - 1);
  const nextYear = () => setCurrentYear((y) => y + 1);

  return (
    <div className={cn('bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-4 sm:p-6 space-y-5', className)}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Calendar className="h-5 w-5 text-module-erp" strokeWidth={1.8} />
          <h3 className="font-semibold text-foreground text-base">Holiday Calendar {currentYear}</h3>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 bg-white/5 rounded-lg p-0.5">
            {(['list', 'calendar'] as ViewMode[]).map((mode) => (
              <button
                key={mode}
                onClick={() => setViewMode(mode)}
                className={cn(
                  'px-3 py-1.5 text-xs font-medium rounded-md transition-all duration-200 capitalize',
                  viewMode === mode ? 'bg-module-erp text-white' : 'text-muted-foreground hover:text-foreground',
                )}
              >
                {mode}
              </button>
            ))}
          </div>
          <Button variant="ghost" size="icon" className="h-8 w-8 press-scale" onClick={prevYear}>
            <ChevronLeft className="h-4 w-4" strokeWidth={1.8} />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8 press-scale" onClick={nextYear}>
            <ChevronRight className="h-4 w-4" strokeWidth={1.8} />
          </Button>
        </div>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap items-center gap-4">
        {Object.entries(HOLIDAY_TYPE_COLORS).map(([type, config]) => (
          <span key={type} className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <span className={cn('h-2.5 w-2.5 rounded-full', config.dot)} />
            {config.label}
          </span>
        ))}
      </div>

      {/* Content */}
      {viewMode === 'list' ? (
        <div className="space-y-6 max-h-96 overflow-y-auto custom-scrollbar">
          {MONTHS.map((monthName, monthIdx) => {
            const monthHolidays = holidaysByMonth.get(monthIdx);
            if (!monthHolidays || monthHolidays.length === 0) return null;

            return (
              <div key={monthIdx}>
                <h4 className="text-sm font-medium text-foreground mb-2">{monthName}</h4>
                <div className="space-y-2">
                  {monthHolidays.map((holiday) => {
                    const colors = HOLIDAY_TYPE_COLORS[holiday.type] || HOLIDAY_TYPE_COLORS.optional;
                    const date = new Date(holiday.date);
                    const dayName = date.toLocaleDateString('en-IN', { weekday: 'long' });

                    return (
                      <div
                        key={holiday.id}
                        className={cn('flex items-center gap-3 rounded-lg border p-3 hover:bg-white/10 transition-all duration-200', colors.bg)}
                      >
                        <div className="flex flex-col items-center w-12 shrink-0">
                          <span className="text-lg font-bold text-foreground">{date.getDate()}</span>
                          <span className="text-[10px] text-muted-foreground">{dayName.slice(0, 3)}</span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-foreground">{holiday.name}</p>
                          <div className="flex items-center gap-1.5 mt-0.5">
                            <Flag className="h-3 w-3 text-muted-foreground" strokeWidth={1.8} />
                            <span className="text-xs text-muted-foreground capitalize">{holiday.type}</span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}

          {yearHolidays.length === 0 && (
            <div className="py-8 text-center">
              <p className="text-sm text-muted-foreground">No holidays listed for {currentYear}</p>
            </div>
          )}
        </div>
      ) : (
        /* Calendar grid view - simplified month grid */
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {MONTHS.map((monthName, monthIdx) => {
            const monthHolidays = holidaysByMonth.get(monthIdx) || [];
            return (
              <div key={monthIdx} className="bg-white/5 border border-white/10 rounded-lg p-3">
                <h4 className="text-xs font-medium text-foreground mb-2">{monthName}</h4>
                {monthHolidays.length === 0 ? (
                  <p className="text-[10px] text-muted-foreground/50">No holidays</p>
                ) : (
                  <div className="space-y-1">
                    {monthHolidays.map((h) => {
                      const colors = HOLIDAY_TYPE_COLORS[h.type] || HOLIDAY_TYPE_COLORS.optional;
                      return (
                        <div key={h.id} className="flex items-center gap-1.5">
                          <span className={cn('h-1.5 w-1.5 rounded-full shrink-0', colors.dot)} />
                          <span className="text-[10px] text-foreground/80 truncate">{new Date(h.date).getDate()} - {h.name}</span>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
