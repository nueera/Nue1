'use client';

import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { STATUS_COLORS, type StatusKey } from '../../../core/utils/constants';

interface StatusBadgeProps {
  status: string;
  className?: string;
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const colorClass = STATUS_COLORS[status as StatusKey] || 'bg-zinc-500/10 text-zinc-500 border-zinc-500/15';
  return (
    <Badge variant="outline" className={cn('capitalize', colorClass, className)} style={{ fontSize: 'var(--text-xs)' }}>
      {status.replace('-', ' ')}
    </Badge>
  );
}
