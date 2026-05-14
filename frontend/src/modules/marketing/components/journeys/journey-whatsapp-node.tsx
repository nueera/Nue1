// @ts-nocheck
'use client';

import { cn } from '@/lib/utils';
import type { JourneyNode } from '@/modules/marketing/types';
import { Phone } from 'lucide-react';

interface JourneyWhatsappNodeProps {
  node: JourneyNode;
  isSelected: boolean;
  onMouseDown: (e: React.MouseEvent) => void;
}

export function JourneyWhatsappNode({ node, isSelected, onMouseDown }: JourneyWhatsappNodeProps) {
  const templateName = (node.config.templateName as string) ?? 'WhatsApp Template';

  return (
    <div
      className={cn(
        'cursor-move rounded-xl border-2 p-3 min-w-[180px] transition-all select-none',
        'bg-green-50 dark:bg-green-950/20 border-green-400 dark:border-green-600',
        isSelected && 'ring-2 ring-green-500 ring-offset-2 shadow-lg',
        !isSelected && 'hover:shadow-md'
      )}
      onMouseDown={onMouseDown}
    >
      <div className="flex items-center gap-2">
        <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-green-200 dark:bg-green-800">
          <Phone className="h-4 w-4 text-green-700 dark:text-green-300" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-xs font-bold text-green-800 dark:text-green-200">WHATSAPP</p>
          <p className="text-[10px] text-green-600 dark:text-green-400 truncate">{templateName}</p>
        </div>
      </div>
    </div>
  );
}
