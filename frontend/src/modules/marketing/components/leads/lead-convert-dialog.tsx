'use client';

import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useConvertLead } from '@/modules/marketing/hooks/use-leads';
import type { Lead } from '@/modules/marketing/types';
import { ArrowRight, User, Building2, Mail, Phone } from 'lucide-react';
import { motion } from 'framer-motion';

interface LeadConvertDialogProps {
  lead: Lead | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConverted?: (contactId: string) => void;
}

const FIELD_MAPPINGS = [
  { leadField: 'firstName', contactField: 'firstName', label: 'First Name' },
  { leadField: 'lastName', contactField: 'lastName', label: 'Last Name' },
  { leadField: 'email', contactField: 'email', label: 'Email' },
  { leadField: 'phone', contactField: 'phone', label: 'Phone' },
  { leadField: 'company', contactField: 'company', label: 'Company' },
  { leadField: 'jobTitle', contactField: 'title', label: 'Job Title' },
];

export function LeadConvertDialog({ lead, open, onOpenChange, onConverted }: LeadConvertDialogProps) {
  const convertLead = useConvertLead();
  const [isConverting, setIsConverting] = useState(false);

  if (!lead) return null;

  const handleConvert = async () => {
    setIsConverting(true);
    try {
      await convertLead.mutateAsync(lead.id);
      onConverted?.(lead.id);
      onOpenChange(false);
    } finally {
      setIsConverting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <ArrowRight className="h-5 w-5 text-emerald-600" />
            Convert Lead to Contact
          </DialogTitle>
          <DialogDescription>
            This will create a new contact from this lead. The lead status will be updated to &quot;Converted&quot;.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* Lead Summary */}
          <div className="p-3 rounded-lg bg-muted/30 border">
            <p className="text-sm font-medium text-foreground">
              {lead.firstName} {lead.lastName}
            </p>
            <p className="text-xs text-muted-foreground">{lead.email}</p>
            {lead.company && (
              <p className="text-xs text-muted-foreground">{lead.company}</p>
            )}
          </div>

          {/* Field Mapping */}
          <div className="space-y-2">
            <Label className="text-xs font-medium text-muted-foreground">Field Mapping</Label>
            <div className="space-y-1.5">
              {FIELD_MAPPINGS.map((mapping) => {
                // @ts-expect-error — Conversion of type 'Lead' to type 'Record<string, unknown>' ...
                const leadValue = (lead as Record<string, unknown>)[mapping.leadField];
                return (
                  <div
                    key={mapping.leadField}
                    className="flex items-center gap-2 px-3 py-2 rounded-md bg-card border border-border/50"
                  >
                    <div className="flex items-center gap-1.5 flex-1 min-w-0">
                      <Badge variant="outline" className="text-[10px] px-1.5 py-0 shrink-0">
                        Lead
                      </Badge>
                      <span className="text-xs text-muted-foreground truncate">
                        {mapping.label}:
                      </span>
                      <span className="text-xs font-medium text-foreground truncate">
                        {(leadValue as string) || '—'}
                      </span>
                    </div>
                    <ArrowRight className="h-3 w-3 text-muted-foreground shrink-0" />
                    <div className="flex items-center gap-1.5 flex-1 min-w-0">
                      <Badge className="text-[10px] px-1.5 py-0 bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300 shrink-0">
                        Contact
                      </Badge>
                      <span className="text-xs text-muted-foreground truncate">
                        {mapping.label}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <Separator />

          <div className="p-3 rounded-lg bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800">
            <p className="text-xs text-amber-700 dark:text-amber-300">
              This action will mark the lead as &quot;Converted&quot; and create a new contact record.
              The original lead data will be preserved.
            </p>
          </div>
        </div>

        <DialogFooter>
          <Button variant="ghost" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button
            onClick={handleConvert}
            className="bg-emerald-600 hover:bg-emerald-700"
            disabled={isConverting}
          >
            {isConverting ? 'Converting...' : 'Convert to Contact'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
