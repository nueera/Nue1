'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MetricCard } from '@/modules/marketing/components/shared/metric-card';
import { usePageAnalytics } from '@/modules/marketing/hooks/use-landing-pages';
import {
  Eye,
  MousePointerClick,
  TrendingUp,
  ArrowDownRight,
  BarChart3,
} from 'lucide-react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  BarChart,
  Bar,
} from 'recharts';
import { motion } from 'framer-motion';

interface LandingPageAnalyticsProps {
  pageId: string;
  data?: {
    views: number;
    uniqueViews: number;
    conversions: number;
    conversionRate: number;
    bounceRate: number;
    avgTimeOnPage: number;
    dailyViews: Array<{ date: string; views: number; conversions: number }>;
    topReferrers: Array<{ source: string; views: number; conversions: number }>;
  };
}

export function LandingPageAnalytics({ pageId, data }: LandingPageAnalyticsProps) {
  const { data: analyticsData } = usePageAnalytics(pageId);
  const analytics = data ?? {
    views: 5420,
    uniqueViews: 3891,
    conversions: 312,
    conversionRate: 5.8,
    bounceRate: 32.4,
    avgTimeOnPage: 145,
    dailyViews: [
      { date: 'Mon', views: 780, conversions: 42 },
      { date: 'Tue', views: 920, conversions: 55 },
      { date: 'Wed', views: 1050, conversions: 68 },
      { date: 'Thu', views: 880, conversions: 48 },
      { date: 'Fri', views: 950, conversions: 52 },
      { date: 'Sat', views: 420, conversions: 22 },
      { date: 'Sun', views: 380, conversions: 25 },
    ],
    topReferrers: [
      { source: 'Google', views: 2100, conversions: 145 },
      { source: 'Direct', views: 1200, conversions: 85 },
      { source: 'Facebook', views: 850, conversions: 38 },
      { source: 'LinkedIn', views: 620, conversions: 28 },
      { source: 'Twitter', views: 350, conversions: 16 },
    ],
  };

  return (
    <div className="space-y-4">
      {/* Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <MetricCard
          icon={Eye}
          title="Total Views"
          value={analytics.views.toLocaleString()}
          change={12}
          accentColor="text-blue-600"
          accentBg="bg-blue-50 dark:bg-blue-950/30"
        />
        <MetricCard
          icon={MousePointerClick}
          title="Conversions"
          value={analytics.conversions.toLocaleString()}
          change={8}
          accentColor="text-emerald-600"
          accentBg="bg-emerald-50 dark:bg-emerald-950/30"
        />
        <MetricCard
          icon={TrendingUp}
          title="Conv. Rate"
          value={`${analytics.conversionRate}%`}
          change={3}
          accentColor="text-amber-600"
          accentBg="bg-amber-50 dark:bg-amber-950/30"
        />
        <MetricCard
          icon={ArrowDownRight}
          title="Bounce Rate"
          value={`${analytics.bounceRate}%`}
          change={-5}
          accentColor="text-rose-600"
          accentBg="bg-rose-50 dark:bg-rose-950/30"
        />
      </div>

      {/* Daily Views Chart */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2, delay: 0.1 }}
      >
        <Card className="border-border/50">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Views & Conversions Over Time</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={analytics.dailyViews} margin={{ top: 5, right: 10, left: -10, bottom: 0 }}>
                  <defs>
                    <linearGradient id="viewsGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#3b82f6" stopOpacity={0.2} />
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="convGrad" x1="0" y1="0" x2="0" y2="1">
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
                  <Area type="monotone" dataKey="views" stroke="#3b82f6" strokeWidth={2} fill="url(#viewsGrad)" />
                  <Area type="monotone" dataKey="conversions" stroke="#10b981" strokeWidth={2} fill="url(#convGrad)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Top Referrers */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2, delay: 0.15 }}
      >
        <Card className="border-border/50">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Top Referrers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={analytics.topReferrers} layout="vertical" margin={{ top: 0, right: 10, left: 60, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
                  <XAxis type="number" tick={{ fontSize: 11 }} stroke="hsl(var(--muted-foreground))" />
                  <YAxis type="category" dataKey="source" tick={{ fontSize: 11 }} stroke="hsl(var(--muted-foreground))" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'hsl(var(--card))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px',
                      fontSize: '12px',
                    }}
                  />
                  <Bar dataKey="views" fill="#3b82f6" radius={[0, 4, 4, 0]} barSize={12} />
                  <Bar dataKey="conversions" fill="#10b981" radius={[0, 4, 4, 0]} barSize={12} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
