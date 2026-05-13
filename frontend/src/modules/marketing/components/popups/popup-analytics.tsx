'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MetricCard } from '@/modules/marketing/components/shared';
import { usePopupAnalytics } from '@/modules/marketing/hooks';
import {
  Eye,
  MousePointerClick,
  TrendingUp,
} from 'lucide-react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from 'recharts';
import { motion } from 'framer-motion';

interface PopupAnalyticsProps {
  popupId: string;
  data?: {
    views: number;
    conversions: number;
    conversionRate: number;
    dailyStats: Array<{ date: string; views: number; conversions: number; conversionRate: number }>;
  };
}

export function PopupAnalytics({ popupId, data }: PopupAnalyticsProps) {
  const { data: analyticsData } = usePopupAnalytics(popupId);
  const analytics = data ?? {
    views: 12580,
    conversions: 842,
    conversionRate: 6.7,
    dailyStats: [
      { date: 'Mon', views: 1800, conversions: 120, conversionRate: 6.7 },
      { date: 'Tue', views: 2100, conversions: 145, conversionRate: 6.9 },
      { date: 'Wed', views: 1950, conversions: 128, conversionRate: 6.6 },
      { date: 'Thu', views: 2300, conversions: 160, conversionRate: 7.0 },
      { date: 'Fri', views: 2050, conversions: 138, conversionRate: 6.7 },
      { date: 'Sat', views: 1200, conversions: 78, conversionRate: 6.5 },
      { date: 'Sun', views: 1180, conversions: 73, conversionRate: 6.2 },
    ],
  };

  return (
    <div className="space-y-4">
      {/* Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        <MetricCard
          icon={Eye}
          title="Total Views"
          value={analytics.views.toLocaleString()}
          change={15}
          accentColor="text-blue-600"
          accentBg="bg-blue-50 dark:bg-blue-950/30"
        />
        <MetricCard
          icon={MousePointerClick}
          title="Conversions"
          value={analytics.conversions.toLocaleString()}
          change={12}
          accentColor="text-emerald-600"
          accentBg="bg-emerald-50 dark:bg-emerald-950/30"
        />
        <MetricCard
          icon={TrendingUp}
          title="Conversion Rate"
          value={`${analytics.conversionRate}%`}
          change={3}
          accentColor="text-amber-600"
          accentBg="bg-amber-50 dark:bg-amber-950/30"
        />
      </div>

      {/* Daily Stats Chart */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2, delay: 0.1 }}
      >
        <Card className="border-border/50">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Performance Over Time</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={analytics.dailyStats} margin={{ top: 5, right: 10, left: -10, bottom: 0 }}>
                  <defs>
                    <linearGradient id="popupViewsGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#3b82f6" stopOpacity={0.2} />
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="popupConvGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#10b981" stopOpacity={0.2} />
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
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
                  <Area type="monotone" dataKey="views" stroke="#3b82f6" strokeWidth={2} fill="url(#popupViewsGrad)" name="Views" />
                  <Area type="monotone" dataKey="conversions" stroke="#10b981" strokeWidth={2} fill="url(#popupConvGrad)" name="Conversions" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
