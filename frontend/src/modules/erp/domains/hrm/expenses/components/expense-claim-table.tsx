'use client';

import { useState } from 'react';
import { FileText, DollarSign, Calendar, MoreHorizontal, Eye, CheckCircle2, XCircle } from 'lucide-react';
import type { ExpenseClaim, ExpenseStatus } from '../types';
import { EXPENSE_STATUSES, EXPENSE_STATUS_LABELS } from '../constants';
import { fmtExpenseAmount } from '../expense.utils';
import { StatusBadge } from '../../../../shared/components/status-badge';
import { EmptyState } from '../../../../shared/components/empty-state';

interface ExpenseClaimTableProps {
  data: ExpenseClaim[];
  isLoading?: boolean;
  onView?: (claim: ExpenseClaim) => void;
  onApprove?: (id: string) => void;
  onReject?: (id: string) => void;
}

const STATUS_COLORS: Record<string, string> = {
  draft: 'bg-zinc-500/10 text-zinc-400 border-zinc-500/15',
  pending: 'bg-amber-500/10 text-amber-400 border-amber-500/15',
  approved: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/15',
  rejected: 'bg-red-500/10 text-red-400 border-red-500/15',
  paid: 'bg-blue-500/10 text-blue-400 border-blue-500/15',
};

export function ExpenseClaimTable({ data, isLoading, onView, onApprove, onReject }: ExpenseClaimTableProps) {
  const [statusFilter, setStatusFilter] = useState<string>('All');

  const filtered = statusFilter === 'All'
    ? data
    : data.filter((c) => c.status === statusFilter);

  if (isLoading) {
    return (
      <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="p-4 border-b border-white/5 animate-pulse flex items-center gap-4">
            <div className="h-8 w-8 bg-white/10 rounded-lg" />
            <div className="flex-1 space-y-2">
              <div className="h-3 w-40 bg-white/10 rounded" />
              <div className="h-2 w-24 bg-white/10 rounded" />
            </div>
            <div className="h-6 w-16 bg-white/10 rounded" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Status Filter */}
      <div className="flex items-center gap-2 overflow-x-auto">
        {EXPENSE_STATUSES.map((status) => (
          <button
            key={status}
            onClick={() => setStatusFilter(status)}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg border whitespace-nowrap transition-all duration-200 ${
              statusFilter === status
                ? 'bg-module-erp/10 border-module-erp/30 text-module-erp'
                : 'bg-white/5 border-white/10 text-muted-foreground hover:bg-white/10'
            }`}
          >
            {status === 'All' ? 'All' : EXPENSE_STATUS_LABELS[status] || status}
          </button>
        ))}
      </div>

      {/* Table */}
      {filtered.length === 0 ? (
        <EmptyState
          icon={FileText}
          title="No expense claims"
          description="Submit your first expense claim to get started"
        />
      ) : (
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider px-5 py-3">Employee</th>
                  <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider px-5 py-3">Category</th>
                  <th className="text-right text-xs font-medium text-muted-foreground uppercase tracking-wider px-5 py-3">Amount</th>
                  <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider px-5 py-3">Date</th>
                  <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider px-5 py-3">Status</th>
                  <th className="text-right text-xs font-medium text-muted-foreground uppercase tracking-wider px-5 py-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((claim) => (
                  <tr
                    key={claim.id}
                    className="border-b border-white/5 hover:bg-white/5 transition-all duration-200"
                  >
                    <td className="px-5 py-3.5">
                      <span className="text-sm font-medium text-foreground">{claim.employeeName}</span>
                    </td>
                    <td className="px-5 py-3.5">
                      <span className="inline-flex items-center px-2 py-0.5 text-xs bg-white/5 border border-white/10 rounded-md text-foreground">
                        {claim.category}
                      </span>
                    </td>
                    <td className="px-5 py-3.5 text-right">
                      <span className="text-sm font-semibold text-foreground">
                        {fmtExpenseAmount(claim.amount)}
                      </span>
                      {claim.isBillable && (
                        <span className="ml-1 text-[9px] text-emerald-400">Billable</span>
                      )}
                    </td>
                    <td className="px-5 py-3.5 text-sm text-muted-foreground">
                      {claim.date}
                    </td>
                    <td className="px-5 py-3.5">
                      <span className={`inline-flex items-center px-2 py-0.5 text-[10px] font-medium rounded-md border ${STATUS_COLORS[claim.status] || ''}`}>
                        {EXPENSE_STATUS_LABELS[claim.status] || claim.status}
                      </span>
                    </td>
                    <td className="px-5 py-3.5 text-right">
                      <div className="flex items-center justify-end gap-1">
                        {onView && (
                          <button
                            onClick={() => onView(claim)}
                            className="p-1.5 rounded-lg hover:bg-white/10 text-muted-foreground hover:text-foreground transition-all duration-200"
                            aria-label="View claim"
                          >
                            <Eye className="h-3.5 w-3.5" />
                          </button>
                        )}
                        {claim.status === 'pending' && onApprove && (
                          <button
                            onClick={() => onApprove(claim.id)}
                            className="p-1.5 rounded-lg hover:bg-emerald-500/10 text-muted-foreground hover:text-emerald-400 transition-all duration-200"
                            aria-label="Approve claim"
                          >
                            <CheckCircle2 className="h-3.5 w-3.5" />
                          </button>
                        )}
                        {claim.status === 'pending' && onReject && (
                          <button
                            onClick={() => onReject(claim.id)}
                            className="p-1.5 rounded-lg hover:bg-red-500/10 text-muted-foreground hover:text-red-400 transition-all duration-200"
                            aria-label="Reject claim"
                          >
                            <XCircle className="h-3.5 w-3.5" />
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
