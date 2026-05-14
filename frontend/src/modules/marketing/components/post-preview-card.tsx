// @ts-nocheck
'use client';

import { cn } from '@/lib/utils';
import { Card, CardContent } from '@/components/ui/card';
import { Heart, MessageCircle, Repeat2, Eye, Share, MoreHorizontal } from 'lucide-react';
import { motion } from 'framer-motion';

export interface PostPreviewCardProps {
  platform: 'instagram' | 'twitter' | 'facebook' | 'linkedin';
  author: string;
  handle?: string;
  avatar?: string;
  content: string;
  imageUrl?: string;
  likes?: number;
  comments?: number;
  shares?: number;
  impressions?: number;
  scheduledAt?: string;
  className?: string;
}

const PLATFORM_STYLES: Record<string, { border: string; accent: string; icon: string }> = {
  instagram: {
    border: 'border-pink-200 dark:border-pink-800/40',
    accent: 'text-pink-600 dark:text-pink-400',
    icon: '📸',
  },
  twitter: {
    border: 'border-sky-200 dark:border-sky-800/40',
    accent: 'text-sky-600 dark:text-sky-400',
    icon: '🐦',
  },
  facebook: {
    border: 'border-blue-200 dark:border-blue-800/40',
    accent: 'text-blue-600 dark:text-blue-400',
    icon: '📘',
  },
  linkedin: {
    border: 'border-sky-200 dark:border-sky-800/40',
    accent: 'text-sky-700 dark:text-sky-400',
    icon: '💼',
  },
};

function formatCount(n: number): string {
  if (n >= 1000000) return `${(n / 1000000).toFixed(1)}M`;
  if (n >= 1000) return `${(n / 1000).toFixed(1)}K`;
  return n.toString();
}

export function PostPreviewCard({
  platform,
  author,
  handle,
  content,
  imageUrl,
  likes = 0,
  comments = 0,
  shares = 0,
  impressions,
  scheduledAt,
  className,
}: PostPreviewCardProps) {
  const style = PLATFORM_STYLES[platform];

  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
    >
      <Card className={cn('border-border/50 overflow-hidden', style.border, className)}>
        <CardContent className="p-4">
          {/* Header */}
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-full bg-muted flex items-center justify-center text-sm">
                {style.icon}
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground">{author}</p>
                {handle && (
                  <p className="text-xs text-muted-foreground">{handle}</p>
                )}
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className={cn('text-xs font-medium capitalize', style.accent)}>
                {platform}
              </span>
              <MoreHorizontal className="h-4 w-4 text-muted-foreground" />
            </div>
          </div>

          {/* Content */}
          <p className="text-sm text-foreground whitespace-pre-wrap leading-relaxed">{content}</p>

          {/* Image */}
          {imageUrl && (
            <div className="mt-3 rounded-lg overflow-hidden bg-muted aspect-video">
              <img
                src={imageUrl}
                alt="Post media"
                className="w-full h-full object-cover"
              />
            </div>
          )}

          {/* Engagement */}
          <div className="flex items-center justify-between mt-3 pt-3 border-t border-border/50">
            <div className="flex items-center gap-4">
              <button className="flex items-center gap-1 text-muted-foreground hover:text-red-500 transition-colors">
                <Heart className="h-3.5 w-3.5" />
                <span className="text-xs tabular-nums">{formatCount(likes)}</span>
              </button>
              <button className="flex items-center gap-1 text-muted-foreground hover:text-primary transition-colors">
                <MessageCircle className="h-3.5 w-3.5" />
                <span className="text-xs tabular-nums">{formatCount(comments)}</span>
              </button>
              <button className="flex items-center gap-1 text-muted-foreground hover:text-emerald-500 transition-colors">
                <Repeat2 className="h-3.5 w-3.5" />
                <span className="text-xs tabular-nums">{formatCount(shares)}</span>
              </button>
            </div>
            {impressions !== undefined && (
              <div className="flex items-center gap-1 text-muted-foreground">
                <Eye className="h-3.5 w-3.5" />
                <span className="text-xs tabular-nums">{formatCount(impressions)}</span>
              </div>
            )}
          </div>

          {/* Scheduled indicator */}
          {scheduledAt && (
            <div className="mt-2 pt-2 border-t border-border/50">
              <span className="text-[10px] text-muted-foreground">
                Scheduled: {new Date(scheduledAt).toLocaleString('en-US', { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' })}
              </span>
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}
