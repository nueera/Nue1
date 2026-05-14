// @ts-nocheck
'use client';

import {
  CalendarDays,
  DollarSign,
  Target,
  CheckCircle2,
  Clock,
  AlertTriangle,
  ArrowRight,
  TrendingUp,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { MetricCard } from '../shared/metric-card';
import { BudgetProgressBar } from '../budget-progress-bar';
import { cn } from '@/lib/utils';
import { formatCurrency, calculateBudgetUtilization } from '@/modules/marketing/utils';
import type { BudgetInfo } from '@/modules/marketing/utils';

// ---------------------------------------------------------------------------
// Mock Data
// ---------------------------------------------------------------------------

const activePlans = [
  { id: '1', name: 'Q2 Growth Strategy', status: 'active' as const, progress: 68, budgetUsed: 45200, budgetTotal: 75000, startDate: '2025-04-01', endDate: '2025-06-30' },
  { id: '2', name: 'Product Launch: Pro', status: 'active' as const, progress: 42, budgetUsed: 18400, budgetTotal: 40000, startDate: '2025-05-01', endDate: '2025-07-31' },
  { id: '3', name: 'Summer Campaign', status: 'planning' as const, progress: 15, budgetUsed: 2100, budgetTotal: 25000, startDate: '2025-06-01', endDate: '2025-08-31' },
];

const budgetData: BudgetInfo = {
  allocated: 140000,
  spent: 65700,
  remaining: 74300,
  currency: 'USD',
};

const upcomingActivities = [
  { id: '1', title: 'Email blast: Summer Sale', type: 'campaign', date: 'Mar 4', time: '9:00 AM', urgency: 'high' },
  { id: '2', title: 'Blog post: Industry Trends', type: 'content', date: 'Mar 6', time: '10:00 AM', urgency: 'medium' },
  { id: '3', title: 'Social media audit', type: 'review', date: 'Mar 8', time: '2:00 PM', urgency: 'low' },
  { id: '4', title: 'A/B test review meeting', type: 'meeting', date: 'Mar 10', time: '11:00 AM', urgency: 'medium' },
  { id: '5', title: 'Q2 budget review deadline', type: 'deadline', date: 'Mar 12', time: 'EOD', urgency: 'high' },
  { id: '6', title: 'Webinar: Product Demo', type: 'event', date: 'Mar 15', time: '1:00 PM', urgency: 'medium' },
];

const milestones = [
  { id: '1', name: 'Q2 Campaign Launch', dueDate: 'Mar 15', completed: true, completedAt: 'Mar 14' },
  { id: '2', name: '10K New Leads Target', dueDate: 'Apr 30', completed: false },
  { id: '3', name: 'Revenue Goal $500K', dueDate: 'Jun 30', completed: false },
  { id: '4', name: 'Brand Awareness +25%', dueDate: 'Jun 30', completed: false },
  { id: '5', name: 'Customer NPS > 60', dueDate: 'Jun 30', completed: false },
];

const sparkPlans = [{ value: 3 }, { value: 4 }, { value: 3 }, { value: 5 }, { value: 4 }, { value: 3 }];
const sparkBudget = [{ value: 52 }, { value: 58 }, { value: 61 }, { value: 64 }, { value: 66 }, { value: 47 }];
const sparkActivities = [{ value: 12 }, { value: 15 }, { value: 18 }, { value: 14 }, { value: 22 }, { value: 16 }];
const sparkMilestones = [{ value: 20 }, { value: 25 }, { value: 30 }, { value: 35 }, { value: 40 }, { value: 45 }];

const ACTIVITY_STYLES: Record<string, { bg: string; color: string }> = {
  campaign: { bg: 'bg-blue-50 dark:bg-blue-950/30', color: 'text-blue-600' },
  content: { bg: 'bg-emerald-50 dark:bg-emerald-950/30', color: 'text-emerald-600' },
  review: { bg: 'bg-amber-50 dark:bg-amber-950/30', color: 'text-amber-600' },
  meeting: { bg: 'bg-violet-50 dark:bg-violet-950/30', color: 'text-violet-600' },
  deadline: { bg: 'bg-red-50 dark:bg-red-950/30', color: 'text-red-600' },
  event: { bg: 'bg-teal-50 dark:bg-teal-950/30', color: 'text-teal-600' },
};

const URGENCY_STYLES: Record<string, string> = {
  high: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300',
  medium: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300',
  low: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300',
};

// ---------------------------------------------------------------------------
// Planner Dashboard
// ---------------------------------------------------------------------------

export function PlannerDashboard() {
  const budgetUtil = calculateBudgetUtilization(budgetData);
  const completedMilestones = milestones.filter((m) => m.completed).length;

  return (
    <div className="space-y-6 p-4 sm:p-6">
      {/* Page Header */}
      <div className="animate-in fade-in slide-in-from-top-1 duration-200">
        <h1 className="text-2xl font-bold text-foreground tracking-tight">Planner Dashboard</h1>
        <p className="text-sm text-muted-foreground mt-1">Marketing plans, budgets, and milestones</p>
      </div>

      {/* KPI Cards */}
      <div
        className="animate-in fade-in duration-200 delay-75 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
      >
        <MetricCard
          icon={CalendarDays}
          title="Active Plans"
          value="3"
          change={25}
          changeLabel="vs last quarter"
          sparklineData={sparkPlans}
          accentColor="text-blue-600"
          accentBg="bg-blue-50 dark:bg-blue-950/30"
        />
        <MetricCard
          icon={DollarSign}
          title="Budget Utilization"
          value={`${budgetUtil}%`}
          change={-4.2}
          changeLabel="vs last month"
          sparklineData={sparkBudget}
          accentColor="text-emerald-600"
          accentBg="bg-emerald-50 dark:bg-emerald-950/30"
        />
        <MetricCard
          icon={Target}
          title="Upcoming Activities"
          value="16"
          change={14.3}
          changeLabel="this week"
          sparklineData={sparkActivities}
          accentColor="text-amber-600"
          accentBg="bg-amber-50 dark:bg-amber-950/30"
        />
        <MetricCard
          icon={CheckCircle2}
          title="Milestone Progress"
          value={`${Math.round((completedMilestones / milestones.length) * 100)}%`}
          change={12}
          changeLabel="completed"
          sparklineData={sparkMilestones}
          accentColor="text-teal-600"
          accentBg="bg-teal-50 dark:bg-teal-950/30"
        />
      </div>

      {/* Active Plans + Budget Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Active Plans */}
        <div className="animate-in fade-in slide-in-from-bottom-2 duration-200 delay-100 lg:col-span-2">
          <Card className="border-border/50">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base font-semibold">Active Plans</CardTitle>
                <Button variant="ghost" size="sm" className="text-xs">View All</Button>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="space-y-4">
                {activePlans.map((plan) => (
                  <div
                    key={plan.id}
                    className="flex flex-col sm:flex-row sm:items-center gap-4 p-4 rounded-lg border border-border/50 hover:bg-muted/20 transition-colors"
                  >
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <h4 className="text-sm font-semibold text-foreground">{plan.name}</h4>
                        <Badge
                          variant="outline"
                          className={cn(
                            'text-[10px] font-medium',
                            plan.status === 'active'
                              ? 'bg-emerald-100 text-emerald-700 border-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-300 dark:border-emerald-800'
                              : 'bg-amber-100 text-amber-700 border-amber-200 dark:bg-amber-900/30 dark:text-amber-300 dark:border-amber-800'
                          )}
                        >
                          {plan.status}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">
                        {new Date(plan.startDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} — {new Date(plan.endDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                      </p>
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-xs text-muted-foreground">Progress</span>
                        <span className="text-xs font-medium text-foreground tabular-nums">{plan.progress}%</span>
                      </div>
                      <Progress value={plan.progress} className="h-2" />
                    </div>

                    <div className="sm:w-40">
                      <BudgetProgressBar
                        budget={{
                          allocated: plan.budgetTotal,
                          spent: plan.budgetUsed,
                          remaining: plan.budgetTotal - plan.budgetUsed,
                          currency: 'USD',
                        }}
                        showLabels={true}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Budget Utilization Overview */}
        <div className="animate-in fade-in slide-in-from-bottom-2 duration-200 delay-150">
          <Card className="border-border/50 h-full">
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-semibold">Budget Overview</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              {/* Budget circle */}
              <div className="flex items-center justify-center py-4">
                <div className="relative w-32 h-32">
                  <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
                    <circle cx="60" cy="60" r="50" fill="none" stroke="currentColor" className="text-muted" strokeWidth="10" />
                    <circle
                      cx="60" cy="60" r="50" fill="none"
                      stroke={budgetUtil >= 90 ? '#ef4444' : budgetUtil >= 60 ? '#3b82f6' : '#10b981'}
                      strokeWidth="10"
                      strokeDasharray={`${(budgetUtil / 100) * 314.16} 314.16`}
                      strokeLinecap="round"
                      className="transition-all duration-700"
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-2xl font-bold text-foreground tabular-nums">{budgetUtil}%</span>
                    <span className="text-[10px] text-muted-foreground">utilized</span>
                  </div>
                </div>
              </div>

              {/* Budget details */}
              <div className="space-y-3 mt-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Allocated</span>
                  <span className="text-sm font-semibold text-foreground">{formatCurrency(budgetData.allocated)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Spent</span>
                  <span className="text-sm font-semibold text-foreground">{formatCurrency(budgetData.spent)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Remaining</span>
                  <span className="text-sm font-semibold text-emerald-600">{formatCurrency(budgetData.remaining)}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Upcoming Activities + Milestone Progress */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Upcoming Activities Timeline */}
        <div className="animate-in fade-in slide-in-from-bottom-2 duration-200 delay-200">
          <Card className="border-border/50">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base font-semibold">Upcoming Activities</CardTitle>
                <Button variant="ghost" size="sm" className="text-xs">View All</Button>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="space-y-1 max-h-96 overflow-y-auto">
                {upcomingActivities.map((activity) => {
                  const style = ACTIVITY_STYLES[activity.type] ?? ACTIVITY_STYLES.content;
                  return (
                    <div
                      key={activity.id}
                      className="flex items-center gap-3 py-2.5 px-2 rounded-lg hover:bg-muted/30 transition-colors"
                    >
                      <div className={cn('flex items-center justify-center w-8 h-8 rounded-lg shrink-0', style.bg)}>
                        <CalendarDays className={cn('h-4 w-4', style.color)} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-foreground truncate">{activity.title}</p>
                        <p className="text-xs text-muted-foreground">
                          {activity.date} · {activity.time}
                        </p>
                      </div>
                      <Badge variant="outline" className={cn('text-[10px] font-medium', URGENCY_STYLES[activity.urgency])}>
                        {activity.urgency}
                      </Badge>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Milestone Progress */}
        <div className="animate-in fade-in slide-in-from-bottom-2 duration-200 delay-[250ms]">
          <Card className="border-border/50">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base font-semibold">Milestone Progress</CardTitle>
                <span className="text-xs text-muted-foreground">
                  {completedMilestones}/{milestones.length} completed
                </span>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="space-y-4">
                {milestones.map((milestone) => (
                  <div key={milestone.id} className="flex items-start gap-3">
                    <div className="mt-0.5">
                      {milestone.completed ? (
                        <CheckCircle2 className="h-5 w-5 text-emerald-600" />
                      ) : (
                        <div className="h-5 w-5 rounded-full border-2 border-muted-foreground/30" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <p className={cn(
                          'text-sm font-medium',
                          milestone.completed ? 'text-emerald-600 line-through decoration-emerald-400' : 'text-foreground'
                        )}>
                          {milestone.name}
                        </p>
                      </div>
                      <div className="flex items-center gap-2 mt-1">
                        <Clock className="h-3 w-3 text-muted-foreground" />
                        <span className="text-xs text-muted-foreground">
                          Due: {milestone.dueDate}
                        </span>
                        {milestone.completed && milestone.completedAt && (
                          <span className="text-xs text-emerald-600">
                            ✓ Completed {milestone.completedAt}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Overall progress bar */}
              <div className="mt-6 pt-4 border-t border-border/50">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-foreground">Overall Progress</span>
                  <span className="text-sm font-bold text-foreground tabular-nums">
                    {Math.round((completedMilestones / milestones.length) * 100)}%
                  </span>
                </div>
                <Progress value={(completedMilestones / milestones.length) * 100} className="h-2" />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
