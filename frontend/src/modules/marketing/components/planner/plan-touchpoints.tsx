'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Activity, Mail, MessageSquare, Globe, Phone, MousePointerClick } from 'lucide-react';
import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import type { MarketingPlan } from '@/modules/marketing/types';

const TOUCHPOINT_ICONS: Record<string, typeof Mail> = {
  email: Mail,
  sms: MessageSquare,
  web: Globe,
  phone: Phone,
  social: MousePointerClick,
};

interface PlanTouchpointsProps {
  plan: MarketingPlan;
}

export function PlanTouchpoints({ plan }: PlanTouchpointsProps) {
  // Simulated touchpoint data
  const touchpoints = [
    { type: 'email', label: 'Email', count: 2450, engagement: 18.5, color: '#10b981' },
    { type: 'sms', label: 'SMS', count: 1200, engagement: 22.3, color: '#3b82f6' },
    { type: 'web', label: 'Web', count: 5600, engagement: 3.2, color: '#f59e0b' },
    { type: 'social', label: 'Social', count: 3800, engagement: 6.8, color: '#8b5cf6' },
    { type: 'phone', label: 'Phone', count: 340, engagement: 45.2, color: '#ec4899' },
  ];

  const channelData = touchpoints.map((t) => ({
    channel: t.label,
    touchpoints: t.count,
    engagement: t.engagement,
  }));

  const totalTouchpoints = touchpoints.reduce((sum, t) => sum + t.count, 0);
  const avgEngagement = touchpoints.reduce((sum, t) => sum + t.engagement, 0) / touchpoints.length;

  return (
    <div className="space-y-4">
      {/* Summary */}
      <div className="grid grid-cols-2 gap-4">
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
          <Card className="border-border/50">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <Activity className="h-4 w-4 text-emerald-600" />
                <span className="text-xs text-muted-foreground">Total Touchpoints</span>
              </div>
              <p className="text-2xl font-bold text-foreground tabular-nums">{totalTouchpoints.toLocaleString()}</p>
            </CardContent>
          </Card>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}>
          <Card className="border-border/50">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <MousePointerClick className="h-4 w-4 text-blue-600" />
                <span className="text-xs text-muted-foreground">Avg. Engagement</span>
              </div>
              <p className="text-2xl font-bold text-foreground tabular-nums">{avgEngagement.toFixed(1)}%</p>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Touchpoint breakdown */}
      <Card className="border-border/50">
        <CardHeader className="pb-2">
          <CardTitle className="text-base font-semibold flex items-center gap-2">
            <Activity className="h-4 w-4 text-emerald-600" />
            Touchpoint Breakdown
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {touchpoints.map((tp, idx) => {
              const Icon = TOUCHPOINT_ICONS[tp.type] ?? Activity;
              const percent = totalTouchpoints > 0 ? Math.round((tp.count / totalTouchpoints) * 100) : 0;

              return (
                <motion.div
                  key={tp.type}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className="flex items-center gap-3"
                >
                  <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-muted/50">
                    <Icon className="h-4 w-4" style={{ color: tp.color }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium">{tp.label}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-muted-foreground">{tp.count.toLocaleString()}</span>
                        <Badge variant="secondary" className="text-xs">{tp.engagement}% eng.</Badge>
                      </div>
                    </div>
                    <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${percent}%` }}
                        transition={{ duration: 0.6, delay: idx * 0.1 }}
                        className="h-full rounded-full"
                        style={{ backgroundColor: tp.color }}
                      />
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Chart */}
      <Card className="border-border/50">
        <CardHeader className="pb-2">
          <CardTitle className="text-base font-semibold">Touchpoints by Channel</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={channelData} margin={{ top: 5, right: 20, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
                <XAxis dataKey="channel" tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
                <YAxis tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px',
                    fontSize: '12px',
                  }}
                />
                <Bar dataKey="touchpoints" fill="#10b981" radius={[4, 4, 0, 0]} name="Touchpoints" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
