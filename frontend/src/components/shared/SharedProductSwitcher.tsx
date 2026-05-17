'use client';

import { ChevronsUpDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export interface ProductItem {
  key: string;
  label: string;
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
}

export interface SharedProductSwitcherProps<T extends string = string> {
  moduleId: string;
  activeProduct: T;
  setActiveProduct: (product: T) => void;
  products: ProductItem[];
  collapsed?: boolean;
  className?: string;
}

export function SharedProductSwitcher<T extends string = string>({
  moduleId,
  activeProduct,
  setActiveProduct,
  products,
  collapsed = false,
  className,
}: SharedProductSwitcherProps<T>) {
  const currentProduct = products.find((p) => p.key === activeProduct) ?? products[0];
  const CurrentIcon = currentProduct.icon;

  const moduleColorBg = `bg-module-${moduleId}`;
  const moduleColorBg10 = `bg-module-${moduleId}/10`;
  const moduleColorBg15 = `bg-module-${moduleId}/15`;
  const moduleColorText = `text-module-${moduleId}`;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          className={cn(
            'flex items-center w-full rounded-lg transition-all duration-[var(--motion-fast)]',
            'hover:bg-glass-hover focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-interactive-focus',
            'glass-surface',
            collapsed ? 'justify-center px-2 py-2' : 'gap-2 px-3 py-2',
            className
          )}
          aria-label={`Switch product — currently ${currentProduct.label}`}
          suppressHydrationWarning
        >
          <div className={cn('flex items-center justify-center w-6 h-6 rounded-md shrink-0', moduleColorBg15, moduleColorText)}>
            <CurrentIcon className="h-3.5 w-3.5" strokeWidth={1.8} />
          </div>

          {!collapsed && (
            <div
              key={activeProduct}
              className="flex items-center flex-1 min-w-0"
              style={{ transition: 'opacity 100ms cubic-bezier(0.25, 0.46, 0.45, 0.94), transform 100ms cubic-bezier(0.25, 0.46, 0.45, 0.94)' }}
            >
              <span
                className="font-semibold text-foreground truncate"
                style={{ fontSize: 'var(--text-sm)', letterSpacing: 'var(--tracking-tight)' }}
              >
                {currentProduct.label}
              </span>
            </div>
          )}

          {!collapsed && (
            <ChevronsUpDown className="h-3 w-3 text-muted-foreground shrink-0" strokeWidth={1.8} />
          )}
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent side="right" align="start" className="w-52 glass-surface border-glass-border" sideOffset={4}>
        {products.map((product) => {
          const Icon = product.icon;
          const isActive = product.key === activeProduct;

          return (
            <DropdownMenuItem
              key={product.key}
              onClick={() => setActiveProduct(product.key as T)}
              className={cn(
                'flex items-center gap-2 px-3 py-2 cursor-pointer rounded-md transition-colors duration-[var(--motion-fast)]',
                isActive ? cn(moduleColorBg10, moduleColorText) : 'text-muted-foreground hover:text-foreground hover:bg-glass-hover'
              )}
            >
              <div className={cn('flex items-center justify-center w-6 h-6 rounded-md shrink-0', isActive ? cn(moduleColorBg15, moduleColorText) : 'bg-muted text-muted-foreground')}>
                <Icon className="h-3.5 w-3.5" strokeWidth={1.8} />
              </div>
              <span className="truncate" style={{ fontSize: 'var(--text-sm)', letterSpacing: 'var(--tracking-normal)' }}>
                {product.label}
              </span>
              {isActive && (
                <div
                  className={cn('ml-auto w-1.5 h-1.5 rounded-full shrink-0', moduleColorBg)}
                  style={{ animation: 'product-switcher-dot-in 200ms cubic-bezier(0.25, 0.46, 0.45, 0.94)' }}
                />
              )}
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>

      <style>{`
        @keyframes product-switcher-dot-in {
          from { opacity: 0; transform: scale(0); }
          to { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </DropdownMenu>
  );
}
