'use client';

import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CampaignStatusBadge } from '../shared/campaign-status-badge';
import { ChannelIcon } from '../shared/channel-icon';
import { MetricCard } from '../shared/metric-card';
import { useCampaign, useCampaignAnalytics } from '@/modules/marketing/hooks';
import type { Campaign } from '@/modules/marketing/types';
import {
  Send,
  Mail,
  Eye,
  MousePointerClick,
  AlertTriangle,
  Users,
  ArrowLeft,
} from 'lucide-react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from 'recharts';
import { motion } from 'framer-motion';

interface EmailCampaignDetailsProps {
  campaignId: string;
  campaign?: Campaign;
  onBack?: () => void;
  className?: string;
}

export function EmailCampaignDetails({
  campaignId,
  campaign: externalCampaign,
  onBack,
  className,
}: EmailCampaignDetailsProps) {
  const { data: campaignData, isLoading } = useCampaign(campaignId);
  const { data: analyticsData } = useCampaignAnalytics(campaignId);
  const campaign = externalCampaign ?? campaignData?.data;

  if (isLoading || !campaign) {
    return (
      <div className="space-y-4 animate-pulse">
        <div className="h-12 bg-muted rounded-xl" />
        <div className="grid grid-cols-4 gap-3">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-24 bg-muted rounded-xl" />
          ))}
        </div>
      </div>
    );
  }

  const openRate = campaign.metrics.sent > 0
    ? ((campaign.metrics.opened / campaign.metrics.sent) * 100).toFixed(1)
    : '0';
  const clickRate = campaign.metrics.opened > 0
    ? ((campaign.metrics.clicked / campaign.metrics.opened) * 100).toFixed(1)
    : '0';
  const bounceRate = campaign.metrics.sent > 0
    ? ((campaign.metrics.bounced / campaign.metrics.sent) * 100).toFixed(1)
    : '0';

  // Mock chart data
  const chartData = Array.from({ length: 7 }, (_, i) => ({
    day: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][i],
    opens: Math.floor(Math.random() * 200) + 50,
    clicks: Math.floor(Math.random() * 80) + 10,
  }));

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={cn('space-y-4', className)}
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {onBack && (
            <Button variant="ghost" size="icon" onClick={onBack} className="h-8 w-8">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          )}
          <ChannelIcon channel={campaign.channel} size="lg" />
          <div>
            <h2 className="text-lg font-semibold text-foreground">{campaign.name}</h2>
            <p className="text-sm text-muted-foreground">{campaign.subject ?? 'No subject'}</p>
          </div>
        </div>
        <CampaignStatusBadge status={campaign.status} />
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
        <MetricCard
          icon={Send}
          title="Sent"
          value={campaign.metrics.sent.toLocaleString()}
          accentColor="text-blue-600"
          accentBg="bg-blue-50 dark:bg-blue-950/30"
        />
        <MetricCard
          icon={Mail}
          title="Delivered"
          value={campaign.metrics.delivered.toLocaleString()}
          accentColor="text-emerald-600"
          accentBg="bg-emerald-50 dark:bg-emerald-950/30"
        />
        <MetricCard
          icon={Eye}
          title="Opened"
          value={`${openRate}%`}
          accentColor="text-purple-600"
          accentBg="bg-purple-50 dark:bg-purple-950/30"
        />
        <MetricCard
          icon={MousePointerClick}
          title="Clicked"
          value={`${clickRate}%`}
          accentColor="text-amber-600"
          accentBg="bg-amber-50 dark:bg-amber-950/30"
        />
        <MetricCard
          icon={AlertTriangle}
          title="Bounced"
          value={`${bounceRate}%`}
          accentColor="text-red-600"
          accentBg="bg-red-50 dark:bg-red-950/30"
        />
      </div>

      <Tabs defaultValue="charts">
        <TabsList>
          <TabsTrigger value="charts" className="text-xs">Charts</TabsTrigger>
          <TabsTrigger value="recipients" className="text-xs">Recipients</TabsTrigger>
        </TabsList>

        <TabsContent value="charts" className="mt-4">
          <Card className="border-border/50">
            <CardHeader>
              <CardTitle className="text-sm">Open & Click Rate Over Time</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={chartData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
                    <defs>
                      <linearGradient id="openGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#3b82f6" stopOpacity={0.2} />
                        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                      </linearGradient>
                      <linearGradient id="clickGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#f59e0b" stopOpacity={0.2} />
                        <stop offset="95%" stopColor="#f59e0b" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                    <XAxis dataKey="day" tick={{ fontSize: 12 }} className="text-muted-foreground" />
                    <YAxis tick={{ fontSize: 12 }} className="text-muted-foreground" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: 'hsl(var(--card))',
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '8px',
                        fontSize: '12px',
                      }}
                    />
                    <Area type="monotone" dataKey="opens" stroke="#3b82f6" fill="url(#openGrad)" strokeWidth={2} />
                    <Area type="monotone" dataKey="clicks" stroke="#f59e0b" fill="url(#clickGrad)" strokeWidth={2} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="recipients" className="mt-4">
          <Card className="border-border/50">
            <CardHeader>
              <CardTitle className="text-sm flex items-center gap-2">
                <Users className="h-4 w-4 text-muted-foreground" />
                Recipients ({campaign.metrics.sent.toLocaleString()})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">Recipient list will be displayed here.</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </motion.div>
  );
}
