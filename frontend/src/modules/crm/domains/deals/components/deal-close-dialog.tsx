'use client';

import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { CheckCircle, XCircle } from 'lucide-react';
import type { Deal } from '../types';
import { LOSS_REASONS } from '../constants';

interface DealCloseDialogProps {
  deal: Deal;
  open: boolean;
  onClose: () => void;
  onCloseDeal: (dealId: string, data: { isWon: boolean; lossReason?: string; lossDescription?: string; actualAmount?: number }) => void;
}

export function DealCloseDialog({ deal, open, onClose, onCloseDeal }: DealCloseDialogProps) {
  const [isWon, setIsWon] = useState<boolean | null>(null);
  const [lossReason, setLossReason] = useState('');
  const [lossDescription, setLossDescription] = useState('');
  const [actualAmount, setActualAmount] = useState(String(deal.amount));

  const handleSubmit = () => {
    if (isWon === null) return;
    onCloseDeal(deal.id, {
      isWon,
      lossReason: isWon ? undefined : lossReason,
      lossDescription: isWon ? undefined : lossDescription,
      actualAmount: isWon ? parseFloat(actualAmount) || deal.amount : undefined,
    });
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="bg-crm-dialog border-glass-border">
        <DialogHeader>
          <DialogTitle>Close Deal</DialogTitle>
          <DialogDescription className="text-muted-foreground text-sm">
            Mark <span className="text-foreground font-medium">{deal.dealName}</span> as won or lost.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => setIsWon(true)}
              className={`flex items-center justify-center gap-2 p-4 rounded-xl border transition-colors ${
                isWon === true
                  ? 'bg-status-success/20 border-status-success/30 text-status-success'
                  : 'bg-glass-bg border-glass-border text-muted-foreground hover:bg-glass-hover'
              }`}
            >
              <CheckCircle className="h-5 w-5" />
              <span className="text-sm font-medium">Won</span>
            </button>
            <button
              onClick={() => setIsWon(false)}
              className={`flex items-center justify-center gap-2 p-4 rounded-xl border transition-colors ${
                isWon === false
                  ? 'bg-status-danger/20 border-status-danger/30 text-status-danger'
                  : 'bg-glass-bg border-glass-border text-muted-foreground hover:bg-glass-hover'
              }`}
            >
              <XCircle className="h-5 w-5" />
              <span className="text-sm font-medium">Lost</span>
            </button>
          </div>

          {isWon === true && (
            <div>
              <label className="text-xs text-muted-foreground mb-1 block">Actual Amount</label>
              <input
                type="number"
                value={actualAmount}
                onChange={e => setActualAmount(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-glass-border bg-glass-bg text-foreground text-sm outline-none focus:border-module-crm/50"
              />
            </div>
          )}

          {isWon === false && (
            <>
              <div>
                <label className="text-xs text-muted-foreground mb-1 block">Loss Reason</label>
                <select
                  value={lossReason}
                  onChange={e => setLossReason(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-glass-border bg-glass-bg text-foreground text-sm outline-none"
                >
                  <option value="">Select reason...</option>
                  {LOSS_REASONS.map(r => (
                    <option key={r.value} value={r.value}>{r.label}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-xs text-muted-foreground mb-1 block">Loss Description</label>
                <textarea
                  value={lossDescription}
                  onChange={e => setLossDescription(e.target.value)}
                  rows={3}
                  className="w-full px-3 py-2 rounded-lg border border-glass-border bg-glass-bg text-foreground text-sm outline-none focus:border-module-crm/50 resize-none"
                />
              </div>
            </>
          )}

          <div className="flex justify-end gap-2 pt-4">
            <Button variant="ghost" onClick={onClose}>Cancel</Button>
            <Button
              onClick={handleSubmit}
              disabled={isWon === null}
              className={isWon ? 'bg-module-crm hover:bg-module-crm/80' : isWon === false ? 'bg-status-danger hover:bg-status-danger/80' : 'bg-module-crm hover:bg-module-crm/80'}
            >
              Close as {isWon === true ? 'Won' : isWon === false ? 'Lost' : '...'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
