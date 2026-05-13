'use client';

import { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from 'next-themes';
import { Pin, Clock } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAppStore } from '@/stores/useAppStore';
import { useWorkspaceStore } from '@/stores/useWorkspaceStore';
import { useMounted } from '@/hooks/use-mounted';
import { useStoreHydrated } from '@/hooks/use-store-hydrated';

export interface ModuleData {
  id: string;
  name: string;
  icon: LucideIcon;
  accentKey: string;
  hexColor: string;
  description: string;
  featured?: boolean;
}

// Live tile data for specific modules
interface LiveTileActivity {
  text: string;
  time: string;
}

const liveTileData: Record<string, LiveTileActivity[]> = {
  erp: [
    { text: '3 new purchase orders', time: '2m ago' },
    { text: 'Invoice #1847 approved', time: '15m ago' },
    { text: 'Inventory alert: Widget A', time: '1h ago' },
  ],
  crm: [
    { text: '5 new leads today', time: '3m ago' },
    { text: 'Deal closed: Acme Corp', time: '30m ago' },
    { text: 'Follow-up: Jane Smith', time: '2h ago' },
  ],
  analytics: [
    { text: 'Revenue up 12%', time: '1h ago' },
    { text: 'New report ready', time: '3h ago' },
    { text: 'Traffic spike detected', time: '5h ago' },
  ],
};

// Mini chart SVG data points for analytics
const chartPoints = [20, 35, 25, 45, 40, 55, 48, 60, 52, 70, 65, 75];

interface ModuleTileProps {
  module: ModuleData;
  index: number;
  isLoading?: boolean;
  isDisabled?: boolean;
}

export default function ModuleTile({ module, index, isLoading = false, isDisabled = false }: ModuleTileProps) {
  const router = useRouter();
  const { resolvedTheme } = useTheme();
  const mounted = useMounted();
  const hydrated = useStoreHydrated();
  const { recordModuleClick, moduleUsage, recentModules, toggleModulePin } = useAppStore();
  const isModuleActive = useWorkspaceStore((s) => s.isModuleActive);
  const workspaces = useWorkspaceStore((s) => s.workspaces);

  // Transition state for OS-like "app opening" effect
  const [isTransitioning, setIsTransitioning] = useState(false);

  const Icon = module.icon;
  const isDark = mounted ? resolvedTheme === 'dark' : true;
  // Only read intelligence data after store hydration to avoid hydration mismatch
  // (Zustand persist rehydrates from localStorage, producing different data than SSR defaults)
  const isPinned = hydrated ? (moduleUsage[module.id]?.pinned ?? false) : false;
  const isRecent = hydrated ? recentModules.includes(module.id) : false;
  // Check if module has an active workspace (running/minimized)
  const moduleIsActive = hydrated ? isModuleActive(module.id) : false;
  const moduleWorkspace = hydrated
    ? Object.values(workspaces).find(w => w.moduleId === module.id)
    : null;
  const isMinimized = moduleWorkspace?.state === 'minimized';
  const activities = liveTileData[module.id];
  const isAnalytics = module.id === 'analytics';

  // Module route mapping — each product has its own route
  const moduleRoutes: Record<string, string> = {
    erp: '/erp',
    crm: '/crm',
    finance: '/finance',
  };

  const handleClick = useCallback(() => {
    if (isDisabled || isLoading) return;
    recordModuleClick(module.id);
    const route = moduleRoutes[module.id];
    if (route) {
      // If module is already active (minimized), restore it
      if (moduleWorkspace && isMinimized) {
        const { restoreWorkspace, getModuleRoute } = useWorkspaceStore.getState();
        restoreWorkspace(moduleWorkspace.id);
        const targetPath = moduleWorkspace.currentPath || getModuleRoute(module.id);
        router.push(targetPath);
        return;
      }
      // If module is already active (not minimized), just navigate
      if (moduleWorkspace && !isMinimized) {
        const { getModuleRoute } = useWorkspaceStore.getState();
        const targetPath = moduleWorkspace.currentPath || getModuleRoute(module.id);
        router.push(targetPath);
        return;
      }
      // Trigger the smooth OS-like expand transition
      setIsTransitioning(true);
      setTimeout(() => {
        router.push(route);
      }, 400);
    }
  }, [isDisabled, isLoading, recordModuleClick, module.id, router, moduleWorkspace, isMinimized]);

  const handlePinToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleModulePin(module.id);
  };

  return (
    <motion.div
      role="button"
      tabIndex={isDisabled ? -1 : 0}
      initial={{ opacity: 0, y: 16, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        duration: 0.35,
        delay: index * 0.05,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      whileHover={{
        scale: 1.01,
        transition: { duration: 0.19, ease: [0.25, 0.46, 0.45, 0.94] },
      }}
      whileTap={{ scale: 0.98 }}
      onClick={handleClick}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleClick();
        }
      }}
      className={`
        tile-ripple tile-shimmer
        group relative overflow-hidden rounded-2xl
        glass-surface cursor-pointer
        transition-shadow duration-300 ease-out
        ${module.featured ? 'md:col-span-2' : ''}
        ${isLoading ? 'tile-loading' : ''}
        ${isDisabled ? 'tile-disabled' : ''}
        focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring
      `}
      style={{
        minHeight: module.featured ? '200px' : '160px',
      }}
      aria-label={`Open ${module.name} module`}
      aria-disabled={isDisabled}
    >
      {/* Gradient background overlay */}
      <div
        className="absolute inset-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          opacity: module.featured ? 0.07 : 0.04,
          background: `linear-gradient(135deg, ${module.hexColor}50 0%, ${module.hexColor}20 40%, transparent 70%)`,
        }}
      />
      {/* Secondary gradient for featured tile */}
      {module.featured && (
        <div
          className="absolute inset-0 opacity-[0.02] dark:opacity-[0.04] transition-opacity duration-300 group-hover:opacity-[0.04] dark:group-hover:opacity-[0.08]"
          style={{
            background: `radial-gradient(circle at 80% 20%, ${module.hexColor}40 0%, transparent 50%)`,
          }}
        />
      )}

      {/* Neon border glow in dark mode */}
      {isDark && (
        <div
          className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
          style={{
            boxShadow: `inset 0 0 0 1px ${module.hexColor}20, 0 0 20px ${module.hexColor}08, 0 0 40px ${module.hexColor}04`,
          }}
        />
      )}

      {/* Soft shadow glow in light mode on hover */}
      {!isDark && (
        <div
          className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
          style={{
            boxShadow: `0 2px 16px ${module.hexColor}10, 0 1px 4px ${module.hexColor}08`,
          }}
        />
      )}

      {/* Content */}
      <div className={`relative z-10 flex h-full ${module.featured ? 'flex-row items-start justify-between gap-4 p-5 sm:p-6' : 'flex-col items-center justify-center gap-3 p-5'}`}>
        {/* Left side: icon + text */}
        <div className={module.featured ? 'flex-1' : ''}>
          <div className={`flex items-center gap-3 ${!module.featured ? 'flex-col' : ''}`}>
            <div
              className={`flex items-center justify-center rounded-xl transition-transform duration-200 group-hover:scale-[1.02] ${module.featured ? 'w-12 h-12 sm:w-14 sm:h-14' : 'w-11 h-11'}`}
              style={{
                backgroundColor: `${module.hexColor}18`,
                color: module.hexColor,
              }}
            >
              <Icon className={module.featured ? 'h-6 w-6 sm:h-7 sm:w-7' : 'h-5 w-5'} strokeWidth={1.8} />
            </div>
            <div className={module.featured ? 'text-left' : 'text-center'}>
              <h3
                className={`font-semibold text-foreground ${module.featured ? 'text-sm sm:text-base' : 'text-xs sm:text-sm'}`}
                style={{ letterSpacing: 'var(--tracking-tight)', lineHeight: 'var(--leading-tight)' }}
              >
                {module.name}
              </h3>
              <p
                className={`text-muted-foreground mt-0.5 ${module.featured ? 'text-xs' : 'text-[11px] hidden sm:block'}`}
                style={{ letterSpacing: 'var(--tracking-normal)', lineHeight: 'var(--leading-normal)' }}
              >
                {module.description}
              </p>
            </div>
          </div>

          {/* Featured badge */}
          {module.featured && (
            <div className="flex items-center gap-2 mt-3">
              <div
                className="w-1.5 h-1.5 rounded-full"
                style={{ backgroundColor: module.hexColor }}
              />
              <span
                className="text-[10px] font-medium uppercase tracking-widest"
                style={{ color: module.hexColor }}
              >
                Core Module
              </span>
            </div>
          )}

          {/* Live tile: Activity preview for ERP & CRM */}
          {module.featured && activities && hydrated && (
            <div className="mt-3 space-y-1.5">
              {activities.slice(0, 2).map((activity, i) => (
                <div key={i} className="flex items-center gap-2 text-[11px] text-muted-foreground/70">
                  <div className="w-1 h-1 rounded-full shrink-0" style={{ backgroundColor: module.hexColor, opacity: 0.5 }} />
                  <span className="truncate">{activity.text}</span>
                  <span className="text-[10px] text-muted-foreground/40 shrink-0 ml-auto">{activity.time}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Live tile: Mini chart for Analytics */}
        {isAnalytics && module.featured && hydrated && (
          <div className="hidden sm:flex items-end gap-0.5 h-12 shrink-0">
            {chartPoints.map((point, i) => (
              <div
                key={i}
                className="w-1 rounded-full transition-all duration-300 group-hover:opacity-100"
                style={{
                  height: `${(point / 80) * 100}%`,
                  backgroundColor: module.hexColor,
                  opacity: 0.4 + (i / chartPoints.length) * 0.4,
                }}
              />
            ))}
          </div>
        )}

        {/* Non-featured analytics: mini sparkline */}
        {isAnalytics && !module.featured && hydrated && (
          <div className="flex items-end gap-px h-4 mt-1">
            {chartPoints.slice(-6).map((point, i) => (
              <div
                key={i}
                className="w-0.5 rounded-full"
                style={{
                  height: `${(point / 80) * 100}%`,
                  backgroundColor: module.hexColor,
                  opacity: 0.3 + (i / 6) * 0.4,
                }}
              />
            ))}
          </div>
        )}
      </div>

      {/* Pin indicator (top-left) */}
      {isPinned && (
        <button
          onClick={handlePinToggle}
          className="absolute top-2 left-2 z-20 flex items-center justify-center w-5 h-5 rounded-md hover:bg-glass-hover transition-colors"
          aria-label="Unpin module"
        >
          <Pin className="h-3 w-3 pin-indicator" style={{ color: module.hexColor }} />
        </button>
      )}

      {/* Recent indicator (top-right, only if not pinned and not active) */}
      {isRecent && !isPinned && !moduleIsActive && (
        <div className="absolute top-2 right-2 z-10">
          <Clock className="h-3 w-3 text-muted-foreground/40" />
        </div>
      )}

      {/* Running / Active indicator (top-right) — shows when module is open */}
      {moduleIsActive && hydrated && (
        <div className="absolute top-2 right-2 z-20 flex items-center gap-1">
          <motion.div
            className={cn(
              'flex items-center gap-1 px-1.5 py-0.5 rounded-md text-[9px] font-medium',
              isMinimized
                ? 'bg-muted-foreground/10 text-muted-foreground'
                : 'bg-glass-hover',
            )}
            style={!isMinimized ? { color: module.hexColor } : undefined}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.2 }}
          >
            <motion.span
              className={cn(
                'h-1.5 w-1.5 rounded-full',
                isMinimized ? 'bg-muted-foreground/50' : '',
              )}
              style={!isMinimized ? { backgroundColor: module.hexColor } : undefined}
              animate={!isMinimized ? { scale: [1, 1.3, 1] } : undefined}
              transition={!isMinimized ? { duration: 2, repeat: Infinity, ease: 'easeInOut' } : undefined}
            />
            <span>{isMinimized ? 'Minimized' : 'Running'}</span>
          </motion.div>
        </div>
      )}

      {/* Active tile border glow — when module is running */}
      {moduleIsActive && hydrated && !isMinimized && (
        <div
          className="absolute inset-0 rounded-2xl pointer-events-none opacity-60"
          style={{
            boxShadow: `inset 0 0 0 1.5px ${module.hexColor}40, 0 0 12px ${module.hexColor}10`,
          }}
        />
      )}

      {/* Featured accent - top right corner glow */}
      {module.featured && (
        <div
          className="absolute -top-20 -right-20 w-40 h-40 rounded-full opacity-[0.03] dark:opacity-[0.05] group-hover:opacity-[0.06] dark:group-hover:opacity-[0.09] transition-opacity duration-300 pointer-events-none"
          style={{
            background: `radial-gradient(circle, ${module.hexColor}80 0%, transparent 70%)`,
          }}
        />
      )}

      {/* OS-like app opening transition overlay */}
      <AnimatePresence>
        {isTransitioning && (
          <motion.div
            initial={{ opacity: 0, scale: 0.85, borderRadius: '1.5rem' }}
            animate={{ opacity: 1, scale: 1, borderRadius: '0' }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{
              duration: 0.38,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
            className="fixed inset-0 z-[100]"
            style={{
              background: `linear-gradient(135deg, ${module.hexColor}08 0%, var(--background) 30%)`,
              backdropFilter: 'blur(4px)',
              WebkitBackdropFilter: 'blur(4px)',
              originX: '50%',
              originY: '50%',
            }}
          >
            {/* Subtle radial accent glow at center */}
            <div
              className="absolute inset-0 opacity-30"
              style={{
                background: `radial-gradient(circle at 50% 50%, ${module.hexColor}18 0%, transparent 60%)`,
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
