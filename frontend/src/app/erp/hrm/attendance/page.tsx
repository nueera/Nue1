'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { PageTransition } from '@/modules/erp/design-system/components/animations';
import { type ColumnDef } from '@tanstack/react-table';
import { Clock } from 'lucide-react';
import { cn } from '@/lib/utils';
import { attendanceRecords, type AttendanceRecord } from '@/modules/erp/data/mock';
import { SmartTable } from '@/modules/erp/shared/components/smart-table';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const statusBadgeClass: Record<string, string> = {
  present: 'bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/15',
  absent: 'bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/15',
  late: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/15',
  'half-day': 'bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 border-yellow-500/15',
};

const statuses = ['All', 'present', 'absent', 'late', 'half-day'];

function calcHoursWorked(checkIn: string, checkOut: string): string {
  if (checkIn === '-' || checkOut === '-') return '-';
  const [h1, m1] = checkIn.split(':').map(Number);
  const [h2, m2] = checkOut.split(':').map(Number);
  const diff = (h2 * 60 + m2 - (h1 * 60 + m1)) / 60;
  return `${diff.toFixed(1)}h`;
}

const columns: ColumnDef<AttendanceRecord>[] = [
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
    accessorKey: 'date',
    header: 'Date',
    cell: ({ getValue }) => {
      const date = getValue() as string;
      return new Date(date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
    },
  },
  { accessorKey: 'checkIn', header: 'Check In' },
  { accessorKey: 'checkOut', header: 'Check Out' },
  {
    id: 'hoursWorked',
    header: 'Hours Worked',
    cell: ({ row }) => (
      <span className="text-muted-foreground" style={{ fontSize: 'var(--text-sm)' }}>
        {calcHoursWorked(row.original.checkIn, row.original.checkOut)}
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
          {status.replace('-', ' ')}
        </Badge>
      );
    },
  },
];

export default function AttendancePage() {
  const [statusFilter, setStatusFilter] = useState('All');

  const filteredRecords = useMemo(() => {
    if (statusFilter === 'All') return attendanceRecords;
    return attendanceRecords.filter((r) => r.status === statusFilter);
  }, [statusFilter]);

  return (
    <PageTransition>
    <div className="p-4 sm:p-6 lg:p-8">
      {/* Page header */}
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.24, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="mb-6"
      >
        <h1
          className="font-bold text-foreground"
          style={{
            fontSize: 'var(--text-xl)',
            letterSpacing: 'var(--tracking-tight)',
            lineHeight: 'var(--leading-tight)',
          }}
        >
          Attendance
        </h1>
        <p
          className="text-muted-foreground mt-1"
          style={{
            fontSize: 'var(--text-sm)',
            letterSpacing: 'var(--tracking-normal)',
            lineHeight: 'var(--leading-normal)',
          }}
        >
          Track employee attendance and work hours
        </p>
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
                {status === 'All' ? 'All Statuses' : status.replace('-', ' ')}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </motion.div>

      {/* Quick stats */}
      <motion.div
        initial={{ opacity: 0, y: -2 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.18, delay: 0.07, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="flex items-center gap-4 mb-6"
      >
        {[
          { label: 'Present', count: attendanceRecords.filter(r => r.status === 'present').length, color: 'text-green-500' },
          { label: 'Late', count: attendanceRecords.filter(r => r.status === 'late').length, color: 'text-amber-500' },
          { label: 'Absent', count: attendanceRecords.filter(r => r.status === 'absent').length, color: 'text-red-500' },
          { label: 'Half Day', count: attendanceRecords.filter(r => r.status === 'half-day').length, color: 'text-yellow-500' },
        ].map((s) => (
          <div key={s.label} className="flex items-center gap-1.5">
            <span className={cn('font-semibold', s.color)} style={{ fontSize: 'var(--text-sm)' }}>{s.count}</span>
            <span className="text-muted-foreground" style={{ fontSize: 'var(--text-xs)', letterSpacing: 'var(--tracking-normal)' }}>{s.label}</span>
          </div>
        ))}
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
          searchPlaceholder="Search attendance..."
          emptyMessage="No attendance records found"
        />
      </motion.div>
    </div>
    </PageTransition>
  );
}
