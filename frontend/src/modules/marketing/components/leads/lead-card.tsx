// @ts-nocheck
'use client';

import { cn } from '@/lib/utils';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { LeadScoreBadge } from '../shared/lead-score-badge';
import { LeadStageBadge } from '../shared/lead-stage-badge';
import { ChannelIcon } from '../shared/channel-icon';
import { LEAD_SOURCE_CONFIG } from '@/modules/marketing/constants/lead-constants';
import type { Lead, LeadSource } from '@/modules/marketing/types';
import { motion } from 'framer-motion';
import { Clock } from 'lucide-react';

interface LeadCardProps {
  lead: Lead;
  onClick?: (lead: Lead) => void;
  className?: string;
}

export function LeadCard({ lead, onClick, className }: LeadCardProps) {
  const sourceConfig = LEAD_SOURCE_CONFIG[lead.source as LeadSource];
  const initials = `${lead.firstName[0]}${lead.lastName[0]}`;

  const lastActivityDate = lead.lastContactedAt
    ? new Date(lead.lastContactedAt).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
      })
    : 'No activity';

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
    >
      <Card
        className={cn(
          'hover:shadow-md transition-all duration-200 cursor-pointer border-border/50',
          className
        )}
        onClick={() => onClick?.(lead)}
      >
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <Avatar className="h-10 w-10 shrink-0">
              <AvatarFallback className="bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 text-sm font-semibold">
                {initials}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-2">
                <p className="font-medium text-foreground text-sm truncate">
                  {lead.firstName} {lead.lastName}
                </p>
                <LeadScoreBadge score={lead.score.total} />
              </div>
              {lead.company && (
                <p className="text-xs text-muted-foreground mt-0.5 truncate">{lead.company}</p>
              )}
              <div className="flex items-center gap-2 mt-2">
                <LeadStageBadge stage={lead.stage} />
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <ChannelIcon
                    channel={
                      lead.source === 'social_media'
                        ? 'facebook'
                        : lead.source === 'email'
                          ? 'email'
                          : lead.source === 'phone' || lead.source === 'chat'
                            ? 'sms'
                            : 'web_push'
                    }
                    size="sm"
                  />
                  <span>{sourceConfig?.label ?? lead.source}</span>
                </div>
              </div>
              <div className="flex items-center gap-1 mt-2 text-xs text-muted-foreground">
                <Clock className="h-3 w-3" />
                <span>{lastActivityDate}</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
