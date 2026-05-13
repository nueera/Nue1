'use client';

import { useState } from 'react';
import { CheckCircle2, XCircle, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { StatusBadge } from '../../../../shared/components/status-badge/status-badge';
import { EmptyState } from '../../../../shared/components/empty-state/empty-state';
import type { LeaveRequest } from '../types';

interface LeaveApprovalProps {
  pendingRequests: LeaveRequest[];
  onApprove: (id: string, comments?: string) => void;
  onReject: (id: string, reason: string) => void;
  isLoading?: boolean;
}

const LEAVE_TYPE_LABELS: Record<string, string> = {
  annual: 'Annual Leave',
  sick: 'Sick Leave',
  personal: 'Personal Leave',
  maternity: 'Maternity Leave',
  paternity: 'Paternity Leave',
  unpaid: 'Unpaid Leave',
};

export function LeaveApproval({ pendingRequests, onApprove, onReject, isLoading }: LeaveApprovalProps) {
  const [rejectingId, setRejectingId] = useState<string | null>(null);
  const [rejectReason, setRejectReason] = useState('');
  const [commentMap, setCommentMap] = useState<Record<string, string>>({});

  if (pendingRequests.length === 0) {
    return (
      <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
        <EmptyState
          title="No pending approvals"
          description="All leave requests have been processed"
        />
      </div>
    );
  }

  return (
    <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-4 sm:p-6 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-foreground text-base">Pending Approvals</h3>
        <span className="text-xs px-2.5 py-1 rounded-full bg-amber-500/15 text-amber-500 font-medium">
          {pendingRequests.length} pending
        </span>
      </div>

      <div className="space-y-3 max-h-96 overflow-y-auto custom-scrollbar">
        {pendingRequests.map((request) => {
          const isRejecting = rejectingId === request.id;

          return (
            <div
              key={request.id}
              className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-4 space-y-3 hover:bg-white/10 transition-all duration-200"
            >
              {/* Header */}
              <div className="flex items-start justify-between">
                <div>
                  <p className="font-medium text-foreground text-sm">{request.employeeName}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {LEAVE_TYPE_LABELS[request.type] || request.type} &middot; {request.days} day{request.days > 1 ? 's' : ''}
                  </p>
                </div>
                <StatusBadge status={request.status} />
              </div>

              {/* Dates */}
              <div className="text-xs text-muted-foreground">
                {new Date(request.startDate).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}
                {' → '}
                {new Date(request.endDate).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}
              </div>

              {/* Reason */}
              <p className="text-sm text-foreground/80 bg-white/5 rounded-lg px-3 py-2">{request.reason}</p>

              {/* Comment input */}
              <div className="flex items-start gap-2">
                <MessageSquare className="h-4 w-4 text-muted-foreground mt-2 shrink-0" strokeWidth={1.8} />
                <input
                  type="text"
                  placeholder="Add a comment (optional)..."
                  value={commentMap[request.id] || ''}
                  onChange={(e) => setCommentMap((prev) => ({ ...prev, [request.id]: e.target.value }))}
                  className="flex-1 bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-sm text-foreground placeholder:text-muted-foreground/50 outline-none focus:border-module-erp/50 transition-colors duration-200"
                />
              </div>

              {/* Reject reason */}
              {isRejecting && (
                <div className="space-y-2">
                  <textarea
                    value={rejectReason}
                    onChange={(e) => setRejectReason(e.target.value)}
                    placeholder="Provide rejection reason (required)..."
                    rows={2}
                    className="w-full bg-red-500/5 border border-red-500/20 rounded-lg px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground/50 outline-none focus:border-red-500/50 transition-colors duration-200 resize-none"
                  />
                </div>
              )}

              {/* Actions */}
              <div className="flex items-center gap-2 pt-1">
                {!isRejecting ? (
                  <>
                    <Button
                      size="sm"
                      onClick={() => onApprove(request.id, commentMap[request.id])}
                      disabled={isLoading}
                      className="bg-emerald-600 hover:bg-emerald-700 text-white press-scale h-8"
                    >
                      <CheckCircle2 className="h-3.5 w-3.5 mr-1.5" strokeWidth={1.8} />
                      Approve
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => setRejectingId(request.id)}
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
                          onReject(request.id, rejectReason.trim());
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
