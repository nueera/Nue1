// @ts-nocheck
'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MetricCard } from '@/modules/marketing/components/shared/metric-card';
import { useJourneyAnalytics } from '@/modules/marketing/hooks/use-journeys';
import type { JourneyNode, JourneyEdge } from '@/modules/marketing/types';
import {
  Users,
  TrendingUp,
  ArrowRight,
  CheckCircle2,
  BarChart3,
} from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from 'recharts';

interface JourneyAnalyticsProps {
  journeyId: string;
}

const mockPathStats = [
  { path: 'Trigger → Email → Exit', count: 845, percentage: 67 },
  { path: 'Trigger → Email → Condition → Yes → Exit', count: 210, percentage: 17 },
  { path: 'Trigger → Email → Condition → No → SMS → Exit', count: 178, percentage: 14 },
  { path: 'Dropped', count: 27, percentage: 2 },
];

const mockDailyStats = [
  { date: 'Mon', entered: 45, completed: 32 },
  { date: 'Tue', entered: 52, completed: 38 },
  { date: 'Wed', entered: 38, completed: 30 },
  { date: 'Thu', entered: 61, completed: 48 },
  { date: 'Fri', entered: 55, completed: 42 },
  { date: 'Sat', entered: 28, completed: 22 },
  { date: 'Sun', entered: 25, completed: 18 },
];

export function JourneyAnalytics({ journeyId }: JourneyAnalyticsProps) {
  const { data: analyticsData } = useJourneyAnalytics(journeyId);

  return (
    <div className="space-y-4 max-w-2xl mx-auto">
      <div>
        <h3 className="text-lg font-semibold text-foreground">Journey Analytics</h3>
        <p className="text-sm text-muted-foreground mt-1">Performance metrics for this journey</p>
      </div>

      {/* Overview Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <MetricCard icon={Users} title="Enrolled" value="1,260" change={12} accentColor="text-violet-600" accentBg="bg-violet-50 dark:bg-violet-950/30" />
        <MetricCard icon={TrendingUp} title="Active" value="412" change={8} accentColor="text-emerald-600" accentBg="bg-emerald-50 dark:bg-emerald-950/30" />
        <MetricCard icon={CheckCircle2} title="Completed" value="812" change={15} accentColor="text-blue-600" accentBg="bg-blue-50 dark:bg-blue-950/30" />
        <MetricCard icon={ArrowRight} title="Completion Rate" value="64%" change={5} accentColor="text-amber-600" accentBg="bg-amber-50 dark:bg-amber-950/30" />
      </div>

      {/* Daily Flow Chart */}
      <div className="animate-in fade-in slide-in-from-bottom-2 duration-200" style={{ animationDelay: '100ms', animationFillMode: 'both' }}>
        <Card className="border-border/50">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Daily Flow</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={mockDailyStats} margin={{ top: 5, right: 10, left: -10, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
                  <XAxis dataKey="date" tick={{ fontSize: 11 }} stroke="hsl(var(--muted-foreground))" />
                  <YAxis tick={{ fontSize: 11 }} stroke="hsl(var(--muted-foreground))" />
                  <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: '8px', fontSize: '12px' }} />
                  <Bar dataKey="entered" fill="#8b5cf6" radius={[4, 4, 0, 0]} name="Entered" />
                  <Bar dataKey="completed" fill="#10b981" radius={[4, 4, 0, 0]} name="Completed" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Path Statistics */}
      <div className="animate-in fade-in slide-in-from-bottom-2 duration-200" style={{ animationDelay: '150ms', animationFillMode: 'both' }}>
        <Card className="border-border/50">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm flex items-center gap-2">
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
              Path Statistics
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {mockPathStats.map((stat, i) => (
              <div key={i} className="space-y-1">
                <div className="flex items-center justify-between">
                  <p className="text-xs text-foreground truncate flex-1 mr-3">{stat.path}</p>
                  <div className="flex items-center gap-2 shrink-0">
                    <span className="text-xs font-semibold">{stat.count.toLocaleString()}</span>
                    <span className="text-[10px] text-muted-foreground">({stat.percentage}%)</span>
                  </div>
                </div>
                <div className="w-full bg-muted rounded-full h-1.5">
                  <div
                    className={cn(
                      'h-1.5 rounded-full transition-all',
                      stat.path === 'Dropped' ? 'bg-red-400' : 'bg-violet-500'
                    )}
                    style={{ width: `${stat.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function cn(...classes: (string | undefined | false)[]) {
  return classes.filter(Boolean).join(' ');
}
