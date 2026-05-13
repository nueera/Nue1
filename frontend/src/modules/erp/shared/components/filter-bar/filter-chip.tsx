'use client';

import { X } from 'lucide-react';

interface FilterChipProps {
  label: string;
  value: string;
  onRemove: () => void;
}

export function FilterChip({ label, value, onRemove }: FilterChipProps) {
  return (
    <button
      onClick={onRemove}
      className="flex items-center gap-1 px-2.5 py-1 rounded-md border border-glass-border bg-glass-bg text-xs text-foreground hover:bg-glass-hover transition-colors duration-[var(--motion-fast)]"
    >
      <span className="text-muted-foreground">{label}:</span>
      <span className="font-medium">{value}</span>
      <X className="h-3 w-3 text-muted-foreground" strokeWidth={1.8} />
    </button>
  );
}
