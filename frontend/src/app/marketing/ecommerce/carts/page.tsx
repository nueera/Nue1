'use client';

import { ShoppingCart } from 'lucide-react';
import { MarketingPageShell } from '@/modules/marketing/components/shared/marketing-page-shell';
import { AbandonedCartList } from '@/modules/marketing/components/ecommerce';

export default function AbandonedCartsPage() {
  return (
    <MarketingPageShell
      title="Abandoned Carts"
      description="Track and recover abandoned shopping carts"
      icon={<ShoppingCart className="h-6 w-6 text-red-600" />}
      addLabel="Send Recovery"
    >
      <AbandonedCartList />
    </MarketingPageShell>
  );
}
