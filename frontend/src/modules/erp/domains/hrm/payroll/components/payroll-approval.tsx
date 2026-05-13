'use client';

import { useState } from 'react';
import { ShieldCheck, CheckCircle2, XCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { StatusBadge } from '../../../../shared/components/status-badge/status-badge';
import { EmptyState } from '../../../../shared/components/empty-state/empty-state';
import { fmtCurrency } from '../payroll.utils';
import type { PayrollRun } from '../types';

interface PayrollApprovalProps {
  pendingRuns: PayrollRun[];
  onApprove: (id: string) => void;
  onReject: (id: string, reason: string) => void;
  isLoading?: boolean;
  className?: string;
}

export function PayrollApproval({ pendingRuns, onApprove, onReject, isLoading, className }: PayrollApprovalProps) {
  const [rejectingId, setRejectingId] = useState<string | null>(null);
  const [rejectReason, setRejectReason] = useState('');

  if (pendingRuns.length === 0) {
    return (
      <div className={`bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 ${className || ''}`}>
        <EmptyState
          title="No pending approvals"
          description="All payroll runs have been reviewed"
        />
      </div>
    );
  }

  return (
    <div className={`bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-4 sm:p-6 space-y-4 ${className || ''}`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <ShieldCheck className="h-5 w-5 text-module-erp" strokeWidth={1.8} />
          <h3 className="font-semibold text-foreground text-base">Payroll Approval</h3>
        </div>
        <span className="text-xs px-2.5 py-1 rounded-full bg-amber-500/15 text-amber-500 font-medium">
          {pendingRuns.length} pending
        </span>
      </div>

      <div className="space-y-3 max-h-96 overflow-y-auto custom-scrollbar">
        {pendingRuns.map((run) => {
          const isRejecting = rejectingId === run.id;

          return (
            <div
              key={run.id}
              className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-4 space-y-3 hover:bg-white/10 transition-all duration-200"
            >
              {/* Header */}
              <div className="flex items-start justify-between">
                <div>
                  <p className="font-medium text-foreground text-sm">Payroll Run — {run.month}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {run.totalEmployees} employees
                  </p>
                </div>
                <StatusBadge status={run.status} />
              </div>

              {/* Summary */}
              <div className="grid grid-cols-3 gap-3">
                <div className="bg-white/5 rounded-lg p-2.5">
                  <p className="text-[10px] text-muted-foreground">Total Gross</p>
                  <p className="text-sm font-medium text-foreground">{fmtCurrency(run.totalGross)}</p>
                </div>
                <div className="bg-white/5 rounded-lg p-2.5">
                  <p className="text-[10px] text-muted-foreground">Total Deductions</p>
                  <p className="text-sm font-medium text-red-400">{fmtCurrency(run.totalDeductions)}</p>
                </div>
                <div className="bg-white/5 rounded-lg p-2.5">
                  <p className="text-[10px] text-muted-foreground">Total Net</p>
                  <p className="text-sm font-medium text-module-erp">{fmtCurrency(run.totalNet)}</p>
                </div>
              </div>

              {/* Reject reason */}
              {isRejecting && (
                <textarea
                  value={rejectReason}
                  onChange={(e) => setRejectReason(e.target.value)}
                  placeholder="Provide rejection reason (required)..."
                  rows={2}
                  className="w-full bg-red-500/5 border border-red-500/20 rounded-lg px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground/50 outline-none focus:border-red-500/50 transition-colors duration-200 resize-none"
                />
              )}

              {/* Actions */}
              <div className="flex items-center gap-2">
                {!isRejecting ? (
                  <>
                    <Button
                      size="sm"
                      onClick={() => onApprove(run.id)}
                      disabled={isLoading}
                      className="bg-emerald-600 hover:bg-emerald-700 text-white press-scale h-8"
                    >
                      <CheckCircle2 className="h-3.5 w-3.5 mr-1.5" strokeWidth={1.8} />
                      Approve
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => setRejectingId(run.id)}
                      disabled={isLoading}
                      className="border-red-500/30 text-red-500 hover:bg-red-500/10 press-scale h-8"
                    >
                      <XCircle className="h-3.5 w-3.5 mr-1.5" strokeWidth={1.8} />
                      Reject
                    </Button>
                  </>
                ) : (
                  <>
                    <Button
                      size="sm"
                      onClick={() => {
                        if (rejectReason.trim()) {
                          onReject(run.id, rejectReason.trim());
                          setRejectingId(null);
                          setRejectReason('');
                        }
                      }}
                      disabled={isLoading || !rejectReason.trim()}
                      className="bg-red-600 hover:bg-red-700 text-white press-scale h-8"
                    >
                      Confirm Reject
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => {
                        setRejectingId(null);
                        setRejectReason('');
                      }}
                      className="h-8"
                    >
                      Cancel
                    </Button>
                  </>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
