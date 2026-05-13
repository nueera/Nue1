'use client';

import { useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useKeyboardShortcuts } from '@/hooks/useKeyboardShortcuts';
import { useAppStore } from '@/stores/useAppStore';
import { useWorkspaceStore } from '@/stores/useWorkspaceStore';
import type { ShortcutActionId } from '@/stores/useKeyboardShortcutsStore';

/**
 * Mapping from switch-module-N action IDs to their route paths.
 */
const MODULE_ROUTES: Partial<Record<ShortcutActionId, string>> = {
  'switch-module-1': '/erp',
  'switch-module-2': '/crm',
  'switch-module-3': '/finance',
  'switch-module-4': '/marketing',
  'switch-module-5': '/analytics',
  'switch-module-6': '/automation',
  'switch-module-7': '/retention',
  'switch-module-8': '/settings',
};

/**
 * Custom event names dispatched by the keyboard shortcut system.
 * Other components can listen for these events to react to shortcuts.
 */
const CUSTOM_EVENTS = {
  'toggle-sidebar': 'nueone:toggle-sidebar',
  'global-search': 'nueone:global-search',
  'toggle-split-panel': 'nueone:toggle-split-panel',
} as const;

interface KeyboardShortcutProviderProps {
  children: React.ReactNode;
}

/**
 * Provider component that wraps the app and registers default
 * keyboard shortcut actions.
 *
 * Actions registered:
 * - `command-palette`: Toggles the command palette via useAppStore
 * - `toggle-sidebar`: Dispatches `nueone:toggle-sidebar` custom event
 * - `global-search`: Dispatches `nueone:global-search` custom event
 * - `toggle-split-panel`: Dispatches `nueone:toggle-split-panel` custom event
 * - `switch-module-N`: Routes to the corresponding module using Next.js router
 */
export function KeyboardShortcutProvider({ children }: KeyboardShortcutProviderProps) {
  const router = useRouter();
  const toggleCommandPalette = useAppStore((s) => s.toggleCommandPalette);
  const { registerAction, unregisterAction } = useKeyboardShortcuts();

  // Command palette action
  const handleCommandPalette = useCallback(() => {
    toggleCommandPalette();
  }, [toggleCommandPalette]);

  // Sidebar toggle action
  const handleToggleSidebar = useCallback(() => {
    window.dispatchEvent(new CustomEvent(CUSTOM_EVENTS['toggle-sidebar']));
  }, []);

  // Global search action
  const handleGlobalSearch = useCallback(() => {
    window.dispatchEvent(new CustomEvent(CUSTOM_EVENTS['global-search']));
  }, []);

  // Split panel toggle action
  const handleToggleSplitPanel = useCallback(() => {
    window.dispatchEvent(new CustomEvent(CUSTOM_EVENTS['toggle-split-panel']));
  }, []);

  // Undo action
  const handleUndo = useCallback(() => {
    window.dispatchEvent(new CustomEvent('nueone:undo'));
  }, []);

  // Redo action
  const handleRedo = useCallback(() => {
    window.dispatchEvent(new CustomEvent('nueone:redo'));
  }, []);

  // Module switch actions - create a single handler that routes based on action ID
  const handleSwitchModule = useCallback(
    (actionId: string) => {
      const route = MODULE_ROUTES[actionId];
      if (route) {
        router.push(route);
      }
    },
    [router]
  );

  useEffect(() => {
    // Register all default actions
    registerAction('command-palette', handleCommandPalette);
    registerAction('toggle-sidebar', handleToggleSidebar);
    registerAction('global-search', handleGlobalSearch);
    registerAction('toggle-split-panel', handleToggleSplitPanel);
    registerAction('undo', handleUndo);
    registerAction('redo', handleRedo);

    // Register module switch actions
    const moduleActionIds = Object.keys(MODULE_ROUTES) as ShortcutActionId[];
    const moduleHandlers = new Map<string, (event: KeyboardEvent) => void>();

    for (const actionId of moduleActionIds) {
      const handler = () => handleSwitchModule(actionId);
      moduleHandlers.set(actionId, handler);
      registerAction(actionId, handler);
    }

    // Cleanup all registrations on unmount
    return () => {
      unregisterAction('command-palette');
      unregisterAction('toggle-sidebar');
      unregisterAction('global-search');
      unregisterAction('toggle-split-panel');
      unregisterAction('undo');
      unregisterAction('redo');

      for (const actionId of moduleActionIds) {
        unregisterAction(actionId);
      }
    };
  }, [
    registerAction,
    unregisterAction,
    handleCommandPalette,
    handleToggleSidebar,
    handleGlobalSearch,
    handleToggleSplitPanel,
    handleUndo,
    handleRedo,
    handleSwitchModule,
  ]);

  return <>{children}</>;
}
