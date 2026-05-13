'use client';

import { Contact } from 'lucide-react';
import { MarketingPageShell } from '@/modules/marketing/components/shared/marketing-page-shell';
import { ContactForm } from '@/modules/marketing/components/contacts/contact-form';

export default function ContactFormPage() {
  return (
    <MarketingPageShell
      title="New Contact"
      description="Create a new marketing contact"
      icon={<Contact className="h-6 w-6 text-blue-600" />}
      addLabel="Save Contact"
    >
      <ContactForm />
    </MarketingPageShell>
  );
}
