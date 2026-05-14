// @ts-nocheck
'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MetricCard } from '@/modules/marketing/components/shared/metric-card';
import type { AudienceGrowth as AudienceGrowthType } from '@/modules/marketing/types';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';
import { TrendingUp, TrendingDown, Users } from 'lucide-react';
import { motion } from 'framer-motion';

interface AudienceGrowthProps {
  growth?: AudienceGrowthType[];
}

export function AudienceGrowth({ growth }: AudienceGrowthProps) {
  const data = growth ?? [
    { date: 'Jan', added: 120, removed: 15, total: 1200 },
    { date: 'Feb', added: 95, removed: 22, total: 1273 },
    { date: 'Mar', added: 140, removed: 18, total: 1395 },
    { date: 'Apr', added: 165, removed: 30, total: 1530 },
    { date: 'May', added: 110, removed: 25, total: 1615 },
    { date: 'Jun', added: 180, removed: 20, total: 1775 },
    { date: 'Jul', added: 200, removed: 28, total: 1947 },
    { date: 'Aug', added: 150, removed: 35, total: 2062 },
    { date: 'Sep', added: 175, removed: 22, total: 2215 },
    { date: 'Oct', added: 210, removed: 30, total: 2395 },
    { date: 'Nov', added: 190, removed: 25, total: 2560 },
    { date: 'Dec', added: 225, removed: 18, total: 2767 },
  ];

  const totalAdded = data.reduce((sum, d) => sum + d.added, 0);
  const totalRemoved = data.reduce((sum, d) => sum + d.removed, 0);
  const netGrowth = totalAdded - totalRemoved;

  return (
    <div className="space-y-4">
      {/* Summary */}
      <div className="grid grid-cols-3 gap-3">
        <MetricCard icon={TrendingUp} title="Total Added" value={totalAdded.toLocaleString()} accentColor="text-emerald-600" accentBg="bg-emerald-50 dark:bg-emerald-950/30" />
        <MetricCard icon={TrendingDown} title="Total Removed" value={totalRemoved.toLocaleString()} accentColor="text-red-600" accentBg="bg-red-50 dark:bg-red-950/30" />
        <MetricCard icon={Users} title="Net Growth" value={netGrowth > 0 ? `+${netGrowth.toLocaleString()}` : netGrowth.toLocaleString()} accentColor="text-amber-600" accentBg="bg-amber-50 dark:bg-amber-950/30" />
      </div>

      {/* Chart */}
      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.2, delay: 0.1 }}>
        <Card className="border-border/50">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Audience Growth Over Time</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data} margin={{ top: 5, right: 10, left: -10, bottom: 0 }}>
                  <defs>
                    <linearGradient id="totalGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#8b5cf6" stopOpacity={0.2} />
                      <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="addedGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#10b981" stopOpacity={0.2} />
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="removedGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#ef4444" stopOpacity={0.15} />
                      <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
                  <XAxis dataKey="date" tick={{ fontSize: 11 }} stroke="hsl(var(--muted-foreground))" />
                  <YAxis tick={{ fontSize: 11 }} stroke="hsl(var(--muted-foreground))" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'hsl(var(--card))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px',
                      fontSize: '12px',
                    }}
                  />
                  <Legend wrapperStyle={{ fontSize: '11px' }} />
                  <Area type="monotone" dataKey="total" stroke="#8b5cf6" strokeWidth={2} fill="url(#totalGrad)" name="Total" />
                  <Area type="monotone" dataKey="added" stroke="#10b981" strokeWidth={1.5} fill="url(#addedGrad)" name="Added" />
                  <Area type="monotone" dataKey="removed" stroke="#ef4444" strokeWidth={1.5} fill="url(#removedGrad)" name="Removed" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
