'use client';

import { useState } from 'react';
import { Landmark, Edit2, Trash2, Percent, DollarSign, Calendar } from 'lucide-react';
import type { LoanType } from '../types';
import { REPAYMENT_FREQUENCIES, LOAN_STATUS_LABELS } from '../constants';
import { ConfirmDialog } from '../../../../shared/components/confirm-dialog';
import { EmptyState } from '../../../../shared/components/empty-state';

interface LoanTypeListProps {
  data: LoanType[];
  isLoading?: boolean;
  onEdit?: (loanType: LoanType) => void;
  onDelete?: (id: string) => void;
  onToggleActive?: (id: string) => void;
}

export function LoanTypeList({ data, isLoading, onEdit, onDelete, onToggleActive }: LoanTypeListProps) {
  const [deleteId, setDeleteId] = useState<string | null>(null);

  if (isLoading) {
    return (
      <div className="space-y-3">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-5 animate-pulse">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <div className="h-4 w-36 bg-white/10 rounded" />
                <div className="h-3 w-56 bg-white/10 rounded" />
              </div>
              <div className="h-6 w-16 bg-white/10 rounded" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (data.length === 0) {
    return <EmptyState icon={Landmark} title="No loan types" description="Create loan types for employees to apply" />;
  }

  return (
    <>
      <div className="space-y-3">
        {data.map((lt) => (
          <div
            key={lt.id}
            className={`bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-5 hover:bg-white/10 transition-all duration-200 group ${
              !lt.isActive ? 'opacity-50' : ''
            }`}
          >
            <div className="flex items-start justify-between">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="text-sm font-semibold text-foreground">{lt.name}</h4>
                  {!lt.isActive && (
                    <span className="px-1.5 py-0.5 text-[9px] font-medium bg-zinc-500/10 text-zinc-400 rounded border border-zinc-500/15">
                      Inactive
                    </span>
                  )}
                </div>
                <p className="text-xs text-muted-foreground mb-3">{lt.description}</p>
                <div className="flex flex-wrap items-center gap-3 text-[10px] text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Percent className="h-3 w-3" />
                    {lt.interestRate}% p.a.
                  </span>
                  <span className="flex items-center gap-1">
                    <DollarSign className="h-3 w-3" />
                    Max ₹{lt.maxAmount.toLocaleString('en-IN')}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    Max {lt.maxTenureMonths} months
                  </span>
                  <span>Repayment: {lt.repaymentFrequency}</span>
                  {lt.processingFee && <span>Fee: ₹{lt.processingFee}</span>}
                  {lt.requiresGuarantor && (
                    <span className="px-1.5 py-0.5 text-[9px] bg-amber-500/10 text-amber-400 rounded border border-amber-500/15">
                      Guarantor Required
                    </span>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                {onToggleActive && (
                  <button
                    onClick={() => onToggleActive(lt.id)}
                    className="px-2.5 py-1 text-[10px] font-medium bg-white/5 border border-white/10 rounded-lg text-muted-foreground hover:bg-white/10 transition-all duration-200"
                  >
                    {lt.isActive ? 'Deactivate' : 'Activate'}
                  </button>
                )}
                {onEdit && (
                  <button
                    onClick={() => onEdit(lt)}
                    className="p-2 rounded-lg hover:bg-white/10 text-muted-foreground hover:text-foreground transition-all duration-200"
                    aria-label="Edit"
                  >
                    <Edit2 className="h-4 w-4" />
                  </button>
                )}
                {onDelete && (
                  <button
                    onClick={() => setDeleteId(lt.id)}
                    className="p-2 rounded-lg hover:bg-red-500/10 text-muted-foreground hover:text-red-400 transition-all duration-200"
                    aria-label="Delete"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      <ConfirmDialog
        open={!!deleteId}
        onOpenChange={(open) => !open && setDeleteId(null)}
        title="Delete Loan Type"
        description="Are you sure you want to delete this loan type? This action cannot be undone."
        confirmLabel="Delete"
        variant="destructive"
        onConfirm={() => {
          if (deleteId && onDelete) onDelete(deleteId);
          setDeleteId(null);
        }}
      />
    </>
  );
}
