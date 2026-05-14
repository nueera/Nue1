// @ts-nocheck
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
import { Badge } from '@/components/ui/badge';
import { Send, Check, Loader2, Plus, X } from 'lucide-react';

interface EmailTestSendProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  campaignId?: string;
  onSend?: (emails: string[]) => void;
}

export function EmailTestSend({ open, onOpenChange, campaignId, onSend }: EmailTestSendProps) {
  const [emails, setEmails] = useState<string[]>(['']);
  const [isSending, setIsSending] = useState(false);
  const [sent, setSent] = useState(false);

  const handleAddEmail = () => {
    if (emails.length < 5) {
      setEmails([...emails, '']);
    }
  };

  const handleRemoveEmail = (index: number) => {
    if (emails.length > 1) {
      setEmails(emails.filter((_, i) => i !== index));
    }
  };

  const handleEmailChange = (index: number, value: string) => {
    const newEmails = [...emails];
    newEmails[index] = value;
    setEmails(newEmails);
  };

  const handleSend = async () => {
    const validEmails = emails.filter((e) => e.includes('@'));
    if (validEmails.length === 0) return;

    setIsSending(true);
    try {
      // Simulate send
      await new Promise((resolve) => setTimeout(resolve, 1000));
      onSend?.(validEmails);
      setSent(true);
    } finally {
      setIsSending(false);
    }
  };

  const handleClose = () => {
    setSent(false);
    setEmails(['']);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Send className="h-5 w-5 text-emerald-600" />
            Send Test Email
          </DialogTitle>
          <DialogDescription>
            Send a test email to preview how it looks in different email clients.
          </DialogDescription>
        </DialogHeader>

        {sent ? (
          <div className="flex flex-col items-center gap-3 py-6">
            <Check className="h-10 w-10 text-emerald-600" />
            <p className="text-sm font-medium text-foreground">Test email sent!</p>
            <p className="text-xs text-muted-foreground">
              Check your inbox at {emails.filter((e) => e.includes('@')).join(', ')}
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            <Label className="text-xs text-muted-foreground">Recipients (max 5)</Label>
            {emails.map((email, index) => (
              <div key={index} className="flex items-center gap-2">
                <Input
                  value={email}
                  onChange={(e) => handleEmailChange(index, e.target.value)}
                  placeholder="email@example.com"
                  type="email"
                  className="h-9 text-sm"
                />
                {emails.length > 1 && (
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-9 w-9 shrink-0"
                    onClick={() => handleRemoveEmail(index)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                )}
              </div>
            ))}
            {emails.length < 5 && (
              <Button variant="outline" size="sm" className="text-xs" onClick={handleAddEmail}>
                <Plus className="h-3 w-3 mr-1" />
                Add Recipient
              </Button>
            )}
          </div>
        )}

        <DialogFooter>
          <Button variant="ghost" onClick={handleClose}>
            {sent ? 'Close' : 'Cancel'}
          </Button>
          {!sent && (
            <Button
              className="bg-emerald-600 hover:bg-emerald-700"
              onClick={handleSend}
              disabled={isSending || !emails.some((e) => e.includes('@'))}
            >
              {isSending ? (
                <>
                  <Loader2 className="h-4 w-4 mr-1 animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  <Send className="h-4 w-4 mr-1" />
                  Send Test
                </>
              )}
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
