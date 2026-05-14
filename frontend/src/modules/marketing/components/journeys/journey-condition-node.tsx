// @ts-nocheck
'use client';

import { cn } from '@/lib/utils';
import type { JourneyNode } from '@/modules/marketing/types';
import { GitBranch } from 'lucide-react';

interface JourneyConditionNodeProps {
  node: JourneyNode;
  isSelected: boolean;
  onMouseDown: (e: React.MouseEvent) => void;
}

export function JourneyConditionNode({ node, isSelected, onMouseDown }: JourneyConditionNodeProps) {
  const conditionType = (node.config.conditionType as string) ?? 'if_else';
  const field = (node.config.field as string) ?? '';
  const yesLabel = (node.config.yesLabel as string) ?? 'Yes';
  const noLabel = (node.config.noLabel as string) ?? 'No';

  return (
    <div
      className={cn(
        'cursor-move rounded-xl border-2 p-3 min-w-[180px] transition-all select-none',
        'bg-orange-50 dark:bg-orange-950/20 border-orange-400 dark:border-orange-600',
        isSelected && 'ring-2 ring-orange-500 ring-offset-2 shadow-lg',
        !isSelected && 'hover:shadow-md'
      )}
      onMouseDown={onMouseDown}
    >
      <div className="flex items-center gap-2 mb-2">
        <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-orange-200 dark:bg-orange-800 rotate-90">
          <GitBranch className="h-4 w-4 text-orange-700 dark:text-orange-300" />
        </div>
        <div>
          <p className="text-xs font-bold text-orange-800 dark:text-orange-200">CONDITION</p>
          {field && <p className="text-[10px] text-orange-600 dark:text-orange-400 truncate">{field}</p>}
        </div>
      </div>
      <div className="flex items-center gap-2 text-[10px]">
        <span className="px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-900 text-emerald-700 dark:text-emerald-300 font-medium">✓ {yesLabel}</span>
        <span className="px-2 py-0.5 rounded bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300 font-medium">✗ {noLabel}</span>
      </div>
    </div>
  );
}
