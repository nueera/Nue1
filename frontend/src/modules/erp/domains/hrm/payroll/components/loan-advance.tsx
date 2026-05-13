'use client';

import { type ColumnDef } from '@tanstack/react-table';
import { Landmark, Plus } from 'lucide-react';
import SmartTable from '../../../../shared/components/smart-table/smart-table';
import { StatusBadge } from '../../../../shared/components/status-badge/status-badge';
import { EmptyState } from '../../../../shared/components/empty-state/empty-state';
import { Button } from '@/components/ui/button';
import { fmtCurrency } from '../payroll.utils';
import type { LoanAdvance } from '../types';
import { cn } from '@/lib/utils';

interface LoanAdvanceProps {
  loans: LoanAdvance[];
  onAddNew?: () => void;
  onViewDetails?: (loan: LoanAdvance) => void;
  isLoading?: boolean;
  className?: string;
}

const STATUS_VARIANTS: Record<string, string> = {
  active: 'text-emerald-500 bg-emerald-500/15 border-emerald-500/20',
  completed: 'text-module-erp bg-module-erp/15 border-module-erp/20',
  defaulted: 'text-red-500 bg-red-500/15 border-red-500/20',
};

export function LoanAdvance({ loans, onAddNew, onViewDetails, isLoading, className }: LoanAdvanceProps) {
  const totalOutstanding = loans
    .filter((l) => l.status === 'active')
    .reduce((sum, l) => sum + l.remainingAmount, 0);

  const totalEMI = loans
    .filter((l) => l.status === 'active')
    .reduce((sum, l) => sum + l.emi, 0);

  const columns: ColumnDef<LoanAdvance>[] = [
    {
      accessorKey: 'type',
      header: 'Type',
      cell: ({ row }) => (
        <span className={cn(
          'text-xs font-medium capitalize px-2 py-0.5 rounded-full',
          row.original.type === 'loan' ? 'bg-violet-500/15 text-violet-500' : 'bg-amber-500/15 text-amber-500',
        )}>
          {row.original.type}
        </span>
      ),
      size: 80,
    },
    {
      accessorKey: 'amount',
      header: 'Amount',
      cell: ({ row }) => (
        <span className="font-medium text-foreground">{fmtCurrency(row.original.amount)}</span>
      ),
      size: 120,
    },
    {
      accessorKey: 'emi',
      header: 'EMI',
      cell: ({ row }) => (
        <span className="text-foreground/80">{fmtCurrency(row.original.emi)}</span>
      ),
      size: 100,
    },
    {
      accessorKey: 'remainingAmount',
      header: 'Remaining',
      cell: ({ row }) => {
        const pct = row.original.amount > 0 ? (row.original.remainingAmount / row.original.amount) * 100 : 0;
        return (
          <div className="space-y-1">
            <span className="text-sm text-foreground/80">{fmtCurrency(row.original.remainingAmount)}</span>
            <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
              <div
                className="h-full bg-module-erp/50 rounded-full transition-all duration-500"
                style={{ width: `${pct}%` }}
              />
            </div>
          </div>
        );
      },
      size: 130,
    },
    {
      accessorKey: 'status',
      header: 'Status',
      cell: ({ row }) => <StatusBadge status={row.original.status} />,
      size: 100,
    },
  ];

  return (
    <div className={cn('bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-4 sm:p-6 space-y-5', className)}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Landmark className="h-5 w-5 text-module-erp" strokeWidth={1.8} />
          <h3 className="font-semibold text-foreground text-base">Loans & Advances</h3>
        </div>
        {onAddNew && (
          <Button
            size="sm"
            onClick={onAddNew}
            className="bg-module-erp hover:bg-module-erp/90 text-white press-scale h-8"
          >
            <Plus className="h-3.5 w-3.5 mr-1.5" strokeWidth={1.8} />
            New
          </Button>
        )}
      </div>

      {/* Summary Cards */}
      {loans.filter((l) => l.status === 'active').length > 0 && (
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-white/5 border border-white/10 rounded-lg p-3">
            <p className="text-[10px] text-muted-foreground">Total Outstanding</p>
            <p className="text-sm font-semibold text-red-400">{fmtCurrency(totalOutstanding)}</p>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-lg p-3">
            <p className="text-[10px] text-muted-foreground">Monthly EMI</p>
            <p className="text-sm font-semibold text-module-erp">{fmtCurrency(totalEMI)}</p>
          </div>
        </div>
      )}

      {loans.length === 0 ? (
        <EmptyState
          title="No active loans or advances"
          description="Loans and advances will appear here"
          action={onAddNew ? { label: 'Apply for Loan', onClick: onAddNew } : undefined}
        />
      ) : (
        <SmartTable
          data={loans}
          columns={columns}
          isLoading={isLoading}
          onRowClick={onViewDetails}
          searchPlaceholder="Search loans..."
          emptyMessage="No loans found"
        />
      )}
    </div>
  );
}
