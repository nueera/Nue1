'use client';

import { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { GanttChart, ZoomIn, ZoomOut, ChevronLeft, ChevronRight } from 'lucide-react';
import { usePlans } from '@/modules/marketing/hooks/use-planner';
import type { MarketingPlan } from '@/modules/marketing/types';
import { cn } from '@/lib/utils';

const STATUS_COLORS: Record<string, string> = {
  planning: 'bg-amber-400',
  active: 'bg-emerald-500',
  completed: 'bg-blue-500',
  on_hold: 'bg-gray-400',
  cancelled: 'bg-red-400',
};

interface PlannerTimelineProps {
  plans?: MarketingPlan[];
  onPlanClick?: (plan: MarketingPlan) => void;
}

export function PlannerTimeline({ plans: externalPlans, onPlanClick }: PlannerTimelineProps) {
  const { data: plansData } = usePlans();
  const plans = externalPlans ?? plansData?.data ?? [];

  const [zoom, setZoom] = useState(1);
  const [scrollOffset, setScrollOffset] = useState(0);

  const allDates = useMemo(() => {
    if (plans.length === 0) return { start: new Date(), end: new Date() };
    const starts = plans.map((p) => new Date(p.startDate).getTime());
    const ends = plans.map((p) => new Date(p.endDate).getTime());
    const minTime = Math.min(...starts);
    const maxTime = Math.max(...ends);
    const start = new Date(minTime);
    start.setDate(start.getDate() - 7);
    const end = new Date(maxTime);
    end.setDate(end.getDate() + 7);
    return { start, end };
  }, [plans]);

  const totalDays = useMemo(() => {
    const diff = allDates.end.getTime() - allDates.start.getTime();
    return Math.ceil(diff / (1000 * 60 * 60 * 24));
  }, [allDates]);

  const monthMarkers = useMemo(() => {
    const markers: Array<{ label: string; position: number }> = [];
    const current = new Date(allDates.start.getFullYear(), allDates.start.getMonth(), 1);
    while (current <= allDates.end) {
      const dayOffset = Math.ceil((current.getTime() - allDates.start.getTime()) / (1000 * 60 * 60 * 24));
      markers.push({
        label: current.toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
        position: (dayOffset / totalDays) * 100,
      });
      current.setMonth(current.getMonth() + 1);
    }
    return markers;
  }, [allDates, totalDays]);

  const getBarPosition = (plan: MarketingPlan) => {
    const start = new Date(plan.startDate).getTime();
    const end = new Date(plan.endDate).getTime();
    const rangeStart = allDates.start.getTime();
    const rangeEnd = allDates.end.getTime();
    const left = ((start - rangeStart) / (rangeEnd - rangeStart)) * 100;
    const width = ((end - start) / (rangeEnd - rangeStart)) * 100;
    return { left: Math.max(0, left), width: Math.min(100 - Math.max(0, left), width) };
  };

  return (
    <Card className="border-border/50">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold flex items-center gap-2">
            <GanttChart className="h-5 w-5 text-emerald-600" />
            Timeline View
          </CardTitle>
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={() => setZoom(Math.max(0.5, zoom - 0.25))}
            >
              <ZoomOut className="h-4 w-4" />
            </Button>
            <span className="text-xs text-muted-foreground w-12 text-center">{Math.round(zoom * 100)}%</span>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={() => setZoom(Math.min(3, zoom + 0.25))}
            >
              <ZoomIn className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {plans.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <GanttChart className="h-12 w-12 text-muted-foreground/30 mb-3" />
            <p className="text-sm text-muted-foreground">No plans to display on the timeline.</p>
          </div>
        ) : (
          <div className="overflow-x-auto" style={{ maxWidth: '100%' }}>
            <div style={{ width: `${totalDays * 4 * zoom}px`, minWidth: '100%' }}>
              {/* Month markers */}
              <div className="relative h-8 border-b mb-2">
                {monthMarkers.map((m, i) => (
                  <div
                    key={i}
                    className="absolute top-0 text-xs text-muted-foreground font-medium"
                    style={{ left: `${m.position}%` }}
                  >
                    {m.label}
                  </div>
                ))}
              </div>

              {/* Plan rows */}
              <TooltipProvider>
                <div className="space-y-1">
                  {plans.map((plan, idx) => {
                    const { left, width } = getBarPosition(plan);
                    return (
                      <div
                        key={plan.id}
                        className="animate-in fade-in slide-in-from-left-2 duration-200 flex items-center gap-3 group"
                        style={{ animationDelay: `${idx * 50}ms`, animationFillMode: 'both' }}
                      >
                        <div className="w-40 shrink-0 truncate">
                          <p className="text-sm font-medium truncate">{plan.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {new Date(plan.startDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                            {' – '}
                            {new Date(plan.endDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                          </p>
                        </div>
                        <div className="flex-1 relative h-8 bg-muted/30 rounded">
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <div
                                className={cn(
                                  'absolute top-1 h-6 rounded-md cursor-pointer transition-all hover:opacity-90 flex items-center px-2',
                                  STATUS_COLORS[plan.status] ?? 'bg-gray-400'
                                )}
                                style={{ left: `${left}%`, width: `${Math.max(width, 1)}%` }}
                                onClick={() => onPlanClick?.(plan)}
                              >
                                <span className="text-[10px] text-white font-medium truncate">
                                  {plan.name}
                                </span>
                              </div>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p className="font-medium">{plan.name}</p>
                              <p className="text-xs text-muted-foreground">
                                Budget: ${plan.budget.spent} / ${plan.budget.allocated}
                              </p>
                              <p className="text-xs text-muted-foreground">
                                Status: {plan.status.replace('_', ' ')}
                              </p>
                            </TooltipContent>
                          </Tooltip>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </TooltipProvider>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
