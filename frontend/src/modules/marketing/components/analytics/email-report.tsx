'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Mail, ExternalLink, MousePointerClick, AlertTriangle, UserX, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  LineChart, Line, PieChart, Pie, Cell,
} from 'recharts';

const COLORS = ['#10b981', '#3b82f6', '#f59e0b', '#ef4444', '#8b5cf6'];

interface EmailReportProps {
  campaignId?: string;
}

export function EmailReport({ campaignId }: EmailReportProps) {
  const metrics = [
    { icon: Mail, label: 'Sent', value: '28,450', color: 'text-emerald-600', bg: 'bg-emerald-50 dark:bg-emerald-950/30' },
    { icon: ExternalLink, label: 'Opened', value: '7,056 (24.8%)', color: 'text-blue-600', bg: 'bg-blue-50 dark:bg-blue-950/30' },
    { icon: MousePointerClick, label: 'Clicked', value: '2,444 (8.6%)', color: 'text-amber-600', bg: 'bg-amber-50 dark:bg-amber-950/30' },
    { icon: AlertTriangle, label: 'Bounced', value: '426 (1.5%)', color: 'text-red-600', bg: 'bg-red-50 dark:bg-red-950/30' },
    { icon: UserX, label: 'Unsubscribed', value: '85 (0.3%)', color: 'text-purple-600', bg: 'bg-purple-50 dark:bg-purple-950/30' },
  ];

  const trendData = [
    { day: 'Mon', opens: 1200, clicks: 400, bounces: 80 },
    { day: 'Tue', opens: 1400, clicks: 480, bounces: 70 },
    { day: 'Wed', opens: 1100, clicks: 360, bounces: 90 },
    { day: 'Thu', opens: 1350, clicks: 450, bounces: 65 },
    { day: 'Fri', opens: 980, clicks: 320, bounces: 55 },
    { day: 'Sat', opens: 650, clicks: 200, bounces: 40 },
    { day: 'Sun', opens: 376, clicks: 134, bounces: 26 },
  ];

  const breakdownData = [
    { name: 'Opened', value: 7056 },
    { name: 'Clicked', value: 2444 },
    { name: 'Bounced', value: 426 },
    { name: 'Unsubscribed', value: 85 },
    { name: 'No Action', value: 18439 },
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-2">
        <Mail className="h-5 w-5 text-emerald-600" />
        <h3 className="text-lg font-semibold">Email Report</h3>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        {metrics.map((m, idx) => (
          <motion.div key={m.label} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.04 }}>
            <Card className="border-border/50">
              <CardContent className="p-3">
                <div className={`flex items-center justify-center w-8 h-8 rounded-lg ${m.bg} mb-2`}>
                  <m.icon className={`h-4 w-4 ${m.color}`} />
                </div>
                <p className="text-sm font-bold tabular-nums">{m.value}</p>
                <p className="text-xs text-muted-foreground">{m.label}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card className="border-border/50">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-semibold">Daily Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-56">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={trendData} margin={{ top: 5, right: 20, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
                  <XAxis dataKey="day" tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
                  <YAxis tick={{ fontSize: 11 }} stroke="hsl(var(--muted-foreground))" />
                  <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: '8px', fontSize: '12px' }} />
                  <Line type="monotone" dataKey="opens" stroke="#10b981" strokeWidth={2} name="Opens" />
                  <Line type="monotone" dataKey="clicks" stroke="#3b82f6" strokeWidth={2} name="Clicks" />
                  <Line type="monotone" dataKey="bounces" stroke="#ef4444" strokeWidth={2} name="Bounces" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/50">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-semibold">Engagement Breakdown</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-56">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={breakdownData} cx="50%" cy="50%" innerRadius={45} outerRadius={80} dataKey="value" paddingAngle={2}>
                    {breakdownData.map((_, idx) => (
                      <Cell key={idx} fill={COLORS[idx % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: '8px', fontSize: '12px' }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              {breakdownData.map((item, idx) => (
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
