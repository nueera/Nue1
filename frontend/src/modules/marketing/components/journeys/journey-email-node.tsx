'use client';

import { cn } from '@/lib/utils';
import type { JourneyNode } from '@/modules/marketing/types';
import { Mail } from 'lucide-react';

interface JourneyEmailNodeProps {
  node: JourneyNode;
  isSelected: boolean;
  onMouseDown: (e: React.MouseEvent) => void;
}

export function JourneyEmailNode({ node, isSelected, onMouseDown }: JourneyEmailNodeProps) {
  const subject = (node.config.subject as string) ?? 'Email Subject';
  const templateId = (node.config.templateId as string) ?? '';

  return (
    <div
      className={cn(
        'cursor-move rounded-xl border-2 p-3 min-w-[180px] transition-all select-none',
        'bg-blue-50 dark:bg-blue-950/20 border-blue-400 dark:border-blue-600',
        isSelected && 'ring-2 ring-blue-500 ring-offset-2 shadow-lg',
        !isSelected && 'hover:shadow-md'
      )}
      onMouseDown={onMouseDown}
    >
      <div className="flex items-center gap-2">
        <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-blue-200 dark:bg-blue-800">
          <Mail className="h-4 w-4 text-blue-700 dark:text-blue-300" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-xs font-bold text-blue-800 dark:text-blue-200">SEND EMAIL</p>
          <p className="text-[10px] text-blue-600 dark:text-blue-400 truncate">{subject}</p>
        </div>
      </div>
    </div>
  );
}
