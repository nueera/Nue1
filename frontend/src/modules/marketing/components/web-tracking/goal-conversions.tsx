'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Target, DollarSign, TrendingUp, Calendar } from 'lucide-react';
import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import type { TrackingGoal } from '@/modules/marketing/types';

interface GoalConversionsProps {
  goal: TrackingGoal;
}

export function GoalConversions({ goal }: GoalConversionsProps) {
  const conversionData = Array.from({ length: 14 }, (_, i) => ({
    date: `Mar ${i + 1}`,
    conversions: Math.floor(Math.random() * 30) + 5,
    value: Math.floor(Math.random() * 1500) + 200,
  }));

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-2">
        <Target className="h-5 w-5 text-emerald-600" />
        <h3 className="text-lg font-semibold">{goal.name} — Conversions</h3>
      </div>

      <div className="grid grid-cols-3 gap-3">
        {[
          { icon: Target, label: 'Total Conversions', value: goal.conversions.toString(), color: 'text-emerald-600' },
          { icon: TrendingUp, label: 'Conversion Rate', value: `${goal.conversionRate}%`, color: 'text-blue-600' },
          { icon: DollarSign, label: 'Total Value', value: `$${(goal.conversions * goal.value).toLocaleString()}`, color: 'text-amber-600' },
        ].map((m, idx) => (
          <motion.div key={m.label} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.04 }}>
            <Card className="border-border/50">
              <CardContent className="p-3">
                <m.icon className={`h-4 w-4 ${m.color} mb-1`} />
                <p className="text-lg font-bold tabular-nums">{m.value}</p>
                <p className="text-xs text-muted-foreground">{m.label}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <Card className="border-border/50">
        <CardHeader className="pb-2"><CardTitle className="text-base font-semibold">Conversion Trend</CardTitle></CardHeader>
        <CardContent>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={conversionData} margin={{ top: 5, right: 20, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
                <XAxis dataKey="date" tick={{ fontSize: 10 }} stroke="hsl(var(--muted-foreground))" />
                <YAxis tick={{ fontSize: 11 }} stroke="hsl(var(--muted-foreground))" />
                <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: '8px', fontSize: '12px' }} />
                <Line type="monotone" dataKey="conversions" stroke="#10b981" strokeWidth={2} dot={{ fill: '#10b981', r: 3 }} name="Conversions" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card className="border-border/50">
        <CardHeader className="pb-2"><CardTitle className="text-base font-semibold">Daily Value</CardTitle></CardHeader>
        <CardContent>
          <div className="h-40">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={conversionData} margin={{ top: 5, right: 20, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
                <XAxis dataKey="date" tick={{ fontSize: 10 }} stroke="hsl(var(--muted-foreground))" />
                <YAxis tick={{ fontSize: 11 }} stroke="hsl(var(--muted-foreground))" />
                <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: '8px', fontSize: '12px' }} />
                <Bar dataKey="value" fill="#10b981" radius={[4, 4, 0, 0]} name="Value ($)" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
