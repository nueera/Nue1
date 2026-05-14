'use client';

import { motion } from 'framer-motion';
import { PageTransition } from '@/modules/erp/design-system/components/animations';
import { type ColumnDef } from '@tanstack/react-table';
import { DollarSign } from 'lucide-react';
import { cn } from '@/lib/utils';
import { SmartTable } from '@/modules/erp/shared/components/smart-table';
import { Badge } from '@/components/ui/badge';

interface AdvanceSummaryRecord {
  id: string;
  employeeName: string;
  department: string;
  totalAdvanced: number;
  totalRepaid: number;
  outstanding: number;
  status: string;
}

const advanceData: AdvanceSummaryRecord[] = [
  { id: '1', employeeName: 'John Smith', department: 'Engineering', totalAdvanced: 5000, totalRepaid: 834, outstanding: 4166, status: 'active' },
  { id: '2', employeeName: 'Sarah Wilson', department: 'Design', totalAdvanced: 2000, totalRepaid: 0, outstanding: 2000, status: 'pending' },
  { id: '3', employeeName: 'Mike Johnson', department: 'Engineering', totalAdvanced: 1500, totalRepaid: 1500, outstanding: 0, status: 'repaid' },
  { id: '4', employeeName: 'Emily Davis', department: 'Marketing', totalAdvanced: 3000, totalRepaid: 3000, outstanding: 0, status: 'repaid' },
  { id: '5', employeeName: 'Lisa Chen', department: 'Analytics', totalAdvanced: 15000, totalRepaid: 417, outstanding: 14583, status: 'active' },
];

const statusBadgeClass: Record<string, string> = {
  active: 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/15',
  pending: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/15',
  repaid: 'bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/15',
};

const columns: ColumnDef<AdvanceSummaryRecord>[] = [
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
    accessorKey: 'department',
    header: 'Department',
    cell: ({ getValue }) => (
      <span className="text-muted-foreground" style={{ fontSize: 'var(--text-sm)' }}>
        {getValue() as string}
      </span>
    ),
  },
  {
    accessorKey: 'totalAdvanced',
    header: 'Total Advanced',
    cell: ({ getValue }) => (
      <span className="font-semibold text-foreground" style={{ fontSize: 'var(--text-sm)' }}>
        ${(getValue() as number).toLocaleString()}
      </span>
    ),
  },
  {
    accessorKey: 'totalRepaid',
    header: 'Repaid',
    cell: ({ getValue }) => (
      <span className="text-green-500" style={{ fontSize: 'var(--text-sm)' }}>
        ${(getValue() as number).toLocaleString()}
      </span>
    ),
  },
  {
    accessorKey: 'outstanding',
    header: 'Outstanding',
    cell: ({ getValue }) => {
      const val = getValue() as number;
      return (
        <span className={cn(val > 0 ? 'text-amber-500 font-semibold' : 'text-green-500')} style={{ fontSize: 'var(--text-sm)' }}>
          ${val.toLocaleString()}
        </span>
      );
    },
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ getValue }) => {
      const status = getValue() as string;
      return (
        <Badge variant="outline" className={cn('capitalize', statusBadgeClass[status] || '')} style={{ fontSize: 'var(--text-xs)' }}>
          {status}
        </Badge>
      );
    },
  },
];

export default function AdvanceSummaryPage() {
  const totalAdvanced = advanceData.reduce((a, d) => a + d.totalAdvanced, 0);
  const totalRepaid = advanceData.reduce((a, d) => a + d.totalRepaid, 0);
  const totalOutstanding = advanceData.reduce((a, d) => a + d.outstanding, 0);

  return (
    <PageTransition>
      <div className="p-4 sm:p-6 lg:p-8">
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.24, ease: [0.25, 0.46, 0.45, 0.94] as const }}
          className="mb-6"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-cyan-500/10 text-cyan-500">
              <DollarSign className="h-5 w-5" strokeWidth={1.8} />
            </div>
            <h1
              className="font-bold text-foreground"
              style={{ fontSize: 'var(--text-xl)', letterSpacing: 'var(--tracking-tight)', lineHeight: 'var(--leading-tight)' }}
            >
              Advance Summary Report
            </h1>
          </div>
          <p
            className="text-muted-foreground mt-1"
            style={{ fontSize: 'var(--text-sm)', letterSpacing: 'var(--tracking-normal)', lineHeight: 'var(--leading-normal)' }}
          >
            Employee advance and repayment summary
          </p>
        </motion.div>

        {/* Summary cards */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.05, ease: [0.25, 0.46, 0.45, 0.94] as const }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6"
        >
          {[
            { label: 'Total Advanced', value: `$${totalAdvanced.toLocaleString()}`, color: 'text-module-erp' },
            { label: 'Total Repaid', value: `$${totalRepaid.toLocaleString()}`, color: 'text-green-500' },
            { label: 'Outstanding', value: `$${totalOutstanding.toLocaleString()}`, color: 'text-amber-500' },
          ].map((stat) => (
            <div key={stat.label} className="glass-surface rounded-xl p-5 hover:border-module-erp/30 transition-colors duration-[var(--motion-fast)]">
              <p className="text-muted-foreground" style={{ fontSize: 'var(--text-xs)', letterSpacing: 'var(--tracking-wide)' }}>
                {stat.label}
              </p>
              <p className={cn('font-bold', stat.color)} style={{ fontSize: 'var(--text-xl)', letterSpacing: 'var(--tracking-tight)' }}>
                {stat.value}
              </p>
            </div>
          ))}
        </motion.div>

        {/* Table */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] as const }}
        >
          <SmartTable
            data={advanceData}
            columns={columns}
            searchable
            searchPlaceholder="Search employees..."
            emptyMessage="No advance data found"
          />
        </motion.div>
      </div>
    </PageTransition>
  );
}
