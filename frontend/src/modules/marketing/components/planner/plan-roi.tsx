// @ts-nocheck
'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, DollarSign, Percent, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { motion } from 'framer-motion';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line,
} from 'recharts';
import type { MarketingPlan } from '@/modules/marketing/types';
import { cn } from '@/lib/utils';

const COLORS = ['#10b981', '#f59e0b', '#3b82f6', '#8b5cf6', '#ec4899', '#06b6d4'];

interface PlanROIProps {
  plan: MarketingPlan;
}

export function PlanROI({ plan }: PlanROIProps) {
  const { allocated, spent, currency } = plan.budget;

  // Simulated ROI data
  const roiMetrics = {
    totalRevenue: Math.round(spent * 3.2),
    totalCost: spent,
    roi: spent > 0 ? Math.round(((spent * 3.2 - spent) / spent) * 100) : 0,
    roas: spent > 0 ? (3.2).toFixed(2) : '0.00',
    cpa: spent > 0 ? Math.round(spent / 120) : 0,
  };

  const channelBreakdown = [
    { channel: 'Email', revenue: Math.round(roiMetrics.totalRevenue * 0.35), cost: Math.round(spent * 0.2) },
    { channel: 'Social', revenue: Math.round(roiMetrics.totalRevenue * 0.25), cost: Math.round(spent * 0.3) },
    { channel: 'Paid Ads', revenue: Math.round(roiMetrics.totalRevenue * 0.2), cost: Math.round(spent * 0.35) },
    { channel: 'Content', revenue: Math.round(roiMetrics.totalRevenue * 0.15), cost: Math.round(spent * 0.1) },
    { channel: 'Events', revenue: Math.round(roiMetrics.totalRevenue * 0.05), cost: Math.round(spent * 0.05) },
  ];

  const trendData = [
    { month: 'Jan', roi: 120 },
    { month: 'Feb', roi: 145 },
    { month: 'Mar', roi: 180 },
    { month: 'Apr', roi: 210 },
    { month: 'May', roi: 260 },
    { month: 'Jun', roi: roiMetrics.roi },
  ];

  const pieData = channelBreakdown.map((c) => ({ name: c.channel, value: c.revenue }));

  return (
    <div className="space-y-4">
      {/* ROI metric cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { icon: DollarSign, label: 'Total Revenue', value: `${currency} ${roiMetrics.totalRevenue.toLocaleString()}`, change: 12.5, bg: 'bg-emerald-50 dark:bg-emerald-950/30', color: 'text-emerald-600' },
          { icon: Percent, label: 'ROI', value: `${roiMetrics.roi}%`, change: 8.3, bg: 'bg-blue-50 dark:bg-blue-950/30', color: 'text-blue-600' },
          { icon: TrendingUp, label: 'ROAS', value: `${roiMetrics.roas}x`, change: 5.2, bg: 'bg-amber-50 dark:bg-amber-950/30', color: 'text-amber-600' },
          { icon: DollarSign, label: 'CPA', value: `${currency} ${roiMetrics.cpa}`, change: -3.1, bg: 'bg-purple-50 dark:bg-purple-950/30', color: 'text-purple-600' },
        ].map((item, idx) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.05 }}
          >
            <Card className="border-border/50">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className={cn('flex items-center justify-center w-8 h-8 rounded-lg', item.bg)}>
                    <item.icon className={cn('h-4 w-4', item.color)} />
                  </div>
                  <div className={cn('flex items-center gap-0.5 text-xs font-medium', item.change >= 0 ? 'text-emerald-600' : 'text-red-600')}>
                    {item.change >= 0 ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
                    {Math.abs(item.change)}%
                  </div>
                </div>
                <p className="text-xl font-bold text-foreground tabular-nums">{item.value}</p>
                <p className="text-xs text-muted-foreground">{item.label}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* ROI Trend */}
      <Card className="border-border/50">
        <CardHeader className="pb-2">
          <CardTitle className="text-base font-semibold flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-emerald-600" />
            ROI Trend
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={trendData} margin={{ top: 5, right: 20, left: 20, bottom: 5 }}>
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
                <Line
                  type="monotone"
                  dataKey="roi"
                  stroke="#10b981"
                  strokeWidth={2}
                  dot={{ fill: '#10b981', r: 4 }}
                  activeDot={{ r: 6 }}
                  name="ROI %"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Channel ROI + Revenue distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card className="border-border/50">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-semibold">Channel ROI</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={channelBreakdown} layout="vertical" margin={{ top: 5, right: 20, left: 50, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
                  <XAxis type="number" tick={{ fontSize: 11 }} stroke="hsl(var(--muted-foreground))" />
                  <YAxis type="category" dataKey="channel" tick={{ fontSize: 11 }} stroke="hsl(var(--muted-foreground))" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'hsl(var(--card))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px',
                      fontSize: '12px',
                    }}
                  />
                  <Bar dataKey="revenue" fill="#10b981" name="Revenue" radius={[0, 4, 4, 0]} />
                  <Bar dataKey="cost" fill="#94a3b8" name="Cost" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/50">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-semibold">Revenue Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={70}
                    dataKey="value"
                    paddingAngle={2}
                  >
                    {pieData.map((_, idx) => (
                      <Cell key={idx} fill={COLORS[idx % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'hsl(var(--card))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px',
                      fontSize: '12px',
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex flex-wrap gap-3 mt-2">
              {pieData.map((item, idx) => (
                <div key={item.name} className="flex items-center gap-1.5 text-xs">
                  <div className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: COLORS[idx % COLORS.length] }} />
                  <span className="text-muted-foreground">{item.name}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
