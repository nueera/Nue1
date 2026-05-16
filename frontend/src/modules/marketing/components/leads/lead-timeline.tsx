'use client';

import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useLeadTimeline } from '@/modules/marketing/hooks/use-leads';
import { LEAD_ACTIVITY_TYPES } from '@/modules/marketing/constants/lead-constants';
import type { LeadActivity } from '@/modules/marketing/types';
import {
  Mail,
  MousePointerClick,
  Eye,
  FileText,
  Download,
  Calendar,
  Share2,
  Phone,
  Users,
  StickyNote,
} from 'lucide-react';
import { motion } from 'framer-motion';

const ACTIVITY_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  email_open: Mail,
  email_click: MousePointerClick,
  page_visit: Eye,
  form_submit: FileText,
  download: Download,
  event_attend: Calendar,
  social_engage: Share2,
  call: Phone,
  meeting: Users,
  note: StickyNote,
};

const ACTIVITY_COLORS: Record<string, string> = {
  email_open: 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400',
  email_click: 'bg-cyan-100 text-cyan-600 dark:bg-cyan-900/30 dark:text-cyan-400',
  page_visit: 'bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400',
  form_submit: 'bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400',
  download: 'bg-teal-100 text-teal-600 dark:bg-teal-900/30 dark:text-teal-400',
  event_attend: 'bg-rose-100 text-rose-600 dark:bg-rose-900/30 dark:text-rose-400',
  social_engage: 'bg-pink-100 text-pink-600 dark:bg-pink-900/30 dark:text-pink-400',
  call: 'bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400',
  meeting: 'bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400',
  note: 'bg-slate-100 text-slate-600 dark:bg-slate-900/30 dark:text-slate-400',
};

interface LeadTimelineProps {
  activities?: LeadActivity[];
  leadId?: string;
  className?: string;
}

export function LeadTimeline({ activities: externalActivities, leadId, className }: LeadTimelineProps) {
  const { data: timelineData, isLoading } = useLeadTimeline(leadId ?? '');
  const activities = externalActivities ?? timelineData?.data ?? [];

  if (isLoading) {
    return (
      <Card className="border-border/50">
        <CardContent className="p-6 space-y-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="flex gap-3 animate-pulse">
              <div className="h-8 w-8 rounded-full bg-muted" />
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-muted rounded w-3/4" />
                <div className="h-3 bg-muted rounded w-1/2" />
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    );
  }

  if (activities.length === 0) {
    return (
      <Card className="border-border/50">
        <CardContent className="p-6">
          <p className="text-sm text-muted-foreground text-center py-8">No activity recorded yet.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={cn('border-border/50', className)}>
      <CardHeader className="pb-3">
        <CardTitle className="text-sm">Activity Timeline</CardTitle>
      </CardHeader>
      <CardContent className="px-6 pb-6">
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-4 top-0 bottom-0 w-px bg-border" />

          <div className="space-y-5">
            {activities.map((activity, index) => {
              const Icon = ACTIVITY_ICONS[activity.type] ?? StickyNote;
              const colorClass = ACTIVITY_COLORS[activity.type] ?? ACTIVITY_COLORS.note;
              const config = LEAD_ACTIVITY_TYPES[activity.type];
              const timestamp = new Date(activity.timestamp);

              return (
                <motion.div
                  key={activity.id}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.2, delay: index * 0.05 }}
                  className="relative flex gap-3 pl-0"
                >
                  {/* Icon */}
                  <div
                    className={cn(
                      'flex items-center justify-center h-8 w-8 rounded-full shrink-0 z-10 bg-background',
                      colorClass
                    )}
                  >
                    <Icon className="h-4 w-4" />
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0 pt-0.5">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <p className="text-sm font-medium text-foreground">
                          {config?.label ?? activity.description}
                        </p>
                        {config?.label !== activity.description && (
                          <p className="text-xs text-muted-foreground mt-0.5">
                            {activity.description}
                          </p>
                        )}
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        {config?.points > 0 && (
                          <Badge variant="outline" className="text-[10px] px-1.5 py-0">
                            +{config.points} pts
                          </Badge>
                        )}
                        <span className="text-xs text-muted-foreground whitespace-nowrap">
                          {timestamp.toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
