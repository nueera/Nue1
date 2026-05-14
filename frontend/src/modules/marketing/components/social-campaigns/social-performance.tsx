// @ts-nocheck
'use client';

import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MetricCard } from '../shared/metric-card';
import type { SocialPost } from '@/modules/marketing/types';
import { Eye, Heart, MessageSquare, Repeat2, TrendingUp } from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';
import { motion } from 'framer-motion';

interface SocialPerformanceProps {
  posts?: SocialPost[];
  className?: string;
}

const MOCK_POSTS: SocialPost[] = [
  { id: '1', accountId: '1', platform: 'instagram', content: 'Product launch announcement 🚀', scheduledAt: '2024-03-01T09:00:00', publishedAt: '2024-03-01T09:00:00', likes: 342, comments: 28, shares: 45, impressions: 12500, status: 'published' },
  { id: '2', accountId: '2', platform: 'twitter', content: 'Quick tip for marketers!', scheduledAt: '2024-03-02T12:00:00', publishedAt: '2024-03-02T12:00:00', likes: 189, comments: 12, shares: 67, impressions: 8900, status: 'published' },
  { id: '3', accountId: '3', platform: 'linkedin', content: 'Industry insights report', scheduledAt: '2024-03-03T15:00:00', publishedAt: '2024-03-03T15:00:00', likes: 234, comments: 42, shares: 89, impressions: 15200, status: 'published' },
];

const PLATFORM_COLORS: Record<string, string> = {
  instagram: '#ec4899',
  twitter: '#06b6d4',
  facebook: '#3b82f6',
  linkedin: '#0284c7',
};

export function SocialPerformance({ posts = MOCK_POSTS, className }: SocialPerformanceProps) {
  const totalLikes = posts.reduce((sum, p) => sum + p.likes, 0);
  const totalComments = posts.reduce((sum, p) => sum + p.comments, 0);
  const totalShares = posts.reduce((sum, p) => sum + p.shares, 0);
  const totalImpressions = posts.reduce((sum, p) => sum + p.impressions, 0);

  const chartData = posts.map((post) => ({
    name: post.content.slice(0, 20) + '...',
    likes: post.likes,
    comments: post.comments,
    shares: post.shares,
    platform: post.platform,
  }));

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className={cn('space-y-4', className)}>
      {/* Summary Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <MetricCard
          icon={Eye}
          title="Impressions"
          value={totalImpressions.toLocaleString()}
          change={12.5}
          accentColor="text-purple-600"
          accentBg="bg-purple-50 dark:bg-purple-950/30"
        />
        <MetricCard
          icon={Heart}
          title="Likes"
          value={totalLikes.toLocaleString()}
          change={8.3}
          accentColor="text-pink-600"
          accentBg="bg-pink-50 dark:bg-pink-950/30"
        />
        <MetricCard
          icon={MessageSquare}
          title="Comments"
          value={totalComments.toLocaleString()}
          change={-2.1}
          accentColor="text-blue-600"
          accentBg="bg-blue-50 dark:bg-blue-950/30"
        />
        <MetricCard
          icon={Repeat2}
          title="Shares"
          value={totalShares.toLocaleString()}
          change={15.7}
          accentColor="text-green-600"
          accentBg="bg-green-50 dark:bg-green-950/30"
        />
      </div>

      {/* Performance Chart */}
      <Card className="border-border/50">
        <CardHeader>
          <CardTitle className="text-sm flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
            Post-Level Performance
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                <XAxis dataKey="name" tick={{ fontSize: 10 }} />
                <YAxis tick={{ fontSize: 10 }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px',
                    fontSize: '11px',
                  }}
                />
                <Legend wrapperStyle={{ fontSize: '11px' }} />
                <Bar dataKey="likes" fill="#ec4899" radius={[4, 4, 0, 0]} />
                <Bar dataKey="comments" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                <Bar dataKey="shares" fill="#10b981" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Post List */}
      <Card className="border-border/50">
        <CardHeader>
          <CardTitle className="text-sm">Individual Post Performance</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {posts.map((post) => (
            <div key={post.id} className="flex items-center justify-between p-3 rounded-lg border border-border/50">
              <div className="flex-1 min-w-0 mr-4">
                <p className="text-sm font-medium truncate">{post.content}</p>
                <p className="text-[10px] text-muted-foreground capitalize">{post.platform} · {new Date(post.publishedAt!).toLocaleDateString()}</p>
              </div>
              <div className="flex items-center gap-4 text-xs shrink-0">
                <span className="flex items-center gap-1"><Eye className="h-3 w-3 text-muted-foreground" />{post.impressions.toLocaleString()}</span>
                <span className="flex items-center gap-1"><Heart className="h-3 w-3 text-pink-400" />{post.likes}</span>
                <span className="flex items-center gap-1"><MessageSquare className="h-3 w-3 text-blue-400" />{post.comments}</span>
                <span className="flex items-center gap-1"><Repeat2 className="h-3 w-3 text-green-400" />{post.shares}</span>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </motion.div>
  );
}
