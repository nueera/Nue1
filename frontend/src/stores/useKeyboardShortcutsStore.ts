import { create } from 'zustand';
import { persist } from 'zustand/middleware';

/**
 * Action IDs that can be bound to keyboard shortcuts.
 * These are the canonical identifiers used across the app.
 */
export type ShortcutActionId =
  | 'command-palette'
  | 'global-search'
  | 'toggle-sidebar'
  | 'toggle-split-panel'
  | 'minimize-workspace'
  | 'maximize-workspace'
  | 'switch-module-1'
  | 'switch-module-2'
  | 'switch-module-3'
  | 'switch-module-4'
  | 'switch-module-5'
  | 'switch-module-6'
  | 'switch-module-7'
  | 'switch-module-8'
  | 'undo'
  | 'redo';

/**
 * Key combination string format: modifier+key
 * e.g. "cmd+k", "cmd+shift+f", "ctrl+1"
 * Normalized to lowercase with sorted modifiers.
 */
export type KeyCombo = string;

/**
 * Default keyboard shortcut mappings.
 * Uses "cmd" as a cross-platform alias for meta on Mac / ctrl on Windows/Linux.
 */
const DEFAULT_SHORTCUTS: Record<KeyCombo, ShortcutActionId> = {
  'cmd+k': 'command-palette',
  'cmd+m': 'minimize-workspace',
  'cmd+shift+m': 'maximize-workspace',
  'cmd+1': 'switch-module-1',
  'cmd+2': 'switch-module-2',
  'cmd+3': 'switch-module-3',
  'cmd+4': 'switch-module-4',
  'cmd+5': 'switch-module-5',
  'cmd+6': 'switch-module-6',
  'cmd+7': 'switch-module-7',
  'cmd+8': 'switch-module-8',
  'cmd+b': 'toggle-sidebar',
  'cmd+shift+f': 'global-search',
  'cmd+\\': 'toggle-split-panel',
  'cmd+z': 'undo',
  'cmd+shift+z': 'redo',
};

interface KeyboardShortcutsState {
  /** Map of key combination strings to action IDs */
  shortcuts: Record<KeyCombo, ShortcutActionId>;

  /** Whether the shortcut system is enabled globally */
  enabled: boolean;

  /** Update a specific key combo to point to an action */
  setShortcut: (keyCombo: KeyCombo, actionId: ShortcutActionId) => void;

  /** Reset all shortcuts to their defaults */
  resetShortcuts: () => void;

  /** Toggle the entire shortcut system on/off */
  toggleEnabled: () => void;
}

export const useKeyboardShortcutsStore = create<KeyboardShortcutsState>()(
  persist(
    (set) => ({
      shortcuts: { ...DEFAULT_SHORTCUTS },
      enabled: true,

      setShortcut: (keyCombo, actionId) =>
        set((state) => ({
          shortcuts: {
            ...state.shortcuts,
            [keyCombo]: actionId,
          },
        })),

      resetShortcuts: () =>
        set({
          shortcuts: { ...DEFAULT_SHORTCUTS },
        }),

      toggleEnabled: () =>
        set((state) => ({
          enabled: !state.enabled,
        })),
    }),
    {
      name: 'nueone-keyboard-shortcuts',
      partialize: (state) => ({
        shortcuts: state.shortcuts,
        enabled: state.enabled,
      }),
    }
  )
);

/**
 * Get the default shortcuts (useful for comparison / reset logic).
 */
export { DEFAULT_SHORTCUTS };
