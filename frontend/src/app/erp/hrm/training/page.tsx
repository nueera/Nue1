'use client';

import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { PageTransition } from '@/modules/erp/design-system/components/animations';
import { type ColumnDef } from '@tanstack/react-table';
import {
  GraduationCap,
  BookOpen,
  Users,
  CheckCircle2,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { SmartTable } from '@/modules/erp/shared/components/smart-table';
import { Badge } from '@/components/ui/badge';

interface TrainingProgram {
  id: string;
  title: string;
  instructor: string;
  department: string;
  startDate: string;
  endDate: string;
  enrolled: number;
  capacity: number;
  status: string;
}

const trainingPrograms: TrainingProgram[] = [
  { id: 'tp-1', title: 'React Advanced Patterns', instructor: 'David Park', department: 'Engineering', startDate: '2025-03-10', endDate: '2025-03-14', enrolled: 12, capacity: 15, status: 'upcoming' },
  { id: 'tp-2', title: 'Leadership Workshop', instructor: 'External Trainer', department: 'All', startDate: '2025-03-05', endDate: '2025-03-07', enrolled: 20, capacity: 20, status: 'in-progress' },
  { id: 'tp-3', title: 'Data Analytics Bootcamp', instructor: 'Lisa Chen', department: 'Analytics', startDate: '2025-02-20', endDate: '2025-02-28', enrolled: 8, capacity: 12, status: 'completed' },
  { id: 'tp-4', title: 'Cloud Security Fundamentals', instructor: 'Mike Johnson', department: 'Engineering', startDate: '2025-03-15', endDate: '2025-03-20', enrolled: 6, capacity: 15, status: 'upcoming' },
  { id: 'tp-5', title: 'Project Management PMP Prep', instructor: 'External Trainer', department: 'All', startDate: '2025-03-25', endDate: '2025-04-05', enrolled: 10, capacity: 25, status: 'upcoming' },
  { id: 'tp-6', title: 'Effective Communication', instructor: 'HR Team', department: 'All', startDate: '2025-02-10', endDate: '2025-02-12', enrolled: 30, capacity: 30, status: 'completed' },
];

const statusBadgeClass: Record<string, string> = {
  upcoming: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/15',
  'in-progress': 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/15',
  completed: 'bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/15',
  cancelled: 'bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/15',
};

const columns: ColumnDef<TrainingProgram>[] = [
  {
    accessorKey: 'title',
    header: 'Program',
    cell: ({ getValue }) => (
      <span className="font-medium text-foreground" style={{ fontSize: 'var(--text-sm)' }}>
        {getValue() as string}
      </span>
    ),
  },
  {
    accessorKey: 'instructor',
    header: 'Instructor',
    cell: ({ getValue }) => (
      <span className="text-muted-foreground" style={{ fontSize: 'var(--text-sm)' }}>
        {getValue() as string}
      </span>
    ),
  },
  {
    accessorKey: 'department',
    header: 'Department',
    cell: ({ getValue }) => (
      <Badge variant="outline" className="text-muted-foreground" style={{ fontSize: 'var(--text-xs)' }}>
        {getValue() as string}
      </Badge>
    ),
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
  {
    accessorKey: 'enrolled',
    header: 'Enrolled',
    cell: ({ row }) => (
      <span style={{ fontSize: 'var(--text-sm)' }}>
        <span className="font-semibold text-foreground">{row.original.enrolled}</span>
        <span className="text-muted-foreground">/{row.original.capacity}</span>
      </span>
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

export default function TrainingPage() {
  const router = useRouter();

  const summaryStats = [
    { label: 'Total Programs', value: trainingPrograms.length, icon: BookOpen, color: 'text-module-erp' },
    { label: 'In Progress', value: trainingPrograms.filter(p => p.status === 'in-progress').length, icon: GraduationCap, color: 'text-blue-500' },
    { label: 'Upcoming', value: trainingPrograms.filter(p => p.status === 'upcoming').length, icon: Users, color: 'text-amber-500' },
    { label: 'Completed', value: trainingPrograms.filter(p => p.status === 'completed').length, icon: CheckCircle2, color: 'text-green-500' },
  ];

  const handleRowClick = (program: TrainingProgram) => {
    router.push(`/erp/hrm/training/${program.id}`);
  };

  return (
    <PageTransition>
      <div className="p-4 sm:p-6 lg:p-8">
        {/* Page header */}
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.24, ease: [0.25, 0.46, 0.45, 0.94] as const }}
          className="mb-6"
        >
          <h1
            className="font-bold text-foreground"
            style={{ fontSize: 'var(--text-xl)', letterSpacing: 'var(--tracking-tight)', lineHeight: 'var(--leading-tight)' }}
          >
            Training
          </h1>
          <p
            className="text-muted-foreground mt-1"
            style={{ fontSize: 'var(--text-sm)', letterSpacing: 'var(--tracking-normal)', lineHeight: 'var(--leading-normal)' }}
          >
            Manage training programs, enrollments, and feedback
          </p>
        </motion.div>

        {/* Summary stats */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6"
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

        {/* Training programs table */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] as const }}
        >
          <SmartTable
            data={trainingPrograms}
            columns={columns}
            searchable
            searchPlaceholder="Search training programs..."
            onRowClick={handleRowClick}
            emptyMessage="No training programs found"
          />
        </motion.div>
      </div>
    </PageTransition>
  );
}
