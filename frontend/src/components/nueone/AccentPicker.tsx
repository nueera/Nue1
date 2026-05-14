'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Palette } from 'lucide-react';
import { useAppStore, ACCENT_COLORS, DEFAULT_ACCENT } from '@/stores/useAppStore';
import { useMounted } from '@/hooks/use-mounted';

/**
 * AccentPicker — UI component for selecting accent color.
 *
 * This component ONLY updates the Zustand store (setAccentColor).
 * AccentSync (mounted in root layout) reads the store and applies
 * ALL CSS custom properties. No CSS variable manipulation here.
 */
export default function AccentPicker() {
  const mounted = useMounted();
  const { accentColor, setAccentColor } = useAppStore();
  const [isOpen, setIsOpen] = useState(false);

  // Safe accent color (default on SSR)
  const safeAccent = mounted ? accentColor : DEFAULT_ACCENT;

  return (
    <div className="relative">
      {/* Trigger button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-center w-9 h-9 rounded-lg transition-colors duration-[140ms] hover:bg-glass-hover"
        aria-label="Change accent color"
        aria-expanded={isOpen}
        suppressHydrationWarning
      >
        <Palette
          className="h-4 w-4 text-muted-foreground hover:text-foreground transition-colors"
          strokeWidth={1.8}
        />
        {/* Active color dot */}
        <span
          className="absolute bottom-1 right-1 w-2 h-2 rounded-full border border-glass-border"
          style={{ backgroundColor: safeAccent.hex }}
        />
      </button>

      {/* Color picker dropdown */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.14 }}
              className="fixed inset-0 z-40"
              onClick={() => setIsOpen(false)}
            />

            {/* Picker panel */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -4 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -4 }}
              transition={{ duration: 0.19, ease: [0.25, 0.46, 0.45, 0.94] as const }}
              className="absolute right-0 top-full mt-2 z-50 glass-surface rounded-xl p-3 min-w-[200px] shadow-lg"
            >
              <h4
                className="text-[10px] font-semibold text-muted-foreground uppercase tracking-widest mb-2.5 px-1"
                style={{ letterSpacing: 'var(--tracking-wide)' }}
              >
                Accent Color
              </h4>
              <div className="grid grid-cols-4 gap-2">
                {ACCENT_COLORS.map((color) => {
                  const isActive = mounted && accentColor.name === color.name;
                  return (
                    <button
                      key={color.name}
                      onClick={() => {
                        setAccentColor(color);
                        setIsOpen(false);
                      }}
                      className={`
                        relative flex flex-col items-center justify-center gap-1 p-2 rounded-lg
                        transition-all duration-[140ms]
                        ${isActive ? 'bg-glass-hover' : 'hover:bg-glass-hover/50'}
                      `}
                      aria-label={`Set accent to ${color.name}`}
                      aria-pressed={isActive}
                      suppressHydrationWarning
                    >
                      {/* Color swatch */}
                      <div
                        className={`
                          w-7 h-7 rounded-full border-2 transition-transform duration-[140ms]
                          ${isActive ? 'scale-110' : 'hover:scale-105'}
                        `}
                        style={{
                          backgroundColor: color.hex,
                          borderColor: isActive ? color.hex : 'var(--glass-border)',
                          boxShadow: isActive ? `0 0 12px ${color.hex}40` : 'none',
                        }}
                      />
                      {/* Label */}
                      <span
                        className={`text-[9px] font-medium ${isActive ? 'text-foreground' : 'text-muted-foreground'}`}
                        style={{ letterSpacing: 'var(--tracking-wide)' }}
                      >
                        {color.name}
                      </span>

                      {/* Active indicator */}
                      {isActive && (
                        <motion.div
                          layoutId="accent-indicator"
                          className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-4 h-0.5 rounded-full"
                          style={{ backgroundColor: color.hex }}
                          transition={{ type: 'spring', bounce: 0.15, duration: 0.4 }}
                        />
                      )}
                    </button>
                  );
                })}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
