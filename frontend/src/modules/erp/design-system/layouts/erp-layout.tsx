'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Sidebar } from './sidebar';
import { Topbar } from './topbar';
import { useUIStore } from '../../core/store/ui.store';
import { WorkspaceProvider, useWorkspace } from '@/components/workspace/WorkspaceProvider';
import { cn } from '@/lib/utils';

function ERPLayoutInner({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { trackPageVisit, getScrollPosition, setScrollPosition } = useUIStore();
  const { isMaximized, state: workspaceState } = useWorkspace();

  useEffect(() => {
    const slug = pathname?.split('/erp/')[1] || 'dashboard';
    trackPageVisit(slug);
  }, [pathname, trackPageVisit]);

  useEffect(() => {
    const slug = pathname?.split('/erp/')[1] || 'dashboard';
    const mainEl = document.querySelector('.erp-main-scroll');
    if (mainEl) {
      const saved = getScrollPosition(slug);
      if (saved > 0) {
        requestAnimationFrame(() => { mainEl.scrollTop = saved; });
      }
    }
  }, [pathname, getScrollPosition]);

  useEffect(() => {
    const mainEl = document.querySelector('.erp-main-scroll');
    if (!mainEl) return;

    const handleScroll = () => {
      const slug = pathname?.split('/erp/')[1] || 'dashboard';
      setScrollPosition(slug, mainEl.scrollTop);
    };

    let timeout: NodeJS.Timeout;
    const debouncedScroll = () => {
      clearTimeout(timeout);
      timeout = setTimeout(handleScroll, 150);
    };

    mainEl.addEventListener('scroll', debouncedScroll, { passive: true });
    return () => {
      mainEl.removeEventListener('scroll', debouncedScroll);
      clearTimeout(timeout);
    };
  }, [pathname, setScrollPosition]);

  return (
    <>
      {/* Focus mode overlay when maximized */}
      <AnimatePresence>
        {isMaximized && (
          <motion.div
            key="focus-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.24 }}
            className="workspace-focus-overlay"
          />
        )}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.18, ease: [0.25, 0.46, 0.45, 0.94] as const }}
        className="flex h-screen overflow-hidden bg-background workspace-enter"
      >
        <motion.div
          initial={{ opacity: 0, x: -8 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.18, delay: 0.02, ease: [0.25, 0.46, 0.45, 0.94] as const }}
          className={cn(
            'flex flex-col h-full shrink-0',
            isMaximized && 'w-16'
          )}
        >
          <Sidebar />
        </motion.div>
        <div className="flex flex-col flex-1 min-w-0">
          <motion.div
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.16, delay: 0.04, ease: [0.25, 0.46, 0.45, 0.94] as const }}
          >
            <Topbar />
          </motion.div>
          <motion.main
            initial={{ opacity: 0, y: 3 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.18, delay: 0.06, ease: [0.25, 0.46, 0.45, 0.94] as const }}
            className="flex-1 overflow-y-auto custom-scrollbar smooth-scroll erp-main-scroll"
          >
            {children}
          </motion.main>
        </div>
      </motion.div>
    </>
  );
}

export function ERPLayout({ children }: { children: React.ReactNode }) {
  return (
    <WorkspaceProvider moduleId="erp" title="ERP" icon="LayoutDashboard">
      <ERPLayoutInner>{children}</ERPLayoutInner>
    </WorkspaceProvider>
  );
}
