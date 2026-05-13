'use client';

import { useState } from 'react';
import { Search, X, CalendarDays } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { DEPARTMENTS } from '../../../../core/utils/constants';
import { ATTENDANCE_STATUSES } from '../constants';

interface AttendanceFiltersProps {
  onFilterChange: (filters: AttendanceFilters) => void;
  initialFilters?: Partial<AttendanceFilters>;
}

export interface AttendanceFilters {
  search: string;
  department: string;
  status: string;
  dateFrom: string;
  dateTo: string;
}

export function AttendanceFilters({ onFilterChange, initialFilters }: AttendanceFiltersProps) {
  const [filters, setFilters] = useState<AttendanceFilters>({
    search: initialFilters?.search ?? '',
    department: initialFilters?.department ?? 'All',
    status: initialFilters?.status ?? 'All',
    dateFrom: initialFilters?.dateFrom ?? '',
    dateTo: initialFilters?.dateTo ?? '',
  });

  const activeFilterCount = [
    filters.department !== 'All',
    filters.status !== 'All',
    filters.search !== '',
    filters.dateFrom !== '',
    filters.dateTo !== '',
  ].filter(Boolean).length;

  const updateFilter = (key: keyof AttendanceFilters, value: string) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const clearAll = () => {
    const cleared: AttendanceFilters = { search: '', department: 'All', status: 'All', dateFrom: '', dateTo: '' };
    setFilters(cleared);
    onFilterChange(cleared);
  };

  return (
    <div className="flex flex-col gap-3">
      {/* Search + Dropdowns Row */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
        {/* Search */}
        <div className="flex items-center gap-2 px-3 py-2 rounded-lg border border-white/10 bg-white/5 backdrop-blur-md flex-1 w-full sm:w-auto">
          <Search className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
          <input
            type="text"
            value={filters.search}
            onChange={(e) => updateFilter('search', e.target.value)}
            placeholder="Search employee..."
            className="flex-1 bg-transparent text-foreground placeholder:text-muted-foreground/60 outline-none text-sm"
          />
          {filters.search && (
            <button onClick={() => updateFilter('search', '')} className="text-muted-foreground hover:text-foreground">
              <X className="h-3.5 w-3.5" />
            </button>
          )}
        </div>

        {/* Department */}
        <Select value={filters.department} onValueChange={(v) => updateFilter('department', v)}>
          <SelectTrigger className="w-full sm:w-[160px] bg-white/5 border-white/10">
            <SelectValue placeholder="Department" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All">All Departments</SelectItem>
            {DEPARTMENTS.map((d) => (
              <SelectItem key={d} value={d}>{d}</SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Status */}
        <Select value={filters.status} onValueChange={(v) => updateFilter('status', v)}>
          <SelectTrigger className="w-full sm:w-[140px] bg-white/5 border-white/10">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            {ATTENDANCE_STATUSES.map((s) => (
              <SelectItem key={s} value={s} className="capitalize">
                {s === 'All' ? 'All Statuses' : s.replace('-', ' ')}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Date Range Row */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
        <div className="flex items-center gap-2">
          <CalendarDays className="h-3.5 w-3.5 text-muted-foreground" />
          <span className="text-xs text-muted-foreground whitespace-nowrap">Date Range:</span>
        </div>
        <Input
          type="date"
          value={filters.dateFrom}
          onChange={(e) => updateFilter('dateFrom', e.target.value)}
          className="w-full sm:w-[160px] bg-white/5 border-white/10"
        />
        <span className="text-xs text-muted-foreground">to</span>
        <Input
          type="date"
          value={filters.dateTo}
          onChange={(e) => updateFilter('dateTo', e.target.value)}
          className="w-full sm:w-[160px] bg-white/5 border-white/10"
        />

        {activeFilterCount > 0 && (
          <Button variant="ghost" size="sm" onClick={clearAll} className="text-xs text-muted-foreground">
            Clear all
          </Button>
        )}
      </div>
    </div>
  );
}
