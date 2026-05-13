'use client';

import { useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronsDown,
  ChevronsUp,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  useWorkspaceStore,
  type WorkspaceState,
} from '@/stores/useWorkspaceStore';
import { useHasWorkspace } from './WorkspaceProvider';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

/* ============================================================
   TYPES
   ============================================================ */

interface WorkspaceControlsProps {
  workspaceId: string;
  currentState: WorkspaceState;
  className?: string;
  variant?: 'default' | 'compact' | 'window';
}

interface ControlButtonProps {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
  className?: string;
  visible?: boolean;
  variant?: 'default' | 'compact' | 'window';
  color?: string; // For window-style buttons
}

/* ============================================================
   CONTROL BUTTON
   ============================================================ */

function ControlButton({ icon, label, onClick, className, visible = true, variant = 'default', color }: ControlButtonProps) {
  if (!visible) return null;

  if (variant === 'window') {
    // macOS/Windows-style window control buttons
    return (
      <TooltipProvider delayDuration={300}>
        <Tooltip>
          <TooltipTrigger asChild>
            <motion.button
              type="button"
              onClick={onClick}
              className={cn(
                'group relative flex items-center justify-center rounded-full transition-all duration-150',
                'h-5 w-5',
                'hover:brightness-110 active:brightness-90',
                className,
              )}
              style={{ backgroundColor: color || 'var(--muted)' }}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.12 }}
              aria-label={label}
            >
              <span className="opacity-0 group-hover:opacity-100 transition-opacity text-[10px] text-foreground/80">
                {icon}
              </span>
            </motion.button>
          </TooltipTrigger>
          <TooltipContent side="bottom" className="text-[10px] px-1.5 py-0.5">
            {label}
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }

  return (
    <TooltipProvider delayDuration={300}>
      <Tooltip>
        <TooltipTrigger asChild>
          <motion.button
            type="button"
            onClick={onClick}
            className={cn(
              'flex items-center justify-center h-7 w-7 rounded-md',
              'text-muted-foreground hover:text-foreground',
              'hover:bg-glass-hover',
              'transition-all duration-150',
              'focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-interactive-focus',
              className,
            )}
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.85 }}
            transition={{ duration: 0.12, ease: [0.25, 0.46, 0.45, 0.94] }}
            aria-label={label}
          >
            {icon}
          </motion.button>
        </TooltipTrigger>
        <TooltipContent side="bottom" className="text-[10px] px-1.5 py-0.5">
          {label}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

/* ============================================================
   WORKSPACE CONTROLS
   ============================================================ */

export function WorkspaceControls({
  workspaceId,
  currentState,
  className,
  variant = 'default',
}: WorkspaceControlsProps) {
  const hasWorkspace = useHasWorkspace();
  const expandWorkspace = useWorkspaceStore((s) => s.expandWorkspace);
  const collapseWorkspace = useWorkspaceStore((s) => s.collapseWorkspace);

  const handleExpand = useCallback(() => {
    expandWorkspace(workspaceId);
  }, [workspaceId, expandWorkspace]);

  const handleCollapse = useCallback(() => {
    collapseWorkspace(workspaceId);
  }, [workspaceId, collapseWorkspace]);

  const isCompact = currentState === 'compact';
  const isExpanded = currentState === 'expanded';

  // Don't render if not inside a WorkspaceProvider
  if (!hasWorkspace || !workspaceId) return null;

  if (variant === 'window') {
    // Window controls disabled - minimize/maximize removed globally
    return null;
  }

  return (
    <div
      className={cn('flex items-center gap-0.5', className)}
      role="toolbar"
      aria-label="Workspace controls"
    >
      {/* Collapse to compact — available when expanded */}
      <AnimatePresence>
        {isExpanded && (
          <ControlButton
            icon={<ChevronsDown className="size-3.5" />}
            label="Compact"
            onClick={handleCollapse}
            visible
          />
        )}
      </AnimatePresence>

      {/* Expand from compact — available when compact */}
      <AnimatePresence>
        {isCompact && (
          <ControlButton
            icon={<ChevronsUp className="size-3.5" />}
            label="Expand"
            onClick={handleExpand}
            visible
          />
        )}
      </AnimatePresence>
    </div>
  );
}
