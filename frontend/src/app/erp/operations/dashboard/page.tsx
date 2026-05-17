'use client';

import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { PageTransition } from '@/modules/erp/design-system/components/animations';
import { mockErpDashboard, mockLowStockAlerts, mockPurchaseOrders, mockSalesOrders } from '@/modules/erp/data/mock';
import type { ErpDashboardData, LowStockAlert } from '@/modules/erp/types/erp-operations';
import { formatCurrency, formatCompactNumber } from '@/lib/format';
import {
  Package,
  Boxes,
  Warehouse,
  Truck,
  ShoppingCart,
  ClipboardCheck,
  AlertTriangle,
  ArrowRight,
  TrendingUp,
  TrendingDown,
  BarChart3,
} from 'lucide-react';

// ── Animation Easing ────────────────────────────────────────────────────────
const EASE = [0.25, 0.46, 0.45, 0.94] as const;

// ── Dashboard Data ──────────────────────────────────────────────────────────
const dashboard: ErpDashboardData = mockErpDashboard;
const lowStockAlerts: LowStockAlert[] = mockLowStockAlerts;

// ── Summary Stat Card ───────────────────────────────────────────────────────
interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  accentColor: string;
  iconBg: string;
  delay?: number;
}

function StatCard({ title, value, icon: Icon, accentColor, iconBg, delay = 0 }: StatCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay, ease: EASE }}
      className="glass-surface rounded-xl p-5 flex items-start gap-4"
    >
      <div
        className={`${iconBg} rounded-lg p-2.5 flex items-center justify-center shrink-0`}
      >
        <Icon className={`h-5 w-5 ${accentColor}`} strokeWidth={1.8} />
      </div>
      <div className="min-w-0 flex-1">
        <p
          className="text-muted-foreground"
          style={{
            fontSize: 'var(--text-xs)',
            letterSpacing: 'var(--tracking-wide)',
            lineHeight: 'var(--leading-normal)',
          }}
        >
          {title}
        </p>
        <p
          className="font-bold text-foreground mt-0.5"
          style={{
            fontSize: 'var(--text-xl)',
            letterSpacing: 'var(--tracking-tight)',
            lineHeight: 'var(--leading-tight)',
          }}
        >
          {value}
        </p>
      </div>
    </motion.div>
  );
}

// ── Quick Action Card ───────────────────────────────────────────────────────
interface QuickActionProps {
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  href: string;
  delay?: number;
}

function QuickActionCard({ title, description, icon: Icon, href, delay = 0 }: QuickActionProps) {
  const router = useRouter();

  return (
    <motion.button
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay, ease: EASE }}
      onClick={() => router.push(href)}
      className="glass-surface rounded-xl p-4 text-left w-full press-scale group transition-all duration-[var(--motion-fast)] hover:shadow-md"
    >
      <div className="flex items-center justify-between mb-2">
        <div className="bg-module-erp/10 rounded-lg p-2">
          <Icon className="h-4 w-4 text-module-erp" strokeWidth={1.8} />
        </div>
        <ArrowRight className="h-4 w-4 text-muted-foreground/40 group-hover:text-module-erp group-hover:translate-x-0.5 transition-all duration-[var(--motion-fast)]" strokeWidth={1.8} />
      </div>
      <p
        className="font-medium text-foreground"
        style={{
          fontSize: 'var(--text-sm)',
          letterSpacing: 'var(--tracking-tight)',
          lineHeight: 'var(--leading-tight)',
        }}
      >
        {title}
      </p>
      <p
        className="text-muted-foreground mt-0.5"
        style={{
          fontSize: 'var(--text-xs)',
          letterSpacing: 'var(--tracking-normal)',
          lineHeight: 'var(--leading-normal)',
        }}
      >
        {description}
      </p>
    </motion.button>
  );
}

// ── Recent Orders Row ───────────────────────────────────────────────────────
interface RecentOrder {
  id: string;
  number: string;
  type: 'PO' | 'SO';
  counterparty: string;
  amount: number;
  status: string;
  date: string;
}

function RecentOrderRow({ order, index }: { order: RecentOrder; index: number }) {
  const isPO = order.type === 'PO';
  const statusColor: Record<string, string> = {
    draft: 'bg-zinc-500/10 text-zinc-500 border-zinc-500/15',
    submitted: 'bg-blue-500/10 text-blue-500 border-blue-500/15',
    approved: 'bg-green-500/10 text-green-500 border-green-500/15',
    confirmed: 'bg-green-500/10 text-green-500 border-green-500/15',
    picking: 'bg-amber-500/10 text-amber-500 border-amber-500/15',
    partial: 'bg-amber-500/10 text-amber-500 border-amber-500/15',
    received: 'bg-emerald-500/10 text-emerald-500 border-emerald-500/15',
    shipped: 'bg-cyan-500/10 text-cyan-500 border-cyan-500/15',
    delivered: 'bg-emerald-500/10 text-emerald-500 border-emerald-500/15',
    cancelled: 'bg-red-500/10 text-red-500 border-red-500/15',
    returned: 'bg-red-500/10 text-red-500 border-red-500/15',
  };

  return (
    <motion.tr
      initial={{ opacity: 0, x: -4 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.2, delay: 0.05 * index, ease: EASE }}
      className="border-b border-glass-border/20 hover:bg-glass-hover/60 transition-colors duration-[var(--motion-fast)]"
    >
      <td className="py-2.5 pr-3">
        <span
          className={`inline-flex items-center px-1.5 py-0.5 rounded text-xs font-medium ${
            isPO ? 'bg-blue-500/10 text-blue-600' : 'bg-emerald-500/10 text-emerald-600'
          }`}
          style={{ fontSize: 'var(--text-xs)', letterSpacing: 'var(--tracking-wide)' }}
        >
          {order.type}
        </span>
      </td>
      <td className="py-2.5 pr-3">
        <span
          className="font-medium text-foreground"
          style={{ fontSize: 'var(--text-sm)', letterSpacing: 'var(--tracking-normal)' }}
        >
          {order.number}
        </span>
      </td>
      <td className="py-2.5 pr-3">
        <span
          className="text-foreground truncate block max-w-[180px]"
          style={{ fontSize: 'var(--text-sm)', letterSpacing: 'var(--tracking-normal)' }}
        >
          {order.counterparty}
        </span>
      </td>
      <td className="py-2.5 pr-3 text-right">
        <span
          className="text-foreground font-medium"
          style={{ fontSize: 'var(--text-sm)', letterSpacing: 'var(--tracking-normal)' }}
        >
          {formatCurrency(order.amount)}
        </span>
      </td>
      <td className="py-2.5 pr-3">
        <span
          className={`inline-flex items-center px-2 py-0.5 rounded-full border capitalize ${
            statusColor[order.status] || 'bg-zinc-500/10 text-zinc-500 border-zinc-500/15'
          }`}
          style={{ fontSize: 'var(--text-xs)', letterSpacing: 'var(--tracking-wide)' }}
        >
          {order.status.replace('-', ' ')}
        </span>
      </td>
      <td className="py-2.5">
        <span
          className="text-muted-foreground"
          style={{ fontSize: 'var(--text-xs)', letterSpacing: 'var(--tracking-normal)' }}
        >
          {order.date}
        </span>
      </td>
    </motion.tr>
  );
}

// ── Page Component ──────────────────────────────────────────────────────────

export default function OperationsDashboardPage() {
  const router = useRouter();

  // ── Summary Stats ───────────────────────────────────────────────────────
  const summary = dashboard.summary;

  const stats: StatCardProps[] = useMemo(
    () => [
      {
        title: 'Total Products',
        value: formatCompactNumber(summary.total_products),
        icon: Package,
        accentColor: 'text-blue-500',
        iconBg: 'bg-blue-500/10',
        delay: 0,
      },
      {
        title: 'Total Inventory Value',
        value: formatCurrency(summary.total_inventory_value),
        icon: TrendingUp,
        accentColor: 'text-emerald-500',
        iconBg: 'bg-emerald-500/10',
        delay: 0.05,
      },
      {
        title: 'Low Stock Items',
        value: summary.low_stock_items + summary.out_of_stock_items,
        icon: AlertTriangle,
        accentColor: 'text-amber-500',
        iconBg: 'bg-amber-500/10',
        delay: 0.1,
      },
      {
        title: 'Pending Orders',
        value: summary.pending_purchase_orders + summary.pending_sales_orders,
        icon: ShoppingCart,
        accentColor: 'text-purple-500',
        iconBg: 'bg-purple-500/10',
        delay: 0.15,
      },
    ],
    [summary]
  );

  // ── Recent Orders (combined POs and SOs, last 5) ────────────────────────
  const recentOrders: RecentOrder[] = useMemo(() => {
    const poOrders: RecentOrder[] = mockPurchaseOrders.map((po) => ({
      id: `po-${po.id}`,
      number: po.po_number,
      type: 'PO' as const,
      counterparty: po.supplier_name || `Supplier #${po.supplier_id}`,
      amount: po.total_amount,
      status: po.status,
      date: new Date(po.order_date).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
      }),
    }));

    const soOrders: RecentOrder[] = mockSalesOrders.map((so) => ({
      id: `so-${so.id}`,
      number: so.so_number,
      type: 'SO' as const,
      counterparty: so.customer_name || `Customer #${so.customer_id}`,
      amount: so.total_amount,
      status: so.status,
      date: new Date(so.order_date).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
      }),
    }));

    const combined = [...poOrders, ...soOrders];
    // Sort by ID descending (higher IDs are more recent in mock)
    combined.sort((a, b) => {
      const aNum = parseInt(a.id.split('-')[1]);
      const bNum = parseInt(b.id.split('-')[1]);
      return bNum - aNum;
    });

    return combined.slice(0, 5);
  }, []);

  // ── Quick Actions ───────────────────────────────────────────────────────
  const quickActions: QuickActionProps[] = useMemo(
    () => [
      {
        title: 'Products',
        description: 'Manage your product catalog',
        icon: Package,
        href: '/erp/operations/products',
        delay: 0,
      },
      {
        title: 'Inventory',
        description: 'Track stock levels & bins',
        icon: Boxes,
        href: '/erp/operations/inventory',
        delay: 0.05,
      },
      {
        title: 'Purchase Orders',
        description: 'Create & manage POs',
        icon: ClipboardCheck,
        href: '/erp/operations/purchase-orders',
        delay: 0.1,
      },
      {
        title: 'Sales Orders',
        description: 'Process customer orders',
        icon: Truck,
        href: '/erp/operations/sales-orders',
        delay: 0.15,
      },
    ],
    []
  );

  // ── Render ────────────────────────────────────────────────────────────────
  return (
    <PageTransition>
      <div className="p-4 sm:p-6 lg:p-8">
        {/* ── Header ──────────────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.24, ease: EASE }}
          className="mb-6"
        >
          <h1
            className="font-bold text-foreground"
            style={{
              fontSize: 'var(--text-xl)',
              letterSpacing: 'var(--tracking-tight)',
              lineHeight: 'var(--leading-tight)',
            }}
          >
            Operations Dashboard
          </h1>
          <p
            className="text-muted-foreground mt-1"
            style={{
              fontSize: 'var(--text-sm)',
              letterSpacing: 'var(--tracking-normal)',
              lineHeight: 'var(--leading-normal)',
            }}
          >
            Overview of your supply chain and inventory
          </p>
        </motion.div>

        {/* ── Summary Stats Cards ─────────────────────────────────────────── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {stats.map((stat) => (
            <StatCard key={stat.title} {...stat} />
          ))}
        </div>

        {/* ── Two-Column Grid: Low Stock Alerts + Quick Actions ──────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* ── Left: Low Stock Alerts ────────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2, ease: EASE }}
            className="glass-surface rounded-xl p-5"
          >
            <div className="flex items-center gap-2 mb-4">
              <AlertTriangle className="h-4 w-4 text-amber-500" strokeWidth={1.8} />
              <h2
                className="font-semibold text-foreground"
                style={{
                  fontSize: 'var(--text-base)',
                  letterSpacing: 'var(--tracking-tight)',
                  lineHeight: 'var(--leading-tight)',
                }}
              >
                Low Stock Alerts
              </h2>
            </div>

            {lowStockAlerts.length === 0 ? (
              <p
                className="text-muted-foreground py-8 text-center"
                style={{
                  fontSize: 'var(--text-sm)',
                  letterSpacing: 'var(--tracking-normal)',
                }}
              >
                No low stock alerts at this time
              </p>
            ) : (
              <div className="space-y-3 max-h-80 overflow-y-auto smooth-scroll">
                {lowStockAlerts.map((alert, idx) => (
                  <motion.div
                    key={alert.product_id}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.2, delay: 0.05 * idx, ease: EASE }}
                    className="flex items-center gap-3 p-3 rounded-lg border border-glass-border/30 bg-glass-bg/20 hover:bg-glass-hover/40 transition-colors duration-[var(--motion-fast)]"
                  >
                    <div
                      className={`rounded-lg p-2 shrink-0 ${
                        alert.status === 'out_of_stock'
                          ? 'bg-red-500/10'
                          : 'bg-amber-500/10'
                      }`}
                    >
                      <AlertTriangle
                        className={`h-4 w-4 ${
                          alert.status === 'out_of_stock'
                            ? 'text-red-500'
                            : 'text-amber-500'
                        }`}
                        strokeWidth={1.8}
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p
                        className="font-medium text-foreground truncate"
                        style={{
                          fontSize: 'var(--text-sm)',
                          letterSpacing: 'var(--tracking-normal)',
                          lineHeight: 'var(--leading-normal)',
                        }}
                      >
                        {alert.product_name}
                      </p>
                      <p
                        className="text-muted-foreground"
                        style={{
                          fontSize: 'var(--text-xs)',
                          letterSpacing: 'var(--tracking-normal)',
                          lineHeight: 'var(--leading-normal)',
                        }}
                      >
                        {alert.quantity_on_hand} on hand &middot; {alert.min_stock_level} min
                      </p>
                    </div>
                    <span
                      className={`inline-flex items-center px-2 py-0.5 rounded-full border capitalize shrink-0 ${
                        alert.status === 'out_of_stock'
                          ? 'bg-red-500/10 text-red-500 border-red-500/15'
                          : 'bg-amber-500/10 text-amber-500 border-amber-500/15'
                      }`}
                      style={{
                        fontSize: 'var(--text-xs)',
                        letterSpacing: 'var(--tracking-wide)',
                      }}
                    >
                      {alert.status.replace('_', ' ')}
                    </span>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>

          {/* ── Right: Quick Actions ──────────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.25, ease: EASE }}
          >
            <div className="flex items-center gap-2 mb-4">
              <BarChart3 className="h-4 w-4 text-module-erp" strokeWidth={1.8} />
              <h2
                className="font-semibold text-foreground"
                style={{
                  fontSize: 'var(--text-base)',
                  letterSpacing: 'var(--tracking-tight)',
                  lineHeight: 'var(--leading-tight)',
                }}
              >
                Quick Actions
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {quickActions.map((action) => (
                <QuickActionCard key={action.title} {...action} />
              ))}
            </div>
          </motion.div>
        </div>

        {/* ── Bottom: Recent Orders ───────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.3, ease: EASE }}
          className="glass-surface rounded-xl overflow-hidden"
        >
          <div className="p-5 pb-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingCart className="h-4 w-4 text-module-erp" strokeWidth={1.8} />
              <h2
                className="font-semibold text-foreground"
                style={{
                  fontSize: 'var(--text-base)',
                  letterSpacing: 'var(--tracking-tight)',
                  lineHeight: 'var(--leading-tight)',
                }}
              >
                Recent Orders
              </h2>
            </div>
            <button
              onClick={() => router.push('/erp/operations/purchase-orders')}
              className="flex items-center gap-1 text-module-erp hover:text-module-erp/80 press-scale transition-colors duration-[var(--motion-fast)]"
              style={{
                fontSize: 'var(--text-sm)',
                letterSpacing: 'var(--tracking-normal)',
              }}
            >
              View All
              <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.8} />
            </button>
          </div>

          <div className="overflow-x-auto smooth-scroll">
            <table className="w-full">
              <thead>
                <tr className="border-b border-glass-border text-muted-foreground/70">
                  <th
                    className="text-left py-2.5 px-5 font-medium uppercase"
                    style={{
                      fontSize: 'var(--text-xs)',
                      letterSpacing: 'var(--tracking-wide)',
                    }}
                  >
                    Type
                  </th>
                  <th
                    className="text-left py-2.5 pr-3 font-medium uppercase"
                    style={{
                      fontSize: 'var(--text-xs)',
                      letterSpacing: 'var(--tracking-wide)',
                    }}
                  >
                    Number
                  </th>
                  <th
                    className="text-left py-2.5 pr-3 font-medium uppercase"
                    style={{
                      fontSize: 'var(--text-xs)',
                      letterSpacing: 'var(--tracking-wide)',
                    }}
                  >
                    Counterparty
                  </th>
                  <th
                    className="text-right py-2.5 pr-3 font-medium uppercase"
                    style={{
                      fontSize: 'var(--text-xs)',
                      letterSpacing: 'var(--tracking-wide)',
                    }}
                  >
                    Amount
                  </th>
                  <th
                    className="text-left py-2.5 pr-3 font-medium uppercase"
                    style={{
                      fontSize: 'var(--text-xs)',
                      letterSpacing: 'var(--tracking-wide)',
                    }}
                  >
                    Status
                  </th>
                  <th
                    className="text-left py-2.5 font-medium uppercase"
                    style={{
                      fontSize: 'var(--text-xs)',
                      letterSpacing: 'var(--tracking-wide)',
                    }}
                  >
                    Date
                  </th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map((order, idx) => (
                  <RecentOrderRow key={order.id} order={order} index={idx} />
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </PageTransition>
  );
}
