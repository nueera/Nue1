'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Users, Eye, UserCheck, UserX, Shield } from 'lucide-react';
import { motion } from 'framer-motion';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';

const COLORS = ['#10b981', '#3b82f6', '#f59e0b'];

interface VisitorTrackingProps {
  dateRange?: string;
}

export function VisitorTracking({ dateRange }: VisitorTrackingProps) {
  const totalVisitors = 42180;
  const knownVisitors = 16872;
  const anonymousVisitors = 25308;

  const pieData = [
    { name: 'Known', value: knownVisitors },
    { name: 'Anonymous', value: anonymousVisitors },
  ];

  const dailyData = [
    { day: 'Mon', known: 2400, anonymous: 3600 },
    { day: 'Tue', known: 2650, anonymous: 3900 },
    { day: 'Wed', known: 2520, anonymous: 3700 },
    { day: 'Thu', known: 2800, anonymous: 4200 },
    { day: 'Fri', known: 2300, anonymous: 3400 },
    { day: 'Sat', known: 1700, anonymous: 2500 },
    { day: 'Sun', known: 1502, anonymous: 2508 },
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-2">
        <Users className="h-5 w-5 text-emerald-600" />
        <h3 className="text-lg font-semibold">Visitor Tracking</h3>
      </div>

      <div className="grid grid-cols-3 gap-3">
        {[
          { icon: Users, label: 'Total Visitors', value: totalVisitors.toLocaleString(), bg: 'bg-emerald-50 dark:bg-emerald-950/30', color: 'text-emerald-600' },
          { icon: UserCheck, label: 'Known', value: knownVisitors.toLocaleString(), bg: 'bg-blue-50 dark:bg-blue-950/30', color: 'text-blue-600' },
          { icon: UserX, label: 'Anonymous', value: anonymousVisitors.toLocaleString(), bg: 'bg-amber-50 dark:bg-amber-950/30', color: 'text-amber-600' },
        ].map((m, idx) => (
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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card className="border-border/50">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-semibold">Known vs Anonymous</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={pieData} cx="50%" cy="50%" innerRadius={45} outerRadius={75} dataKey="value" paddingAngle={3}>
                    <Cell fill={COLORS[0]} />
                    <Cell fill={COLORS[1]} />
                  </Pie>
                  <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: '8px', fontSize: '12px' }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex items-center justify-center gap-4 text-xs">
              <div className="flex items-center gap-1.5"><div className="h-2.5 w-2.5 rounded-full bg-emerald-500" />Known (40%)</div>
              <div className="flex items-center gap-1.5"><div className="h-2.5 w-2.5 rounded-full bg-blue-500" />Anonymous (60%)</div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/50">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-semibold">Daily Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={dailyData} margin={{ top: 5, right: 20, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
                  <XAxis dataKey="day" tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
                  <YAxis tick={{ fontSize: 11 }} stroke="hsl(var(--muted-foreground))" />
                  <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: '8px', fontSize: '12px' }} />
                  <Bar dataKey="known" fill="#10b981" radius={[4, 4, 0, 0]} name="Known" />
                  <Bar dataKey="anonymous" fill="#3b82f6" radius={[4, 4, 0, 0]} name="Anonymous" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
