'use client';

import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Clock, CheckCircle2, XCircle, AlertCircle } from 'lucide-react';

export type ApprovalStatus = 'pending' | 'approved' | 'rejected' | 'changes_requested';

export interface ApprovalStatusChipProps {
  status: ApprovalStatus;
  reviewer?: string;
  className?: string;
}

const STATUS_CONFIG: Record<ApprovalStatus, { label: string; icon: React.ComponentType<{ className?: string; strokeWidth?: number }>; style: string }> = {
  pending: {
    label: 'Pending Review',
    icon: Clock,
    style: 'bg-amber-100 text-amber-700 border-amber-200 dark:bg-amber-900/30 dark:text-amber-300 dark:border-amber-800',
  },
  approved: {
    label: 'Approved',
    icon: CheckCircle2,
    style: 'bg-emerald-100 text-emerald-700 border-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-300 dark:border-emerald-800',
  },
  rejected: {
    label: 'Rejected',
    icon: XCircle,
    style: 'bg-red-100 text-red-700 border-red-200 dark:bg-red-900/30 dark:text-red-300 dark:border-red-800',
  },
  changes_requested: {
    label: 'Changes Requested',
    icon: AlertCircle,
    style: 'bg-orange-100 text-orange-700 border-orange-200 dark:bg-orange-900/30 dark:text-orange-300 dark:border-orange-800',
  },
};

export function ApprovalStatusChip({ status, reviewer, className }: ApprovalStatusChipProps) {
  const config = STATUS_CONFIG[status];
  const Icon = config.icon;

  return (
    <Badge variant="outline" className={cn('font-medium gap-1', config.style, className)}>
      <Icon className="h-3 w-3" />
      {config.label}
      {reviewer && <span className="text-[10px] opacity-70">by {reviewer}</span>}
    </Badge>
  );
}
