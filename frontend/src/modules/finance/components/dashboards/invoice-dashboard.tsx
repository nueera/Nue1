// @ts-nocheck
'use client';

import { motion } from 'framer-motion';
import {
  FileText,
  Receipt,
  AlertTriangle,
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
  Users,
  Percent,
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { MoneyDisplay } from '../shared/money-display';
import { useCountUp } from '../../hooks/use-count-up';
import { cn } from '@/lib/utils';

// ---------------------------------------------------------------------------
// Mock Data
// ---------------------------------------------------------------------------

const invoiceTrendData = [
  { month: 'Jan', sent: 24, paid: 18 },
  { month: 'Feb', sent: 28, paid: 22 },
  { month: 'Mar', sent: 31, paid: 26 },
  { month: 'Apr', sent: 22, paid: 19 },
  { month: 'May', sent: 35, paid: 29 },
  { month: 'Jun', sent: 38, paid: 32 },
];

const revenueByCustomerData = [
  { name: 'Summit Dynamics', revenue: 20505 },
  { name: 'Pinnacle Logistics', revenue: 18146 },
  { name: 'Ironside Consulting', revenue: 14800 },
  { name: 'Apex Industries', revenue: 10844 },
  { name: 'GreenLeaf Partners', revenue: 8088 },
  { name: 'Nova Health Corp', revenue: 6000 },
];

const conversionData = [
  { stage: 'Estimates Sent', value: 48, color: '#6366f1' },
  { stage: 'Approved', value: 32, color: '#10b981' },
  { stage: 'Invoiced', value: 28, color: '#f59e0b' },
  { stage: 'Paid', value: 22, color: '#3b82f6' },
];

// ---------------------------------------------------------------------------
// KPI Card Component
// ---------------------------------------------------------------------------

function KPICard({ icon: Icon, label, value, change, prefix = '', accentColor, accentBg }: {
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  label: string;
  value: number;
  change: number;
  prefix?: string;
  accentColor: string;
  accentBg: string;
}) {
  const displayValue = useCountUp({ end: value, duration: 1200, decimals: 0, prefix });

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] as const }}
    >
      <Card className="hover:shadow-md transition-shadow duration-200 border-border/50">
        <CardContent className="p-5">
          <div className="flex items-start justify-between">
            <div className={cn('flex items-center justify-center w-10 h-10 rounded-xl', accentBg)}>
              <Icon className={cn('h-5 w-5', accentColor)} strokeWidth={1.8} />
            </div>
            <Badge
              variant="secondary"
              className={cn(
                'text-xs font-medium gap-0.5',
                change >= 0 ? 'text-emerald-600 bg-emerald-50 dark:bg-emerald-950/30' : 'text-red-600 bg-red-50 dark:bg-red-950/30'
              )}
            >
              {change >= 0 ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
              {Math.abs(change)}%
            </Badge>
          </div>
          <div className="mt-4">
            <p className="text-2xl font-bold text-foreground tracking-tight tabular-nums">{displayValue}</p>
            <p className="text-sm text-muted-foreground mt-1">{label}</p>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

// ---------------------------------------------------------------------------
// Invoice Dashboard
// ---------------------------------------------------------------------------

export function InvoiceDashboard() {
  return (
    <div className="space-y-6 p-4 sm:p-6">
      {/* Page Header */}
      <motion.div
        initial={{ opacity: 0, y: -4 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
      >
        <h1 className="text-2xl font-bold text-foreground tracking-tight">Invoice Dashboard</h1>
        <p className="text-sm text-muted-foreground mt-1">Track invoices, estimates, and payment collection</p>
      </motion.div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard icon={FileText} label="Invoices Sent (Month)" value={38} change={10.1} prefix="" accentColor="text-emerald-600" accentBg="bg-emerald-50 dark:bg-emerald-950/30" />
        <KPICard icon={AlertTriangle} label="Overdue Invoices" value={3} change={-25} prefix="" accentColor="text-red-500" accentBg="bg-red-50 dark:bg-red-950/30" />
        <KPICard icon={Receipt} label="Revenue Collected" value={85783} change={14.2} accentColor="text-sky-600" accentBg="bg-sky-50 dark:bg-sky-950/30" />
        <KPICard icon={Percent} label="Estimate→Invoice Rate" value={58} change={4.3} prefix="" accentColor="text-violet-600" accentBg="bg-violet-50 dark:bg-violet-950/30" />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Invoice Trend Chart */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <Card className="border-border/50">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base font-semibold">Invoices Sent vs Paid</CardTitle>
                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                    Paid
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-sky-500" />
                    Sent
                  </span>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <ResponsiveContainer width="100%" height={280}>
                <BarChart data={invoiceTrendData} margin={{ top: 8, right: 8, left: -8, bottom: 0 }}>
                  <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }} />
                  <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--popover))', border: '1px solid hsl(var(--border))', borderRadius: '8px', fontSize: '12px' }} />
                  <Bar dataKey="paid" fill="#10b981" radius={[4, 4, 0, 0]} animationDuration={800} name="Paid" />
                  <Bar dataKey="sent" fill="#0ea5e9" radius={[4, 4, 0, 0]} animationDuration={800} name="Sent" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>

        {/* Revenue by Customer */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.15 }}
        >
          <Card className="border-border/50">
            <CardHeader className="pb-2">
              <CardTitle className="text-base font-semibold">Revenue by Customer</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <ResponsiveContainer width="100%" height={280}>
                <BarChart data={revenueByCustomerData} layout="vertical" margin={{ top: 8, right: 8, left: 8, bottom: 0 }}>
                  <XAxis type="number" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }} tickFormatter={(v: number) => `$${(v / 1000).toFixed(0)}k`} />
                  <YAxis type="category" dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }} width={110} />
                  <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--popover))', border: '1px solid hsl(var(--border))', borderRadius: '8px', fontSize: '12px' }} formatter={(value: number) => [`$${value.toLocaleString()}`, '']} />
                  <Bar dataKey="revenue" fill="#6366f1" radius={[0, 4, 4, 0]} animationDuration={800} name="Revenue" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Conversion Funnel */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.2 }}
      >
        <Card className="border-border/50">
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-semibold">Estimate to Invoice Conversion</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="space-y-4">
              {conversionData.map((stage, index) => (
                <div key={stage.stage} className="flex items-center gap-4">
                  <span className="text-sm font-medium text-muted-foreground w-32 shrink-0">{stage.stage}</span>
                  <div className="flex-1">
                    <Progress value={(stage.value / conversionData[0].value) * 100} className="h-2.5" />
                  </div>
                  <span className="text-sm font-semibold text-foreground w-12 text-right tabular-nums">{stage.value}</span>
                </div>
              ))}
            </div>
            <div className="mt-4 pt-4 border-t">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Overall Conversion Rate</span>
                <span className="text-lg font-bold text-emerald-600">45.8%</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
