'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { MergeFieldPicker } from '../shared/merge-field-picker';
import { Image, Paperclip, Plus, X } from 'lucide-react';

interface WhatsappComposerProps {
  headerText?: string;
  bodyText?: string;
  footerText?: string;
  mediaUrl?: string;
  onHeaderChange?: (text: string) => void;
  onBodyChange?: (text: string) => void;
  onFooterChange?: (text: string) => void;
  onMediaChange?: (url: string) => void;
  className?: string;
}

export function WhatsappComposer({ headerText = '', bodyText = '', footerText = '', mediaUrl = '', onHeaderChange, onBodyChange, onFooterChange, onMediaChange, className }: WhatsappComposerProps) {
  const [buttons, setButtons] = useState<string[]>([]);
  const [quickReplies, setQuickReplies] = useState<string[]>([]);

  const handleMergeField = (field: { key: string }) => {
    const tag = `{{${field.key}}}`;
    onBodyChange?.(bodyText + tag);
  };

  return (
    <Card className={cn('border-border/50', className)}>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm flex items-center gap-2">
          <Paperclip className="h-4 w-4 text-muted-foreground" />
          WhatsApp Message Builder
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Header */}
        <div className="space-y-1.5">
          <Label className="text-xs text-muted-foreground">Header (optional)</Label>
          <Input value={headerText} onChange={(e) => onHeaderChange?.(e.target.value)} placeholder="Header text..." className="h-9 text-sm" />
        </div>

        {/* Body */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <Label className="text-xs text-muted-foreground">Body Text *</Label>
            <MergeFieldPicker onSelect={handleMergeField} className="h-7 text-xs" />
          </div>
          <Textarea value={bodyText} onChange={(e) => onBodyChange?.(e.target.value)} placeholder="Type your WhatsApp message..." rows={5} className="resize-none text-sm" />
        </div>

        {/* Footer */}
        <div className="space-y-1.5">
          <Label className="text-xs text-muted-foreground">Footer (optional)</Label>
          <Input value={footerText} onChange={(e) => onFooterChange?.(e.target.value)} placeholder="Footer text..." className="h-9 text-sm" />
        </div>

        {/* Media */}
        <div className="space-y-1.5">
          <Label className="text-xs text-muted-foreground flex items-center gap-1">
            <Image className="h-3 w-3" />
            Media URL (optional)
          </Label>
          <Input value={mediaUrl} onChange={(e) => onMediaChange?.(e.target.value)} placeholder="https://example.com/image.jpg" className="h-9 text-sm" />
          <p className="text-[10px] text-muted-foreground">Supports image, video, and document URLs</p>
        </div>

        {/* Action Buttons */}
        <div className="space-y-2 pt-2 border-t">
          <Label className="text-xs text-muted-foreground">Action Buttons (max 3)</Label>
          {buttons.map((btn, i) => (
            <div key={i} className="flex items-center gap-2">
              <Input value={btn} onChange={(e) => { const b = [...buttons]; b[i] = e.target.value; setButtons(b); }} placeholder={`Button ${i + 1}`} className="h-8 text-xs flex-1" />
              <Button variant="ghost" size="icon" className="h-8 w-8 shrink-0" onClick={() => setButtons(buttons.filter((_, idx) => idx !== i))}>
                <X className="h-3 w-3" />
              </Button>
            </div>
          ))}
          {buttons.length < 3 && (
            <Button variant="outline" size="sm" className="text-xs" onClick={() => setButtons([...buttons, ''])}>
              <Plus className="h-3 w-3 mr-1" />Add Button
            </Button>
          )}
        </div>

        {/* Quick Replies */}
        <div className="space-y-2 pt-2 border-t">
          <Label className="text-xs text-muted-foreground">Quick Replies (max 3)</Label>
          {quickReplies.map((qr, i) => (
            <div key={i} className="flex items-center gap-2">
              <Input value={qr} onChange={(e) => { const q = [...quickReplies]; q[i] = e.target.value; setQuickReplies(q); }} placeholder={`Quick reply ${i + 1}`} className="h-8 text-xs flex-1" />
              <Button variant="ghost" size="icon" className="h-8 w-8 shrink-0" onClick={() => setQuickReplies(quickReplies.filter((_, idx) => idx !== i))}>
                <X className="h-3 w-3" />
              </Button>
            </div>
          ))}
          {quickReplies.length < 3 && (
            <Button variant="outline" size="sm" className="text-xs" onClick={() => setQuickReplies([...quickReplies, ''])}>
              <Plus className="h-3 w-3 mr-1" />Add Quick Reply
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
