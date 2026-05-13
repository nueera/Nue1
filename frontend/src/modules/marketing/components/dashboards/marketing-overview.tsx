'use client';

import { motion } from 'framer-motion';
import {
  Users,
  Megaphone,
  Mail,
  TrendingUp,
  DollarSign,
  ArrowUpRight,
  ArrowDownRight,
  Clock,
  BarChart3,
} from 'lucide-react';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MetricCard } from '../shared/metric-card';
import { CampaignStatusBadge } from '../shared/campaign-status-badge';
import { ChannelIcon } from '../shared/channel-icon';
import { cn } from '@/lib/utils';
import { formatCurrency } from '@/modules/marketing/utils';

// ---------------------------------------------------------------------------
// Mock Data
// ---------------------------------------------------------------------------

const campaignPerformanceData = [
  { month: 'Jan', email: 42, sms: 28, social: 18 },
  { month: 'Feb', email: 48, sms: 32, social: 22 },
  { month: 'Mar', email: 55, sms: 35, social: 25 },
  { month: 'Apr', email: 52, sms: 30, social: 28 },
  { month: 'May', email: 60, sms: 38, social: 32 },
  { month: 'Jun', email: 65, sms: 42, social: 35 },
];

const leadTrendData = [
  { month: 'Jan', leads: 320, qualified: 110 },
  { month: 'Feb', leads: 380, qualified: 135 },
  { month: 'Mar', leads: 420, qualified: 155 },
  { month: 'Apr', leads: 390, qualified: 140 },
  { month: 'May', leads: 460, qualified: 170 },
  { month: 'Jun', leads: 510, qualified: 195 },
];

const channelBreakdownData = [
  { channel: 'Email', value: 42, color: '#3b82f6' },
  { channel: 'SMS', value: 22, color: '#10b981' },
  { channel: 'Social', value: 18, color: '#a855f7' },
  { channel: 'WhatsApp', value: 12, color: '#14b8a6' },
  { channel: 'Web Push', value: 6, color: '#f59e0b' },
];

const topCampaigns = [
  { id: '1', name: 'Summer Sale 2025', channel: 'email' as const, status: 'active' as const, sent: 24500, openRate: 28.4 },
  { id: '2', name: 'Product Launch: Pro', channel: 'email' as const, status: 'completed' as const, sent: 18200, openRate: 32.1 },
  { id: '3', name: 'Re-engagement Q2', channel: 'sms' as const, status: 'active' as const, sent: 8500, openRate: 95.2 },
  { id: '4', name: 'Flash Deal Friday', channel: 'whatsapp' as const, status: 'scheduled' as const, sent: 0, openRate: 0 },
  { id: '5', name: 'Blog Newsletter #42', channel: 'email' as const, status: 'draft' as const, sent: 0, openRate: 0 },
];

const recentActivity = [
  { id: '1', description: 'Campaign "Summer Sale" sent to 24,500 contacts', time: '2h ago', type: 'campaign' },
  { id: '2', description: '142 new leads imported from webinar', time: '4h ago', type: 'lead' },
  { id: '3', description: 'A/B test "Subject Line" reached 95% confidence', time: '6h ago', type: 'test' },
  { id: '4', description: 'Revenue milestone: $100K attributed this month', time: '1d ago', type: 'revenue' },
  { id: '5', description: 'Audience "VIP Customers" grew by 12%', time: '2d ago', type: 'audience' },
];

const sparklineLeads = [
  { value: 320 }, { value: 380 }, { value: 420 }, { value: 390 }, { value: 460 }, { value: 510 },
];
const sparklineCampaigns = [
  { value: 12 }, { value: 15 }, { value: 18 }, { value: 16 }, { value: 21 }, { value: 24 },
];
const sparklineOpenRate = [
  { value: 22 }, { value: 24 }, { value: 23 }, { value: 26 }, { value: 25 }, { value: 28 },
];
const sparklineRevenue = [
  { value: 82000 }, { value: 94000 }, { value: 101000 }, { value: 96000 }, { value: 112000 }, { value: 125000 },
];

// ---------------------------------------------------------------------------
// Marketing Overview Dashboard
// ---------------------------------------------------------------------------

const containerStagger = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.06 },
  },
};

export function MarketingOverview() {
  return (
    <div className="space-y-6 p-4 sm:p-6">
      {/* Page Header */}
      <motion.div
        initial={{ opacity: 0, y: -4 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
        className="flex flex-col sm:flex-row sm:items-center justify-between gap-4"
      >
        <div>
          <h1 className="text-2xl font-bold text-foreground tracking-tight">Marketing Overview</h1>
          <p className="text-sm text-muted-foreground mt-1">Your marketing performance at a glance</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <BarChart3 className="h-4 w-4 mr-2" />
            Reports
          </Button>
          <Button size="sm">
            <Megaphone className="h-4 w-4 mr-2" />
            New Campaign
          </Button>
        </div>
      </motion.div>

      {/* Top Row: 4 Metric Cards */}
      <motion.div
        variants={containerStagger}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
      >
        <MetricCard
          icon={Users}
          title="Total Leads"
          value="5,248"
          change={12.3}
          changeLabel="vs last month"
          sparklineData={sparklineLeads}
          accentColor="text-blue-600"
          accentBg="bg-blue-50 dark:bg-blue-950/30"
        />
        <MetricCard
          icon={Megaphone}
          title="Active Campaigns"
          value="24"
          change={8.5}
          changeLabel="vs last month"
          sparklineData={sparklineCampaigns}
          accentColor="text-emerald-600"
          accentBg="bg-emerald-50 dark:bg-emerald-950/30"
        />
        <MetricCard
          icon={Mail}
          title="Avg Open Rate"
          value="28.4%"
          change={3.2}
          changeLabel="vs last month"
          sparklineData={sparklineOpenRate}
          accentColor="text-amber-600"
          accentBg="bg-amber-50 dark:bg-amber-950/30"
        />
        <MetricCard
          icon={DollarSign}
          title="Revenue Attributed"
          value="$125K"
          change={15.7}
          changeLabel="vs last month"
          sparklineData={sparklineRevenue}
          accentColor="text-teal-600"
          accentBg="bg-teal-50 dark:bg-teal-950/30"
        />
      </motion.div>

      {/* Middle Row: Campaign Performance + Lead Generation Trend */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Campaign Performance */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <Card className="border-border/50">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base font-semibold">Campaign Performance</CardTitle>
                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-blue-500" />
                    Email
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                    SMS
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-purple-500" />
                    Social
                  </span>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <ResponsiveContainer width="100%" height={280}>
                <BarChart data={campaignPerformanceData} margin={{ top: 8, right: 8, left: -8, bottom: 0 }}>
                  <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }} />
                  <Tooltip
                    contentStyle={{ backgroundColor: 'hsl(var(--popover))', border: '1px solid hsl(var(--border))', borderRadius: '8px', fontSize: '12px' }}
                  />
                  <Bar dataKey="email" fill="#3b82f6" radius={[3, 3, 0, 0]} animationDuration={800} name="Email" />
                  <Bar dataKey="sms" fill="#10b981" radius={[3, 3, 0, 0]} animationDuration={800} name="SMS" />
                  <Bar dataKey="social" fill="#a855f7" radius={[3, 3, 0, 0]} animationDuration={800} name="Social" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>

        {/* Lead Generation Trend */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.15 }}
        >
          <Card className="border-border/50">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base font-semibold">Lead Generation Trend</CardTitle>
                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-blue-500" />
                    Total Leads
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                    Qualified
                  </span>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <ResponsiveContainer width="100%" height={280}>
                <LineChart data={leadTrendData} margin={{ top: 8, right: 8, left: -8, bottom: 0 }}>
                  <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }} />
                  <Tooltip
                    contentStyle={{ backgroundColor: 'hsl(var(--popover))', border: '1px solid hsl(var(--border))', borderRadius: '8px', fontSize: '12px' }}
                  />
                  <Line type="monotone" dataKey="leads" stroke="#3b82f6" strokeWidth={2} dot={false} animationDuration={800} name="Total Leads" />
                  <Line type="monotone" dataKey="qualified" stroke="#10b981" strokeWidth={2} dot={false} animationDuration={800} name="Qualified" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Bottom Row: Top Campaigns + Recent Activity + Channel Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Top Performing Campaigns */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          <Card className="border-border/50 h-full">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base font-semibold">Top Campaigns</CardTitle>
                <Button variant="ghost" size="sm" className="text-xs">View All</Button>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="space-y-1 max-h-80 overflow-y-auto">
                {topCampaigns.map((campaign) => (
                  <div
                    key={campaign.id}
                    className="flex items-center justify-between py-2.5 px-2 rounded-lg hover:bg-muted/30 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary/10 text-primary shrink-0">
                        <ChannelIcon channel={campaign.channel} size="sm" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-medium text-foreground truncate">{campaign.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {campaign.sent > 0 ? `${campaign.sent.toLocaleString()} sent` : 'Not sent yet'}
                        </p>
                      </div>
                    </div>
                    <CampaignStatusBadge status={campaign.status} />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.25 }}
        >
          <Card className="border-border/50 h-full">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base font-semibold">Recent Activity</CardTitle>
                <Button variant="ghost" size="sm" className="text-xs">View All</Button>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="space-y-1 max-h-80 overflow-y-auto">
                {recentActivity.map((activity) => (
                  <div
                    key={activity.id}
                    className="flex items-start gap-3 py-2.5 px-2 rounded-lg hover:bg-muted/30 transition-colors"
                  >
                    <div className={cn(
                      'flex items-center justify-center w-7 h-7 rounded-lg shrink-0 mt-0.5',
                      activity.type === 'campaign' ? 'bg-blue-50 dark:bg-blue-950/30' :
                      activity.type === 'lead' ? 'bg-emerald-50 dark:bg-emerald-950/30' :
                      activity.type === 'test' ? 'bg-violet-50 dark:bg-violet-950/30' :
                      activity.type === 'revenue' ? 'bg-teal-50 dark:bg-teal-950/30' :
                      'bg-amber-50 dark:bg-amber-950/30'
                    )}>
                      {activity.type === 'campaign' && <Megaphone className="h-3.5 w-3.5 text-blue-600" />}
                      {activity.type === 'lead' && <Users className="h-3.5 w-3.5 text-emerald-600" />}
                      {activity.type === 'test' && <TrendingUp className="h-3.5 w-3.5 text-violet-600" />}
                      {activity.type === 'revenue' && <DollarSign className="h-3.5 w-3.5 text-teal-600" />}
                      {activity.type === 'audience' && <Users className="h-3.5 w-3.5 text-amber-600" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-foreground">{activity.description}</p>
                      <p className="text-xs text-muted-foreground mt-0.5 flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {activity.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Channel Breakdown */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.3 }}
        >
          <Card className="border-border/50 h-full">
            <CardHeader className="pb-2">
              <CardTitle className="text-base font-semibold">Channel Breakdown</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <ResponsiveContainer width="100%" height={180}>
                <PieChart>
                  <Pie
                    data={channelBreakdownData}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={75}
                    paddingAngle={3}
                    dataKey="value"
                    nameKey="channel"
                    animationDuration={800}
                  >
                    {channelBreakdownData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'hsl(var(--popover))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px',
                      fontSize: '12px',
                    }}
                    formatter={(value: number) => [`${value}%`, 'Share']}
                  />
                </PieChart>
              </ResponsiveContainer>
              <div className="grid grid-cols-2 gap-2 mt-3">
                {channelBreakdownData.map((item) => (
                  <div key={item.channel} className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: item.color }} />
                    <span className="text-xs text-muted-foreground">{item.channel}</span>
                    <span className="text-xs font-medium text-foreground ml-auto tabular-nums">{item.value}%</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
