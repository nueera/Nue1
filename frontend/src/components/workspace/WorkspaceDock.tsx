'use client';

import { useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard,
  Users,
  Banknote,
  Megaphone,
  BarChart3,
  Zap,
  Heart,
  Settings,
  Pin,
  PinOff,
  X,
  type LucideProps,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  useWorkspaceStore,
  type WorkspaceDockItem,
} from '@/stores/useWorkspaceStore';
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuTrigger,
} from '@/components/ui/context-menu';

/* ============================================================
   MODULE ICON RENDERER
   ============================================================ */

function ModuleIcon({ moduleId, ...props }: LucideProps & { moduleId: string }) {
  switch (moduleId) {
    case 'erp':
      return <LayoutDashboard {...props} />;
    case 'crm':
      return <Users {...props} />;
    case 'finance':
      return <Banknote {...props} />;
    case 'marketing':
      return <Megaphone {...props} />;
    case 'analytics':
      return <BarChart3 {...props} />;
    case 'automation':
      return <Zap {...props} />;
    case 'retention':
      return <Heart {...props} />;
    case 'settings':
      return <Settings {...props} />;
    default:
      return <LayoutDashboard {...props} />;
  }
}

/* ============================================================
   DOCK ITEM
   ============================================================ */

interface DockItemProps {
  item: WorkspaceDockItem;
  isActive: boolean;
  onClick: () => void;
  onTogglePin: () => void;
  onClose: () => void;
}

function DockItem({ item, isActive, onClick, onTogglePin, onClose }: DockItemProps) {
  return (
    <ContextMenu>
      <ContextMenuTrigger asChild>
        <motion.button
          type="button"
          onClick={onClick}
          className={cn(
            'workspace-dock-item relative flex flex-col items-center justify-center gap-0.5 px-3 py-1.5 rounded-lg',
            'hover:bg-glass-hover focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-interactive-focus',
            isActive && 'bg-glass-hover'
          )}
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.96 }}
          transition={{ duration: 0.12, ease: [0.25, 0.46, 0.45, 0.94] }}
          aria-label={`${item.title}${item.state === 'minimized' ? ' (minimized)' : ''}${item.pinned ? ' (pinned)' : ''}`}
        >
          <ModuleIcon
            moduleId={item.moduleId}
            className={cn(
              'size-4 shrink-0',
              isActive ? `text-module-${item.moduleId}` : 'text-muted-foreground'
            )}
          />
          <span className="text-nueone-xs max-w-[56px] truncate text-muted-foreground leading-none">
            {item.title}
          </span>
          {/* Active indicator dot */}
          <AnimatePresence>
            {isActive && (
              <motion.span
                className={cn(
                  'absolute -bottom-0.5 left-1/2 -translate-x-1/2 h-1 w-1 rounded-full',
                  `bg-module-${item.moduleId}`
                )}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                transition={{ duration: 0.15 }}
              />
            )}
          </AnimatePresence>
          {/* Pinned indicator */}
          {item.pinned && (
            <span className="absolute -top-0.5 -right-0.5">
              <Pin className="size-2.5 text-muted-foreground/60 rotate-45" />
            </span>
          )}
        </motion.button>
      </ContextMenuTrigger>
      <ContextMenuContent className="w-40">
        <ContextMenuItem onClick={onTogglePin}>
          {item.pinned ? (
            <>
              <PinOff className="size-3.5 mr-2" />
              Unpin
            </>
          ) : (
            <>
              <Pin className="size-3.5 mr-2" />
              Pin to dock
            </>
          )}
        </ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuItem onClick={onClose} variant="destructive">
          <X className="size-3.5 mr-2" />
          Close
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
}

/* ============================================================
   WORKSPACE DOCK
   ============================================================ */

export function WorkspaceDock({ className }: { className?: string }) {
  const dockItems = useWorkspaceStore((s) => s.dockItems);
  const activeWorkspaceId = useWorkspaceStore((s) => s.activeWorkspaceId);
  const workspaces = useWorkspaceStore((s) => s.workspaces);
  const restoreWorkspace = useWorkspaceStore((s) => s.restoreWorkspace);
  const setActiveWorkspace = useWorkspaceStore((s) => s.setActiveWorkspace);
  const toggleWorkspacePin = useWorkspaceStore((s) => s.toggleWorkspacePin);
  const removeWorkspace = useWorkspaceStore((s) => s.removeWorkspace);

  // Separate pinned and minimized items for visual grouping
  const { pinnedItems, minimizedItems } = useMemo(() => {
    const pinned: WorkspaceDockItem[] = [];
    const minimized: WorkspaceDockItem[] = [];
    for (const item of dockItems) {
      if (item.pinned) {
        pinned.push(item);
      } else {
        minimized.push(item);
      }
    }
    return { pinnedItems: pinned, minimizedItems: minimized };
  }, [dockItems]);

  const isHidden = dockItems.length === 0;

  const handleClick = useCallback(
    (item: WorkspaceDockItem) => {
      const workspace = workspaces[item.workspaceId];
      if (!workspace) return;

      if (workspace.state === 'minimized') {
        restoreWorkspace(item.workspaceId);
      } else {
        setActiveWorkspace(item.workspaceId);
      }
    },
    [workspaces, restoreWorkspace, setActiveWorkspace]
  );

  const handleTogglePin = useCallback(
    (item: WorkspaceDockItem) => {
      toggleWorkspacePin(item.workspaceId);
    },
    [toggleWorkspacePin]
  );

  const handleClose = useCallback(
    (item: WorkspaceDockItem) => {
      removeWorkspace(item.workspaceId);
    },
    [removeWorkspace]
  );

  return (
    <div
      className={cn(
        'workspace-dock flex items-center justify-center gap-1 px-2',
        isHidden && 'hidden-dock',
        className
      )}
      role="navigation"
      aria-label="Workspace dock"
    >
      {/* Pinned items */}
      <AnimatePresence mode="popLayout">
        {pinnedItems.map((item) => (
          <DockItem
            key={item.workspaceId}
            item={item}
            isActive={activeWorkspaceId === item.workspaceId}
            onClick={() => handleClick(item)}
            onTogglePin={() => handleTogglePin(item)}
            onClose={() => handleClose(item)}
          />
        ))}
      </AnimatePresence>

      {/* Separator between pinned and minimized */}
      {pinnedItems.length > 0 && minimizedItems.length > 0 && (
        <div className="w-px h-6 bg-glass-border mx-1" aria-hidden="true" />
      )}

      {/* Minimized items */}
      <AnimatePresence mode="popLayout">
        {minimizedItems.map((item) => (
          <DockItem
            key={item.workspaceId}
            item={item}
            isActive={activeWorkspaceId === item.workspaceId}
            onClick={() => handleClick(item)}
            onTogglePin={() => handleTogglePin(item)}
            onClose={() => handleClose(item)}
          />
        ))}
      </AnimatePresence>
    </div>
  );
}
