'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Navigation, Search, Share2, Link2, Mail } from 'lucide-react';
import { motion } from 'framer-motion';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';

const COLORS = ['#10b981', '#3b82f6', '#f59e0b', '#8b5cf6', '#ec4899', '#06b6d4', '#84cc16'];

interface TrafficSourcesProps {
  dateRange?: string;
}

export function TrafficSources({ dateRange }: TrafficSourcesProps) {
  const sources = [
    { source: 'Organic Search', visitors: 18500, percentage: 35, icon: Search },
    { source: 'Direct', visitors: 10200, percentage: 19, icon: Navigation },
    { source: 'Social Media', visitors: 8400, percentage: 16, icon: Share2 },
    { source: 'Email', visitors: 6300, percentage: 12, icon: Mail },
    { source: 'Referral', visitors: 5250, percentage: 10, icon: Link2 },
    { source: 'Paid Search', visitors: 3150, percentage: 6, icon: Search },
    { source: 'Other', visitors: 1580, percentage: 3, icon: Navigation },
  ];

  const chartData = sources.map((s) => ({ name: s.source, value: s.visitors }));

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-2">
        <Navigation className="h-5 w-5 text-emerald-600" />
        <h3 className="text-lg font-semibold">Traffic Sources</h3>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card className="border-border/50">
          <CardContent className="p-4">
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={chartData} cx="50%" cy="50%" innerRadius={55} outerRadius={90} dataKey="value" paddingAngle={2}>
                    {chartData.map((_, idx) => (
                      <Cell key={idx} fill={COLORS[idx % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: '8px', fontSize: '12px' }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/50">
          <CardContent className="p-4">
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={sources.slice(0, 5)} layout="vertical" margin={{ top: 5, right: 20, left: 80, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
                  <XAxis type="number" tick={{ fontSize: 11 }} stroke="hsl(var(--muted-foreground))" />
                  <YAxis type="category" dataKey="source" tick={{ fontSize: 10 }} stroke="hsl(var(--muted-foreground))" />
                  <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: '8px', fontSize: '12px' }} />
                  <Bar dataKey="visitors" fill="#10b981" radius={[0, 4, 4, 0]} name="Visitors" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="border-border/50">
        <CardHeader className="pb-2">
          <CardTitle className="text-base font-semibold">Source Breakdown</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {sources.map((source, idx) => (
              <motion.div
                key={source.source}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.04 }}
                className="flex items-center gap-3"
              >
                <div className="flex items-center justify-center h-8 w-8 rounded-lg bg-muted/50">
                  <source.icon className="h-4 w-4" style={{ color: COLORS[idx % COLORS.length] }} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium">{source.source}</span>
                    <span className="text-xs text-muted-foreground">{source.visitors.toLocaleString()} ({source.percentage}%)</span>
                  </div>
                  <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${source.percentage}%` }}
                      transition={{ duration: 0.6, delay: idx * 0.08 }}
                      className="h-full rounded-full"
                      style={{ backgroundColor: COLORS[idx % COLORS.length] }}
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
