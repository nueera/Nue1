'use client';

import { useState } from 'react';
import { Plane, Calendar, MapPin, Filter } from 'lucide-react';
import type { TravelRequest } from '../types';
import { fmtExpenseAmount } from '../expense.utils';
import { TRAVEL_MODES } from '../constants';
import { EmptyState } from '../../../../shared/components/empty-state';

interface TravelRequestTableProps {
  data: TravelRequest[];
  isLoading?: boolean;
  onView?: (request: TravelRequest) => void;
  onApprove?: (id: string) => void;
  onReject?: (id: string) => void;
}

const STATUS_COLORS: Record<string, string> = {
  pending: 'bg-amber-500/10 text-amber-400 border-amber-500/15',
  approved: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/15',
  rejected: 'bg-red-500/10 text-red-400 border-red-500/15',
  completed: 'bg-blue-500/10 text-blue-400 border-blue-500/15',
};

export function TravelRequestTable({ data, isLoading, onView, onApprove, onReject }: TravelRequestTableProps) {
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const filtered = statusFilter === 'all'
    ? data
    : data.filter((r) => r.status === statusFilter);

  if (isLoading) {
    return (
      <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="p-4 border-b border-white/5 animate-pulse flex items-center gap-4">
            <div className="h-8 w-8 bg-white/10 rounded-lg" />
            <div className="flex-1 space-y-2">
              <div className="h-3 w-40 bg-white/10 rounded" />
              <div className="h-2 w-64 bg-white/10 rounded" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Filters */}
      <div className="flex items-center gap-2">
        {['all', 'pending', 'approved', 'rejected', 'completed'].map((status) => (
          <button
            key={status}
            onClick={() => setStatusFilter(status)}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition-all duration-200 ${
              statusFilter === status
                ? 'bg-module-erp/10 border-module-erp/30 text-module-erp'
                : 'bg-white/5 border-white/10 text-muted-foreground hover:bg-white/10'
            }`}
          >
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </button>
        ))}
      </div>

      {/* Table */}
      {filtered.length === 0 ? (
        <EmptyState icon={Plane} title="No travel requests" description="Submit a travel request to get started" />
      ) : (
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider px-5 py-3">Employee</th>
                  <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider px-5 py-3">Destination</th>
                  <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider px-5 py-3">Dates</th>
                  <th className="text-right text-xs font-medium text-muted-foreground uppercase tracking-wider px-5 py-3">Est. Cost</th>
                  <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider px-5 py-3">Mode</th>
                  <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider px-5 py-3">Status</th>
                  <th className="text-right text-xs font-medium text-muted-foreground uppercase tracking-wider px-5 py-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((req) => (
                  <tr key={req.id} className="border-b border-white/5 hover:bg-white/5 transition-all duration-200">
                    <td className="px-5 py-3.5 text-sm font-medium text-foreground">{req.employeeName}</td>
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-1.5">
                        <MapPin className="h-3 w-3 text-muted-foreground/50" />
                        <span className="text-sm text-foreground">{req.destination}</span>
                      </div>
                    </td>
                    <td className="px-5 py-3.5 text-sm text-muted-foreground">
                      {req.startDate} → {req.endDate}
                    </td>
                    <td className="px-5 py-3.5 text-right text-sm font-semibold text-foreground">
                      {fmtExpenseAmount(req.estimatedCost)}
                    </td>
                    <td className="px-5 py-3.5">
                      <span className="px-2 py-0.5 text-[10px] bg-white/5 border border-white/10 rounded-md text-foreground">
                        {req.travelMode}
                      </span>
                    </td>
                    <td className="px-5 py-3.5">
                      <span className={`inline-flex items-center px-2 py-0.5 text-[10px] font-medium rounded-md border ${STATUS_COLORS[req.status] || ''}`}>
                        {req.status}
                      </span>
                    </td>
                    <td className="px-5 py-3.5 text-right">
                      {onView && (
                        <button
                          onClick={() => onView(req)}
                          className="text-xs text-module-erp hover:underline"
                        >
                          View
                        </button>
                      )}
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
