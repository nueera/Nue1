// @ts-nocheck
'use client';

import { FileText } from 'lucide-react';
import { MarketingPageShell } from '@/modules/marketing/components/shared/marketing-page-shell';
import { FormBuilder } from '@/modules/marketing/components/signup-forms';

export function SignupFormBuilderPage() {
  return (
    <MarketingPageShell
      title="Form Builder"
      description="Design and configure your signup form"
      icon={<FileText className="h-6 w-6 text-blue-600" />}
      addLabel="Save Form"
    >
      <FormBuilder />
    </MarketingPageShell>
  );
}
