'use client';

import { motion } from 'framer-motion';
import { Pin } from 'lucide-react';
import type { ModuleData } from './ModuleTile';
import { useAppStore } from '@/stores/useAppStore';
import { useStoreHydrated } from '@/hooks/use-store-hydrated';

interface CompactTileProps {
  module: ModuleData;
  index: number;
}

export default function CompactTile({ module, index }: CompactTileProps) {
  const hydrated = useStoreHydrated();
  const Icon = module.icon;
  const { recordModuleClick, moduleUsage, toggleModulePin } = useAppStore();
  // Only read intelligence data after store hydration to avoid hydration mismatch
  const isPinned = hydrated ? (moduleUsage[module.id]?.pinned ?? false) : false;

  const handleClick = () => {
    recordModuleClick(module.id);
  };

  const handlePinToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleModulePin(module.id);
  };

  return (
    <motion.div
      role="button"
      tabIndex={0}
      initial={{ opacity: 0, scale: 0.92 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 0.24,
        delay: index * 0.03,
        ease: [0.25, 0.46, 0.45, 0.94] as const,
      }}
      whileHover={{
        scale: 1.02,
        transition: { duration: 0.14, ease: [0.25, 0.46, 0.45, 0.94] as const },
      }}
      whileTap={{ scale: 0.97 }}
      onClick={handleClick}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleClick();
        }
      }}
      className={`
        tile-ripple
        group relative overflow-hidden rounded-xl
        glass-surface px-2 py-3 cursor-pointer
        transition-shadow duration-200
        hover:shadow-md dark:hover:shadow-lg
        focus-visible:outline-2 focus-visible:outline-offset-2
        min-h-[68px]
      `}
      aria-label={`Open ${module.name} module`}
    >
      {/* Gradient background overlay */}
      <div
        className="absolute inset-0 opacity-[0.05] dark:opacity-[0.08] transition-opacity duration-200 group-hover:opacity-[0.1] dark:group-hover:opacity-[0.14]"
        style={{
          background: `linear-gradient(135deg, ${module.hexColor}30 0%, transparent 60%)`,
        }}
      />

      {/* Pin indicator */}
      {isPinned && (
        <button
          onClick={handlePinToggle}
          className="absolute top-1 right-1 z-20 flex items-center justify-center w-4 h-4 rounded hover:bg-glass-hover transition-colors"
          aria-label="Unpin module"
        >
          <Pin className="h-2.5 w-2.5 pin-indicator" style={{ color: module.hexColor }} />
        </button>
      )}

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center gap-1.5">
        <div
          className="flex items-center justify-center w-9 h-9 rounded-lg transition-transform duration-200 group-hover:scale-110"
          style={{
            backgroundColor: `${module.hexColor}15`,
            color: module.hexColor,
          }}
        >
          <Icon className="h-4 w-4" strokeWidth={1.8} />
        </div>
        <span
          className="text-[11px] font-medium text-foreground text-center leading-tight"
          style={{ letterSpacing: 'var(--tracking-normal)' }}
        >
          {module.name}
        </span>
      </div>
    </motion.div>
  );
}
