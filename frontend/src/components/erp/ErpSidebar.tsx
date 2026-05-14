'use client';

import { useState, useCallback } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard,
  Users,
  Clock,
  Calendar,
  Banknote,
  FolderKanban,
  DollarSign,
  BarChart3,
  Settings,
  PanelLeftClose,
  PanelLeftOpen,
  LogOut,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useErpStore } from '@/stores/erp.store';
import { useAuthStore } from '@/stores/auth.store';
import { useStoreHydrated } from '@/hooks/use-store-hydrated';
import { useIsMobile } from '@/hooks/use-mobile';
import { Sheet, SheetContent, SheetTitle } from '@/components/ui/sheet';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { CollapsibleNavSection, type NavSection } from '@/components/workspace';

const navSections: NavSection[] = [
  {
    title: 'Dashboard',
    items: [
      { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, slug: 'dashboard' },
    ],
  },
  {
    title: 'HRM',
    items: [
      { id: 'employees', label: 'Employees', icon: Users, slug: 'hrm/employees' },
      { id: 'attendance', label: 'Attendance', icon: Clock, slug: 'hrm/attendance' },
      { id: 'leaves', label: 'Leaves', icon: Calendar, slug: 'hrm/leaves' },
      { id: 'payroll', label: 'Payroll', icon: Banknote, slug: 'hrm/payroll' },
    ],
  },
  {
    title: 'Operations',
    items: [
      { id: 'projects', label: 'Projects', icon: FolderKanban, slug: 'projects' },
      { id: 'finance', label: 'Finance', icon: DollarSign, slug: 'finance' },
    ],
  },
  {
    title: 'Analytics',
    items: [
      { id: 'reports', label: 'Reports', icon: BarChart3, slug: 'reports' },
    ],
  },
  {
    title: 'System',
    items: [
      { id: 'settings', label: 'Settings', icon: Settings, slug: 'settings' },
    ],
  },
];

function SidebarContent({ collapsed, onNavigate }: { collapsed: boolean; onNavigate?: () => void }) {
  const pathname = usePathname();
  const router = useRouter();
  const { setSidebarActiveItem, toggleSidebar, isRecentlyUsed } = useErpStore();
  const { user } = useAuthStore();
  const hydrated = useStoreHydrated();

  const [flashSlug, setFlashSlug] = useState<string | null>(null);

  const pathAfterErp = pathname?.split('/erp/')[1] || 'dashboard';
  const allSlugs = navSections.flatMap((s) => s.items.map((i) => i.slug));
  const matchedSlug = allSlugs.find((slug) => pathAfterErp === slug || pathAfterErp.startsWith(slug + '/')) || 'dashboard';

  const handleNav = useCallback((slug: string) => {
    setFlashSlug(slug);
    setSidebarActiveItem(slug);
    setTimeout(() => {
      router.push(`/erp/${slug}`);
      setFlashSlug(null);
      onNavigate?.();
    }, 50);
  }, [router, setSidebarActiveItem, onNavigate]);

  const isRecentlyUsedFn = useCallback((slug: string) => {
    return hydrated ? isRecentlyUsed(slug) : false;
  }, [hydrated, isRecentlyUsed]);

  return (
    <div className="flex flex-col h-full">
      {/* Header: Logo + Toggle */}
      <div className={cn(
        'flex items-center px-4 h-16 shrink-0',
        collapsed ? 'justify-center' : 'justify-between'
      )}>
        <AnimatePresence mode="wait">
          {!collapsed && (
            <motion.div
              key="logo-full"
              initial={{ opacity: 0, x: -6 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -6 }}
              transition={{ duration: 0.1, ease: [0.25, 0.46, 0.45, 0.94] as const }}
              className="flex items-center gap-2"
            >
              <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-module-erp/15 text-module-erp">
                <LayoutDashboard className="h-4 w-4" strokeWidth={1.8} />
              </div>
              <span
                className="font-bold text-foreground"
                style={{ letterSpacing: 'var(--tracking-tight)', fontSize: 'var(--text-base)' }}
              >
                <span className="text-module-erp">Nue</span>ERP
              </span>
            </motion.div>
          )}
          {collapsed && (
            <motion.div
              key="logo-collapsed"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.1 }}
              className="flex items-center justify-center w-8 h-8 rounded-lg bg-module-erp/15 text-module-erp"
            >
              <LayoutDashboard className="h-4 w-4" strokeWidth={1.8} />
            </motion.div>
          )}
        </AnimatePresence>

        <button
          onClick={toggleSidebar}
          className="hidden md:flex items-center justify-center w-7 h-7 rounded-md hover:bg-glass-hover transition-colors duration-[var(--motion-fast)] text-muted-foreground hover:text-foreground"
          aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          suppressHydrationWarning
        >
          {collapsed ? (
            <PanelLeftOpen className="h-4 w-4" strokeWidth={1.8} />
          ) : (
            <PanelLeftClose className="h-4 w-4" strokeWidth={1.8} />
          )}
        </button>
      </div>

      <Separator className="opacity-50" />

      {/* Navigation sections — CollapsibleNavSection with ▼/▶ */}
      <nav className="flex-1 overflow-y-auto custom-scrollbar py-3 px-2">
        {navSections.map((section) => (
          <CollapsibleNavSection
            key={section.title}
            moduleId="erp"
            section={section}
            sidebarCollapsed={collapsed}
            activeSlug={matchedSlug}
            flashSlug={flashSlug}
            isRecentlyUsed={isRecentlyUsedFn}
            onNavigate={handleNav}
          />
        ))}
      </nav>

      <Separator className="opacity-50" />

      {/* User info at bottom */}
      <div className={cn('shrink-0 p-3', collapsed ? 'flex justify-center' : '')}>
        {hydrated && user ? (
          collapsed ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center justify-center w-9 h-9 rounded-full bg-module-erp/15 text-module-erp font-semibold text-xs hover:ring-1 hover:ring-module-erp/20 transition-all duration-[var(--motion-fast)] press-scale" suppressHydrationWarning>
                  {user.avatar}
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent side="right" align="start" className="w-48">
                <DropdownMenuLabel>
                  <div className="flex flex-col">
                    <span className="text-sm font-medium">{user.name}</span>
                    <span className="text-xs text-muted-foreground">{user.email}</span>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => router.push('/erp/settings')}>
                  <Settings className="h-4 w-4 mr-2" strokeWidth={1.8} />
                  Settings
                </DropdownMenuItem>
                <DropdownMenuItem className="text-destructive focus:text-destructive">
                  <LogOut className="h-4 w-4 mr-2" strokeWidth={1.8} />
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex items-center gap-3">
              <Avatar className="h-8 w-8">
                <AvatarFallback className="bg-module-erp/15 text-module-erp text-xs font-semibold">
                  {user.avatar}
                </AvatarFallback>
              </Avatar>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.1 }}
                className="flex-1 min-w-0"
              >
                <p
                  className="text-sm font-medium text-foreground truncate"
                  style={{ letterSpacing: 'var(--tracking-normal)' }}
                >
                  {user.name}
                </p>
                <p
                  className="text-xs text-muted-foreground truncate"
                  style={{ letterSpacing: 'var(--tracking-normal)' }}
                >
                  {user.email}
                </p>
              </motion.div>
            </div>
          )
        ) : (
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-full bg-muted animate-pulse" />
            {!collapsed && (
              <div className="flex-1 space-y-1.5">
                <div className="h-3 w-20 rounded bg-muted animate-pulse" />
                <div className="h-2.5 w-28 rounded bg-muted animate-pulse" />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default function ErpSidebar() {
  const { sidebarCollapsed, mobileSidebarOpen, setMobileSidebarOpen } = useErpStore();
  const hydrated = useStoreHydrated();
  const isMobile = useIsMobile();
  const collapsed = hydrated ? sidebarCollapsed : false;

  if (isMobile) {
    return (
      <Sheet open={mobileSidebarOpen} onOpenChange={setMobileSidebarOpen}>
        <SheetContent side="left" className="w-72 p-0 surface-sidebar glass-surface-strong border-r border-glass-border">
          <SheetTitle className="sr-only">ERP Navigation</SheetTitle>
          <SidebarContent collapsed={false} onNavigate={() => setMobileSidebarOpen(false)} />
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <motion.aside
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.18, ease: [0.25, 0.46, 0.45, 0.94] as const }}
      className={cn(
        'hidden md:flex flex-col h-full shrink-0 border-r border-glass-border surface-sidebar glass-surface-strong',
        'transition-all duration-[var(--motion-slow)] ease-[var(--motion-ease-in-out)]'
      )}
      style={{ width: collapsed ? '64px' : '220px' }}
    >
      <SidebarContent collapsed={collapsed} />
    </motion.aside>
  );
}
