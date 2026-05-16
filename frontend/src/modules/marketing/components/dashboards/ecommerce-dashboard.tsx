'use client';

import {
  DollarSign,
  ShoppingCart,
  RefreshCw,
  Package,
  ArrowUpRight,
  ArrowDownRight,
  TrendingUp,
} from 'lucide-react';
import {
  AreaChart,
  Area,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { MetricCard } from '../shared/metric-card';
import { cn } from '@/lib/utils';
import { formatCurrency } from '@/modules/marketing/utils';

// ---------------------------------------------------------------------------
// Mock Data
// ---------------------------------------------------------------------------

const revenueTrendData = [
  { month: 'Jan', revenue: 82000, orders: 320 },
  { month: 'Feb', revenue: 94000, orders: 380 },
  { month: 'Mar', revenue: 101000, orders: 420 },
  { month: 'Apr', revenue: 96000, orders: 395 },
  { month: 'May', revenue: 112000, orders: 460 },
  { month: 'Jun', revenue: 125000, orders: 510 },
];

const cartAbandonmentData = [
  { month: 'Jan', rate: 72, recovered: 18 },
  { month: 'Feb', rate: 70, recovered: 21 },
  { month: 'Mar', rate: 68, recovered: 24 },
  { month: 'Apr', rate: 71, recovered: 20 },
  { month: 'May', rate: 66, recovered: 26 },
  { month: 'Jun', rate: 64, recovered: 28 },
];

const topProducts = [
  { id: '1', name: 'Pro Subscription Plan', revenue: 42800, orders: 285, growth: 15.2 },
  { id: '2', name: 'Enterprise License', revenue: 38500, orders: 42, growth: 8.4 },
  { id: '3', name: 'Starter Pack', revenue: 18900, orders: 380, growth: 22.1 },
  { id: '4', name: 'Add-on: Analytics', revenue: 12400, orders: 148, growth: -3.2 },
  { id: '5', name: 'Add-on: Support', revenue: 8900, orders: 96, growth: 5.7 },
];

const sparkRevenue = [{ value: 82000 }, { value: 94000 }, { value: 101000 }, { value: 96000 }, { value: 112000 }, { value: 125000 }];
const sparkCarts = [{ value: 342 }, { value: 318 }, { value: 295 }, { value: 310 }, { value: 278 }, { value: 252 }];
const sparkRecovery = [{ value: 18 }, { value: 21 }, { value: 24 }, { value: 20 }, { value: 26 }, { value: 28 }];
const sparkAov = [{ value: 78 }, { value: 82 }, { value: 85 }, { value: 81 }, { value: 88 }, { value: 92 }];

// ---------------------------------------------------------------------------
// E-Commerce Dashboard
// ---------------------------------------------------------------------------

export function EcommerceDashboard() {
  return (
    <div className="space-y-6 p-4 sm:p-6">
      {/* Page Header */}
      <div className="animate-in fade-in slide-in-from-top-1 duration-200">
        <h1 className="text-2xl font-bold text-foreground tracking-tight">E-Commerce Dashboard</h1>
        <p className="text-sm text-muted-foreground mt-1">Revenue, cart recovery, and product performance</p>
      </div>

      {/* KPI Cards */}
      <div
        className="animate-in fade-in duration-200 delay-75 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
      >
        <MetricCard
          icon={DollarSign}
          title="Revenue"
          value="$125K"
          change={15.7}
          changeLabel="vs last month"
          sparklineData={sparkRevenue}
          accentColor="text-emerald-600"
          accentBg="bg-emerald-50 dark:bg-emerald-950/30"
        />
        <MetricCard
          icon={ShoppingCart}
          title="Abandoned Carts"
          value="252"
          change={-9.4}
          changeLabel="vs last month"
          sparklineData={sparkCarts}
          accentColor="text-red-500"
          accentBg="bg-red-50 dark:bg-red-950/30"
        />
        <MetricCard
          icon={RefreshCw}
          title="Recovery Rate"
          value="28%"
          change={7.7}
          changeLabel="vs last month"
          sparklineData={sparkRecovery}
          accentColor="text-blue-600"
          accentBg="bg-blue-50 dark:bg-blue-950/30"
        />
        <MetricCard
          icon={Package}
          title="Avg Order Value"
          value="$92"
          change={4.5}
          changeLabel="vs last month"
          sparklineData={sparkAov}
          accentColor="text-amber-600"
          accentBg="bg-amber-50 dark:bg-amber-950/30"
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Trend */}
        <div className="animate-in fade-in slide-in-from-bottom-2 duration-200 delay-100">
          <Card className="border-border/50">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base font-semibold">Revenue Trend</CardTitle>
                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />Revenue</span>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <ResponsiveContainer width="100%" height={280}>
                <AreaChart data={revenueTrendData} margin={{ top: 8, right: 8, left: -8, bottom: 0 }}>
                  <defs>
                    <linearGradient id="ecoRevenueGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#10b981" stopOpacity={0.2} />
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }} tickFormatter={(v: number) => `$${(v / 1000).toFixed(0)}k`} />
                  <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--popover))', border: '1px solid hsl(var(--border))', borderRadius: '8px', fontSize: '12px' }} formatter={(value: number) => [formatCurrency(value), 'Revenue']} />
                  <Area type="monotone" dataKey="revenue" stroke="#10b981" strokeWidth={2} fill="url(#ecoRevenueGrad)" dot={false} animationDuration={800} name="Revenue" />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Cart Abandonment Rate */}
        <div className="animate-in fade-in slide-in-from-bottom-2 duration-200 delay-150">
          <Card className="border-border/50">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base font-semibold">Cart Abandonment Rate</CardTitle>
                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-red-400" />Abandonment</span>
                  <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />Recovered</span>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <ResponsiveContainer width="100%" height={280}>
                <LineChart data={cartAbandonmentData} margin={{ top: 8, right: 8, left: -8, bottom: 0 }}>
                  <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }} tickFormatter={(v: number) => `${v}%`} />
                  <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--popover))', border: '1px solid hsl(var(--border))', borderRadius: '8px', fontSize: '12px' }} formatter={(value: number) => [`${value}%`, '']} />
                  <Line type="monotone" dataKey="rate" stroke="#f87171" strokeWidth={2} dot={false} animationDuration={800} name="Abandonment" />
                  <Line type="monotone" dataKey="recovered" stroke="#10b981" strokeWidth={2} dot={false} animationDuration={800} name="Recovered" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Top Products by Revenue */}
      <div className="animate-in fade-in slide-in-from-bottom-2 duration-200 delay-200">
        <Card className="border-border/50">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base font-semibold">Top Products by Revenue</CardTitle>
              <Button variant="ghost" size="sm" className="text-xs">View All</Button>
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="space-y-4">
              {topProducts.map((product, index) => (
                <div key={product.id} className="flex items-center gap-4">
                  <span className="text-sm font-medium text-muted-foreground w-6 text-right">{index + 1}</span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-sm font-medium text-foreground truncate">{product.name}</span>
                      <div className="flex items-center gap-3">
                        <span className="text-sm font-semibold text-foreground tabular-nums">
                          {formatCurrency(product.revenue)}
                        </span>
                        <Badge
                          variant="secondary"
                          className={cn(
                            'text-xs font-medium gap-0.5',
                            product.growth >= 0
                              ? 'text-emerald-600 bg-emerald-50 dark:bg-emerald-950/30'
                              : 'text-red-600 bg-red-50 dark:bg-red-950/30'
                          )}
                        >
                          {product.growth >= 0 ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
                          {Math.abs(product.growth)}%
                        </Badge>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Progress value={(product.revenue / topProducts[0].revenue) * 100} className="h-1.5" />
                      <span className="text-xs text-muted-foreground shrink-0">{product.orders} orders</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
