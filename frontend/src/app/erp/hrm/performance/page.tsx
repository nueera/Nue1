'use client';

import { motion } from 'framer-motion';
import { PageTransition } from '@/modules/erp/design-system/components/animations';
import { TrendingUp } from 'lucide-react';

export default function PerformancePage() {
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
            <h1 className="font-bold text-foreground" style={{ fontSize: 'var(--text-xl)', letterSpacing: 'var(--tracking-tight)', lineHeight: 'var(--leading-tight)' }}>
              Performance
            </h1>
            <p className="text-muted-foreground mt-1" style={{ fontSize: 'var(--text-sm)', letterSpacing: 'var(--tracking-normal)', lineHeight: 'var(--leading-normal)' }}>
              Review cycles, goals, and feedback
            </p>
          </div>
        </motion.div>
        <div className="border border-glass-border/30 rounded-lg bg-glass-bg/20 p-12 text-center">
          <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-module-erp/10 text-module-erp mx-auto mb-4">
            <TrendingUp className="h-6 w-6" strokeWidth={1.8} />
          </div>
          <p className="text-foreground font-medium" style={{ fontSize: 'var(--text-base)' }}>Performance Module</p>
          <p className="text-muted-foreground mt-1" style={{ fontSize: 'var(--text-sm)' }}>Coming soon — review cycles, goal tracking, and 360° feedback</p>
        </div>
      </div>
    </PageTransition>
  );
}
