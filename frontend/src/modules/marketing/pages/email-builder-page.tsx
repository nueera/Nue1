// @ts-nocheck
'use client';

import { Mail } from 'lucide-react';
import { MarketingPageShell } from '@/modules/marketing/components/shared/marketing-page-shell';
import { EmailComposer } from '@/modules/marketing/components/email-campaigns';

export function EmailBuilderPage() {
  return (
    <MarketingPageShell
      title="Email Builder"
      description="Design and compose your email campaign"
      icon={<Mail className="h-6 w-6 text-blue-600" />}
      addLabel="Save Email"
    >
      <EmailComposer />
    </MarketingPageShell>
  );
}
