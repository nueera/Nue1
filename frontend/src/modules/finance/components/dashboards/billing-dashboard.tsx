'use client';

import { motion } from 'framer-motion';
import {
  CreditCard,
  TrendingUp,
  Users,
  ArrowUpRight,
  ArrowDownRight,
  RefreshCw,
  DollarSign,
  Activity,
} from 'lucide-react';
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useCountUp } from '../../hooks/use-count-up';
import { cn } from '@/lib/utils';

// ---------------------------------------------------------------------------
// Mock Data
// ---------------------------------------------------------------------------

const mrrTrendData = [
  { month: 'Jan', mrr: 18200 },
  { month: 'Feb', mrr: 19100 },
  { month: 'Mar', mrr: 20500 },
  { month: 'Apr', mrr: 21300 },
  { month: 'May', mrr: 22800 },
  { month: 'Jun', mrr: 24300 },
];

const revenueByPlanData = [
  { plan: 'Enterprise Suite', revenue: 14988, subscribers: 3 },
  { plan: 'Professional Plan', revenue: 3596, subscribers: 2 },
  { plan: 'Business Starter', revenue: 499, subscribers: 1 },
];

// ---------------------------------------------------------------------------
// KPI Card Component
// ---------------------------------------------------------------------------

function KPICard({ icon: Icon, label, value, change, prefix = '$', accentColor, accentBg }: {
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  label: string;
  value: number;
  change: number;
  prefix?: string;
  accentColor: string;
  accentBg: string;
}) {
  const displayValue = useCountUp({ end: value, duration: 1200, decimals: value % 1 !== 0 ? 2 : 0, prefix });

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] as const }}
    >
      <Card className="hover:shadow-md transition-shadow duration-200 border-border/50">
        <CardContent className="p-5">
          <div className="flex items-start justify-between">
            <div className={cn('flex items-center justify-center w-10 h-10 rounded-xl', accentBg)}>
              <Icon className={cn('h-5 w-5', accentColor)} strokeWidth={1.8} />
            </div>
            <Badge
              variant="secondary"
              className={cn(
                'text-xs font-medium gap-0.5',
                change >= 0 ? 'text-emerald-600 bg-emerald-50 dark:bg-emerald-950/30' : 'text-red-600 bg-red-50 dark:bg-red-950/30'
              )}
            >
              {change >= 0 ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
              {Math.abs(change)}%
            </Badge>
          </div>
          <div className="mt-4">
            <p className="text-2xl font-bold text-foreground tracking-tight tabular-nums">{displayValue}</p>
            <p className="text-sm text-muted-foreground mt-1">{label}</p>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

// ---------------------------------------------------------------------------
// Billing Dashboard
// ---------------------------------------------------------------------------

export function BillingDashboard() {
  return (
    <div className="space-y-6 p-4 sm:p-6">
      {/* Page Header */}
      <motion.div
        initial={{ opacity: 0, y: -4 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
      >
        <h1 className="text-2xl font-bold text-foreground tracking-tight">Billing Dashboard</h1>
        <p className="text-sm text-muted-foreground mt-1">MRR, subscriptions, and revenue metrics</p>
      </motion.div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard icon={DollarSign} label="Monthly Recurring Revenue" value={24300} change={6.6} accentColor="text-emerald-600" accentBg="bg-emerald-50 dark:bg-emerald-950/30" />
        <KPICard icon={TrendingUp} label="Annual Run Rate" value={291600} change={6.6} accentColor="text-sky-600" accentBg="bg-sky-50 dark:bg-sky-950/30" />
        <KPICard icon={Activity} label="Churn Rate" value={2.4} change={-0.8} prefix="" accentColor="text-red-500" accentBg="bg-red-50 dark:bg-red-950/30" />
        <KPICard icon={Users} label="Active Subscriptions" value={4} change={33.3} prefix="" accentColor="text-violet-600" accentBg="bg-violet-50 dark:bg-violet-950/30" />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* MRR Trend */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <Card className="border-border/50">
            <CardHeader className="pb-2">
              <CardTitle className="text-base font-semibold">MRR Trend</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <ResponsiveContainer width="100%" height={280}>
                <AreaChart data={mrrTrendData} margin={{ top: 8, right: 8, left: -8, bottom: 0 }}>
                  <defs>
                    <linearGradient id="mrrGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="var(--chart-2)" stopOpacity={0.2} />
                      <stop offset="95%" stopColor="var(--chart-2)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }} tickFormatter={(v: number) => `$${(v / 1000).toFixed(0)}k`} />
                  <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--popover))', border: '1px solid hsl(var(--border))', borderRadius: '8px', fontSize: '12px' }} formatter={(value: number) => [`$${value.toLocaleString()}`, 'MRR']} />
                  <Area type="monotone" dataKey="mrr" stroke="var(--chart-2)" strokeWidth={2} fill="url(#mrrGrad)" dot={false} animationDuration={800} />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>

        {/* Revenue by Plan */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.15 }}
        >
          <Card className="border-border/50">
            <CardHeader className="pb-2">
              <CardTitle className="text-base font-semibold">Revenue by Plan</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <ResponsiveContainer width="100%" height={280}>
                <BarChart data={revenueByPlanData} layout="vertical" margin={{ top: 8, right: 8, left: 8, bottom: 0 }}>
                  <XAxis type="number" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }} tickFormatter={(v: number) => `$${(v / 1000).toFixed(0)}k`} />
                  <YAxis type="category" dataKey="plan" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }} width={120} />
                  <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--popover))', border: '1px solid hsl(var(--border))', borderRadius: '8px', fontSize: '12px' }} formatter={(value: number) => [`$${value.toLocaleString()}`, 'Revenue']} />
                  <Bar dataKey="revenue" fill="var(--chart-1)" radius={[0, 4, 4, 0]} animationDuration={800} name="Revenue" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Subscription Breakdown */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.2 }}
      >
        <Card className="border-border/50">
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-semibold">Subscription Breakdown</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="space-y-4">
              {revenueByPlanData.map((plan) => {
                const totalRevenue = revenueByPlanData.reduce((sum, p) => sum + p.revenue, 0);
                const percentage = (plan.revenue / totalRevenue) * 100;
                return (
                  <div key={plan.plan} className="flex items-center gap-4">
                    <span className="text-sm font-medium text-foreground w-32 shrink-0 truncate">{plan.plan}</span>
                    <div className="flex-1">
                      <Progress value={percentage} className="h-2.5" />
                    </div>
                    <span className="text-sm font-semibold text-foreground w-16 text-right tabular-nums">${(plan.revenue / 1000).toFixed(1)}k</span>
                    <span className="text-xs text-muted-foreground w-10 text-right">{plan.subscribers} sub</span>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
