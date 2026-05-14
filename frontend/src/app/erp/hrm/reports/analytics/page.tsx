'use client';

import { motion } from 'framer-motion';
import { PageTransition } from '@/modules/erp/design-system/components/animations';
import {
  BarChart3,
  Users,
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
} from 'lucide-react';
import { cn } from '@/lib/utils';

const departmentData = [
  { department: 'Engineering', headcount: 65, change: +5, percentage: 26.2 },
  { department: 'Marketing', headcount: 32, change: +2, percentage: 12.9 },
  { department: 'Sales', headcount: 45, change: -1, percentage: 18.1 },
  { department: 'HR', headcount: 12, change: +1, percentage: 4.8 },
  { department: 'Finance', headcount: 18, change: 0, percentage: 7.3 },
  { department: 'Operations', headcount: 28, change: +3, percentage: 11.3 },
  { department: 'Design', headcount: 22, change: +2, percentage: 8.9 },
  { department: 'Analytics', headcount: 26, change: +4, percentage: 10.5 },
];

const genderData = [
  { label: 'Male', count: 142, percentage: 57.3 },
  { label: 'Female', count: 98, percentage: 39.5 },
  { label: 'Non-binary', count: 8, percentage: 3.2 },
];

const tenureData = [
  { range: '0-1 year', count: 45, percentage: 18.1 },
  { range: '1-3 years', count: 78, percentage: 31.5 },
  { range: '3-5 years', count: 62, percentage: 25.0 },
  { range: '5-10 years', count: 48, percentage: 19.4 },
  { range: '10+ years', count: 15, percentage: 6.0 },
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

export default function EmployeeAnalyticsPage() {
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
            Employee Analytics
          </h1>
          <p
            className="text-muted-foreground mt-1"
            style={{ fontSize: 'var(--text-sm)', letterSpacing: 'var(--tracking-normal)', lineHeight: 'var(--leading-normal)' }}
          >
            Workforce demographics, trends, and insights
          </p>
        </motion.div>

        {/* Top stats */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6"
        >
          {[
            { label: 'Total Headcount', value: '248', icon: Users, change: '+12', changeType: 'up' },
            { label: 'Attrition Rate', value: '4.2%', icon: TrendingUp, change: '-0.8%', changeType: 'down' },
            { label: 'Avg Tenure', value: '3.4 yrs', icon: BarChart3, change: '+0.2', changeType: 'up' },
          ].map((stat) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                variants={cardVariants}
                className="glass-surface rounded-xl p-5 group cursor-default hover:border-module-erp/30 transition-colors duration-[var(--motion-fast)]"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-module-erp/8 text-module-erp">
                    <Icon className="h-5 w-5" strokeWidth={1.8} />
                  </div>
                  <div className={cn(
                    'flex items-center gap-0.5 text-xs font-medium',
                    stat.changeType === 'up' ? 'text-green-500' : 'text-red-500'
                  )}>
                    {stat.changeType === 'up' ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
                    {stat.change}
                  </div>
                </div>
                <div className="mt-3">
                  <p className="font-bold text-foreground" style={{ fontSize: 'var(--text-xl)', letterSpacing: 'var(--tracking-tight)' }}>
                    {stat.value}
                  </p>
                  <p className="text-muted-foreground" style={{ fontSize: 'var(--text-xs)', letterSpacing: 'var(--tracking-wide)' }}>
                    {stat.label}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Department breakdown */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] as const }}
            className="border border-glass-border/40 bg-glass-bg/20 rounded-xl p-6"
          >
            <h2
              className="font-semibold text-foreground mb-4"
              style={{ fontSize: 'var(--text-base)', letterSpacing: 'var(--tracking-tight)' }}
            >
              Department Breakdown
            </h2>
            <div className="space-y-3">
              {departmentData.map((dept) => (
                <div key={dept.department} className="flex items-center gap-3">
                  <span className="text-foreground font-medium min-w-[100px]" style={{ fontSize: 'var(--text-sm)' }}>
                    {dept.department}
                  </span>
                  <div className="flex-1 h-6 bg-glass-hover rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${dept.percentage}%` }}
                      transition={{ duration: 0.6, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] as const }}
                      className="h-full bg-module-erp/60 rounded-full"
                    />
                  </div>
                  <div className="flex items-center gap-2 min-w-[80px] justify-end">
                    <span className="font-semibold text-foreground" style={{ fontSize: 'var(--text-sm)' }}>{dept.headcount}</span>
                    <span className={cn(
                      'text-xs font-medium',
                      dept.change > 0 ? 'text-green-500' : dept.change < 0 ? 'text-red-500' : 'text-muted-foreground'
                    )}>
                      {dept.change > 0 ? `+${dept.change}` : dept.change < 0 ? `${dept.change}` : '—'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Gender distribution */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.15, ease: [0.25, 0.46, 0.45, 0.94] as const }}
            className="border border-glass-border/40 bg-glass-bg/20 rounded-xl p-6"
          >
            <h2
              className="font-semibold text-foreground mb-4"
              style={{ fontSize: 'var(--text-base)', letterSpacing: 'var(--tracking-tight)' }}
            >
              Gender Distribution
            </h2>
            <div className="space-y-4">
              {genderData.map((item) => (
                <div key={item.label}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-foreground font-medium" style={{ fontSize: 'var(--text-sm)' }}>{item.label}</span>
                    <span className="text-muted-foreground" style={{ fontSize: 'var(--text-xs)' }}>{item.count} ({item.percentage}%)</span>
                  </div>
                  <div className="h-3 bg-glass-hover rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${item.percentage}%` }}
                      transition={{ duration: 0.6, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] as const }}
                      className="h-full bg-module-erp/50 rounded-full"
                    />
                  </div>
                </div>
              ))}
            </div>

            <h2
              className="font-semibold text-foreground mt-8 mb-4"
              style={{ fontSize: 'var(--text-base)', letterSpacing: 'var(--tracking-tight)' }}
            >
              Tenure Distribution
            </h2>
            <div className="space-y-3">
              {tenureData.map((item) => (
                <div key={item.range} className="flex items-center gap-3">
                  <span className="text-muted-foreground min-w-[80px]" style={{ fontSize: 'var(--text-sm)' }}>{item.range}</span>
                  <div className="flex-1 h-5 bg-glass-hover rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${item.percentage}%` }}
                      transition={{ duration: 0.6, delay: 0.35, ease: [0.25, 0.46, 0.45, 0.94] as const }}
                      className="h-full bg-module-erp/40 rounded-full"
                    />
                  </div>
                  <span className="text-muted-foreground min-w-[50px] text-right" style={{ fontSize: 'var(--text-xs)' }}>
                    {item.count} ({item.percentage}%)
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </PageTransition>
  );
}
