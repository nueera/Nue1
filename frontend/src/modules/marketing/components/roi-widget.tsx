'use client';

import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowUpRight, ArrowDownRight, TrendingUp } from 'lucide-react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { motion } from 'framer-motion';
import { calculateROI, formatCurrency } from '@/modules/marketing/utils';

export interface ROIWidgetProps {
  revenue: number;
  spend: number;
  trendData?: Array<{ period: string; roi: number }>;
  period?: string;
  className?: string;
}

const DEFAULT_TREND: Array<{ period: string; roi: number }> = [
  { period: 'Jan', roi: 120 },
  { period: 'Feb', roi: 145 },
  { period: 'Mar', roi: 132 },
  { period: 'Apr', roi: 168 },
  { period: 'May', roi: 155 },
  { period: 'Jun', roi: 190 },
  { period: 'Jul', roi: 210 },
];

export function ROIWidget({
  revenue,
  spend,
  trendData = DEFAULT_TREND,
  period = 'Last 7 months',
  className,
}: ROIWidgetProps) {
  const roi = calculateROI(revenue, spend);
  const isPositive = roi >= 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className={cn('border-border/50', className)}>
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardTitle className="text-base font-semibold">ROI</CardTitle>
            <span className="text-xs text-muted-foreground">{period}</span>
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          {/* ROI value */}
          <div className="flex items-center gap-3 mb-4">
            <div
              className={cn(
                'flex items-center justify-center w-12 h-12 rounded-xl',
                isPositive
                  ? 'bg-emerald-50 dark:bg-emerald-950/30'
                  : 'bg-red-50 dark:bg-red-950/30'
              )}
            >
              <TrendingUp
                className={cn(
                  'h-6 w-6',
                  isPositive ? 'text-emerald-600' : 'text-red-500'
                )}
                strokeWidth={1.8}
              />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <p className={cn('text-2xl font-bold tabular-nums', isPositive ? 'text-emerald-600' : 'text-red-500')}>
                  {roi}%
                </p>
                <Badge
                  variant="secondary"
                  className={cn(
                    'text-xs font-medium gap-0.5',
                    isPositive
                      ? 'text-emerald-600 bg-emerald-50 dark:bg-emerald-950/30'
                      : 'text-red-600 bg-red-50 dark:bg-red-950/30'
                  )}
                >
                  {isPositive ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
                  {Math.abs(roi)}%
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground mt-0.5">
                Revenue: {formatCurrency(revenue)} · Spend: {formatCurrency(spend)}
              </p>
            </div>
          </div>

          {/* Trend chart */}
          <ResponsiveContainer width="100%" height={120}>
            <AreaChart data={trendData} margin={{ top: 4, right: 4, left: -16, bottom: 0 }}>
              <defs>
                <linearGradient id="roiGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={isPositive ? '#10b981' : '#ef4444'} stopOpacity={0.15} />
                  <stop offset="95%" stopColor={isPositive ? '#10b981' : '#ef4444'} stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis
                dataKey="period"
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }}
                tickFormatter={(v: number) => `${v}%`}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'hsl(var(--popover))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '8px',
                  fontSize: '12px',
                }}
                formatter={(value: number) => [`${value}%`, 'ROI']}
              />
              <Area
                type="monotone"
                dataKey="roi"
                stroke={isPositive ? '#10b981' : '#ef4444'}
                strokeWidth={2}
                fill="url(#roiGradient)"
                dot={false}
                animationDuration={800}
              />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </motion.div>
  );
}
