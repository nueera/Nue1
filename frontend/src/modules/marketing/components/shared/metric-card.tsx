'use client';

import { cn } from '@/lib/utils';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area } from 'recharts';
import { motion } from 'framer-motion';

export interface MetricCardProps {
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  title: string;
  value: string;
  change?: number;
  changeLabel?: string;
  sparklineData?: Array<{ value: number }>;
  accentColor?: string;
  accentBg?: string;
  className?: string;
}

export function MetricCard({
  icon: Icon,
  title,
  value,
  change,
  changeLabel,
  sparklineData,
  accentColor = 'text-emerald-600',
  accentBg = 'bg-emerald-50 dark:bg-emerald-950/30',
  className,
}: MetricCardProps) {
  const isPositive = change !== undefined ? change >= 0 : true;

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      <Card className={cn('hover:shadow-md transition-shadow duration-200 border-border/50', className)}>
        <CardContent className="p-5">
          <div className="flex items-start justify-between">
            <div className={cn('flex items-center justify-center w-10 h-10 rounded-xl', accentBg)}>
              <Icon className={cn('h-5 w-5', accentColor)} strokeWidth={1.8} />
            </div>
            {change !== undefined && (
              <Badge
                variant="secondary"
                className={cn(
                  'text-xs font-medium gap-0.5',
                  isPositive
                    ? 'text-emerald-600 bg-emerald-50 dark:bg-emerald-950/30'
                    : 'text-red-600 bg-red-50 dark:bg-red-950/30'
                )}
              >
                {isPositive ? (
                  <ArrowUpRight className="h-3 w-3" />
                ) : (
                  <ArrowDownRight className="h-3 w-3" />
                )}
                {Math.abs(change)}%
              </Badge>
            )}
          </div>

          <div className="mt-4">
            <p className="text-2xl font-bold text-foreground tracking-tight tabular-nums">{value}</p>
            <p className="text-sm text-muted-foreground mt-1">{title}</p>
            {changeLabel && (
              <p className="text-xs text-muted-foreground mt-0.5">{changeLabel}</p>
            )}
          </div>

          {sparklineData && sparklineData.length > 0 && (
            <div className="mt-3 h-10">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={sparklineData} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id={`spark-${title.replace(/\s/g, '')}`} x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor={isPositive ? '#10b981' : '#ef4444'} stopOpacity={0.2} />
                      <stop offset="95%" stopColor={isPositive ? '#10b981' : '#ef4444'} stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <Area
                    type="monotone"
                    dataKey="value"
                    stroke={isPositive ? '#10b981' : '#ef4444'}
                    strokeWidth={1.5}
                    fill={`url(#spark-${title.replace(/\s/g, '')})`}
                    dot={false}
                    animationDuration={800}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}
