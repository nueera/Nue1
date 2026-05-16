'use client';

import { useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from 'next-themes';
import {
  ArrowLeft,
  Sun,
  Moon,
  Search,
  Menu,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useMounted } from '../../core/hooks/use-mounted';
import { useStoreHydrated } from '../../core/hooks/use-store-hydrated';
import { useCrmAuthStore } from '../../core/store';
import { useCrmUIStore } from '../../core/store';
import { useIsMobile } from '../../core/hooks/use-mobile';
import { crmPageTitles } from '../../core/config/sidebar.config';
import { Button } from '@/components/ui/button';
import { WorkspaceControls } from '@/components/workspace/WorkspaceControls';
import { useWorkspace } from '@/components/workspace/WorkspaceProvider';
import { NotificationBell } from '@/components/global/NotificationCenter';
import { UndoRedoPanel } from '@/components/global/UndoRedoPanel';
import { GlobalBreadcrumb } from '@/components/global/GlobalBreadcrumb';
import AccentPicker from '@/components/nueone/AccentPicker';
import { useGlobalSearchStore } from '@/stores/useGlobalSearchStore';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export function CrmTopbar() {
  const router = useRouter();
  const pathname = usePathname();
  const { resolvedTheme, setTheme } = useTheme();
  const mounted = useMounted();
  const hydrated = useStoreHydrated();
  const { user } = useCrmAuthStore();
  const { setMobileSidebarOpen } = useCrmUIStore();
  const isMobile = useIsMobile();
  const workspace = useWorkspace();

  // Back navigation transition state
  const [isExiting, setIsExiting] = useState(false);

  const isDark = mounted ? resolvedTheme === 'dark' : true;

  const pathAfterCrm = pathname?.split('/crm/')[1] || 'dashboard';
  // Match page title from CRM config
  const pathSegments = pathAfterCrm.split('/');
  let activeSlug = pathAfterCrm;
  if (pathSegments.length >= 2) {
    const twoSegment = `${pathSegments[0]}/${pathSegments[1]}`;
    if (crmPageTitles[twoSegment]) {
      activeSlug = twoSegment;
    }
  }
  if (!crmPageTitles[activeSlug] && pathSegments.length >= 1) {
    if (crmPageTitles[pathSegments[0]]) {
      activeSlug = pathSegments[0];
    }
  }
  const pageTitle = crmPageTitles[activeSlug] || 'CRM';

  const toggleTheme = () => {
    setTheme(resolvedTheme === 'dark' ? 'light' : 'dark');
  };

  const handleBackToHome = () => {
    setIsExiting(true);
    setTimeout(() => {
      router.push('/');
    }, 200);
  };

  return (
    <>
      <motion.header
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.24, ease: [0.25, 0.46, 0.45, 0.94] as const }}
        className="sticky top-0 z-40 flex items-center justify-between h-12 px-4 sm:px-6 border-b border-glass-border surface-topbar backdrop-blur-xl"
      >
        {/* Left side: Hamburger (mobile) + Back button + Page title */}
        <div className="flex items-center gap-2">
          {/* Hamburger menu - visible only on mobile */}
          {isMobile && (
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 md:hidden"
              onClick={() => setMobileSidebarOpen(true)}
              aria-label="Open navigation menu"
              suppressHydrationWarning
            >
              <Menu className="h-5 w-5" strokeWidth={1.8} />
            </Button>
          )}

          <button
            onClick={handleBackToHome}
            className="flex items-center justify-center w-8 h-8 rounded-lg hover:bg-glass-hover transition-colors duration-[var(--motion-fast)] text-muted-foreground hover:text-foreground press-scale"
            aria-label="Back to home"
            suppressHydrationWarning
          >
            <ArrowLeft className="h-4 w-4" strokeWidth={1.8} />
          </button>

          {/* Page title (mobile) / Breadcrumb (desktop) */}
          <div className="flex items-center gap-2 min-w-0">
            {/* Mobile: animated page title */}
            <AnimatePresence mode="wait">
              <motion.h1
                key={pageTitle}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 8 }}
                transition={{ duration: 0.1, ease: [0.25, 0.46, 0.45, 0.94] as const }}
                className="sm:hidden font-semibold text-foreground truncate"
                style={{
                  fontSize: 'var(--text-base)',
                  letterSpacing: 'var(--tracking-tight)',
                  lineHeight: 'var(--leading-tight)',
                }}
              >
                {pageTitle}
              </motion.h1>
            </AnimatePresence>
            {/* Desktop: Global Breadcrumb */}
            <div className="hidden sm:block">
              <GlobalBreadcrumb />
            </div>
          </div>
        </div>

        {/* Center: Global Search trigger (hidden on mobile) */}
        {!isMobile && (
          <div className="hidden sm:flex items-center flex-1 max-w-md mx-8">
            <button
              onClick={() => useGlobalSearchStore.getState().openSearch()}
              className="search-glow relative w-full flex items-center gap-2 px-3 py-1.5 rounded-lg border border-glass-border bg-glass-bg transition-all duration-[var(--motion-fast)] hover:border-glass-hover text-left"
            >
              <Search className="h-3.5 w-3.5 text-muted-foreground shrink-0" strokeWidth={1.8} />
              <span className="flex-1 text-sm text-muted-foreground/60 select-none">
                Search across modules...
              </span>
              <kbd className="hidden sm:inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded text-[10px] font-mono text-muted-foreground/40 border border-glass-border bg-glass-bg/50">
                ⌘K
              </kbd>
            </button>
          </div>
        )}

        {/* Right side: Workspace controls + Actions */}
        <div className="flex items-center gap-1">
          {/* Workspace controls (expand/collapse/minimize/maximize) */}
          <WorkspaceControls
            workspaceId={workspace.workspaceId}
            currentState={workspace.state}
          />
          {/* Undo/Redo (desktop only) */}
          <UndoRedoPanel />

          {/* Notifications */}
          <NotificationBell />

          {/* Accent Picker */}
          <AccentPicker />

          {/* Theme toggle */}
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 press-scale"
            onClick={toggleTheme}
            aria-label={mounted ? `Switch to ${isDark ? 'light' : 'dark'} mode` : 'Toggle theme'}
            suppressHydrationWarning
          >
            {!mounted ? (
              <div className="h-4 w-4" />
            ) : (
              <AnimatePresence mode="wait" initial={false}>
                {isDark ? (
                  <motion.div
                    key="sun"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.19 }}
                  >
                    <Sun className="h-4 w-4" strokeWidth={1.8} />
                  </motion.div>
                ) : (
                  <motion.div
                    key="moon"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.19 }}
                  >
                    <Moon className="h-4 w-4" strokeWidth={1.8} />
                  </motion.div>
                )}
              </AnimatePresence>
            )}
          </Button>

          {/* User avatar dropdown */}
          {hydrated && user && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button
                  className="flex items-center justify-center h-8 w-8 rounded-full bg-module-crm/15 text-module-crm font-semibold text-xs hover:ring-1 hover:ring-module-crm/20 transition-all duration-[var(--motion-fast)]"
                  aria-label="User profile"
                  suppressHydrationWarning
                >
                  {user.avatar}
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuLabel>
                  <div className="flex flex-col">
                    <span className="text-sm font-medium">{user.name}</span>
                    <span className="text-xs text-muted-foreground">{user.email}</span>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => router.push('/crm/settings')}>
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem className="text-destructive focus:text-destructive">
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </motion.header>

      {/* Exit transition overlay when going back to home */}
      <AnimatePresence>
        {isExiting && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: [0.25, 0.46, 0.45, 0.94] as const }}
            className="fixed inset-0 z-[100] bg-background"
          />
        )}
      </AnimatePresence>
    </>
  );
}
