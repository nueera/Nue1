'use client';

import { Users, FolderKanban, BarChart3 } from 'lucide-react';
import { SharedProductSwitcher } from '@/components/shared/SharedProductSwitcher';
import { useUIStore } from '../../core/store/ui.store';
import type { ErpProduct } from '../../types';

const ERP_PRODUCTS = [
  { key: 'hrm' as const, label: 'HRM', icon: Users },
  { key: 'operations' as const, label: 'Operations', icon: FolderKanban },
  { key: 'analytics' as const, label: 'Analytics', icon: BarChart3 },
];

export function ProductSwitcher({ collapsed = false, className }: { collapsed?: boolean; className?: string }) {
  const { activeProduct, setActiveProduct } = useUIStore();
  return (
    <SharedProductSwitcher<ErpProduct>
      moduleId="erp"
      activeProduct={activeProduct}
      setActiveProduct={setActiveProduct}
      products={ERP_PRODUCTS}
      collapsed={collapsed}
      className={className}
    />
  );
}
