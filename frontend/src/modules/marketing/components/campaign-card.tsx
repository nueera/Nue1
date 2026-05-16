'use client';

import { cn } from '@/lib/utils';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowUpRight, ArrowDownRight, Users, Eye, MousePointerClick } from 'lucide-react';
import { CampaignStatusBadge } from './shared/campaign-status-badge';
import { ChannelIcon } from './shared/channel-icon';
import type { Campaign } from '@/modules/marketing/types';
import { getCampaignTypeLabel } from '@/modules/marketing/utils';

export interface CampaignCardProps {
  campaign: Campaign;
  onClick?: (id: string) => void;
  className?: string;
}

export function CampaignCard({ campaign, onClick, className }: CampaignCardProps) {
  const openRate = campaign.metrics.sent > 0
    ? ((campaign.metrics.opened / campaign.metrics.sent) * 100).toFixed(1)
    : '0.0';
  const clickRate = campaign.metrics.sent > 0
    ? ((campaign.metrics.clicked / campaign.metrics.sent) * 100).toFixed(1)
    : '0.0';

  const formatDate = (dateStr?: string) => {
    if (!dateStr) return '—';
    try {
      return new Date(dateStr).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    } catch {
      return dateStr;
    }
  };

  return (
    <Card
      className={cn(
        'hover:shadow-md transition-all duration-200 border-border/50 cursor-pointer group',
        className
      )}
      onClick={() => onClick?.(campaign.id)}
    >
      <CardContent className="p-5">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-start gap-3 min-w-0">
            <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-primary/10 text-primary shrink-0 mt-0.5">
              <ChannelIcon channel={campaign.channel} size="md" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-sm font-semibold text-foreground truncate group-hover:text-primary transition-colors">
                {campaign.name}
              </h3>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-xs text-muted-foreground">
                  {getCampaignTypeLabel(campaign.type)}
                </span>
                <span className="text-xs text-muted-foreground">·</span>
                <span className="text-xs text-muted-foreground">
                  {formatDate(campaign.scheduledAt ?? campaign.createdAt)}
                </span>
              </div>
            </div>
          </div>
          <CampaignStatusBadge status={campaign.status} />
        </div>

        {/* Metrics row */}
        <div className="grid grid-cols-3 gap-3 mt-4 pt-3 border-t border-border/50">
          <div className="flex items-center gap-1.5">
            <Users className="h-3.5 w-3.5 text-muted-foreground" strokeWidth={1.8} />
            <div>
              <p className="text-xs font-medium text-foreground tabular-nums">
                {campaign.metrics.sent.toLocaleString()}
              </p>
              <p className="text-[10px] text-muted-foreground">Sent</p>
            </div>
          </div>
          <div className="flex items-center gap-1.5">
            <Eye className="h-3.5 w-3.5 text-muted-foreground" strokeWidth={1.8} />
            <div>
              <p className="text-xs font-medium text-foreground tabular-nums">{openRate}%</p>
              <p className="text-[10px] text-muted-foreground">Open Rate</p>
            </div>
          </div>
          <div className="flex items-center gap-1.5">
            <MousePointerClick className="h-3.5 w-3.5 text-muted-foreground" strokeWidth={1.8} />
            <div>
              <p className="text-xs font-medium text-foreground tabular-nums">{clickRate}%</p>
              <p className="text-[10px] text-muted-foreground">Click Rate</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
