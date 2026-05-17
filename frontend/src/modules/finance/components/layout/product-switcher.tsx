'use client';

import { BookOpen, Receipt, RefreshCw, Banknote, Package, CreditCard, Store, Users } from 'lucide-react';
import { SharedProductSwitcher } from '@/components/shared/SharedProductSwitcher';
import { useFinanceStore } from '../../stores/finance-store';
import type { FinanceProduct } from '../../types';

const FINANCE_PRODUCTS = [
  { key: 'books' as const, label: 'Books', icon: BookOpen },
  { key: 'invoice' as const, label: 'Invoice', icon: Receipt },
  { key: 'billing' as const, label: 'Billing', icon: RefreshCw },
  { key: 'expense' as const, label: 'Expense', icon: Banknote },
  { key: 'inventory' as const, label: 'Inventory', icon: Package },
  { key: 'checkout' as const, label: 'Checkout', icon: CreditCard },
  { key: 'commerce' as const, label: 'Commerce', icon: Store },
  { key: 'payroll' as const, label: 'Payroll', icon: Users },
];

export function ProductSwitcher({ collapsed = false, className }: { collapsed?: boolean; className?: string }) {
  const { activeProduct, setActiveProduct } = useFinanceStore();
  return (
    <SharedProductSwitcher<FinanceProduct>
      moduleId="finance"
      activeProduct={activeProduct}
      setActiveProduct={setActiveProduct}
      products={FINANCE_PRODUCTS}
      collapsed={collapsed}
      className={className}
    />
  );
}
