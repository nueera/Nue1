'use client';

import { useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from 'next-themes';
import {
  ArrowLeft,
  Sun,
  Moon,
  Bell,
  Search,
  Menu,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useMounted } from '@/hooks/use-mounted';
import { useStoreHydrated } from '@/hooks/use-store-hydrated';
import { useAuthStore } from '@/stores/auth.store';
import { useErpStore } from '@/stores/erp.store';
import { useIsMobile } from '@/hooks/use-mobile';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const pageTitles: Record<string, string> = {
  dashboard: 'Dashboard',
  'hrm/employees': 'Employees',
  'hrm/attendance': 'Attendance',
  'hrm/leaves': 'Leaves',
  'hrm/payroll': 'Payroll',
  projects: 'Projects',
  finance: 'Finance',
  reports: 'Reports',
  settings: 'Settings',
};

export default function ErpTopbar() {
  const router = useRouter();
  const pathname = usePathname();
  const { resolvedTheme, setTheme } = useTheme();
  const mounted = useMounted();
  const hydrated = useStoreHydrated();
  const { user } = useAuthStore();
  const { setMobileSidebarOpen } = useErpStore();
  const isMobile = useIsMobile();

  // Back navigation transition state
  const [isExiting, setIsExiting] = useState(false);

  const isDark = mounted ? resolvedTheme === 'dark' : true;

  const pathAfterErp = pathname?.split('/erp/')[1] || 'dashboard';
  // For nested routes like hrm/employees/EMP001, extract the page key
  const pathSegments = pathAfterErp.split('/');
  let activeSlug = pathAfterErp;
  // Try to match known page keys (2-segment like hrm/employees)
  if (pathSegments.length >= 2) {
    const twoSegment = `${pathSegments[0]}/${pathSegments[1]}`;
    if (pageTitles[twoSegment]) {
      activeSlug = twoSegment;
    }
  }
  // Also try single segment
  if (!pageTitles[activeSlug] && pathSegments.length >= 1) {
    if (pageTitles[pathSegments[0]]) {
      activeSlug = pathSegments[0];
    }
  }
  const pageTitle = pageTitles[activeSlug] || 'ERP';

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
            >
              <Menu className="h-5 w-5" strokeWidth={1.8} />
            </Button>
          )}

          <button
            onClick={handleBackToHome}
            className="flex items-center justify-center w-8 h-8 rounded-lg hover:bg-glass-hover transition-colors duration-[var(--motion-fast)] text-muted-foreground hover:text-foreground press-scale"
            aria-label="Back to home"
          >
            <ArrowLeft className="h-4 w-4" strokeWidth={1.8} />
          </button>

          <AnimatePresence mode="wait">
            <motion.h1
              key={pageTitle}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 8 }}
              transition={{ duration: 0.1, ease: [0.25, 0.46, 0.45, 0.94] as const }}
              className="font-semibold text-foreground"
              style={{
                fontSize: 'var(--text-base)',
                letterSpacing: 'var(--tracking-tight)',
                lineHeight: 'var(--leading-tight)',
              }}
            >
              {pageTitle}
            </motion.h1>
          </AnimatePresence>
        </div>

        {/* Center: Search bar (hidden on mobile) */}
        {!isMobile && (
          <div className="hidden sm:flex items-center flex-1 max-w-md mx-8">
            <div className="search-glow relative w-full flex items-center gap-2 px-3 py-1.5 rounded-lg border border-glass-border bg-glass-bg transition-all duration-[var(--motion-fast)]">
              <Search className="h-3.5 w-3.5 text-muted-foreground shrink-0" strokeWidth={1.8} />
              <input
                type="text"
                placeholder="Search ERP..."
                className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground/60 outline-none"
                style={{
                  fontSize: 'var(--text-sm)',
                  letterSpacing: 'var(--tracking-normal)',
                }}
              />
              <kbd className="hidden sm:inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded text-[10px] font-mono text-muted-foreground/40 border border-glass-border bg-glass-bg/50">
                ⌘K
              </kbd>
            </div>
          </div>
        )}

        {/* Right side: Actions */}
        <div className="flex items-center gap-1">
          {/* Notifications */}
          <Button
            variant="ghost"
            size="icon"
            className="relative h-8 w-8 press-scale"
            aria-label="Notifications"
          >
            <Bell className="h-4 w-4" strokeWidth={1.8} />
            <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-module-erp/80 pointer-events-none" />
          </Button>

          {/* Theme toggle */}
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 press-scale"
            onClick={toggleTheme}
            aria-label={mounted ? `Switch to ${isDark ? 'light' : 'dark'} mode` : 'Toggle theme'}
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
                  className="flex items-center justify-center h-8 w-8 rounded-full bg-module-erp/15 text-module-erp font-semibold text-xs hover:ring-1 hover:ring-module-erp/20 transition-all duration-[var(--motion-fast)]"
                  aria-label="User profile"
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
                <DropdownMenuItem onClick={() => router.push('/erp/settings')}>
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
