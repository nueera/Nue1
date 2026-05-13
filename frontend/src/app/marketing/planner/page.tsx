'use client';

import { CalendarDays } from 'lucide-react';
import { MarketingPageShell } from '@/modules/marketing/components/shared/marketing-page-shell';
import { PlanList } from '@/modules/marketing/components/planner/plan-list';

export default function PlannerPage() {
  return (
    <MarketingPageShell
      title="Planner"
      description="Plan and schedule your marketing activities"
      icon={<CalendarDays className="h-6 w-6 text-blue-600" />}
      addLabel="New Plan"
    >
      <PlanList />
    </MarketingPageShell>
  );
}
