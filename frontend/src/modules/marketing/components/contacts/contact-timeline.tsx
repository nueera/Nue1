// @ts-nocheck
'use client';

import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useContactTimeline } from '@/modules/marketing/hooks/use-contacts';
import type { ContactTimeline as ContactTimelineType } from '@/modules/marketing/types';
import {
  Mail,
  MousePointerClick,
  Eye,
  MessageSquare,
  FileText,
  ShoppingCart,
  HeadphonesIcon,
  Calendar,
} from 'lucide-react';
import { motion } from 'framer-motion';

const ACTIVITY_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  email_sent: Mail,
  email_opened: Mail,
  email_clicked: MousePointerClick,
  sms_sent: MessageSquare,
  form_submitted: FileText,
  page_visited: Eye,
  purchase: ShoppingCart,
  support_ticket: HeadphonesIcon,
  meeting_booked: Calendar,
};

const ACTIVITY_COLORS: Record<string, string> = {
  email_sent: 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400',
  email_opened: 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400',
  email_clicked: 'bg-cyan-100 text-cyan-600 dark:bg-cyan-900/30 dark:text-cyan-400',
  sms_sent: 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400',
  form_submitted: 'bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400',
  page_visited: 'bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400',
  purchase: 'bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400',
  support_ticket: 'bg-rose-100 text-rose-600 dark:bg-rose-900/30 dark:text-rose-400',
  meeting_booked: 'bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400',
};

const TYPE_LABELS: Record<string, string> = {
  email_sent: 'Email Sent',
  email_opened: 'Email Opened',
  email_clicked: 'Link Clicked',
  sms_sent: 'SMS Sent',
  form_submitted: 'Form Submitted',
  page_visited: 'Page Visited',
  purchase: 'Purchase',
  support_ticket: 'Support Ticket',
  meeting_booked: 'Meeting Booked',
};

interface ContactTimelineProps {
  timeline?: ContactTimelineType[];
  contactId?: string;
  className?: string;
}

export function ContactTimeline({
  timeline: externalTimeline,
  contactId,
  className,
}: ContactTimelineProps) {
  const { data: timelineData, isLoading } = useContactTimeline(contactId ?? '');
  const timeline = externalTimeline ?? timelineData?.data ?? [];

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

  if (timeline.length === 0) {
    return (
      <Card className={cn('border-border/50', className)}>
        <CardContent className="p-6">
          <p className="text-sm text-muted-foreground text-center py-8">
            No activity recorded yet.
          </p>
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
          <div className="absolute left-4 top-0 bottom-0 w-px bg-border" />

          <div className="space-y-5">
            {timeline.map((item, index) => {
              const Icon = ACTIVITY_ICONS[item.type] ?? Mail;
              const colorClass = ACTIVITY_COLORS[item.type] ?? ACTIVITY_COLORS.email_sent;
              const label = TYPE_LABELS[item.type] ?? item.type;
              const timestamp = new Date(item.timestamp);

              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.2, delay: index * 0.05 }}
                  className="relative flex gap-3"
                >
                  <div
                    className={cn(
                      'flex items-center justify-center h-8 w-8 rounded-full shrink-0 z-10 bg-background',
                      colorClass
                    )}
                  >
                    <Icon className="h-4 w-4" />
                  </div>

                  <div className="flex-1 min-w-0 pt-0.5">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <p className="text-sm font-medium text-foreground">{label}</p>
                        <p className="text-xs text-muted-foreground mt-0.5">
                          {item.description}
                        </p>
                      </div>
                      <span className="text-xs text-muted-foreground whitespace-nowrap shrink-0">
                        {timestamp.toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </span>
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
