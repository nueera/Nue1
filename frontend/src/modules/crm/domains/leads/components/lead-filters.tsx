// @ts-nocheck
'use client';

import { LEAD_STATUS_FILTERS, LEAD_SOURCE_FILTERS, LEAD_RATING_FILTERS } from '../constants';

interface LeadFiltersProps {
  statusFilter: string;
  sourceFilter: string;
  ratingFilter: string;
  onStatusChange: (v: string) => void;
  onSourceChange: (v: string) => void;
  onRatingChange: (v: string) => void;
}

export function LeadFilters({ statusFilter, sourceFilter, ratingFilter, onStatusChange, onSourceChange, onRatingChange }: LeadFiltersProps) {
  return (
    <div className="flex items-center gap-3 flex-wrap">
      <select
        value={statusFilter}
        onChange={e => onStatusChange(e.target.value)}
        className="px-3 py-1.5 rounded-lg border border-glass-border bg-glass-bg text-foreground text-sm outline-none"
      >
        {LEAD_STATUS_FILTERS.map(s => (
          <option key={s} value={s}>{s === 'All' ? 'All Statuses' : s}</option>
        ))}
      </select>
      <select
        value={sourceFilter}
        onChange={e => onSourceChange(e.target.value)}
        className="px-3 py-1.5 rounded-lg border border-glass-border bg-glass-bg text-foreground text-sm outline-none"
      >
        {LEAD_SOURCE_FILTERS.map(s => (
          <option key={s} value={s}>{s === 'All' ? 'All Sources' : s}</option>
        ))}
      </select>
      <select
        value={ratingFilter}
        onChange={e => onRatingChange(e.target.value)}
        className="px-3 py-1.5 rounded-lg border border-glass-border bg-glass-bg text-foreground text-sm outline-none"
      >
        {LEAD_RATING_FILTERS.map(s => (
          <option key={s} value={s}>{s === 'All' ? 'All Ratings' : s}</option>
        ))}
      </select>
    </div>
  );
}
