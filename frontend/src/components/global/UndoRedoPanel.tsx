'use client';

import { useEffect, useRef, useCallback, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Undo2, Redo2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useUndoStore } from '@/stores/useUndoStore';
import { useNotificationStore } from '@/stores/useNotificationStore';
import { useIsMobile } from '@/hooks/use-mobile';
import { Tooltip, TooltipTrigger, TooltipContent } from '@/components/ui/tooltip';
import { Button } from '@/components/ui/button';

/* ============================================================
   UNDO/REDO TOAST HELPER
   ============================================================ */

function showUndoRedoToast(type: 'undo' | 'redo', description: string) {
  const { addNotification } = useNotificationStore.getState();
  addNotification({
    type: 'info',
    title: type === 'undo' ? 'Undone' : 'Redone',
    message: `${type === 'undo' ? 'Undone' : 'Redone'}: ${description}`,
  });
}

/* ============================================================
   DESKTOP TOOLBAR BUTTONS
   ============================================================ */

function DesktopUndoRedo() {
  const { undo, redo, canUndo, canRedo, isUndoing, isRedoing, past, future } = useUndoStore();
  const lastUndoDesc = past.length > 0 ? past[0].description : undefined;
  const lastRedoDesc = future.length > 0 ? future[0].description : undefined;

  const handleUndo = useCallback(async () => {
    const desc = past[0]?.description;
    await undo();
    if (desc) showUndoRedoToast('undo', desc);
  }, [undo, past]);

  const handleRedo = useCallback(async () => {
    const desc = future[0]?.description;
    await redo();
    if (desc) showUndoRedoToast('redo', desc);
  }, [redo, future]);

  return (
    <div className="flex items-center gap-0.5">
      {/* Undo */}
      <Tooltip>
        <TooltipTrigger asChild>
          <span tabIndex={0}>
            <Button
              variant="ghost"
              size="icon"
              className={cn(
                'h-8 w-8 press-scale',
                !canUndo && 'opacity-40 pointer-events-none'
              )}
              onClick={handleUndo}
              disabled={!canUndo || isUndoing}
              aria-label={lastUndoDesc ? `Undo: ${lastUndoDesc}` : 'Undo'}
            >
              <Undo2 className="h-4 w-4" />
            </Button>
          </span>
        </TooltipTrigger>
        <TooltipContent side="bottom">
          {lastUndoDesc ? `Undo: ${lastUndoDesc}` : 'Nothing to undo'}
        </TooltipContent>
      </Tooltip>

      {/* Redo */}
      <Tooltip>
        <TooltipTrigger asChild>
          <span tabIndex={0}>
            <Button
              variant="ghost"
              size="icon"
              className={cn(
                'h-8 w-8 press-scale',
                !canRedo && 'opacity-40 pointer-events-none'
              )}
              onClick={handleRedo}
              disabled={!canRedo || isRedoing}
              aria-label={lastRedoDesc ? `Redo: ${lastRedoDesc}` : 'Redo'}
            >
              <Redo2 className="h-4 w-4" />
            </Button>
          </span>
        </TooltipTrigger>
        <TooltipContent side="bottom">
          {lastRedoDesc ? `Redo: ${lastRedoDesc}` : 'Nothing to redo'}
        </TooltipContent>
      </Tooltip>
    </div>
  );
}

/* ============================================================
   MOBILE FLOATING ACTION BUTTON
   ============================================================ */

function MobileUndoFab() {
  const { undo, redo, canUndo, canRedo, isUndoing, past } = useUndoStore();
  const longPressTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [isPressed, setIsPressed] = useState(false);

  const handleUndo = useCallback(async () => {
    const desc = past[0]?.description;
    await undo();
    if (desc) showUndoRedoToast('undo', desc);
  }, [undo, past]);

  const handleRedo = useCallback(async () => {
    const desc = useUndoStore.getState().future[0]?.description;
    await redo();
    if (desc) showUndoRedoToast('redo', desc);
  }, [redo]);

  // Long press for redo
  const handlePointerDown = useCallback(() => {
    setIsPressed(true);
    longPressTimerRef.current = setTimeout(() => {
      // Long press triggers redo
      if (canRedo) {
        handleRedo();
      }
      setIsPressed(false);
    }, 500);
  }, [canRedo, handleRedo]);

  const handlePointerUp = useCallback(() => {
    if (longPressTimerRef.current) {
      clearTimeout(longPressTimerRef.current);
      longPressTimerRef.current = null;
    }
    if (isPressed && canUndo) {
      // Short tap triggers undo
      handleUndo();
    }
    setIsPressed(false);
  }, [canUndo, handleUndo, isPressed]);

  const handlePointerLeave = useCallback(() => {
    if (longPressTimerRef.current) {
      clearTimeout(longPressTimerRef.current);
      longPressTimerRef.current = null;
    }
    setIsPressed(false);
  }, []);

  if (!canUndo && !canRedo) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0, opacity: 0 }}
        transition={{ type: 'spring', damping: 20, stiffness: 300 }}
        className="fixed bottom-6 left-6 z-40"
      >
        <button
          onPointerDown={handlePointerDown}
          onPointerUp={handlePointerUp}
          onPointerLeave={handlePointerLeave}
          className={cn(
            'flex items-center justify-center',
            'h-12 w-12 rounded-full',
            'glass-surface-strong shadow-theme-lg',
            'press-scale',
            'transition-transform duration-100',
            isPressed && 'scale-90'
          )}
          style={{
            color: canUndo ? 'var(--module-erp)' : 'var(--muted-foreground)',
          }}
          aria-label={canUndo ? 'Tap to undo, long-press to redo' : 'Redo'}
        >
          <Undo2 className="h-5 w-5" />
        </button>
        {/* Subtle hint label */}
        {canUndo && (
          <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-[9px] text-muted-foreground whitespace-nowrap">
            tap undo · hold redo
          </span>
        )}
      </motion.div>
    </AnimatePresence>
  );
}

/* ============================================================
   KEYBOARD SHORTCUT LISTENER
   ============================================================ */

function useUndoRedoKeyboard() {
  const { undo, redo, canUndo, canRedo, past, future } = useUndoStore();

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      // Cmd+Z or Ctrl+Z = Undo
      if ((e.metaKey || e.ctrlKey) && e.key === 'z' && !e.shiftKey) {
        e.preventDefault();
        if (canUndo) {
          const desc = past[0]?.description;
          undo();
          if (desc) showUndoRedoToast('undo', desc);
        }
      }
      // Cmd+Shift+Z or Ctrl+Shift+Z = Redo
      if ((e.metaKey || e.ctrlKey) && e.key === 'z' && e.shiftKey) {
        e.preventDefault();
        if (canRedo) {
          const desc = future[0]?.description;
          redo();
          if (desc) showUndoRedoToast('redo', desc);
        }
      }
      // Ctrl+Y = Redo (Windows convention)
      if ((e.metaKey || e.ctrlKey) && e.key === 'y') {
        e.preventDefault();
        if (canRedo) {
          const desc = future[0]?.description;
          redo();
          if (desc) showUndoRedoToast('redo', desc);
        }
      }
    };

    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [undo, redo, canUndo, canRedo, past, future]);
}

/* ============================================================
   UNDO/REDO PANEL (Main Export)
   ============================================================ */

export function UndoRedoPanel() {
  const isMobile = useIsMobile();
  useUndoRedoKeyboard();

  return isMobile ? <MobileUndoFab /> : <DesktopUndoRedo />;
}

export default UndoRedoPanel;
