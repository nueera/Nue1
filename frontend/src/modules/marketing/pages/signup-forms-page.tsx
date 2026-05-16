'use client';

import { FileText } from 'lucide-react';
import { MarketingPageShell } from '@/modules/marketing/components/shared/marketing-page-shell';
import { FormList } from '@/modules/marketing/components/signup-forms';

export function SignupFormsPage() {
  return (
    <MarketingPageShell
      title="Signup Forms"
      description="Create and manage signup forms for lead capture"
      icon={<FileText className="h-6 w-6 text-blue-600" />}
      addLabel="New Form"
    >
      <FormList />
    </MarketingPageShell>
  );
}
