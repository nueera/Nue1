'use client';

import { useState } from 'react';
import { Calendar, Search, ArrowUpDown } from 'lucide-react';
import type { LeaveBalance } from '../../types';
import { EmptyState } from '../../../../shared/components/empty-state';

interface LeaveBalanceReportProps {
  data: LeaveBalance[];
  isLoading?: boolean;
}

type SortField = 'employeeId' | 'leaveType' | 'total' | 'used' | 'available';
type SortDir = 'asc' | 'desc';

export function LeaveBalanceReport({ data, isLoading }: LeaveBalanceReportProps) {
  const [search, setSearch] = useState('');
  const [sortField, setSortField] = useState<SortField>('employeeId');
  const [sortDir, setSortDir] = useState<SortDir>('asc');

  const toggleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortField(field);
      setSortDir('asc');
    }
  };

  const filtered = data.filter(
    (d) => d.employeeId.toLowerCase().includes(search.toLowerCase()) || d.leaveType.toLowerCase().includes(search.toLowerCase())
  );

  const sorted = [...filtered].sort((a, b) => {
    const aVal = a[sortField];
    const bVal = b[sortField];
    const cmp = typeof aVal === 'number' && typeof bVal === 'number' ? aVal - bVal : String(aVal).localeCompare(String(bVal));
    return sortDir === 'asc' ? cmp : -cmp;
  });

  if (isLoading) {
    return (
      <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden">
        <div className="p-5">
          <div className="h-6 w-48 bg-white/10 rounded mb-4" />
        </div>
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="px-5 py-3 border-t border-white/5 animate-pulse">
            <div className="h-4 w-full bg-white/10 rounded" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground/50" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by employee or leave type..."
          className="w-full bg-white/5 backdrop-blur-md border border-white/10 rounded-xl pl-9 pr-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/50 outline-none focus:border-module-erp/50 transition-all duration-200"
        />
      </div>

      {sorted.length === 0 ? (
        <EmptyState icon={Calendar} title="No leave balance data" description="Leave balance records will appear here" />
      ) : (
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10">
                  <SortHeader field="employeeId" current={sortField} dir={sortDir} onSort={toggleSort}>Employee ID</SortHeader>
                  <SortHeader field="leaveType" current={sortField} dir={sortDir} onSort={toggleSort}>Leave Type</SortHeader>
                  <SortHeader field="total" current={sortField} dir={sortDir} onSort={toggleSort}>Total</SortHeader>
                  <SortHeader field="used" current={sortField} dir={sortDir} onSort={toggleSort}>Used</SortHeader>
                  <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider px-5 py-3">Pending</th>
                  <SortHeader field="available" current={sortField} dir={sortDir} onSort={toggleSort}>Available</SortHeader>
                </tr>
              </thead>
              <tbody>
                {sorted.map((row, i) => (
                  <tr key={`${row.employeeId}-${row.leaveType}-${i}`} className="border-b border-white/5 hover:bg-white/5 transition-all duration-200">
                    <td className="px-5 py-3 text-sm text-foreground font-medium">{row.employeeId}</td>
                    <td className="px-5 py-3">
                      <span className="inline-flex px-2 py-0.5 text-[10px] bg-white/5 border border-white/10 rounded-md text-foreground capitalize">
                        {row.leaveType}
                      </span>
                    </td>
                    <td className="px-5 py-3 text-sm text-foreground">{row.total}</td>
                    <td className="px-5 py-3 text-sm text-foreground">{row.used}</td>
                    <td className="px-5 py-3">
                      <span className={`text-sm ${row.pending > 0 ? 'text-amber-400' : 'text-foreground'}`}>{row.pending}</span>
                    </td>
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-2">
                        <div className="w-16 h-1.5 bg-white/5 rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full ${row.available <= 2 ? 'bg-red-400' : row.available <= 5 ? 'bg-amber-400' : 'bg-emerald-400'}`}
                            style={{ width: `${row.total > 0 ? (row.available / row.total) * 100 : 0}%` }}
                          />
                        </div>
                        <span className="text-sm text-foreground">{row.available}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

function SortHeader({ field, current, dir, onSort, children }: { field: SortField; current: SortField; dir: SortDir; onSort: (f: SortField) => void; children: React.ReactNode }) {
  const isActive = current === field;
  return (
    <th
      onClick={() => onSort(field)}
      className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider px-5 py-3 cursor-pointer hover:text-foreground transition-colors select-none"
    >
      <div className="flex items-center gap-1">
        {children}
        <ArrowUpDown className={`h-3 w-3 ${isActive ? 'text-module-erp' : 'opacity-30'}`} />
        {isActive && <span className="text-[8px]">{dir === 'asc' ? '↑' : '↓'}</span>}
      </div>
    </th>
  );
}
