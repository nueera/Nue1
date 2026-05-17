'use client';

import { Handshake, Activity, Workflow, BarChart3, Puzzle } from 'lucide-react';
import { SharedProductSwitcher } from '@/components/shared/SharedProductSwitcher';
import { useCrmUIStore } from '../../core/store';
import type { CrmProduct } from '../../core/types';

const CRM_PRODUCTS = [
  { key: 'sales' as const, label: 'Sales', icon: Handshake },
  { key: 'engagement' as const, label: 'Engagement', icon: Activity },
  { key: 'automation' as const, label: 'Automation', icon: Workflow },
  { key: 'analytics' as const, label: 'Analytics', icon: BarChart3 },
  { key: 'platform' as const, label: 'Platform', icon: Puzzle },
];

export function ProductSwitcher({ collapsed = false, className }: { collapsed?: boolean; className?: string }) {
  const { activeProduct, setActiveProduct } = useCrmUIStore();
  return (
    <SharedProductSwitcher<CrmProduct>
      moduleId="crm"
      activeProduct={activeProduct}
      setActiveProduct={setActiveProduct}
      products={CRM_PRODUCTS}
      collapsed={collapsed}
      className={className}
    />
  );
}
