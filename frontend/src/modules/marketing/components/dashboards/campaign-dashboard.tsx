// @ts-nocheck
'use client';

import {
  Megaphone,
  Mail,
  Eye,
  MousePointerClick,
  ArrowUpRight,
  Clock,
} from 'lucide-react';
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MetricCard } from '../shared/metric-card';
import { CampaignStatusBadge } from '../shared/campaign-status-badge';
import { ChannelIcon } from '../shared/channel-icon';

// ---------------------------------------------------------------------------
// Mock Data
// ---------------------------------------------------------------------------

const channelPerformanceData = [
  { channel: 'Email', sent: 24500, opened: 6800, clicked: 1420 },
  { channel: 'SMS', sent: 8500, opened: 7900, clicked: 680 },
  { channel: 'WhatsApp', sent: 4200, opened: 3600, clicked: 520 },
  { channel: 'Social', sent: 12000, opened: 2400, clicked: 360 },
  { channel: 'Web Push', sent: 6200, opened: 1200, clicked: 180 },
];

const statusDistributionData = [
  { status: 'Active', count: 8, color: '#10b981' },
  { status: 'Scheduled', count: 5, color: '#3b82f6' },
  { status: 'Draft', count: 7, color: '#6b7280' },
  { status: 'Completed', count: 12, color: '#14b8a6' },
  { status: 'Paused', count: 3, color: '#f59e0b' },
];

const recentCampaigns = [
  { id: '1', name: 'Summer Sale 2025', channel: 'email' as const, status: 'active' as const, sent: 24500, openRate: 28.4, clickRate: 5.8 },
  { id: '2', name: 'Re-engagement SMS', channel: 'sms' as const, status: 'active' as const, sent: 8500, openRate: 95.2, clickRate: 8.0 },
  { id: '3', name: 'Product Launch Pro', channel: 'email' as const, status: 'completed' as const, sent: 18200, openRate: 32.1, clickRate: 7.2 },
  { id: '4', name: 'Flash Deal Friday', channel: 'whatsapp' as const, status: 'scheduled' as const, sent: 0, openRate: 0, clickRate: 0 },
  { id: '5', name: 'Blog Newsletter #42', channel: 'email' as const, status: 'draft' as const, sent: 0, openRate: 0, clickRate: 0 },
  { id: '6', name: 'Social Awareness', channel: 'facebook' as const, status: 'paused' as const, sent: 12000, openRate: 15.0, clickRate: 1.5 },
  { id: '7', name: 'Welcome Series', channel: 'email' as const, status: 'active' as const, sent: 3200, openRate: 42.0, clickRate: 9.5 },
];

const sparkActive = [{ value: 18 }, { value: 21 }, { value: 19 }, { value: 24 }, { value: 22 }, { value: 8 }];
const sparkSent = [{ value: 42000 }, { value: 48000 }, { value: 55000 }, { value: 51000 }, { value: 58000 }, { value: 63400 }];
const sparkOpen = [{ value: 22 }, { value: 24 }, { value: 23 }, { value: 26 }, { value: 25 }, { value: 28.4 }];
const sparkClick = [{ value: 3.2 }, { value: 3.8 }, { value: 4.1 }, { value: 3.9 }, { value: 4.5 }, { value: 5.2 }];

// ---------------------------------------------------------------------------
// Campaign Dashboard
// ---------------------------------------------------------------------------

export function CampaignDashboard() {
  return (
    <div className="space-y-6 p-4 sm:p-6">
      {/* Page Header */}
      <div className="animate-in fade-in slide-in-from-top-1 duration-200">
        <h1 className="text-2xl font-bold text-foreground tracking-tight">Campaign Dashboard</h1>
        <p className="text-sm text-muted-foreground mt-1">Campaign performance and delivery metrics</p>
      </div>

      {/* KPI Cards */}
      <div
        className="animate-in fade-in duration-200 delay-75 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
      >
        <MetricCard
          icon={Megaphone}
          title="Active Campaigns"
          value="8"
          change={14.3}
          changeLabel="vs last month"
          sparklineData={sparkActive}
          accentColor="text-emerald-600"
          accentBg="bg-emerald-50 dark:bg-emerald-950/30"
        />
        <MetricCard
          icon={Mail}
          title="Emails Sent"
          value="63.4K"
          change={9.2}
          changeLabel="vs last month"
          sparklineData={sparkSent}
          accentColor="text-blue-600"
          accentBg="bg-blue-50 dark:bg-blue-950/30"
        />
        <MetricCard
          icon={Eye}
          title="Avg Open Rate"
          value="28.4%"
          change={3.2}
          changeLabel="vs last month"
          sparklineData={sparkOpen}
          accentColor="text-amber-600"
          accentBg="bg-amber-50 dark:bg-amber-950/30"
        />
        <MetricCard
          icon={MousePointerClick}
          title="Avg Click Rate"
          value="5.2%"
          change={6.1}
          changeLabel="vs last month"
          sparklineData={sparkClick}
          accentColor="text-teal-600"
          accentBg="bg-teal-50 dark:bg-teal-950/30"
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Campaign Performance by Channel */}
        <div className="animate-in fade-in slide-in-from-bottom-2 duration-200 delay-100">
          <Card className="border-border/50">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base font-semibold">Performance by Channel</CardTitle>
                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-blue-500" />Sent</span>
                  <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />Opened</span>
                  <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-amber-500" />Clicked</span>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <ResponsiveContainer width="100%" height={280}>
                <BarChart data={channelPerformanceData} margin={{ top: 8, right: 8, left: -8, bottom: 0 }}>
                  <XAxis dataKey="channel" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }} tickFormatter={(v: number) => `${(v / 1000).toFixed(0)}k`} />
                  <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--popover))', border: '1px solid hsl(var(--border))', borderRadius: '8px', fontSize: '12px' }} />
                  <Bar dataKey="sent" fill="#3b82f6" radius={[3, 3, 0, 0]} animationDuration={800} name="Sent" />
                  <Bar dataKey="opened" fill="#10b981" radius={[3, 3, 0, 0]} animationDuration={800} name="Opened" />
                  <Bar dataKey="clicked" fill="#f59e0b" radius={[3, 3, 0, 0]} animationDuration={800} name="Clicked" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Campaign Status Distribution */}
        <div className="animate-in fade-in slide-in-from-bottom-2 duration-200 delay-150">
          <Card className="border-border/50">
            <CardHeader className="pb-2">
              <CardTitle className="text-base font-semibold">Campaign Status Distribution</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <ResponsiveContainer width="100%" height={180}>
                <PieChart>
                  <Pie
                    data={statusDistributionData}
                    cx="50%"
                    cy="50%"
                    innerRadius={55}
                    outerRadius={78}
                    paddingAngle={3}
                    dataKey="count"
                    nameKey="status"
                    animationDuration={800}
                  >
                    {statusDistributionData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{ backgroundColor: 'hsl(var(--popover))', border: '1px solid hsl(var(--border))', borderRadius: '8px', fontSize: '12px' }}
                    formatter={(value: number) => [value, 'Campaigns']}
                  />
                </PieChart>
              </ResponsiveContainer>
              <div className="grid grid-cols-3 gap-2 mt-3">
                {statusDistributionData.map((item) => (
                  <div key={item.status} className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: item.color }} />
                    <span className="text-xs text-muted-foreground">{item.status}</span>
                    <span className="text-xs font-medium text-foreground ml-auto tabular-nums">{item.count}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Recent Campaigns List */}
      <div className="animate-in fade-in slide-in-from-bottom-2 duration-200 delay-200">
        <Card className="border-border/50">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base font-semibold">Recent Campaigns</CardTitle>
              <Button variant="ghost" size="sm" className="text-xs">View All</Button>
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="space-y-1">
              {recentCampaigns.map((campaign) => (
                <div
                  key={campaign.id}
                  className="flex items-center justify-between py-3 px-2 rounded-lg hover:bg-muted/30 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-primary/10 text-primary shrink-0">
                      <ChannelIcon channel={campaign.channel} />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">{campaign.name}</p>
                      <div className="flex items-center gap-2 mt-0.5">
                        {campaign.sent > 0 && (
                          <span className="text-xs text-muted-foreground">
                            {campaign.sent.toLocaleString()} sent · {campaign.openRate}% open · {campaign.clickRate}% click
                          </span>
                        )}
                        {campaign.sent === 0 && (
                          <span className="text-xs text-muted-foreground">Not yet sent</span>
                        )}
                      </div>
                    </div>
                  </div>
                  <CampaignStatusBadge status={campaign.status} />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
