'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { PageTransition } from '@/modules/erp/design-system/components/animations';
import { type ColumnDef } from '@tanstack/react-table';
import {
  Receipt,
  DollarSign,
  TrendingUp,
  Plane,
  Wallet,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { SmartTable } from '@/modules/erp/shared/components/smart-table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface ExpenseClaim {
  id: string;
  employeeName: string;
  type: string;
  amount: number;
  status: string;
  submittedDate: string;
  description: string;
}

const expenseClaims: ExpenseClaim[] = [
  { id: 'ec-1', employeeName: 'John Smith', type: 'Travel', amount: 450, status: 'pending', submittedDate: '2025-03-01', description: 'Client visit - Chicago' },
  { id: 'ec-2', employeeName: 'Sarah Wilson', type: 'Meals', amount: 85, status: 'approved', submittedDate: '2025-02-28', description: 'Team lunch meeting' },
  { id: 'ec-3', employeeName: 'Mike Johnson', type: 'Office Supplies', amount: 210, status: 'approved', submittedDate: '2025-02-27', description: 'Monitor and keyboard' },
  { id: 'ec-4', employeeName: 'Emily Davis', type: 'Training', amount: 1200, status: 'pending', submittedDate: '2025-03-02', description: 'Conference registration' },
  { id: 'ec-5', employeeName: 'Alex Brown', type: 'Travel', amount: 780, status: 'rejected', submittedDate: '2025-02-25', description: 'Non-approved trip' },
  { id: 'ec-6', employeeName: 'Lisa Chen', type: 'Internet', amount: 60, status: 'approved', submittedDate: '2025-02-20', description: 'Home office internet' },
];

const statusBadgeClass: Record<string, string> = {
  pending: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/15',
  approved: 'bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/15',
  rejected: 'bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/15',
  reimbursed: 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/15',
};

const columns: ColumnDef<ExpenseClaim>[] = [
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
    cell: ({ getValue }) => (
      <Badge variant="outline" className="text-muted-foreground" style={{ fontSize: 'var(--text-xs)' }}>
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
    accessorKey: 'submittedDate',
    header: 'Submitted',
    cell: ({ getValue }) => new Date(getValue() as string).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }),
  },
  {
    accessorKey: 'description',
    header: 'Description',
    cell: ({ getValue }) => (
      <span className="text-muted-foreground truncate max-w-[200px] block" style={{ fontSize: 'var(--text-sm)' }}>
        {getValue() as string}
      </span>
    ),
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

export default function ExpensesPage() {
  const router = useRouter();

  const summaryStats = [
    { label: 'Total Claims', value: `$${expenseClaims.reduce((a, c) => a + c.amount, 0).toLocaleString()}`, icon: Receipt, color: 'text-module-erp' },
    { label: 'Pending Approval', value: `$${expenseClaims.filter(c => c.status === 'pending').reduce((a, c) => a + c.amount, 0).toLocaleString()}`, icon: DollarSign, color: 'text-amber-500' },
    { label: 'Approved', value: `$${expenseClaims.filter(c => c.status === 'approved').reduce((a, c) => a + c.amount, 0).toLocaleString()}`, icon: TrendingUp, color: 'text-green-500' },
    { label: 'Advances', value: '3', icon: Wallet, color: 'text-cyan-500' },
  ];

  const quickLinks = [
    { label: 'Expense Claims', slug: 'claims', icon: Receipt },
    { label: 'Employee Advances', slug: 'advances', icon: Wallet },
    { label: 'Travel Requests', slug: 'travel', icon: Plane },
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
              Expenses
            </h1>
            <p
              className="text-muted-foreground mt-1"
              style={{ fontSize: 'var(--text-sm)', letterSpacing: 'var(--tracking-normal)', lineHeight: 'var(--leading-normal)' }}
            >
              Track and manage employee expenses, advances, and travel
            </p>
          </div>
          <Button
            className="bg-module-erp hover:bg-module-erp/90 text-white gap-2 press-scale"
            style={{ fontSize: 'var(--text-sm)' }}
            onClick={() => router.push('/erp/hrm/expenses/claims')}
          >
            <Receipt className="h-4 w-4" strokeWidth={1.8} />
            New Claim
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

        {/* Quick links */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] as const }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6"
        >
          {quickLinks.map((link) => {
            const Icon = link.icon;
            return (
              <button
                key={link.slug}
                onClick={() => router.push(`/erp/hrm/expenses/${link.slug}`)}
                className="glass-surface rounded-xl p-4 flex items-center gap-3 group cursor-pointer hover:border-module-erp/30 transition-colors duration-[var(--motion-fast)] press-scale text-left"
              >
                <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-module-erp/8 text-module-erp group-hover:scale-[1.02] transition-transform duration-[var(--motion-base)]">
                  <Icon className="h-5 w-5" strokeWidth={1.8} />
                </div>
                <span className="font-medium text-foreground" style={{ fontSize: 'var(--text-sm)' }}>
                  {link.label}
                </span>
              </button>
            );
          })}
        </motion.div>

        {/* Recent claims table */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.15, ease: [0.25, 0.46, 0.45, 0.94] as const }}
        >
          <h2
            className="font-semibold text-foreground mb-4"
            style={{ fontSize: 'var(--text-base)', letterSpacing: 'var(--tracking-tight)' }}
          >
            Recent Claims
          </h2>
          <SmartTable
            data={expenseClaims}
            columns={columns}
            searchable
            searchPlaceholder="Search expense claims..."
            emptyMessage="No expense claims found"
          />
        </motion.div>
      </div>
    </PageTransition>
  );
}
