import { create } from 'zustand';

/* ============================================================
   UNDO ACTION TYPE
   ============================================================ */

export interface UndoAction {
  id: string;
  description: string;
  moduleId: string;
  timestamp: number;
  undo: () => void | Promise<void>;
  redo?: () => void | Promise<void>;
}

/* ============================================================
   UNDO STORE STATE
   ============================================================ */

const MAX_HISTORY = 50;

interface UndoState {
  past: UndoAction[];
  future: UndoAction[];
  isUndoing: boolean;
  isRedoing: boolean;

  // Actions
  pushAction: (action: UndoAction) => void;
  undo: () => Promise<void>;
  redo: () => Promise<void>;
  clearHistory: () => void;

  // Derived
  canUndo: boolean;
  canRedo: boolean;
  getLastAction: () => UndoAction | null;
}

/* ============================================================
   ID GENERATOR
   ============================================================ */

let idCounter = 0;
const generateId = (): string => {
  idCounter += 1;
  return `undo-${Date.now()}-${idCounter.toString(36)}`;
};

/* ============================================================
   UNDO STORE
   NOTE: This store is NOT persisted because actions contain
   functions that cannot be serialized. It is ephemeral per session.
   ============================================================ */

export const useUndoStore = create<UndoState>()((set, get) => ({
  past: [],
  future: [],
  isUndoing: false,
  isRedoing: false,

  pushAction: (action) => {
    set((state) => ({
      past: [action, ...state.past].slice(0, MAX_HISTORY),
      future: [], // Clear future on new action
      canUndo: true,
      canRedo: false,
    }));
  },

  undo: async () => {
    const state = get();
    if (state.past.length === 0 || state.isUndoing) return;

    set({ isUndoing: true });

    const action = state.past[0];
    const remaining = state.past.slice(1);

    try {
      await action.undo();
    } catch (error) {
      console.error('[UndoStore] Undo failed:', error);
    } finally {
      set({
        past: remaining,
        future: [action, ...state.future].slice(0, MAX_HISTORY),
        isUndoing: false,
        canUndo: remaining.length > 0,
        canRedo: true,
      });
    }
  },

  redo: async () => {
    const state = get();
    if (state.future.length === 0 || state.isRedoing) return;

    set({ isRedoing: true });

    const action = state.future[0];
    const remaining = state.future.slice(1);

    try {
      if (action.redo) {
        await action.redo();
      }
    } catch (error) {
      console.error('[UndoStore] Redo failed:', error);
    } finally {
      set({
        past: [action, ...state.past].slice(0, MAX_HISTORY),
        future: remaining,
        isRedoing: false,
        canUndo: true,
        canRedo: remaining.length > 0,
      });
    }
  },

  clearHistory: () => {
    set({
      past: [],
      future: [],
      canUndo: false,
      canRedo: false,
    });
  },

  canUndo: false,
  canRedo: false,

  getLastAction: () => {
    const state = get();
    return state.past.length > 0 ? state.past[0] : null;
  },
}));

/* ============================================================
   CONVENIENCE: Generate an undo action ID
   ============================================================ */

export { generateId as generateUndoId };
