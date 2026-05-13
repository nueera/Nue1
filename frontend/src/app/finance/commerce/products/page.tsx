'use client';

import { ShoppingBag } from 'lucide-react';
import { FinancePageShell } from '@/modules/finance/components/shared/finance-page-shell';

export default function CommerceProductsPage() {
  return (
    <FinancePageShell
      title="Products"
      description="Manage your online store products"
      icon={<ShoppingBag className="h-6 w-6 text-emerald-600" />}
      addLabel="New Product"
    />
  );
}
