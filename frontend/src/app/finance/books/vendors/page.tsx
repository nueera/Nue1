'use client';

import { Truck } from 'lucide-react';
import { FinancePageShell } from '@/modules/finance/components/shared/finance-page-shell';

export default function BooksVendorsPage() {
  return (
    <FinancePageShell
      title="Vendors"
      description="Manage vendor contacts and purchase orders"
      icon={<Truck className="h-6 w-6 text-amber-600" />}
      addLabel="New Vendor"
    />
  );
}
