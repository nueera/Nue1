'use client';

import { use } from 'react';
import { useRouter } from 'next/navigation';
import { PageTransition } from '@/modules/erp/design-system/components/animations';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';

export default function AttendanceDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();

  return (
    <PageTransition>
      <div className="p-4 sm:p-6 lg:p-8">
        <motion.button
          initial={{ opacity: 0, x: -8 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.2, ease: [0.25, 0.46, 0.45, 0.94] as const }}
          onClick={() => router.push('/erp/hrm/attendance')}
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors duration-[var(--motion-fast)] mb-6 press-scale"
        >
          <ArrowLeft className="h-4 w-4" strokeWidth={1.8} />
          <span style={{ fontSize: 'var(--text-sm)', letterSpacing: 'var(--tracking-normal)' }}>Back to Attendance</span>
        </motion.button>
        <div className="border border-glass-border/30 rounded-lg bg-glass-bg/20 p-8 text-center">
          <p className="text-muted-foreground" style={{ fontSize: 'var(--text-base)' }}>
            Attendance detail for record {id} — coming soon
          </p>
        </div>
      </div>
    </PageTransition>
  );
}
