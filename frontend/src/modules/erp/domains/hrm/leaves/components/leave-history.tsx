'use client';

import { useState, useMemo } from 'react';
import { Filter, CalendarDays } from 'lucide-react';
import { type ColumnDef } from '@tanstack/react-table';
import SmartTable from '../../../../shared/components/smart-table/smart-table';
import { StatusBadge } from '../../../../shared/components/status-badge/status-badge';
import { FilterBar } from '../../../../shared/components/filter-bar/filter-bar';
import { LEAVE_STATUSES, LEAVE_TYPES } from '../constants';
import type { LeaveRequest, LeaveStatus, LeaveType } from '../types';

interface LeaveHistoryProps {
  data: LeaveRequest[];
  isLoading?: boolean;
  onRowClick?: (row: LeaveRequest) => void;
  className?: string;
}

interface ActiveFilter {
  key: string;
  label: string;
  value: string;
}

export function LeaveHistory({ data, isLoading, onRowClick, className }: LeaveHistoryProps) {
  const [statusFilter, setStatusFilter] = useState<string>('');
  const [typeFilter, setTypeFilter] = useState<string>('');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');

  const activeFilters = useMemo<ActiveFilter[]>(() => {
    const filters: ActiveFilter[] = [];
    if (statusFilter) filters.push({ key: 'status', label: 'Status', value: statusFilter });
    if (typeFilter) filters.push({ key: 'type', label: 'Type', value: typeFilter });
    if (dateFrom) filters.push({ key: 'dateFrom', label: 'From', value: dateFrom });
    if (dateTo) filters.push({ key: 'dateTo', label: 'To', value: dateTo });
    return filters;
  }, [statusFilter, typeFilter, dateFrom, dateTo]);

  const filteredData = useMemo(() => {
    return data.filter((leave) => {
      if (statusFilter && leave.status !== statusFilter) return false;
      if (typeFilter && leave.type !== typeFilter) return false;
      if (dateFrom && new Date(leave.startDate) < new Date(dateFrom)) return false;
      if (dateTo && new Date(leave.endDate) > new Date(dateTo)) return false;
      return true;
    });
  }, [data, statusFilter, typeFilter, dateFrom, dateTo]);

  const removeFilter = (key: string) => {
    if (key === 'status') setStatusFilter('');
    if (key === 'type') setTypeFilter('');
    if (key === 'dateFrom') setDateFrom('');
    if (key === 'dateTo') setDateTo('');
  };

  const clearAllFilters = () => {
    setStatusFilter('');
    setTypeFilter('');
    setDateFrom('');
    setDateTo('');
  };

  const columns: ColumnDef<LeaveRequest>[] = [
    {
      accessorKey: 'employeeName',
      header: 'Employee',
      cell: ({ row }) => <span className="font-medium text-foreground">{row.original.employeeName}</span>,
    },
    {
      accessorKey: 'type',
      header: 'Type',
      cell: ({ row }) => <span className="capitalize text-foreground/80">{row.original.type}</span>,
    },
    {
      accessorKey: 'startDate',
      header: 'Start Date',
      cell: ({ row }) => (
        <span className="text-foreground/80">
          {new Date(row.original.startDate).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}
        </span>
      ),
    },
    {
      accessorKey: 'endDate',
      header: 'End Date',
      cell: ({ row }) => (
        <span className="text-foreground/80">
          {new Date(row.original.endDate).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}
        </span>
      ),
    },
    {
      accessorKey: 'days',
      header: 'Days',
      cell: ({ row }) => <span className="font-medium text-module-erp">{row.original.days}</span>,
      size: 60,
    },
    {
      accessorKey: 'status',
      header: 'Status',
      cell: ({ row }) => <StatusBadge status={row.original.status} />,
      size: 120,
    },
  ];

  return (
    <div className={`bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-4 sm:p-6 space-y-4 ${className || ''}`}>
      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3">
        <Filter className="h-4 w-4 text-muted-foreground shrink-0" strokeWidth={1.8} />
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-xs text-foreground outline-none focus:border-module-erp/50 transition-colors"
        >
          <option value="" className="bg-zinc-900">All Statuses</option>
          {LEAVE_STATUSES.filter((s) => s !== 'All').map((s) => (
            <option key={s} value={s} className="bg-zinc-900 capitalize">{s}</option>
          ))}
        </select>
        <select
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
          className="bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-xs text-foreground outline-none focus:border-module-erp/50 transition-colors"
        >
          <option value="" className="bg-zinc-900">All Types</option>
          {LEAVE_TYPES.filter((t) => t !== 'All').map((t) => (
            <option key={t} value={t} className="bg-zinc-900 capitalize">{t}</option>
          ))}
        </select>
        <div className="flex items-center gap-1">
          <CalendarDays className="h-3.5 w-3.5 text-muted-foreground" strokeWidth={1.8} />
          <input
            type="date"
            value={dateFrom}
            onChange={(e) => setDateFrom(e.target.value)}
            className="bg-white/5 border border-white/10 rounded-lg px-2 py-1.5 text-xs text-foreground outline-none focus:border-module-erp/50 transition-colors"
            placeholder="From"
          />
          <span className="text-xs text-muted-foreground">-</span>
          <input
            type="date"
            value={dateTo}
            onChange={(e) => setDateTo(e.target.value)}
            className="bg-white/5 border border-white/10 rounded-lg px-2 py-1.5 text-xs text-foreground outline-none focus:border-module-erp/50 transition-colors"
          />
        </div>
      </div>

      {/* Active Filters */}
      <FilterBar chips={activeFilters} onRemove={removeFilter} onClearAll={clearAllFilters} />

      {/* Table */}
      <SmartTable
        data={filteredData}
        columns={columns}
        isLoading={isLoading}
        onRowClick={onRowClick}
        searchPlaceholder="Search leave history..."
        emptyMessage="No leave history found"
        emptyDescription="Try adjusting your filters"
      />
    </div>
  );
}
