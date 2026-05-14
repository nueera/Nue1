// @ts-nocheck
'use client';

import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import type { Lead } from '../types';

interface LeadConvertDialogProps {
  lead: Lead;
  open: boolean;
  onClose: () => void;
  onConvert: (leadId: string, data: { createContact: boolean; createAccount: boolean; createDeal: boolean }) => void;
}

export function LeadConvertDialog({ lead, open, onClose, onConvert }: LeadConvertDialogProps) {
  const [createContact, setCreateContact] = useState(true);
  const [createAccount, setCreateAccount] = useState(true);
  const [createDeal, setCreateDeal] = useState(false);

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="bg-crm-dialog border-glass-border">
        <DialogHeader>
          <DialogTitle>Convert Lead</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <p className="text-sm text-muted-foreground">
            Convert <span className="text-foreground font-medium">{lead.firstName} {lead.lastName}</span> into:
          </p>
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" checked={createContact} onChange={e => setCreateContact(e.target.checked)} className="rounded" />
            <span className="text-sm text-foreground">Contact</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" checked={createAccount} onChange={e => setCreateAccount(e.target.checked)} className="rounded" />
            <span className="text-sm text-foreground">Account ({lead.company})</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" checked={createDeal} onChange={e => setCreateDeal(e.target.checked)} className="rounded" />
            <span className="text-sm text-foreground">Deal</span>
          </label>
          <div className="flex justify-end gap-2 pt-4">
            <Button variant="ghost" onClick={onClose}>Cancel</Button>
            <Button
              onClick={() => onConvert(lead.id, { createContact, createAccount, createDeal })}
              className="bg-module-crm hover:bg-module-crm/80"
            >
              Convert
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
