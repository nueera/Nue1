'use client';

import { useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from 'next-themes';
import {
  Search,
  Bell,
  Sun,
  Moon,
  Maximize,
  Minimize,
  X,
  Command,
} from 'lucide-react';
import { useAppStore } from '@/stores/useAppStore';
import { useMounted } from '@/hooks/use-mounted';
import { useScrollShadow } from '@/hooks/use-scroll-shadow';
import ModeSwitcher from './ModeSwitcher';
import NueButton from './NueButton';

export default function TopBar() {
  const { resolvedTheme, setTheme } = useTheme();
  const mounted = useMounted();
  const { hasShadow } = useScrollShadow();
  const { isFullscreen, toggleFullscreen, searchOpen, setSearchOpen, searchQuery, setSearchQuery, toggleCommandPalette } = useAppStore();
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (searchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [searchOpen]);

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

  // ⌘K opens command palette (also handled in CommandPalette component)
  const handleSearchKeyDown = useCallback((e: KeyboardEvent) => {
    if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
      e.preventDefault();
      toggleCommandPalette();
    }
    if (e.key === 'Escape' && searchOpen) {
      setSearchOpen(false);
      setSearchQuery('');
    }
  }, [searchOpen, setSearchOpen, setSearchQuery, toggleCommandPalette]);

  useEffect(() => {
    window.addEventListener('keydown', handleSearchKeyDown);
    return () => window.removeEventListener('keydown', handleSearchKeyDown);
  }, [handleSearchKeyDown]);

  const isDark = resolvedTheme === 'dark';

  return (
    <header className="sticky top-0 z-50 w-full">
      <div className={`glass-surface-strong border-b border-glass-border transition-shadow duration-[140ms] ${hasShadow ? 'shadow-sm dark:shadow-md' : ''}`}>
        <div className="flex h-14 items-center justify-between px-4 sm:px-6">
          {/* Left - Logo */}
          <div className="flex items-center gap-3 shrink-0">
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

          {/* Center - Search / Command trigger (desktop) */}
          <div className="hidden sm:flex flex-1 max-w-md mx-6">
            <button
              onClick={() => toggleCommandPalette()}
              className="search-glow relative w-full rounded-lg border border-glass-border bg-glass-bg transition-all duration-[140ms] flex items-center gap-2 px-3 py-2 text-left group"
              aria-label="Open command palette (⌘K)"
            >
              <Search className="h-4 w-4 text-muted-foreground shrink-0" />
              <span className="flex-1 text-sm text-muted-foreground" style={{ letterSpacing: 'var(--tracking-normal)' }}>
                Search modules, actions...
              </span>
              <kbd className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded text-[10px] font-mono text-muted-foreground/60 border border-glass-border bg-glass-bg shrink-0">
                <Command className="h-2.5 w-2.5" />K
              </kbd>
            </button>
          </div>

          {/* Right - Actions */}
          <div className="flex items-center gap-1 sm:gap-2 shrink-0">
            {/* Mobile search toggle */}
            <NueButton
              variant="icon"
              size="md"
              icon={Search}
              onClick={() => toggleCommandPalette()}
              className="sm:hidden"
              aria-label="Open command palette"
            />

            {/* Notification bell */}
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
              className="flex items-center justify-center h-8 w-8 sm:h-9 sm:w-9 rounded-full bg-module-erp/20 text-module-erp font-semibold text-xs sm:text-sm border border-glass-border hover:ring-2 hover:ring-module-erp/30 transition-all duration-[140ms]"
              aria-label="User profile"
            >
              NU
            </button>
          </div>
        </div>

        {/* Mobile search expandable (still works for inline search) */}
        <AnimatePresence>
          {searchOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.19 }}
              className="sm:hidden overflow-hidden border-t border-glass-border"
            >
              <div className="search-glow mx-4 my-3 rounded-lg border border-glass-border bg-glass-bg">
                <div className="flex items-center">
                  <Search className="ml-3 h-4 w-4 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Search modules..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-transparent pl-2 pr-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
                    aria-label="Search modules"
                    autoFocus
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="mr-3 text-muted-foreground hover:text-foreground transition-colors"
                      aria-label="Clear search"
                    >
                      <X className="h-3.5 w-3.5" />
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
