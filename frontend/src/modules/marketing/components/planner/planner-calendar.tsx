'use client';

import { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  ChevronLeft,
  ChevronRight,
  CalendarDays,
  Plus,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePlans } from '@/modules/marketing/hooks/use-planner';
import type { MarketingPlan, PlanActivity } from '@/modules/marketing/types';
import { cn } from '@/lib/utils';

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

const ACTIVITY_COLORS: Record<PlanActivity, string> = {
  campaign: 'bg-emerald-500',
  content: 'bg-blue-500',
  event: 'bg-purple-500',
  social_post: 'bg-pink-500',
  ad_spend: 'bg-amber-500',
  review: 'bg-cyan-500',
  meeting: 'bg-indigo-500',
  deadline: 'bg-red-500',
};

interface PlannerCalendarProps {
  plans?: MarketingPlan[];
  onCreatePlan?: () => void;
  onPlanClick?: (plan: MarketingPlan) => void;
}

export function PlannerCalendar({ plans: externalPlans, onCreatePlan, onPlanClick }: PlannerCalendarProps) {
  const { data: plansData } = usePlans();
  const plans = externalPlans ?? plansData?.data ?? [];

  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const calendarDays = useMemo(() => {
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const daysInPrevMonth = new Date(year, month, 0).getDate();

    const days: Array<{ date: Date; isCurrentMonth: boolean }> = [];

    for (let i = firstDay - 1; i >= 0; i--) {
      days.push({ date: new Date(year, month - 1, daysInPrevMonth - i), isCurrentMonth: false });
    }
    for (let i = 1; i <= daysInMonth; i++) {
      days.push({ date: new Date(year, month, i), isCurrentMonth: true });
    }
    const remaining = 42 - days.length;
    for (let i = 1; i <= remaining; i++) {
      days.push({ date: new Date(year, month + 1, i), isCurrentMonth: false });
    }

    return days;
  }, [year, month]);

  const getPlansForDate = (date: Date) => {
    const dateStr = date.toISOString().split('T')[0];
    return plans.filter((p) => {
      const start = new Date(p.startDate).toISOString().split('T')[0];
      const end = new Date(p.endDate).toISOString().split('T')[0];
      return dateStr >= start && dateStr <= end;
    });
  };

  const isToday = (date: Date) => {
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  const prevMonth = () => setCurrentDate(new Date(year, month - 1, 1));
  const nextMonth = () => setCurrentDate(new Date(year, month + 1, 1));
  const goToday = () => setCurrentDate(new Date());

  return (
    <Card className="border-border/50">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold flex items-center gap-2">
            <CalendarDays className="h-5 w-5 text-emerald-600" />
            Activity Calendar
          </CardTitle>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={goToday}>
              Today
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8" onClick={prevMonth}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <span className="text-sm font-medium min-w-[140px] text-center">
              {MONTHS[month]} {year}
            </span>
            <Button variant="ghost" size="icon" className="h-8 w-8" onClick={nextMonth}>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {/* Day headers */}
        <div className="grid grid-cols-7 gap-px bg-border/30 rounded-t-lg overflow-hidden">
          {DAYS.map((day) => (
            <div key={day} className="bg-muted/50 py-2 text-center text-xs font-medium text-muted-foreground">
              {day}
            </div>
          ))}
        </div>

        {/* Calendar grid */}
        <div className="grid grid-cols-7 gap-px bg-border/30 rounded-b-lg overflow-hidden">
          {calendarDays.map((dayInfo, idx) => {
            const dayPlans = getPlansForDate(dayInfo.date);
            const isSelected = selectedDate?.toDateString() === dayInfo.date.toDateString();

            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: idx * 0.005 }}
                className={cn(
                  'bg-card min-h-[80px] p-1.5 cursor-pointer transition-colors hover:bg-muted/30',
                  !dayInfo.isCurrentMonth && 'bg-muted/20 opacity-50',
                  isSelected && 'ring-2 ring-emerald-500 ring-inset'
                )}
                onClick={() => setSelectedDate(dayInfo.date)}
              >
                <div className="flex items-center justify-between">
                  <span
                    className={cn(
                      'text-xs font-medium',
                      isToday(dayInfo.date)
                        ? 'bg-emerald-600 text-white rounded-full w-6 h-6 flex items-center justify-center'
                        : 'text-foreground'
                    )}
                  >
                    {dayInfo.date.getDate()}
                  </span>
                </div>
                <div className="mt-1 space-y-0.5">
                  {dayPlans.slice(0, 2).map((plan) => (
                    <div
                      key={plan.id}
                      className="flex items-center gap-1"
                      onClick={(e) => {
                        e.stopPropagation();
                        onPlanClick?.(plan);
                      }}
                    >
                      {plan.activities.slice(0, 1).map((activity) => (
                        <div
                          key={activity}
                          className={cn('h-1.5 w-1.5 rounded-full shrink-0', ACTIVITY_COLORS[activity])}
                        />
                      ))}
                      <span className="text-[10px] text-muted-foreground truncate">{plan.name}</span>
                    </div>
                  ))}
                  {dayPlans.length > 2 && (
                    <span className="text-[10px] text-emerald-600 font-medium">+{dayPlans.length - 2} more</span>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Selected date detail */}
        <AnimatePresence>
          {selectedDate && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-4 border-t pt-4"
            >
              <h4 className="text-sm font-medium mb-2">
                Plans for {selectedDate.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
              </h4>
              {getPlansForDate(selectedDate).length === 0 ? (
                <p className="text-sm text-muted-foreground">No plans on this date.</p>
              ) : (
                <div className="space-y-2">
                  {getPlansForDate(selectedDate).map((plan) => (
                    <div
                      key={plan.id}
                      className="flex items-center gap-2 p-2 rounded-lg hover:bg-muted/50 cursor-pointer transition-colors"
                      onClick={() => onPlanClick?.(plan)}
                    >
                      <div className="flex gap-0.5">
                        {plan.activities.map((a) => (
                          <div key={a} className={cn('h-2 w-2 rounded-full', ACTIVITY_COLORS[a])} />
                        ))}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">{plan.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {plan.status} · ${plan.budget.spent} / ${plan.budget.allocated}
                        </p>
                      </div>
                      <Badge variant="secondary" className="text-xs shrink-0">
                        {plan.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </CardContent>
    </Card>
  );
}
