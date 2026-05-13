'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { PageTransition } from '@/modules/erp/design-system/components/animations';
import { type ColumnDef } from '@tanstack/react-table';
import { Plus } from 'lucide-react';
import { cn } from '@/lib/utils';
import { leaveRequests, type LeaveRequest } from '@/modules/erp/data/mock';
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
  pending: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/15',
  approved: 'bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/15',
  rejected: 'bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/15',
};

const typeBadgeClass: Record<string, string> = {
  annual: 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/15',
  sick: 'bg-red-500/10 text-red-500 dark:text-red-400 border-red-500/15',
  personal: 'bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/15',
  maternity: 'bg-pink-500/10 text-pink-600 dark:text-pink-400 border-pink-500/15',
};

const statuses = ['All', 'pending', 'approved', 'rejected'];

const columns: ColumnDef<LeaveRequest>[] = [
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
    accessorKey: 'type',
    header: 'Type',
    cell: ({ getValue }) => {
      const type = getValue() as string;
      return (
        <Badge
          variant="outline"
          className={cn('capitalize', typeBadgeClass[type] || '')}
          style={{ fontSize: 'var(--text-xs)' }}
        >
          {type}
        </Badge>
      );
    },
  },
  {
    accessorKey: 'startDate',
    header: 'Start Date',
    cell: ({ getValue }) => new Date(getValue() as string).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }),
  },
  {
    accessorKey: 'endDate',
    header: 'End Date',
    cell: ({ getValue }) => new Date(getValue() as string).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }),
  },
  { accessorKey: 'days', header: 'Days' },
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
  {
    accessorKey: 'reason',
    header: 'Reason',
    cell: ({ getValue }) => (
      <span className="text-muted-foreground truncate max-w-[200px] block" style={{ fontSize: 'var(--text-sm)' }}>
        {getValue() as string}
      </span>
    ),
  },
];

export default function LeavesPage() {
  const [statusFilter, setStatusFilter] = useState('All');

  const filteredRecords = useMemo(() => {
    if (statusFilter === 'All') return leaveRequests;
    return leaveRequests.filter((r) => r.status === statusFilter);
  }, [statusFilter]);

  return (
    <PageTransition>
    <div className="p-4 sm:p-6 lg:p-8">
      {/* Page header */}
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.24, ease: [0.25, 0.46, 0.45, 0.94] }}
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
            Leave Management
          </h1>
          <p
            className="text-muted-foreground mt-1"
            style={{
              fontSize: 'var(--text-sm)',
              letterSpacing: 'var(--tracking-normal)',
              lineHeight: 'var(--leading-normal)',
            }}
          >
            Review and manage employee leave requests
          </p>
        </div>
        <Button
          className="bg-module-erp hover:bg-module-erp/90 text-white gap-2 press-scale"
          style={{ fontSize: 'var(--text-sm)' }}
        >
          <Plus className="h-4 w-4" strokeWidth={1.8} />
          Apply Leave
        </Button>
      </motion.div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: -4 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.24, delay: 0.05, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="flex flex-wrap items-center gap-3 mb-6"
      >
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
        transition={{ duration: 0.3, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        <SmartTable
          data={filteredRecords as unknown as Record<string, unknown>[]}
          columns={columns}
          searchable
          searchPlaceholder="Search leave requests..."
          emptyMessage="No leave requests found"
        />
      </motion.div>
    </div>
    </PageTransition>
  );
}
