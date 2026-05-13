'use client';

import { motion } from 'framer-motion';
import { PageTransition } from '@/modules/erp/design-system/components/animations';
import { FileBarChart } from 'lucide-react';
import { cn } from '@/lib/utils';

const leaveSummaryData = [
  { type: 'Annual', totalAllocated: 4960, totalUsed: 2180, totalRemaining: 2780, utilization: 43.9 },
  { type: 'Sick', totalAllocated: 2480, totalUsed: 520, totalRemaining: 1960, utilization: 21.0 },
  { type: 'Personal', totalAllocated: 1240, totalUsed: 310, totalRemaining: 930, utilization: 25.0 },
  { type: 'Maternity', totalAllocated: 720, totalUsed: 0, totalRemaining: 720, utilization: 0.0 },
];

const monthlyTrend = [
  { month: 'Sep', leaves: 18 },
  { month: 'Oct', leaves: 24 },
  { month: 'Nov', leaves: 32 },
  { month: 'Dec', leaves: 45 },
  { month: 'Jan', leaves: 28 },
  { month: 'Feb', leaves: 22 },
  { month: 'Mar', leaves: 15 },
];

const maxLeaves = Math.max(...monthlyTrend.map(m => m.leaves));

export default function LeaveSummaryPage() {
  return (
    <PageTransition>
      <div className="p-4 sm:p-6 lg:p-8">
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.24, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="mb-6"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-green-500/10 text-green-500">
              <FileBarChart className="h-5 w-5" strokeWidth={1.8} />
            </div>
            <h1
              className="font-bold text-foreground"
              style={{ fontSize: 'var(--text-xl)', letterSpacing: 'var(--tracking-tight)', lineHeight: 'var(--leading-tight)' }}
            >
              Leave Balance Summary
            </h1>
          </div>
          <p
            className="text-muted-foreground mt-1"
            style={{ fontSize: 'var(--text-sm)', letterSpacing: 'var(--tracking-normal)', lineHeight: 'var(--leading-normal)' }}
          >
            Aggregated leave usage summary across all employees
          </p>
        </motion.div>

        {/* Summary cards */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.05, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6"
        >
          {leaveSummaryData.map((item) => (
            <div
              key={item.type}
              className="glass-surface rounded-xl p-5 hover:border-module-erp/30 transition-colors duration-[var(--motion-fast)]"
            >
              <p
                className="text-muted-foreground mb-2"
                style={{ fontSize: 'var(--text-xs)', letterSpacing: 'var(--tracking-wide)' }}
              >
                {item.type} Leave
              </p>
              <p className="font-bold text-foreground" style={{ fontSize: 'var(--text-xl)', letterSpacing: 'var(--tracking-tight)' }}>
                {item.totalUsed}<span className="text-muted-foreground font-normal">/{item.totalAllocated}</span>
              </p>
              <div className="mt-2 h-2 bg-glass-hover rounded-full overflow-hidden">
                <div
                  className="h-full bg-module-erp/50 rounded-full"
                  style={{ width: `${item.utilization}%` }}
                />
              </div>
              <p className="text-muted-foreground mt-1" style={{ fontSize: 'var(--text-xs)' }}>
                {item.utilization}% utilized &middot; {item.totalRemaining} remaining
              </p>
            </div>
          ))}
        </motion.div>

        {/* Monthly trend */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="border border-glass-border/40 bg-glass-bg/20 rounded-xl p-6"
        >
          <h2
            className="font-semibold text-foreground mb-6"
            style={{ fontSize: 'var(--text-base)', letterSpacing: 'var(--tracking-tight)' }}
          >
            Monthly Leave Trend
          </h2>
          <div className="flex items-end gap-3 h-48">
            {monthlyTrend.map((item) => (
              <div key={item.month} className="flex-1 flex flex-col items-center gap-2">
                <span className="text-foreground font-semibold" style={{ fontSize: 'var(--text-xs)' }}>
                  {item.leaves}
                </span>
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: `${(item.leaves / maxLeaves) * 100}%` }}
                  transition={{ duration: 0.5, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
                  className="w-full bg-module-erp/40 rounded-t-md min-h-[4px]"
                />
                <span className="text-muted-foreground" style={{ fontSize: 'var(--text-xs)' }}>
                  {item.month}
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </PageTransition>
  );
}
