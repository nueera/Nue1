'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from 'next-themes';
import {
  Sun,
  Moon,
  Maximize,
  Minimize,
  Command,
  Bell,
} from 'lucide-react';
import Background from '@/components/nueone/Background';
import TileGrid from '@/components/nueone/TileGrid';
import DateTime from '@/components/nueone/DateTime';
import CommandPalette from '@/components/nueone/CommandPalette';
import PullToRefresh from '@/components/nueone/PullToRefresh';
import AccentPicker from '@/components/nueone/AccentPicker';
import NueButton from '@/components/nueone/NueButton';
import ModeSwitcher from '@/components/nueone/ModeSwitcher';
import { useAppStore } from '@/stores/useAppStore';
import { useMounted } from '@/hooks/use-mounted';
import { Activity, ArrowUpRight } from 'lucide-react';

const statusItems = [
  { label: 'API Gateway', status: 'operational', color: '#10B981' },
  { label: 'Database', status: 'operational', color: '#10B981' },
  { label: 'Auth Service', status: 'operational', color: '#10B981' },
  { label: 'CDN', status: 'degraded', color: '#EAB308' },
];

const quickActions = [
  { label: 'New Invoice', shortcut: '⌘N' },
  { label: 'Add Contact', shortcut: '⌘C' },
  { label: 'Run Report', shortcut: '⌘R' },
];

export default function Home() {
  const { searchQuery, isFullscreen, toggleFullscreen, toggleCommandPalette } = useAppStore();
  const { resolvedTheme, setTheme } = useTheme();
  const mounted = useMounted();

  const isDark = resolvedTheme === 'dark';

  const handleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
      toggleFullscreen();
    } else {
      document.exitFullscreen().catch(() => {});
      toggleFullscreen();
    }
  };

  const toggleTheme = () => {
    setTheme(resolvedTheme === 'dark' ? 'light' : 'dark');
  };

  return (
    <div className="min-h-screen flex flex-col relative">
      <Background />

      {/* Fullscreen dim overlay */}
      <AnimatePresence>
        {isFullscreen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.38, ease: [0.42, 0, 0.58, 1] }}
            className="fixed inset-0 bg-black/20 pointer-events-none z-0"
          />
        )}
      </AnimatePresence>

      {/* Page boot animation */}
      <motion.div
        initial={{ opacity: 0, scale: isFullscreen ? 0.98 : 1 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.38, ease: [0.25, 0.46, 0.45, 0.94] as const }}
        className="flex flex-col min-h-screen"
      >
        {/* Floating top controls - minimal OS-style */}
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.38, delay: 0.15, ease: [0.25, 0.46, 0.45, 0.94] as const }}
          className="sticky top-0 z-50 w-full px-4 sm:px-6 pt-4 sm:pt-5"
        >
          <div className="flex items-center justify-between">
            {/* Left - Logo + ModeSwitcher */}
            <div className="flex items-center gap-3">
              <motion.h1
                className="text-lg sm:text-xl font-bold select-none"
                style={{ letterSpacing: 'var(--tracking-tight)' }}
                whileHover={{ scale: 1.02 }}
              >
                <span className="text-module-erp">Nue</span>
                <span className="text-foreground">One</span>
              </motion.h1>
              <ModeSwitcher />
            </div>

            {/* Right - Minimal floating controls */}
            <div className="flex items-center gap-1">
              {/* Command palette trigger */}
              <button
                onClick={() => toggleCommandPalette()}
                className="search-glow flex items-center gap-2 px-3 py-1.5 rounded-lg border border-glass-border bg-glass-bg transition-all duration-[140ms] text-muted-foreground hover:text-foreground"
                aria-label="Open command palette (⌘K)"
              >
                <Command className="h-3.5 w-3.5" strokeWidth={2} />
                <span className="hidden sm:inline text-xs" style={{ letterSpacing: 'var(--tracking-normal)' }}>Search</span>
                <kbd className="hidden sm:inline-flex items-center gap-0.5 px-1 py-0.5 rounded text-[9px] font-mono text-muted-foreground/50 border border-glass-border bg-glass-bg">
                  ⌘K
                </kbd>
              </button>

              {/* Accent color picker */}
              <AccentPicker />

              {/* Notification */}
              <NueButton
                variant="icon"
                size="md"
                icon={Bell}
                aria-label="Notifications"
                className="relative"
              >
                <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-module-crm pointer-events-none" />
              </NueButton>

              {/* Theme toggle */}
              <NueButton
                variant="icon"
                size="md"
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
                        <Sun className="h-4 w-4" />
                      </motion.div>
                    ) : (
                      <motion.div
                        key="moon"
                        initial={{ rotate: -90, opacity: 0 }}
                        animate={{ rotate: 0, opacity: 1 }}
                        exit={{ rotate: 90, opacity: 0 }}
                        transition={{ duration: 0.19 }}
                      >
                        <Moon className="h-4 w-4" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                )}
              </NueButton>

              {/* Fullscreen toggle */}
              <NueButton
                variant="icon"
                size="md"
                icon={isFullscreen ? Minimize : Maximize}
                onClick={handleFullscreen}
                className="hidden sm:flex"
                aria-label={isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}
              />

              {/* Profile avatar */}
              <button
                className="flex items-center justify-center h-8 w-8 rounded-full bg-module-erp/20 text-module-erp font-semibold text-xs border border-glass-border hover:ring-2 hover:ring-module-erp/30 transition-all duration-[140ms]"
                aria-label="User profile"
              >
                NU
              </button>
            </div>
          </div>
        </motion.div>

        {/* Main content with Pull-to-Refresh on mobile */}
        <PullToRefresh>
          <main className="flex-1 flex flex-col px-4 sm:px-6 lg:px-8 py-6 sm:py-8 pb-24 sm:pb-24">
            {/* Welcome section */}
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.38, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] as const }}
              className="mb-6 sm:mb-8 flex items-end justify-between gap-4"
            >
              <div>
                <h2
                  className="text-xl sm:text-2xl font-bold text-foreground"
                  style={{ letterSpacing: 'var(--tracking-tight)', lineHeight: 'var(--leading-tight)' }}
                >
                  Welcome back
                </h2>
                <p
                  className="text-sm text-muted-foreground mt-1"
                  style={{ letterSpacing: 'var(--tracking-normal)', lineHeight: 'var(--leading-normal)' }}
                >
                  Your business command center — all systems operational
                </p>
              </div>
              <div className="hidden sm:flex items-center gap-2 shrink-0">
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg glass-surface text-xs text-muted-foreground">
                  <Activity className="h-3.5 w-3.5 text-module-finance" />
                  <span style={{ letterSpacing: 'var(--tracking-normal)' }}>99.9% uptime</span>
                </div>
              </div>
            </motion.div>

            {/* Main content area */}
            <div className="flex-1 flex flex-col lg:flex-row gap-6">
              {/* Tiles / Grid area */}
              <div className="flex-1">
                <TileGrid searchQuery={searchQuery} />
              </div>

              {/* Side panel - DateTime + status (lg+ screens) */}
              <motion.aside
                initial={{ opacity: 0, x: 16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.38, delay: 0.5, ease: [0.25, 0.46, 0.45, 0.94] as const }}
                className="hidden lg:flex flex-col gap-4 w-[220px] shrink-0"
              >
                <DateTime />

                {/* Quick status */}
                <div className="glass-surface rounded-lg p-4">
                  <h3
                    className="text-[10px] font-semibold text-muted-foreground uppercase tracking-widest mb-3"
                    style={{ letterSpacing: 'var(--tracking-wide)' }}
                  >
                    System Status
                  </h3>
                  <div className="space-y-3">
                    {statusItems.map((item) => (
                      <div key={item.label} className="flex items-center gap-2">
                        <div
                          className="w-2 h-2 rounded-full shrink-0"
                          style={{ backgroundColor: item.color }}
                        />
                        <span
                          className="text-xs text-foreground flex-1"
                          style={{ letterSpacing: 'var(--tracking-normal)' }}
                        >
                          {item.label}
                        </span>
                        <span
                          className="text-[10px] font-medium"
                          style={{ color: item.color, letterSpacing: 'var(--tracking-wide)' }}
                        >
                          {item.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Quick actions */}
                <div className="glass-surface rounded-lg p-4">
                  <h3
                    className="text-[10px] font-semibold text-muted-foreground uppercase tracking-widest mb-3"
                    style={{ letterSpacing: 'var(--tracking-wide)' }}
                  >
                    Quick Actions
                  </h3>
                  <div className="space-y-1">
                    {quickActions.map((action) => (
                      <NueButton
                        key={action.label}
                        variant="ghost"
                        size="sm"
                        fullWidth
                        className="justify-between"
                      >
                        <span style={{ letterSpacing: 'var(--tracking-normal)' }}>{action.label}</span>
                        <div className="flex items-center gap-1.5">
                          <span className="text-[10px] text-muted-foreground/60 font-mono">
                            {action.shortcut}
                          </span>
                          <ArrowUpRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity duration-[140ms]" />
                        </div>
                      </NueButton>
                    ))}
                  </div>
                </div>
              </motion.aside>
            </div>
          </main>
        </PullToRefresh>
      </motion.div>

      {/* Command Palette overlay */}
      <CommandPalette />
    </div>
  );
}
