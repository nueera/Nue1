// @ts-nocheck
'use client';

import { ACCOUNT_TYPE_FILTERS, ACCOUNT_TIER_FILTERS } from '../constants';

interface AccountFiltersProps {
  typeFilter: string;
  tierFilter: string;
  onTypeChange: (v: string) => void;
  onTierChange: (v: string) => void;
}

export function AccountFilters({ typeFilter, tierFilter, onTypeChange, onTierChange }: AccountFiltersProps) {
  return (
    <div className="flex items-center gap-3 flex-wrap">
      <select
        value={typeFilter}
        onChange={e => onTypeChange(e.target.value)}
        className="px-3 py-1.5 rounded-lg border border-glass-border bg-glass-bg text-foreground text-sm outline-none"
      >
        {ACCOUNT_TYPE_FILTERS.map(t => (
          <option key={t} value={t}>{t === 'All' ? 'All Types' : t}</option>
        ))}
      </select>
      <select
        value={tierFilter}
        onChange={e => onTierChange(e.target.value)}
        className="px-3 py-1.5 rounded-lg border border-glass-border bg-glass-bg text-foreground text-sm outline-none"
      >
        {ACCOUNT_TIER_FILTERS.map(t => (
          <option key={t} value={t}>{t === 'All' ? 'All Tiers' : t}</option>
        ))}
      </select>
    </div>
  );
}
