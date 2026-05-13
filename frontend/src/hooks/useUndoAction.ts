import { useCallback } from 'react';
import {
  useUndoStore,
  generateUndoId,
  type UndoAction,
} from '@/stores/useUndoStore';

/* ============================================================
   USE UNDO ACTION HOOK
   A convenience hook wrapping the undo store for easy
   component consumption.
   ============================================================ */

interface UseUndoActionReturn {
  /** Push a new undoable action to the history */
  pushAction: (action: Omit<UndoAction, 'id' | 'timestamp'>) => void;
  /** Convenience: register an action with auto-generated ID and timestamp */
  registerAction: (
    description: string,
    moduleId: string,
    undoFn: () => void | Promise<void>,
    redoFn?: () => void | Promise<void>
  ) => void;
  /** Perform undo */
  undo: () => Promise<void>;
  /** Perform redo */
  redo: () => Promise<void>;
  /** Whether undo is available */
  canUndo: boolean;
  /** Whether redo is available */
  canRedo: boolean;
  /** The most recent action in the undo stack */
  lastAction: UndoAction | null;
  /** Clear all undo/redo history */
  clearHistory: () => void;
}

export function useUndoAction(): UseUndoActionReturn {
  const store = useUndoStore();

  const pushAction = useCallback(
    (action: Omit<UndoAction, 'id' | 'timestamp'>) => {
      const fullAction: UndoAction = {
        ...action,
        id: generateUndoId(),
        timestamp: Date.now(),
      };
      store.pushAction(fullAction);
    },
    [store]
  );

  const registerAction = useCallback(
    (
      description: string,
      moduleId: string,
      undoFn: () => void | Promise<void>,
      redoFn?: () => void | Promise<void>
    ) => {
      pushAction({
        description,
        moduleId,
        undo: undoFn,
        redo: redoFn,
      });
    },
    [pushAction]
  );

  return {
    pushAction,
    registerAction,
    undo: store.undo,
    redo: store.redo,
    canUndo: store.canUndo,
    canRedo: store.canRedo,
    lastAction: store.getLastAction(),
    clearHistory: store.clearHistory,
  };
}

export default useUndoAction;
