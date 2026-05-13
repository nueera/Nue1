'use client';

import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { PageTransition } from '@/modules/erp/design-system/components/animations';
import {
  FileBarChart,
  BarChart3,
  Calendar,
  DollarSign,
  Cake,
  Clock,
  Wrench,
} from 'lucide-react';
import { cn } from '@/lib/utils';

const reportCategories = [
  {
    id: 'analytics',
    title: 'Employee Analytics',
    description: 'Workforce demographics, trends, and insights',
    icon: BarChart3,
    color: 'text-module-erp',
    slug: 'analytics',
  },
  {
    id: 'leave-balance',
    title: 'Leave Balance',
    description: 'Employee leave balance breakdown',
    icon: Calendar,
    color: 'text-amber-500',
    slug: 'leave-balance',
  },
  {
    id: 'leave-summary',
    title: 'Leave Summary',
    description: 'Aggregated leave usage summary',
    icon: FileBarChart,
    color: 'text-green-500',
    slug: 'leave-summary',
  },
  {
    id: 'advance-summary',
    title: 'Advance Summary',
    description: 'Employee advance and repayment summary',
    icon: DollarSign,
    color: 'text-cyan-500',
    slug: 'advance-summary',
  },
  {
    id: 'birthdays',
    title: 'Birthday List',
    description: 'Upcoming employee birthdays',
    icon: Cake,
    color: 'text-pink-500',
    slug: 'birthdays',
  },
  {
    id: 'daily-work-summary',
    title: 'Daily Work Summary',
    description: 'Daily attendance and work hours report',
    icon: Clock,
    color: 'text-orange-500',
    slug: 'daily-work-summary',
  },
  {
    id: 'custom',
    title: 'Custom Report Builder',
    description: 'Build custom reports with filters',
    icon: Wrench,
    color: 'text-purple-500',
    slug: 'custom',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.05, delayChildren: 0.08 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 12, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.24, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

export default function ReportsPage() {
  const router = useRouter();

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
            style={{ fontSize: 'var(--text-xl)', letterSpacing: 'var(--tracking-tight)', lineHeight: 'var(--leading-tight)' }}
          >
            HRM Reports
          </h1>
          <p
            className="text-muted-foreground mt-1"
            style={{ fontSize: 'var(--text-sm)', letterSpacing: 'var(--tracking-normal)', lineHeight: 'var(--leading-normal)' }}
          >
            Access and generate HR reports and analytics
          </p>
        </motion.div>

        {/* Report cards grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {reportCategories.map((report) => {
            const Icon = report.icon;
            return (
              <motion.button
                key={report.id}
                variants={cardVariants}
                whileHover={{ scale: 1.005 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => router.push(`/erp/hrm/reports/${report.slug}`)}
                className="glass-surface rounded-xl p-6 flex flex-col items-start gap-4 group cursor-pointer hover:border-module-erp/30 transition-colors duration-[var(--motion-fast)] press-scale text-left"
              >
                <div className={cn('flex items-center justify-center w-12 h-12 rounded-xl', `${report.color}/10`)}>
                  <Icon className={cn('h-6 w-6', report.color)} strokeWidth={1.8} />
                </div>
                <div>
                  <h3
                    className="font-semibold text-foreground group-hover:text-module-erp transition-colors duration-[var(--motion-fast)]"
                    style={{ fontSize: 'var(--text-base)', letterSpacing: 'var(--tracking-tight)' }}
                  >
                    {report.title}
                  </h3>
                  <p
                    className="text-muted-foreground mt-1"
                    style={{ fontSize: 'var(--text-sm)', letterSpacing: 'var(--tracking-normal)', lineHeight: 'var(--leading-normal)' }}
                  >
                    {report.description}
                  </p>
                </div>
              </motion.button>
            );
          })}
        </motion.div>
      </div>
    </PageTransition>
  );
}
