'use client';

import { useState } from 'react';
import { Filter, CalendarDays } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { FilterBar } from '../../../../shared/components/filter-bar/filter-bar';
import { FY_MONTHS, PAYROLL_STATUSES } from '../constants';
import { cn } from '@/lib/utils';

interface PayrollFiltersProps {
  onFilterChange: (filters: PayrollFilterState) => void;
  className?: string;
}

export interface PayrollFilterState {
  month: string;
  year: string;
  department: string;
  status: string;
}

interface ActiveFilter {
  key: string;
  label: string;
  value: string;
}

const DEPARTMENTS = ['All', 'Engineering', 'Marketing', 'Sales', 'HR', 'Finance', 'Operations'];

export function PayrollFilters({ onFilterChange, className }: PayrollFiltersProps) {
  const [filters, setFilters] = useState<PayrollFilterState>({
    month: '',
    year: new Date().getFullYear().toString(),
    department: '',
    status: '',
  });

  const updateFilter = (key: keyof PayrollFilterState, value: string) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const activeFilters: ActiveFilter[] = [];
  if (filters.month) activeFilters.push({ key: 'month', label: 'Month', value: filters.month });
  if (filters.department) activeFilters.push({ key: 'department', label: 'Department', value: filters.department });
  if (filters.status) activeFilters.push({ key: 'status', label: 'Status', value: filters.status });

  const removeFilter = (key: string) => {
    updateFilter(key as keyof PayrollFilterState, '');
  };

  const clearAll = () => {
    const cleared: PayrollFilterState = { month: '', year: filters.year, department: '', status: '' };
    setFilters(cleared);
    onFilterChange(cleared);
  };

  return (
    <div className={cn('bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-4 sm:p-6 space-y-4', className)}>
      <div className="flex items-center gap-2">
        <Filter className="h-4 w-4 text-muted-foreground" strokeWidth={1.8} />
        <span className="text-sm font-medium text-foreground">Filters</span>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        {/* Month */}
        <select
          value={filters.month}
          onChange={(e) => updateFilter('month', e.target.value)}
          className="bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-xs text-foreground outline-none focus:border-module-erp/50 transition-colors"
        >
          <option value="" className="bg-zinc-900">All Months</option>
          {FY_MONTHS.map((m) => (
            <option key={m} value={m} className="bg-zinc-900">{m}</option>
          ))}
        </select>

        {/* Year */}
        <select
          value={filters.year}
          onChange={(e) => updateFilter('year', e.target.value)}
          className="bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-xs text-foreground outline-none focus:border-module-erp/50 transition-colors"
        >
          <option value={new Date().getFullYear().toString()} className="bg-zinc-900">{new Date().getFullYear()}</option>
          <option value={(new Date().getFullYear() - 1).toString()} className="bg-zinc-900">{new Date().getFullYear() - 1}</option>
        </select>

        {/* Department */}
        <select
          value={filters.department}
          onChange={(e) => updateFilter('department', e.target.value)}
          className="bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-xs text-foreground outline-none focus:border-module-erp/50 transition-colors"
        >
          {DEPARTMENTS.map((d) => (
            <option key={d} value={d === 'All' ? '' : d} className="bg-zinc-900">{d}</option>
          ))}
        </select>

        {/* Status */}
        <select
          value={filters.status}
          onChange={(e) => updateFilter('status', e.target.value)}
          className="bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-xs text-foreground outline-none focus:border-module-erp/50 transition-colors"
        >
          {PAYROLL_STATUSES.map((s) => (
            <option key={s} value={s === 'All' ? '' : s} className="bg-zinc-900 capitalize">{s}</option>
          ))}
        </select>

        <Button variant="ghost" size="sm" onClick={clearAll} className="text-xs text-muted-foreground press-scale h-7">
          Reset
        </Button>
      </div>

      <FilterBar chips={activeFilters} onRemove={removeFilter} onClearAll={clearAll} />
    </div>
  );
}
