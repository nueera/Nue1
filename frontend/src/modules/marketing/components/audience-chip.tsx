'use client';

import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Users, X } from 'lucide-react';

export interface AudienceChipProps {
  name: string;
  memberCount: number;
  color?: string;
  removable?: boolean;
  onRemove?: () => void;
  onClick?: () => void;
  className?: string;
}

const COLOR_MAP: Record<string, string> = {
  blue: 'bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-800',
  emerald: 'bg-emerald-100 text-emerald-700 border-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-300 dark:border-emerald-800',
  amber: 'bg-amber-100 text-amber-700 border-amber-200 dark:bg-amber-900/30 dark:text-amber-300 dark:border-amber-800',
  purple: 'bg-purple-100 text-purple-700 border-purple-200 dark:bg-purple-900/30 dark:text-purple-300 dark:border-purple-800',
  rose: 'bg-rose-100 text-rose-700 border-rose-200 dark:bg-rose-900/30 dark:text-rose-300 dark:border-rose-800',
  teal: 'bg-teal-100 text-teal-700 border-teal-200 dark:bg-teal-900/30 dark:text-teal-300 dark:border-teal-800',
  cyan: 'bg-cyan-100 text-cyan-700 border-cyan-200 dark:bg-cyan-900/30 dark:text-cyan-300 dark:border-cyan-800',
};

export function AudienceChip({
  name,
  memberCount,
  color = 'blue',
  removable = false,
  onRemove,
  onClick,
  className,
}: AudienceChipProps) {
  const styleClass = COLOR_MAP[color] ?? COLOR_MAP.blue;

  return (
    <Badge
      variant="outline"
      className={cn(
        'font-medium gap-1.5 px-2.5 py-1',
        styleClass,
        onClick && 'cursor-pointer hover:opacity-80 transition-opacity',
        className
      )}
      onClick={onClick}
    >
      <Users className="h-3 w-3" />
      <span className="text-xs">{name}</span>
      <span className="text-[10px] opacity-70 tabular-nums">
        ({memberCount.toLocaleString()})
      </span>
      {removable && onRemove && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onRemove();
          }}
          className="ml-0.5 hover:opacity-70 transition-opacity"
          aria-label={`Remove ${name}`}
        >
          <X className="h-3 w-3" />
        </button>
      )}
    </Badge>
  );
}
