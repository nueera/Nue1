'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Flame, MousePointerClick, Eye, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';

interface PageHeatmapsProps {
  pageId?: string;
}

const MOCK_HEATMAP_ZONES = [
  { zone: 'Hero Section', clicks: 4200, engagement: 'high', color: '#ef4444' },
  { zone: 'Navigation Bar', clicks: 3100, engagement: 'high', color: '#f97316' },
  { zone: 'Feature Cards', clicks: 2800, engagement: 'medium', color: '#f59e0b' },
  { zone: 'CTA Button', clicks: 2200, engagement: 'high', color: '#ef4444' },
  { zone: 'Testimonials', clicks: 1400, engagement: 'medium', color: '#f59e0b' },
  { zone: 'Pricing Table', clicks: 1800, engagement: 'medium', color: '#f59e0b' },
  { zone: 'Footer', clicks: 600, engagement: 'low', color: '#22c55e' },
];

export function PageHeatmaps({ pageId }: PageHeatmapsProps) {
  const maxClicks = Math.max(...MOCK_HEATMAP_ZONES.map((z) => z.clicks));

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-2">
        <Flame className="h-5 w-5 text-emerald-600" />
        <h3 className="text-lg font-semibold">Page Heatmaps</h3>
      </div>

      <div className="grid grid-cols-3 gap-3">
        {[
          { icon: Eye, label: 'Page Views', value: '28,450' },
          { icon: MousePointerClick, label: 'Total Clicks', value: '16,100' },
          { icon: TrendingUp, label: 'Avg. Engagement', value: '3m 24s' },
        ].map((m, idx) => (
          <motion.div key={m.label} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.04 }}>
            <Card className="border-border/50">
              <CardContent className="p-3 text-center">
                <m.icon className="h-4 w-4 text-emerald-600 mx-auto mb-1" />
                <p className="text-sm font-bold tabular-nums">{m.value}</p>
                <p className="text-xs text-muted-foreground">{m.label}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <Card className="border-border/50">
        <CardHeader className="pb-2">
          <CardTitle className="text-base font-semibold">Click Zone Heatmap</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {MOCK_HEATMAP_ZONES.map((zone, idx) => {
              const width = Math.round((zone.clicks / maxClicks) * 100);
              return (
                <motion.div key={zone.zone} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: idx * 0.04 }} className="flex items-center gap-3">
                  <span className="text-sm font-medium w-32 shrink-0">{zone.zone}</span>
                  <div className="flex-1 h-6 bg-muted/30 rounded overflow-hidden relative">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${width}%` }}
                      transition={{ duration: 0.6, delay: idx * 0.08 }}
                      className="h-full rounded flex items-center justify-end pr-2"
                      style={{ backgroundColor: zone.color, opacity: 0.7 }}
                    >
                      <span className="text-xs text-white font-medium">{zone.clicks.toLocaleString()}</span>
                    </motion.div>
                  </div>
                  <Badge variant={zone.engagement === 'high' ? 'default' : zone.engagement === 'medium' ? 'secondary' : 'outline'} className="text-xs w-16 justify-center">
                    {zone.engagement}
                  </Badge>
                </motion.div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      <Card className="border-border/50">
        <CardContent className="p-4">
          <div className="flex items-center gap-4 text-xs">
            <div className="flex items-center gap-1.5"><div className="h-2.5 w-2.5 rounded-full bg-red-500" />High</div>
            <div className="flex items-center gap-1.5"><div className="h-2.5 w-2.5 rounded-full bg-amber-500" />Medium</div>
            <div className="flex items-center gap-1.5"><div className="h-2.5 w-2.5 rounded-full bg-green-500" />Low</div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
