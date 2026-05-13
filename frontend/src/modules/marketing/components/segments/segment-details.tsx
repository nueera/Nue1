'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MetricCard } from '@/modules/marketing/components/shared/metric-card';
import { useSegment } from '@/modules/marketing/hooks/use-segments';
import { SegmentBuilder } from './segment-builder';
import type { Segment } from '@/modules/marketing/types';
import {
  Filter,
  Users,
  Pencil,
  ArrowLeft,
  Clock,
} from 'lucide-react';
import { motion } from 'framer-motion';

interface SegmentDetailsProps {
  segmentId: string;
  data?: Segment;
  onBack?: () => void;
  onEdit?: () => void;
}

export function SegmentDetails({ segmentId, data: externalData, onBack, onEdit }: SegmentDetailsProps) {
  const { data: segmentData } = useSegment(segmentId);
  const segment = externalData ?? segmentData?.data;

  if (!segment) {
    return (
      <div className="text-center py-12 text-muted-foreground">
        <Filter className="h-10 w-10 mx-auto mb-3 opacity-20" />
        <p className="text-sm">Segment not found</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -4 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
        className="flex flex-col sm:flex-row sm:items-center justify-between gap-3"
      >
        <div className="flex items-center gap-3">
          {onBack && (
            <Button variant="ghost" size="icon" className="h-8 w-8" onClick={onBack}>
              <ArrowLeft className="h-4 w-4" />
            </Button>
          )}
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-bold text-foreground">{segment.name}</h2>
              {segment.isDynamic && (
                <Badge variant="secondary" className="text-[10px] bg-blue-50 text-blue-700 dark:bg-blue-950/30 dark:text-blue-400">
                  Dynamic
                </Badge>
              )}
            </div>
            {segment.description && (
              <p className="text-sm text-muted-foreground">{segment.description}</p>
            )}
          </div>
        </div>
        {onEdit && (
          <Button variant="outline" size="sm" onClick={onEdit}>
            <Pencil className="h-4 w-4 mr-1" />Edit
          </Button>
        )}
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        <MetricCard icon={Users} title="Members" value={segment.memberCount.toLocaleString()} accentColor="text-emerald-600" accentBg="bg-emerald-50 dark:bg-emerald-950/30" />
        <MetricCard icon={Filter} title="Rules" value={segment.rules.length.toString()} accentColor="text-violet-600" accentBg="bg-violet-50 dark:bg-violet-950/30" />
        <MetricCard icon={Clock} title="Last Evaluated" value={segment.lastEvaluatedAt ? new Date(segment.lastEvaluatedAt).toLocaleDateString() : 'Never'} accentColor="text-amber-600" accentBg="bg-amber-50 dark:bg-amber-950/30" />
      </div>

      {/* Rules Summary */}
      <Card className="border-border/50">
        <CardHeader className="pb-2 pt-4 px-4">
          <CardTitle className="text-sm">Segment Rules</CardTitle>
        </CardHeader>
        <CardContent className="px-4 pb-4 space-y-3">
          {segment.rules.map((rule, rIndex) => (
            <div key={rule.id} className="border-l-4 border-l-violet-400 pl-3">
              <p className="text-xs font-semibold text-violet-600 mb-1">{rule.name}</p>
              <div className="space-y-1">
                {rule.conditions.map((cond, cIndex) => (
                  <p key={cond.id} className="text-xs text-muted-foreground">
                    {cIndex > 0 && <span className="font-semibold text-foreground mr-1">{cond.logicalOperator.toUpperCase()}</span>}
                    <span className="font-medium text-foreground">{cond.field}</span>{' '}
                    <span className="italic">{cond.operator.replace('_', ' ')}</span>{' '}
                    <span className="font-medium text-foreground">{String(cond.value)}</span>
                  </p>
                ))}
              </div>
            </div>
          ))}
          {segment.rules.length > 1 && (
            <p className="text-xs text-muted-foreground italic">Groups combined with OR logic</p>
          )}
        </CardContent>
      </Card>

      {/* Tags */}
      {segment.tags.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {segment.tags.map((tag) => (
            <Badge key={tag} variant="secondary" className="text-xs">{tag}</Badge>
          ))}
        </div>
      )}
    </div>
  );
}
