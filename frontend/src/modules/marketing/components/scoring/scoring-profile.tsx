// @ts-nocheck
'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MetricCard } from '@/modules/marketing/components/shared/metric-card';
import {
  Star,
  Users,
  Target,
  TrendingUp,
} from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import { motion } from 'framer-motion';

interface ScoringProfileProps {
  modelId?: string;
}

const distributionData = [
  { range: '0-20', count: 245 },
  { range: '21-40', count: 412 },
  { range: '41-60', count: 687 },
  { range: '61-80', count: 523 },
  { range: '81-100', count: 198 },
];

const tierData = [
  { name: 'Hot', value: 198, color: '#ef4444' },
  { name: 'Warm', value: 523, color: '#f59e0b' },
  { name: 'Cool', value: 687, color: '#3b82f6' },
  { name: 'Cold', value: 657, color: '#6b7280' },
];

export function ScoringProfile({ modelId }: ScoringProfileProps) {
  return (
    <div className="space-y-4">
      {/* Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <MetricCard icon={Star} title="Max Score" value="100" accentColor="text-amber-600" accentBg="bg-amber-50 dark:bg-amber-950/30" />
        <MetricCard icon={Users} title="Total Leads" value="2,065" accentColor="text-violet-600" accentBg="bg-violet-50 dark:bg-violet-950/30" />
        <MetricCard icon={Target} title="Avg Score" value="47" accentColor="text-emerald-600" accentBg="bg-emerald-50 dark:bg-emerald-950/30" />
        <MetricCard icon={TrendingUp} title="Median Score" value="42" accentColor="text-blue-600" accentBg="bg-blue-50 dark:bg-blue-950/30" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Distribution Chart */}
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.2, delay: 0.1 }}>
          <Card className="border-border/50">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm">Score Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-52">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={distributionData} margin={{ top: 5, right: 10, left: -10, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
                    <XAxis dataKey="range" tick={{ fontSize: 11 }} stroke="hsl(var(--muted-foreground))" />
                    <YAxis tick={{ fontSize: 11 }} stroke="hsl(var(--muted-foreground))" />
                    <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: '8px', fontSize: '12px' }} />
                    <Bar dataKey="count" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Tier Breakdown */}
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.2, delay: 0.15 }}>
          <Card className="border-border/50">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm">Lead Tiers</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-52 flex items-center">
                <ResponsiveContainer width="60%" height="100%">
                  <PieChart>
                    <Pie data={tierData} cx="50%" cy="50%" innerRadius={40} outerRadius={70} dataKey="value" paddingAngle={2}>
                      {tierData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: '8px', fontSize: '12px' }} />
                  </PieChart>
                </ResponsiveContainer>
                <div className="space-y-2">
                  {tierData.map((tier) => (
                    <div key={tier.name} className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: tier.color }} />
                      <span className="text-xs font-medium text-foreground">{tier.name}</span>
                      <span className="text-xs text-muted-foreground">{tier.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
