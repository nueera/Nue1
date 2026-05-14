// @ts-nocheck
'use client';

import { CONTACT_STATUS_FILTERS, CONTACT_TYPE_FILTERS } from '../constants';

interface ContactFiltersProps {
  statusFilter: string;
  typeFilter: string;
  onStatusChange: (v: string) => void;
  onTypeChange: (v: string) => void;
}

export function ContactFilters({ statusFilter, typeFilter, onStatusChange, onTypeChange }: ContactFiltersProps) {
  return (
    <div className="flex items-center gap-3 flex-wrap">
      <select
        value={statusFilter}
        onChange={e => onStatusChange(e.target.value)}
        className="px-3 py-1.5 rounded-lg border border-glass-border bg-glass-bg text-foreground text-sm outline-none"
      >
        {CONTACT_STATUS_FILTERS.map(s => (
          <option key={s} value={s}>{s === 'All' ? 'All Statuses' : s}</option>
        ))}
      </select>
      <select
        value={typeFilter}
        onChange={e => onTypeChange(e.target.value)}
        className="px-3 py-1.5 rounded-lg border border-glass-border bg-glass-bg text-foreground text-sm outline-none"
      >
        {CONTACT_TYPE_FILTERS.map(t => (
          <option key={t} value={t}>{t === 'All' ? 'All Types' : t}</option>
        ))}
      </select>
    </div>
  );
}
