'use client';

import { useState } from 'react';
import { Wallet, Calendar, ArrowRight } from 'lucide-react';
import type { EmployeeAdvance } from '../types';
import { fmtExpenseAmount } from '../expense.utils';
import { ADVANCE_STATUSES } from '../constants';
import { EmptyState } from '../../../../shared/components/empty-state';

interface EmployeeAdvanceTableProps {
  data: EmployeeAdvance[];
  isLoading?: boolean;
  onView?: (advance: EmployeeAdvance) => void;
  onSettle?: (advance: EmployeeAdvance) => void;
}

const STATUS_COLORS: Record<string, string> = {
  pending: 'bg-amber-500/10 text-amber-400 border-amber-500/15',
  approved: 'bg-blue-500/10 text-blue-400 border-blue-500/15',
  disbursed: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/15',
  settled: 'bg-zinc-500/10 text-zinc-400 border-zinc-500/15',
};

const STATUS_LABELS: Record<string, string> = {
  pending: 'Pending',
  approved: 'Approved',
  disbursed: 'Disbursed',
  settled: 'Settled',
};

export function EmployeeAdvanceTable({ data, isLoading, onView, onSettle }: EmployeeAdvanceTableProps) {
  const [statusFilter, setStatusFilter] = useState<string>('All');

  const filtered = statusFilter === 'All'
    ? data
    : data.filter((a) => a.status === statusFilter);

  if (isLoading) {
    return (
      <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="p-4 border-b border-white/5 animate-pulse flex items-center gap-4">
            <div className="h-8 w-8 bg-white/10 rounded-lg" />
            <div className="flex-1 space-y-2">
              <div className="h-3 w-32 bg-white/10 rounded" />
              <div className="h-2 w-48 bg-white/10 rounded" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Filter */}
      <div className="flex items-center gap-2 overflow-x-auto">
        {ADVANCE_STATUSES.map((status) => (
          <button
            key={status}
            onClick={() => setStatusFilter(status)}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg border whitespace-nowrap transition-all duration-200 ${
              statusFilter === status
                ? 'bg-module-erp/10 border-module-erp/30 text-module-erp'
                : 'bg-white/5 border-white/10 text-muted-foreground hover:bg-white/10'
            }`}
          >
            {status === 'All' ? 'All' : STATUS_LABELS[status] || status}
          </button>
        ))}
      </div>

      {/* Table */}
      {filtered.length === 0 ? (
        <EmptyState icon={Wallet} title="No advances" description="No employee advances match the current filter" />
      ) : (
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider px-5 py-3">Employee</th>
                  <th className="text-right text-xs font-medium text-muted-foreground uppercase tracking-wider px-5 py-3">Amount</th>
                  <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider px-5 py-3">Purpose</th>
                  <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider px-5 py-3">Settle By</th>
                  <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider px-5 py-3">Status</th>
                  <th className="text-right text-xs font-medium text-muted-foreground uppercase tracking-wider px-5 py-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((advance) => (
                  <tr key={advance.id} className="border-b border-white/5 hover:bg-white/5 transition-all duration-200">
                    <td className="px-5 py-3.5 text-sm font-medium text-foreground">{advance.employeeName}</td>
                    <td className="px-5 py-3.5 text-right text-sm font-semibold text-foreground">
                      {fmtExpenseAmount(advance.amount)}
                    </td>
                    <td className="px-5 py-3.5 text-sm text-muted-foreground max-w-48 truncate">{advance.reason}</td>
                    <td className="px-5 py-3.5 text-sm text-muted-foreground">{advance.expectedSettlementDate}</td>
                    <td className="px-5 py-3.5">
                      <span className={`inline-flex items-center px-2 py-0.5 text-[10px] font-medium rounded-md border ${STATUS_COLORS[advance.status] || ''}`}>
                        {STATUS_LABELS[advance.status] || advance.status}
                      </span>
                    </td>
                    <td className="px-5 py-3.5 text-right">
                      <div className="flex items-center justify-end gap-1">
                        {onView && (
                          <button
                            onClick={() => onView(advance)}
                            className="p-1.5 rounded-lg hover:bg-white/10 text-muted-foreground hover:text-foreground transition-all duration-200 text-xs"
                          >
                            View
                          </button>
                        )}
                        {advance.status === 'disbursed' && onSettle && (
                          <button
                            onClick={() => onSettle(advance)}
                            className="p-1.5 rounded-lg hover:bg-emerald-500/10 text-emerald-400 text-xs transition-all duration-200"
                          >
                            Settle
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
