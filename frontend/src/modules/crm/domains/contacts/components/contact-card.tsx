'use client';

import { motion } from 'framer-motion';
import { Mail, Phone, Building2 } from 'lucide-react';
import type { Contact } from '../types';
import { CONTACT_STATUSES, CONTACT_TYPES } from '../constants';
import { getContactStatusColor, getContactTypeLabel } from '../utils';

interface ContactCardProps {
  contact: Contact;
  onClick?: (contact: Contact) => void;
}

export function ContactCard({ contact, onClick }: ContactCardProps) {
  const statusInfo = CONTACT_STATUSES.find(s => s.value === contact.status);
  const typeLabel = getContactTypeLabel(contact.type);

  return (
    <motion.div
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => onClick?.(contact)}
      className="glass-surface border border-glass-border rounded-2xl p-4 cursor-pointer hover:bg-glass-hover transition-colors"
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-module-crm/15 text-module-crm flex items-center justify-center text-sm font-semibold">
            {contact.firstName[0]}{contact.lastName[0]}
          </div>
          <div>
            <p className="font-medium text-foreground text-sm">{contact.firstName} {contact.lastName}</p>
            <p className="text-xs text-muted-foreground">{contact.title}</p>
          </div>
        </div>
        <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${getContactStatusColor(contact.status)}`}>
          {statusInfo?.label}
        </span>
      </div>
      <div className="space-y-1.5 text-xs text-muted-foreground">
        <div className="flex items-center gap-1.5"><Building2 className="h-3 w-3" />{contact.accountName || 'No Account'}</div>
        <div className="flex items-center gap-1.5"><Mail className="h-3 w-3" />{contact.email}</div>
        <div className="flex items-center gap-1.5"><Phone className="h-3 w-3" />{contact.phone}</div>
      </div>
      <div className="flex items-center justify-between mt-3 pt-3 border-t border-glass-border/50">
        <span className="text-xs font-medium text-muted-foreground">{typeLabel}</span>
        <span className="text-xs text-muted-foreground">{contact.department || '—'}</span>
      </div>
    </motion.div>
  );
}
