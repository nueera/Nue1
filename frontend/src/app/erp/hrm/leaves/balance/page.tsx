'use client';

import { motion } from 'framer-motion';
import { PageTransition } from '@/modules/erp/design-system/components/animations';

export default function LeaveBalancePage() {
  return (
    <PageTransition>
      <div className="p-4 sm:p-6 lg:p-8">
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.24, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="mb-6"
        >
          <h1 className="font-bold text-foreground" style={{ fontSize: 'var(--text-xl)', letterSpacing: 'var(--tracking-tight)', lineHeight: 'var(--leading-tight)' }}>
            Leave Balances
          </h1>
          <p className="text-muted-foreground mt-1" style={{ fontSize: 'var(--text-sm)', letterSpacing: 'var(--tracking-normal)', lineHeight: 'var(--leading-normal)' }}>
            View leave balance details for all employees
          </p>
        </motion.div>
        <div className="border border-glass-border/30 rounded-lg bg-glass-bg/20 p-8 text-center">
          <p className="text-muted-foreground" style={{ fontSize: 'var(--text-base)' }}>
            Leave balance view coming soon
          </p>
        </div>
      </div>
    </PageTransition>
  );
}
