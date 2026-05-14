// @ts-nocheck
'use client';

import { motion } from 'framer-motion';
import { Mail, Phone, Building2 } from 'lucide-react';
import type { Lead } from '../types';
import { LEAD_STATUSES, LEAD_RATINGS } from '../constants';
import { getLeadScoreColor } from '../utils';

interface LeadCardProps {
  lead: Lead;
  onClick?: (lead: Lead) => void;
}

export function LeadCard({ lead, onClick }: LeadCardProps) {
  const statusInfo = LEAD_STATUSES.find(s => s.value === lead.status);
  const ratingInfo = LEAD_RATINGS.find(r => r.value === lead.rating);

  return (
    <motion.div
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => onClick?.(lead)}
      className="glass-surface border border-glass-border rounded-2xl p-4 cursor-pointer hover:bg-glass-hover transition-colors"
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-module-crm/15 text-module-crm flex items-center justify-center text-sm font-semibold">
            {lead.firstName[0]}{lead.lastName[0]}
          </div>
          <div>
            <p className="font-medium text-foreground text-sm">{lead.firstName} {lead.lastName}</p>
            <p className="text-xs text-muted-foreground">{lead.title}</p>
          </div>
        </div>
        <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${statusInfo?.color}`}>
          {statusInfo?.label}
        </span>
      </div>
      <div className="space-y-1.5 text-xs text-muted-foreground">
        <div className="flex items-center gap-1.5"><Building2 className="h-3 w-3" />{lead.company}</div>
        <div className="flex items-center gap-1.5"><Mail className="h-3 w-3" />{lead.email}</div>
        <div className="flex items-center gap-1.5"><Phone className="h-3 w-3" />{lead.phone}</div>
      </div>
      <div className="flex items-center justify-between mt-3 pt-3 border-t border-glass-border/50">
        <span className={`text-xs font-medium ${ratingInfo?.color}`}>{ratingInfo?.label}</span>
        <span className={`text-sm font-semibold ${getLeadScoreColor(lead.leadScore)}`}>{lead.leadScore}</span>
      </div>
    </motion.div>
  );
}
