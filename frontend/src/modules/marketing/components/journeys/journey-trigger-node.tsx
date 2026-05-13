'use client';

import { cn } from '@/lib/utils';
import type { JourneyNode } from '@/modules/marketing/types';
import { Zap } from 'lucide-react';

interface JourneyTriggerNodeProps {
  node: JourneyNode;
  isSelected: boolean;
  onMouseDown: (e: React.MouseEvent) => void;
}

export function JourneyTriggerNode({ node, isSelected, onMouseDown }: JourneyTriggerNodeProps) {
  const triggerType = (node.config.triggerType as string) ?? 'list_entry';
  const triggerLabels: Record<string, string> = {
    list_entry: 'List Join',
    form_submit: 'Form Submit',
    page_visit: 'Page Visit',
    email_open: 'Email Open',
    email_click: 'Email Click',
    purchase: 'Purchase',
    custom_event: 'Custom Event',
    date_based: 'Date Based',
    score_threshold: 'Score Threshold',
    api_call: 'API Call',
    field_change: 'Field Change',
  };

  return (
    <div
      className={cn(
        'cursor-move rounded-xl border-2 p-3 min-w-[180px] transition-all select-none',
        'bg-amber-50 dark:bg-amber-950/20 border-amber-400 dark:border-amber-600',
        isSelected && 'ring-2 ring-amber-500 ring-offset-2 shadow-lg',
        !isSelected && 'hover:shadow-md'
      )}
      onMouseDown={onMouseDown}
    >
      <div className="flex items-center gap-2">
        <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-amber-200 dark:bg-amber-800">
          <Zap className="h-4 w-4 text-amber-700 dark:text-amber-300" />
        </div>
        <div>
          <p className="text-xs font-bold text-amber-800 dark:text-amber-200">TRIGGER</p>
          <p className="text-xs text-amber-600 dark:text-amber-400">{triggerLabels[triggerType] ?? triggerType}</p>
        </div>
      </div>
    </div>
  );
}
