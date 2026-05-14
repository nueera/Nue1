// @ts-nocheck
'use client';

import { useEffect, useRef, useCallback } from 'react';
import { usePathname } from 'next/navigation';
import { MarketingSidebar } from './marketing-sidebar';
import { MarketingHeader } from './marketing-header';
import { useMarketingStore } from '../../stores/marketing-store';
import { WorkspaceProvider, useWorkspace } from '@/components/workspace/WorkspaceProvider';
import { cn } from '@/lib/utils';

function MarketingLayoutInner({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  // Select only the specific actions we need — avoids re-rendering when unrelated
  // store slices change (e.g. sidebarCollapsed, mobileSidebarOpen, recentModules)
  const trackPageVisit = useMarketingStore((s) => s.trackPageVisit);
  const getScrollPosition = useMarketingStore((s) => s.getScrollPosition);
  const setScrollPosition = useMarketingStore((s) => s.setScrollPosition);
  const { state: workspaceState } = useWorkspace();

  // Derive the page slug from pathname
  const getSlug = useCallback(() => {
    return pathname?.split('/marketing/')[1] || 'campaigns/dashboard';
  }, [pathname]);

  // Track page visit on navigation
  useEffect(() => {
    trackPageVisit(getSlug());
  }, [pathname, trackPageVisit, getSlug]);

  // Restore scroll position on navigation (using ref instead of DOM query)
  useEffect(() => {
    const el = scrollContainerRef.current;
    if (!el) return;
    const saved = getScrollPosition(getSlug());
    if (saved > 0) {
      requestAnimationFrame(() => { el.scrollTop = saved; });
    }
  }, [pathname, getScrollPosition, getSlug]);

  // Debounced scroll position saving (using ref instead of DOM query)
  useEffect(() => {
    const el = scrollContainerRef.current;
    if (!el) return;

    let timeout: NodeJS.Timeout;
    const handleScroll = () => {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        setScrollPosition(getSlug(), el.scrollTop);
      }, 150);
    };

    el.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      el.removeEventListener('scroll', handleScroll);
      clearTimeout(timeout);
    };
  }, [pathname, setScrollPosition, getSlug]);

  return (
    <>
      {/* Focus mode overlay removed - maximize feature disabled globally */}
      <div className="flex h-screen overflow-hidden bg-background workspace-enter">
        {/* Sidebar — no entrance animation needed, it's always present */}
        <div className="flex flex-col h-full shrink-0">
          <MarketingSidebar />
        </div>
        <div className="flex flex-col flex-1 min-w-0">
          <MarketingHeader />
          <main
            ref={scrollContainerRef}
            className="flex-1 overflow-y-auto custom-scrollbar smooth-scroll marketing-main-scroll"
          >
            {children}
          </main>
        </div>
      </div>
    </>
  );
}

export function MarketingShell({ children }: { children: React.ReactNode }) {
  return (
    <WorkspaceProvider moduleId="marketing" title="Marketing" icon="Megaphone">
      <MarketingLayoutInner>{children}</MarketingLayoutInner>
    </WorkspaceProvider>
  );
}
