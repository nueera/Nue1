'use client';

import dynamic from 'next/dynamic';
import { FileText } from 'lucide-react';
import { MarketingPageShell } from '@/modules/marketing/components/shared/marketing-page-shell';

const FormBuilder = dynamic(
  () => import('@/modules/marketing/components/signup-forms/form-builder').then(m => ({ default: m.FormBuilder })),
  { ssr: false, loading: () => <div className="flex items-center justify-center h-64 text-muted-foreground text-sm">Loading Form Builder...</div> }
);

export default function FormBuilderPage() {
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
