// @ts-nocheck
'use client';

import { cn } from '@/lib/utils';
import type { JourneyNode } from '@/modules/marketing/types';
import { LogOut } from 'lucide-react';

interface JourneyExitNodeProps {
  node: JourneyNode;
  isSelected: boolean;
  onMouseDown: (e: React.MouseEvent) => void;
}

export function JourneyExitNode({ node, isSelected, onMouseDown }: JourneyExitNodeProps) {
  return (
    <div
      className={cn(
        'cursor-move rounded-xl border-2 p-3 min-w-[140px] transition-all select-none',
        'bg-red-50 dark:bg-red-950/20 border-red-400 dark:border-red-600',
        isSelected && 'ring-2 ring-red-500 ring-offset-2 shadow-lg',
        !isSelected && 'hover:shadow-md'
      )}
      onMouseDown={onMouseDown}
    >
      <div className="flex items-center gap-2">
        <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-red-200 dark:bg-red-800">
          <LogOut className="h-4 w-4 text-red-700 dark:text-red-300" />
        </div>
        <div>
          <p className="text-xs font-bold text-red-800 dark:text-red-200">EXIT</p>
          <p className="text-[10px] text-red-600 dark:text-red-400">End journey</p>
        </div>
      </div>
    </div>
  );
}
