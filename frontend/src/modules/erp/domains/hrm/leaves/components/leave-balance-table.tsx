'use client';

import { type ColumnDef } from '@tanstack/react-table';
import SmartTable from '../../../../shared/components/smart-table/smart-table';
import { EmptyState } from '../../../../shared/components/empty-state/empty-state';
import type { LeaveBalance, LeaveType } from '../types';

interface LeaveBalanceTableProps {
  balances: Array<{
    employeeId: string;
    employeeName: string;
    department: string;
    balances: LeaveBalance[];
  }>;
  leaveTypes: LeaveType[];
  isLoading?: boolean;
  className?: string;
}

const LEAVE_TYPE_LABELS: Record<string, string> = {
  annual: 'Annual',
  sick: 'Sick',
  personal: 'Personal',
  maternity: 'Maternity',
  paternity: 'Paternity',
  unpaid: 'Unpaid',
};

export function LeaveBalanceTable({ balances, leaveTypes, isLoading, className }: LeaveBalanceTableProps) {
  const columns: ColumnDef<LeaveBalanceTableProps['balances'][0]>[] = [
    {
      accessorKey: 'employeeName',
      header: 'Employee',
      cell: ({ row }) => <span className="font-medium text-foreground">{row.original.employeeName}</span>,
      size: 160,
    },
    {
      accessorKey: 'department',
      header: 'Department',
      cell: ({ row }) => <span className="text-foreground/80">{row.original.department}</span>,
      size: 120,
    },
    ...leaveTypes.map((type): ColumnDef<LeaveBalanceTableProps['balances'][0]> => ({
      id: type,
      header: LEAVE_TYPE_LABELS[type] || type,
      size: 100,
      cell: ({ row }) => {
        const balance = row.original.balances.find((b) => b.leaveType === type);
        if (!balance) return <span className="text-muted-foreground">-</span>;
        return (
          <div className="space-y-0.5">
            <span className="text-sm font-medium text-module-erp">{balance.available}</span>
            <span className="text-xs text-muted-foreground"> / {balance.total}</span>
          </div>
        );
      },
    })),
    {
      id: 'totalAvailable',
      header: 'Total Available',
      size: 110,
      cell: ({ row }) => {
        const total = row.original.balances.reduce((sum, b) => sum + b.available, 0);
        return <span className="font-semibold text-module-erp">{total}</span>;
      },
    },
  ];

  return (
    <div className={`bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-4 sm:p-6 ${className || ''}`}>
      <SmartTable
        data={balances}
        columns={columns}
        isLoading={isLoading}
        searchable
        searchPlaceholder="Search employees..."
        emptyMessage="No leave balance data"
        emptyDescription="Leave balances will appear here when employees are assigned"
      />
    </div>
  );
}
