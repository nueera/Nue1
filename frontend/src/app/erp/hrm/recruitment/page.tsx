'use client';

import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { PageTransition } from '@/modules/erp/design-system/components/animations';
import { type ColumnDef } from '@tanstack/react-table';
import {
  Target,
  Users,
  Briefcase,
  UserCheck,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { SmartTable } from '@/modules/erp/shared/components/smart-table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface JobOpening {
  id: string;
  title: string;
  department: string;
  location: string;
  type: string;
  applicants: number;
  status: string;
  postedDate: string;
}

const jobOpenings: JobOpening[] = [
  { id: 'jo-1', title: 'Senior Frontend Developer', department: 'Engineering', location: 'Remote', type: 'Full-time', applicants: 24, status: 'open', postedDate: '2025-02-15' },
  { id: 'jo-2', title: 'Product Designer', department: 'Design', location: 'New York', type: 'Full-time', applicants: 18, status: 'open', postedDate: '2025-02-20' },
  { id: 'jo-3', title: 'Marketing Manager', department: 'Marketing', location: 'Chicago', type: 'Full-time', applicants: 12, status: 'interviewing', postedDate: '2025-02-10' },
  { id: 'jo-4', title: 'DevOps Engineer', department: 'Engineering', location: 'Remote', type: 'Full-time', applicants: 8, status: 'open', postedDate: '2025-03-01' },
  { id: 'jo-5', title: 'Sales Executive', department: 'Sales', location: 'San Francisco', type: 'Full-time', applicants: 15, status: 'closed', postedDate: '2025-01-15' },
  { id: 'jo-6', title: 'Data Analyst', department: 'Analytics', location: 'Remote', type: 'Contract', applicants: 31, status: 'interviewing', postedDate: '2025-02-25' },
];

const statusBadgeClass: Record<string, string> = {
  open: 'bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/15',
  interviewing: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/15',
  closed: 'bg-zinc-500/10 text-zinc-500 dark:text-zinc-400 border-zinc-500/15',
  offered: 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/15',
};

const columns: ColumnDef<JobOpening>[] = [
  {
    accessorKey: 'title',
    header: 'Job Title',
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
      <Badge variant="outline" className="text-muted-foreground" style={{ fontSize: 'var(--text-xs)' }}>
        {getValue() as string}
      </Badge>
    ),
  },
  {
    accessorKey: 'location',
    header: 'Location',
    cell: ({ getValue }) => (
      <span className="text-muted-foreground" style={{ fontSize: 'var(--text-sm)' }}>
        {getValue() as string}
      </span>
    ),
  },
  {
    accessorKey: 'type',
    header: 'Type',
    cell: ({ getValue }) => (
      <span className="text-muted-foreground" style={{ fontSize: 'var(--text-sm)' }}>
        {getValue() as string}
      </span>
    ),
  },
  {
    accessorKey: 'applicants',
    header: 'Applicants',
    cell: ({ getValue }) => (
      <span className="font-semibold text-foreground" style={{ fontSize: 'var(--text-sm)' }}>
        {getValue() as number}
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
          {status}
        </Badge>
      );
    },
  },
  {
    accessorKey: 'postedDate',
    header: 'Posted',
    cell: ({ getValue }) => new Date(getValue() as string).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }),
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

export default function RecruitmentPage() {
  const router = useRouter();

  const summaryStats = [
    { label: 'Open Positions', value: jobOpenings.filter(j => j.status === 'open').length, icon: Briefcase, color: 'text-green-500' },
    { label: 'Interviewing', value: jobOpenings.filter(j => j.status === 'interviewing').length, icon: Users, color: 'text-amber-500' },
    { label: 'Total Applicants', value: jobOpenings.reduce((a, j) => a + j.applicants, 0), icon: UserCheck, color: 'text-module-erp' },
    { label: 'Referrals', value: 7, icon: Target, color: 'text-cyan-500' },
  ];

  const handleRowClick = (job: JobOpening) => {
    router.push(`/erp/hrm/recruitment/${job.id}`);
  };

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
              style={{ fontSize: 'var(--text-xl)', letterSpacing: 'var(--tracking-tight)', lineHeight: 'var(--leading-tight)' }}
            >
              Recruitment
            </h1>
            <p
              className="text-muted-foreground mt-1"
              style={{ fontSize: 'var(--text-sm)', letterSpacing: 'var(--tracking-normal)', lineHeight: 'var(--leading-normal)' }}
            >
              Manage job openings, applicants, and hiring pipeline
            </p>
          </div>
          <Button
            variant="outline"
            className="gap-2 press-scale"
            style={{ fontSize: 'var(--text-sm)' }}
            onClick={() => router.push('/erp/hrm/recruitment/referrals')}
          >
            <Target className="h-4 w-4" strokeWidth={1.8} />
            Referrals
          </Button>
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

        {/* Job openings table */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] as const }}
        >
          <h2
            className="font-semibold text-foreground mb-4"
            style={{ fontSize: 'var(--text-base)', letterSpacing: 'var(--tracking-tight)' }}
          >
            Job Openings
          </h2>
          <SmartTable
            data={jobOpenings}
            columns={columns}
            searchable
            searchPlaceholder="Search job openings..."
            onRowClick={handleRowClick}
            emptyMessage="No job openings found"
          />
        </motion.div>
      </div>
    </PageTransition>
  );
}
