'use client';

import { UserPlus } from 'lucide-react';
import { MarketingPageShell } from '@/modules/marketing/components/shared/marketing-page-shell';
import { LeadList } from '@/modules/marketing/components/leads';

export function LeadsPage() {
  return (
    <MarketingPageShell
      title="Leads"
      description="Manage and track your sales leads"
      icon={<UserPlus className="h-6 w-6 text-violet-600" />}
      addLabel="New Lead"
    >
      <LeadList />
    </MarketingPageShell>
  );
}
