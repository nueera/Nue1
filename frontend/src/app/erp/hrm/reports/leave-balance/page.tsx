'use client';

import { motion } from 'framer-motion';
import { PageTransition } from '@/modules/erp/design-system/components/animations';
import { type ColumnDef } from '@tanstack/react-table';
import { Calendar } from 'lucide-react';
import { cn } from '@/lib/utils';
import { SmartTable } from '@/modules/erp/shared/components/smart-table';

interface LeaveBalanceRecord {
  id: string;
  employeeName: string;
  department: string;
  annual: { total: number; used: number; remaining: number };
  sick: { total: number; used: number; remaining: number };
  personal: { total: number; used: number; remaining: number };
  maternity: { total: number; used: number; remaining: number };
}

const leaveBalanceData: LeaveBalanceRecord[] = [
  { id: '1', employeeName: 'John Smith', department: 'Engineering', annual: { total: 20, used: 8, remaining: 12 }, sick: { total: 10, used: 3, remaining: 7 }, personal: { total: 5, used: 1, remaining: 4 }, maternity: { total: 0, used: 0, remaining: 0 } },
  { id: '2', employeeName: 'Sarah Wilson', department: 'Design', annual: { total: 20, used: 15, remaining: 5 }, sick: { total: 10, used: 2, remaining: 8 }, personal: { total: 5, used: 3, remaining: 2 }, maternity: { total: 90, used: 0, remaining: 90 } },
  { id: '3', employeeName: 'Mike Johnson', department: 'Engineering', annual: { total: 20, used: 12, remaining: 8 }, sick: { total: 10, used: 6, remaining: 4 }, personal: { total: 5, used: 2, remaining: 3 }, maternity: { total: 0, used: 0, remaining: 0 } },
  { id: '4', employeeName: 'Emily Davis', department: 'Marketing', annual: { total: 20, used: 5, remaining: 15 }, sick: { total: 10, used: 1, remaining: 9 }, personal: { total: 5, used: 0, remaining: 5 }, maternity: { total: 90, used: 0, remaining: 90 } },
  { id: '5', employeeName: 'Alex Brown', department: 'Sales', annual: { total: 20, used: 18, remaining: 2 }, sick: { total: 10, used: 8, remaining: 2 }, personal: { total: 5, used: 4, remaining: 1 }, maternity: { total: 0, used: 0, remaining: 0 } },
];

const columns: ColumnDef<LeaveBalanceRecord>[] = [
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
    id: 'annual',
    header: 'Annual',
    cell: ({ row }) => {
      const a = row.original.annual;
      return (
        <span style={{ fontSize: 'var(--text-sm)' }}>
          <span className={cn(a.remaining < 5 ? 'text-amber-500' : 'text-foreground')}>{a.remaining}</span>
          <span className="text-muted-foreground">/{a.total}</span>
        </span>
      );
    },
  },
  {
    id: 'sick',
    header: 'Sick',
    cell: ({ row }) => {
      const s = row.original.sick;
      return (
        <span style={{ fontSize: 'var(--text-sm)' }}>
          <span className={cn(s.remaining < 3 ? 'text-amber-500' : 'text-foreground')}>{s.remaining}</span>
          <span className="text-muted-foreground">/{s.total}</span>
        </span>
      );
    },
  },
  {
    id: 'personal',
    header: 'Personal',
    cell: ({ row }) => {
      const p = row.original.personal;
      return (
        <span style={{ fontSize: 'var(--text-sm)' }}>
          <span className={cn(p.remaining < 2 ? 'text-amber-500' : 'text-foreground')}>{p.remaining}</span>
          <span className="text-muted-foreground">/{p.total}</span>
        </span>
      );
    },
  },
  {
    id: 'maternity',
    header: 'Maternity',
    cell: ({ row }) => {
      const m = row.original.maternity;
      if (m.total === 0) return <span className="text-muted-foreground" style={{ fontSize: 'var(--text-sm)' }}>N/A</span>;
      return (
        <span style={{ fontSize: 'var(--text-sm)' }}>
          <span className="text-foreground">{m.remaining}</span>
          <span className="text-muted-foreground">/{m.total}</span>
        </span>
      );
    },
  },
];

export default function LeaveBalancePage() {
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
            <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-amber-500/10 text-amber-500">
              <Calendar className="h-5 w-5" strokeWidth={1.8} />
            </div>
            <h1
              className="font-bold text-foreground"
              style={{ fontSize: 'var(--text-xl)', letterSpacing: 'var(--tracking-tight)', lineHeight: 'var(--leading-tight)' }}
            >
              Leave Balance Report
            </h1>
          </div>
          <p
            className="text-muted-foreground mt-1"
            style={{ fontSize: 'var(--text-sm)', letterSpacing: 'var(--tracking-normal)', lineHeight: 'var(--leading-normal)' }}
          >
            Employee leave balance breakdown by type
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] as const }}
        >
          <SmartTable
            data={leaveBalanceData}
            columns={columns}
            searchable
            searchPlaceholder="Search employees..."
            emptyMessage="No leave balance data found"
          />
        </motion.div>
      </div>
    </PageTransition>
  );
}
