'use client';

import { useFinanceStore } from '@/modules/finance/stores/finance-store';
import {
  FinanceOverview,
  BooksDashboard,
  InvoiceDashboard,
  BillingDashboard,
  ExpenseDashboard,
  InventoryDashboard,
  CheckoutDashboard,
  CommerceDashboard,
  PayrollDashboard,
} from '@/modules/finance/components/dashboards';
import type { FinanceProduct } from '@/modules/finance/types';

const dashboardMap: Record<FinanceProduct, React.ComponentType> = {
  books: BooksDashboard,
  invoice: InvoiceDashboard,
  billing: BillingDashboard,
  expense: ExpenseDashboard,
  inventory: InventoryDashboard,
  checkout: CheckoutDashboard,
  commerce: CommerceDashboard,
  payroll: PayrollDashboard,
};

export default function FinanceDashboardPage() {
  const { activeProduct, isHydrated } = useFinanceStore();

  // Show loading state while store hydrates
  if (!isHydrated) {
    return (
      <div className="flex items-center justify-center h-full min-h-[400px]">
        <div className="animate-pulse text-muted-foreground text-sm">Loading dashboard...</div>
      </div>
    );
  }

  const DashboardComponent = dashboardMap[activeProduct] || FinanceOverview;

  return <DashboardComponent />;
}
