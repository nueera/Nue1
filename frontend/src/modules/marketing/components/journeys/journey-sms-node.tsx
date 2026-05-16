'use client';

import { cn } from '@/lib/utils';
import type { JourneyNode } from '@/modules/marketing/types';
import { MessageSquare } from 'lucide-react';

interface JourneySmsNodeProps {
  node: JourneyNode;
  isSelected: boolean;
  onMouseDown: (e: React.MouseEvent) => void;
}

export function JourneySmsNode({ node, isSelected, onMouseDown }: JourneySmsNodeProps) {
  const message = (node.config.message as string) ?? 'SMS message content';

  return (
    <div
      className={cn(
        'cursor-move rounded-xl border-2 p-3 min-w-[180px] transition-all select-none',
        'bg-emerald-50 dark:bg-emerald-950/20 border-emerald-400 dark:border-emerald-600',
        isSelected && 'ring-2 ring-emerald-500 ring-offset-2 shadow-lg',
        !isSelected && 'hover:shadow-md'
      )}
      onMouseDown={onMouseDown}
    >
      <div className="flex items-center gap-2">
        <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-emerald-200 dark:bg-emerald-800">
          <MessageSquare className="h-4 w-4 text-emerald-700 dark:text-emerald-300" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-xs font-bold text-emerald-800 dark:text-emerald-200">SEND SMS</p>
          <p className="text-[10px] text-emerald-600 dark:text-emerald-400 truncate">{message}</p>
        </div>
      </div>
    </div>
  );
}
