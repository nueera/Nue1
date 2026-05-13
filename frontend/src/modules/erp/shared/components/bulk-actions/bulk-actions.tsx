'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface BulkAction {
  label: string;
  icon?: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  onClick: () => void;
  variant?: 'default' | 'destructive';
}

interface BulkActionsProps {
  selectedCount: number;
  actions: BulkAction[];
  onClear: () => void;
}

export function BulkActions({ selectedCount, actions, onClear }: BulkActionsProps) {
  return (
    <AnimatePresence>
      {selectedCount > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 glass-surface-strong rounded-xl px-4 py-3 flex items-center gap-3 shadow-lg border border-module-erp/20"
        >
          <span className="text-sm font-medium text-foreground" style={{ fontSize: 'var(--text-sm)' }}>
            {selectedCount} selected
          </span>
          <div className="flex items-center gap-2">
            {actions.map((action) => {
              const Icon = action.icon;
              return (
                <Button
                  key={action.label}
                  size="sm"
                  variant={action.variant === 'destructive' ? 'destructive' : 'default'}
                  onClick={action.onClick}
                  className={action.variant !== 'destructive' ? 'bg-module-erp hover:bg-module-erp/90 text-white gap-1.5' : 'gap-1.5'}
                  style={{ fontSize: 'var(--text-xs)' }}
                >
                  {Icon && <Icon className="h-3.5 w-3.5" strokeWidth={1.8} />}
                  {action.label}
                </Button>
              );
            })}
          </div>
          <button onClick={onClear} className="ml-2 text-muted-foreground hover:text-foreground transition-colors duration-[var(--motion-fast)]">
            <X className="h-4 w-4" strokeWidth={1.8} />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
