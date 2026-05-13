'use client';

import { useState } from 'react';
import { CheckCircle2, XCircle, MessageSquare, Filter } from 'lucide-react';
import type { ExpenseClaim } from '../types';
import { fmtExpenseAmount } from '../expense.utils';
import { EXPENSE_STATUS_LABELS } from '../constants';
import { EmptyState } from '../../../../shared/components/empty-state';

interface ExpenseApprovalProps {
  pendingClaims: ExpenseClaim[];
  onApprove?: (id: string, comment?: string) => void;
  onReject?: (id: string, comment: string) => void;
  isLoading?: boolean;
}

export function ExpenseApproval({ pendingClaims, onApprove, onReject, isLoading }: ExpenseApprovalProps) {
  const [commentMap, setCommentMap] = useState<Record<string, string>>({});
  const [processingId, setProcessingId] = useState<string | null>(null);

  const setComment = (id: string, value: string) => {
    setCommentMap((prev) => ({ ...prev, [id]: value }));
  };

  const handleApprove = (id: string) => {
    setProcessingId(id);
    onApprove?.(id, commentMap[id]);
  };

  const handleReject = (id: string) => {
    if (!commentMap[id]?.trim()) return;
    setProcessingId(id);
    onReject?.(id, commentMap[id]);
  };

  if (isLoading) {
    return (
      <div className="space-y-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-5 animate-pulse">
            <div className="h-4 w-40 bg-white/10 rounded mb-3" />
            <div className="h-3 w-64 bg-white/10 rounded mb-4" />
            <div className="h-20 bg-white/10 rounded" />
          </div>
        ))}
      </div>
    );
  }

  if (pendingClaims.length === 0) {
    return (
      <EmptyState
        icon={CheckCircle2}
        title="All caught up!"
        description="No pending expense claims to review"
      />
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-foreground">
          Pending Approvals
          <span className="ml-2 px-2 py-0.5 text-[10px] font-medium bg-amber-500/10 text-amber-400 rounded-full">
            {pendingClaims.length}
          </span>
        </h3>
      </div>

      {pendingClaims.map((claim) => {
        const isProcessing = processingId === claim.id;
        return (
          <div
            key={claim.id}
            className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-5 hover:bg-white/[0.07] transition-all duration-200"
          >
            {/* Claim header */}
            <div className="flex items-start justify-between gap-4 mb-3">
              <div>
                <h4 className="text-sm font-semibold text-foreground">{claim.employeeName}</h4>
                <div className="flex items-center gap-2 mt-1">
                  <span className="px-2 py-0.5 text-[10px] bg-white/5 border border-white/10 rounded-md text-foreground">
                    {claim.category}
                  </span>
                  <span className="text-[10px] text-muted-foreground">{claim.date}</span>
                </div>
              </div>
              <p className="text-lg font-bold text-foreground">{fmtExpenseAmount(claim.amount)}</p>
            </div>

            <p className="text-xs text-muted-foreground mb-4 line-clamp-2">{claim.description}</p>

            {claim.receiptUrl && (
              <div className="flex items-center gap-2 mb-4 px-3 py-2 bg-white/[0.03] rounded-lg border border-white/5">
                <svg className="h-3.5 w-3.5 text-muted-foreground/50" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                </svg>
                <a
                  href={claim.receiptUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-module-erp hover:underline"
                >
                  View Receipt
                </a>
              </div>
            )}

            {/* Comment */}
            <div className="space-y-2 mb-4">
              <div className="flex items-center gap-1.5">
                <MessageSquare className="h-3 w-3 text-muted-foreground/50" />
                <span className="text-[10px] text-muted-foreground uppercase tracking-wider">Comment</span>
              </div>
              <textarea
                value={commentMap[claim.id] || ''}
                onChange={(e) => setComment(claim.id, e.target.value)}
                placeholder="Add a comment (required for rejection)..."
                rows={2}
                className="w-full bg-white/5 backdrop-blur-md border border-white/10 rounded-xl px-3 py-2 text-xs text-foreground placeholder:text-muted-foreground/50 outline-none focus:border-module-erp/50 transition-all duration-200 resize-none"
              />
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2">
              {onApprove && (
                <button
                  onClick={() => handleApprove(claim.id)}
                  disabled={isProcessing}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-500 text-white text-xs font-medium hover:bg-emerald-600 press-scale transition-all duration-200 disabled:opacity-50"
                >
                  <CheckCircle2 className="h-3.5 w-3.5" />
                  Approve
                </button>
              )}
              {onReject && (
                <button
                  onClick={() => handleReject(claim.id)}
                  disabled={isProcessing || !commentMap[claim.id]?.trim()}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-medium hover:bg-red-500/20 transition-all duration-200 disabled:opacity-50"
                >
                  <XCircle className="h-3.5 w-3.5" />
                  Reject
                </button>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
