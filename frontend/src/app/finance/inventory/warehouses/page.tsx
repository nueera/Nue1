'use client';

import { Warehouse } from 'lucide-react';
import { FinancePageShell } from '@/modules/finance/components/shared/finance-page-shell';

export default function InventoryWarehousesPage() {
  return (
    <FinancePageShell
      title="Warehouses"
      description="Manage warehouse locations and capacity"
      icon={<Warehouse className="h-6 w-6 text-sky-600" />}
      addLabel="New Warehouse"
    />
  );
}
