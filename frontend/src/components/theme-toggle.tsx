'use client';

import { useTheme } from 'next-themes';
import { Sun, Moon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useMounted } from '@/modules/erp/core/hooks/use-mounted';
import { Button } from '@/components/ui/button';

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const mounted = useMounted();
  const isDark = mounted ? resolvedTheme === 'dark' : true;

  return (
    <Button variant="ghost" size="icon" className="h-8 w-8 press-scale" onClick={() => setTheme(isDark ? 'light' : 'dark')} aria-label="Toggle theme">
      {!mounted ? (
        <div className="h-4 w-4" />
      ) : (
        <AnimatePresence mode="wait" initial={false}>
          {isDark ? (
            <motion.div key="sun" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.19 }}>
              <Sun className="h-4 w-4" strokeWidth={1.8} />
            </motion.div>
          ) : (
            <motion.div key="moon" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.19 }}>
              <Moon className="h-4 w-4" strokeWidth={1.8} />
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </Button>
  );
}
