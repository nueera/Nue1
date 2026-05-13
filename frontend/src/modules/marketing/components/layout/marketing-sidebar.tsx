'use client';

import { useState, useCallback, useMemo } from 'react';
import { usePathname, useRouter } from 'next/navigation';
// framer-motion removed — using CSS transitions for better performance
import {
  Megaphone,
  PanelLeftClose,
  PanelLeftOpen,
  LogOut,
  Settings,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useMarketingStore } from '../../stores/marketing-store';
import { useStoreHydrated } from '../../../erp/core/hooks/use-store-hydrated';
import { useIsMobile } from '../../../erp/core/hooks/use-mobile';
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
import {
  getNavSectionsForProduct,
  getAllNavItemsForProduct,
  PRODUCT_LABELS,
} from '../../constants/navigation';
import { CollapsibleNavSection } from '@/components/workspace';
import { ProductSwitcher } from './product-switcher';
import { useAuthStore } from '../../../erp/core/store/auth.store';

function SidebarContent({ collapsed, onNavigate }: { collapsed: boolean; onNavigate?: () => void }) {
  const pathname = usePathname();
  const router = useRouter();
  const { activeProduct, setSidebarActiveItem, toggleSidebar, isRecentlyUsed } = useMarketingStore();
  const { user } = useAuthStore();
  const hydrated = useStoreHydrated();

  // Get navigation sections for the active product
  const navSections = useMemo(() => getNavSectionsForProduct(activeProduct), [activeProduct]);
  const allItems = useMemo(() => getAllNavItemsForProduct(activeProduct), [activeProduct]);

  // Track which item was just clicked for instant highlight
  const [flashSlug, setFlashSlug] = useState<string | null>(null);

  const pathAfterMarketing = pathname?.split('/marketing/')[1] || `${activeProduct}/dashboard`;
  const allSlugs = allItems.map((i) => i.slug);
  const matchedSlug = allSlugs.find((slug) => pathAfterMarketing === slug || pathAfterMarketing.startsWith(slug + '/')) || `${activeProduct}/dashboard`;

  const handleNav = useCallback((slug: string) => {
    // Instant highlight before navigation
    setFlashSlug(slug);
    setSidebarActiveItem(slug);

    // Navigate after tiny delay for perceived instant response
    setTimeout(() => {
      router.push(`/marketing/${slug}`);
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
        {/* Logo — CSS transition instead of framer-motion for smoother perf */}
        {!collapsed ? (
          <div className="flex items-center gap-2">
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-module-marketing/15 text-module-marketing">
              <Megaphone className="h-4 w-4" strokeWidth={1.8} />
            </div>
            <span
              className="font-bold text-foreground"
              style={{ letterSpacing: 'var(--tracking-tight)', fontSize: 'var(--text-base)' }}
            >
              <span className="text-module-marketing">Nue</span>Marketing
            </span>
          </div>
        ) : (
          <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-module-marketing/15 text-module-marketing">
            <Megaphone className="h-4 w-4" strokeWidth={1.8} />
          </div>
        )}

        {/* Toggle button */}
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

      {/* Product Switcher */}
      <div className="px-2 py-2">
        <ProductSwitcher collapsed={collapsed} />
      </div>

      <Separator className="opacity-50" />

      {/* Navigation sections — CollapsibleNavSection with ▼/▶ */}
      <nav className="flex-1 overflow-y-auto custom-scrollbar py-3 px-2">
        {navSections.map((section) => (
          <CollapsibleNavSection
            key={section.title}
            moduleId="marketing"
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
                <button className="flex items-center justify-center w-9 h-9 rounded-full bg-module-marketing/15 text-module-marketing font-semibold text-xs hover:ring-1 hover:ring-module-marketing/20 transition-all duration-[var(--motion-fast)] press-scale" suppressHydrationWarning>
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
                <DropdownMenuItem onClick={() => router.push('/marketing/settings')}>
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
                <AvatarFallback className="bg-module-marketing/15 text-module-marketing text-xs font-semibold">
                  {user.avatar}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
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
              </div>
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

export function MarketingSidebar() {
  const { sidebarCollapsed, mobileSidebarOpen, setMobileSidebarOpen } = useMarketingStore();
  const hydrated = useStoreHydrated();
  const isMobile = useIsMobile();
  const collapsed = hydrated ? sidebarCollapsed : false;

  if (isMobile) {
    return (
      <Sheet open={mobileSidebarOpen} onOpenChange={setMobileSidebarOpen}>
        <SheetContent side="left" className="w-72 p-0 surface-sidebar glass-surface-strong border-r border-glass-border">
          <SheetTitle className="sr-only">Marketing Navigation</SheetTitle>
          <SidebarContent collapsed={false} onNavigate={() => setMobileSidebarOpen(false)} />
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <aside
      className={cn(
        'hidden md:flex flex-col h-full shrink-0 border-r border-glass-border surface-sidebar glass-surface-strong',
        'transition-all duration-[var(--motion-slow)] ease-[var(--motion-ease-in-out)]'
      )}
      style={{ width: collapsed ? '64px' : '220px' }}
    >
      <SidebarContent collapsed={collapsed} />
    </aside>
  );
}
