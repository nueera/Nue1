// @ts-nocheck
'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Map, Users, ArrowRight, TrendingUp, Activity } from 'lucide-react';
import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';

interface JourneyReportProps {
  journeyId?: string;
}

export function JourneyReport({ journeyId }: JourneyReportProps) {
  const stages = [
    { stage: 'Entry', count: 5000, dropoff: 0 },
    { stage: 'Email Sent', count: 4800, dropoff: 200 },
    { stage: 'Email Opened', count: 2880, dropoff: 1920 },
    { stage: 'Link Clicked', count: 1152, dropoff: 1728 },
    { stage: 'Form Submitted', count: 576, dropoff: 576 },
    { stage: 'Converted', count: 288, dropoff: 288 },
  ];

  const completionData = [
    { day: 'Mon', completed: 42, active: 180 },
    { day: 'Tue', completed: 55, active: 195 },
    { day: 'Wed', completed: 48, active: 175 },
    { day: 'Thu', completed: 62, active: 210 },
    { day: 'Fri', completed: 58, active: 205 },
    { day: 'Sat', completed: 35, active: 120 },
    { day: 'Sun', completed: 28, active: 95 },
  ];

  const totalEntry = stages[0].count;
  const totalConverted = stages[stages.length - 1].count;
  const overallRate = Math.round((totalConverted / totalEntry) * 100);

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-2">
        <Map className="h-5 w-5 text-emerald-600" />
        <h3 className="text-lg font-semibold">Journey Report</h3>
      </div>

      <div className="grid grid-cols-3 gap-3">
        {[
          { label: 'Total Enrolled', value: totalEntry.toLocaleString(), icon: Users, color: 'text-emerald-600' },
          { label: 'Converted', value: totalConverted.toLocaleString(), icon: TrendingUp, color: 'text-blue-600' },
          { label: 'Conversion Rate', value: `${overallRate}%`, icon: Activity, color: 'text-amber-600' },
        ].map((m, idx) => (
          <motion.div key={m.label} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.04 }}>
            <Card className="border-border/50">
              <CardContent className="p-3 text-center">
                <m.icon className={`h-4 w-4 ${m.color} mx-auto mb-1`} />
                <p className="text-lg font-bold tabular-nums">{m.value}</p>
                <p className="text-xs text-muted-foreground">{m.label}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Funnel visualization */}
      <Card className="border-border/50">
        <CardHeader className="pb-2">
          <CardTitle className="text-base font-semibold">Journey Funnel</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {stages.map((stage, idx) => {
              const width = Math.round((stage.count / totalEntry) * 100);
              return (
                <motion.div key={stage.stage} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: idx * 0.06 }} className="flex items-center gap-3">
                  <span className="text-sm font-medium w-32 shrink-0">{stage.stage}</span>
                  <div className="flex-1 h-8 bg-muted/30 rounded overflow-hidden relative">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${width}%` }}
                      transition={{ duration: 0.6, delay: idx * 0.1 }}
                      className="h-full bg-emerald-500 rounded flex items-center justify-end pr-2"
                    >
                      <span className="text-xs text-white font-medium">{stage.count.toLocaleString()}</span>
                    </motion.div>
                  </div>
                  {stage.dropoff > 0 && (
                    <Badge variant="secondary" className="text-xs">
                      -{Math.round((stage.dropoff / (stage.count + stage.dropoff)) * 100)}%
                    </Badge>
                  )}
                </motion.div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      <Card className="border-border/50">
        <CardHeader className="pb-2">
          <CardTitle className="text-base font-semibold">Daily Completions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={completionData} margin={{ top: 5, right: 20, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
                <XAxis dataKey="day" tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
                <YAxis tick={{ fontSize: 11 }} stroke="hsl(var(--muted-foreground))" />
                <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: '8px', fontSize: '12px' }} />
                <Bar dataKey="completed" fill="#10b981" radius={[4, 4, 0, 0]} name="Completed" />
                <Bar dataKey="active" fill="#94a3b8" radius={[4, 4, 0, 0]} name="Active" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
