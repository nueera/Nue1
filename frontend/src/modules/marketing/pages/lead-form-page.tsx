// @ts-nocheck
'use client';

import { UserPlus } from 'lucide-react';
import { MarketingPageShell } from '@/modules/marketing/components/shared/marketing-page-shell';
import { LeadForm } from '@/modules/marketing/components/leads';

export function LeadFormPage() {
  return (
    <MarketingPageShell
      title="New Lead"
      description="Create a new lead"
      icon={<UserPlus className="h-6 w-6 text-violet-600" />}
      addLabel="Save Lead"
    >
      <LeadForm />
    </MarketingPageShell>
  );
}
