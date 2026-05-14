'use client';

import { motion } from 'framer-motion';
import { Pin, Clock } from 'lucide-react';
import type { ModuleData } from './ModuleTile';
import { useAppStore } from '@/stores/useAppStore';
import { useStoreHydrated } from '@/hooks/use-store-hydrated';

interface ListModuleProps {
  module: ModuleData;
  index: number;
}

export default function ListModule({ module, index }: ListModuleProps) {
  const hydrated = useStoreHydrated();
  const Icon = module.icon;
  const { recordModuleClick, moduleUsage, recentModules, toggleModulePin } = useAppStore();
  // Only read intelligence data after store hydration to avoid hydration mismatch
  const isPinned = hydrated ? (moduleUsage[module.id]?.pinned ?? false) : false;
  const isRecent = hydrated ? recentModules.includes(module.id) : false;
  // Active = most recently clicked module
  const isActive = hydrated ? (recentModules.length > 0 && recentModules[0] === module.id) : false;

  const handleClick = () => {
    recordModuleClick(module.id);
  };

  const handlePinToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleModulePin(module.id);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleClick();
    }
  };

  return (
    <motion.div
      role="button"
      tabIndex={0}
      initial={{ opacity: 0, x: -16 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{
        duration: 0.28,
        delay: index * 0.04,
        ease: [0.25, 0.46, 0.45, 0.94] as const,
      }}
      whileHover={{ x: 4, transition: { duration: 0.14, ease: [0.25, 0.46, 0.45, 0.94] as const } }}
      whileTap={{ scale: 0.99 }}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      className={`
        group relative flex items-center gap-3 w-full rounded-lg
        glass-surface px-4 py-3
        transition-shadow duration-[140ms]
        hover:shadow-md dark:hover:shadow-lg
        focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring
        min-h-[44px]
        ${isActive ? 'bg-glass-hover' : ''}
      `}
      aria-label={`Open ${module.name} module`}
    >
      {/* Active accent bar */}
      {isActive && (
        <motion.div
          layoutId="list-accent"
          className="absolute left-0 top-2 bottom-2 w-[3px] rounded-r-full"
          style={{ backgroundColor: module.hexColor }}
          transition={{ type: 'spring', bounce: 0.15, duration: 0.4 }}
        />
      )}

      {/* Pin indicator */}
      {isPinned ? (
        <button
          onClick={handlePinToggle}
          className="flex items-center justify-center w-5 h-5 rounded shrink-0 hover:bg-glass-hover transition-colors"
          aria-label="Unpin module"
        >
          <Pin className="h-3 w-3 pin-indicator" style={{ color: module.hexColor }} />
        </button>
      ) : isRecent ? (
        <Clock className="h-3.5 w-3.5 text-muted-foreground/40 shrink-0" />
      ) : (
        <div className="w-5 shrink-0" />
      )}

      {/* Icon */}
      <div
        className="flex items-center justify-center w-9 h-9 rounded-lg shrink-0 transition-transform duration-200 group-hover:scale-105"
        style={{
          backgroundColor: `${module.hexColor}15`,
          color: module.hexColor,
        }}
      >
        <Icon className="h-4.5 w-4.5" strokeWidth={1.8} />
      </div>

      {/* Text content */}
      <div className="flex-1 text-left">
        <h3
          className={`font-semibold text-sm ${isActive ? 'text-foreground' : 'text-foreground'}`}
          style={{ letterSpacing: 'var(--tracking-tight)', lineHeight: 'var(--leading-tight)' }}
        >
          {module.name}
        </h3>
        <p
          className="text-xs text-muted-foreground mt-0.5"
          style={{ letterSpacing: 'var(--tracking-normal)', lineHeight: 'var(--leading-normal)' }}
        >
          {module.description}
        </p>
      </div>

      {/* Accent indicator */}
      <div
        className="w-1.5 h-8 rounded-full opacity-40 group-hover:opacity-100 transition-opacity duration-[140ms] shrink-0"
        style={{ backgroundColor: module.hexColor }}
      />
    </motion.div>
  );
}
