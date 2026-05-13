'use client';

import { useState } from 'react';
import { AlertTriangle, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { StatusBadge } from '../../../../shared/components/status-badge/status-badge';
import { ConfirmDialog } from '../../../../shared/components/confirm-dialog/confirm-dialog';
import type { LeaveRequest } from '../types';

interface LeaveCancelProps {
  leave: LeaveRequest | null;
  onCancel: (id: string, reason: string) => void;
  isLoading?: boolean;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function LeaveCancel({ leave, onCancel, isLoading, open, onOpenChange }: LeaveCancelProps) {
  const [reason, setReason] = useState('');

  const handleConfirm = () => {
    if (leave && reason.trim()) {
      onCancel(leave.id, reason.trim());
      setReason('');
      onOpenChange(false);
    }
  };

  const handleClose = () => {
    setReason('');
    onOpenChange(false);
  };

  return (
    <ConfirmDialog
      open={open}
      onOpenChange={handleClose}
      title="Cancel Leave Request"
      description="Are you sure you want to cancel this leave request? This action cannot be undone."
      confirmLabel="Cancel Leave"
      variant="destructive"
      onConfirm={handleConfirm}
      isLoading={isLoading}
    >
      {/* Custom content rendered inside the dialog */}
    </ConfirmDialog>
  );
}

interface LeaveCancelFormProps {
  leave: LeaveRequest;
  onSubmit: (reason: string) => void;
  onCancel: () => void;
  isLoading?: boolean;
}

export function LeaveCancelForm({ leave, onSubmit, onCancel, isLoading }: LeaveCancelFormProps) {
  const [reason, setReason] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (reason.trim()) {
      onSubmit(reason.trim());
    }
  };

  return (
    <div className="bg-white/5 backdrop-blur-xl border border-red-500/20 rounded-2xl p-4 sm:p-6 space-y-4">
      {/* Warning */}
      <div className="flex items-center gap-2 bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3">
        <AlertTriangle className="h-5 w-5 text-red-500 shrink-0" strokeWidth={1.8} />
        <p className="text-sm text-red-400">
          You are about to cancel an <span className="font-semibold capitalize">{leave.status}</span> leave request.
        </p>
      </div>

      {/* Leave Details */}
      <div className="bg-white/5 border border-white/10 rounded-xl p-4 space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-foreground">{leave.employeeName}</span>
          <StatusBadge status={leave.status} />
        </div>
        <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground">
          <span>Type: <span className="text-foreground capitalize">{leave.type}</span></span>
          <span>Days: <span className="text-foreground font-medium">{leave.days}</span></span>
          <span>From: <span className="text-foreground">{new Date(leave.startDate).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}</span></span>
          <span>To: <span className="text-foreground">{new Date(leave.endDate).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}</span></span>
        </div>
        {leave.reason && (
          <p className="text-xs text-muted-foreground pt-1 border-t border-white/5">
            Original reason: {leave.reason}
          </p>
        )}
      </div>

      {/* Cancellation Reason */}
      <form onSubmit={handleSubmit} className="space-y-3">
        <div className="space-y-1.5">
          <label className="text-sm font-medium text-foreground">
            Cancellation Reason <span className="text-red-500">*</span>
          </label>
          <textarea
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            rows={3}
            placeholder="Please provide a reason for cancelling this leave..."
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/50 outline-none focus:border-red-500/50 transition-colors duration-200 resize-none"
          />
        </div>

        <div className="flex items-center justify-end gap-2">
          <Button type="button" variant="outline" onClick={onCancel} disabled={isLoading}>
            Go Back
          </Button>
          <Button
            type="submit"
            disabled={isLoading || !reason.trim()}
            className="bg-red-600 hover:bg-red-700 text-white press-scale"
          >
            {isLoading ? 'Cancelling...' : 'Cancel Leave'}
          </Button>
        </div>
      </form>
    </div>
  );
}
