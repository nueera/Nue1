'use client';

import { useState } from 'react';
import { CheckCircle2, XCircle, MessageSquare, AlertTriangle, DollarSign } from 'lucide-react';
import type { TravelRequest } from '../types';
import { fmtExpenseAmount } from '../expense.utils';
import { EmptyState } from '../../../../shared/components/empty-state';

interface TravelApprovalProps {
  pendingRequests: TravelRequest[];
  budgetLimit?: number;
  onApprove?: (id: string, comment?: string) => void;
  onReject?: (id: string, comment: string) => void;
  isLoading?: boolean;
}

export function TravelApproval({ pendingRequests, budgetLimit, onApprove, onReject, isLoading }: TravelApprovalProps) {
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
            <div className="h-4 w-48 bg-white/10 rounded mb-3" />
            <div className="h-3 w-64 bg-white/10 rounded" />
          </div>
        ))}
      </div>
    );
  }

  if (pendingRequests.length === 0) {
    return <EmptyState icon={CheckCircle2} title="All caught up!" description="No pending travel requests to review" />;
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-foreground">
          Pending Travel Approvals
          <span className="ml-2 px-2 py-0.5 text-[10px] font-medium bg-amber-500/10 text-amber-400 rounded-full">
            {pendingRequests.length}
          </span>
        </h3>
      </div>

      {pendingRequests.map((req) => {
        const isProcessing = processingId === req.id;
        const overBudget = budgetLimit ? req.estimatedCost > budgetLimit : false;

        return (
          <div
            key={req.id}
            className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-5 hover:bg-white/[0.07] transition-all duration-200"
          >
            <div className="flex items-start justify-between gap-4 mb-3">
              <div>
                <h4 className="text-sm font-semibold text-foreground">{req.employeeName}</h4>
                <p className="text-xs text-muted-foreground mt-0.5">{req.purpose}</p>
              </div>
              <div className="text-right">
                <p className="text-lg font-bold text-foreground">{fmtExpenseAmount(req.estimatedCost)}</p>
                {overBudget && (
                  <div className="flex items-center gap-1 text-red-400">
                    <AlertTriangle className="h-3 w-3" />
                    <span className="text-[10px] font-medium">Over Budget</span>
                  </div>
                )}
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2 mb-4">
              <span className="flex items-center gap-1 px-2 py-0.5 text-[10px] bg-white/5 border border-white/10 rounded-md text-foreground">
                📍 {req.destination}
              </span>
              <span className="text-[10px] text-muted-foreground">
                {req.startDate} → {req.endDate}
              </span>
              <span className="px-2 py-0.5 text-[10px] bg-white/5 border border-white/10 rounded-md text-foreground">
                {req.travelMode}
              </span>
              {req.accommodationRequired && (
                <span className="px-2 py-0.5 text-[10px] bg-purple-500/10 text-purple-400 rounded-md border border-purple-500/15">
                  Accommodation
                </span>
              )}
              {req.advanceRequired && req.advanceAmount && (
                <span className="px-2 py-0.5 text-[10px] bg-amber-500/10 text-amber-400 rounded-md border border-amber-500/15">
                  Advance: {fmtExpenseAmount(req.advanceAmount)}
                </span>
              )}
            </div>

            {/* Comment */}
            <div className="space-y-2 mb-4">
              <textarea
                value={commentMap[req.id] || ''}
                onChange={(e) => setComment(req.id, e.target.value)}
                placeholder="Add a comment (required for rejection)..."
                rows={2}
                className="w-full bg-white/5 backdrop-blur-md border border-white/10 rounded-xl px-3 py-2 text-xs text-foreground placeholder:text-muted-foreground/50 outline-none focus:border-module-erp/50 transition-all duration-200 resize-none"
              />
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2">
              {onApprove && (
                <button
                  onClick={() => handleApprove(req.id)}
                  disabled={isProcessing}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-500 text-white text-xs font-medium hover:bg-emerald-600 press-scale transition-all duration-200 disabled:opacity-50"
                >
                  <CheckCircle2 className="h-3.5 w-3.5" />
                  Approve
                </button>
              )}
              {onReject && (
                <button
                  onClick={() => handleReject(req.id)}
                  disabled={isProcessing || !commentMap[req.id]?.trim()}
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
