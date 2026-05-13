'use client';

import { X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FilterChip {
  key: string;
  label: string;
  value: string;
}

interface FilterBarProps {
  chips: FilterChip[];
  onRemove: (key: string) => void;
  onClearAll: () => void;
  className?: string;
}

export function FilterBar({ chips, onRemove, onClearAll, className }: FilterBarProps) {
  if (chips.length === 0) return null;

  return (
    <div className={cn('flex flex-wrap items-center gap-2', className)}>
      {chips.map((chip) => (
        <button
          key={chip.key}
          onClick={() => onRemove(chip.key)}
          className="flex items-center gap-1 px-2.5 py-1 rounded-md border border-glass-border bg-glass-bg text-xs text-foreground hover:bg-glass-hover transition-colors duration-[var(--motion-fast)]"
        >
          <span className="text-muted-foreground">{chip.label}:</span>
          <span className="font-medium">{chip.value}</span>
          <X className="h-3 w-3 text-muted-foreground" strokeWidth={1.8} />
        </button>
      ))}
      {chips.length > 1 && (
        <button
          onClick={onClearAll}
          className="text-xs text-muted-foreground hover:text-foreground transition-colors duration-[var(--motion-fast)]"
        >
          Clear all
        </button>
      )}
    </div>
  );
}
