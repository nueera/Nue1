'use client';

import { Search } from 'lucide-react';

interface GlobalSearchProps {
  placeholder?: string;
  shortcut?: string;
  onClick?: () => void;
}

export function GlobalSearch({ placeholder = 'Search...', shortcut = '⌘K', onClick }: GlobalSearchProps) {
  return (
    <div className="search-glow relative w-full flex items-center gap-2 px-3 py-1.5 rounded-lg border border-glass-border bg-glass-bg transition-all duration-[var(--motion-fast)] cursor-pointer" onClick={onClick}>
      <Search className="h-3.5 w-3.5 text-muted-foreground shrink-0" strokeWidth={1.8} />
      <span className="flex-1 text-sm text-muted-foreground/60" style={{ fontSize: 'var(--text-sm)' }}>{placeholder}</span>
      <kbd className="hidden sm:inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded text-[10px] font-mono text-muted-foreground/40 border border-glass-border bg-glass-bg/50">{shortcut}</kbd>
    </div>
  );
}
