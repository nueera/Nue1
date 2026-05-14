// @ts-nocheck
'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Globe, Users, Eye, TrendingUp, Clock, Monitor } from 'lucide-react';
import { motion } from 'framer-motion';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

interface WebAnalyticsDashboardProps {
  dateRange?: string;
}

export function WebAnalyticsDashboard({ dateRange }: WebAnalyticsDashboardProps) {
  const metrics = [
    { icon: Eye, label: 'Page Views', value: '145,280', change: 12.5, color: 'text-emerald-600', bg: 'bg-emerald-50 dark:bg-emerald-950/30' },
    { icon: Users, label: 'Unique Visitors', value: '42,180', change: 8.3, color: 'text-blue-600', bg: 'bg-blue-50 dark:bg-blue-950/30' },
    { icon: Clock, label: 'Avg. Session', value: '3m 24s', change: 2.1, color: 'text-amber-600', bg: 'bg-amber-50 dark:bg-amber-950/30' },
    { icon: TrendingUp, label: 'Bounce Rate', value: '38.5%', change: -3.2, color: 'text-purple-600', bg: 'bg-purple-50 dark:bg-purple-950/30' },
  ];

  const trafficData = [
    { date: 'Mon', views: 22000, visitors: 6800 },
    { date: 'Tue', views: 24500, visitors: 7500 },
    { date: 'Wed', views: 23000, visitors: 7100 },
    { date: 'Thu', views: 25800, visitors: 7900 },
    { date: 'Fri', views: 21000, visitors: 6400 },
    { date: 'Sat', views: 15200, visitors: 4800 },
    { date: 'Sun', views: 13780, visitors: 4280 },
  ];

  const deviceData = [
    { device: 'Desktop', sessions: 28000 },
    { device: 'Mobile', sessions: 35000 },
    { device: 'Tablet', sessions: 5800 },
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-2">
        <Globe className="h-5 w-5 text-emerald-600" />
        <h3 className="text-lg font-semibold">Web Analytics</h3>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {metrics.map((m, idx) => (
          <motion.div key={m.label} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.04 }}>
            <Card className="border-border/50">
              <CardContent className="p-4">
                <div className={`flex items-center justify-center w-8 h-8 rounded-lg ${m.bg} mb-2`}>
                  <m.icon className={`h-4 w-4 ${m.color}`} />
                </div>
                <p className="text-lg font-bold tabular-nums">{m.value}</p>
                <p className="text-xs text-muted-foreground">{m.label}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <Card className="border-border/50">
        <CardHeader className="pb-2">
          <CardTitle className="text-base font-semibold flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-emerald-600" />
            Traffic Trend
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={trafficData} margin={{ top: 5, right: 20, left: 20, bottom: 5 }}>
                <defs>
                  <linearGradient id="viewsGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#10b981" stopOpacity={0.15} />
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
                <XAxis dataKey="date" tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
                <YAxis tick={{ fontSize: 11 }} stroke="hsl(var(--muted-foreground))" />
                <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: '8px', fontSize: '12px' }} />
                <Area type="monotone" dataKey="views" stroke="#10b981" strokeWidth={2} fill="url(#viewsGrad)" name="Page Views" />
                <Area type="monotone" dataKey="visitors" stroke="#3b82f6" strokeWidth={2} fill="none" name="Visitors" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card className="border-border/50">
        <CardHeader className="pb-2">
          <CardTitle className="text-base font-semibold flex items-center gap-2">
            <Monitor className="h-4 w-4 text-emerald-600" />
            Device Breakdown
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-40">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={deviceData} layout="vertical" margin={{ top: 5, right: 20, left: 50, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
                <XAxis type="number" tick={{ fontSize: 11 }} stroke="hsl(var(--muted-foreground))" />
                <YAxis type="category" dataKey="device" tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
                <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: '8px', fontSize: '12px' }} />
                <Bar dataKey="sessions" fill="#10b981" radius={[0, 4, 4, 0]} name="Sessions" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
