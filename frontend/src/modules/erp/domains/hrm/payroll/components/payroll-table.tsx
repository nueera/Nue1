'use client';

import { type ColumnDef } from '@tanstack/react-table';
import { MoreHorizontal, Eye, Download } from 'lucide-react';
import SmartTable from '../../../../shared/components/smart-table/smart-table';
import { StatusBadge } from '../../../../shared/components/status-badge/status-badge';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { fmtCurrency } from '../payroll.utils';
import type { PayrollRecord, PayrollStatus } from '../types';

interface PayrollTableProps {
  data: PayrollRecord[];
  isLoading?: boolean;
  onRowClick?: (row: PayrollRecord) => void;
  onDownloadPayslip?: (id: string) => void;
  className?: string;
}

export function PayrollTable({ data, isLoading, onRowClick, onDownloadPayslip, className }: PayrollTableProps) {
  const columns: ColumnDef<PayrollRecord>[] = [
    {
      accessorKey: 'employeeName',
      header: 'Employee',
      cell: ({ row }) => (
        <span className="font-medium text-foreground">{row.original.employeeName}</span>
      ),
      size: 160,
    },
    {
      accessorKey: 'month',
      header: 'Month',
      cell: ({ row }) => (
        <span className="text-foreground/80">{row.original.month}</span>
      ),
      size: 100,
    },
    {
      accessorKey: 'basicSalary',
      header: 'Basic',
      cell: ({ row }) => (
        <span className="text-foreground/80">{fmtCurrency(row.original.basicSalary)}</span>
      ),
      size: 110,
    },
    {
      accessorKey: 'deductions',
      header: 'Deductions',
      cell: ({ row }) => (
        <span className="text-red-400">{fmtCurrency(row.original.deductions)}</span>
      ),
      size: 110,
    },
    {
      accessorKey: 'bonus',
      header: 'Bonus',
      cell: ({ row }) => (
        <span className={row.original.bonus > 0 ? 'text-emerald-500' : 'text-foreground/40'}>
          {row.original.bonus > 0 ? fmtCurrency(row.original.bonus) : '-'}
        </span>
      ),
      size: 100,
    },
    {
      accessorKey: 'netSalary',
      header: 'Net Salary',
      cell: ({ row }) => (
        <span className="font-semibold text-module-erp">{fmtCurrency(row.original.netSalary)}</span>
      ),
      size: 120,
    },
    {
      accessorKey: 'status',
      header: 'Status',
      cell: ({ row }) => <StatusBadge status={row.original.status} />,
      size: 110,
    },
    {
      id: 'actions',
      header: '',
      size: 50,
      cell: ({ row }) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8 press-scale" onClick={(e) => e.stopPropagation()}>
              <MoreHorizontal className="h-4 w-4" strokeWidth={1.8} />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="bg-white/10 backdrop-blur-xl border border-white/10">
            <DropdownMenuItem onClick={(e) => { e.stopPropagation(); onRowClick?.(row.original); }}>
              <Eye className="h-3.5 w-3.5 mr-2" strokeWidth={1.8} /> View Payslip
            </DropdownMenuItem>
            {onDownloadPayslip && (
              <DropdownMenuItem onClick={(e) => { e.stopPropagation(); onDownloadPayslip(row.original.id); }}>
                <Download className="h-3.5 w-3.5 mr-2" strokeWidth={1.8} /> Download
              </DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ];

  return (
    <div className={`bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-4 sm:p-6 ${className || ''}`}>
      <SmartTable
        data={data}
        columns={columns}
        isLoading={isLoading}
        onRowClick={onRowClick}
        searchPlaceholder="Search payroll records..."
        emptyMessage="No payroll records found"
        emptyDescription="Run payroll to generate records"
      />
    </div>
  );
}
