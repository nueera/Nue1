'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

export interface CalendarEvent {
  id: string;
  title: string;
  date: string; // YYYY-MM-DD
  type: 'campaign' | 'social_post' | 'content' | 'event' | 'deadline';
  color?: string;
}

export interface ContentCalendarProps {
  events?: CalendarEvent[];
  onDateClick?: (date: string) => void;
  onEventClick?: (event: CalendarEvent) => void;
  className?: string;
}

const EVENT_STYLES: Record<string, { bg: string; text: string }> = {
  campaign: { bg: 'bg-blue-100 dark:bg-blue-900/30', text: 'text-blue-700 dark:text-blue-300' },
  social_post: { bg: 'bg-purple-100 dark:bg-purple-900/30', text: 'text-purple-700 dark:text-purple-300' },
  content: { bg: 'bg-emerald-100 dark:bg-emerald-900/30', text: 'text-emerald-700 dark:text-emerald-300' },
  event: { bg: 'bg-amber-100 dark:bg-amber-900/30', text: 'text-amber-700 dark:text-amber-300' },
  deadline: { bg: 'bg-red-100 dark:bg-red-900/30', text: 'text-red-700 dark:text-red-300' },
};

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const MOCK_EVENTS: CalendarEvent[] = [
  { id: 'e1', title: 'Newsletter', date: '2026-03-02', type: 'campaign' },
  { id: 'e2', title: 'IG Post', date: '2026-03-04', type: 'social_post' },
  { id: 'e3', title: 'Blog Post', date: '2026-03-06', type: 'content' },
  { id: 'e4', title: 'Webinar', date: '2026-03-10', type: 'event' },
  { id: 'e5', title: 'Product Launch', date: '2026-03-12', type: 'campaign' },
  { id: 'e6', title: 'LinkedIn Post', date: '2026-03-14', type: 'social_post' },
  { id: 'e7', title: 'Content Deadline', date: '2026-03-18', type: 'deadline' },
  { id: 'e8', title: 'Email Drip', date: '2026-03-20', type: 'campaign' },
  { id: 'e9', title: 'Twitter Thread', date: '2026-03-22', type: 'social_post' },
  { id: 'e10', title: 'E-book', date: '2026-03-25', type: 'content' },
  { id: 'e11', title: 'Flash Sale', date: '2026-03-28', type: 'campaign' },
];

function getCalendarDays(year: number, month: number): Array<{ date: Date; isCurrentMonth: boolean }> {
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const startPad = firstDay.getDay();
  const days: Array<{ date: Date; isCurrentMonth: boolean }> = [];

  // Previous month padding
  for (let i = startPad - 1; i >= 0; i--) {
    const d = new Date(year, month, -i);
    days.push({ date: d, isCurrentMonth: false });
  }

  // Current month
  for (let d = 1; d <= lastDay.getDate(); d++) {
    days.push({ date: new Date(year, month, d), isCurrentMonth: true });
  }

  // Next month padding
  const remaining = 42 - days.length;
  for (let d = 1; d <= remaining; d++) {
    days.push({ date: new Date(year, month + 1, d), isCurrentMonth: false });
  }

  return days;
}

function formatDateKey(date: Date): string {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
}

export function ContentCalendar({
  events = MOCK_EVENTS,
  onDateClick,
  onEventClick,
  className,
}: ContentCalendarProps) {
  const [currentDate, setCurrentDate] = React.useState(new Date(2026, 2, 1)); // March 2026
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const days = getCalendarDays(year, month);

  const eventsByDate = React.useMemo(() => {
    const map: Record<string, CalendarEvent[]> = {};
    events.forEach((e) => {
      if (!map[e.date]) map[e.date] = [];
      map[e.date].push(e);
    });
    return map;
  }, [events]);

  const goToPrev = () => setCurrentDate(new Date(year, month - 1, 1));
  const goToNext = () => setCurrentDate(new Date(year, month + 1, 1));

  const today = new Date();
  const todayKey = formatDateKey(today);

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className={cn('border-border/50', className)}>
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardTitle className="text-base font-semibold">
              Content Calendar
            </CardTitle>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="icon" className="h-7 w-7" onClick={goToPrev}>
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <span className="text-sm font-medium min-w-[120px] text-center">
                {currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
              </span>
              <Button variant="outline" size="icon" className="h-7 w-7" onClick={goToNext}>
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          {/* Day headers */}
          <div className="grid grid-cols-7 gap-px mb-1">
            {DAYS.map((day) => (
              <div key={day} className="text-center text-xs font-medium text-muted-foreground py-2">
                {day}
              </div>
            ))}
          </div>

          {/* Calendar grid */}
          <div className="grid grid-cols-7 gap-px bg-border/30 rounded-lg overflow-hidden">
            {days.map(({ date, isCurrentMonth }, i) => {
              const dateKey = formatDateKey(date);
              const dayEvents = eventsByDate[dateKey] ?? [];
              const isToday = dateKey === todayKey;

              return (
                <div
                  key={i}
                  className={cn(
                    'min-h-[80px] p-1.5 bg-background transition-colors',
                    !isCurrentMonth && 'bg-muted/30',
                    onDateClick && 'cursor-pointer hover:bg-muted/50'
                  )}
                  onClick={() => onDateClick?.(dateKey)}
                >
                  <div className="flex items-center justify-between">
                    <span
                      className={cn(
                        'text-xs font-medium inline-flex items-center justify-center w-6 h-6 rounded-full',
                        isToday && 'bg-primary text-primary-foreground',
                        !isCurrentMonth && 'text-muted-foreground/40',
                        isCurrentMonth && !isToday && 'text-foreground'
                      )}
                    >
                      {date.getDate()}
                    </span>
                  </div>
                  <div className="mt-0.5 space-y-0.5">
                    {dayEvents.slice(0, 2).map((event) => {
                      const style = EVENT_STYLES[event.type] ?? EVENT_STYLES.content;
                      return (
                        <button
                          key={event.id}
                          onClick={(e) => {
                            e.stopPropagation();
                            onEventClick?.(event);
                          }}
                          className={cn(
                            'w-full text-left text-[10px] leading-tight px-1 py-0.5 rounded truncate',
                            style.bg,
                            style.text,
                            'hover:opacity-80 transition-opacity'
                          )}
                        >
                          {event.title}
                        </button>
                      );
                    })}
                    {dayEvents.length > 2 && (
                      <span className="text-[10px] text-muted-foreground pl-1">
                        +{dayEvents.length - 2} more
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Legend */}
          <div className="flex flex-wrap items-center gap-3 mt-3">
            {Object.entries(EVENT_STYLES).map(([type, style]) => (
              <div key={type} className="flex items-center gap-1.5">
                <span className={cn('w-2 h-2 rounded-full', style.bg)} />
                <span className="text-[10px] text-muted-foreground capitalize">
                  {type.replace('_', ' ')}
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
