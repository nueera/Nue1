// @ts-nocheck
'use client';

import { DEAL_STAGE_FILTERS, DEAL_FORECAST_FILTERS } from '../constants';

interface DealFiltersProps {
  stageFilter: string;
  forecastFilter: string;
  onStageChange: (v: string) => void;
  onForecastChange: (v: string) => void;
}

export function DealFilters({ stageFilter, forecastFilter, onStageChange, onForecastChange }: DealFiltersProps) {
  return (
    <div className="flex items-center gap-3 flex-wrap">
      <select
        value={stageFilter}
        onChange={e => onStageChange(e.target.value)}
        className="px-3 py-1.5 rounded-lg border border-glass-border bg-glass-bg text-foreground text-sm outline-none"
      >
        {DEAL_STAGE_FILTERS.map(s => (
          <option key={s} value={s}>{s === 'All' ? 'All Stages' : s.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}</option>
        ))}
      </select>
      <select
        value={forecastFilter}
        onChange={e => onForecastChange(e.target.value)}
        className="px-3 py-1.5 rounded-lg border border-glass-border bg-glass-bg text-foreground text-sm outline-none"
      >
        {DEAL_FORECAST_FILTERS.map(f => (
          <option key={f} value={f}>{f === 'All' ? 'All Forecasts' : f.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}</option>
        ))}
      </select>
    </div>
  );
}
