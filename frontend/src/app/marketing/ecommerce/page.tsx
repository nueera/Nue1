'use client';

import { ShoppingCart } from 'lucide-react';
import { MarketingPageShell } from '@/modules/marketing/components/shared/marketing-page-shell';
import { EcommerceDashboard } from '@/modules/marketing/components/ecommerce/ecommerce-dashboard';

export default function EcommerceDashboardPage() {
  return (
    <MarketingPageShell
      title="E-Commerce"
      description="Revenue, cart recovery, and product performance"
      icon={<ShoppingCart className="h-6 w-6 text-emerald-600" />}
      addLabel="Connect Store"
    >
      <EcommerceDashboard />
    </MarketingPageShell>
  );
}
