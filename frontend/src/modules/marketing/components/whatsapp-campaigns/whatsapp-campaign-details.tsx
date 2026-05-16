'use client';

import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CampaignStatusBadge } from '../shared/campaign-status-badge';
import { MetricCard } from '../shared/metric-card';
import { useCampaign } from '@/modules/marketing/hooks/use-campaigns';
import type { Campaign } from '@/modules/marketing/types';
import { Send, CheckCheck, MessageCircle, Phone, ArrowLeft } from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { motion } from 'framer-motion';

interface WhatsappCampaignDetailsProps {
  campaignId: string;
  campaign?: Campaign;
  onBack?: () => void;
  className?: string;
}

export function WhatsappCampaignDetails({ campaignId, campaign: externalCampaign, onBack, className }: WhatsappCampaignDetailsProps) {
  const { data: campaignData, isLoading } = useCampaign(campaignId);
  const campaign = externalCampaign ?? campaignData?.data;

  if (isLoading || !campaign) return <div className="space-y-4 animate-pulse"><div className="h-48 bg-muted rounded-xl" /></div>;

  const readRate = campaign.metrics.sent > 0 ? ((campaign.metrics.opened / campaign.metrics.sent) * 100).toFixed(1) : '0';
  const replyRate = campaign.metrics.delivered > 0 ? ((campaign.metrics.clicked / campaign.metrics.delivered) * 100).toFixed(1) : '0';

  const chartData = Array.from({ length: 7 }, (_, i) => ({
    day: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][i],
    read: Math.floor(Math.random() * 300) + 100,
    replies: Math.floor(Math.random() * 40) + 5,
  }));

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className={cn('space-y-4', className)}>
      <div className="flex items-center gap-3">
        {onBack && <Button variant="ghost" size="icon" onClick={onBack} className="h-8 w-8"><ArrowLeft className="h-4 w-4" /></Button>}
        <Phone className="h-5 w-5 text-emerald-600" />
        <div>
          <h2 className="text-lg font-semibold text-foreground">{campaign.name}</h2>
          <p className="text-sm text-muted-foreground">WhatsApp Campaign</p>
        </div>
        <div className="ml-auto"><CampaignStatusBadge status={campaign.status} /></div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <MetricCard icon={Send} title="Sent" value={campaign.metrics.sent.toLocaleString()} accentColor="text-emerald-600" accentBg="bg-emerald-50 dark:bg-emerald-950/30" />
        <MetricCard icon={CheckCheck} title="Delivered" value={campaign.metrics.delivered.toLocaleString()} accentColor="text-green-600" accentBg="bg-green-50 dark:bg-green-950/30" />
        <MetricCard icon={MessageCircle} title="Read Rate" value={`${readRate}%`} accentColor="text-blue-600" accentBg="bg-blue-50 dark:bg-blue-950/30" />
        <MetricCard icon={Phone} title="Reply Rate" value={`${replyRate}%`} accentColor="text-amber-600" accentBg="bg-amber-50 dark:bg-amber-950/30" />
      </div>

      <Card className="border-border/50">
        <CardHeader><CardTitle className="text-sm">Read & Reply Over Time</CardTitle></CardHeader>
        <CardContent>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
                <defs>
                  <linearGradient id="waRead" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#10b981" stopOpacity={0.2} /><stop offset="95%" stopColor="#10b981" stopOpacity={0} /></linearGradient>
                  <linearGradient id="waReply" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#f59e0b" stopOpacity={0.2} /><stop offset="95%" stopColor="#f59e0b" stopOpacity={0} /></linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                <XAxis dataKey="day" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: '8px', fontSize: '12px' }} />
                <Area type="monotone" dataKey="read" stroke="#10b981" fill="url(#waRead)" strokeWidth={2} />
                <Area type="monotone" dataKey="replies" stroke="#f59e0b" fill="url(#waReply)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
