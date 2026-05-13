'use client';

import { Package } from 'lucide-react';
import { FinancePageShell } from '@/modules/finance/components/shared/finance-page-shell';

export default function BooksItemsPage() {
  return (
    <FinancePageShell
      title="Items"
      description="Manage products and services you sell"
      icon={<Package className="h-6 w-6 text-sky-600" />}
      addLabel="New Item"
    />
  );
}
