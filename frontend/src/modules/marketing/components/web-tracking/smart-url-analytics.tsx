'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link2, MousePointerClick, Target, TrendingUp, Globe, BarChart3 } from 'lucide-react';
import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import type { SmartUrl } from '@/modules/marketing/types';

interface SmartUrlAnalyticsProps {
  url: SmartUrl;
}

export function SmartUrlAnalytics({ url }: SmartUrlAnalyticsProps) {
  const dailyClicks = Array.from({ length: 7 }, (_, i) => ({
    day: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][i],
    clicks: Math.floor(Math.random() * 100) + 20,
    unique: Math.floor(Math.random() * 60) + 10,
  }));

  const referrerData = [
    { source: 'Direct', count: 145 },
    { source: 'Google', count: 98 },
    { source: 'Facebook', count: 67 },
    { source: 'Twitter', count: 42 },
    { source: 'Email', count: 38 },
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-2">
        <Link2 className="h-5 w-5 text-emerald-600" />
        <h3 className="text-lg font-semibold">URL Analytics</h3>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {[
          { icon: MousePointerClick, label: 'Total Clicks', value: url.clicks.toLocaleString(), color: 'text-emerald-600' },
          { icon: Target, label: 'Unique Clicks', value: url.uniqueClicks.toLocaleString(), color: 'text-blue-600' },
          { icon: TrendingUp, label: 'Conversions', value: url.conversions.toString(), color: 'text-amber-600' },
          { icon: Globe, label: 'Conv. Rate', value: `${url.clicks > 0 ? ((url.conversions / url.clicks) * 100).toFixed(1) : 0}%`, color: 'text-purple-600' },
        ].map((m, idx) => (
          <motion.div key={m.label} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.04 }}>
            <Card className="border-border/50">
              <CardContent className="p-3">
                <m.icon className={`h-4 w-4 ${m.color} mb-1`} />
                <p className="text-lg font-bold tabular-nums">{m.value}</p>
                <p className="text-xs text-muted-foreground">{m.label}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <Card className="border-border/50">
        <CardHeader className="pb-2">
          <CardTitle className="text-base font-semibold">Daily Clicks</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={dailyClicks} margin={{ top: 5, right: 20, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
                <XAxis dataKey="day" tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
                <YAxis tick={{ fontSize: 11 }} stroke="hsl(var(--muted-foreground))" />
                <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: '8px', fontSize: '12px' }} />
                <Bar dataKey="clicks" fill="#10b981" radius={[4, 4, 0, 0]} name="Clicks" />
                <Bar dataKey="unique" fill="#3b82f6" radius={[4, 4, 0, 0]} name="Unique" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {url.utmSource && (
        <Card className="border-border/50">
          <CardHeader className="pb-2"><CardTitle className="text-base font-semibold">UTM Parameters</CardTitle></CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-3">
              {url.utmSource && <div className="p-2 bg-muted/30 rounded"><p className="text-xs text-muted-foreground">Source</p><p className="text-sm font-medium">{url.utmSource}</p></div>}
              {url.utmMedium && <div className="p-2 bg-muted/30 rounded"><p className="text-xs text-muted-foreground">Medium</p><p className="text-sm font-medium">{url.utmMedium}</p></div>}
              {url.utmCampaign && <div className="p-2 bg-muted/30 rounded"><p className="text-xs text-muted-foreground">Campaign</p><p className="text-sm font-medium">{url.utmCampaign}</p></div>}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
