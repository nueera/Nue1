'use client';

import { useEffect } from 'react';
import { useAppStore, DEFAULT_ACCENT } from '@/stores/useAppStore';
import { useMounted } from '@/hooks/use-mounted';

/**
 * AccentSync — SINGLE SOURCE OF TRUTH for applying global accent CSS variables.
 *
 * AccentPicker only updates the Zustand store.
 * This component reads the store and applies ALL CSS variables.
 * No other component should set accent-related CSS custom properties.
 *
 * Mounted in root layout so accent propagates to ALL modules (ERP, CRM, etc.)
 * Includes dark mode observer for seamless light/dark switching.
 */
export function AccentSync() {
  const mounted = useMounted();
  const { accentColor } = useAppStore();

  useEffect(() => {
    if (!mounted) return;
    const root = document.documentElement;
    const hue = accentColor.oklchHue;
    const isDark = root.classList.contains('dark');

    applyAccentTokens(root, hue, isDark);
  }, [accentColor, mounted]);

  // Re-apply when theme (light/dark) toggles
  useEffect(() => {
    if (!mounted) return;
    const root = document.documentElement;

    const observer = new MutationObserver(() => {
      const isDark = root.classList.contains('dark');
      const hue = accentColor.oklchHue;
      applyAccentTokens(root, hue, isDark);
    });

    observer.observe(root, {
      attributes: true,
      attributeFilter: ['class'],
    });

    return () => observer.disconnect();
  }, [accentColor, mounted]);

  // This component renders nothing — it only syncs CSS variables
  return null;
}

/* ============================================================
   ACCENT TOKEN APPLICATION — Centralized
   ============================================================ */

function applyAccentTokens(root: HTMLElement, hue: number, isDark: boolean) {
  // ── Module Accent Colors ──
  const lightModuleValues: Record<string, string> = {
    '--module-erp': `oklch(0.55 0.2 ${hue})`,
    '--module-crm': `oklch(0.6 0.2 ${hue})`,
    '--module-finance': `oklch(0.58 0.18 ${hue})`,
    '--module-marketing': `oklch(0.55 0.2 ${hue})`,
    '--module-analytics': `oklch(0.58 0.15 ${hue})`,
    '--module-automation': `oklch(0.65 0.18 ${hue})`,
    '--module-retention': `oklch(0.58 0.2 ${hue})`,
    '--module-settings': `oklch(0.55 0.01 ${hue})`,
  };

  const darkModuleValues: Record<string, string> = {
    '--module-erp': `oklch(0.6 0.22 ${hue})`,
    '--module-crm': `oklch(0.65 0.22 ${hue})`,
    '--module-finance': `oklch(0.63 0.2 ${hue})`,
    '--module-marketing': `oklch(0.6 0.22 ${hue})`,
    '--module-analytics': `oklch(0.63 0.17 ${hue})`,
    '--module-automation': `oklch(0.7 0.2 ${hue})`,
    '--module-retention': `oklch(0.63 0.22 ${hue})`,
    '--module-settings': `oklch(0.6 0.01 ${hue})`,
  };

  // ── Core Theme Tokens ──
  const lightCoreValues: Record<string, string> = {
    '--ring': `oklch(0.45 0.18 ${hue})`,
    '--primary': `oklch(0.45 0.18 ${hue})`,
    '--sidebar-primary': `oklch(0.45 0.18 ${hue})`,
    '--sidebar-ring': `oklch(0.45 0.18 ${hue})`,
    '--glow-primary': `oklch(0.55 0.2 ${hue} / 15%)`,
    '--glow-secondary': `oklch(0.6 0.2 ${hue} / 15%)`,
    '--glow-primary-hover': `oklch(0.55 0.2 ${hue} / 18%)`,
    '--glow-secondary-hover': `oklch(0.6 0.2 ${hue} / 18%)`,
  };

  const darkCoreValues: Record<string, string> = {
    '--ring': `oklch(0.65 0.2 ${hue})`,
    '--primary': `oklch(0.65 0.2 ${hue})`,
    '--sidebar-primary': `oklch(0.65 0.2 ${hue})`,
    '--sidebar-ring': `oklch(0.65 0.2 ${hue})`,
    '--glow-primary': `oklch(0.6 0.22 ${hue} / 25%)`,
    '--glow-secondary': `oklch(0.65 0.22 ${hue} / 25%)`,
    '--glow-primary-hover': `oklch(0.6 0.22 ${hue} / 28%)`,
    '--glow-secondary-hover': `oklch(0.65 0.22 ${hue} / 28%)`,
  };

  const moduleValues = isDark ? darkModuleValues : lightModuleValues;
  const coreValues = isDark ? darkCoreValues : lightCoreValues;

  // Apply all module accent colors
  Object.entries(moduleValues).forEach(([prop, value]) => {
    root.style.setProperty(prop, value);
  });

  // Apply core theme tokens (including --sidebar-primary, --sidebar-ring)
  Object.entries(coreValues).forEach(([prop, value]) => {
    root.style.setProperty(prop, value);
  });

  // General custom accent vars for easy use
  const hexColor = isDark
    ? `oklch(0.65 0.2 ${hue})`
    : `oklch(0.55 0.2 ${hue})`;
  root.style.setProperty('--accent-custom', hexColor);
  root.style.setProperty('--accent-custom-hue', String(hue));

  // Store both light/dark variants for the MutationObserver to use
  // This prevents the need for re-computation on theme toggle
  Object.entries(darkModuleValues).forEach(([prop, value]) => {
    root.style.setProperty(`${prop}-dark`, value);
  });
  Object.entries(lightModuleValues).forEach(([prop, value]) => {
    root.style.setProperty(`${prop}-light`, value);
  });
  Object.entries(darkCoreValues).forEach(([prop, value]) => {
    root.style.setProperty(`${prop}-dark`, value);
  });
  Object.entries(lightCoreValues).forEach(([prop, value]) => {
    root.style.setProperty(`${prop}-light`, value);
  });
}
