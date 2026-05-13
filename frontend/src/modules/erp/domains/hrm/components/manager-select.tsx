'use client';

import { useState } from 'react';
import { Search, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ManagerOption {
  id: string;
  name: string;
  avatar: string;
  department: string;
  designation: string;
  directReports: number;
}

interface ManagerSelectProps {
  managers: ManagerOption[];
  value?: string;
  onChange?: (managerId: string) => void;
  placeholder?: string;
}

/**
 * Searchable manager dropdown component for selecting reporting managers.
 * Displays manager name, designation, department, and direct report count.
 */
export function ManagerSelect({
  managers,
  value,
  onChange,
  placeholder = 'Select reporting manager...',
}: ManagerSelectProps) {
  const [search, setSearch] = useState('');
  const [open, setOpen] = useState(false);

  const filtered = managers.filter(
    (m) =>
      m.name.toLowerCase().includes(search.toLowerCase()) ||
      m.department.toLowerCase().includes(search.toLowerCase()) ||
      m.designation.toLowerCase().includes(search.toLowerCase()),
  );

  const selected = managers.find((m) => m.id === value);

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex items-center justify-between gap-2 w-full px-3 py-2 rounded-lg border border-glass-border bg-glass-bg text-left hover:border-module-erp/30 transition-colors duration-[var(--motion-fast)]"
      >
        <span className="flex-1 truncate">
          {selected ? (
            <span className="flex items-center gap-2">
              <span className="flex items-center justify-center w-6 h-6 rounded-full bg-module-erp/15 text-module-erp text-[10px] font-semibold shrink-0">
                {selected.avatar}
              </span>
              <span className="text-foreground text-sm">{selected.name}</span>
              <span className="text-muted-foreground text-xs">({selected.designation})</span>
            </span>
          ) : (
            <span className="text-muted-foreground text-sm">{placeholder}</span>
          )}
        </span>
        <ChevronDown className="h-4 w-4 text-muted-foreground shrink-0" />
      </button>
      {open && (
        <div className="absolute z-50 top-full mt-1 w-full glass-surface rounded-lg border border-glass-border shadow-lg max-h-72 overflow-hidden">
          <div className="p-2 border-b border-glass-border/50">
            <div className="flex items-center gap-2 px-2">
              <Search className="h-3.5 w-3.5 text-muted-foreground" strokeWidth={1.8} />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by name, department, role..."
                className="flex-1 bg-transparent text-sm outline-none text-foreground placeholder:text-muted-foreground/60"
                autoFocus
              />
            </div>
          </div>
          <div className="max-h-60 overflow-y-auto custom-scrollbar">
            {filtered.length === 0 ? (
              <div className="px-3 py-4 text-center text-sm text-muted-foreground">
                No managers found
              </div>
            ) : (
              filtered.map((manager) => (
                <button
                  key={manager.id}
                  type="button"
                  onClick={() => {
                    onChange?.(manager.id);
                    setOpen(false);
                    setSearch('');
                  }}
                  className={cn(
                    'flex items-center gap-3 w-full px-3 py-2.5 text-left hover:bg-glass-hover transition-colors duration-[var(--motion-fast)]',
                    value === manager.id && 'bg-module-erp/8',
                  )}
                >
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-module-erp/15 text-module-erp text-xs font-semibold shrink-0">
                    {manager.avatar}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-foreground text-sm font-medium truncate">{manager.name}</p>
                    <p className="text-muted-foreground text-xs truncate">
                      {manager.designation} · {manager.department}
                    </p>
                  </div>
                  <span className="text-xs text-muted-foreground shrink-0">
                    {manager.directReports} reports
                  </span>
                </button>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export type { ManagerOption, ManagerSelectProps };
