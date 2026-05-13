'use client';

import {
  useCallback,
  useRef,
  useState,
  useMemo,
  type ReactNode,
} from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, GripVertical } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  useWorkspaceStore,
  type WorkspacePanel,
  type PanelLayout,
} from '@/stores/useWorkspaceStore';

/* ============================================================
   TYPES
   ============================================================ */

interface MultiPanelProps {
  workspaceId: string;
  children?: ReactNode;
  className?: string;
}

interface PanelTabProps {
  panel: WorkspacePanel;
  isActive: boolean;
  onClose: () => void;
  onClick: () => void;
}

/* ============================================================
   CONSTANTS
   ============================================================ */

const MIN_PANEL_WIDTH = 20; // minimum 20% width

/* ============================================================
   PANEL TAB
   ============================================================ */

function PanelTab({ panel, isActive, onClose, onClick }: PanelTabProps) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      className={cn(
        'group relative flex items-center gap-1.5 px-3 py-1.5 rounded-t-md text-sm transition-colors',
        'duration-[var(--motion-fast)] ease-[var(--motion-ease-out)]',
        isActive
          ? 'bg-background text-foreground shadow-theme-sm'
          : 'text-muted-foreground hover:text-foreground hover:bg-glass-hover'
      )}
      layout
      aria-selected={isActive}
      role="tab"
    >
      <span className="truncate max-w-[120px]">{panel.title}</span>
      <span
        role="button"
        tabIndex={0}
        onClick={(e) => {
          e.stopPropagation();
          onClose();
        }}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.stopPropagation();
            onClose();
          }
        }}
        className={cn(
          'ml-1 flex items-center justify-center size-4 rounded-sm',
          'opacity-0 group-hover:opacity-100 transition-opacity duration-[var(--motion-fast)]',
          'hover:bg-glass-hover'
        )}
        aria-label={`Close ${panel.title}`}
      >
        <X className="size-2.5" />
      </span>
    </motion.button>
  );
}

/* ============================================================
   RESIZE HANDLE
   ============================================================ */

interface ResizeHandleProps {
  onMouseDown: (e: React.MouseEvent) => void;
  side: 'left' | 'right';
}

function ResizeHandle({ onMouseDown, side }: ResizeHandleProps) {
  return (
    <div
      className="panel-resize-handle flex items-center justify-center"
      onMouseDown={onMouseDown}
      role="separator"
      aria-orientation="vertical"
      aria-label={`Resize panel ${side}`}
      tabIndex={0}
    >
      <GripVertical className="size-2.5 text-transparent group-hover:text-muted-foreground pointer-events-none" />
    </div>
  );
}

/* ============================================================
   MULTI PANEL
   ============================================================ */

export function MultiPanel({ workspaceId, children, className }: MultiPanelProps) {
  const workspace = useWorkspaceStore((s) => s.workspaces[workspaceId]);
  const removePanel = useWorkspaceStore((s) => s.removePanel);
  const resizePanel = useWorkspaceStore((s) => s.resizePanel);

  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedPanelId, setSelectedPanelId] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  // Drag state refs
  const dragStartX = useRef(0);
  const dragPanelId = useRef<string>('');
  const dragInitialWidth = useRef(0);
  const dragAdjacentPanelId = useRef<string>('');
  const dragAdjacentInitialWidth = useRef(0);

  const panels = workspace?.panels ?? [];
  const layout: PanelLayout = workspace?.layout ?? 'single';

  // Derive active panel: if selected is invalid, fall back to first panel
  const activePanelId = useMemo(() => {
    if (panels.length === 0) return null;
    if (selectedPanelId && panels.find((p) => p.id === selectedPanelId)) {
      return selectedPanelId;
    }
    return panels[0].id;
  }, [panels, selectedPanelId]);

  // Handle resize drag start
  const handleResizeStart = useCallback(
    (e: React.MouseEvent, panelId: string, adjacentPanelId: string) => {
      e.preventDefault();
      const panel = panels.find((p) => p.id === panelId);
      const adjacentPanel = panels.find((p) => p.id === adjacentPanelId);
      if (!panel || !adjacentPanel || !containerRef.current) return;

      setIsDragging(true);
      dragStartX.current = e.clientX;
      dragPanelId.current = panelId;
      dragInitialWidth.current = panel.width ?? 50;
      dragAdjacentPanelId.current = adjacentPanelId;
      dragAdjacentInitialWidth.current = adjacentPanel.width ?? 50;

      const handleMouseMove = (moveEvent: MouseEvent) => {
        const containerWidth = containerRef.current?.offsetWidth ?? 0;
        if (containerWidth === 0) return;

        const deltaX = moveEvent.clientX - dragStartX.current;
        const deltaPercent = (deltaX / containerWidth) * 100;

        let newWidth = dragInitialWidth.current + deltaPercent;
        let newAdjacentWidth = dragAdjacentInitialWidth.current - deltaPercent;

        // Enforce minimum width
        if (newWidth < MIN_PANEL_WIDTH) {
          const diff = MIN_PANEL_WIDTH - newWidth;
          newWidth = MIN_PANEL_WIDTH;
          newAdjacentWidth -= diff;
        }
        if (newAdjacentWidth < MIN_PANEL_WIDTH) {
          const diff = MIN_PANEL_WIDTH - newAdjacentWidth;
          newAdjacentWidth = MIN_PANEL_WIDTH;
          newWidth -= diff;
        }

        // Clamp total to 100%
        const total = newWidth + newAdjacentWidth;
        if (total > 100) {
          const excess = total - 100;
          newWidth -= excess / 2;
          newAdjacentWidth -= excess / 2;
        }

        // Apply widths directly to DOM for smooth feedback
        const panelEl = document.querySelector(`[data-panel-id="${panelId}"]`) as HTMLElement;
        const adjacentEl = document.querySelector(`[data-panel-id="${adjacentPanelId}"]`) as HTMLElement;
        if (panelEl) panelEl.style.flex = `${newWidth} 0 0`;
        if (adjacentEl) adjacentEl.style.flex = `${newAdjacentWidth} 0 0`;
      };

      const handleMouseUp = () => {
        // Read final widths from DOM and persist to store
        const panelEl = document.querySelector(`[data-panel-id="${dragPanelId.current}"]`) as HTMLElement;
        const adjacentEl = document.querySelector(`[data-panel-id="${dragAdjacentPanelId.current}"]`) as HTMLElement;
        const containerWidth = containerRef.current?.offsetWidth ?? 1;

        if (panelEl) {
          const finalWidth = (panelEl.offsetWidth / containerWidth) * 100;
          resizePanel(workspaceId, dragPanelId.current, Math.round(finalWidth));
          panelEl.style.flex = ''; // Reset inline style
        }
        if (adjacentEl) {
          const finalAdjacentWidth = (adjacentEl.offsetWidth / containerWidth) * 100;
          resizePanel(workspaceId, dragAdjacentPanelId.current, Math.round(finalAdjacentWidth));
          adjacentEl.style.flex = ''; // Reset inline style
        }

        setIsDragging(false);
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };

      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    },
    [panels, workspaceId, resizePanel]
  );

  const handleClosePanel = useCallback(
    (panelId: string) => {
      removePanel(workspaceId, panelId);
    },
    [workspaceId, removePanel]
  );

  // Don't render multi-panel shell if no workspace
  if (!workspace) return null;

  const isVerticalStack = layout === 'split-v';
  const showTabs = panels.length > 1;

  return (
    <div
      ref={containerRef}
      className={cn(
        'workspace-panels',
        isVerticalStack && 'flex-col',
        isDragging && 'select-none cursor-col-resize',
        isVerticalStack && isDragging && 'cursor-row-resize',
        className
      )}
      data-workspace-panels={layout}
      role="tabpanel"
    >
      <AnimatePresence mode="popLayout">
        {panels.map((panel, index) => {
          const flexBasis = panel.width ?? Math.floor(100 / panels.length);
          const isLast = index === panels.length - 1;
          const adjacentPanelId = isLast ? panels[index - 1]?.id : panels[index + 1]?.id;

          return (
            <motion.div
              key={panel.id}
              data-panel-id={panel.id}
              className={cn(
                'workspace-panel flex flex-col min-w-0',
                isVerticalStack ? 'min-h-0' : 'min-w-0'
              )}
              style={{ flex: `${flexBasis} 0 0` }}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{
                duration: 0.18,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
            >
              {/* Panel tab bar */}
              {showTabs && (
                <div className="flex items-center gap-0.5 px-1 pt-1 bg-surface-sunken border-b border-glass-border">
                  <PanelTab
                    panel={panel}
                    isActive={activePanelId === panel.id}
                    onClose={() => handleClosePanel(panel.id)}
                    onClick={() => setSelectedPanelId(panel.id)}
                  />
                </div>
              )}

              {/* Panel content — independently scrollable */}
              <div className="flex-1 overflow-y-auto overflow-x-hidden custom-scrollbar">
                {children}
              </div>

              {/* Resize handle — not on last panel */}
              {!isLast && adjacentPanelId && (
                <ResizeHandle
                  onMouseDown={(e) => handleResizeStart(e, panel.id, adjacentPanelId)}
                  side="right"
                />
              )}
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}
