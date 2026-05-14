'use client';

import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';

interface DetailPageLayoutProps {
  title: string;
  subtitle?: string;
  backHref?: string;
  backLabel?: string;
  actions?: React.ReactNode;
  children: React.ReactNode;
}

export function DetailPageLayout({ title, subtitle, backHref, backLabel = 'Back', actions, children }: DetailPageLayoutProps) {
  const router = useRouter();

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <motion.button
        initial={{ opacity: 0, x: -8 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.2, ease: [0.25, 0.46, 0.45, 0.94] as const }}
        onClick={() => backHref ? router.push(backHref) : router.back()}
        className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors duration-[var(--motion-fast)] mb-6 press-scale"
      >
        <ArrowLeft className="h-4 w-4" strokeWidth={1.8} />
        <span style={{ fontSize: 'var(--text-sm)', letterSpacing: 'var(--tracking-normal)' }}>{backLabel}</span>
      </motion.button>

      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.24, ease: [0.25, 0.46, 0.45, 0.94] as const }}
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6"
      >
        <div>
          <h1 className="font-bold text-foreground" style={{ fontSize: 'var(--text-xl)', letterSpacing: 'var(--tracking-tight)', lineHeight: 'var(--leading-tight)' }}>
            {title}
          </h1>
          {subtitle && (
            <p className="text-muted-foreground mt-1" style={{ fontSize: 'var(--text-sm)', letterSpacing: 'var(--tracking-normal)' }}>
              {subtitle}
            </p>
          )}
        </div>
        {actions}
      </motion.div>

      {children}
    </div>
  );
}
