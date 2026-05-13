'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MetricCard } from '@/modules/marketing/components/shared';
import type { LeadStageDefinition } from '@/modules/marketing/types';
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
  Legend,
} from 'recharts';
import { motion } from 'framer-motion';
import { Users, TrendingUp, ArrowRight } from 'lucide-react';

interface StageDistributionProps {
  stages?: LeadStageDefinition[];
  data?: Array<{ stage: string; count: number }>;
}

const defaultDistribution = [
  { stage: 'New', count: 245, color: '#6b7280' },
  { stage: 'Contacted', count: 180, color: '#3b82f6' },
  { stage: 'Qualified', count: 312, color: '#8b5cf6' },
  { stage: 'Proposal', count: 145, color: '#f59e0b' },
  { stage: 'Negotiation', count: 87, color: '#ef4444' },
  { stage: 'Closed Won', count: 198, color: '#10b981' },
  { stage: 'Closed Lost', count: 65, color: '#9ca3af' },
];

export function StageDistribution({ stages, data: externalData }: StageDistributionProps) {
  const data = externalData
    ? externalData.map((d, i) => ({
        ...d,
        color: stages?.[i]?.color ?? defaultDistribution[i]?.color ?? '#6b7280',
      }))
    : defaultDistribution;

  const totalLeads = data.reduce((sum, d) => sum + d.count, 0);
  const wonCount = data.find((d) => d.stage === 'Closed Won')?.count ?? 0;
  const wonRate = totalLeads > 0 ? Math.round((wonCount / totalLeads) * 100) : 0;

  return (
    <div className="space-y-4">
      {/* Overview */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        <MetricCard icon={Users} title="Total Leads" value={totalLeads.toLocaleString()} accentColor="text-violet-600" accentBg="bg-violet-50 dark:bg-violet-950/30" />
        <MetricCard icon={TrendingUp} title="Win Rate" value={`${wonRate}%`} accentColor="text-emerald-600" accentBg="bg-emerald-50 dark:bg-emerald-950/30" />
        <MetricCard icon={ArrowRight} title="Active Pipeline" value={(totalLeads - wonCount - (data.find((d) => d.stage === 'Closed Lost')?.count ?? 0)).toLocaleString()} accentColor="text-amber-600" accentBg="bg-amber-50 dark:bg-amber-950/30" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Bar Chart */}
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.2, delay: 0.1 }}>
          <Card className="border-border/50">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm">Leads by Stage</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={data} margin={{ top: 5, right: 10, left: -10, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
                    <XAxis dataKey="stage" tick={{ fontSize: 10 }} stroke="hsl(var(--muted-foreground))" angle={-30} textAnchor="end" height={50} />
                    <YAxis tick={{ fontSize: 11 }} stroke="hsl(var(--muted-foreground))" />
                    <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: '8px', fontSize: '12px' }} />
                    <Bar dataKey="count" radius={[4, 4, 0, 0]}>
                      {data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Pie Chart */}
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.2, delay: 0.15 }}>
          <Card className="border-border/50">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm">Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={data}
                      cx="50%"
                      cy="50%"
                      innerRadius={50}
                      outerRadius={80}
                      dataKey="count"
                      paddingAngle={2}
                    >
                      {data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: '8px', fontSize: '12px' }} />
                    <Legend wrapperStyle={{ fontSize: '10px' }} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
