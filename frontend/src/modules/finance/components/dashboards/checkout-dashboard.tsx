'use client';

import { motion } from 'framer-motion';
import {
  CreditCard,
  CheckCircle2,
  AlertTriangle,
  DollarSign,
  ArrowUpRight,
  ArrowDownRight,
  Receipt,
} from 'lucide-react';
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useCountUp } from '../../hooks/use-count-up';
import { cn } from '@/lib/utils';

// ---------------------------------------------------------------------------
// Mock Data
// ---------------------------------------------------------------------------

const paymentVolumeData = [
  { month: 'Jan', volume: 45000 },
  { month: 'Feb', volume: 52000 },
  { month: 'Mar', volume: 58000 },
  { month: 'Apr', volume: 49000 },
  { month: 'May', volume: 63000 },
  { month: 'Jun', volume: 71000 },
];

const paymentMethodsData = [
  { name: 'Credit Card', value: 45, color: '#6366f1' },
  { name: 'Bank Transfer', value: 25, color: '#10b981' },
  { name: 'PayPal', value: 15, color: '#f59e0b' },
  { name: 'Apple Pay', value: 10, color: '#0ea5e9' },
  { name: 'Other', value: 5, color: '#94a3b8' },
];

const recentTransactionsData = [
  { id: '1', customer: 'Apex Industries', amount: 10844.47, method: 'Bank Transfer', status: 'success' },
  { id: '2', customer: 'Nova Health Corp', amount: 3000.0, method: 'Credit Card', status: 'success' },
  { id: '3', customer: 'Pinnacle Logistics', amount: 9500.0, method: 'Bank Transfer', status: 'success' },
  { id: '4', customer: 'Coastal Ventures', amount: 1794.0, method: 'PayPal', status: 'failed' },
  { id: '5', customer: 'Ironside Consulting', amount: 5600.0, method: 'Credit Card', status: 'success' },
];

// ---------------------------------------------------------------------------
// KPI Card Component
// ---------------------------------------------------------------------------

function KPICard({ icon: Icon, label, value, change, prefix = '$', accentColor, accentBg }: {
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  label: string;
  value: number;
  change: number;
  prefix?: string;
  accentColor: string;
  accentBg: string;
}) {
  const displayValue = useCountUp({ end: value, duration: 1200, decimals: value % 1 !== 0 ? 2 : 0, prefix });

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
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
// Checkout Dashboard
// ---------------------------------------------------------------------------

export function CheckoutDashboard() {
  return (
    <div className="space-y-6 p-4 sm:p-6">
      {/* Page Header */}
      <motion.div
        initial={{ opacity: 0, y: -4 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
      >
        <h1 className="text-2xl font-bold text-foreground tracking-tight">Checkout Dashboard</h1>
        <p className="text-sm text-muted-foreground mt-1">Payment performance and transaction analytics</p>
      </motion.div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard icon={DollarSign} label="Total Payments" value={30738.47} change={12.8} accentColor="text-emerald-600" accentBg="bg-emerald-50 dark:bg-emerald-950/30" />
        <KPICard icon={CheckCircle2} label="Success Rate" value={98.2} change={1.3} prefix="" accentColor="text-sky-600" accentBg="bg-sky-50 dark:bg-sky-950/30" />
        <KPICard icon={CreditCard} label="Avg. Transaction Value" value={6147.69} change={5.2} accentColor="text-violet-600" accentBg="bg-violet-50 dark:bg-violet-950/30" />
        <KPICard icon={Receipt} label="Total Transactions" value={5} change={25} prefix="" accentColor="text-amber-600" accentBg="bg-amber-50 dark:bg-amber-950/30" />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Payment Volume */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <Card className="border-border/50">
            <CardHeader className="pb-2">
              <CardTitle className="text-base font-semibold">Payment Volume</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <ResponsiveContainer width="100%" height={280}>
                <AreaChart data={paymentVolumeData} margin={{ top: 8, right: 8, left: -8, bottom: 0 }}>
                  <defs>
                    <linearGradient id="payVolGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#10b981" stopOpacity={0.2} />
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }} tickFormatter={(v: number) => `$${(v / 1000).toFixed(0)}k`} />
                  <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--popover))', border: '1px solid hsl(var(--border))', borderRadius: '8px', fontSize: '12px' }} formatter={(value: number) => [`$${value.toLocaleString()}`, '']} />
                  <Area type="monotone" dataKey="volume" stroke="#10b981" strokeWidth={2} fill="url(#payVolGrad)" dot={false} animationDuration={800} />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>

        {/* Payment Methods */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.15 }}
        >
          <Card className="border-border/50">
            <CardHeader className="pb-2">
              <CardTitle className="text-base font-semibold">Payment Methods</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <ResponsiveContainer width="100%" height={220}>
                <PieChart>
                  <Pie
                    data={paymentMethodsData}
                    cx="50%"
                    cy="50%"
                    innerRadius={55}
                    outerRadius={85}
                    paddingAngle={3}
                    dataKey="value"
                    nameKey="name"
                    animationDuration={800}
                  >
                    {paymentMethodsData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--popover))', border: '1px solid hsl(var(--border))', borderRadius: '8px', fontSize: '12px' }} formatter={(value: number) => [`${value}%`, '']} />
                </PieChart>
              </ResponsiveContainer>
              <div className="grid grid-cols-2 gap-2 mt-2">
                {paymentMethodsData.map((item) => (
                  <div key={item.name} className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: item.color }} />
                    <span className="text-xs text-muted-foreground truncate">{item.name}</span>
                    <span className="text-xs font-medium text-foreground ml-auto">{item.value}%</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Recent Transactions */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.2 }}
      >
        <Card className="border-border/50">
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-semibold">Recent Checkout Transactions</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="space-y-1">
              {recentTransactionsData.map((txn) => (
                <div key={txn.id} className="flex items-center justify-between py-3 px-2 rounded-lg hover:bg-muted/30 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className={cn(
                      'flex items-center justify-center w-8 h-8 rounded-lg',
                      txn.status === 'success' ? 'bg-emerald-50 dark:bg-emerald-950/30' : 'bg-red-50 dark:bg-red-950/30'
                    )}>
                      {txn.status === 'success'
                        ? <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                        : <AlertTriangle className="h-4 w-4 text-red-500" />
                      }
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">{txn.customer}</p>
                      <p className="text-xs text-muted-foreground">{txn.method}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-foreground tabular-nums">${txn.amount.toLocaleString()}</p>
                    <Badge variant={txn.status === 'success' ? 'secondary' : 'destructive'} className="text-[10px] px-1.5 py-0">
                      {txn.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}


