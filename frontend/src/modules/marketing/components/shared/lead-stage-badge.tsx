// @ts-nocheck
'use client';

import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import type { LeadStage } from '@/modules/marketing/types';
import { LEAD_STAGE_CONFIG } from '@/modules/marketing/constants/lead-constants';

export interface LeadStageBadgeProps {
  stage: LeadStage;
  className?: string;
}

const STAGE_STYLES: Record<string, string> = {
  blue: 'bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-800',
  cyan: 'bg-cyan-100 text-cyan-700 border-cyan-200 dark:bg-cyan-900/30 dark:text-cyan-300 dark:border-cyan-800',
  green: 'bg-green-100 text-green-700 border-green-200 dark:bg-green-900/30 dark:text-green-300 dark:border-green-800',
  amber: 'bg-amber-100 text-amber-700 border-amber-200 dark:bg-amber-900/30 dark:text-amber-300 dark:border-amber-800',
  orange: 'bg-orange-100 text-orange-700 border-orange-200 dark:bg-orange-900/30 dark:text-orange-300 dark:border-orange-800',
  emerald: 'bg-emerald-100 text-emerald-700 border-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-300 dark:border-emerald-800',
  red: 'bg-red-100 text-red-700 border-red-200 dark:bg-red-900/30 dark:text-red-300 dark:border-red-800',
  slate: 'bg-slate-100 text-slate-600 border-slate-200 dark:bg-slate-800/50 dark:text-slate-400 dark:border-slate-600',
};

export function LeadStageBadge({ stage, className }: LeadStageBadgeProps) {
  const config = LEAD_STAGE_CONFIG[stage];
  const style = STAGE_STYLES[config.color] ?? STAGE_STYLES.slate;

  return (
    <Badge variant="outline" className={cn('font-medium', style, className)}>
      {config.label}
    </Badge>
  );
}
