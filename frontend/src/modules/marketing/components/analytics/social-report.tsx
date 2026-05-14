// @ts-nocheck
'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Share2, Eye, Heart, MessageCircle, Repeat2, TrendingUp, Users } from 'lucide-react';
import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const COLORS = ['#10b981', '#3b82f6', '#f59e0b', '#8b5cf6', '#ec4899'];

interface SocialReportProps {
  campaignId?: string;
}

export function SocialReport({ campaignId }: SocialReportProps) {
  const platformData = [
    { platform: 'Facebook', impressions: 85000, engagement: 4250, shares: 680, clicks: 2550, followers: 12500 },
    { platform: 'Instagram', impressions: 62000, engagement: 4960, shares: 420, clicks: 1860, followers: 8900 },
    { platform: 'LinkedIn', impressions: 35000, engagement: 1750, shares: 870, clicks: 1050, followers: 5200 },
    { platform: 'Twitter', impressions: 28000, engagement: 1120, shares: 560, clicks: 840, followers: 4100 },
  ];

  const chartData = platformData.map((p) => ({ platform: p.platform, impressions: p.impressions, engagement: p.engagement }));

  const engagementBreakdown = [
    { name: 'Likes', value: 8500 },
    { name: 'Comments', value: 2100 },
    { name: 'Shares', value: 2530 },
    { name: 'Clicks', value: 6300 },
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-2">
        <Share2 className="h-5 w-5 text-emerald-600" />
        <h3 className="text-lg font-semibold">Social Report</h3>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {[
          { icon: Eye, label: 'Impressions', value: '210K', color: 'text-emerald-600' },
          { icon: Heart, label: 'Engagement', value: '12,080', color: 'text-pink-600' },
          { icon: Repeat2, label: 'Shares', value: '2,530', color: 'text-blue-600' },
          { icon: Users, label: 'Followers', value: '30,700', color: 'text-purple-600' },
        ].map((m, idx) => (
          <motion.div key={m.label} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.04 }}>
            <Card className="border-border/50">
              <CardContent className="p-3">
                <m.icon className={`h-4 w-4 ${m.color} mb-2`} />
                <p className="text-sm font-bold tabular-nums">{m.value}</p>
                <p className="text-xs text-muted-foreground">{m.label}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card className="border-border/50">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-semibold">Platform Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-56">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} margin={{ top: 5, right: 20, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
                  <XAxis dataKey="platform" tick={{ fontSize: 11 }} stroke="hsl(var(--muted-foreground))" />
                  <YAxis tick={{ fontSize: 11 }} stroke="hsl(var(--muted-foreground))" />
                  <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: '8px', fontSize: '12px' }} />
                  <Bar dataKey="impressions" fill="#10b981" radius={[4, 4, 0, 0]} name="Impressions" />
                  <Bar dataKey="engagement" fill="#3b82f6" radius={[4, 4, 0, 0]} name="Engagement" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/50">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-semibold">Engagement Breakdown</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-56">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={engagementBreakdown} cx="50%" cy="50%" innerRadius={45} outerRadius={80} dataKey="value" paddingAngle={2}>
                    {engagementBreakdown.map((_, idx) => (
                      <Cell key={idx} fill={COLORS[idx % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: '8px', fontSize: '12px' }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="border-border/50">
        <CardHeader className="pb-2">
          <CardTitle className="text-base font-semibold">Platform Details</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {platformData.map((p, idx) => (
              <motion.div
                key={p.platform}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.05 }}
                className="flex items-center gap-3 p-3 rounded-lg bg-muted/30"
              >
                <Badge variant="secondary" className="text-xs w-24 justify-center">{p.platform}</Badge>
                <div className="flex-1 grid grid-cols-4 gap-3 text-xs text-muted-foreground">
                  <div><span className="font-medium text-foreground">{(p.impressions / 1000).toFixed(1)}K</span> impr.</div>
                  <div><span className="font-medium text-foreground">{p.engagement.toLocaleString()}</span> eng.</div>
                  <div><span className="font-medium text-foreground">{p.shares.toLocaleString()}</span> shares</div>
                  <div><span className="font-medium text-foreground">{p.clicks.toLocaleString()}</span> clicks</div>
                </div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
