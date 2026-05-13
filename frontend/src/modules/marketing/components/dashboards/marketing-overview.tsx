'use client';

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

// ---------------------------------------------------------------------------
// Lightweight SVG Sparkline — replaces recharts AreaChart in MetricCards
// Much faster: no recharts ResponsiveContainer overhead per card
// ---------------------------------------------------------------------------

function Sparkline({ data, color, height = 40 }: { data: number[]; color: string; height?: number }) {
  if (data.length < 2) return null;
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const w = 100;
  const points = data.map((v, i) => {
    const x = (i / (data.length - 1)) * w;
    const y = height - ((v - min) / range) * (height - 4) - 2;
    return `${x},${y}`;
  }).join(' ');

  return (
    <svg width="100%" height={height} viewBox={`0 0 ${w} ${height}`} preserveAspectRatio="none" className="overflow-visible">
      <defs>
        <linearGradient id={`sg-${color.replace('#', '')}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity={0.2} />
          <stop offset="95%" stopColor={color} stopOpacity={0} />
        </linearGradient>
      </defs>
      <polyline
        points={points}
        fill="none"
        stroke={color}
        strokeWidth={1.5}
        strokeLinejoin="round"
        strokeLinecap="round"
      />
      <polygon
        points={`0,${height} ${points} ${w},${height}`}
        fill={`url(#sg-${color.replace('#', '')})`}
      />
    </svg>
  );
}

// ---------------------------------------------------------------------------
// Metric Card — lightweight version using SVG sparkline instead of recharts
// ---------------------------------------------------------------------------

interface MetricCardProps {
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  title: string;
  value: string;
  change?: number;
  changeLabel?: string;
  sparklineData?: number[];
  accentColor?: string;
  accentBg?: string;
  className?: string;
}

function MetricCard({
  icon: Icon,
  title,
  value,
  change,
  changeLabel,
  sparklineData,
  accentColor = 'text-emerald-600',
  accentBg = 'bg-emerald-50 dark:bg-emerald-950/30',
  className,
}: MetricCardProps) {
  const isPositive = change !== undefined ? change >= 0 : true;

  return (
    <Card className={cn('hover:shadow-md transition-shadow duration-200 border-border/50', className)}>
      <CardContent className="p-5">
        <div className="flex items-start justify-between">
          <div className={cn('flex items-center justify-center w-10 h-10 rounded-xl', accentBg)}>
            <Icon className={cn('h-5 w-5', accentColor)} strokeWidth={1.8} />
          </div>
          {change !== undefined && (
            <Badge
              variant="secondary"
              className={cn(
                'text-xs font-medium gap-0.5',
                isPositive
                  ? 'text-emerald-600 bg-emerald-50 dark:bg-emerald-950/30'
                  : 'text-red-600 bg-red-50 dark:bg-red-950/30'
              )}
            >
              {isPositive ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
              {Math.abs(change)}%
            </Badge>
          )}
        </div>

        <div className="mt-4">
          <p className="text-2xl font-bold text-foreground tracking-tight tabular-nums">{value}</p>
          <p className="text-sm text-muted-foreground mt-1">{title}</p>
          {changeLabel && (
            <p className="text-xs text-muted-foreground mt-0.5">{changeLabel}</p>
          )}
        </div>

        {sparklineData && sparklineData.length > 1 && (
          <div className="mt-3">
            <Sparkline
              data={sparklineData}
              color={isPositive ? '#10b981' : '#ef4444'}
              height={40}
            />
          </div>
        )}
      </CardContent>
    </Card>
  );
}

// Channel icon helper (inline to avoid heavy import)
function ChannelIcon({ channel, size = 'sm' }: { channel: string; size?: 'sm' | 'md' }) {
  const sz = size === 'sm' ? 'h-3.5 w-3.5' : 'h-4 w-4';
  switch (channel) {
    case 'email': return <Mail className={sz} />;
    case 'sms': return <Mail className={sz} />;
    case 'whatsapp': return <Mail className={sz} />;
    default: return <Mail className={sz} />;
  }
}

// Campaign status badge helper (inline)
function CampaignStatusBadge({ status }: { status: string }) {
  const variants: Record<string, string> = {
    active: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-400',
    completed: 'bg-blue-50 text-blue-700 dark:bg-blue-950/30 dark:text-blue-400',
    scheduled: 'bg-amber-50 text-amber-700 dark:bg-amber-950/30 dark:text-amber-400',
    draft: 'bg-muted text-muted-foreground',
    paused: 'bg-violet-50 text-violet-700 dark:bg-violet-950/30 dark:text-violet-400',
  };
  return (
    <Badge variant="secondary" className={cn('text-[10px] px-1.5 py-0 capitalize', variants[status] || variants.draft)}>
      {status}
    </Badge>
  );
}

// ---------------------------------------------------------------------------
// Marketing Overview Dashboard
// Replaced all motion.div with CSS animations for zero JS animation overhead.
// Replaced recharts sparklines in MetricCards with lightweight SVG.
// ---------------------------------------------------------------------------

export function MarketingOverview() {
  return (
    <div className="space-y-6 p-4 sm:p-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 animate-in fade-in duration-200">
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
      </div>

      {/* Top Row: 4 Metric Cards — using lightweight SVG sparklines */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 animate-in fade-in slide-in-from-bottom-1 duration-200">
        <MetricCard
          icon={Users}
          title="Total Leads"
          value="5,248"
          change={12.3}
          changeLabel="vs last month"
          sparklineData={[320, 380, 420, 390, 460, 510]}
          accentColor="text-blue-600"
          accentBg="bg-blue-50 dark:bg-blue-950/30"
        />
        <MetricCard
          icon={Megaphone}
          title="Active Campaigns"
          value="24"
          change={8.5}
          changeLabel="vs last month"
          sparklineData={[12, 15, 18, 16, 21, 24]}
          accentColor="text-emerald-600"
          accentBg="bg-emerald-50 dark:bg-emerald-950/30"
        />
        <MetricCard
          icon={Mail}
          title="Avg Open Rate"
          value="28.4%"
          change={3.2}
          changeLabel="vs last month"
          sparklineData={[22, 24, 23, 26, 25, 28]}
          accentColor="text-amber-600"
          accentBg="bg-amber-50 dark:bg-amber-950/30"
        />
        <MetricCard
          icon={DollarSign}
          title="Revenue Attributed"
          value="$125K"
          change={15.7}
          changeLabel="vs last month"
          sparklineData={[82000, 94000, 101000, 96000, 112000, 125000]}
          accentColor="text-teal-600"
          accentBg="bg-teal-50 dark:bg-teal-950/30"
        />
      </div>

      {/* Middle Row: Campaign Performance + Lead Generation Trend */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 animate-in fade-in slide-in-from-bottom-2 duration-300 delay-100">
        {/* Campaign Performance */}
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
                <Bar dataKey="email" fill="#3b82f6" radius={[3, 3, 0, 0]} animationDuration={600} name="Email" />
                <Bar dataKey="sms" fill="#10b981" radius={[3, 3, 0, 0]} animationDuration={600} name="SMS" />
                <Bar dataKey="social" fill="#a855f7" radius={[3, 3, 0, 0]} animationDuration={600} name="Social" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Lead Generation Trend */}
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
                <Line type="monotone" dataKey="leads" stroke="#3b82f6" strokeWidth={2} dot={false} animationDuration={600} name="Total Leads" />
                <Line type="monotone" dataKey="qualified" stroke="#10b981" strokeWidth={2} dot={false} animationDuration={600} name="Qualified" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Bottom Row: Top Campaigns + Recent Activity + Channel Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-in fade-in slide-in-from-bottom-2 duration-300 delay-150">
        {/* Top Performing Campaigns */}
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

        {/* Recent Activity */}
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

        {/* Channel Breakdown */}
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
                  animationDuration={600}
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
      </div>
    </div>
  );
}
