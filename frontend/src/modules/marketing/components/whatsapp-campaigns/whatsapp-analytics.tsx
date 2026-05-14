// @ts-nocheck
'use client';

import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MetricCard } from '../shared/metric-card';
import {
  Send,
  CheckCheck,
  MessageCircle,
  Phone,
  Users,
  Clock,
} from 'lucide-react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from 'recharts';
import { motion } from 'framer-motion';

interface WhatsappAnalyticsProps {
  className?: string;
}

const DAILY_DATA = Array.from({ length: 14 }, (_, i) => ({
  date: `Mar ${i + 1}`,
  sent: Math.floor(Math.random() * 500) + 200,
  delivered: Math.floor(Math.random() * 450) + 180,
  read: Math.floor(Math.random() * 300) + 100,
  replied: Math.floor(Math.random() * 50) + 10,
}));

const HOUR_DATA = Array.from({ length: 24 }, (_, i) => ({
  hour: `${i}:00`,
  messages: Math.floor(Math.random() * 100) + (i >= 9 && i <= 18 ? 80 : 10),
}));

export function WhatsappAnalytics({ className }: WhatsappAnalyticsProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={cn('space-y-4', className)}
    >
      {/* Summary Stats */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        <MetricCard
          icon={Send}
          title="Sent"
          value="12,847"
          change={8.2}
          accentColor="text-emerald-600"
          accentBg="bg-emerald-50 dark:bg-emerald-950/30"
        />
        <MetricCard
          icon={CheckCheck}
          title="Delivered"
          value="12,410"
          change={7.5}
          accentColor="text-green-600"
          accentBg="bg-green-50 dark:bg-green-950/30"
        />
        <MetricCard
          icon={MessageCircle}
          title="Read"
          value="9,234"
          change={12.1}
          accentColor="text-blue-600"
          accentBg="bg-blue-50 dark:bg-blue-950/30"
        />
        <MetricCard
          icon={Phone}
          title="Replied"
          value="1,847"
          change={-3.2}
          accentColor="text-amber-600"
          accentBg="bg-amber-50 dark:bg-amber-950/30"
        />
        <MetricCard
          icon={Users}
          title="Active Chats"
          value="234"
          accentColor="text-purple-600"
          accentBg="bg-purple-50 dark:bg-purple-950/30"
        />
        <MetricCard
          icon={Clock}
          title="Avg Response"
          value="4.2m"
          change={-15}
          accentColor="text-cyan-600"
          accentBg="bg-cyan-50 dark:bg-cyan-950/30"
        />
      </div>

      {/* Message Volume Chart */}
      <Card className="border-border/50">
        <CardHeader>
          <CardTitle className="text-sm">Message Volume</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={DAILY_DATA} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
                <defs>
                  <linearGradient id="waSentGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#10b981" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="waReadGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#3b82f6" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                <XAxis dataKey="date" tick={{ fontSize: 10 }} />
                <YAxis tick={{ fontSize: 10 }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px',
                    fontSize: '11px',
                  }}
                />
                <Area type="monotone" dataKey="sent" stroke="#10b981" fill="url(#waSentGrad)" strokeWidth={2} name="Sent" />
                <Area type="monotone" dataKey="read" stroke="#3b82f6" fill="url(#waReadGrad)" strokeWidth={2} name="Read" />
                <Area type="monotone" dataKey="replied" stroke="#f59e0b" fill="none" strokeWidth={2} name="Replied" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Best Time to Send */}
      <Card className="border-border/50">
        <CardHeader>
          <CardTitle className="text-sm">Best Time to Send</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={HOUR_DATA} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                <XAxis dataKey="hour" tick={{ fontSize: 9 }} interval={2} />
                <YAxis tick={{ fontSize: 10 }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px',
                    fontSize: '11px',
                  }}
                />
                <Bar dataKey="messages" fill="#10b981" radius={[3, 3, 0, 0]} name="Messages" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
