'use client';

import { Tag } from 'lucide-react';
import { FinancePageShell } from '@/modules/finance/components/shared/finance-page-shell';

export default function BillingCouponsPage() {
  return (
    <FinancePageShell
      title="Coupons"
      description="Create and manage promotional coupons"
      icon={<Tag className="h-6 w-6 text-amber-600" />}
      addLabel="New Coupon"
    />
  );
}
