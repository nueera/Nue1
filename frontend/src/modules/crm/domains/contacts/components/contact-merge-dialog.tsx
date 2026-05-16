'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRightLeft, User } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import type { Contact } from '../types';

interface ContactMergeDialogProps {
  primaryContact: Contact;
  duplicateContacts: Contact[];
  open: boolean;
  onClose: () => void;
  onMerge: (primaryId: string, secondaryIds: string[], fieldResolutions: Record<string, 'primary' | 'secondary'>) => void;
}

export function ContactMergeDialog({ primaryContact, duplicateContacts, open, onClose, onMerge }: ContactMergeDialogProps) {
  const [fieldResolutions, setFieldResolutions] = useState<Record<string, 'primary' | 'secondary'>>({});

  const mergeFields = ['firstName', 'lastName', 'email', 'phone', 'title', 'department', 'accountName'] as const;

  const handleResolutionChange = (field: string, source: 'primary' | 'secondary') => {
    setFieldResolutions(prev => ({ ...prev, [field]: source }));
  };

  const handleMerge = () => {
    onMerge(
      primaryContact.id,
      duplicateContacts.map(c => c.id),
      fieldResolutions,
    );
  };

  const secondaryContact = duplicateContacts[0];

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="bg-crm-dialog border-glass-border max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <ArrowRightLeft className="h-5 w-5 text-status-warning" />
            Merge Contacts
          </DialogTitle>
          <DialogDescription className="text-muted-foreground text-sm">
            Choose which values to keep for each field when merging.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4 max-h-96 overflow-y-auto">
          {mergeFields.map(field => (
            <div key={field} className="glass-surface border border-glass-border rounded-xl p-3">
              <p className="text-xs text-muted-foreground mb-2 capitalize">{field}</p>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleResolutionChange(field, 'primary')}
                  className={`flex-1 px-3 py-2 rounded-lg text-sm text-left transition-colors ${
                    fieldResolutions[field] === 'primary' || !fieldResolutions[field]
                      ? 'bg-status-success/20 border border-status-success/30 text-foreground'
                      : 'bg-glass-bg border border-glass-border text-muted-foreground hover:bg-glass-hover'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <User className="h-3 w-3" />
                    <span>{String(primaryContact[field as keyof Contact] ?? '—')}</span>
                  </div>
                </button>
                <button
                  onClick={() => handleResolutionChange(field, 'secondary')}
                  className={`flex-1 px-3 py-2 rounded-lg text-sm text-left transition-colors ${
                    fieldResolutions[field] === 'secondary'
                      ? 'bg-status-warning/20 border border-status-warning/30 text-foreground'
                      : 'bg-glass-bg border border-glass-border text-muted-foreground hover:bg-glass-hover'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <User className="h-3 w-3" />
                    <span>{secondaryContact ? String(secondaryContact[field as keyof Contact] ?? '—') : '—'}</span>
                  </div>
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-end gap-2 pt-4 border-t border-glass-border">
          <Button variant="ghost" onClick={onClose}>Cancel</Button>
          <Button onClick={handleMerge} className="bg-status-warning hover:bg-status-warning/80">
            Merge {duplicateContacts.length + 1} Contacts
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
