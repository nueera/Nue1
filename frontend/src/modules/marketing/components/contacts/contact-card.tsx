'use client';

import { cn } from '@/lib/utils';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import type { MarketingContact } from '@/modules/marketing/types';
import { Clock, Building2, Activity } from 'lucide-react';
import { motion } from 'framer-motion';

interface ContactCardProps {
  contact: MarketingContact;
  onClick?: (contact: MarketingContact) => void;
  className?: string;
}

function getEngagementLevel(contact: MarketingContact): {
  label: string;
  score: number;
  color: string;
  bgColor: string;
  textColor: string;
} {
  if (contact.unsubscribedAt) {
    return { label: 'Unsubscribed', score: 0, color: 'bg-red-500', bgColor: 'bg-red-50 dark:bg-red-900/20', textColor: 'text-red-600 dark:text-red-400' };
  }
  if (contact.bounceCount > 3) {
    return { label: 'Bouncing', score: 10, color: 'bg-red-400', bgColor: 'bg-red-50 dark:bg-red-900/20', textColor: 'text-red-500 dark:text-red-400' };
  }

  if (!contact.lastEngagedAt) {
    return { label: 'No Activity', score: 15, color: 'bg-slate-400', bgColor: 'bg-slate-50 dark:bg-slate-800/30', textColor: 'text-slate-500 dark:text-slate-400' };
  }

  const daysSinceEngagement = Math.floor(
    (Date.now() - new Date(contact.lastEngagedAt).getTime()) / (1000 * 60 * 60 * 24)
  );

  if (daysSinceEngagement <= 7) {
    return { label: 'Highly Engaged', score: 95, color: 'bg-emerald-500', bgColor: 'bg-emerald-50 dark:bg-emerald-900/20', textColor: 'text-emerald-600 dark:text-emerald-400' };
  }
  if (daysSinceEngagement <= 30) {
    return { label: 'Engaged', score: 70, color: 'bg-emerald-400', bgColor: 'bg-emerald-50 dark:bg-emerald-900/20', textColor: 'text-emerald-600 dark:text-emerald-400' };
  }
  if (daysSinceEngagement <= 90) {
    return { label: 'Moderate', score: 45, color: 'bg-amber-400', bgColor: 'bg-amber-50 dark:bg-amber-900/20', textColor: 'text-amber-600 dark:text-amber-400' };
  }
  return { label: 'Low', score: 20, color: 'bg-slate-400', bgColor: 'bg-slate-50 dark:bg-slate-800/30', textColor: 'text-slate-500 dark:text-slate-400' };
}

export function ContactCard({ contact, onClick, className }: ContactCardProps) {
  const initials = `${contact.firstName[0]}${contact.lastName[0]}`;
  const engagement = getEngagementLevel(contact);

  const lastEngagedDate = contact.lastEngagedAt
    ? new Date(contact.lastEngagedAt).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
      })
    : 'No engagement';

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
        onClick={() => onClick?.(contact)}
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
                  {contact.firstName} {contact.lastName}
                </p>
              </div>
              {contact.company && (
                <div className="flex items-center gap-1 mt-0.5">
                  <Building2 className="h-3 w-3 text-muted-foreground" />
                  <p className="text-xs text-muted-foreground truncate">{contact.company}</p>
                </div>
              )}
              {contact.jobTitle && (
                <p className="text-xs text-muted-foreground mt-0.5">{contact.jobTitle}</p>
              )}

              {/* Engagement Score */}
              <div className={cn('flex items-center gap-2 mt-2 px-2 py-1.5 rounded-md', engagement.bgColor)}>
                <Activity className={cn('h-3.5 w-3.5 shrink-0', engagement.textColor)} />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-1">
                    <span className={cn('text-[11px] font-medium', engagement.textColor)}>
                      {engagement.label}
                    </span>
                    <span className={cn('text-[10px] font-semibold', engagement.textColor)}>
                      {engagement.score}
                    </span>
                  </div>
                  <div className="h-1 rounded-full bg-muted/30 mt-1 overflow-hidden">
                    <motion.div
                      className={cn('h-full rounded-full', engagement.color)}
                      initial={{ width: 0 }}
                      animate={{ width: `${engagement.score}%` }}
                      transition={{ duration: 0.6, ease: 'easeOut' }}
                    />
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-1 mt-2">
                <Clock className="h-3 w-3 text-muted-foreground" />
                <span className="text-xs text-muted-foreground">{lastEngagedDate}</span>
              </div>
              {contact.tags.length > 0 && (
                <div className="flex flex-wrap gap-1 mt-2">
                  {contact.tags.slice(0, 3).map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-[10px] px-1.5 py-0">
                      {tag}
                    </Badge>
                  ))}
                  {contact.tags.length > 3 && (
                    <Badge variant="outline" className="text-[10px] px-1.5 py-0">
                      +{contact.tags.length - 3}
                    </Badge>
                  )}
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
