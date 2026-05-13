'use client';

import { use } from 'react';
import { Users } from 'lucide-react';
import { MarketingPageShell } from '@/modules/marketing/components/shared/marketing-page-shell';
import { AudienceDetails } from '@/modules/marketing/components/audiences';

export default function AudienceDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);

  return (
    <MarketingPageShell
      title="Audience Details"
      description={`Viewing audience ${id}`}
      icon={<Users className="h-6 w-6 text-blue-600" />}
      addLabel="Edit Audience"
    >
      <AudienceDetails audienceId={id} />
    </MarketingPageShell>
  );
}
