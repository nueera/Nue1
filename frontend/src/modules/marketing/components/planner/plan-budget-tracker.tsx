// @ts-nocheck
'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DollarSign, TrendingUp, TrendingDown, Wallet } from 'lucide-react';
import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, ReferenceLine } from 'recharts';
import type { MarketingPlan } from '@/modules/marketing/types';
import { cn } from '@/lib/utils';

interface PlanBudgetTrackerProps {
  plan: MarketingPlan;
}

export function PlanBudgetTracker({ plan }: PlanBudgetTrackerProps) {
  const { allocated, spent, remaining, currency } = plan.budget;
  const percent = allocated > 0 ? Math.round((spent / allocated) * 100) : 0;
  const isOverBudget = spent > allocated;

  const chartData = [
    { category: 'Total Budget', allocated, spent },
    { category: 'Remaining', allocated: remaining, spent: 0 },
  ];

  // Simulated monthly breakdown
  const monthlyData = [
    { month: 'Jan', budget: Math.round(allocated * 0.15), actual: Math.round(spent * 0.12) },
    { month: 'Feb', budget: Math.round(allocated * 0.15), actual: Math.round(spent * 0.14) },
    { month: 'Mar', budget: Math.round(allocated * 0.2), actual: Math.round(spent * 0.18) },
    { month: 'Apr', budget: Math.round(allocated * 0.2), actual: Math.round(spent * 0.22) },
    { month: 'May', budget: Math.round(allocated * 0.15), actual: Math.round(spent * 0.17) },
    { month: 'Jun', budget: Math.round(allocated * 0.15), actual: Math.round(spent * 0.17) },
  ];

  return (
    <div className="space-y-4">
      {/* Summary cards */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { icon: Wallet, label: 'Allocated', value: `${currency} ${allocated.toLocaleString()}`, color: 'text-blue-600', bg: 'bg-blue-50 dark:bg-blue-950/30' },
          { icon: TrendingUp, label: 'Spent', value: `${currency} ${spent.toLocaleString()}`, color: 'text-emerald-600', bg: 'bg-emerald-50 dark:bg-emerald-950/30' },
          { icon: TrendingDown, label: 'Remaining', value: `${currency} ${remaining.toLocaleString()}`, color: isOverBudget ? 'text-red-600' : 'text-amber-600', bg: isOverBudget ? 'bg-red-50 dark:bg-red-950/30' : 'bg-amber-50 dark:bg-amber-950/30' },
        ].map((item, idx) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.05 }}
          >
            <Card className="border-border/50">
              <CardContent className="p-4">
                <div className={cn('flex items-center justify-center w-8 h-8 rounded-lg', item.bg)}>
                  <item.icon className={cn('h-4 w-4', item.color)} />
                </div>
                <p className="text-xl font-bold text-foreground mt-2 tabular-nums">{item.value}</p>
                <p className="text-xs text-muted-foreground">{item.label}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Budget progress bar */}
      <Card className="border-border/50">
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">Budget Utilization</span>
            <span className={cn('text-sm font-semibold', isOverBudget ? 'text-red-600' : 'text-foreground')}>
              {percent}%
            </span>
          </div>
          <div className="h-3 bg-muted rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${Math.min(100, percent)}%` }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className={cn(
                'h-full rounded-full',
                isOverBudget ? 'bg-red-500' : percent > 80 ? 'bg-amber-500' : 'bg-emerald-500'
              )}
            />
          </div>
        </CardContent>
      </Card>

      {/* Budget vs Actual chart */}
      <Card className="border-border/50">
        <CardHeader className="pb-2">
          <CardTitle className="text-base font-semibold flex items-center gap-2">
            <DollarSign className="h-4 w-4 text-emerald-600" />
            Budget vs Actual (Monthly)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyData} margin={{ top: 5, right: 20, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
                <XAxis dataKey="month" tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
                <YAxis tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px',
                    fontSize: '12px',
                  }}
                />
                <Legend />
                <Bar dataKey="budget" fill="#94a3b8" name="Budget" radius={[4, 4, 0, 0]} />
                <Bar dataKey="actual" fill="#10b981" name="Actual" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
