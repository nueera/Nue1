'use client';

import { useState } from 'react';
import { ArrowRight, CheckCircle2, XCircle, Clock } from 'lucide-react';
import type { ShiftRequest } from '../types';
import { SHIFT_REQUEST_STATUSES } from '../constants';
import { StatusBadge } from '../../../../shared/components/status-badge';
import { EmptyState } from '../../../../shared/components/empty-state';

interface ShiftRequestListProps {
  data: ShiftRequest[];
  isLoading?: boolean;
  onApprove?: (id: string) => void;
  onReject?: (id: string) => void;
}

const STATUS_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  pending: Clock,
  approved: CheckCircle2,
  rejected: XCircle,
};

export function ShiftRequestList({ data, isLoading, onApprove, onReject }: ShiftRequestListProps) {
  const [statusFilter, setStatusFilter] = useState<string>('All');

  const filtered = statusFilter === 'All'
    ? data
    : data.filter((r) => r.status === statusFilter);

  if (isLoading) {
    return (
      <div className="space-y-3">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-5 animate-pulse">
            <div className="h-4 w-40 bg-white/10 rounded mb-2" />
            <div className="h-3 w-64 bg-white/10 rounded" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Status Filter */}
      <div className="flex items-center gap-2">
        {SHIFT_REQUEST_STATUSES.map((status) => (
          <button
            key={status}
            onClick={() => setStatusFilter(status)}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition-all duration-200 ${
              statusFilter === status
                ? 'bg-module-erp/10 border-module-erp/30 text-module-erp'
                : 'bg-white/5 border-white/10 text-muted-foreground hover:bg-white/10'
            }`}
          >
            {status === 'All' ? 'All' : status.charAt(0).toUpperCase() + status.slice(1)}
          </button>
        ))}
      </div>

      {/* List */}
      {filtered.length === 0 ? (
        <EmptyState
          icon={Clock}
          title="No shift requests"
          description="There are no shift change requests matching the current filter"
        />
      ) : (
        <div className="space-y-3">
          {filtered.map((request) => {
            const StatusIcon = STATUS_ICONS[request.status] || Clock;
            return (
              <div
                key={request.id}
                className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-5 hover:bg-white/10 transition-all duration-200"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="text-sm font-semibold text-foreground truncate">
                        {request.employeeName}
                      </h4>
                      <StatusBadge status={request.status} />
                    </div>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground mt-2">
                      <span className="px-2 py-0.5 bg-white/5 rounded-md border border-white/10">
                        {request.currentShiftName}
                      </span>
                      <ArrowRight className="h-3 w-3 shrink-0" />
                      <span className="px-2 py-0.5 bg-module-erp/10 rounded-md border border-module-erp/20 text-module-erp">
                        {request.requestedShiftName}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-2 line-clamp-2">
                      {request.reason}
                    </p>
                    <div className="flex items-center gap-3 mt-2 text-[10px] text-muted-foreground/60">
                      <span>Effective: {request.startDate}</span>
                      {request.endDate && <span>Until: {request.endDate}</span>}
                      <span>Requested: {new Date(request.createdAt).toLocaleDateString()}</span>
                    </div>
                  </div>

                  {request.status === 'pending' && (
                    <div className="flex items-center gap-2 shrink-0">
                      {onApprove && (
                        <button
                          onClick={() => onApprove(request.id)}
                          className="p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 hover:bg-emerald-500/20 transition-all duration-200"
                          aria-label="Approve request"
                        >
                          <CheckCircle2 className="h-4 w-4" />
                        </button>
                      )}
                      {onReject && (
                        <button
                          onClick={() => onReject(request.id)}
                          className="p-2 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500/20 transition-all duration-200"
                          aria-label="Reject request"
                        >
                          <XCircle className="h-4 w-4" />
                        </button>
                      )}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
