'use client';

import { ListTree } from 'lucide-react';
import { MarketingPageShell } from '@/modules/marketing/components/shared/marketing-page-shell';
import { JourneyTemplates } from '@/modules/marketing/components/journeys/journey-templates';

export default function JourneyTemplatesPage() {
  return (
    <MarketingPageShell
      title="Journey Templates"
      description="Browse and use pre-built journey templates"
      icon={<ListTree className="h-6 w-6 text-indigo-600" />}
      addLabel="Create Template"
    >
      <JourneyTemplates />
    </MarketingPageShell>
  );
}
