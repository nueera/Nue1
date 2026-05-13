'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { FileText, Eye, TrendingUp, Clock, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface PageAnalyticsProps {
  pageId?: string;
}

export function PageAnalytics({ pageId }: PageAnalyticsProps) {
  const pages = [
    { path: '/home', views: 45000, unique: 28000, avgTime: '2m 15s', bounceRate: 32, conversions: 1200 },
    { path: '/products', views: 32000, unique: 21000, avgTime: '3m 42s', bounceRate: 28, conversions: 890 },
    { path: '/pricing', views: 18000, unique: 12000, avgTime: '2m 58s', bounceRate: 25, conversions: 650 },
    { path: '/blog', views: 25000, unique: 19000, avgTime: '4m 12s', bounceRate: 42, conversions: 320 },
    { path: '/about', views: 12000, unique: 8500, avgTime: '1m 48s', bounceRate: 55, conversions: 85 },
  ];

  const chartData = pages.map((p) => ({ path: p.path, views: p.views, conversions: p.conversions }));

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-2">
        <FileText className="h-5 w-5 text-emerald-600" />
        <h3 className="text-lg font-semibold">Page Analytics</h3>
      </div>

      <Card className="border-border/50">
        <CardHeader className="pb-2">
          <CardTitle className="text-base font-semibold">Page Performance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 5, right: 20, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
                <XAxis dataKey="path" tick={{ fontSize: 11 }} stroke="hsl(var(--muted-foreground))" />
                <YAxis tick={{ fontSize: 11 }} stroke="hsl(var(--muted-foreground))" />
                <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: '8px', fontSize: '12px' }} />
                <Bar dataKey="views" fill="#10b981" radius={[4, 4, 0, 0]} name="Views" />
                <Bar dataKey="conversions" fill="#3b82f6" radius={[4, 4, 0, 0]} name="Conversions" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-2">
        {pages.map((page, idx) => (
          <motion.div
            key={page.path}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.04 }}
            className="flex items-center gap-3 p-3 rounded-lg border border-border/50 hover:bg-muted/30 transition-colors"
          >
            <div className="flex items-center justify-center h-9 w-9 rounded-lg bg-emerald-50 dark:bg-emerald-950/30">
              <FileText className="h-4 w-4 text-emerald-600" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium font-mono">{page.path}</p>
            </div>
            <div className="flex items-center gap-4 text-xs text-muted-foreground">
              <div className="flex items-center gap-1"><Eye className="h-3 w-3" />{page.views.toLocaleString()}</div>
              <div className="flex items-center gap-1"><Clock className="h-3 w-3" />{page.avgTime}</div>
              <div className="flex items-center gap-1"><TrendingUp className="h-3 w-3" />{page.bounceRate}%</div>
              <div className="flex items-center gap-1"><ArrowRight className="h-3 w-3 text-emerald-600" />{page.conversions}</div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
