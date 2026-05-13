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
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useMergeLeads } from '@/modules/marketing/hooks';
import type { Lead } from '@/modules/marketing/types';
import { ArrowRight, Check, ToggleLeft } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

interface LeadMergeDialogProps {
  leads: Lead[];
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onMerged?: (primaryId: string) => void;
}

const COMPARISON_FIELDS: { key: keyof Lead; label: string }[] = [
  { key: 'firstName', label: 'First Name' },
  { key: 'lastName', label: 'Last Name' },
  { key: 'email', label: 'Email' },
  { key: 'phone', label: 'Phone' },
  { key: 'company', label: 'Company' },
  { key: 'source', label: 'Source' },
  { key: 'stage', label: 'Stage' },
];

export function LeadMergeDialog({ leads, open, onOpenChange, onMerged }: LeadMergeDialogProps) {
  const mergeLeads = useMergeLeads();
  const [primaryIndex, setPrimaryIndex] = useState(0);
  const [isMerging, setIsMerging] = useState(false);

  if (leads.length < 2) return null;

  const primary = leads[primaryIndex];
  const secondary = leads.find((_, i) => i !== primaryIndex);

  const handleMerge = async () => {
    if (!primary || !secondary) return;
    setIsMerging(true);
    try {
      await mergeLeads.mutateAsync({
        primaryId: primary.id,
        secondaryIds: [secondary.id],
      });
      onMerged?.(primary.id);
      onOpenChange(false);
    } finally {
      setIsMerging(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>Merge Duplicate Leads</DialogTitle>
          <DialogDescription>
            Select the primary lead. Data from the secondary lead will be merged into it.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* Lead Selection */}
          <div className="flex items-center gap-2">
            {leads.map((lead, index) => (
              <Button
                key={lead.id}
                variant={primaryIndex === index ? 'default' : 'outline'}
                size="sm"
                className={cn(
                  'gap-1.5',
                  primaryIndex === index && 'bg-emerald-600 hover:bg-emerald-700'
                )}
                onClick={() => setPrimaryIndex(index)}
              >
                <Check className="h-3 w-3" />
                {lead.firstName} {lead.lastName}
                <Badge
                  variant="outline"
                  className={cn(
                    'text-[10px] px-1.5 py-0 ml-1',
                    primaryIndex === index
                      ? 'border-emerald-300 text-emerald-100'
                      : ''
                  )}
                >
                  Primary
                </Badge>
              </Button>
            ))}
          </div>

          <Separator />

          {/* Side-by-Side Comparison */}
          <div className="grid grid-cols-[1fr,auto,1fr] gap-2 items-start">
            {/* Column Headers */}
            <div className="p-2 rounded-lg bg-emerald-50 dark:bg-emerald-900/20 text-center">
              <p className="text-xs font-semibold text-emerald-700 dark:text-emerald-300">Primary</p>
              <p className="text-[10px] text-emerald-600 dark:text-emerald-400">
                {primary?.firstName} {primary?.lastName}
              </p>
            </div>
            <div />
            <div className="p-2 rounded-lg bg-muted/30 text-center">
              <p className="text-xs font-semibold text-muted-foreground">Secondary</p>
              <p className="text-[10px] text-muted-foreground">
                {secondary?.firstName} {secondary?.lastName}
              </p>
            </div>

            {/* Field Rows */}
            {COMPARISON_FIELDS.map((field, idx) => {
              const primaryVal = primary ? String(primary[field.key] ?? '—') : '—';
              const secondaryVal = secondary ? String(secondary[field.key] ?? '—') : '—';
              const isSame = primaryVal === secondaryVal;

              return (
                <motion.div key={field.key} className="contents" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: idx * 0.04 }}>
                  <div
                    className={cn(
                      'px-3 py-2 rounded-md text-xs border',
                      isSame
                        ? 'bg-card border-border/50'
                        : 'bg-emerald-50 dark:bg-emerald-900/10 border-emerald-200 dark:border-emerald-800'
                    )}
                  >
                    <span className="font-medium">{primaryVal}</span>
                  </div>
                  <div className="flex items-center justify-center">
                    {!isSame && (
                      <ToggleLeft className="h-3.5 w-3.5 text-muted-foreground" />
                    )}
                  </div>
                  <div
                    className={cn(
                      'px-3 py-2 rounded-md text-xs border',
                      isSame
                        ? 'bg-card border-border/50'
                        : 'bg-muted/30 border-border/50'
                    )}
                  >
                    <span className={isSame ? '' : 'text-muted-foreground'}>{secondaryVal}</span>
                  </div>
                </motion.div>
              );
            })}
          </div>

          <div className="p-3 rounded-lg bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800">
            <p className="text-xs text-amber-700 dark:text-amber-300">
              The secondary lead will be deleted after merging. All associated data will be transferred to the primary lead.
            </p>
          </div>
        </div>

        <DialogFooter>
          <Button variant="ghost" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button
            onClick={handleMerge}
            className="bg-emerald-600 hover:bg-emerald-700"
            disabled={isMerging}
          >
            {isMerging ? 'Merging...' : 'Merge Leads'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
