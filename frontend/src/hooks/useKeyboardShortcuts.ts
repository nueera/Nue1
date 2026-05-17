'use client';

import { useEffect, useCallback, useRef } from 'react';
import { useKeyboardShortcutsStore, type ShortcutActionId } from '@/stores/useKeyboardShortcutsStore';

/**
 * Normalizes a KeyboardEvent into a consistent key combination string.
 *
 * Order: [modifier keys sorted alphabetically] + key
 * "cmd" is used as the cross-platform alias for metaKey (Mac) / ctrlKey (Win/Linux).
 *
 * Examples:
 *   Meta+K → "cmd+k"
 *   Ctrl+Shift+F → "cmd+shift+f"
 *   Ctrl+\ → "cmd+\\"
 *   Ctrl+Shift+Z → "cmd+shift+z"
 */
function normalizeKeyCombo(event: KeyboardEvent): string {
  const parts: string[] = [];

  // Treat both Meta (Mac) and Ctrl (Win/Linux) as "cmd" for cross-platform consistency
  if (event.metaKey || event.ctrlKey) {
    parts.push('cmd');
  }

  if (event.shiftKey) {
    parts.push('shift');
  }

  if (event.altKey) {
    parts.push('alt');
  }

  // Get the actual key, normalized to lowercase
  // event.key can be undefined in rare cases (IME composition, dead keys)
  if (!event.key) return '';
  let key = event.key.toLowerCase();

  // Normalize special keys
  if (key === ' ') key = 'space';
  if (key === 'escape') key = 'escape';
  if (key === 'arrowup') key = 'up';
  if (key === 'arrowdown') key = 'down';
  if (key === 'arrowleft') key = 'left';
  if (key === 'arrowright') key = 'right';

  // Only add the key if it's not a modifier key itself
  // (modifier keys: Control, Shift, Alt, Meta)
  const modifierKeys = new Set(['control', 'shift', 'alt', 'meta']);
  if (!modifierKeys.has(key)) {
    parts.push(key);
  }

  return parts.join('+');
}

/**
 * Checks if the keyboard event originated from an input element
 * where keyboard shortcuts should be suppressed.
 */
function isInputElement(event: KeyboardEvent): boolean {
  const target = event.target as HTMLElement | null;
  if (!target) return false;

  const tagName = target.tagName.toLowerCase();

  // Standard input elements
  if (tagName === 'input' || tagName === 'textarea' || tagName === 'select') {
    return true;
  }

  // ContentEditable elements
  if (target.isContentEditable) {
    return true;
  }

  // Radix / cmdk command input
  if (target.getAttribute('role') === 'combobox' || target.getAttribute('role') === 'textbox') {
    return true;
  }

  return false;
}

type ActionCallback = (event: KeyboardEvent) => void;

interface UseKeyboardShortcutsReturn {
  /** Register a callback for a given action ID */
  registerAction: (actionId: ShortcutActionId, callback: ActionCallback) => void;
  /** Unregister a callback for a given action ID */
  unregisterAction: (actionId: ShortcutActionId) => void;
}

/**
 * Hook that listens for keyboard events and dispatches registered action callbacks.
 *
 * - Reads the shortcut map from the Zustand store
 * - Normalizes key combos cross-platform (cmd/ctrl → "cmd")
 * - Skips shortcuts when the user is typing in an input/textarea/contentEditable
 * - Returns registerAction / unregisterAction so components can bind callbacks
 *
 * Only one hook instance should be active at a time (used inside KeyboardShortcutProvider).
 */
export function useKeyboardShortcuts(): UseKeyboardShortcutsReturn {
  const shortcuts = useKeyboardShortcutsStore((s) => s.shortcuts);
  const enabled = useKeyboardShortcutsStore((s) => s.enabled);

  // Use a ref map for action callbacks so we don't need to re-bind
  // the event listener whenever callbacks change
  const actionsRef = useRef<Map<ShortcutActionId, ActionCallback>>(new Map());

  const registerAction = useCallback((actionId: ShortcutActionId, callback: ActionCallback) => {
    actionsRef.current.set(actionId, callback);
  }, []);

  const unregisterAction = useCallback((actionId: ShortcutActionId) => {
    actionsRef.current.delete(actionId);
  }, []);

  useEffect(() => {
    if (!enabled) return;

    function handleKeyDown(event: KeyboardEvent) {
      // Skip when typing in input elements (unless the shortcut is specifically
      // for command-palette or global-search, which should work even in inputs)
      const combo = normalizeKeyCombo(event);
      if (!combo) return; // Ignore events with no identifiable key

      // Always skip input elements except for command-palette and global-search
      if (isInputElement(event)) {
        const actionId = shortcuts[combo];
        if (actionId !== 'command-palette' && actionId !== 'global-search') {
          return;
        }
      }

      const actionId = shortcuts[combo];
      if (!actionId) return;

      const callback = actionsRef.current.get(actionId);
      if (!callback) return;

      event.preventDefault();
      event.stopPropagation();
      callback(event);
    }

    document.addEventListener('keydown', handleKeyDown, true);

    return () => {
      document.removeEventListener('keydown', handleKeyDown, true);
    };
  }, [shortcuts, enabled]);

  return { registerAction, unregisterAction };
}
