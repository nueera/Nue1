'use client';

import { FileText } from 'lucide-react';
import { MarketingPageShell } from '@/modules/marketing/components/shared/marketing-page-shell';
import { TemplateEditor } from '@/modules/marketing/components/email-templates';

export function EmailTemplateBuilderPage() {
  return (
    <MarketingPageShell
      title="Template Builder"
      description="Design and edit email templates"
      icon={<FileText className="h-6 w-6 text-blue-600" />}
      addLabel="Save Template"
    >
      <TemplateEditor />
    </MarketingPageShell>
  );
}
