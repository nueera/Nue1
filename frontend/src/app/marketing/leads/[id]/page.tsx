'use client';

import { use } from 'react';
import { UserPlus } from 'lucide-react';
import { MarketingPageShell } from '@/modules/marketing/components/shared/marketing-page-shell';
import { LeadDetails } from '@/modules/marketing/components/leads';

export default function LeadDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);

  return (
    <MarketingPageShell
      title="Lead Details"
      description={`Viewing lead ${id}`}
      icon={<UserPlus className="h-6 w-6 text-violet-600" />}
      addLabel="Edit Lead"
    >
      <LeadDetails leadId={id} />
    </MarketingPageShell>
  );
}
