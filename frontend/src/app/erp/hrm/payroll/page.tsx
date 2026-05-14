'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { PageTransition } from '@/modules/erp/design-system/components/animations';
import { type ColumnDef } from '@tanstack/react-table';
import { Plus } from 'lucide-react';
import { cn } from '@/lib/utils';
import { payrollRecords, type PayrollRecord } from '@/modules/erp/data/mock';
import { SmartTable } from '@/modules/erp/shared/components/smart-table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const statusBadgeClass: Record<string, string> = {
  paid: 'bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/15',
  pending: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/15',
  processing: 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/15',
};

const statuses = ['All', 'paid', 'pending', 'processing'];
const months = ['All', '2025-02', '2025-01'];

const columns: ColumnDef<PayrollRecord>[] = [
  {
    accessorKey: 'employeeName',
    header: 'Employee',
    cell: ({ getValue }) => (
      <span className="font-medium text-foreground" style={{ fontSize: 'var(--text-sm)' }}>
        {getValue() as string}
      </span>
    ),
  },
  {
    accessorKey: 'month',
    header: 'Month',
    cell: ({ getValue }) => {
      const month = getValue() as string;
      const [y, m] = month.split('-');
      return new Date(Number(y), Number(m) - 1).toLocaleDateString('en-US', { year: 'numeric', month: 'long' });
    },
  },
  {
    accessorKey: 'basicSalary',
    header: 'Basic Salary',
    cell: ({ getValue }) => (
      <span style={{ fontSize: 'var(--text-sm)' }}>${(getValue() as number).toLocaleString()}</span>
    ),
  },
  {
    accessorKey: 'deductions',
    header: 'Deductions',
    cell: ({ getValue }) => (
      <span className="text-red-500" style={{ fontSize: 'var(--text-sm)' }}>
        -${(getValue() as number).toLocaleString()}
      </span>
    ),
  },
  {
    accessorKey: 'bonus',
    header: 'Bonus',
    cell: ({ getValue }) => {
      const val = getValue() as number;
      return val > 0 ? (
        <span className="text-green-500" style={{ fontSize: 'var(--text-sm)' }}>
          +${val.toLocaleString()}
        </span>
      ) : (
        <span className="text-muted-foreground" style={{ fontSize: 'var(--text-sm)' }}>$0</span>
      );
    },
  },
  {
    accessorKey: 'netSalary',
    header: 'Net Salary',
    cell: ({ getValue }) => (
      <span className="font-semibold text-foreground" style={{ fontSize: 'var(--text-sm)' }}>
        ${(getValue() as number).toLocaleString()}
      </span>
    ),
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ getValue }) => {
      const status = getValue() as string;
      return (
        <Badge
          variant="outline"
          className={cn('capitalize', statusBadgeClass[status] || '')}
          style={{ fontSize: 'var(--text-xs)' }}
        >
          {status}
        </Badge>
      );
    },
  },
];

export default function PayrollPage() {
  const [statusFilter, setStatusFilter] = useState('All');
  const [monthFilter, setMonthFilter] = useState('All');

  const filteredRecords = useMemo(() => {
    return payrollRecords.filter((r) => {
      if (statusFilter !== 'All' && r.status !== statusFilter) return false;
      if (monthFilter !== 'All' && r.month !== monthFilter) return false;
      return true;
    });
  }, [statusFilter, monthFilter]);

  return (
    <PageTransition>
    <div className="p-4 sm:p-6 lg:p-8">
      {/* Page header */}
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.24, ease: [0.25, 0.46, 0.45, 0.94] as const }}
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6"
      >
        <div>
          <h1
            className="font-bold text-foreground"
            style={{
              fontSize: 'var(--text-xl)',
              letterSpacing: 'var(--tracking-tight)',
              lineHeight: 'var(--leading-tight)',
            }}
          >
            Payroll
          </h1>
          <p
            className="text-muted-foreground mt-1"
            style={{
              fontSize: 'var(--text-sm)',
              letterSpacing: 'var(--tracking-normal)',
              lineHeight: 'var(--leading-normal)',
            }}
          >
            Manage employee compensation and payroll processing
          </p>
        </div>
        <Button
          className="bg-module-erp hover:bg-module-erp/90 text-white gap-2 press-scale"
          style={{ fontSize: 'var(--text-sm)' }}
        >
          <Plus className="h-4 w-4" strokeWidth={1.8} />
          Process Payroll
        </Button>
      </motion.div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: -4 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.24, delay: 0.05, ease: [0.25, 0.46, 0.45, 0.94] as const }}
        className="flex flex-wrap items-center gap-3 mb-6"
      >
        <Select value={monthFilter} onValueChange={setMonthFilter}>
          <SelectTrigger className="w-[180px]" size="sm">
            <SelectValue placeholder="Month" />
          </SelectTrigger>
          <SelectContent>
            {months.map((month) => (
              <SelectItem key={month} value={month}>
                {month === 'All'
                  ? 'All Months'
                  : (() => {
                      const [y, m] = month.split('-');
                      return new Date(Number(y), Number(m) - 1).toLocaleDateString('en-US', { year: 'numeric', month: 'long' });
                    })()}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[160px]" size="sm">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            {statuses.map((status) => (
              <SelectItem key={status} value={status}>
                {status === 'All' ? 'All Statuses' : status}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </motion.div>

      {/* Table */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] as const }}
      >
        <SmartTable
          data={filteredRecords}
          columns={columns}
          searchable
          searchPlaceholder="Search payroll records..."
          emptyMessage="No payroll records found"
        />
      </motion.div>
    </div>
    </PageTransition>
  );
}
