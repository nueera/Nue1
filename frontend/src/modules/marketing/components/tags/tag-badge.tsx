// @ts-nocheck
'use client';

import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

const TAG_COLORS: Record<string, string> = {
  vip: 'bg-amber-100 text-amber-700 dark:bg-amber-950/30 dark:text-amber-400',
  hot_lead: 'bg-red-100 text-red-700 dark:bg-red-950/30 dark:text-red-400',
  new: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-400',
  engaged: 'bg-blue-100 text-blue-700 dark:bg-blue-950/30 dark:text-blue-400',
  churned: 'bg-gray-100 text-gray-700 dark:bg-gray-950/30 dark:text-gray-400',
};

interface TagBadgeProps {
  tag: string;
  removable?: boolean;
  onRemove?: (tag: string) => void;
  className?: string;
}

export function TagBadge({ tag, removable, onRemove, className }: TagBadgeProps) {
  const colorClass = TAG_COLORS[tag] ?? '';

  return (
    <Badge variant="secondary" className={cn('text-xs gap-1', colorClass, removable && 'pr-1', className)}>
      {tag}
      {removable && (
        <button onClick={() => onRemove?.(tag)} className="hover:text-destructive transition-colors ml-0.5">
          ×
        </button>
      )}
    </Badge>
  );
}
