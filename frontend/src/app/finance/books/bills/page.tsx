'use client';

import { FileText } from 'lucide-react';
import { FinancePageShell } from '@/modules/finance/components/shared/finance-page-shell';

export default function BooksBillsPage() {
  return (
    <FinancePageShell
      title="Bills"
      description="Track and manage bills from vendors"
      icon={<FileText className="h-6 w-6 text-amber-600" />}
      addLabel="New Bill"
    />
  );
}
