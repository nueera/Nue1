'use client';

import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { getScoreCategory, getScoreCategoryLabel } from '@/modules/marketing/utils';

export interface LeadScoreBadgeProps {
  score: number;
  className?: string;
}

const SCORE_STYLES: Record<string, string> = {
  hot: 'bg-red-100 text-red-700 border-red-200 dark:bg-red-900/30 dark:text-red-300 dark:border-red-800',
  warm: 'bg-amber-100 text-amber-700 border-amber-200 dark:bg-amber-900/30 dark:text-amber-300 dark:border-amber-800',
  cold: 'bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-800',
  inactive: 'bg-gray-100 text-gray-500 border-gray-200 dark:bg-gray-800/50 dark:text-gray-400 dark:border-gray-600',
};

export function LeadScoreBadge({ score, className }: LeadScoreBadgeProps) {
  const category = getScoreCategory(score);
  const label = getScoreCategoryLabel(category);

  return (
    <Badge variant="outline" className={cn('font-medium gap-1', SCORE_STYLES[category], className)}>
      <span className="text-[10px] font-bold">{score}</span>
      {label}
    </Badge>
  );
}
