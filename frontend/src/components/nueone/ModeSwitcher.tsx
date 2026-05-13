'use client';

import { motion } from 'framer-motion';
import { LayoutGrid, List, Grid3X3 } from 'lucide-react';
import { useAppStore, type ViewMode } from '@/stores/useAppStore';

const modes: { key: ViewMode; icon: typeof LayoutGrid; label: string }[] = [
  { key: 'tile', icon: LayoutGrid, label: 'Tile view' },
  { key: 'list', icon: List, label: 'List view' },
  { key: 'compact', icon: Grid3X3, label: 'Compact view' },
];

export default function ModeSwitcher() {
  const { viewMode, setViewMode } = useAppStore();

  return (
    <div className="flex items-center rounded-lg border border-glass-border bg-glass-bg p-0.5 gap-0.5">
      {modes.map(({ key, icon: Icon, label }) => (
        <button
          key={key}
          onClick={() => setViewMode(key)}
          className={`
            relative flex items-center justify-center h-7 w-7 rounded-md
            transition-colors duration-200
            focus-visible:outline-2 focus-visible:outline-offset-1
            ${viewMode === key
              ? 'text-foreground'
              : 'text-muted-foreground hover:text-foreground'
            }
          `}
          aria-label={label}
          aria-pressed={viewMode === key}
        >
          {viewMode === key && (
            <motion.div
              layoutId="mode-indicator"
              className="absolute inset-0 rounded-md bg-glass-hover border border-glass-border"
              transition={{ type: 'spring', bounce: 0.15, duration: 0.4 }}
            />
          )}
          <Icon className="relative z-10 h-3.5 w-3.5" strokeWidth={2} />
        </button>
      ))}
    </div>
  );
}
