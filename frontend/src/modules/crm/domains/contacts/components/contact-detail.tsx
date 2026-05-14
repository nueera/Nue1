// @ts-nocheck
'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Mail, Phone, Building2, Globe, MapPin, Linkedin, Twitter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { Contact } from '../types';
import { CONTACT_DETAIL_TABS, CONTACT_STATUSES, CONTACT_TYPES } from '../constants';
import { getContactStatusColor, getContactTypeLabel } from '../utils';

interface ContactDetailProps {
  contact: Contact;
  onBack?: () => void;
}

export function ContactDetail({ contact, onBack }: ContactDetailProps) {
  const [activeTab, setActiveTab] = useState('overview');
  const statusInfo = CONTACT_STATUSES.find(s => s.value === contact.status);

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        {onBack && (
          <Button variant="ghost" size="icon" onClick={onBack}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
        )}
        <div className="flex-1">
          <h2 className="text-lg font-semibold text-foreground">
            {contact.firstName} {contact.lastName}
          </h2>
          <p className="text-sm text-muted-foreground">
            {contact.title} at {contact.accountName}
          </p>
        </div>
        <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${getContactStatusColor(contact.status)}`}>
          {statusInfo?.label}
        </span>
      </div>

      <div className="flex gap-1 border-b border-glass-border">
        {CONTACT_DETAIL_TABS.map(tab => (
          <button
            key={tab.value}
            onClick={() => setActiveTab(tab.value)}
            className={`px-4 py-2 text-sm font-medium transition-colors ${
              activeTab === tab.value
                ? 'text-foreground border-b-2 border-module-crm'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === 'overview' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="glass-surface border border-glass-border rounded-2xl p-4 space-y-3">
            <h3 className="text-sm font-semibold text-foreground">Contact Information</h3>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2 text-muted-foreground"><Mail className="h-4 w-4" />{contact.email}</div>
              <div className="flex items-center gap-2 text-muted-foreground"><Phone className="h-4 w-4" />{contact.phone}</div>
              {contact.mobile && <div className="flex items-center gap-2 text-muted-foreground"><Phone className="h-4 w-4" />{contact.mobile} (mobile)</div>}
              <div className="flex items-center gap-2 text-muted-foreground"><Building2 className="h-4 w-4" />{contact.accountName || 'No Account'}</div>
              {contact.mailingCity && (
                <div className="flex items-center gap-2 text-muted-foreground">
                  <MapPin className="h-4 w-4" />{contact.mailingCity}, {contact.mailingState}
                </div>
              )}
              {contact.linkedin && (
                <div className="flex items-center gap-2 text-muted-foreground"><Linkedin className="h-4 w-4" />{contact.linkedin}</div>
              )}
              {contact.twitter && (
                <div className="flex items-center gap-2 text-muted-foreground"><Twitter className="h-4 w-4" />{contact.twitter}</div>
              )}
            </div>
          </div>
          <div className="glass-surface border border-glass-border rounded-2xl p-4 space-y-3">
            <h3 className="text-sm font-semibold text-foreground">Contact Details</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between"><span className="text-muted-foreground">Status</span><span className="text-foreground">{statusInfo?.label ?? contact.status}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Type</span><span className="text-foreground">{getContactTypeLabel(contact.type)}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Lifecycle</span><span className="text-foreground capitalize">{contact.lifecycle}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Department</span><span className="text-foreground">{contact.department || '—'}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Lead Source</span><span className="text-foreground">{contact.leadSource || '—'}</span></div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Email Opt Out</span>
                <span className="text-foreground">{contact.emailOptOut ? 'Yes' : 'No'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Do Not Call</span>
                <span className="text-foreground">{contact.doNotCall ? 'Yes' : 'No'}</span>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {activeTab === 'activities' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="glass-surface border border-glass-border rounded-2xl p-4">
          <p className="text-sm text-muted-foreground text-center py-8">No activities recorded yet</p>
        </motion.div>
      )}

      {activeTab === 'deals' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="glass-surface border border-glass-border rounded-2xl p-4">
          <p className="text-sm text-muted-foreground text-center py-8">No deals associated yet</p>
        </motion.div>
      )}

      {activeTab === 'notes' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="glass-surface border border-glass-border rounded-2xl p-4">
          <p className="text-sm text-muted-foreground text-center py-8">No notes yet</p>
        </motion.div>
      )}
    </div>
  );
}
