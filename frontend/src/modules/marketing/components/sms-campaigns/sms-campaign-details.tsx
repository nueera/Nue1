'use client';

import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CampaignStatusBadge } from '../shared/campaign-status-badge';
import { MetricCard } from '../shared/metric-card';
import { useCampaign } from '@/modules/marketing/hooks';
import type { Campaign } from '@/modules/marketing/types';
import { Send, CheckCheck, MousePointerClick, AlertTriangle, ArrowLeft, MessageSquare } from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from 'recharts';
import { motion } from 'framer-motion';

interface SmsCampaignDetailsProps {
  campaignId: string;
  campaign?: Campaign;
  onBack?: () => void;
  className?: string;
}

export function SmsCampaignDetails({
  campaignId,
  campaign: externalCampaign,
  onBack,
  className,
}: SmsCampaignDetailsProps) {
  const { data: campaignData, isLoading } = useCampaign(campaignId);
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

  const deliveryRate = campaign.metrics.sent > 0
    ? ((campaign.metrics.delivered / campaign.metrics.sent) * 100).toFixed(1)
    : '0';
  const clickRate = campaign.metrics.delivered > 0
    ? ((campaign.metrics.clicked / campaign.metrics.delivered) * 100).toFixed(1)
    : '0';

  const chartData = Array.from({ length: 7 }, (_, i) => ({
    day: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][i],
    delivered: Math.floor(Math.random() * 500) + 200,
    clicked: Math.floor(Math.random() * 60) + 10,
  }));

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className={cn('space-y-4', className)}>
      {/* Header */}
      <div className="flex items-center gap-3">
        {onBack && (
          <Button variant="ghost" size="icon" onClick={onBack} className="h-8 w-8">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        )}
        <MessageSquare className="h-5 w-5 text-green-600" />
        <div>
          <h2 className="text-lg font-semibold text-foreground">{campaign.name}</h2>
          <p className="text-sm text-muted-foreground">SMS Campaign</p>
        </div>
        <div className="ml-auto">
          <CampaignStatusBadge status={campaign.status} />
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <MetricCard
          icon={Send}
          title="Sent"
          value={campaign.metrics.sent.toLocaleString()}
          accentColor="text-green-600"
          accentBg="bg-green-50 dark:bg-green-950/30"
        />
        <MetricCard
          icon={CheckCheck}
          title="Delivered"
          value={`${deliveryRate}%`}
          accentColor="text-emerald-600"
          accentBg="bg-emerald-50 dark:bg-emerald-950/30"
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
          value={campaign.metrics.bounced.toLocaleString()}
          accentColor="text-red-600"
          accentBg="bg-red-50 dark:bg-red-950/30"
        />
      </div>

      {/* Delivery Chart */}
      <Card className="border-border/50">
        <CardHeader>
          <CardTitle className="text-sm">Delivery Stats Over Time</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                <XAxis dataKey="day" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px',
                    fontSize: '12px',
                  }}
                />
                <Bar dataKey="delivered" fill="#10b981" radius={[4, 4, 0, 0]} />
                <Bar dataKey="clicked" fill="#f59e0b" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
