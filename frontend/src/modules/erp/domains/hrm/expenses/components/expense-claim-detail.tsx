'use client';

import {
  FileText,
  CheckCircle2,
  XCircle,
  Clock,
  DollarSign,
  Receipt,
  Calendar,
  User,
  Tag,
} from 'lucide-react';
import type { ExpenseClaim } from '../types';
import { fmtExpenseAmount } from '../expense.utils';
import { EXPENSE_STATUS_LABELS } from '../constants';
import { StatusBadge } from '../../../../shared/components/status-badge';

interface ApprovalStep {
  label: string;
  status: 'completed' | 'current' | 'pending';
  by?: string;
  at?: string;
  comment?: string;
}

interface ExpenseClaimDetailProps {
  claim: ExpenseClaim;
  approvalTimeline?: ApprovalStep[];
  onEdit?: () => void;
  onApprove?: () => void;
  onReject?: () => void;
}

const STATUS_STYLES: Record<string, string> = {
  draft: 'bg-zinc-500/10 text-zinc-400 border-zinc-500/15',
  pending: 'bg-amber-500/10 text-amber-400 border-amber-500/15',
  approved: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/15',
  rejected: 'bg-red-500/10 text-red-400 border-red-500/15',
  paid: 'bg-blue-500/10 text-blue-400 border-blue-500/15',
};

export function ExpenseClaimDetail({ claim, approvalTimeline = [], onEdit, onApprove, onReject }: ExpenseClaimDetailProps) {
  const timeline = approvalTimeline.length > 0 ? approvalTimeline : getDefaultTimeline(claim);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <h3 className="text-lg font-semibold text-foreground">
                {claim.category} Expense
              </h3>
              <span className={`inline-flex items-center px-2 py-0.5 text-[10px] font-medium rounded-md border ${STATUS_STYLES[claim.status] || ''}`}>
                {EXPENSE_STATUS_LABELS[claim.status] || claim.status}
              </span>
            </div>
            <p className="text-sm text-muted-foreground">
              Submitted by {claim.employeeName} on {new Date(claim.createdAt).toLocaleDateString()}
            </p>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold text-foreground">
              {fmtExpenseAmount(claim.amount)}
            </p>
            {claim.isBillable && (
              <span className="text-[10px] text-emerald-400 font-medium">Billable</span>
            )}
          </div>
        </div>
      </div>

      {/* Details Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <DetailItem icon={User} label="Employee" value={claim.employeeName} />
        <DetailItem icon={Tag} label="Category" value={claim.category} />
        <DetailItem icon={Calendar} label="Date" value={claim.date} />
        <DetailItem icon={DollarSign} label="Amount" value={fmtExpenseAmount(claim.amount)} />
        {claim.mileageKm && <DetailItem icon={FileText} label="Distance" value={`${claim.mileageKm} km`} />}
        {claim.travelFrom && <DetailItem icon={FileText} label="From" value={claim.travelFrom} />}
        {claim.travelTo && <DetailItem icon={FileText} label="To" value={claim.travelTo} />}
        {claim.approvedBy && <DetailItem icon={CheckCircle2} label="Approved By" value={claim.approvedBy} />}
      </div>

      {/* Description */}
      <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-5">
        <h4 className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">Description</h4>
        <p className="text-sm text-foreground whitespace-pre-wrap">{claim.description}</p>
      </div>

      {/* Receipt */}
      {claim.receiptUrl && (
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-5">
          <h4 className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3">Receipt</h4>
          <div className="flex items-center gap-3">
            <Receipt className="h-8 w-8 text-module-erp/60" />
            <div>
              <a
                href={claim.receiptUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-module-erp hover:underline"
              >
                View Receipt
              </a>
              <p className="text-[10px] text-muted-foreground">Click to open in new tab</p>
            </div>
          </div>
        </div>
      )}

      {/* Rejection Reason */}
      {claim.rejectedReason && (
        <div className="border border-red-500/20 bg-red-500/5 backdrop-blur-xl rounded-2xl p-5">
          <h4 className="text-xs font-medium text-red-400 uppercase tracking-wider mb-2">Rejection Reason</h4>
          <p className="text-sm text-foreground">{claim.rejectedReason}</p>
        </div>
      )}

      {/* Approval Timeline */}
      <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-5">
        <h4 className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-4">Approval Timeline</h4>
        <div className="space-y-4">
          {timeline.map((step, i) => (
            <div key={i} className="flex items-start gap-3">
              <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 ${
                step.status === 'completed' ? 'bg-emerald-500/20' :
                step.status === 'current' ? 'bg-amber-500/20' : 'bg-white/5'
              }`}>
                {step.status === 'completed' ? (
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
                ) : step.status === 'current' ? (
                  <Clock className="h-3.5 w-3.5 text-amber-400" />
                ) : (
                  <div className="w-2 h-2 rounded-full bg-white/20" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-foreground">{step.label}</p>
                {step.by && <p className="text-[10px] text-muted-foreground">by {step.by}</p>}
                {step.at && <p className="text-[10px] text-muted-foreground">{step.at}</p>}
                {step.comment && <p className="text-xs text-muted-foreground mt-1">{step.comment}</p>}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Actions */}
      {claim.status === 'pending' && (onApprove || onReject) && (
        <div className="flex items-center gap-3">
          {onApprove && (
            <button
              onClick={onApprove}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-500 text-white text-sm font-medium hover:bg-emerald-600 press-scale transition-all duration-200"
            >
              <CheckCircle2 className="h-4 w-4" />
              Approve
            </button>
          )}
          {onReject && (
            <button
              onClick={onReject}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm font-medium hover:bg-red-500/20 transition-all duration-200"
            >
              <XCircle className="h-4 w-4" />
              Reject
            </button>
          )}
        </div>
      )}
    </div>
  );
}

function DetailItem({ icon: Icon, label, value }: { icon: React.ComponentType<{ className?: string }>; label: string; value: string }) {
  return (
    <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-3.5">
      <div className="flex items-center gap-2 mb-1">
        <Icon className="h-3.5 w-3.5 text-muted-foreground/50" />
        <span className="text-[10px] text-muted-foreground uppercase tracking-wider">{label}</span>
      </div>
      <p className="text-sm font-medium text-foreground">{value}</p>
    </div>
  );
}

function getDefaultTimeline(claim: ExpenseClaim): ApprovalStep[] {
  const steps: ApprovalStep[] = [
    { label: 'Submitted', status: 'completed', at: claim.createdAt },
  ];

  if (claim.status === 'pending') {
    steps.push({ label: 'Manager Approval', status: 'current' });
    steps.push({ label: 'Finance Review', status: 'pending' });
    steps.push({ label: 'Payment', status: 'pending' });
  } else if (claim.status === 'approved') {
    steps.push({ label: 'Manager Approval', status: 'completed', by: claim.approvedBy, at: claim.approvedAt });
    steps.push({ label: 'Finance Review', status: 'current' });
    steps.push({ label: 'Payment', status: 'pending' });
  } else if (claim.status === 'rejected') {
    steps.push({ label: 'Manager Approval', status: 'completed', by: claim.approvedBy, at: claim.approvedAt, comment: claim.rejectedReason });
  } else if (claim.status === 'paid') {
    steps.push({ label: 'Manager Approval', status: 'completed', by: claim.approvedBy, at: claim.approvedAt });
    steps.push({ label: 'Finance Review', status: 'completed' });
    steps.push({ label: 'Payment', status: 'completed', at: claim.paidAt });
  }

  return steps;
}
