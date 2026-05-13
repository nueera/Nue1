'use client';

import { Search, X, SlidersHorizontal } from 'lucide-react';

interface TableToolbarProps {
  searchValue: string;
  onSearchChange: (value: string) => void;
  searchPlaceholder?: string;
  filterCount?: number;
  onClearFilters?: () => void;
}

export function TableToolbar({
  searchValue,
  onSearchChange,
  searchPlaceholder = 'Search...',
  filterCount = 0,
  onClearFilters,
}: TableToolbarProps) {
  return (
    <div className="search-glow flex items-center gap-2 px-3 py-2 rounded-lg border border-glass-border bg-glass-bg transition-all duration-[var(--motion-fast)]">
      <Search className="h-3.5 w-3.5 text-muted-foreground shrink-0" strokeWidth={1.8} />
      <input
        type="text"
        value={searchValue}
        onChange={(e) => onSearchChange(e.target.value)}
        placeholder={searchPlaceholder}
        className="flex-1 bg-transparent text-foreground placeholder:text-muted-foreground/60 outline-none"
        style={{ fontSize: 'var(--text-sm)', letterSpacing: 'var(--tracking-normal)' }}
      />
      {filterCount > 0 && (
        <button
          onClick={onClearFilters}
          className="flex items-center gap-1 px-2 py-0.5 rounded-md bg-module-erp/10 text-module-erp text-xs hover:bg-module-erp/20 transition-colors duration-[var(--motion-fast)]"
        >
          <SlidersHorizontal className="h-3 w-3" strokeWidth={1.8} />
          {filterCount}
          <X className="h-3 w-3" strokeWidth={1.8} />
        </button>
      )}
    </div>
  );
}
