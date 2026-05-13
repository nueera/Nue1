'use client';

import { useState, useMemo } from 'react';
import { Users, Filter } from 'lucide-react';
import type { ShiftAssignment } from '../types';
import { StatusBadge } from '../../../../shared/components/status-badge';
import { EmptyState } from '../../../../shared/components/empty-state';

interface ShiftAssignmentTableProps {
  data: ShiftAssignment[];
  departments?: string[];
  isLoading?: boolean;
  onEdit?: (assignment: ShiftAssignment) => void;
  onRemove?: (id: string) => void;
}

export function ShiftAssignmentTable({
  data,
  departments = [],
  isLoading,
  onEdit,
  onRemove,
}: ShiftAssignmentTableProps) {
  const [departmentFilter, setDepartmentFilter] = useState<string>('all');
  const [search, setSearch] = useState('');

  const filtered = useMemo(() => {
    let result = data;
    if (search) {
      const q = search.toLowerCase();
      result = result.filter(
        (a) =>
          a.employeeName.toLowerCase().includes(q) ||
          a.shiftTypeName.toLowerCase().includes(q)
      );
    }
    return result;
  }, [data, search]);

  if (isLoading) {
    return (
      <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden">
        <div className="p-4 border-b border-white/10">
          <div className="h-8 w-48 bg-white/10 rounded animate-pulse" />
        </div>
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="p-4 border-b border-white/5">
            <div className="flex items-center gap-4">
              <div className="h-8 w-8 bg-white/10 rounded-full animate-pulse" />
              <div className="space-y-1 flex-1">
                <div className="h-3 w-32 bg-white/10 rounded animate-pulse" />
                <div className="h-2 w-48 bg-white/10 rounded animate-pulse" />
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Filters */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
        <div className="flex items-center gap-2 flex-1 w-full sm:w-auto">
          <Users className="h-4 w-4 text-muted-foreground shrink-0" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search employee or shift..."
            className="flex-1 bg-white/5 backdrop-blur-md border border-white/10 rounded-xl px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground/50 outline-none focus:border-module-erp/50 transition-all duration-200"
          />
        </div>
        {departments.length > 0 && (
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-muted-foreground" />
            <select
              value={departmentFilter}
              onChange={(e) => setDepartmentFilter(e.target.value)}
              className="bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-sm text-foreground outline-none"
            >
              <option value="all">All Departments</option>
              {departments.map((dept) => (
                <option key={dept} value={dept}>{dept}</option>
              ))}
            </select>
          </div>
        )}
      </div>

      {/* Table */}
      {filtered.length === 0 ? (
        <EmptyState
          icon={Users}
          title="No shift assignments"
          description="Assign employees to shifts to see them here"
        />
      ) : (
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider px-5 py-3">
                    Employee
                  </th>
                  <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider px-5 py-3">
                    Shift
                  </th>
                  <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider px-5 py-3">
                    Start Date
                  </th>
                  <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider px-5 py-3">
                    End Date
                  </th>
                  <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider px-5 py-3">
                    Type
                  </th>
                  <th className="text-right text-xs font-medium text-muted-foreground uppercase tracking-wider px-5 py-3">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((assignment) => (
                  <tr
                    key={assignment.id}
                    className="border-b border-white/5 hover:bg-white/5 transition-all duration-200"
                  >
                    <td className="px-5 py-3.5">
                      <span className="text-sm font-medium text-foreground">
                        {assignment.employeeName}
                      </span>
                    </td>
                    <td className="px-5 py-3.5">
                      <span className="inline-flex items-center px-2 py-0.5 text-xs font-medium bg-module-erp/10 text-module-erp rounded-md border border-module-erp/20">
                        {assignment.shiftTypeName}
                      </span>
                    </td>
                    <td className="px-5 py-3.5 text-sm text-muted-foreground">
                      {assignment.startDate}
                    </td>
                    <td className="px-5 py-3.5 text-sm text-muted-foreground">
                      {assignment.endDate || '—'}
                    </td>
                    <td className="px-5 py-3.5">
                      {assignment.isRotating ? (
                        <span className="px-2 py-0.5 text-[10px] font-medium bg-amber-500/10 text-amber-400 rounded-md border border-amber-500/15">
                          Rotating ({assignment.rotationFrequency})
                        </span>
                      ) : (
                        <span className="text-xs text-muted-foreground">Fixed</span>
                      )}
                    </td>
                    <td className="px-5 py-3.5 text-right">
                      <div className="flex items-center justify-end gap-1">
                        {onEdit && (
                          <button
                            onClick={() => onEdit(assignment)}
                            className="p-1.5 rounded-lg hover:bg-white/10 text-muted-foreground hover:text-foreground transition-all duration-200"
                            aria-label="Edit assignment"
                          >
                            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                              <path d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                          </button>
                        )}
                        {onRemove && (
                          <button
                            onClick={() => onRemove(assignment.id)}
                            className="p-1.5 rounded-lg hover:bg-red-500/10 text-muted-foreground hover:text-red-400 transition-all duration-200"
                            aria-label="Remove assignment"
                          >
                            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                              <path d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </button>
                        )}
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
