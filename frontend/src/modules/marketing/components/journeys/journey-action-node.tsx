// @ts-nocheck
'use client';

import { cn } from '@/lib/utils';
import type { JourneyNode } from '@/modules/marketing/types';
import { Settings } from 'lucide-react';

interface JourneyActionNodeProps {
  node: JourneyNode;
  isSelected: boolean;
  onMouseDown: (e: React.MouseEvent) => void;
}

export function JourneyActionNode({ node, isSelected, onMouseDown }: JourneyActionNodeProps) {
  const actionType = (node.config.actionType as string) ?? 'add_tag';
  const actionLabels: Record<string, string> = {
    add_tag: 'Add Tag',
    remove_tag: 'Remove Tag',
    update_field: 'Update Field',
    add_to_list: 'Add to List',
    remove_from_list: 'Remove from List',
    score_adjust: 'Adjust Score',
    webhook: 'Webhook',
    notification: 'Send Notification',
  };
  const actionValue = (node.config.value as string) ?? '';

  return (
    <div
      className={cn(
        'cursor-move rounded-xl border-2 p-3 min-w-[180px] transition-all select-none',
        'bg-gray-50 dark:bg-gray-950/20 border-gray-400 dark:border-gray-600',
        isSelected && 'ring-2 ring-gray-500 ring-offset-2 shadow-lg',
        !isSelected && 'hover:shadow-md'
      )}
      onMouseDown={onMouseDown}
    >
      <div className="flex items-center gap-2">
        <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-gray-200 dark:bg-gray-800">
          <Settings className="h-4 w-4 text-gray-700 dark:text-gray-300" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-xs font-bold text-gray-800 dark:text-gray-200">ACTION</p>
          <p className="text-[10px] text-gray-600 dark:text-gray-400 truncate">
            {actionLabels[actionType] ?? actionType}
            {actionValue && `: ${actionValue}`}
          </p>
        </div>
      </div>
    </div>
  );
}
