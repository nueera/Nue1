'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { PageTransition } from '@/modules/erp/design-system/components/animations';
import { type ColumnDef } from '@tanstack/react-table';
import {
  ArrowLeftRight,
  Plus,
  Clock,
  Users,
  CalendarDays,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { SmartTable } from '@/modules/erp/shared/components/smart-table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

// Mock shift types for overview
const shiftTypes = [
  { id: 'st-1', name: 'Morning Shift', startTime: '06:00', endTime: '14:00', color: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/15' },
  { id: 'st-2', name: 'Afternoon Shift', startTime: '14:00', endTime: '22:00', color: 'bg-orange-500/10 text-orange-600 dark:text-orange-400 border-orange-500/15' },
  { id: 'st-3', name: 'Night Shift', startTime: '22:00', endTime: '06:00', color: 'bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/15' },
  { id: 'st-4', name: 'General Shift', startTime: '09:00', endTime: '18:00', color: 'bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/15' },
];

interface ShiftAssignment {
  id: string;
  employeeName: string;
  shiftType: string;
  effectiveDate: string;
  endDate: string;
  status: string;
}

const shiftAssignments: ShiftAssignment[] = [
  { id: 'sa-1', employeeName: 'John Smith', shiftType: 'Morning Shift', effectiveDate: '2025-03-01', endDate: '2025-03-31', status: 'active' },
  { id: 'sa-2', employeeName: 'Sarah Wilson', shiftType: 'General Shift', effectiveDate: '2025-03-01', endDate: '2025-03-31', status: 'active' },
  { id: 'sa-3', employeeName: 'Mike Johnson', shiftType: 'Night Shift', effectiveDate: '2025-03-01', endDate: '2025-03-15', status: 'active' },
  { id: 'sa-4', employeeName: 'Emily Davis', shiftType: 'Afternoon Shift', effectiveDate: '2025-03-15', endDate: '2025-03-31', status: 'upcoming' },
  { id: 'sa-5', employeeName: 'Alex Brown', shiftType: 'Morning Shift', effectiveDate: '2025-02-01', endDate: '2025-02-28', status: 'expired' },
];

const statusBadgeClass: Record<string, string> = {
  active: 'bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/15',
  upcoming: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/15',
  expired: 'bg-zinc-500/10 text-zinc-500 dark:text-zinc-400 border-zinc-500/15',
};

const columns: ColumnDef<ShiftAssignment>[] = [
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
    accessorKey: 'shiftType',
    header: 'Shift Type',
    cell: ({ getValue }) => {
      const shift = shiftTypes.find(s => s.name === getValue() as string);
      return (
        <Badge
          variant="outline"
          className={cn('capitalize', shift?.color || '')}
          style={{ fontSize: 'var(--text-xs)' }}
        >
          {getValue() as string}
        </Badge>
      );
    },
  },
  {
    accessorKey: 'effectiveDate',
    header: 'Effective Date',
    cell: ({ getValue }) => new Date(getValue() as string).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }),
  },
  {
    accessorKey: 'endDate',
    header: 'End Date',
    cell: ({ getValue }) => new Date(getValue() as string).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }),
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

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.06, delayChildren: 0.08 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 12, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.24, ease: [0.25, 0.46, 0.45, 0.94] as const },
  },
};

export default function ShiftsPage() {
  const router = useRouter();

  const summaryStats = [
    { label: 'Shift Types', value: shiftTypes.length, icon: Clock, color: 'text-module-erp' },
    { label: 'Active Assignments', value: shiftAssignments.filter(a => a.status === 'active').length, icon: Users, color: 'text-green-500' },
    { label: 'Upcoming', value: shiftAssignments.filter(a => a.status === 'upcoming').length, icon: CalendarDays, color: 'text-amber-500' },
  ];

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
              Shifts
            </h1>
            <p
              className="text-muted-foreground mt-1"
              style={{
                fontSize: 'var(--text-sm)',
                letterSpacing: 'var(--tracking-normal)',
                lineHeight: 'var(--leading-normal)',
              }}
            >
              Manage shift types, assignments, and change requests
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              className="gap-2 press-scale"
              style={{ fontSize: 'var(--text-sm)' }}
              onClick={() => router.push('/erp/hrm/shifts/types')}
            >
              <Clock className="h-4 w-4" strokeWidth={1.8} />
              Shift Types
            </Button>
            <Button
              className="bg-module-erp hover:bg-module-erp/90 text-white gap-2 press-scale"
              style={{ fontSize: 'var(--text-sm)' }}
              onClick={() => router.push('/erp/hrm/shifts/assignments')}
            >
              <Plus className="h-4 w-4" strokeWidth={1.8} />
              Assign Shift
            </Button>
          </div>
        </motion.div>

        {/* Summary stats */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6"
        >
          {summaryStats.map((stat) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                variants={cardVariants}
                className="glass-surface rounded-xl p-5 group cursor-default hover:border-module-erp/30 transition-colors duration-[var(--motion-fast)]"
              >
                <div className="flex items-center gap-3">
                  <div className={cn('flex items-center justify-center w-10 h-10 rounded-xl shrink-0', `${stat.color}/10`)}>
                    <Icon className={cn('h-5 w-5', stat.color)} strokeWidth={1.8} />
                  </div>
                  <div>
                    <p className="font-bold text-foreground" style={{ fontSize: 'var(--text-xl)', letterSpacing: 'var(--tracking-tight)' }}>
                      {stat.value}
                    </p>
                    <p className="text-muted-foreground" style={{ fontSize: 'var(--text-xs)', letterSpacing: 'var(--tracking-wide)' }}>
                      {stat.label}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Shift type cards */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] as const }}
          className="mb-6"
        >
          <h2
            className="font-semibold text-foreground mb-4"
            style={{ fontSize: 'var(--text-base)', letterSpacing: 'var(--tracking-tight)' }}
          >
            Shift Types
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {shiftTypes.map((shift) => (
              <div
                key={shift.id}
                className="glass-surface rounded-xl p-4 hover:border-module-erp/30 transition-colors duration-[var(--motion-fast)] cursor-pointer"
                onClick={() => router.push('/erp/hrm/shifts/types')}
              >
                <div className="flex items-center gap-2 mb-2">
                  <ArrowLeftRight className="h-4 w-4 text-module-erp" strokeWidth={1.8} />
                  <span className="font-medium text-foreground" style={{ fontSize: 'var(--text-sm)' }}>
                    {shift.name}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className={cn(shift.color)} style={{ fontSize: 'var(--text-xs)' }}>
                    {shift.startTime} - {shift.endTime}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Recent assignments table */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.15, ease: [0.25, 0.46, 0.45, 0.94] as const }}
        >
          <h2
            className="font-semibold text-foreground mb-4"
            style={{ fontSize: 'var(--text-base)', letterSpacing: 'var(--tracking-tight)' }}
          >
            Recent Assignments
          </h2>
          <SmartTable
            data={shiftAssignments}
            columns={columns}
            searchable
            searchPlaceholder="Search shift assignments..."
            emptyMessage="No shift assignments found"
          />
        </motion.div>
      </div>
    </PageTransition>
  );
}
