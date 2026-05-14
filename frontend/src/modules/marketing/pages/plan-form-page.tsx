// @ts-nocheck
'use client';

import { CalendarDays } from 'lucide-react';
import { MarketingPageShell } from '@/modules/marketing/components/shared/marketing-page-shell';
import { PlanForm } from '@/modules/marketing/components/planner';

export function PlanFormPage() {
  return (
    <MarketingPageShell
      title="New Plan"
      description="Create a new marketing plan"
      icon={<CalendarDays className="h-6 w-6 text-blue-600" />}
      addLabel="Save Plan"
    >
      <PlanForm />
    </MarketingPageShell>
  );
}
