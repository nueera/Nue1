// @ts-nocheck
'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from '@/components/ui/select';
import { GitBranch, TrendingUp, DollarSign, Target, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import type { AttributionModel } from '@/modules/marketing/types';

const MODEL_LABELS: Record<string, string> = {
  first_touch: 'First Touch',
  last_touch: 'Last Touch',
  linear: 'Linear',
  time_decay: 'Time Decay',
  u_shaped: 'U-Shaped',
  w_shaped: 'W-Shaped',
};

interface AttributionReportProps {
  model?: AttributionModel;
}

export function AttributionReport({ model: initialModel }: AttributionReportProps) {
  const [model, setModel] = useState<AttributionModel>(initialModel ?? 'last_touch');

  const channelAttribution = [
    { channel: 'Email', revenue: 42000, weight: 0.32 },
    { channel: 'Social', revenue: 28000, weight: 0.21 },
    { channel: 'Paid Ads', revenue: 35000, weight: 0.27 },
    { channel: 'Organic', revenue: 18500, weight: 0.14 },
    { channel: 'Referral', revenue: 7500, weight: 0.06 },
  ];

  const touchpointPaths = [
    { path: ['Email → Landing Page → Purchase'], revenue: 28000, conversions: 145 },
    { path: ['Social → Blog → Email → Purchase'], revenue: 22000, conversions: 98 },
    { path: ['Paid Ad → Product Page → Purchase'], revenue: 18500, conversions: 76 },
    { path: ['Organic → Pricing → Demo → Purchase'], revenue: 15000, conversions: 62 },
    { path: ['Referral → Home → Purchase'], revenue: 9500, conversions: 41 },
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <GitBranch className="h-5 w-5 text-emerald-600" />
          <h3 className="text-lg font-semibold">Attribution Report</h3>
        </div>
        <Select value={model} onValueChange={(v) => setModel(v as AttributionModel)}>
          <SelectTrigger className="w-[160px] h-9">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {Object.entries(MODEL_LABELS).map(([key, label]) => (
              <SelectItem key={key} value={key}>{label}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Card className="border-border/50">
        <CardHeader className="pb-2">
          <CardTitle className="text-base font-semibold">Revenue by Channel ({MODEL_LABELS[model]})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={channelAttribution} margin={{ top: 5, right: 20, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
                <XAxis dataKey="channel" tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
                <YAxis tick={{ fontSize: 11 }} stroke="hsl(var(--muted-foreground))" />
                <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: '8px', fontSize: '12px' }} />
                <Bar dataKey="revenue" fill="#10b981" radius={[4, 4, 0, 0]} name="Revenue" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card className="border-border/50">
        <CardHeader className="pb-2">
          <CardTitle className="text-base font-semibold">Channel Weights</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {channelAttribution.map((ch, idx) => (
              <motion.div key={ch.channel} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: idx * 0.04 }} className="flex items-center gap-3">
                <span className="text-sm font-medium w-24">{ch.channel}</span>
                <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                  <motion.div initial={{ width: 0 }} animate={{ width: `${ch.weight * 100}%` }} transition={{ duration: 0.6, delay: idx * 0.08 }} className="h-full bg-emerald-500 rounded-full" />
                </div>
                <span className="text-xs text-muted-foreground w-16 text-right">{Math.round(ch.weight * 100)}%</span>
                <span className="text-xs font-medium w-20 text-right">${ch.revenue.toLocaleString()}</span>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="border-border/50">
        <CardHeader className="pb-2">
          <CardTitle className="text-base font-semibold">Top Conversion Paths</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {touchpointPaths.map((tp, idx) => (
              <motion.div key={idx} initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.04 }} className="flex items-center gap-3 p-3 rounded-lg bg-muted/30">
                <div className="flex-1 flex items-center gap-1 text-sm">
                  {tp.path[0].split(' → ').map((step, i, arr) => (
                    <span key={i} className="flex items-center gap-1">
                      <Badge variant="secondary" className="text-xs">{step}</Badge>
                      {i < arr.length - 1 && <ArrowRight className="h-3 w-3 text-muted-foreground" />}
                    </span>
                  ))}
                </div>
                <div className="text-right text-xs">
                  <p className="font-medium text-emerald-600">${tp.revenue.toLocaleString()}</p>
                  <p className="text-muted-foreground">{tp.conversions} conv.</p>
                </div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
