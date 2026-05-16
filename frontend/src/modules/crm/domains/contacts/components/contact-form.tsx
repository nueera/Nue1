'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { Contact } from '../types';
import { createContactSchema, type CreateContactInput } from '../schema';

interface ContactFormProps {
  contact?: Contact;
  onSubmit: (data: CreateContactInput) => void;
  onCancel: () => void;
}

export function ContactForm({ contact, onSubmit, onCancel }: ContactFormProps) {
  const { register, handleSubmit, formState: { errors } } = useForm<CreateContactInput>({
    resolver: zodResolver(createContactSchema) as any,
    defaultValues: contact
      ? {
          firstName: contact.firstName,
          lastName: contact.lastName,
          email: contact.email,
          phone: contact.phone,
          title: contact.title,
          department: contact.department,
          accountId: contact.accountId,
        }
      : undefined,
  });

  return (
    <div className="glass-surface border border-glass-border rounded-2xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-foreground">{contact ? 'Edit Contact' : 'New Contact'}</h2>
        <button onClick={onCancel} className="text-muted-foreground hover:text-foreground">
          <X className="h-5 w-5" />
        </button>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-xs text-muted-foreground mb-1 block">First Name *</label>
            <input
              {...register('firstName')}
              className="w-full px-3 py-2 rounded-lg border border-glass-border bg-glass-bg text-foreground text-sm outline-none focus:border-module-crm/50"
            />
            {errors.firstName && <p className="text-xs text-destructive mt-1">{errors.firstName.message}</p>}
          </div>
          <div>
            <label className="text-xs text-muted-foreground mb-1 block">Last Name *</label>
            <input
              {...register('lastName')}
              className="w-full px-3 py-2 rounded-lg border border-glass-border bg-glass-bg text-foreground text-sm outline-none focus:border-module-crm/50"
            />
            {errors.lastName && <p className="text-xs text-destructive mt-1">{errors.lastName.message}</p>}
          </div>
          <div>
            <label className="text-xs text-muted-foreground mb-1 block">Email *</label>
            <input
              {...register('email')}
              type="email"
              className="w-full px-3 py-2 rounded-lg border border-glass-border bg-glass-bg text-foreground text-sm outline-none focus:border-module-crm/50"
            />
            {errors.email && <p className="text-xs text-destructive mt-1">{errors.email.message}</p>}
          </div>
          <div>
            <label className="text-xs text-muted-foreground mb-1 block">Phone *</label>
            <input
              {...register('phone')}
              className="w-full px-3 py-2 rounded-lg border border-glass-border bg-glass-bg text-foreground text-sm outline-none focus:border-module-crm/50"
            />
            {errors.phone && <p className="text-xs text-destructive mt-1">{errors.phone.message}</p>}
          </div>
          <div>
            <label className="text-xs text-muted-foreground mb-1 block">Title</label>
            <input
              {...register('title')}
              className="w-full px-3 py-2 rounded-lg border border-glass-border bg-glass-bg text-foreground text-sm outline-none focus:border-module-crm/50"
            />
          </div>
          <div>
            <label className="text-xs text-muted-foreground mb-1 block">Department</label>
            <input
              {...register('department')}
              className="w-full px-3 py-2 rounded-lg border border-glass-border bg-glass-bg text-foreground text-sm outline-none focus:border-module-crm/50"
            />
          </div>
          <div>
            <label className="text-xs text-muted-foreground mb-1 block">Account ID</label>
            <input
              {...register('accountId')}
              className="w-full px-3 py-2 rounded-lg border border-glass-border bg-glass-bg text-foreground text-sm outline-none focus:border-module-crm/50"
            />
          </div>
          <div>
            <label className="text-xs text-muted-foreground mb-1 block">Lead Source</label>
            <input
              {...register('leadSource')}
              className="w-full px-3 py-2 rounded-lg border border-glass-border bg-glass-bg text-foreground text-sm outline-none focus:border-module-crm/50"
            />
          </div>
        </div>
        <div className="flex justify-end gap-2 pt-4">
          <Button type="button" variant="ghost" onClick={onCancel}>Cancel</Button>
          <Button type="submit" className="bg-module-crm hover:bg-module-crm/80">
            {contact ? 'Update' : 'Create'} Contact
          </Button>
        </div>
      </form>
    </div>
  );
}
