// @ts-nocheck
'use client';

import { useState, useMemo } from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MergeFieldPicker } from '../shared/merge-field-picker';
import { SMS_LIMITS } from '@/modules/marketing/constants/campaign-constants';
import { Link, Type } from 'lucide-react';

interface SmsComposerProps {
  value?: string;
  onChange?: (message: string) => void;
  optOutMessage?: string;
  onOptOutChange?: (message: string) => void;
  className?: string;
}

export function SmsComposer({ value = '', onChange, optOutMessage = 'Reply STOP to unsubscribe', onOptOutChange, className }: SmsComposerProps) {
  const [shortenedUrl, setShortenedUrl] = useState('');

  const fullMessage = value + (optOutMessage ? `\n${optOutMessage}` : '');
  const charCount = fullMessage.length;
  const maxChars = SMS_LIMITS.maxMessageLength;
  const segments = Math.ceil(charCount / maxChars) || 1;

  const handleMergeField = (field: { key: string }) => {
    const mergeTag = `{{${field.key}}}`;
    const newMessage = value + mergeTag;
    onChange?.(newMessage);
  };

  const handleShortenLink = () => {
    if (shortenedUrl) {
      const shortened = `https://short.url/${Math.random().toString(36).substring(7)}`;
      onChange?.(value + ` ${shortened}`);
      setShortenedUrl('');
    }
  };

  const charCountColor = charCount > maxChars * 5
    ? 'text-destructive'
    : charCount > maxChars * 3
      ? 'text-amber-600'
      : 'text-muted-foreground';

  return (
    <Card className={cn('border-border/50', className)}>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm flex items-center gap-2">
          <Type className="h-4 w-4 text-muted-foreground" />
          SMS Message
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {/* Message Textarea */}
        <div className="space-y-2">
          <Textarea
            value={value}
            onChange={(e) => onChange?.(e.target.value)}
            placeholder="Type your SMS message..."
            rows={4}
            className="resize-none text-sm"
          />
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className={cn('text-xs font-medium', charCountColor)}>
                {charCount} characters
              </span>
              <Badge variant={segments > 3 ? 'destructive' : 'outline'} className="text-[10px] px-1.5 py-0">
                {segments} segment{segments !== 1 ? 's' : ''}
              </Badge>
            </div>
            <MergeFieldPicker onSelect={handleMergeField} className="h-7 text-xs" />
          </div>
        </div>

        {/* Link Shortener */}
        <div className="space-y-2">
          <Label className="text-xs text-muted-foreground flex items-center gap-1">
            <Link className="h-3 w-3" />
            Insert Shortened Link
          </Label>
          <div className="flex items-center gap-2">
            <input
              type="url"
              value={shortenedUrl}
              onChange={(e) => setShortenedUrl(e.target.value)}
              placeholder="https://example.com/long-url"
              className="flex-1 h-8 px-3 rounded-md border border-border bg-card text-sm outline-none focus:border-emerald-500/50"
            />
            <Button variant="outline" size="sm" className="h-8 text-xs" onClick={handleShortenLink} disabled={!shortenedUrl}>
              Shorten & Insert
            </Button>
          </div>
        </div>

        {/* Opt-Out Message */}
        <div className="space-y-2 pt-2 border-t">
          <Label className="text-xs text-muted-foreground">Opt-out Message</Label>
          <input
            type="text"
            value={optOutMessage}
            onChange={(e) => onOptOutChange?.(e.target.value)}
            className="w-full h-8 px-3 rounded-md border border-border bg-card text-sm outline-none focus:border-emerald-500/50"
          />
          <p className="text-[10px] text-muted-foreground">
            Required for compliance. Opt-out keywords: {SMS_LIMITS.optOutKeywords.join(', ')}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
