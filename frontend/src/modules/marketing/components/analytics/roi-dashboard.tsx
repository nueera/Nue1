// @ts-nocheck
'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from '@/components/ui/select';
import { TrendingUp, DollarSign, Percent, ArrowUpRight, ArrowDownRight, BarChart3 } from 'lucide-react';
import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { useState } from 'react';

interface ROIDashboardProps {
  dateRange?: string;
}

export function ROIDashboard({ dateRange }: ROIDashboardProps) {
  const [period, setPeriod] = useState('30d');

  const metrics = [
    { icon: DollarSign, label: 'Total Revenue', value: '$458,200', change: 18.5 },
    { icon: DollarSign, label: 'Total Spend', value: '$142,600', change: 8.2 },
    { icon: Percent, label: 'Overall ROI', value: '221%', change: 12.3 },
    { icon: TrendingUp, label: 'ROAS', value: '3.21x', change: 6.8 },
  ];

  const roiByChannel = [
    { channel: 'Email', spend: 28000, revenue: 112000, roi: 300 },
    { channel: 'Social', spend: 35000, revenue: 98000, roi: 180 },
    { channel: 'Paid Ads', spend: 52000, revenue: 156000, roi: 200 },
    { channel: 'Content', spend: 15000, revenue: 60000, roi: 300 },
    { channel: 'Events', spend: 12600, revenue: 32200, roi: 156 },
  ];

  const trendData = [
    { month: 'Jan', roi: 185 },
    { month: 'Feb', roi: 195 },
    { month: 'Mar', roi: 210 },
    { month: 'Apr', roi: 198 },
    { month: 'May', roi: 230 },
    { month: 'Jun', roi: 221 },
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <BarChart3 className="h-5 w-5 text-emerald-600" />
          <h3 className="text-lg font-semibold">ROI Dashboard</h3>
        </div>
        <Select value={period} onValueChange={setPeriod}>
          <SelectTrigger className="w-[120px] h-9"><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="7d">7 days</SelectItem>
            <SelectItem value="30d">30 days</SelectItem>
            <SelectItem value="90d">90 days</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {metrics.map((m, idx) => (
          <motion.div key={m.label} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.04 }}>
            <Card className="border-border/50">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <m.icon className="h-4 w-4 text-emerald-600" />
                  <div className={`flex items-center gap-0.5 text-xs font-medium ${m.change >= 0 ? 'text-emerald-600' : 'text-red-600'}`}>
                    {m.change >= 0 ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
                    {Math.abs(m.change)}%
                  </div>
                </div>
                <p className="text-lg font-bold tabular-nums">{m.value}</p>
                <p className="text-xs text-muted-foreground">{m.label}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <Card className="border-border/50">
        <CardHeader className="pb-2">
          <CardTitle className="text-base font-semibold">ROI Trend</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={trendData} margin={{ top: 5, right: 20, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
                <XAxis dataKey="month" tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
                <YAxis tick={{ fontSize: 11 }} stroke="hsl(var(--muted-foreground))" />
                <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: '8px', fontSize: '12px' }} />
                <Line type="monotone" dataKey="roi" stroke="#10b981" strokeWidth={2} dot={{ fill: '#10b981', r: 4 }} name="ROI %" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card className="border-border/50">
        <CardHeader className="pb-2">
          <CardTitle className="text-base font-semibold">ROI by Channel</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {roiByChannel.map((ch, idx) => (
              <motion.div key={ch.channel} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: idx * 0.04 }} className="flex items-center gap-3">
                <span className="text-sm font-medium w-24">{ch.channel}</span>
                <div className="flex-1 grid grid-cols-3 gap-2 text-xs">
                  <div><span className="text-muted-foreground">Spend:</span> <span className="font-medium">${ch.spend.toLocaleString()}</span></div>
                  <div><span className="text-muted-foreground">Revenue:</span> <span className="font-medium text-emerald-600">${ch.revenue.toLocaleString()}</span></div>
                  <div><span className="text-muted-foreground">ROI:</span> <span className="font-bold">{ch.roi}%</span></div>
                </div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
