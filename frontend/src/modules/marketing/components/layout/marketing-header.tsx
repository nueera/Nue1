'use client';

import { useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useTheme } from 'next-themes';
import {
  ArrowLeft,
  Sun,
  Moon,
  Search,
  Menu,
} from 'lucide-react';
import { useMounted } from '@/hooks/use-mounted';
import { useStoreHydrated } from '@/hooks/use-store-hydrated';
import { useAuthStore } from '@/stores/auth.store';
import { useMarketingStore } from '../../stores/marketing-store';
import { useIsMobile } from '@/hooks/use-mobile';
import { pageTitles } from '../../constants/navigation';
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

export function MarketingHeader() {
  const router = useRouter();
  const pathname = usePathname();
  const { resolvedTheme, setTheme } = useTheme();
  const mounted = useMounted();
  const hydrated = useStoreHydrated();
  const user = useAuthStore((s) => s.user);
  const setMobileSidebarOpen = useMarketingStore((s) => s.setMobileSidebarOpen);
  const isMobile = useIsMobile();
  const workspace = useWorkspace();

  // Back navigation transition state
  const [isExiting, setIsExiting] = useState(false);

  const isDark = mounted ? resolvedTheme === 'dark' : true;

  const pathAfterMarketing = pathname?.split('/marketing/')[1] || 'campaigns/dashboard';
  // For nested routes like campaigns/email/CAMP001, extract the page key
  const pathSegments = pathAfterMarketing.split('/');
  let activeSlug = pathAfterMarketing;
  // Try to match known page keys (2-segment like campaigns/email)
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
  const pageTitle = pageTitles[activeSlug] || 'Marketing';

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
      <header
        className="sticky top-0 z-40 flex items-center justify-between h-12 px-4 sm:px-6 border-b border-glass-border surface-topbar backdrop-blur-xl animate-in fade-in duration-200"
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
            {/* Mobile: simple page title with CSS transition */}
            <h1
              key={pageTitle}
              className="sm:hidden font-semibold text-foreground truncate animate-in fade-in slide-in-from-left-1 duration-150"
              style={{
                fontSize: 'var(--text-base)',
                letterSpacing: 'var(--tracking-tight)',
                lineHeight: 'var(--leading-tight)',
              }}
            >
              {pageTitle}
            </h1>
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

          {/* Theme toggle - simple CSS transition, no framer-motion */}
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
            ) : isDark ? (
              <Sun className="h-4 w-4 transition-transform duration-200 rotate-0" strokeWidth={1.8} />
            ) : (
              <Moon className="h-4 w-4 transition-transform duration-200 rotate-0" strokeWidth={1.8} />
            )}
          </Button>

          {/* User avatar dropdown */}
          {hydrated && user && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button
                  className="flex items-center justify-center h-8 w-8 rounded-full bg-module-marketing/15 text-module-marketing font-semibold text-xs hover:ring-1 hover:ring-module-marketing/20 transition-all duration-[var(--motion-fast)]"
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
                <DropdownMenuItem onClick={() => router.push('/marketing/settings')}>
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem className="text-destructive focus:text-destructive">
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </header>

      {/* Exit transition overlay when going back to home */}
      {isExiting && (
        <div
          className="fixed inset-0 z-[100] bg-background animate-in fade-in duration-200"
        />
      )}
    </>
  );
}
