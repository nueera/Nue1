'use client';

import { motion } from 'framer-motion';
import {
  Users,
  UserPlus,
  Target,
  TrendingUp,
  ArrowUpRight,
  Globe,
  Share2,
  Mail,
  Megaphone,
  Search,
  Calendar,
  Download,
  Phone,
  Handshake,
  MoreHorizontal,
} from 'lucide-react';
import {
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { MetricCard } from '../shared/metric-card';
import { LeadStageBadge } from '../shared/lead-stage-badge';
import { cn } from '@/lib/utils';
import { LEAD_SOURCE_CONFIG } from '@/modules/marketing/constants/lead-constants';
import { LEAD_STAGE_CONFIG } from '@/modules/marketing/constants/lead-constants';
import type { LeadSource, LeadStage } from '@/modules/marketing/types';

// ---------------------------------------------------------------------------
// Mock Data
// ---------------------------------------------------------------------------

const sourceDistributionData = [
  { source: 'Website', count: 1420, color: '#3b82f6' },
  { source: 'Social Media', count: 890, color: '#a855f7' },
  { source: 'Paid Ads', count: 780, color: '#f59e0b' },
  { source: 'Referral', count: 620, color: '#10b981' },
  { source: 'Organic Search', count: 540, color: '#14b8a6' },
  { source: 'Events', count: 320, color: '#ef4444' },
  { source: 'Other', count: 678, color: '#6b7280' },
];

const funnelData = [
  { stage: 'new', label: 'New', count: 1420, color: '#3b82f6' },
  { stage: 'contacted', label: 'Contacted', count: 980, color: '#06b6d4' },
  { stage: 'qualified', label: 'Qualified', count: 620, color: '#10b981' },
  { stage: 'proposal', label: 'Proposal', count: 340, color: '#f59e0b' },
  { stage: 'negotiation', label: 'Negotiation', count: 180, color: '#f97316' },
  { stage: 'closed_won', label: 'Closed Won', count: 95, color: '#14b8a6' },
];

const leadTrendData = [
  { month: 'Jan', leads: 320, mql: 110, sql: 42 },
  { month: 'Feb', leads: 380, mql: 135, sql: 52 },
  { month: 'Mar', leads: 420, mql: 155, sql: 65 },
  { month: 'Apr', leads: 390, mql: 140, sql: 58 },
  { month: 'May', leads: 460, mql: 170, sql: 72 },
  { month: 'Jun', leads: 510, mql: 195, sql: 84 },
];

const topLeadSources = [
  { source: 'Website' as LeadSource, leads: 1420, conversionRate: 8.2, avgScore: 62 },
  { source: 'paid_ads' as LeadSource, leads: 780, conversionRate: 5.4, avgScore: 55 },
  { source: 'social_media' as LeadSource, leads: 890, conversionRate: 4.1, avgScore: 48 },
  { source: 'referral' as LeadSource, leads: 620, conversionRate: 12.8, avgScore: 72 },
  { source: 'organic_search' as LeadSource, leads: 540, conversionRate: 9.5, avgScore: 65 },
];

const sparkLeads = [{ value: 320 }, { value: 380 }, { value: 420 }, { value: 390 }, { value: 460 }, { value: 510 }];
const sparkNew = [{ value: 85 }, { value: 102 }, { value: 118 }, { value: 95 }, { value: 124 }, { value: 138 }];
const sparkScore = [{ value: 52 }, { value: 55 }, { value: 58 }, { value: 56 }, { value: 61 }, { value: 64 }];
const sparkConversion = [{ value: 6.8 }, { value: 7.2 }, { value: 7.8 }, { value: 7.5 }, { value: 8.1 }, { value: 8.6 }];

// ---------------------------------------------------------------------------
// Source Icon Map
// ---------------------------------------------------------------------------

const SOURCE_ICONS: Record<string, React.ComponentType<{ className?: string; strokeWidth?: number }>> = {
  website: Globe,
  social_media: Share2,
  email: Mail,
  referral: Users,
  paid_ads: Megaphone,
  organic_search: Search,
  events: Calendar,
  webinar: Calendar,
  content_download: Download,
  chat: Mail,
  phone: Phone,
  partner: Handshake,
  other: MoreHorizontal,
};

// ---------------------------------------------------------------------------
// Lead Dashboard
// ---------------------------------------------------------------------------

export function LeadDashboard() {
  return (
    <div className="space-y-6 p-4 sm:p-6">
      {/* Page Header */}
      <motion.div
        initial={{ opacity: 0, y: -4 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
      >
        <h1 className="text-2xl font-bold text-foreground tracking-tight">Lead Dashboard</h1>
        <p className="text-sm text-muted-foreground mt-1">Lead generation, scoring, and pipeline metrics</p>
      </motion.div>

      {/* KPI Cards */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3, delay: 0.05 }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
      >
        <MetricCard
          icon={Users}
          title="Total Leads"
          value="5,248"
          change={12.3}
          changeLabel="vs last month"
          sparklineData={sparkLeads}
          accentColor="text-blue-600"
          accentBg="bg-blue-50 dark:bg-blue-950/30"
        />
        <MetricCard
          icon={UserPlus}
          title="New This Month"
          value="138"
          change={11.4}
          changeLabel="vs last month"
          sparklineData={sparkNew}
          accentColor="text-emerald-600"
          accentBg="bg-emerald-50 dark:bg-emerald-950/30"
        />
        <MetricCard
          icon={Target}
          title="Avg Score"
          value="64"
          change={4.8}
          changeLabel="vs last month"
          sparklineData={sparkScore}
          accentColor="text-amber-600"
          accentBg="bg-amber-50 dark:bg-amber-950/30"
        />
        <MetricCard
          icon={TrendingUp}
          title="Conversion Rate"
          value="8.6%"
          change={6.2}
          changeLabel="vs last month"
          sparklineData={sparkConversion}
          accentColor="text-teal-600"
          accentBg="bg-teal-50 dark:bg-teal-950/30"
        />
      </motion.div>

      {/* Charts Row 1: Source Distribution + Lead Stage Funnel */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Lead Source Distribution */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <Card className="border-border/50">
            <CardHeader className="pb-2">
              <CardTitle className="text-base font-semibold">Lead Source Distribution</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <ResponsiveContainer width="100%" height={220}>
                <PieChart>
                  <Pie
                    data={sourceDistributionData}
                    cx="50%"
                    cy="50%"
                    innerRadius={55}
                    outerRadius={85}
                    paddingAngle={3}
                    dataKey="count"
                    nameKey="source"
                    animationDuration={800}
                  >
                    {sourceDistributionData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{ backgroundColor: 'hsl(var(--popover))', border: '1px solid hsl(var(--border))', borderRadius: '8px', fontSize: '12px' }}
                    formatter={(value: number) => [value.toLocaleString(), 'Leads']}
                  />
                </PieChart>
              </ResponsiveContainer>
              <div className="grid grid-cols-2 gap-2 mt-3">
                {sourceDistributionData.map((item) => (
                  <div key={item.source} className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: item.color }} />
                    <span className="text-xs text-muted-foreground">{item.source}</span>
                    <span className="text-xs font-medium text-foreground ml-auto tabular-nums">{item.count.toLocaleString()}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Lead Stage Funnel */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.15 }}
        >
          <Card className="border-border/50">
            <CardHeader className="pb-2">
              <CardTitle className="text-base font-semibold">Lead Stage Funnel</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="space-y-3 py-2">
                {funnelData.map((step, index) => {
                  const percentage = index === 0 ? 100 : Math.round((step.count / funnelData[0].count) * 100);
                  const conversionFromPrev = index > 0
                    ? Math.round((step.count / funnelData[index - 1].count) * 100)
                    : 100;

                  return (
                    <div key={step.stage} className="space-y-1">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <LeadStageBadge stage={step.stage as LeadStage} />
                          <span className="text-sm font-medium text-foreground tabular-nums">
                            {step.count.toLocaleString()}
                          </span>
                        </div>
                        {index > 0 && (
                          <span className="text-xs text-muted-foreground">
                            {conversionFromPrev}% from prev
                          </span>
                        )}
                      </div>
                      <div className="h-2 rounded-full bg-muted overflow-hidden">
                        <div
                          className="h-full rounded-full transition-all duration-700"
                          style={{
                            width: `${percentage}%`,
                            backgroundColor: step.color,
                          }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Lead Generation Trend */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.2 }}
      >
        <Card className="border-border/50">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base font-semibold">Lead Generation Trend</CardTitle>
              <div className="flex items-center gap-4 text-xs text-muted-foreground">
                <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-blue-500" />Total Leads</span>
                <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-amber-500" />MQL</span>
                <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />SQL</span>
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <ResponsiveContainer width="100%" height={260}>
              <LineChart data={leadTrendData} margin={{ top: 8, right: 8, left: -8, bottom: 0 }}>
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }} />
                <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--popover))', border: '1px solid hsl(var(--border))', borderRadius: '8px', fontSize: '12px' }} />
                <Line type="monotone" dataKey="leads" stroke="#3b82f6" strokeWidth={2} dot={false} animationDuration={800} name="Total Leads" />
                <Line type="monotone" dataKey="mql" stroke="#f59e0b" strokeWidth={2} dot={false} animationDuration={800} name="MQL" />
                <Line type="monotone" dataKey="sql" stroke="#10b981" strokeWidth={2} dot={false} animationDuration={800} name="SQL" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </motion.div>

      {/* Top Lead Sources Table */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.25 }}
      >
        <Card className="border-border/50">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base font-semibold">Top Lead Sources</CardTitle>
              <Button variant="ghost" size="sm" className="text-xs">View All</Button>
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="space-y-3">
              {topLeadSources.map((source, index) => {
                const config = LEAD_SOURCE_CONFIG[source.source];
                const Icon = SOURCE_ICONS[source.source] ?? MoreHorizontal;
                return (
                  <div key={source.source} className="flex items-center gap-4">
                    <span className="text-sm font-medium text-muted-foreground w-6 text-right">{index + 1}</span>
                    <div className={cn('flex items-center justify-center w-8 h-8 rounded-lg shrink-0', 'bg-primary/10')}>
                      <Icon className="h-4 w-4 text-primary" strokeWidth={1.8} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-medium text-foreground">{config?.label ?? source.source}</span>
                        <div className="flex items-center gap-4">
                          <span className="text-xs text-muted-foreground">
                            {source.leads.toLocaleString()} leads
                          </span>
                          <span className="text-xs font-medium text-emerald-600 tabular-nums">
                            {source.conversionRate}% conv
                          </span>
                          <span className="text-xs text-muted-foreground tabular-nums">
                            Score: {source.avgScore}
                          </span>
                        </div>
                      </div>
                      <Progress value={(source.leads / topLeadSources[0].leads) * 100} className="h-1.5" />
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
