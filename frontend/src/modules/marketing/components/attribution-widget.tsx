// @ts-nocheck
'use client';

import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
} from 'recharts';
import { motion } from 'framer-motion';

export interface AttributionData {
  channel: string;
  revenue: number;
  conversions: number;
  percentage: number;
}

export interface AttributionWidgetProps {
  data: AttributionData[];
  model?: 'first_touch' | 'last_touch' | 'linear';
  view?: 'pie' | 'bar';
  className?: string;
}

const CHANNEL_COLORS: Record<string, string> = {
  email: '#3b82f6',
  sms: '#10b981',
  whatsapp: '#14b8a6',
  facebook: '#6366f1',
  instagram: '#a855f7',
  linkedin: '#0ea5e9',
  twitter: '#06b6d4',
  google_ads: '#ef4444',
  web_push: '#f59e0b',
  organic: '#84cc16',
  referral: '#ec4899',
};

const DEFAULT_DATA: AttributionData[] = [
  { channel: 'email', revenue: 42800, conversions: 312, percentage: 35 },
  { channel: 'google_ads', revenue: 24500, conversions: 189, percentage: 20 },
  { channel: 'social', revenue: 18300, conversions: 134, percentage: 15 },
  { channel: 'organic', revenue: 15200, conversions: 98, percentage: 12 },
  { channel: 'referral', revenue: 12400, conversions: 87, percentage: 10 },
  { channel: 'direct', revenue: 8900, conversions: 56, percentage: 8 },
];

export function AttributionWidget({
  data = DEFAULT_DATA,
  model = 'last_touch',
  view = 'pie',
  className,
}: AttributionWidgetProps) {
  const modelLabel = model.replace('_', ' ').replace(/\b\w/g, (l) => l.toUpperCase());

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className={cn('border-border/50', className)}>
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardTitle className="text-base font-semibold">Attribution Breakdown</CardTitle>
            <span className="text-xs text-muted-foreground">{modelLabel} Model</span>
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          {view === 'pie' ? (
            <div>
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie
                    data={data}
                    cx="50%"
                    cy="50%"
                    innerRadius={55}
                    outerRadius={80}
                    paddingAngle={3}
                    dataKey="revenue"
                    nameKey="channel"
                    animationDuration={800}
                  >
                    {data.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={CHANNEL_COLORS[entry.channel] ?? `hsl(${index * 45}, 65%, 55%)`}
                      />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'hsl(var(--popover))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px',
                      fontSize: '12px',
                    }}
                    formatter={(value: number) => [`$${value.toLocaleString()}`, 'Revenue']}
                  />
                </PieChart>
              </ResponsiveContainer>
              {/* Legend */}
              <div className="grid grid-cols-2 gap-2 mt-3">
                {data.map((item) => (
                  <div key={item.channel} className="flex items-center gap-2">
                    <span
                      className="w-2.5 h-2.5 rounded-full shrink-0"
                      style={{ backgroundColor: CHANNEL_COLORS[item.channel] ?? '#888' }}
                    />
                    <span className="text-xs text-muted-foreground capitalize">{item.channel}</span>
                    <span className="text-xs font-medium text-foreground ml-auto tabular-nums">
                      {item.percentage}%
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <ResponsiveContainer width="100%" height={240}>
              <BarChart data={data} margin={{ top: 8, right: 8, left: -8, bottom: 0 }}>
                <XAxis
                  dataKey="channel"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }}
                  tickFormatter={(v: number) => `$${(v / 1000).toFixed(0)}k`}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'hsl(var(--popover))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px',
                    fontSize: '12px',
                  }}
                  formatter={(value: number) => [`$${value.toLocaleString()}`, 'Revenue']}
                />
                <Bar dataKey="revenue" radius={[4, 4, 0, 0]} animationDuration={800}>
                  {data.map((entry, index) => (
                    <Cell
                      key={`bar-${index}`}
                      fill={CHANNEL_COLORS[entry.channel] ?? `hsl(${index * 45}, 65%, 55%)`}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}
