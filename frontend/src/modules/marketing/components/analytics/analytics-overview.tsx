// @ts-nocheck
'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from '@/components/ui/select';
import {
  BarChart3, TrendingUp, Users, Mail, Target, DollarSign,
  ArrowUpRight, ArrowDownRight, Download,
} from 'lucide-react';
import {
  AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, PieChart, Pie, Cell,
} from 'recharts';
import { useAnalyticsOverview } from '@/modules/marketing/hooks/use-analytics';
import { cn } from '@/lib/utils';
import { useState } from 'react';

const COLORS = ['#10b981', '#3b82f6', '#f59e0b', '#8b5cf6', '#ec4899', '#06b6d4'];

interface AnalyticsOverviewProps {
  onExport?: () => void;
}

export function AnalyticsOverview({ onExport }: AnalyticsOverviewProps) {
  const { data: analyticsData, isLoading } = useAnalyticsOverview();
  const [period, setPeriod] = useState('30d');

  const metrics = [
    { icon: Mail, label: 'Total Sent', value: '45,280', change: 12.5, bg: 'bg-emerald-50 dark:bg-emerald-950/30', color: 'text-emerald-600' },
    { icon: Target, label: 'Open Rate', value: '24.8%', change: 3.2, bg: 'bg-blue-50 dark:bg-blue-950/30', color: 'text-blue-600' },
    { icon: TrendingUp, label: 'Click Rate', value: '8.6%', change: -1.4, bg: 'bg-amber-50 dark:bg-amber-950/30', color: 'text-amber-600' },
    { icon: DollarSign, label: 'Revenue', value: '$128,450', change: 18.7, bg: 'bg-purple-50 dark:bg-purple-950/30', color: 'text-purple-600' },
  ];

  const performanceData = [
    { month: 'Jan', sent: 38000, opened: 9120, clicked: 3192 },
    { month: 'Feb', sent: 41000, opened: 9840, clicked: 3444 },
    { month: 'Mar', sent: 43500, opened: 10440, clicked: 3654 },
    { month: 'Apr', sent: 42000, opened: 10080, clicked: 3528 },
    { month: 'May', sent: 44800, opened: 10752, clicked: 3763 },
    { month: 'Jun', sent: 45280, opened: 10867, clicked: 3894 },
  ];

  const channelData = [
    { name: 'Email', value: 42 },
    { name: 'SMS', value: 18 },
    { name: 'WhatsApp', value: 15 },
    { name: 'Social', value: 14 },
    { name: 'Web Push', value: 11 },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight flex items-center gap-2">
            <BarChart3 className="h-6 w-6 text-emerald-600" />
            Analytics Overview
          </h2>
          <p className="text-sm text-muted-foreground mt-0.5">Monitor your marketing performance across all channels.</p>
        </div>
        <div className="flex items-center gap-2">
          <Select value={period} onValueChange={setPeriod}>
            <SelectTrigger className="w-[120px] h-9">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="90d">Last 90 days</SelectItem>
              <SelectItem value="12m">Last 12 months</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="sm" onClick={onExport}>
            <Download className="h-4 w-4 mr-2" />Export
          </Button>
        </div>
      </div>

      {/* KPI cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((m, idx) => {
          const isPositive = m.change >= 0;
          return (
            <div key={m.label} className="animate-in fade-in slide-in-from-bottom-2 duration-200" style={{ animationDelay: `${idx * 50}ms`, animationFillMode: 'both' }}>
              <Card className="border-border/50">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className={cn('flex items-center justify-center w-10 h-10 rounded-xl', m.bg)}>
                      <m.icon className={cn('h-5 w-5', m.color)} />
                    </div>
                    <div className={cn('flex items-center gap-0.5 text-xs font-medium', isPositive ? 'text-emerald-600' : 'text-red-600')}>
                      {isPositive ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
                      {Math.abs(m.change)}%
                    </div>
                  </div>
                  <p className="text-2xl font-bold text-foreground mt-3 tabular-nums">{m.value}</p>
                  <p className="text-sm text-muted-foreground">{m.label}</p>
                </CardContent>
              </Card>
            </div>
          );
        })}
      </div>

      {/* Performance chart */}
      <Card className="border-border/50">
        <CardHeader className="pb-2">
          <CardTitle className="text-base font-semibold flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-emerald-600" />
            Campaign Performance
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={performanceData} margin={{ top: 5, right: 20, left: 20, bottom: 5 }}>
                <defs>
                  <linearGradient id="sentGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#10b981" stopOpacity={0.15} />
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="openGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#3b82f6" stopOpacity={0.15} />
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
                <XAxis dataKey="month" tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
                <YAxis tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
                <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: '8px', fontSize: '12px' }} />
                <Area type="monotone" dataKey="sent" stroke="#10b981" strokeWidth={2} fill="url(#sentGrad)" name="Sent" />
                <Area type="monotone" dataKey="opened" stroke="#3b82f6" strokeWidth={2} fill="url(#openGrad)" name="Opened" />
                <Area type="monotone" dataKey="clicked" stroke="#f59e0b" strokeWidth={2} fill="none" name="Clicked" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Channel distribution + Top campaigns */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card className="border-border/50">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-semibold">Channel Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-56">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={channelData} cx="50%" cy="50%" innerRadius={50} outerRadius={85} dataKey="value" paddingAngle={2}>
                    {channelData.map((_, idx) => (
                      <Cell key={idx} fill={COLORS[idx % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: '8px', fontSize: '12px' }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex flex-wrap gap-3 mt-2">
              {channelData.map((item, idx) => (
                <div key={item.name} className="flex items-center gap-1.5 text-xs">
                  <div className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: COLORS[idx % COLORS.length] }} />
                  <span className="text-muted-foreground">{item.name} ({item.value}%)</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/50">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-semibold">Monthly Breakdown</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-56">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={performanceData} margin={{ top: 5, right: 20, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
                  <XAxis dataKey="month" tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
                  <YAxis tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
                  <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: '8px', fontSize: '12px' }} />
                  <Bar dataKey="opened" fill="#10b981" radius={[4, 4, 0, 0]} name="Opened" />
                  <Bar dataKey="clicked" fill="#3b82f6" radius={[4, 4, 0, 0]} name="Clicked" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
