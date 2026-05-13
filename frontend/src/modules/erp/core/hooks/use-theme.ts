'use client';

import { useTheme } from 'next-themes';
import { useMounted } from './use-mounted';

export function useThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const mounted = useMounted();
  const isDark = mounted ? resolvedTheme === 'dark' : true;

  const toggleTheme = () => {
    setTheme(resolvedTheme === 'dark' ? 'light' : 'dark');
  };

  return { isDark, toggleTheme, mounted };
}
