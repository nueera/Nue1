// ============================================================================
// Global Stores Index
// Re-exports all global Zustand stores with consistent naming.
//
// Naming convention:
//   - File names: kebab-case.store.ts (e.g. auth.store.ts, erp.store.ts)
//   - Hook names: useCamelCaseStore (e.g. useAuthStore, useErpStore)
// ============================================================================

export { useAuthStore } from './auth.store';
export { useAppStore, ACCENT_COLORS, DEFAULT_ACCENT } from './useAppStore';
export { useErpStore } from './erp.store';
export { useGlobalSearchStore } from './useGlobalSearchStore';
export { useKeyboardShortcutsStore } from './useKeyboardShortcutsStore';
export { useNotificationStore } from './useNotificationStore';
export { useUndoStore } from './useUndoStore';
export { useWorkspaceStore } from './useWorkspaceStore';
