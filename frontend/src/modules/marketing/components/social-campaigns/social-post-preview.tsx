'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Heart, MessageSquare, Repeat2, Share, MoreHorizontal, ImageIcon } from 'lucide-react';
import NextImage from 'next/image';

interface SocialPostPreviewProps {
  content?: string;
  platform?: 'instagram' | 'twitter' | 'facebook' | 'linkedin';
  authorName?: string;
  authorHandle?: string;
  mediaUrl?: string;
  className?: string;
}

export function SocialPostPreview({
  content = 'Your post content will appear here...',
  platform = 'instagram',
  authorName = 'Acme Corp',
  authorHandle = '@acmecorp',
  mediaUrl,
  className,
}: SocialPostPreviewProps) {
  const [platformState, setPlatformState] = useState<'instagram' | 'twitter' | 'facebook' | 'linkedin'>(platform);

  const PLATFORM_STYLES: Record<string, { bg: string; accent: string; border: string }> = {
    instagram: { bg: 'bg-white dark:bg-gray-900', accent: 'text-pink-600', border: 'border-pink-200 dark:border-pink-800' },
    twitter: { bg: 'bg-white dark:bg-gray-900', accent: 'text-cyan-600', border: 'border-cyan-200 dark:border-cyan-800' },
    facebook: { bg: 'bg-white dark:bg-gray-900', accent: 'text-blue-600', border: 'border-blue-200 dark:border-blue-800' },
    linkedin: { bg: 'bg-white dark:bg-gray-900', accent: 'text-sky-700', border: 'border-sky-200 dark:border-sky-800' },
  };

  const style = PLATFORM_STYLES[platformState];

  return (
    <Card className={cn('border-border/50', className)}>
      <div className="flex items-center gap-1 p-3 border-b">
        {(['instagram', 'twitter', 'facebook', 'linkedin'] as const).map((p) => (
          <Button
            key={p}
            variant={platformState === p ? 'secondary' : 'ghost'}
            size="sm"
            className="text-xs capitalize"
            onClick={() => setPlatformState(p)}
          >
            {p === 'twitter' ? 'X' : p}
          </Button>
        ))}
      </div>
      <CardContent className="p-4">
        <div className={cn('rounded-lg border p-4 max-w-md mx-auto', style.bg, style.border)}>
          <div className="flex items-center gap-2 mb-3">
            <Avatar className="h-8 w-8">
              <AvatarFallback className="bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 text-xs font-semibold">
                {authorName[0]}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">{authorName}</p>
              <p className="text-[10px] text-gray-500">{authorHandle}</p>
            </div>
            <MoreHorizontal className="h-4 w-4 text-gray-400 ml-auto" />
          </div>

          <p className="text-sm text-gray-900 dark:text-gray-100 whitespace-pre-wrap">{content}</p>

          {mediaUrl ? (
            <div className="mt-3 rounded-lg overflow-hidden relative aspect-video">
              <NextImage src={mediaUrl} alt="Post media" className="w-full object-cover" fill sizes="(max-width: 768px) 100vw, 400px" unoptimized />
            </div>
          ) : (
            <div className="mt-3 rounded-lg border-2 border-dashed border-gray-200 dark:border-gray-700 h-48 flex items-center justify-center">
              <ImageIcon className="h-8 w-8 text-gray-300" />
            </div>
          )}

          <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100 dark:border-gray-800">
            <div className="flex items-center gap-4 text-gray-500 text-xs">
              <span className="flex items-center gap-1"><Heart className="h-3.5 w-3.5" /> 0</span>
              <span className="flex items-center gap-1"><MessageSquare className="h-3.5 w-3.5" /> 0</span>
              {platformState !== 'linkedin' && (
                <span className="flex items-center gap-1"><Repeat2 className="h-3.5 w-3.5" /> 0</span>
              )}
            </div>
            <Share className="h-3.5 w-3.5 text-gray-500" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
