'use client';

import { Package } from 'lucide-react';
import { FinancePageShell } from '@/modules/finance/components/shared/finance-page-shell';

export default function BillingProductsPage() {
  return (
    <FinancePageShell
      title="Products"
      description="Manage billing products and pricing"
      icon={<Package className="h-6 w-6 text-emerald-600" />}
      addLabel="New Product"
    />
  );
}
