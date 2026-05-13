'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { PageTransition } from '@/modules/erp/design-system/components/animations';
import { type ColumnDef } from '@tanstack/react-table';
import { Clock } from 'lucide-react';
import { cn } from '@/lib/utils';
import { SmartTable } from '@/modules/erp/shared/components/smart-table';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';

interface DailyWorkRecord {
  id: string;
  employeeName: string;
  department: string;
  checkIn: string;
  checkOut: string;
  hoursWorked: number;
  status: string;
  tasksCompleted: number;
}

const dailyWorkData: DailyWorkRecord[] = [
  { id: '1', employeeName: 'John Smith', department: 'Engineering', checkIn: '08:45', checkOut: '17:30', hoursWorked: 8.75, status: 'present', tasksCompleted: 5 },
  { id: '2', employeeName: 'Sarah Wilson', department: 'Design', checkIn: '09:15', checkOut: '18:00', hoursWorked: 8.75, status: 'present', tasksCompleted: 3 },
  { id: '3', employeeName: 'Mike Johnson', department: 'Engineering', checkIn: '09:30', checkOut: '17:00', hoursWorked: 7.5, status: 'present', tasksCompleted: 4 },
  { id: '4', employeeName: 'Emily Davis', department: 'Marketing', checkIn: '-', checkOut: '-', hoursWorked: 0, status: 'absent', tasksCompleted: 0 },
  { id: '5', employeeName: 'Alex Brown', department: 'Sales', checkIn: '08:00', checkOut: '16:00', hoursWorked: 8.0, status: 'present', tasksCompleted: 6 },
  { id: '6', employeeName: 'Lisa Chen', department: 'Analytics', checkIn: '09:45', checkOut: '18:30', hoursWorked: 8.75, status: 'late', tasksCompleted: 4 },
  { id: '7', employeeName: 'Tom Garcia', department: 'Engineering', checkIn: '-', checkOut: '-', hoursWorked: 0, status: 'on-leave', tasksCompleted: 0 },
  { id: '8', employeeName: 'Rachel Kim', department: 'Marketing', checkIn: '08:30', checkOut: '13:00', hoursWorked: 4.5, status: 'half-day', tasksCompleted: 2 },
];

const statusBadgeClass: Record<string, string> = {
  present: 'bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/15',
  absent: 'bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/15',
  late: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/15',
  'half-day': 'bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 border-yellow-500/15',
  'on-leave': 'bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/15',
};

const columns: ColumnDef<DailyWorkRecord>[] = [
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
    accessorKey: 'checkIn',
    header: 'Check In',
    cell: ({ getValue }) => (
      <span style={{ fontSize: 'var(--text-sm)' }}>{getValue() as string}</span>
    ),
  },
  {
    accessorKey: 'checkOut',
    header: 'Check Out',
    cell: ({ getValue }) => (
      <span style={{ fontSize: 'var(--text-sm)' }}>{getValue() as string}</span>
    ),
  },
  {
    accessorKey: 'hoursWorked',
    header: 'Hours',
    cell: ({ getValue }) => {
      const hours = getValue() as number;
      return (
        <span className={cn('font-semibold', hours >= 8 ? 'text-green-500' : hours > 0 ? 'text-amber-500' : 'text-muted-foreground')} style={{ fontSize: 'var(--text-sm)' }}>
          {hours > 0 ? `${hours}h` : '-'}
        </span>
      );
    },
  },
  {
    accessorKey: 'tasksCompleted',
    header: 'Tasks',
    cell: ({ getValue }) => (
      <span style={{ fontSize: 'var(--text-sm)' }}>{(getValue() as number) > 0 ? getValue() as number : '-'}</span>
    ),
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ getValue }) => {
      const status = getValue() as string;
      return (
        <Badge variant="outline" className={cn('capitalize', statusBadgeClass[status] || '')} style={{ fontSize: 'var(--text-xs)' }}>
          {status.replace('-', ' ')}
        </Badge>
      );
    },
  },
];

export default function DailyWorkSummaryPage() {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);

  const presentCount = dailyWorkData.filter(d => d.status === 'present').length;
  const absentCount = dailyWorkData.filter(d => d.status === 'absent').length;
  const lateCount = dailyWorkData.filter(d => d.status === 'late').length;
  const avgHours = dailyWorkData.filter(d => d.hoursWorked > 0).reduce((a, d) => a + d.hoursWorked, 0) / dailyWorkData.filter(d => d.hoursWorked > 0).length;

  return (
    <PageTransition>
      <div className="p-4 sm:p-6 lg:p-8">
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.24, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6"
        >
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-orange-500/10 text-orange-500">
                <Clock className="h-5 w-5" strokeWidth={1.8} />
              </div>
              <h1
                className="font-bold text-foreground"
                style={{ fontSize: 'var(--text-xl)', letterSpacing: 'var(--tracking-tight)', lineHeight: 'var(--leading-tight)' }}
              >
                Daily Work Summary
              </h1>
            </div>
            <p
              className="text-muted-foreground mt-1"
              style={{ fontSize: 'var(--text-sm)', letterSpacing: 'var(--tracking-normal)', lineHeight: 'var(--leading-normal)' }}
            >
              Daily attendance and work hours report
            </p>
          </div>
          <Input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="w-[180px]"
          />
        </motion.div>

        {/* Quick stats */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.05, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="flex items-center gap-4 mb-6"
        >
          {[
            { label: 'Present', count: presentCount, color: 'text-green-500' },
            { label: 'Absent', count: absentCount, color: 'text-red-500' },
            { label: 'Late', count: lateCount, color: 'text-amber-500' },
            { label: 'Avg Hours', count: avgHours.toFixed(1), color: 'text-module-erp' },
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
            data={dailyWorkData as unknown as Record<string, unknown>[]}
            columns={columns}
            searchable
            searchPlaceholder="Search employees..."
            emptyMessage="No work data found"
          />
        </motion.div>
      </div>
    </PageTransition>
  );
}
