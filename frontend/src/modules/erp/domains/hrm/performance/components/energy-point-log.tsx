'use client';

import { cn } from '@/lib/utils';
import { Zap, TrendingUp, TrendingDown, Award, Star, Gift } from 'lucide-react';
import { EmptyState } from '../../../../shared/components/empty-state/empty-state';

interface EnergyPointEntry {
  id: string;
  employeeId: string;
  employeeName: string;
  points: number;
  reason: string;
  type: 'earned' | 'redeemed' | 'bonus' | 'milestone';
  timestamp: string;
  category: string;
}

interface EnergyPointLogProps {
  entries: EnergyPointEntry[];
  isLoading?: boolean;
  className?: string;
  maxItems?: number;
}

const TYPE_CONFIG: Record<
  EnergyPointEntry['type'],
  { icon: typeof Zap; colorClass: string; bgClass: string; label: string }
> = {
  earned: { icon: TrendingUp, colorClass: 'text-green-500', bgClass: 'bg-green-500/10', label: 'Earned' },
  redeemed: { icon: TrendingDown, colorClass: 'text-amber-500', bgClass: 'bg-amber-500/10', label: 'Redeemed' },
  bonus: { icon: Gift, colorClass: 'text-purple-500', bgClass: 'bg-purple-500/10', label: 'Bonus' },
  milestone: { icon: Award, colorClass: 'text-module-erp', bgClass: 'bg-module-erp/10', label: 'Milestone' },
};

function formatTimestamp(ts: string): string {
  const date = new Date(ts);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMin = Math.floor(diffMs / 60000);
  if (diffMin < 1) return 'Just now';
  if (diffMin < 60) return `${diffMin}m ago`;
  const diffHr = Math.floor(diffMin / 60);
  if (diffHr < 24) return `${diffHr}h ago`;
  const diffDay = Math.floor(diffHr / 24);
  if (diffDay < 7) return `${diffDay}d ago`;
  return date.toLocaleDateString();
}

export function EnergyPointLog({ entries, isLoading, className, maxItems = 10 }: EnergyPointLogProps) {
  if (isLoading) {
    return (
      <div className={cn('space-y-2', className)}>
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-white/5 animate-pulse">
            <div className="w-7 h-7 rounded-full bg-white/10" />
            <div className="flex-1 space-y-1">
              <div className="h-3 bg-white/10 rounded w-2/3" />
              <div className="h-2 bg-white/10 rounded w-1/3" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (entries.length === 0) {
    return (
      <EmptyState
        icon={Zap}
        title="No point activity"
        description="Points will appear here as they are earned or redeemed."
      />
    );
  }

  const displayedEntries = entries.slice(0, maxItems);
  const totalEarned = entries.filter((e) => e.type === 'earned' || e.type === 'bonus' || e.type === 'milestone').reduce((sum, e) => sum + e.points, 0);
  const totalRedeemed = entries.filter((e) => e.type === 'redeemed').reduce((sum, e) => sum + e.points, 0);

  return (
    <div className={cn('space-y-3', className)}>
      {/* Summary */}
      <div className="flex items-center gap-4 px-4 py-3 rounded-xl bg-white/5 border border-white/5">
        <div className="flex items-center gap-2">
          <Star className="h-4 w-4 text-amber-400" strokeWidth={1.8} />
          <span className="text-sm font-medium text-foreground">Balance: {totalEarned - totalRedeemed} pts</span>
        </div>
        <div className="flex items-center gap-1.5 text-xs text-green-500">
          <TrendingUp className="h-3 w-3" strokeWidth={1.8} /> +{totalEarned}
        </div>
        <div className="flex items-center gap-1.5 text-xs text-amber-500">
          <TrendingDown className="h-3 w-3" strokeWidth={1.8} /> -{totalRedeemed}
        </div>
      </div>

      {/* Log Entries */}
      <div className="space-y-1">
        {displayedEntries.map((entry) => {
          const config = TYPE_CONFIG[entry.type];
          const Icon = config.icon;
          const isPositive = entry.type === 'earned' || entry.type === 'bonus' || entry.type === 'milestone';

          return (
            <div
              key={entry.id}
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-white/5 transition-colors duration-200"
            >
              <div className={cn('flex items-center justify-center w-7 h-7 rounded-full shrink-0', config.bgClass)}>
                <Icon className={cn('h-3.5 w-3.5', config.colorClass)} strokeWidth={1.8} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-foreground truncate">
                  <span className="font-medium">{entry.employeeName}</span>{' '}
                  <span className="text-muted-foreground">{entry.reason}</span>
                </p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {config.label} · {entry.category} · {formatTimestamp(entry.timestamp)}
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

      {entries.length > maxItems && (
        <p className="text-xs text-muted-foreground text-center pt-2">
          Showing {maxItems} of {entries.length} entries
        </p>
      )}
    </div>
  );
}

export type { EnergyPointEntry, EnergyPointLogProps };
