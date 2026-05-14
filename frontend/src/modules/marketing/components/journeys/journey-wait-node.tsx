// @ts-nocheck
'use client';

import { cn } from '@/lib/utils';
import type { JourneyNode } from '@/modules/marketing/types';
import { Clock } from 'lucide-react';

interface JourneyWaitNodeProps {
  node: JourneyNode;
  isSelected: boolean;
  onMouseDown: (e: React.MouseEvent) => void;
}

export function JourneyWaitNode({ node, isSelected, onMouseDown }: JourneyWaitNodeProps) {
  const duration = (node.config.duration as number) ?? 1;
  const unit = (node.config.unit as string) ?? 'hours';
  const unitLabels: Record<string, string> = {
    minutes: 'min',
    hours: 'hrs',
    days: 'days',
    weeks: 'wks',
  };

  return (
    <div
      className={cn(
        'cursor-move rounded-xl border-2 p-3 min-w-[180px] transition-all select-none',
        'bg-violet-50 dark:bg-violet-950/20 border-violet-400 dark:border-violet-600',
        isSelected && 'ring-2 ring-violet-500 ring-offset-2 shadow-lg',
        !isSelected && 'hover:shadow-md'
      )}
      onMouseDown={onMouseDown}
    >
      <div className="flex items-center gap-2">
        <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-violet-200 dark:bg-violet-800">
          <Clock className="h-4 w-4 text-violet-700 dark:text-violet-300" />
        </div>
        <div>
          <p className="text-xs font-bold text-violet-800 dark:text-violet-200">WAIT</p>
          <p className="text-[10px] text-violet-600 dark:text-violet-400">{duration} {unitLabels[unit] ?? unit}</p>
        </div>
      </div>
    </div>
  );
}
