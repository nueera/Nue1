'use client';

import { Banknote } from 'lucide-react';
import { FinancePageShell } from '@/modules/finance/components/shared/finance-page-shell';

export default function ExpenseExpensesPage() {
  return (
    <FinancePageShell
      title="Expenses"
      description="Record and manage business expenses"
      icon={<Banknote className="h-6 w-6 text-red-500" />}
      addLabel="New Expense"
    />
  );
}
