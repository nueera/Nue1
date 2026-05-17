'use client';

import { Megaphone, UserPlus, Users, GitBranch, BarChart3, ShoppingCart, Zap } from 'lucide-react';
import { SharedProductSwitcher } from '@/components/shared/SharedProductSwitcher';
import { useMarketingStore } from '../../stores/marketing-store';
import type { MarketingProduct } from '../../types';

const MARKETING_PRODUCTS = [
  { key: 'campaigns' as const, label: 'Campaigns', icon: Megaphone },
  { key: 'leads' as const, label: 'Leads', icon: UserPlus },
  { key: 'audiences' as const, label: 'Audiences', icon: Users },
  { key: 'journeys' as const, label: 'Journeys', icon: GitBranch },
  { key: 'analytics' as const, label: 'Analytics', icon: BarChart3 },
  { key: 'ecommerce' as const, label: 'E-Commerce', icon: ShoppingCart },
  { key: 'automation' as const, label: 'Automation', icon: Zap },
];

export function ProductSwitcher({ collapsed = false, className }: { collapsed?: boolean; className?: string }) {
  const activeProduct = useMarketingStore((s) => s.activeProduct);
  const setActiveProduct = useMarketingStore((s) => s.setActiveProduct);
  return (
    <SharedProductSwitcher<MarketingProduct>
      moduleId="marketing"
      activeProduct={activeProduct}
      setActiveProduct={setActiveProduct}
      products={MARKETING_PRODUCTS}
      collapsed={collapsed}
      className={className}
    />
  );
}
