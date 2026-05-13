'use client';

import { cn } from '@/lib/utils';
import { Zap, TrendingUp, TrendingDown, Award, Star } from 'lucide-react';

interface EnergyPointEntry {
  id: string;
  employeeId: string;
  employeeName: string;
  employeeAvatar: string;
  points: number;
  reason: string;
  type: 'earned' | 'redeemed' | 'bonus' | 'milestone';
  timestamp: string;
  category: string;
}

interface EnergyPointLogProps {
  entries: EnergyPointEntry[];
  className?: string;
  maxItems?: number;
}

const TYPE_CONFIG: Record<
  EnergyPointEntry['type'],
  { icon: typeof Zap; colorClass: string; label: string }
> = {
  earned: { icon: TrendingUp, colorClass: 'text-green-500', label: 'Earned' },
  redeemed: { icon: TrendingDown, colorClass: 'text-amber-500', label: 'Redeemed' },
  bonus: { icon: Star, colorClass: 'text-purple-500', label: 'Bonus' },
  milestone: { icon: Award, colorClass: 'text-module-erp', label: 'Milestone' },
};

/**
 * Energy/gamification point log component showing point activity.
 * Displays point changes with type-specific icons and color coding.
 */
export function EnergyPointLog({ entries, className, maxItems = 10 }: EnergyPointLogProps) {
  const displayedEntries = entries.slice(0, maxItems);

  if (displayedEntries.length === 0) {
    return (
      <div className={cn('py-8 text-center', className)}>
        <Zap className="h-8 w-8 text-muted-foreground/40 mx-auto mb-2" />
        <p className="text-sm text-muted-foreground">No point activity yet</p>
      </div>
    );
  }

  return (
    <div className={cn('space-y-1', className)}>
      {displayedEntries.map((entry) => {
        const config = TYPE_CONFIG[entry.type];
        const Icon = config.icon;
        const isPositive = entry.type === 'earned' || entry.type === 'bonus' || entry.type === 'milestone';

        return (
          <div
            key={entry.id}
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-glass-hover transition-colors duration-[var(--motion-fast)]"
          >
            <div className={cn('flex items-center justify-center w-7 h-7 rounded-full shrink-0', isPositive ? 'bg-green-500/10' : 'bg-amber-500/10')}>
              <Icon className={cn('h-3.5 w-3.5', config.colorClass)} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm text-foreground truncate">
                <span className="font-medium">{entry.employeeName}</span>{' '}
                <span className="text-muted-foreground">{entry.reason}</span>
              </p>
              <p className="text-xs text-muted-foreground mt-0.5">
                {config.label} · {entry.category}
              </p>
            </div>
            <span
              className={cn(
                'text-sm font-semibold shrink-0',
                isPositive ? 'text-green-500' : 'text-amber-500',
              )}
            >
              {isPositive ? '+' : '-'}
              {Math.abs(entry.points)} pts
            </span>
          </div>
        );
      })}
    </div>
  );
}

export type { EnergyPointEntry, EnergyPointLogProps };
