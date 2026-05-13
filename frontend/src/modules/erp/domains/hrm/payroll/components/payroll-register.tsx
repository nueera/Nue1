'use client';

import { type ColumnDef } from '@tanstack/react-table';
import { FileSpreadsheet } from 'lucide-react';
import SmartTable from '../../../../shared/components/smart-table/smart-table';
import { EmptyState } from '../../../../shared/components/empty-state/empty-state';
import { fmtCurrency } from '../payroll.utils';
import type { PayrollRecord } from '../types';
import { cn } from '@/lib/utils';

interface PayrollRegisterProps {
  records: PayrollRecord[];
  month: string;
  isLoading?: boolean;
  className?: string;
}

export function PayrollRegister({ records, month, isLoading, className }: PayrollRegisterProps) {
  const totalGross = records.reduce((sum, r) => sum + r.basicSalary, 0);
  const totalDeductions = records.reduce((sum, r) => sum + r.deductions, 0);
  const totalBonuses = records.reduce((sum, r) => sum + r.bonus, 0);
  const totalNet = records.reduce((sum, r) => sum + r.netSalary, 0);

  const columns: ColumnDef<PayrollRecord>[] = [
    {
      accessorKey: 'employeeName',
      header: 'Employee',
      cell: ({ row }) => <span className="font-medium text-foreground">{row.original.employeeName}</span>,
      size: 160,
    },
    {
      accessorKey: 'basicSalary',
      header: 'Basic',
      cell: ({ row }) => <span className="text-foreground/80">{fmtCurrency(row.original.basicSalary)}</span>,
      size: 100,
    },
    {
      accessorKey: 'deductions',
      header: 'Deductions',
      cell: ({ row }) => <span className="text-red-400">{fmtCurrency(row.original.deductions)}</span>,
      size: 110,
    },
    {
      accessorKey: 'bonus',
      header: 'Bonus',
      cell: ({ row }) => (
        <span className={row.original.bonus > 0 ? 'text-emerald-500' : 'text-muted-foreground'}>
          {row.original.bonus > 0 ? fmtCurrency(row.original.bonus) : '-'}
        </span>
      ),
      size: 100,
    },
    {
      accessorKey: 'netSalary',
      header: 'Net Salary',
      cell: ({ row }) => <span className="font-semibold text-module-erp">{fmtCurrency(row.original.netSalary)}</span>,
      size: 120,
    },
    {
      accessorKey: 'status',
      header: 'Status',
      cell: ({ row }) => (
        <span className={cn(
          'text-xs font-medium capitalize px-2 py-0.5 rounded-full',
          row.original.status === 'paid' && 'bg-emerald-500/15 text-emerald-500',
          row.original.status === 'pending' && 'bg-amber-500/15 text-amber-500',
          row.original.status === 'processing' && 'bg-module-erp/15 text-module-erp',
        )}>
          {row.original.status}
        </span>
      ),
      size: 100,
    },
  ];

  return (
    <div className={cn('bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-4 sm:p-6 space-y-4', className)}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <FileSpreadsheet className="h-5 w-5 text-module-erp" strokeWidth={1.8} />
          <h3 className="font-semibold text-foreground text-base">Payroll Register — {month}</h3>
        </div>
      </div>

      {/* Summary row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: 'Total Gross', value: fmtCurrency(totalGross), color: 'text-foreground' },
          { label: 'Total Deductions', value: fmtCurrency(totalDeductions), color: 'text-red-400' },
          { label: 'Total Bonuses', value: fmtCurrency(totalBonuses), color: 'text-emerald-500' },
          { label: 'Total Net', value: fmtCurrency(totalNet), color: 'text-module-erp' },
        ].map((item) => (
          <div key={item.label} className="bg-white/5 border border-white/10 rounded-lg px-3 py-2">
            <p className="text-[10px] text-muted-foreground">{item.label}</p>
            <p className={cn('text-sm font-semibold', item.color)}>{item.value}</p>
          </div>
        ))}
      </div>

      <SmartTable
        data={records}
        columns={columns}
        isLoading={isLoading}
        searchPlaceholder="Search register..."
        emptyMessage="No payroll records for this month"
        emptyDescription="Run payroll to generate records"
      />
    </div>
  );
}
