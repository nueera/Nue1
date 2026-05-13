'use client';

import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { formatRelativeTime } from '../../../core/utils/format';

interface TeamUpdate {
  id: string;
  employeeId: string;
  employeeName: string;
  employeeAvatar: string;
  action: string;
  target: string;
  timestamp: string;
  type: 'leave' | 'attendance' | 'onboarding' | 'promotion' | 'transfer' | 'general';
}

interface TeamUpdatesProps {
  updates: TeamUpdate[];
  className?: string;
  maxItems?: number;
}

const UPDATE_TYPE_ICONS: Record<TeamUpdate['type'], string> = {
  leave: '🏖️',
  attendance: '⏰',
  onboarding: '👋',
  promotion: '🎉',
  transfer: '🔄',
  general: '📋',
};

/**
 * Team activity feed component showing recent team updates and activities.
 * Displays employee avatar, action description, and relative timestamp.
 */
export function TeamUpdates({ updates, className, maxItems = 10 }: TeamUpdatesProps) {
  const displayedUpdates = updates.slice(0, maxItems);

  if (displayedUpdates.length === 0) {
    return (
      <div className={cn('py-8 text-center', className)}>
        <p className="text-sm text-muted-foreground">No recent team updates</p>
      </div>
    );
  }

  return (
    <div className={cn('space-y-1', className)}>
      {displayedUpdates.map((update) => (
        <div
          key={update.id}
          className="flex items-start gap-3 px-3 py-2.5 rounded-lg hover:bg-glass-hover transition-colors duration-[var(--motion-fast)]"
        >
          <Avatar className="h-7 w-7 shrink-0">
            <AvatarFallback className="bg-module-erp/15 text-module-erp text-[10px] font-semibold">
              {update.employeeAvatar}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="text-sm text-foreground">
              <span className="font-medium">{update.employeeName}</span>{' '}
              <span className="text-muted-foreground">{update.action}</span>{' '}
              <span className="font-medium">{update.target}</span>
            </p>
            <p className="text-xs text-muted-foreground mt-0.5">
              {formatRelativeTime(update.timestamp)}
            </p>
          </div>
          <span className="text-sm shrink-0" title={update.type}>
            {UPDATE_TYPE_ICONS[update.type]}
          </span>
        </div>
      ))}
    </div>
  );
}

export type { TeamUpdate, TeamUpdatesProps };
