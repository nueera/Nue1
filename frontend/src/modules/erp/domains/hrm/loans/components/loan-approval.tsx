'use client';

import { useState } from 'react';
import { CheckCircle2, XCircle, MessageSquare, Calculator, AlertTriangle } from 'lucide-react';
import type { LoanApplication } from '../types';
import { calcEMI, calcInterest } from '../loan.utils';
import { LOAN_STATUS_LABELS } from '../constants';

interface LoanApprovalProps {
  applications: LoanApplication[];
  onApprove?: (id: string, data: { comments?: string; approvedAmount?: number; disbursalDate?: string }) => void;
  onReject?: (id: string, comment: string) => void;
  isLoading?: boolean;
}

export function LoanApproval({ applications, onApprove, onReject, isLoading }: LoanApprovalProps) {
  const [commentMap, setCommentMap] = useState<Record<string, string>>({});
  const [approvedAmountMap, setApprovedAmountMap] = useState<Record<string, number>>({});
  const [processingId, setProcessingId] = useState<string | null>(null);

  const pendingApps = applications.filter((a) => a.status === 'pending');

  const setComment = (id: string, value: string) => {
    setCommentMap((prev) => ({ ...prev, [id]: value }));
  };

  const setApprovedAmount = (id: string, value: number) => {
    setApprovedAmountMap((prev) => ({ ...prev, [id]: value }));
  };

  const handleApprove = (app: LoanApplication) => {
    setProcessingId(app.id);
    onApprove?.(app.id, {
      comments: commentMap[app.id],
      approvedAmount: approvedAmountMap[app.id] || undefined,
      disbursalDate: new Date().toISOString().split('T')[0],
    });
  };

  const handleReject = (id: string) => {
    if (!commentMap[id]?.trim()) return;
    setProcessingId(id);
    onReject?.(id, commentMap[id]);
  };

  if (pendingApps.length === 0) {
    return (
      <div className="py-12 text-center">
        <CheckCircle2 className="h-10 w-10 text-emerald-400/20 mx-auto mb-3" />
        <p className="text-sm text-muted-foreground">No pending loan applications</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h3 className="text-sm font-semibold text-foreground">
        Pending Loan Approvals
        <span className="ml-2 px-2 py-0.5 text-[10px] font-medium bg-amber-500/10 text-amber-400 rounded-full">{pendingApps.length}</span>
      </h3>

      {pendingApps.map((app) => {
        const isProcessing = processingId === app.id;
        const emiPreview = calcEMI(app.amount, app.interestRate, app.tenureMonths);
        const totalInterest = calcInterest(app.amount, app.interestRate, app.tenureMonths);
        const customApproved = approvedAmountMap[app.id];
        const effectiveEmi = customApproved ? calcEMI(customApproved, app.interestRate, app.tenureMonths) : emiPreview;

        return (
          <div key={app.id} className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-5 hover:bg-white/[0.07] transition-all duration-200">
            <div className="flex items-start justify-between gap-4 mb-3">
              <div>
                <h4 className="text-sm font-semibold text-foreground">{app.employeeName}</h4>
                <p className="text-xs text-muted-foreground">{app.loanTypeName} · {app.tenureMonths} months</p>
              </div>
              <p className="text-lg font-bold text-foreground">₹{app.amount.toLocaleString('en-IN')}</p>
            </div>

            <p className="text-xs text-muted-foreground mb-4">{app.purpose}</p>

            {/* EMI Preview */}
            <div className="bg-white/[0.03] border border-white/5 rounded-xl p-3 mb-4">
              <div className="flex items-center gap-2 mb-2">
                <Calculator className="h-3.5 w-3.5 text-module-erp" />
                <span className="text-[10px] text-module-erp font-medium uppercase tracking-wider">EMI Preview</span>
              </div>
              <div className="grid grid-cols-3 gap-2 text-center">
                <div>
                  <p className="text-[10px] text-muted-foreground">EMI</p>
                  <p className="text-xs font-semibold text-foreground">₹{effectiveEmi.toLocaleString('en-IN')}</p>
                </div>
                <div>
                  <p className="text-[10px] text-muted-foreground">Interest</p>
                  <p className="text-xs font-semibold text-amber-400">₹{totalInterest.toLocaleString('en-IN')}</p>
                </div>
                <div>
                  <p className="text-[10px] text-muted-foreground">Rate</p>
                  <p className="text-xs font-semibold text-foreground">{app.interestRate}%</p>
                </div>
              </div>
            </div>

            {/* Approved Amount Override */}
            <div className="space-y-2 mb-4">
              <label className="text-[10px] text-muted-foreground uppercase tracking-wider">Approved Amount (leave empty for full)</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground">₹</span>
                <input
                  type="number"
                  min={1}
                  max={app.amount}
                  value={customApproved || ''}
                  onChange={(e) => setApprovedAmount(app.id, Number(e.target.value))}
                  placeholder={`Max: ₹${app.amount.toLocaleString('en-IN')}`}
                  className="w-full bg-white/5 backdrop-blur-md border border-white/10 rounded-xl px-3 py-2 text-xs text-foreground placeholder:text-muted-foreground/50 outline-none focus:border-module-erp/50 transition-all duration-200 pl-7"
                />
              </div>
              {customApproved && customApproved < app.amount && (
                <div className="flex items-center gap-1 text-amber-400">
                  <AlertTriangle className="h-3 w-3" />
                  <span className="text-[10px]">Partial approval: ₹{customApproved.toLocaleString('en-IN')} of ₹{app.amount.toLocaleString('en-IN')}</span>
                </div>
              )}
            </div>

            {/* Comment */}
            <div className="space-y-2 mb-4">
              <textarea
                value={commentMap[app.id] || ''}
                onChange={(e) => setComment(app.id, e.target.value)}
                placeholder="Add a comment (required for rejection)..."
                rows={2}
                className="w-full bg-white/5 backdrop-blur-md border border-white/10 rounded-xl px-3 py-2 text-xs text-foreground placeholder:text-muted-foreground/50 outline-none focus:border-module-erp/50 transition-all duration-200 resize-none"
              />
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2">
              {onApprove && (
                <button onClick={() => handleApprove(app)} disabled={isProcessing} className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-500 text-white text-xs font-medium hover:bg-emerald-600 press-scale transition-all duration-200 disabled:opacity-50">
                  <CheckCircle2 className="h-3.5 w-3.5" />Approve
                </button>
              )}
              {onReject && (
                <button onClick={() => handleReject(app.id)} disabled={isProcessing || !commentMap[app.id]?.trim()} className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-medium hover:bg-red-500/20 transition-all duration-200 disabled:opacity-50">
                  <XCircle className="h-3.5 w-3.5" />Reject
                </button>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
