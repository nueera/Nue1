'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Mail, Phone, Building2, Globe, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { Lead } from '../types';
import { LEAD_DETAIL_TABS } from '../constants';

interface LeadDetailProps {
  lead: Lead;
  onBack?: () => void;
}

export function LeadDetail({ lead, onBack }: LeadDetailProps) {
  const [activeTab, setActiveTab] = useState('overview');

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
            {lead.firstName} {lead.lastName}
          </h2>
          <p className="text-sm text-muted-foreground">
            {lead.title} at {lead.company}
          </p>
        </div>
      </div>

      <div className="flex gap-1 border-b border-glass-border">
        {LEAD_DETAIL_TABS.map(tab => (
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
              <div className="flex items-center gap-2 text-muted-foreground"><Mail className="h-4 w-4" />{lead.email}</div>
              <div className="flex items-center gap-2 text-muted-foreground"><Phone className="h-4 w-4" />{lead.phone}</div>
              <div className="flex items-center gap-2 text-muted-foreground"><Building2 className="h-4 w-4" />{lead.company}</div>
              {lead.website && <div className="flex items-center gap-2 text-muted-foreground"><Globe className="h-4 w-4" />{lead.website}</div>}
              <div className="flex items-center gap-2 text-muted-foreground"><MapPin className="h-4 w-4" />{lead.city}, {lead.state}</div>
            </div>
          </div>
          <div className="glass-surface border border-glass-border rounded-2xl p-4 space-y-3">
            <h3 className="text-sm font-semibold text-foreground">Lead Details</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between"><span className="text-muted-foreground">Status</span><span className="text-foreground">{lead.status}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Rating</span><span className="text-foreground">{lead.rating}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Score</span><span className="text-foreground">{lead.leadScore}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Source</span><span className="text-foreground">{lead.leadSource}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Industry</span><span className="text-foreground">{lead.industry}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Revenue</span><span className="text-foreground">${(lead.annualRevenue / 1000000).toFixed(1)}M</span></div>
            </div>
          </div>
        </motion.div>
      )}

      {activeTab === 'activities' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="glass-surface border border-glass-border rounded-2xl p-4">
          <p className="text-sm text-muted-foreground text-center py-8">No activities recorded yet</p>
        </motion.div>
      )}

      {activeTab === 'notes' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="glass-surface border border-glass-border rounded-2xl p-4">
          <p className="text-sm text-muted-foreground text-center py-8">No notes yet</p>
        </motion.div>
      )}

      {activeTab === 'related' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="glass-surface border border-glass-border rounded-2xl p-4">
          <p className="text-sm text-muted-foreground text-center py-8">No related records</p>
        </motion.div>
      )}
    </div>
  );
}
