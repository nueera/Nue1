'use client';

import { useState } from 'react';
import { Landmark, DollarSign, Clock, Filter } from 'lucide-react';
import type { LoanApplication, LoanApplicationStatus } from '../types';
import { LOAN_APPLICATION_STATUSES, LOAN_STATUS_LABELS } from '../constants';
import { calcEMI } from '../loan.utils';
import { EmptyState } from '../../../../shared/components/empty-state';

interface LoanApplicationTableProps {
  data: LoanApplication[];
  isLoading?: boolean;
  onView?: (application: LoanApplication) => void;
  onApprove?: (id: string) => void;
  onReject?: (id: string) => void;
}

const STATUS_COLORS: Record<string, string> = {
  pending: 'bg-amber-500/10 text-amber-400 border-amber-500/15',
  approved: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/15',
  disbursed: 'bg-blue-500/10 text-blue-400 border-blue-500/15',
  rejected: 'bg-red-500/10 text-red-400 border-red-500/15',
  closed: 'bg-zinc-500/10 text-zinc-400 border-zinc-500/15',
  'in-repayment': 'bg-cyan-500/10 text-cyan-400 border-cyan-500/15',
  defaulted: 'bg-red-500/10 text-red-400 border-red-500/15',
};

export function LoanApplicationTable({ data, isLoading, onView, onApprove, onReject }: LoanApplicationTableProps) {
  const [statusFilter, setStatusFilter] = useState<string>('All');

  const filtered = statusFilter === 'All'
    ? data
    : data.filter((a) => a.status === statusFilter);

  if (isLoading) {
    return (
      <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="p-4 border-b border-white/5 animate-pulse flex items-center gap-4">
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
        {LOAN_APPLICATION_STATUSES.map((status) => (
          <button
            key={status}
            onClick={() => setStatusFilter(status)}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg border whitespace-nowrap transition-all duration-200 ${
              statusFilter === status
                ? 'bg-module-erp/10 border-module-erp/30 text-module-erp'
                : 'bg-white/5 border-white/10 text-muted-foreground hover:bg-white/10'
            }`}
          >
            {status === 'All' ? 'All' : LOAN_STATUS_LABELS[status] || status}
          </button>
        ))}
      </div>

      {/* Table */}
      {filtered.length === 0 ? (
        <EmptyState icon={Landmark} title="No loan applications" description="Employees can apply for loans from available types" />
      ) : (
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider px-5 py-3">Employee</th>
                  <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider px-5 py-3">Loan Type</th>
                  <th className="text-right text-xs font-medium text-muted-foreground uppercase tracking-wider px-5 py-3">Amount</th>
                  <th className="text-center text-xs font-medium text-muted-foreground uppercase tracking-wider px-5 py-3">Tenure</th>
                  <th className="text-right text-xs font-medium text-muted-foreground uppercase tracking-wider px-5 py-3">EMI</th>
                  <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider px-5 py-3">Status</th>
                  <th className="text-right text-xs font-medium text-muted-foreground uppercase tracking-wider px-5 py-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((app) => (
                  <tr key={app.id} className="border-b border-white/5 hover:bg-white/5 transition-all duration-200">
                    <td className="px-5 py-3.5 text-sm font-medium text-foreground">{app.employeeName}</td>
                    <td className="px-5 py-3.5 text-sm text-muted-foreground">{app.loanTypeName}</td>
                    <td className="px-5 py-3.5 text-right text-sm font-semibold text-foreground">
                      ₹{app.amount.toLocaleString('en-IN')}
                    </td>
                    <td className="px-5 py-3.5 text-center text-sm text-muted-foreground">
                      {app.tenureMonths} mo
                    </td>
                    <td className="px-5 py-3.5 text-right text-sm text-foreground">
                      {app.emi ? `₹${app.emi.toLocaleString('en-IN')}` : '—'}
                    </td>
                    <td className="px-5 py-3.5">
                      <span className={`inline-flex items-center px-2 py-0.5 text-[10px] font-medium rounded-md border ${STATUS_COLORS[app.status] || ''}`}>
                        {LOAN_STATUS_LABELS[app.status] || app.status}
                      </span>
                    </td>
                    <td className="px-5 py-3.5 text-right">
                      <div className="flex items-center justify-end gap-1">
                        {onView && (
                          <button onClick={() => onView(app)} className="text-xs text-module-erp hover:underline">View</button>
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
