// @ts-nocheck
'use client';

import { motion, AnimatePresence } from 'framer-motion';
import {
  Users,
  FolderKanban,
  BarChart3,
  ChevronsUpDown,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useUIStore } from '../../core/store/ui.store';
import { PRODUCT_LABELS } from '../../core/config/sidebar.config';
import type { ErpProduct } from '../../types';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

// ---------------------------------------------------------------------------
// Product metadata (icon + label)
// ---------------------------------------------------------------------------

interface ProductMeta {
  product: ErpProduct;
  label: string;
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
}

const PRODUCT_ITEMS: ProductMeta[] = [
  { product: 'hrm', label: 'HRM', icon: Users },
  { product: 'operations', label: 'Operations', icon: FolderKanban },
  { product: 'analytics', label: 'Analytics', icon: BarChart3 },
];

// ---------------------------------------------------------------------------
// Product Switcher Component
// ---------------------------------------------------------------------------

interface ProductSwitcherProps {
  collapsed?: boolean;
  className?: string;
}

export function ProductSwitcher({ collapsed = false, className }: ProductSwitcherProps) {
  const { activeProduct, setActiveProduct } = useUIStore();
  const currentMeta = PRODUCT_ITEMS.find((p) => p.product === activeProduct) ?? PRODUCT_ITEMS[0];
  const CurrentIcon = currentMeta.icon;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          className={cn(
            'flex items-center w-full rounded-lg transition-all duration-[var(--motion-fast)]',
            'hover:bg-glass-hover focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-interactive-focus',
            'glass-surface',
            collapsed
              ? 'justify-center px-2 py-2'
              : 'gap-2 px-3 py-2',
            className
          )}
          aria-label={`Switch product — currently ${currentMeta.label}`}
          suppressHydrationWarning
        >
          <div className="flex items-center justify-center w-6 h-6 rounded-md bg-module-erp/15 text-module-erp shrink-0">
            <CurrentIcon className="h-3.5 w-3.5" strokeWidth={1.8} />
          </div>

          <AnimatePresence mode="wait">
            {!collapsed && (
              <motion.div
                key={activeProduct}
                initial={{ opacity: 0, x: -4 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 4 }}
                transition={{ duration: 0.1, ease: [0.25, 0.46, 0.45, 0.94] as const }}
                className="flex items-center flex-1 min-w-0"
              >
                <span
                  className="font-semibold text-foreground truncate"
                  style={{
                    fontSize: 'var(--text-sm)',
                    letterSpacing: 'var(--tracking-tight)',
                  }}
                >
                  {currentMeta.label}
                </span>
              </motion.div>
            )}
          </AnimatePresence>

          {!collapsed && (
            <ChevronsUpDown className="h-3 w-3 text-muted-foreground shrink-0" strokeWidth={1.8} />
          )}
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        side="right"
        align="start"
        className="w-52 glass-surface border-glass-border"
        sideOffset={4}
      >
        {PRODUCT_ITEMS.map((meta) => {
          const Icon = meta.icon;
          const isActive = meta.product === activeProduct;

          return (
            <DropdownMenuItem
              key={meta.product}
              onClick={() => setActiveProduct(meta.product)}
              className={cn(
                'flex items-center gap-2 px-3 py-2 cursor-pointer rounded-md',
                'transition-colors duration-[var(--motion-fast)]',
                isActive
                  ? 'bg-module-erp/10 text-module-erp'
                  : 'text-muted-foreground hover:text-foreground hover:bg-glass-hover'
              )}
            >
              <div
                className={cn(
                  'flex items-center justify-center w-6 h-6 rounded-md shrink-0',
                  isActive
                    ? 'bg-module-erp/15 text-module-erp'
                    : 'bg-muted text-muted-foreground'
                )}
              >
                <Icon className="h-3.5 w-3.5" strokeWidth={1.8} />
              </div>
              <span
                className="truncate"
                style={{
                  fontSize: 'var(--text-sm)',
                  letterSpacing: 'var(--tracking-normal)',
                }}
              >
                {meta.label}
              </span>
              {isActive && (
                <motion.div
                  layoutId="product-switcher-active-erp"
                  className="ml-auto w-1.5 h-1.5 rounded-full bg-module-erp"
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                />
              )}
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
