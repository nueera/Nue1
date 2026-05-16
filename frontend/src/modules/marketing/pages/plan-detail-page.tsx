'use client';

import { CalendarDays } from 'lucide-react';
import { MarketingPageShell } from '@/modules/marketing/components/shared/marketing-page-shell';
import { PlanDetail } from '@/modules/marketing/components/planner';

export function PlanDetailPage() {
  return (
    <MarketingPageShell
      title="Plan Details"
      description="View and manage your marketing plan"
      icon={<CalendarDays className="h-6 w-6 text-blue-600" />}
      addLabel="Edit Plan"
    >
      {((PlanDetail as any)({}))}
    </MarketingPageShell>
  );
}
