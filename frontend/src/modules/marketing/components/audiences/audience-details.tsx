'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MetricCard } from '@/modules/marketing/components/shared/metric-card';
import { useAudience } from '@/modules/marketing/hooks/use-audiences';
import type { Audience } from '@/modules/marketing/types';
import { AudienceMembers } from './audience-members';
import { AudienceGrowth } from './audience-growth';
import {
  Users,
  UserPlus,
  UserMinus,
  TrendingUp,
  Pencil,
  ArrowLeft,
} from 'lucide-react';
import { motion } from 'framer-motion';

interface AudienceDetailsProps {
  audienceId: string;
  data?: Audience;
  onBack?: () => void;
  onEdit?: () => void;
}

export function AudienceDetails({ audienceId, data: externalData, onBack, onEdit }: AudienceDetailsProps) {
  const { data: audienceData } = useAudience(audienceId);
  const audience = externalData ?? audienceData?.data;

  if (!audience) {
    return (
      <div className="text-center py-12 text-muted-foreground">
        <Users className="h-10 w-10 mx-auto mb-3 opacity-20" />
        <p className="text-sm">Audience not found</p>
      </div>
    );
  }

  const churnRate = audience.memberCount > 0
    ? Math.round(((audience.memberCount - audience.activeCount) / audience.memberCount) * 100)
    : 0;

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
            <h2 className="text-xl font-bold text-foreground">{audience.name}</h2>
            {audience.description && (
              <p className="text-sm text-muted-foreground">{audience.description}</p>
            )}
          </div>
        </div>
        {onEdit && (
          <Button variant="outline" size="sm" onClick={onEdit}>
            <Pencil className="h-4 w-4 mr-1" />Edit
          </Button>
        )}
      </motion.div>

      {/* Tags */}
      {audience.tags.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {audience.tags.map((tag) => (
            <Badge key={tag} variant="secondary" className="text-xs">{tag}</Badge>
          ))}
        </div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <MetricCard icon={Users} title="Total Members" value={audience.memberCount.toLocaleString()} accentColor="text-violet-600" accentBg="bg-violet-50 dark:bg-violet-950/30" />
        <MetricCard icon={UserPlus} title="Active" value={audience.activeCount.toLocaleString()} accentColor="text-emerald-600" accentBg="bg-emerald-50 dark:bg-emerald-950/30" />
        <MetricCard icon={UserMinus} title="Churn Rate" value={`${churnRate}%`} accentColor="text-red-600" accentBg="bg-red-50 dark:bg-red-950/30" />
        <MetricCard icon={TrendingUp} title="Growth" value="+8%" accentColor="text-amber-600" accentBg="bg-amber-50 dark:bg-amber-950/30" />
      </div>

      {/* Tabs */}
      <Tabs defaultValue="members">
        <TabsList className="h-9">
          <TabsTrigger value="members" className="text-xs">Members</TabsTrigger>
          <TabsTrigger value="growth" className="text-xs">Growth</TabsTrigger>
        </TabsList>
        <TabsContent value="members" className="mt-4">
          <AudienceMembers audienceId={audience.id} />
        </TabsContent>
        <TabsContent value="growth" className="mt-4">
          <AudienceGrowth growth={audience.growth} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
