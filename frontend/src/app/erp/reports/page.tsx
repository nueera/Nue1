'use client';

import { motion } from 'framer-motion';
import { PageTransition } from '@/components/erp/PageTransition';
import { Construction } from 'lucide-react';

export default function ReportsPage() {
  return (
    <PageTransition>
    <div className="p-4 sm:p-6 lg:p-8">
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.24, ease: [0.25, 0.46, 0.45, 0.94] as const }}
        className="mb-6"
      >
        <h1
          className="font-bold text-foreground"
          style={{
            fontSize: 'var(--text-xl)',
            letterSpacing: 'var(--tracking-tight)',
            lineHeight: 'var(--leading-tight)',
          }}
        >
          Reports
        </h1>
        <p
          className="text-muted-foreground mt-1"
          style={{
            fontSize: 'var(--text-sm)',
            letterSpacing: 'var(--tracking-normal)',
            lineHeight: 'var(--leading-normal)',
          }}
        >
          Analytics and reporting dashboard
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] as const }}
        className="border border-glass-border/30 rounded-lg bg-glass-bg/20 p-12 flex flex-col items-center justify-center"
      >
        <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-module-erp/10 text-module-erp mb-4">
          <Construction className="h-8 w-8 opacity-30" strokeWidth={1.5} />
        </div>
        <p
          className="text-foreground font-medium"
          style={{ fontSize: 'var(--text-lg)', letterSpacing: 'var(--tracking-tight)' }}
        >
          This module is under development
        </p>
        <p
          className="text-muted-foreground mt-1 text-center max-w-md"
          style={{ fontSize: 'var(--text-sm)', letterSpacing: 'var(--tracking-normal)' }}
        >
          The Reports module is being built and will be available soon. Stay tuned for updates.
        </p>
      </motion.div>
    </div>
    </PageTransition>
  );
}
