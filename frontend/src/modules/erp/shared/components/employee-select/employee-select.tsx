'use client';

import { useState } from 'react';
import { Search } from 'lucide-react';
import { cn } from '@/lib/utils';

interface EmployeeOption {
  id: string;
  name: string;
  avatar: string;
  department: string;
}

export type { EmployeeOption };

interface EmployeeSelectProps {
  employees: EmployeeOption[];
  value?: string;
  onChange?: (employeeId: string) => void;
  placeholder?: string;
}

export function EmployeeSelect({ employees, value, onChange, placeholder = 'Select employee...' }: EmployeeSelectProps) {
  const [search, setSearch] = useState('');
  const [open, setOpen] = useState(false);

  const filtered = employees.filter((e) =>
    e.name.toLowerCase().includes(search.toLowerCase())
  );

  const selected = employees.find((e) => e.id === value);

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 w-full px-3 py-2 rounded-lg border border-glass-border bg-glass-bg text-left hover:border-module-erp/30 transition-colors duration-[var(--motion-fast)]"
      >
        {selected ? (
          <>
            <div className="flex items-center justify-center w-6 h-6 rounded-full bg-module-erp/15 text-module-erp text-[10px] font-semibold shrink-0">{selected.avatar}</div>
            <span className="text-foreground" style={{ fontSize: 'var(--text-sm)' }}>{selected.name}</span>
          </>
        ) : (
          <span className="text-muted-foreground" style={{ fontSize: 'var(--text-sm)' }}>{placeholder}</span>
        )}
      </button>
      {open && (
        <div className="absolute z-50 top-full mt-1 w-full glass-surface rounded-lg border border-glass-border shadow-lg max-h-60 overflow-hidden">
          <div className="p-2 border-b border-glass-border/50">
            <div className="flex items-center gap-2 px-2">
              <Search className="h-3.5 w-3.5 text-muted-foreground" strokeWidth={1.8} />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search..."
                className="flex-1 bg-transparent text-sm outline-none text-foreground placeholder:text-muted-foreground/60"
                autoFocus
              />
            </div>
          </div>
          <div className="max-h-48 overflow-y-auto custom-scrollbar">
            {filtered.map((emp) => (
              <button
                key={emp.id}
                onClick={() => { onChange?.(emp.id); setOpen(false); setSearch(''); }}
                className={cn('flex items-center gap-2 w-full px-3 py-2 text-left hover:bg-glass-hover transition-colors duration-[var(--motion-fast)]', value === emp.id && 'bg-module-erp/8')}
              >
                <div className="flex items-center justify-center w-6 h-6 rounded-full bg-module-erp/15 text-module-erp text-[10px] font-semibold shrink-0">{emp.avatar}</div>
                <div>
                  <p className="text-foreground" style={{ fontSize: 'var(--text-sm)' }}>{emp.name}</p>
                  <p className="text-muted-foreground" style={{ fontSize: 'var(--text-xs)' }}>{emp.department}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
