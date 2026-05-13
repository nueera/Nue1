'use client';

import { Package } from 'lucide-react';
import { FinancePageShell } from '@/modules/finance/components/shared/finance-page-shell';

export default function InventoryItemsPage() {
  return (
    <FinancePageShell
      title="Items"
      description="Manage inventory items and stock levels"
      icon={<Package className="h-6 w-6 text-emerald-600" />}
      addLabel="New Item"
    />
  );
}
