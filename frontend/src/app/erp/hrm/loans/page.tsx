'use client';

import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { PageTransition } from '@/modules/erp/design-system/components/animations';
import { type ColumnDef } from '@tanstack/react-table';
import {
  Landmark,
  DollarSign,
  Clock,
  CheckCircle2,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { SmartTable } from '@/modules/erp/shared/components/smart-table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface LoanApplication {
  id: string;
  employeeName: string;
  loanType: string;
  amount: number;
  term: string;
  status: string;
  applicationDate: string;
  remainingAmount: number;
}

const loanApplications: LoanApplication[] = [
  { id: 'la-1', employeeName: 'John Smith', loanType: 'Personal Loan', amount: 5000, term: '12 months', status: 'active', applicationDate: '2025-02-01', remainingAmount: 4166 },
  { id: 'la-2', employeeName: 'Sarah Wilson', loanType: 'Emergency Loan', amount: 2000, term: '6 months', status: 'pending', applicationDate: '2025-03-01', remainingAmount: 2000 },
  { id: 'la-3', employeeName: 'Mike Johnson', loanType: 'Education Loan', amount: 10000, term: '24 months', status: 'approved', applicationDate: '2025-02-15', remainingAmount: 10000 },
  { id: 'la-4', employeeName: 'Emily Davis', loanType: 'Personal Loan', amount: 3000, term: '12 months', status: 'repaid', applicationDate: '2024-03-01', remainingAmount: 0 },
  { id: 'la-5', employeeName: 'Alex Brown', loanType: 'Emergency Loan', amount: 1500, term: '3 months', status: 'rejected', applicationDate: '2025-02-20', remainingAmount: 0 },
  { id: 'la-6', employeeName: 'Lisa Chen', loanType: 'Vehicle Loan', amount: 15000, term: '36 months', status: 'active', applicationDate: '2025-01-15', remainingAmount: 14583 },
];

const statusBadgeClass: Record<string, string> = {
  pending: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/15',
  approved: 'bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/15',
  active: 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/15',
  repaid: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/15',
  rejected: 'bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/15',
};

const columns: ColumnDef<LoanApplication>[] = [
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
    accessorKey: 'loanType',
    header: 'Loan Type',
    cell: ({ getValue }) => (
      <Badge variant="outline" className="text-module-erp" style={{ fontSize: 'var(--text-xs)' }}>
        {getValue() as string}
      </Badge>
    ),
  },
  {
    accessorKey: 'amount',
    header: 'Amount',
    cell: ({ getValue }) => (
      <span className="font-semibold text-foreground" style={{ fontSize: 'var(--text-sm)' }}>
        ${(getValue() as number).toLocaleString()}
      </span>
    ),
  },
  {
    accessorKey: 'term',
    header: 'Term',
    cell: ({ getValue }) => (
      <span className="text-muted-foreground" style={{ fontSize: 'var(--text-sm)' }}>
        {getValue() as string}
      </span>
    ),
  },
  {
    accessorKey: 'remainingAmount',
    header: 'Remaining',
    cell: ({ getValue }) => {
      const val = getValue() as number;
      return (
        <span className={cn(val > 0 ? 'text-amber-500' : 'text-green-500')} style={{ fontSize: 'var(--text-sm)' }}>
          ${val.toLocaleString()}
        </span>
      );
    },
  },
  {
    accessorKey: 'applicationDate',
    header: 'Applied',
    cell: ({ getValue }) => new Date(getValue() as string).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }),
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

export default function LoansPage() {
  const router = useRouter();

  const totalDisbursed = loanApplications.filter(l => l.status === 'active' || l.status === 'repaid').reduce((a, l) => a + l.amount, 0);
  const totalOutstanding = loanApplications.filter(l => l.status === 'active').reduce((a, l) => a + l.remainingAmount, 0);

  const summaryStats = [
    { label: 'Total Disbursed', value: `$${totalDisbursed.toLocaleString()}`, icon: Landmark, color: 'text-module-erp' },
    { label: 'Outstanding', value: `$${totalOutstanding.toLocaleString()}`, icon: DollarSign, color: 'text-amber-500' },
    { label: 'Pending', value: loanApplications.filter(l => l.status === 'pending').length, icon: Clock, color: 'text-orange-500' },
    { label: 'Repaid', value: loanApplications.filter(l => l.status === 'repaid').length, icon: CheckCircle2, color: 'text-green-500' },
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
              style={{ fontSize: 'var(--text-xl)', letterSpacing: 'var(--tracking-tight)', lineHeight: 'var(--leading-tight)' }}
            >
              Loans
            </h1>
            <p
              className="text-muted-foreground mt-1"
              style={{ fontSize: 'var(--text-sm)', letterSpacing: 'var(--tracking-normal)', lineHeight: 'var(--leading-normal)' }}
            >
              Manage employee loan applications and repayments
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              className="gap-2 press-scale"
              style={{ fontSize: 'var(--text-sm)' }}
              onClick={() => router.push('/erp/hrm/loans/types')}
            >
              <Landmark className="h-4 w-4" strokeWidth={1.8} />
              Loan Types
            </Button>
            <Button
              className="bg-module-erp hover:bg-module-erp/90 text-white gap-2 press-scale"
              style={{ fontSize: 'var(--text-sm)' }}
              onClick={() => router.push('/erp/hrm/loans/applications')}
            >
              Apply Loan
            </Button>
          </div>
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

        {/* Loan applications table */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] as const }}
        >
          <h2
            className="font-semibold text-foreground mb-4"
            style={{ fontSize: 'var(--text-base)', letterSpacing: 'var(--tracking-tight)' }}
          >
            Loan Applications
          </h2>
          <SmartTable
            data={loanApplications}
            columns={columns}
            searchable
            searchPlaceholder="Search loan applications..."
            emptyMessage="No loan applications found"
          />
        </motion.div>
      </div>
    </PageTransition>
  );
}
