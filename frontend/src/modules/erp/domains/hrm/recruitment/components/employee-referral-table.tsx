'use client';

import { useState } from 'react';
import { UserPlus, Gift, Filter } from 'lucide-react';
import type { Referral } from '../types';
import { fmtExpenseAmount } from '../../expenses/expense.utils';
import { EmptyState } from '../../../../shared/components/empty-state';

interface EmployeeReferralTableProps {
  data: Referral[];
  isLoading?: boolean;
  onView?: (referral: Referral) => void;
}

const STATUS_COLORS: Record<string, string> = {
  pending: 'bg-amber-500/10 text-amber-400 border-amber-500/15',
  contacted: 'bg-blue-500/10 text-blue-400 border-blue-500/15',
  interviewed: 'bg-purple-500/10 text-purple-400 border-purple-500/15',
  hired: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/15',
  rejected: 'bg-red-500/10 text-red-400 border-red-500/15',
};

export function EmployeeReferralTable({ data, isLoading, onView }: EmployeeReferralTableProps) {
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
              <div className="h-2 w-32 bg-white/10 rounded" />
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
        {['all', 'pending', 'contacted', 'interviewed', 'hired', 'rejected'].map((status) => (
          <button
            key={status}
            onClick={() => setStatusFilter(status)}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg border whitespace-nowrap transition-all duration-200 ${
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
        <EmptyState icon={UserPlus} title="No referrals" description="Refer a candidate to earn referral bonuses" />
      ) : (
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider px-5 py-3">Referrer</th>
                  <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider px-5 py-3">Candidate</th>
                  <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider px-5 py-3">Job</th>
                  <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider px-5 py-3">Status</th>
                  <th className="text-right text-xs font-medium text-muted-foreground uppercase tracking-wider px-5 py-3">Bonus</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((ref) => (
                  <tr
                    key={ref.id}
                    onClick={() => onView?.(ref)}
                    className="border-b border-white/5 hover:bg-white/5 transition-all duration-200 cursor-pointer"
                  >
                    <td className="px-5 py-3.5 text-sm text-foreground">{ref.referrerName}</td>
                    <td className="px-5 py-3.5">
                      <p className="text-sm font-medium text-foreground">{ref.candidateName}</p>
                      <p className="text-[10px] text-muted-foreground">{ref.candidateEmail}</p>
                    </td>
                    <td className="px-5 py-3.5 text-sm text-muted-foreground">{ref.jobTitle}</td>
                    <td className="px-5 py-3.5">
                      <span className={`inline-flex items-center px-2 py-0.5 text-[10px] font-medium rounded-md border ${STATUS_COLORS[ref.status] || ''}`}>
                        {ref.status}
                      </span>
                    </td>
                    <td className="px-5 py-3.5 text-right">
                      {ref.bonusAmount ? (
                        <div>
                          <span className="text-sm font-semibold text-foreground">
                            ₹{ref.bonusAmount.toLocaleString('en-IN')}
                          </span>
                          {ref.bonusPaid && (
                            <span className="ml-1 text-[9px] text-emerald-400">Paid</span>
                          )}
                        </div>
                      ) : (
                        <span className="text-xs text-muted-foreground/50">—</span>
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
