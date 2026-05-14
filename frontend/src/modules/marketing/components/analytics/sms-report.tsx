// @ts-nocheck
'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MessageSquare, Send, CheckCircle2, AlertTriangle, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';

interface SmsReportProps {
  campaignId?: string;
}

export function SmsReport({ campaignId }: SmsReportProps) {
  const metrics = [
    { icon: Send, label: 'Sent', value: '12,800', color: 'text-emerald-600', bg: 'bg-emerald-50 dark:bg-emerald-950/30' },
    { icon: CheckCircle2, label: 'Delivered', value: '12,160 (95%)', color: 'text-blue-600', bg: 'bg-blue-50 dark:bg-blue-950/30' },
    { icon: TrendingUp, label: 'Click Rate', value: '22.1%', color: 'text-amber-600', bg: 'bg-amber-50 dark:bg-amber-950/30' },
    { icon: AlertTriangle, label: 'Opt-Outs', value: '128 (1%)', color: 'text-red-600', bg: 'bg-red-50 dark:bg-red-950/30' },
  ];

  const dailyData = [
    { day: 'Mon', sent: 1800, delivered: 1710, clicks: 398 },
    { day: 'Tue', sent: 2100, delivered: 1995, clicks: 462 },
    { day: 'Wed', sent: 1900, delivered: 1805, clicks: 418 },
    { day: 'Thu', sent: 2050, delivered: 1948, clicks: 451 },
    { day: 'Fri', sent: 2200, delivered: 2090, clicks: 485 },
    { day: 'Sat', sent: 1500, delivered: 1425, clicks: 331 },
    { day: 'Sun', sent: 1250, delivered: 1188, clicks: 276 },
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-2">
        <MessageSquare className="h-5 w-5 text-emerald-600" />
        <h3 className="text-lg font-semibold">SMS Report</h3>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
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

      <Card className="border-border/50">
        <CardHeader className="pb-2">
          <CardTitle className="text-base font-semibold">Daily Delivery & Clicks</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={dailyData} margin={{ top: 5, right: 20, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
                <XAxis dataKey="day" tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
                <YAxis tick={{ fontSize: 11 }} stroke="hsl(var(--muted-foreground))" />
                <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: '8px', fontSize: '12px' }} />
                <Bar dataKey="delivered" fill="#10b981" radius={[4, 4, 0, 0]} name="Delivered" />
                <Bar dataKey="clicks" fill="#3b82f6" radius={[4, 4, 0, 0]} name="Clicks" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
