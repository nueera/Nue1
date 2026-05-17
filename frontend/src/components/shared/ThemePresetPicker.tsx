'use client';

import { useState } from 'react';
import { Paintbrush } from 'lucide-react';
import { useMounted } from '@/hooks/use-mounted';

type ThemePreset = 'default' | 'warm' | 'cool' | 'high-contrast';

const PRESETS: Array<{
  id: ThemePreset;
  label: string;
  description: string;
  preview: { bg: string; fg: string };
}> = [
  {
    id: 'default',
    label: 'Neutral',
    description: 'Standard balanced theme',
    preview: { bg: 'oklch(0.98 0.002 250)', fg: 'oklch(0.45 0.18 260)' },
  },
  {
    id: 'warm',
    label: 'Warm',
    description: 'Amber-tinted, softer contrast',
    preview: { bg: 'oklch(0.98 0.008 60)', fg: 'oklch(0.55 0.15 40)' },
  },
  {
    id: 'cool',
    label: 'Cool',
    description: 'Blue-tinted, crisp contrast',
    preview: { bg: 'oklch(0.98 0.008 240)', fg: 'oklch(0.45 0.15 240)' },
  },
  {
    id: 'high-contrast',
    label: 'High Contrast',
    description: 'Maximum legibility',
    preview: { bg: 'oklch(1 0 0)', fg: 'oklch(0 0 0)' },
  },
];

export function ThemePresetPicker() {
  const mounted = useMounted();
  const [isOpen, setIsOpen] = useState(false);

  const getCurrentPreset = (): ThemePreset => {
    if (typeof document === 'undefined') return 'default';
    return (document.documentElement.getAttribute('data-theme') as ThemePreset) || 'default';
  };

  const applyPreset = (preset: ThemePreset) => {
    if (preset === 'default') {
      document.documentElement.removeAttribute('data-theme');
    } else {
      document.documentElement.setAttribute('data-theme', preset);
    }
    localStorage.setItem('nueone-theme-preset', preset);
    setIsOpen(false);
  };

  if (!mounted) return null;

  const currentPreset = getCurrentPreset();

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-center w-9 h-9 rounded-lg transition-colors duration-[140ms] hover:bg-glass-hover"
        aria-label="Change theme preset"
        aria-expanded={isOpen}
        suppressHydrationWarning
      >
        <Paintbrush className="h-4 w-4 text-muted-foreground hover:text-foreground transition-colors" strokeWidth={1.8} />
      </button>

      {isOpen && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
          <div className="absolute right-0 top-full mt-2 z-50 glass-surface rounded-xl p-3 min-w-[220px] shadow-lg animate-in fade-in zoom-in-95 slide-in-from-top-1 duration-200">
            <h4 className="text-[10px] font-semibold text-muted-foreground uppercase tracking-widest mb-2.5 px-1" style={{ letterSpacing: 'var(--tracking-wide)' }}>
              Theme Style
            </h4>
            <div className="space-y-1">
              {PRESETS.map((preset) => {
                const isActive = currentPreset === preset.id;
                return (
                  <button
                    key={preset.id}
                    onClick={() => applyPreset(preset.id)}
                    className={`w-full flex items-center gap-3 px-2.5 py-2 rounded-lg text-left transition-all duration-[140ms] ${isActive ? 'bg-glass-hover' : 'hover:bg-glass-hover/50'}`}
                    aria-label={`Set theme to ${preset.label}`}
                    aria-pressed={isActive}
                    suppressHydrationWarning
                  >
                    <div className="w-8 h-8 rounded-lg border shrink-0" style={{ backgroundColor: preset.preview.bg, borderColor: isActive ? preset.preview.fg : 'var(--glass-border)' }}>
                      <div className="w-full h-full rounded-lg flex items-center justify-center">
                        <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: preset.preview.fg }} />
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium text-foreground">{preset.label}</p>
                      <p className="text-[10px] text-muted-foreground truncate">{preset.description}</p>
                    </div>
                    {isActive && <div className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />}
                  </button>
                );
              })}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
