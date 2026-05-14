// @ts-nocheck
'use client';

import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { LeadScoreBadge } from '../shared/lead-score-badge';
import { LeadStageBadge } from '../shared/lead-stage-badge';
import { LeadStageFlow } from './lead-stage-flow';
import { LeadScoreDisplay } from './lead-score-display';
import { LeadTimeline } from './lead-timeline';
import { useLead } from '@/modules/marketing/hooks/use-leads';
import { LEAD_SOURCE_CONFIG } from '@/modules/marketing/constants/lead-constants';
import type { Lead } from '@/modules/marketing/types';
import {
  Mail,
  Phone,
  Building2,
  Calendar,
  User,
  ArrowRight,
  MoreHorizontal,
} from 'lucide-react';
import { motion } from 'framer-motion';

interface LeadDetailsProps {
  leadId: string;
  lead?: Lead;
  onConvert?: (lead: Lead) => void;
  onEdit?: (lead: Lead) => void;
  onDelete?: (lead: Lead) => void;
  className?: string;
}

export function LeadDetails({ leadId, lead: externalLead, onConvert, onEdit, onDelete, className }: LeadDetailsProps) {
  const { data: leadData, isLoading } = useLead(leadId);
  const lead = externalLead ?? leadData?.data;

  if (isLoading) {
    return (
      <div className="space-y-4 animate-pulse">
        <div className="h-48 bg-muted rounded-xl" />
        <div className="h-96 bg-muted rounded-xl" />
      </div>
    );
  }

  if (!lead) {
    return (
      <div className="flex items-center justify-center h-64 text-muted-foreground">
        Lead not found
      </div>
    );
  }

  const initials = `${lead.firstName[0]}${lead.lastName[0]}`;
  const sourceConfig = LEAD_SOURCE_CONFIG[lead.source];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className={cn('flex flex-col lg:flex-row gap-6', className)}
    >
      {/* Sidebar */}
      <div className="w-full lg:w-80 shrink-0 space-y-4">
        {/* Lead Info Card */}
        <Card className="border-border/50">
          <CardContent className="p-6">
            <div className="flex flex-col items-center text-center">
              <Avatar className="h-16 w-16 mb-3">
                <AvatarFallback className="bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 text-lg font-semibold">
                  {initials}
                </AvatarFallback>
              </Avatar>
              <h2 className="text-lg font-semibold text-foreground">
                {lead.firstName} {lead.lastName}
              </h2>
              {lead.company && (
                <p className="text-sm text-muted-foreground mt-0.5">{lead.company}</p>
              )}
              <div className="flex items-center gap-2 mt-2">
                <LeadStageBadge stage={lead.stage} />
                <LeadScoreBadge score={lead.score.total} />
              </div>
            </div>

            <Separator className="my-4" />

            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm">
                <Mail className="h-4 w-4 text-muted-foreground shrink-0" />
                <span className="text-foreground truncate">{lead.email}</span>
              </div>
              {lead.phone && (
                <div className="flex items-center gap-2 text-sm">
                  <Phone className="h-4 w-4 text-muted-foreground shrink-0" />
                  <span className="text-foreground">{lead.phone}</span>
                </div>
              )}
              <div className="flex items-center gap-2 text-sm">
                <Building2 className="h-4 w-4 text-muted-foreground shrink-0" />
                <span className="text-foreground">{sourceConfig?.label ?? lead.source}</span>
              </div>
              {lead.assignedTo && (
                <div className="flex items-center gap-2 text-sm">
                  <User className="h-4 w-4 text-muted-foreground shrink-0" />
                  <span className="text-foreground">{lead.assignedTo}</span>
                </div>
              )}
              <div className="flex items-center gap-2 text-sm">
                <Calendar className="h-4 w-4 text-muted-foreground shrink-0" />
                <span className="text-muted-foreground">
                  Created {new Date(lead.createdAt).toLocaleDateString()}
                </span>
              </div>
            </div>

            {lead.tags.length > 0 && (
              <>
                <Separator className="my-4" />
                <div className="flex flex-wrap gap-1.5">
                  {lead.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </>
            )}

            <Separator className="my-4" />

            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                className="flex-1"
                onClick={() => onConvert?.(lead)}
              >
                <ArrowRight className="h-3.5 w-3.5 mr-1" />
                Convert
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => onEdit?.(lead)}
              >
                Edit
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Score Display */}
        <LeadScoreDisplay score={lead.score} />

        {/* Stage Flow */}
        <LeadStageFlow currentStage={lead.stage} />
      </div>

      {/* Main Content */}
      <div className="flex-1 min-w-0">
        <Tabs defaultValue="timeline" className="space-y-4">
          <TabsList>
            <TabsTrigger value="timeline">Activity</TabsTrigger>
            <TabsTrigger value="notes">Notes</TabsTrigger>
            <TabsTrigger value="campaigns">Campaigns</TabsTrigger>
          </TabsList>

          <TabsContent value="timeline" className="mt-0">
            <LeadTimeline activities={lead.activities} leadId={lead.id} />
          </TabsContent>

          <TabsContent value="notes" className="mt-0">
            <Card className="border-border/50">
              <CardHeader>
                <CardTitle className="text-sm">Notes</CardTitle>
              </CardHeader>
              <CardContent>
                {lead.notes ? (
                  <p className="text-sm text-foreground whitespace-pre-wrap">{lead.notes}</p>
                ) : (
                  <p className="text-sm text-muted-foreground">No notes yet.</p>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="campaigns" className="mt-0">
            <Card className="border-border/50">
              <CardHeader>
                <CardTitle className="text-sm">Associated Campaigns</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  No campaigns associated with this lead yet.
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </motion.div>
  );
}
