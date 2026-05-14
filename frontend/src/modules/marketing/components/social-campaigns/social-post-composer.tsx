// @ts-nocheck
'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { MergeFieldPicker } from '../shared/merge-field-picker';
import { Image, Hash, AtSign, MapPin, Calendar } from 'lucide-react';

interface PlatformConfig {
  key: string;
  name: string;
  maxChars: number;
  color: string;
  bg: string;
}

const PLATFORMS: PlatformConfig[] = [
  { key: 'instagram', name: 'Instagram', maxChars: 2200, color: 'text-pink-600', bg: 'bg-pink-50 dark:bg-pink-950/30' },
  { key: 'twitter', name: 'Twitter/X', maxChars: 280, color: 'text-cyan-600', bg: 'bg-cyan-50 dark:bg-cyan-950/30' },
  { key: 'facebook', name: 'Facebook', maxChars: 63206, color: 'text-blue-600', bg: 'bg-blue-50 dark:bg-blue-950/30' },
  { key: 'linkedin', name: 'LinkedIn', maxChars: 3000, color: 'text-sky-700', bg: 'bg-sky-50 dark:bg-sky-950/30' },
];

interface SocialPostComposerProps {
  value?: string;
  onChange?: (text: string) => void;
  className?: string;
}

export function SocialPostComposer({ value = '', onChange, className }: SocialPostComposerProps) {
  const [activePlatforms, setActivePlatforms] = useState<string[]>(['instagram', 'twitter']);
  const [mediaUrls, setMediaUrls] = useState<string[]>([]);
  const [hashtag, setHashtag] = useState('');

  const togglePlatform = (key: string) => {
    setActivePlatforms((prev) =>
      prev.includes(key) ? prev.filter((p) => p !== key) : [...prev, key]
    );
  };

  const handleMergeField = (field: { key: string }) => {
    onChange?.(value + `{{${field.key}}}`);
  };

  const addHashtag = () => {
    if (hashtag.trim()) {
      const tag = hashtag.startsWith('#') ? hashtag : `#${hashtag}`;
      onChange?.(value + ` ${tag}`);
      setHashtag('');
    }
  };

  const minMaxChars = Math.min(
    ...PLATFORMS.filter((p) => activePlatforms.includes(p.key)).map((p) => p.maxChars)
  );
  const charCount = value.length;
  const isOverLimit = charCount > minMaxChars;

  return (
    <Card className={cn('border-border/50', className)}>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm">Compose Social Post</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {/* Platform Toggles */}
        <div className="flex flex-wrap gap-2">
          {PLATFORMS.map((platform) => (
            <Button
              key={platform.key}
              variant={activePlatforms.includes(platform.key) ? 'default' : 'outline'}
              size="sm"
              className={cn(
                'text-xs h-8',
                activePlatforms.includes(platform.key) && platform.bg,
                activePlatforms.includes(platform.key) && platform.color,
                activePlatforms.includes(platform.key) && 'border-current'
              )}
              onClick={() => togglePlatform(platform.key)}
            >
              {platform.name}
            </Button>
          ))}
        </div>

        {/* Text Area */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <Label className="text-xs text-muted-foreground">Post Content</Label>
            <div className="flex items-center gap-2">
              <MergeFieldPicker onSelect={handleMergeField} className="h-7 text-xs" />
            </div>
          </div>
          <Textarea
            value={value}
            onChange={(e) => onChange?.(e.target.value)}
            placeholder="What's on your mind?"
            rows={5}
            className="resize-none text-sm"
          />
          <div className="flex items-center gap-2">
            <span className={cn('text-xs font-medium', isOverLimit ? 'text-destructive' : 'text-muted-foreground')}>
              {charCount}/{minMaxChars.toLocaleString()}
            </span>
            {activePlatforms.map((key) => {
              const platform = PLATFORMS.find((p) => p.key === key)!;
              const isOver = charCount > platform.maxChars;
              return (
                <Badge
                  key={key}
                  variant={isOver ? 'destructive' : 'outline'}
                  className={cn('text-[10px] px-1.5 py-0', !isOver && platform.color)}
                >
                  {platform.name}: {charCount}/{platform.maxChars.toLocaleString()}
                </Badge>
              );
            })}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="flex items-center gap-2 flex-wrap">
          <Button variant="outline" size="sm" className="text-xs h-8 gap-1" onClick={() => document.getElementById('media-upload-social')?.click()}>
            <Image className="h-3.5 w-3.5" /> Media
          </Button>
          <input id="media-upload-social" type="file" accept="image/*" className="hidden" />
          <div className="flex items-center gap-1">
            <input
              value={hashtag}
              onChange={(e) => setHashtag(e.target.value)}
              onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); addHashtag(); } }}
              placeholder="#hashtag"
              className="h-8 px-2 rounded-md border border-border bg-card text-xs outline-none focus:border-emerald-500/50 w-24"
            />
            <Button variant="outline" size="sm" className="h-8 text-xs gap-1" onClick={addHashtag}>
              <Hash className="h-3.5 w-3.5" /> Add
            </Button>
          </div>
          <Button variant="outline" size="sm" className="text-xs h-8 gap-1">
            <AtSign className="h-3.5 w-3.5" /> Mention
          </Button>
          <Button variant="outline" size="sm" className="text-xs h-8 gap-1">
            <MapPin className="h-3.5 w-3.5" /> Location
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
