// @ts-nocheck
'use client';

import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Sparkles } from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Cell } from 'recharts';

interface SocialBestTimesProps {
  className?: string;
}

const HOUR_DATA = Array.from({ length: 24 }, (_, i) => {
  const isWorkHour = i >= 8 && i <= 18;
  const isPeak = i === 9 || i === 12 || i === 17;
  return {
    hour: `${i}:00`,
    engagement: Math.floor(Math.random() * 50) + (isPeak ? 80 : isWorkHour ? 40 : 5),
  };
});

const DAYS_DATA = [
  { day: 'Mon', engagement: 72 },
  { day: 'Tue', engagement: 68 },
  { day: 'Wed', engagement: 85 },
  { day: 'Thu', engagement: 78 },
  { day: 'Fri', engagement: 90 },
  { day: 'Sat', engagement: 35 },
  { day: 'Sun', engagement: 28 },
];

export function SocialBestTimes({ className }: SocialBestTimesProps) {
  const maxEngagement = Math.max(...HOUR_DATA.map((d) => d.engagement));

  return (
    <Card className={cn('border-border/50', className)}>
      <CardHeader>
        <CardTitle className="text-sm flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-amber-500" />
          Best Time Recommendations
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Hourly Heatmap */}
        <div>
          <p className="text-xs text-muted-foreground mb-2">Engagement by Hour</p>
          <div className="h-40">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={HOUR_DATA} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                <XAxis dataKey="hour" tick={{ fontSize: 8 }} interval={2} />
                <YAxis tick={{ fontSize: 9 }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px',
                    fontSize: '11px',
                  }}
                />
                <Bar dataKey="engagement" radius={[3, 3, 0, 0]}>
                  {HOUR_DATA.map((entry, index) => (
                    <Cell
                      key={index}
                      fill={
                        entry.engagement >= maxEngagement * 0.8
                          ? '#10b981'
                          : entry.engagement >= maxEngagement * 0.5
                            ? '#f59e0b'
                            : '#e5e7eb'
                      }
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Day of Week */}
        <div>
          <p className="text-xs text-muted-foreground mb-2">Engagement by Day</p>
          <div className="grid grid-cols-7 gap-1">
            {DAYS_DATA.map((day) => {
              const intensity = day.engagement / 100;
              return (
                <div key={day.day} className="text-center">
                  <div
                    className="h-16 rounded-md flex items-end justify-center pb-1 transition-colors"
                    style={{
                      backgroundColor: `rgba(16, 185, 129, ${intensity * 0.3})`,
                    }}
                  >
                    <span className="text-[10px] font-bold text-emerald-700 dark:text-emerald-300">
                      {day.engagement}
                    </span>
                  </div>
                  <p className="text-[10px] text-muted-foreground mt-1">{day.day}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Top Recommendations */}
        <div className="p-3 rounded-lg bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800">
          <p className="text-xs font-medium text-emerald-700 dark:text-emerald-300 mb-1">Recommended Schedule</p>
          <ul className="text-xs text-emerald-600 dark:text-emerald-400 space-y-0.5">
            <li>• Friday at 9:00 AM — Highest engagement</li>
            <li>• Wednesday at 12:00 PM — Peak lunchtime activity</li>
            <li>• Monday at 5:00 PM — End-of-day browsing</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}
