'use client';

import { useCallback, useMemo } from 'react';
import { useRouter, usePathname } from 'next/navigation';
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
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

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
  isCurrentModule: boolean;
  onClick: () => void;
  onTogglePin: () => void;
  onClose: () => void;
}

function DockItem({
  item,
  isActive,
  isCurrentModule,
  onClick,
  onTogglePin,
  onClose,
}: DockItemProps) {
  const isMinimized = item.state === 'minimized';

  return (
    <ContextMenu>
      <ContextMenuTrigger asChild>
        <TooltipProvider delayDuration={200}>
          <Tooltip>
            <TooltipTrigger asChild>
              <motion.button
                type="button"
                onClick={onClick}
                className={cn(
                  'workspace-dock-item relative flex flex-col items-center justify-center gap-0.5 px-3 py-1.5 rounded-xl',
                  'transition-all duration-200',
                  'hover:bg-glass-hover focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-interactive-focus',
                  isActive && 'bg-glass-hover shadow-sm',
                  isCurrentModule && 'ring-1 ring-module-erp/30',
                )}
                whileHover={{ y: -3, scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.15, ease: [0.25, 0.46, 0.45, 0.94] as const }}
                aria-label={`${item.title}${isMinimized ? ' (minimized)' : ''}${item.pinned ? ' (pinned)' : ''}`}
              >
                <div className="relative">
                  <ModuleIcon
                    moduleId={item.moduleId}
                    className={cn(
                      'size-5 shrink-0 transition-colors duration-200',
                      isActive
                        ? `text-module-${item.moduleId}`
                        : isMinimized
                          ? 'text-muted-foreground/60'
                          : 'text-muted-foreground',
                    )}
                  />
                  {/* Running indicator — pulsing dot */}
                  {!isMinimized && (
                    <motion.span
                      className={cn(
                        'absolute -top-0.5 -right-0.5 h-2 w-2 rounded-full',
                        `bg-module-${item.moduleId}`,
                      )}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.2 }}
                    />
                  )}
                  {/* Minimized indicator — small dash */}
                  {isMinimized && (
                    <span className="absolute -top-0.5 -right-0.5 h-1.5 w-1.5 rounded-full bg-muted-foreground/40" />
                  )}
                </div>
                <span
                  className={cn(
                    'text-[10px] max-w-[60px] truncate leading-none',
                    isMinimized ? 'text-muted-foreground/50' : 'text-muted-foreground',
                  )}
                >
                  {item.title}
                </span>
                {/* Active indicator dot */}
                <AnimatePresence>
                  {isActive && (
                    <motion.span
                      className={cn(
                        'absolute -bottom-0.5 left-1/2 -translate-x-1/2 h-1 w-1 rounded-full',
                        `bg-module-${item.moduleId}`,
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
            </TooltipTrigger>
            <TooltipContent side="top" className="text-xs">
              {item.title}
              {isMinimized ? ' — Click to restore' : ' — Click to switch'}
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </ContextMenuTrigger>
      <ContextMenuContent className="w-48">
        <ContextMenuItem onClick={onTogglePin}>
          {item.pinned ? (
            <>
              <PinOff className="size-3.5 mr-2" />
              Unpin from dock
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
   GLOBAL WORKSPACE DOCK
   ============================================================ */

export function GlobalWorkspaceDock({ className }: { className?: string }) {
  const router = useRouter();
  const pathname = usePathname();
  const dockItems = useWorkspaceStore((s) => s.dockItems);
  const workspaces = useWorkspaceStore((s) => s.workspaces);
  const activeWorkspaceId = useWorkspaceStore((s) => s.activeWorkspaceId);
  const restoreWorkspace = useWorkspaceStore((s) => s.restoreWorkspace);
  const setActiveWorkspace = useWorkspaceStore((s) => s.setActiveWorkspace);
  const toggleWorkspacePin = useWorkspaceStore((s) => s.toggleWorkspacePin);
  const removeWorkspace = useWorkspaceStore((s) => s.removeWorkspace);
  const getModuleRoute = useWorkspaceStore((s) => s.getModuleRoute);

  // Determine current module from pathname
  const currentModuleId = pathname?.startsWith('/crm')
    ? 'crm'
    : pathname?.startsWith('/erp')
      ? 'erp'
      : null;

  // Combine active workspaces and dock items for the global dock
  // Show: (1) all active (non-minimized) workspaces, (2) all minimized workspaces, (3) pinned workspaces
  const allDockItems = useMemo(() => {
    const items: WorkspaceDockItem[] = [];
    const seen = new Set<string>();

    // Add active (non-minimized) workspaces first
    for (const ws of Object.values(workspaces)) {
      if (ws.state !== 'minimized' && !seen.has(ws.id)) {
        seen.add(ws.id);
        items.push({
          workspaceId: ws.id,
          moduleId: ws.moduleId,
          title: ws.title,
          icon: ws.icon,
          state: ws.state,
          pinned: ws.pinned,
          currentPath: ws.currentPath,
        });
      }
    }

    // Add dock items (minimized + pinned)
    for (const item of dockItems) {
      if (!seen.has(item.workspaceId)) {
        seen.add(item.workspaceId);
        items.push(item);
      }
    }

    // Sort: active first, then minimized, then just pinned
    const priority: Record<string, number> = {
      maximized: 0,
      expanded: 1,
      compact: 2,
      minimized: 3,
    };

    return items.sort((a, b) => {
      // Current module always first
      if (a.moduleId === currentModuleId && b.moduleId !== currentModuleId) return -1;
      if (b.moduleId === currentModuleId && a.moduleId !== currentModuleId) return 1;
      // Then by state priority
      return (priority[a.state] ?? 4) - (priority[b.state] ?? 4);
    });
  }, [workspaces, dockItems, currentModuleId]);

  const isHidden = allDockItems.length === 0;

  const handleClick = useCallback(
    (item: WorkspaceDockItem) => {
      const workspace = workspaces[item.workspaceId];
      if (!workspace) return;

      if (workspace.state === 'minimized') {
        // Restore the workspace and navigate to it
        restoreWorkspace(item.workspaceId);
        const targetPath = workspace.currentPath || getModuleRoute(workspace.moduleId);
        router.push(targetPath);
      } else {
        // Switch to the workspace (navigate if different module)
        setActiveWorkspace(item.workspaceId);
        if (item.moduleId !== currentModuleId) {
          const targetPath = workspace.currentPath || getModuleRoute(workspace.moduleId);
          router.push(targetPath);
        }
      }
    },
    [workspaces, restoreWorkspace, setActiveWorkspace, router, currentModuleId, getModuleRoute],
  );

  const handleTogglePin = useCallback(
    (item: WorkspaceDockItem) => {
      toggleWorkspacePin(item.workspaceId);
    },
    [toggleWorkspacePin],
  );

  const handleClose = useCallback(
    (item: WorkspaceDockItem) => {
      removeWorkspace(item.workspaceId);
    },
    [removeWorkspace],
  );


  if (isHidden) return null;

  return (
    <motion.div
      initial={{ y: 40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] as const }}
      className={cn(
        'fixed bottom-3 left-1/2 -translate-x-1/2 z-[60]',
        'flex items-center gap-1 px-3 py-1.5',
        'rounded-2xl border border-glass-border',
        'bg-background/80 backdrop-blur-xl shadow-lg shadow-black/10',
        className,
      )}
      role="navigation"
      aria-label="Global workspace dock"
    >
      <AnimatePresence mode="popLayout">
        {allDockItems.map((item) => (
          <DockItem
            key={item.workspaceId}
            item={item}
            isActive={activeWorkspaceId === item.workspaceId}
            isCurrentModule={item.moduleId === currentModuleId}
            onClick={() => handleClick(item)}
            onTogglePin={() => handleTogglePin(item)}
            onClose={() => handleClose(item)}
          />
        ))}
      </AnimatePresence>
    </motion.div>
  );
}
