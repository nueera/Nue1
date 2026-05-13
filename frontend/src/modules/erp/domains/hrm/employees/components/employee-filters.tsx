'use client';

import { useState } from 'react';
import { Search, Filter, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { DEPARTMENTS } from '../../../../core/utils/constants';
import { STATUSES } from '../constants';

interface EmployeeFiltersProps {
  onFilterChange: (filters: EmployeeFilters) => void;
  initialFilters?: Partial<EmployeeFilters>;
}

export interface EmployeeFilters {
  search: string;
  department: string;
  status: string;
}

export function EmployeeFilters({ onFilterChange, initialFilters }: EmployeeFiltersProps) {
  const [filters, setFilters] = useState<EmployeeFilters>({
    search: initialFilters?.search ?? '',
    department: initialFilters?.department ?? 'All',
    status: initialFilters?.status ?? 'All',
  });

  const activeFilterCount = [filters.department !== 'All', filters.status !== 'All', filters.search !== ''].filter(Boolean).length;

  const updateFilter = (key: keyof EmployeeFilters, value: string) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const clearAll = () => {
    const cleared: EmployeeFilters = { search: '', department: 'All', status: 'All' };
    setFilters(cleared);
    onFilterChange(cleared);
  };

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
      {/* Search */}
      <div className="flex items-center gap-2 px-3 py-2 rounded-lg border border-white/10 bg-white/5 backdrop-blur-md flex-1 w-full sm:w-auto">
        <Search className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
        <input
          type="text"
          value={filters.search}
          onChange={(e) => updateFilter('search', e.target.value)}
          placeholder="Search employees..."
          className="flex-1 bg-transparent text-foreground placeholder:text-muted-foreground/60 outline-none text-sm"
        />
        {filters.search && (
          <button onClick={() => updateFilter('search', '')} className="text-muted-foreground hover:text-foreground">
            <X className="h-3.5 w-3.5" />
          </button>
        )}
      </div>

      {/* Department Filter */}
      <Select value={filters.department} onValueChange={(v) => updateFilter('department', v)}>
        <SelectTrigger className="w-full sm:w-[160px] bg-white/5 border-white/10">
          <SelectValue placeholder="Department" />
        </SelectTrigger>
        <SelectContent>
          {STATUSES.map((d) => (
            <SelectItem key={d} value={d}>{d === 'All' ? 'All Departments' : d}</SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* Status Filter */}
      <Select value={filters.status} onValueChange={(v) => updateFilter('status', v)}>
        <SelectTrigger className="w-full sm:w-[140px] bg-white/5 border-white/10">
          <SelectValue placeholder="Status" />
        </SelectTrigger>
        <SelectContent>
          {STATUSES.map((s) => (
            <SelectItem key={s} value={s} className="capitalize">
              {s === 'All' ? 'All Statuses' : s.replace('-', ' ')}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* Clear Filters */}
      {activeFilterCount > 0 && (
        <Button variant="ghost" size="sm" onClick={clearAll} className="text-xs text-muted-foreground">
          Clear all
        </Button>
      )}
    </div>
  );
}
