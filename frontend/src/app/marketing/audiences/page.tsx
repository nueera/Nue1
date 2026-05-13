'use client';

import { Users } from 'lucide-react';
import { MarketingPageShell } from '@/modules/marketing/components/shared/marketing-page-shell';
import { AudienceList } from '@/modules/marketing/components/audiences/audience-list';

export default function AudiencesPage() {
  return (
    <MarketingPageShell
      title="Audiences"
      description="Manage your audience lists and members"
      icon={<Users className="h-6 w-6 text-blue-600" />}
      addLabel="New Audience"
    >
      <AudienceList />
    </MarketingPageShell>
  );
}
