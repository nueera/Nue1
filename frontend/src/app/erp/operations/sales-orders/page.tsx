'use client';

import { useState, useMemo, useCallback } from 'react';
import { motion } from 'framer-motion';
import { type ColumnDef } from '@tanstack/react-table';
import {
  Plus,
  MoreHorizontal,
  Eye,
  Pencil,
  Trash2,
  ShoppingCart,
  X,
  Package,
} from 'lucide-react';

import { PageTransition } from '@/modules/erp/design-system/components/animations';
import { SmartTable } from '@/modules/erp/shared/components/smart-table';
import { StatusBadge } from '@/modules/erp/shared/components/status-badge';
import { ConfirmDialog } from '@/modules/erp/shared/components/confirm-dialog';
import { EmptyState } from '@/modules/erp/shared/components/empty-state';
import { useModal } from '@/modules/erp/shared/hooks';

import { erpService } from '@/lib/services';
import {
  mockSalesOrders,
  mockWarehouses,
  mockProducts,
} from '@/modules/erp/data/mock';
import type {
  SalesOrder,
  SalesOrderCreate,
  SalesOrderUpdate,
  SalesOrderItem,
  SalesOrderItemCreate,
  SOStatus,
  PaymentStatus,
} from '@/modules/erp/types/erp-operations';
import { SO_STATUSES, PAYMENT_STATUSES } from '@/modules/erp/core/utils/constants';
import { formatCurrency, formatDate, prettifyStatus } from '@/lib/format';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Textarea } from '@/components/ui/textarea';

// ── Animation Easing ──────────────────────────────────────────────────────────
const EASE = [0.25, 0.46, 0.45, 0.94] as const;

// ── Default Form Item ─────────────────────────────────────────────────────────
function createEmptyLineItem(): SalesOrderItemCreate {
  return {
    product_id: 0,
    quantity_ordered: 1,
    unit_price: 0,
    tax_rate: 0,
    discount_percent: 0,
    total_price: 0,
  };
}

// ── Default Form State ────────────────────────────────────────────────────────
function createDefaultForm(): SalesOrderCreate & { items: SalesOrderItemCreate[] } {
  return {
    so_number: '',
    customer_name: '',
    warehouse_id: 0,
    order_date: new Date().toISOString().split('T')[0],
    expected_ship_date: '',
    delivery_date: '',
    status: 'draft',
    payment_status: 'unpaid',
    payment_method: '',
    shipping_address: '',
    billing_address: '',
    notes: '',
    items: [createEmptyLineItem()],
  };
}

// ══════════════════════════════════════════════════════════════════════════════
// SALES ORDERS PAGE
// ══════════════════════════════════════════════════════════════════════════════

export default function SalesOrdersPage() {
  // ── State ─────────────────────────────────────────────────────────────────
  const [salesOrders, setSalesOrders] = useState<SalesOrder[]>(mockSalesOrders);
  const [isLoading, setIsLoading] = useState(false);
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [paymentFilter, setPaymentFilter] = useState<string>('all');

  // ── Modals ────────────────────────────────────────────────────────────────
  const viewModal = useModal();
  const formModal = useModal();
  const deleteModal = useModal();

  // ── Selected / Editing ────────────────────────────────────────────────────
  const [selectedOrder, setSelectedOrder] = useState<SalesOrder | null>(null);
  const [editingOrder, setEditingOrder] = useState<SalesOrder | null>(null);
  const [deletingOrder, setDeletingOrder] = useState<SalesOrder | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // ── Form State ────────────────────────────────────────────────────────────
  const [formData, setFormData] = useState<SalesOrderCreate & { items: SalesOrderItemCreate[] }>(createDefaultForm());

  // ── Filtered Data ─────────────────────────────────────────────────────────
  const filteredOrders = useMemo(() => {
    return salesOrders.filter((order) => {
      if (statusFilter !== 'all' && order.status !== statusFilter) return false;
      if (paymentFilter !== 'all' && order.payment_status !== paymentFilter) return false;
      return true;
    });
  }, [salesOrders, statusFilter, paymentFilter]);

  // ── Auto-calculate Totals ─────────────────────────────────────────────────
  const calculatedTotals = useMemo(() => {
    let subtotal = 0;
    let taxAmount = 0;
    let discountAmount = 0;

    for (const item of formData.items) {
      const lineSubtotal = item.quantity_ordered * item.unit_price;
      const lineDiscount = lineSubtotal * ((item.discount_percent ?? 0) / 100);
      const afterDiscount = lineSubtotal - lineDiscount;
      const lineTax = afterDiscount * ((item.tax_rate ?? 0) / 100);

      subtotal += afterDiscount;
      taxAmount += lineTax;
      discountAmount += lineDiscount;
    }

    const shippingCost = 0;
    const totalAmount = subtotal + taxAmount + shippingCost;

    return { subtotal, taxAmount, discountAmount, shippingCost, totalAmount };
  }, [formData.items]);

  // ── Handlers ──────────────────────────────────────────────────────────────
  const handleView = useCallback((order: SalesOrder) => {
    setSelectedOrder(order);
    viewModal.open();
  }, [viewModal]);

  const handleCreate = useCallback(() => {
    setEditingOrder(null);
    setFormData(createDefaultForm());
    formModal.open();
  }, [formModal]);

  const handleEdit = useCallback((order: SalesOrder) => {
    setEditingOrder(order);
    setFormData({
      so_number: order.so_number,
      customer_name: order.customer_name || '',
      warehouse_id: order.warehouse_id,
      order_date: order.order_date,
      expected_ship_date: order.expected_ship_date || '',
      delivery_date: order.delivery_date || '',
      status: order.status,
      payment_status: order.payment_status,
      payment_method: order.payment_method || '',
      shipping_address: order.shipping_address || '',
      billing_address: order.billing_address || '',
      notes: order.notes || '',
      items: order.items.map((item) => ({
        product_id: item.product_id,
        quantity_ordered: item.quantity_ordered,
        unit_price: item.unit_price,
        tax_rate: item.tax_rate,
        discount_percent: item.discount_percent,
        total_price: item.total_price,
      })),
    });
    formModal.open();
  }, [formModal]);

  const handleDelete = useCallback((order: SalesOrder) => {
    setDeletingOrder(order);
    deleteModal.open();
  }, [deleteModal]);

  const confirmDelete = useCallback(async () => {
    if (!deletingOrder) return;
    setIsSubmitting(true);
    try {
      await erpService.deleteSalesOrder(deletingOrder.id);
      setSalesOrders((prev) => prev.filter((o) => o.id !== deletingOrder.id));
    } catch {
      // Fallback to mock — remove locally
      setSalesOrders((prev) => prev.filter((o) => o.id !== deletingOrder.id));
    } finally {
      setIsSubmitting(false);
      deleteModal.close();
      setDeletingOrder(null);
    }
  }, [deletingOrder, deleteModal]);

  const handleSubmit = useCallback(async () => {
    if (!formData.so_number) return;
    setIsSubmitting(true);
    try {
      const payload: SalesOrderCreate = {
        ...formData,
        subtotal: calculatedTotals.subtotal,
        tax_amount: calculatedTotals.taxAmount,
        shipping_cost: calculatedTotals.shippingCost,
        discount_amount: calculatedTotals.discountAmount,
        total_amount: calculatedTotals.totalAmount,
        items: formData.items.map((item) => ({
          ...item,
          total_price:
            item.quantity_ordered * item.unit_price * (1 - (item.discount_percent ?? 0) / 100) * (1 + (item.tax_rate ?? 0) / 100),
        })),
      };

      if (editingOrder) {
        try {
          const updated = await erpService.updateSalesOrder(editingOrder.id, payload as SalesOrderUpdate);
          setSalesOrders((prev) =>
            prev.map((o) => (o.id === editingOrder.id ? (updated as unknown as SalesOrder) : o))
          );
        } catch {
          // Fallback — update locally
          setSalesOrders((prev) =>
            prev.map((o) =>
              o.id === editingOrder.id
                ? {
                    ...o,
                    ...payload,
                    id: o.id,
                    items: payload.items?.map((li, idx) => ({
                      ...li,
                      id: o.items[idx]?.id ?? idx + 1,
                      sales_order_id: o.id,
                      quantity_shipped: o.items[idx]?.quantity_shipped ?? 0,
                      quantity_returned: o.items[idx]?.quantity_returned ?? 0,
                      product_name: o.items[idx]?.product_name ?? '',
                      product_sku: o.items[idx]?.product_sku ?? '',
                      created_at: o.items[idx]?.created_at ?? new Date().toISOString(),
                      updated_at: new Date().toISOString(),
                    })) ?? [],
                    updated_at: new Date().toISOString(),
                  } as SalesOrder
                : o
            )
          );
        }
      } else {
        try {
          const created = await erpService.createSalesOrder(payload);
          setSalesOrders((prev) => [...prev, created as unknown as SalesOrder]);
        } catch {
          // Fallback — create locally
          const newOrder: SalesOrder = {
            id: Math.max(...salesOrders.map((o) => o.id), 0) + 1,
            so_number: payload.so_number,
            customer_name: payload.customer_name || null,
            warehouse_id: payload.warehouse_id,
            order_date: payload.order_date,
            expected_ship_date: payload.expected_ship_date || null,
            delivery_date: payload.delivery_date || null,
            status: payload.status || 'draft',
            subtotal: calculatedTotals.subtotal,
            tax_amount: calculatedTotals.taxAmount,
            shipping_cost: calculatedTotals.shippingCost,
            discount_amount: calculatedTotals.discountAmount,
            total_amount: calculatedTotals.totalAmount,
            currency: 'INR',
            payment_status: payload.payment_status || 'unpaid',
            payment_method: payload.payment_method || null,
            shipping_address: payload.shipping_address || null,
            billing_address: payload.billing_address || null,
            notes: payload.notes || null,
            items: (payload.items?.map((li, idx) => ({
                ...li,
                id: idx + 1,
                sales_order_id: Math.max(...salesOrders.map((o) => o.id), 0) + 1,
                quantity_shipped: 0,
                quantity_returned: 0,
                product_name: mockProducts.find((p) => p.id === li.product_id)?.name ?? '',
                product_sku: mockProducts.find((p) => p.id === li.product_id)?.sku ?? '',
                notes: li.notes ?? null,
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString(),
              })) ?? []) as SalesOrderItem[],
            owner_id: null,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
            warehouse_name: mockWarehouses.find((w) => w.id === payload.warehouse_id)?.name,
          };
          setSalesOrders((prev) => [...prev, newOrder]);
        }
      }
    } finally {
      setIsSubmitting(false);
      formModal.close();
      setEditingOrder(null);
    }
  }, [formData, editingOrder, calculatedTotals, formModal, salesOrders]);

  // ── Form Helpers ──────────────────────────────────────────────────────────
  const updateFormField = useCallback(<K extends keyof SalesOrderCreate>(field: K, value: SalesOrderCreate[K]) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  }, []);

  const updateLineItem = useCallback((index: number, field: keyof SalesOrderItemCreate, value: number | string) => {
    setFormData((prev) => {
      const items = [...prev.items];
      items[index] = { ...items[index], [field]: value };
      return { ...prev, items };
    });
  }, []);

  const addLineItem = useCallback(() => {
    setFormData((prev) => ({
      ...prev,
      items: [...prev.items, createEmptyLineItem()],
    }));
  }, []);

  const removeLineItem = useCallback((index: number) => {
    setFormData((prev) => ({
      ...prev,
      items: prev.items.filter((_, i) => i !== index),
    }));
  }, []);

  // ── Table Columns ─────────────────────────────────────────────────────────
  const columns: ColumnDef<SalesOrder>[] = useMemo(
    () => [
      {
        accessorKey: 'so_number',
        header: 'SO Number',
        cell: ({ row }) => (
          <span className="font-semibold text-module-erp" style={{ fontSize: 'var(--text-sm)' }}>
            {row.original.so_number}
          </span>
        ),
      },
      {
        accessorKey: 'customer_name',
        header: 'Customer',
        cell: ({ row }) => (
          <span style={{ fontSize: 'var(--text-sm)' }}>
            {row.original.customer_name || '—'}
          </span>
        ),
      },
      {
        accessorKey: 'warehouse_name',
        header: 'Warehouse',
        cell: ({ row }) => (
          <span style={{ fontSize: 'var(--text-sm)' }}>
            {row.original.warehouse_name || '—'}
          </span>
        ),
      },
      {
        accessorKey: 'order_date',
        header: 'Order Date',
        cell: ({ row }) => (
          <span className="text-muted-foreground" style={{ fontSize: 'var(--text-sm)' }}>
            {formatDate(row.original.order_date)}
          </span>
        ),
      },
      {
        accessorKey: 'expected_ship_date',
        header: 'Ship Date',
        cell: ({ row }) => (
          <span className="text-muted-foreground" style={{ fontSize: 'var(--text-sm)' }}>
            {formatDate(row.original.expected_ship_date)}
          </span>
        ),
      },
      {
        accessorKey: 'total_amount',
        header: 'Total Amount',
        cell: ({ row }) => (
          <span className="font-bold" style={{ fontSize: 'var(--text-sm)' }}>
            {formatCurrency(row.original.total_amount, row.original.currency || 'INR')}
          </span>
        ),
      },
      {
        accessorKey: 'status',
        header: 'Status',
        cell: ({ row }) => <StatusBadge status={row.original.status} />,
      },
      {
        accessorKey: 'payment_status',
        header: 'Payment',
        cell: ({ row }) => <StatusBadge status={row.original.payment_status} />,
      },
      {
        id: 'actions',
        header: '',
        size: 50,
        cell: ({ row }) => (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={(e) => e.stopPropagation()}
              >
                <MoreHorizontal className="h-4 w-4" strokeWidth={1.8} />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-40">
              <DropdownMenuItem onClick={() => handleView(row.original)}>
                <Eye className="h-4 w-4 mr-2" strokeWidth={1.8} />
                View
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleEdit(row.original)}>
                <Pencil className="h-4 w-4 mr-2" strokeWidth={1.8} />
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem variant="destructive" onClick={() => handleDelete(row.original)}>
                <Trash2 className="h-4 w-4 mr-2" strokeWidth={1.8} />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ),
        enableSorting: false,
      },
    ],
    [handleView, handleEdit, handleDelete]
  );

  // ══════════════════════════════════════════════════════════════════════════
  // RENDER
  // ══════════════════════════════════════════════════════════════════════════

  return (
    <PageTransition>
      <div className="p-4 sm:p-6 lg:p-8">
        {/* ── Page Header ─────────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.24, ease: EASE }}
          className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6"
        >
          <div>
            <h1
              className="font-bold text-foreground"
              style={{
                fontSize: 'var(--text-xl)',
                letterSpacing: 'var(--tracking-tight)',
                lineHeight: 'var(--leading-tight)',
              }}
            >
              Sales Orders
            </h1>
            <p
              className="text-muted-foreground mt-1"
              style={{
                fontSize: 'var(--text-sm)',
                letterSpacing: 'var(--tracking-normal)',
                lineHeight: 'var(--leading-normal)',
              }}
            >
              Track customer orders and fulfillment
            </p>
          </div>
          <Button
            className="bg-module-erp hover:bg-module-erp/90 text-white gap-2 press-scale"
            style={{ fontSize: 'var(--text-sm)' }}
            onClick={handleCreate}
          >
            <Plus className="h-4 w-4" strokeWidth={1.8} />
            New Sales Order
          </Button>
        </motion.div>

        {/* ── Filter Bar ──────────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.24, delay: 0.05, ease: EASE }}
          className="flex flex-wrap items-center gap-3 mb-6"
        >
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[180px]" size="sm">
              <SelectValue placeholder="All Statuses" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              {SO_STATUSES.map((s) => (
                <SelectItem key={s.value} value={s.value}>
                  {s.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={paymentFilter} onValueChange={setPaymentFilter}>
            <SelectTrigger className="w-[160px]" size="sm">
              <SelectValue placeholder="All Payments" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Payments</SelectItem>
              {PAYMENT_STATUSES.map((p) => (
                <SelectItem key={p.value} value={p.value}>
                  {p.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </motion.div>

        {/* ── SmartTable ──────────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1, ease: EASE }}
        >
          {filteredOrders.length === 0 && !isLoading ? (
            <EmptyState
              icon={ShoppingCart}
              title="No sales orders found"
              description="Create your first sales order to start tracking customer fulfillment."
              action={{ label: 'New Sales Order', onClick: handleCreate }}
            />
          ) : (
            <SmartTable
              data={filteredOrders}
              columns={columns}
              searchable
              searchPlaceholder="Search sales orders..."
              isLoading={isLoading}
              emptyMessage="No sales orders found"
              emptyDescription="Try adjusting your filters or create a new sales order"
            />
          )}
        </motion.div>

        {/* ══════════════════════════════════════════════════════════════════
            VIEW SALES ORDER DIALOG
            ══════════════════════════════════════════════════════════════════ */}
        <Dialog open={viewModal.isOpen} onOpenChange={viewModal.setIsOpen}>
          <DialogContent className="sm:max-w-3xl max-h-[85vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle
                style={{
                  fontSize: 'var(--text-lg)',
                  letterSpacing: 'var(--tracking-tight)',
                }}
              >
                Sales Order Details
              </DialogTitle>
              <DialogDescription>
                View complete sales order information
              </DialogDescription>
            </DialogHeader>

            {selectedOrder && (
              <div className="space-y-6">
                {/* ── Header Info ────────────────────────────────────────── */}
                <div className="glass-surface rounded-xl p-4 space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                    <div>
                      <h3
                        className="font-bold text-module-erp"
                        style={{
                          fontSize: 'var(--text-lg)',
                          letterSpacing: 'var(--tracking-tight)',
                        }}
                      >
                        {selectedOrder.so_number}
                      </h3>
                      <p
                        className="text-muted-foreground"
                        style={{ fontSize: 'var(--text-sm)' }}
                      >
                        {selectedOrder.customer_name || 'No customer'}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <StatusBadge status={selectedOrder.status} />
                      <StatusBadge status={selectedOrder.payment_status} />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    <div>
                      <p className="text-muted-foreground" style={{ fontSize: 'var(--text-xs)' }}>
                        Order Date
                      </p>
                      <p className="font-medium" style={{ fontSize: 'var(--text-sm)' }}>
                        {formatDate(selectedOrder.order_date)}
                      </p>
                    </div>
                    <div>
                      <p className="text-muted-foreground" style={{ fontSize: 'var(--text-xs)' }}>
                        Expected Ship
                      </p>
                      <p className="font-medium" style={{ fontSize: 'var(--text-sm)' }}>
                        {formatDate(selectedOrder.expected_ship_date)}
                      </p>
                    </div>
                    <div>
                      <p className="text-muted-foreground" style={{ fontSize: 'var(--text-xs)' }}>
                        Delivery Date
                      </p>
                      <p className="font-medium" style={{ fontSize: 'var(--text-sm)' }}>
                        {formatDate(selectedOrder.delivery_date)}
                      </p>
                    </div>
                    <div>
                      <p className="text-muted-foreground" style={{ fontSize: 'var(--text-xs)' }}>
                        Warehouse
                      </p>
                      <p className="font-medium" style={{ fontSize: 'var(--text-sm)' }}>
                        {selectedOrder.warehouse_name || '—'}
                      </p>
                    </div>
                  </div>

                  {(selectedOrder.shipping_address || selectedOrder.billing_address) && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {selectedOrder.shipping_address && (
                        <div>
                          <p className="text-muted-foreground" style={{ fontSize: 'var(--text-xs)' }}>
                            Shipping Address
                          </p>
                          <p className="font-medium" style={{ fontSize: 'var(--text-sm)' }}>
                            {selectedOrder.shipping_address}
                          </p>
                        </div>
                      )}
                      {selectedOrder.billing_address && (
                        <div>
                          <p className="text-muted-foreground" style={{ fontSize: 'var(--text-xs)' }}>
                            Billing Address
                          </p>
                          <p className="font-medium" style={{ fontSize: 'var(--text-sm)' }}>
                            {selectedOrder.billing_address}
                          </p>
                        </div>
                      )}
                    </div>
                  )}

                  {selectedOrder.payment_method && (
                    <div>
                      <p className="text-muted-foreground" style={{ fontSize: 'var(--text-xs)' }}>
                        Payment Method
                      </p>
                      <p className="font-medium" style={{ fontSize: 'var(--text-sm)' }}>
                        {selectedOrder.payment_method}
                      </p>
                    </div>
                  )}

                  {selectedOrder.notes && (
                    <div>
                      <p className="text-muted-foreground" style={{ fontSize: 'var(--text-xs)' }}>
                        Notes
                      </p>
                      <p className="font-medium" style={{ fontSize: 'var(--text-sm)' }}>
                        {selectedOrder.notes}
                      </p>
                    </div>
                  )}
                </div>

                {/* ── Line Items Table ───────────────────────────────────── */}
                {selectedOrder.items.length > 0 && (
                  <div className="glass-surface rounded-xl overflow-hidden">
                    <div className="p-4 pb-2">
                      <h4
                        className="font-semibold"
                        style={{
                          fontSize: 'var(--text-sm)',
                          letterSpacing: 'var(--tracking-tight)',
                        }}
                      >
                        Line Items
                      </h4>
                    </div>
                    <div className="overflow-x-auto">
                      <Table>
                        <TableHeader>
                          <TableRow className="border-b border-glass-border hover:bg-transparent">
                            <TableHead
                              className="text-xs uppercase tracking-widest text-muted-foreground/70 font-medium"
                              style={{ fontSize: 'var(--text-xs)', letterSpacing: 'var(--tracking-wide)' }}
                            >
                              Product
                            </TableHead>
                            <TableHead
                              className="text-xs uppercase tracking-widest text-muted-foreground/70 font-medium text-right"
                              style={{ fontSize: 'var(--text-xs)', letterSpacing: 'var(--tracking-wide)' }}
                            >
                              Qty Ordered
                            </TableHead>
                            <TableHead
                              className="text-xs uppercase tracking-widest text-muted-foreground/70 font-medium text-right"
                              style={{ fontSize: 'var(--text-xs)', letterSpacing: 'var(--tracking-wide)' }}
                            >
                              Qty Shipped
                            </TableHead>
                            <TableHead
                              className="text-xs uppercase tracking-widest text-muted-foreground/70 font-medium text-right"
                              style={{ fontSize: 'var(--text-xs)', letterSpacing: 'var(--tracking-wide)' }}
                            >
                              Qty Returned
                            </TableHead>
                            <TableHead
                              className="text-xs uppercase tracking-widest text-muted-foreground/70 font-medium text-right"
                              style={{ fontSize: 'var(--text-xs)', letterSpacing: 'var(--tracking-wide)' }}
                            >
                              Unit Price
                            </TableHead>
                            <TableHead
                              className="text-xs uppercase tracking-widest text-muted-foreground/70 font-medium text-right"
                              style={{ fontSize: 'var(--text-xs)', letterSpacing: 'var(--tracking-wide)' }}
                            >
                              Tax%
                            </TableHead>
                            <TableHead
                              className="text-xs uppercase tracking-widest text-muted-foreground/70 font-medium text-right"
                              style={{ fontSize: 'var(--text-xs)', letterSpacing: 'var(--tracking-wide)' }}
                            >
                              Discount%
                            </TableHead>
                            <TableHead
                              className="text-xs uppercase tracking-widest text-muted-foreground/70 font-medium text-right"
                              style={{ fontSize: 'var(--text-xs)', letterSpacing: 'var(--tracking-wide)' }}
                            >
                              Total
                            </TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {selectedOrder.items.map((item) => (
                            <TableRow key={item.id} className="border-b border-glass-border/20">
                              <TableCell style={{ fontSize: 'var(--text-sm)' }}>
                                <div>
                                  <p className="font-medium">{item.product_name || `Product #${item.product_id}`}</p>
                                  {item.product_sku && (
                                    <p className="text-muted-foreground" style={{ fontSize: 'var(--text-xs)' }}>
                                      {item.product_sku}
                                    </p>
                                  )}
                                </div>
                              </TableCell>
                              <TableCell className="text-right" style={{ fontSize: 'var(--text-sm)' }}>
                                {item.quantity_ordered}
                              </TableCell>
                              <TableCell className="text-right" style={{ fontSize: 'var(--text-sm)' }}>
                                {item.quantity_shipped}
                              </TableCell>
                              <TableCell className="text-right" style={{ fontSize: 'var(--text-sm)' }}>
                                {item.quantity_returned}
                              </TableCell>
                              <TableCell className="text-right" style={{ fontSize: 'var(--text-sm)' }}>
                                {formatCurrency(item.unit_price, selectedOrder.currency || 'INR')}
                              </TableCell>
                              <TableCell className="text-right" style={{ fontSize: 'var(--text-sm)' }}>
                                {item.tax_rate}%
                              </TableCell>
                              <TableCell className="text-right" style={{ fontSize: 'var(--text-sm)' }}>
                                {item.discount_percent}%
                              </TableCell>
                              <TableCell className="text-right font-medium" style={{ fontSize: 'var(--text-sm)' }}>
                                {formatCurrency(item.total_price, selectedOrder.currency || 'INR')}
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </div>
                )}

                {/* ── Summary ────────────────────────────────────────────── */}
                <div className="glass-surface rounded-xl p-4">
                  <h4
                    className="font-semibold mb-3"
                    style={{
                      fontSize: 'var(--text-sm)',
                      letterSpacing: 'var(--tracking-tight)',
                    }}
                  >
                    Order Summary
                  </h4>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground" style={{ fontSize: 'var(--text-sm)' }}>
                        Subtotal
                      </span>
                      <span style={{ fontSize: 'var(--text-sm)' }}>
                        {formatCurrency(selectedOrder.subtotal, selectedOrder.currency || 'INR')}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground" style={{ fontSize: 'var(--text-sm)' }}>
                        Tax
                      </span>
                      <span style={{ fontSize: 'var(--text-sm)' }}>
                        {formatCurrency(selectedOrder.tax_amount, selectedOrder.currency || 'INR')}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground" style={{ fontSize: 'var(--text-sm)' }}>
                        Shipping
                      </span>
                      <span style={{ fontSize: 'var(--text-sm)' }}>
                        {formatCurrency(selectedOrder.shipping_cost, selectedOrder.currency || 'INR')}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground" style={{ fontSize: 'var(--text-sm)' }}>
                        Discount
                      </span>
                      <span style={{ fontSize: 'var(--text-sm)' }}>
                        -{formatCurrency(selectedOrder.discount_amount, selectedOrder.currency || 'INR')}
                      </span>
                    </div>
                    <div className="border-t border-glass-border pt-2 flex items-center justify-between">
                      <span className="font-bold" style={{ fontSize: 'var(--text-base)' }}>
                        Total
                      </span>
                      <span className="font-bold text-module-erp" style={{ fontSize: 'var(--text-base)' }}>
                        {formatCurrency(selectedOrder.total_amount, selectedOrder.currency || 'INR')}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>

        {/* ══════════════════════════════════════════════════════════════════
            CREATE / EDIT SALES ORDER DIALOG
            ══════════════════════════════════════════════════════════════════ */}
        <Dialog open={formModal.isOpen} onOpenChange={formModal.setIsOpen}>
          <DialogContent className="sm:max-w-3xl max-h-[85vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle
                style={{
                  fontSize: 'var(--text-lg)',
                  letterSpacing: 'var(--tracking-tight)',
                }}
              >
                {editingOrder ? 'Edit Sales Order' : 'New Sales Order'}
              </DialogTitle>
              <DialogDescription>
                {editingOrder
                  ? 'Update the sales order details below'
                  : 'Fill in the details to create a new sales order'}
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-6">
              {/* ── Basic Info ──────────────────────────────────────────── */}
              <div className="glass-surface rounded-xl p-4 space-y-4">
                <h4
                  className="font-semibold"
                  style={{
                    fontSize: 'var(--text-sm)',
                    letterSpacing: 'var(--tracking-tight)',
                  }}
                >
                  Order Information
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label
                      style={{ fontSize: 'var(--text-sm)' }}
                      className="text-foreground"
                    >
                      SO Number <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      value={formData.so_number}
                      onChange={(e) => updateFormField('so_number', e.target.value)}
                      placeholder="SO-2024-006"
                      style={{ fontSize: 'var(--text-sm)' }}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label style={{ fontSize: 'var(--text-sm)' }} className="text-foreground">
                      Customer Name
                    </Label>
                    <Input
                      value={formData.customer_name || ''}
                      onChange={(e) => updateFormField('customer_name', e.target.value)}
                      placeholder="Customer name"
                      style={{ fontSize: 'var(--text-sm)' }}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label style={{ fontSize: 'var(--text-sm)' }} className="text-foreground">
                      Warehouse
                    </Label>
                    <Select
                      value={formData.warehouse_id ? String(formData.warehouse_id) : ''}
                      onValueChange={(val) => updateFormField('warehouse_id', Number(val))}
                    >
                      <SelectTrigger style={{ fontSize: 'var(--text-sm)' }}>
                        <SelectValue placeholder="Select warehouse" />
                      </SelectTrigger>
                      <SelectContent>
                        {mockWarehouses.map((w) => (
                          <SelectItem key={w.id} value={String(w.id)}>
                            {w.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label style={{ fontSize: 'var(--text-sm)' }} className="text-foreground">
                      Order Date
                    </Label>
                    <Input
                      type="date"
                      value={formData.order_date}
                      onChange={(e) => updateFormField('order_date', e.target.value)}
                      style={{ fontSize: 'var(--text-sm)' }}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label style={{ fontSize: 'var(--text-sm)' }} className="text-foreground">
                      Expected Ship Date
                    </Label>
                    <Input
                      type="date"
                      value={formData.expected_ship_date || ''}
                      onChange={(e) => updateFormField('expected_ship_date', e.target.value)}
                      style={{ fontSize: 'var(--text-sm)' }}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label style={{ fontSize: 'var(--text-sm)' }} className="text-foreground">
                      Delivery Date
                    </Label>
                    <Input
                      type="date"
                      value={formData.delivery_date || ''}
                      onChange={(e) => updateFormField('delivery_date', e.target.value)}
                      style={{ fontSize: 'var(--text-sm)' }}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label style={{ fontSize: 'var(--text-sm)' }} className="text-foreground">
                      Status
                    </Label>
                    <Select
                      value={formData.status || 'draft'}
                      onValueChange={(val) => updateFormField('status', val as SOStatus)}
                    >
                      <SelectTrigger style={{ fontSize: 'var(--text-sm)' }}>
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        {SO_STATUSES.map((s) => (
                          <SelectItem key={s.value} value={s.value}>
                            {s.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label style={{ fontSize: 'var(--text-sm)' }} className="text-foreground">
                      Payment Status
                    </Label>
                    <Select
                      value={formData.payment_status || 'unpaid'}
                      onValueChange={(val) => updateFormField('payment_status', val as PaymentStatus)}
                    >
                      <SelectTrigger style={{ fontSize: 'var(--text-sm)' }}>
                        <SelectValue placeholder="Select payment status" />
                      </SelectTrigger>
                      <SelectContent>
                        {PAYMENT_STATUSES.map((p) => (
                          <SelectItem key={p.value} value={p.value}>
                            {p.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2 sm:col-span-2">
                    <Label style={{ fontSize: 'var(--text-sm)' }} className="text-foreground">
                      Payment Method
                    </Label>
                    <Input
                      value={formData.payment_method || ''}
                      onChange={(e) => updateFormField('payment_method', e.target.value)}
                      placeholder="e.g. UPI, Bank Transfer, Credit Card"
                      style={{ fontSize: 'var(--text-sm)' }}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label style={{ fontSize: 'var(--text-sm)' }} className="text-foreground">
                      Shipping Address
                    </Label>
                    <Textarea
                      value={formData.shipping_address || ''}
                      onChange={(e) => updateFormField('shipping_address', e.target.value)}
                      placeholder="Shipping address"
                      rows={2}
                      style={{ fontSize: 'var(--text-sm)' }}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label style={{ fontSize: 'var(--text-sm)' }} className="text-foreground">
                      Billing Address
                    </Label>
                    <Textarea
                      value={formData.billing_address || ''}
                      onChange={(e) => updateFormField('billing_address', e.target.value)}
                      placeholder="Billing address"
                      rows={2}
                      style={{ fontSize: 'var(--text-sm)' }}
                    />
                  </div>

                  <div className="space-y-2 sm:col-span-2">
                    <Label style={{ fontSize: 'var(--text-sm)' }} className="text-foreground">
                      Notes
                    </Label>
                    <Textarea
                      value={formData.notes || ''}
                      onChange={(e) => updateFormField('notes', e.target.value)}
                      placeholder="Additional notes..."
                      rows={2}
                      style={{ fontSize: 'var(--text-sm)' }}
                    />
                  </div>
                </div>
              </div>

              {/* ── Line Items ─────────────────────────────────────────── */}
              <div className="glass-surface rounded-xl p-4 space-y-4">
                <div className="flex items-center justify-between">
                  <h4
                    className="font-semibold"
                    style={{
                      fontSize: 'var(--text-sm)',
                      letterSpacing: 'var(--tracking-tight)',
                    }}
                  >
                    Line Items
                  </h4>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="gap-1.5 press-scale"
                    style={{ fontSize: 'var(--text-xs)' }}
                    onClick={addLineItem}
                  >
                    <Plus className="h-3.5 w-3.5" strokeWidth={1.8} />
                    Add Item
                  </Button>
                </div>

                {formData.items.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-8 text-muted-foreground">
                    <Package className="h-8 w-8 opacity-20 mb-2" strokeWidth={1.5} />
                    <p style={{ fontSize: 'var(--text-sm)' }}>No line items added</p>
                    <p style={{ fontSize: 'var(--text-xs)' }}>Click "Add Item" to add products</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {formData.items.map((item, index) => (
                      <div
                        key={index}
                        className="border border-glass-border/40 rounded-lg p-3 space-y-3 bg-glass-bg/30"
                      >
                        <div className="flex items-center justify-between">
                          <span
                            className="text-muted-foreground font-medium"
                            style={{ fontSize: 'var(--text-xs)' }}
                          >
                            Item #{index + 1}
                          </span>
                          {formData.items.length > 1 && (
                            <Button
                              type="button"
                              variant="ghost"
                              size="icon"
                              className="h-7 w-7 text-red-500 hover:text-red-600 hover:bg-red-500/10 press-scale"
                              onClick={() => removeLineItem(index)}
                              aria-label={`Remove item ${index + 1}`}
                            >
                              <X className="h-3.5 w-3.5" strokeWidth={1.8} />
                            </Button>
                          )}
                        </div>

                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                          <div className="space-y-1.5 sm:col-span-2 lg:col-span-1">
                            <Label style={{ fontSize: 'var(--text-xs)' }} className="text-muted-foreground">
                              Product
                            </Label>
                            <Select
                              value={item.product_id ? String(item.product_id) : ''}
                              onValueChange={(val) => {
                                const productId = Number(val);
                                const product = mockProducts.find((p) => p.id === productId);
                                updateLineItem(index, 'product_id', productId);
                                if (product) {
                                  updateLineItem(index, 'unit_price', product.selling_price || 0);
                                  updateLineItem(index, 'tax_rate', product.tax_rate || 0);
                                }
                              }}
                            >
                              <SelectTrigger style={{ fontSize: 'var(--text-xs)' }}>
                                <SelectValue placeholder="Select product" />
                              </SelectTrigger>
                              <SelectContent>
                                {mockProducts.map((p) => (
                                  <SelectItem key={p.id} value={String(p.id)}>
                                    {p.name}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>

                          <div className="space-y-1.5">
                            <Label style={{ fontSize: 'var(--text-xs)' }} className="text-muted-foreground">
                              Qty Ordered
                            </Label>
                            <Input
                              type="number"
                              min={1}
                              value={item.quantity_ordered}
                              onChange={(e) => updateLineItem(index, 'quantity_ordered', Number(e.target.value))}
                              style={{ fontSize: 'var(--text-xs)' }}
                            />
                          </div>

                          <div className="space-y-1.5">
                            <Label style={{ fontSize: 'var(--text-xs)' }} className="text-muted-foreground">
                              Unit Price
                            </Label>
                            <Input
                              type="number"
                              min={0}
                              step={0.01}
                              value={item.unit_price}
                              onChange={(e) => updateLineItem(index, 'unit_price', Number(e.target.value))}
                              style={{ fontSize: 'var(--text-xs)' }}
                            />
                          </div>

                          <div className="space-y-1.5">
                            <Label style={{ fontSize: 'var(--text-xs)' }} className="text-muted-foreground">
                              Tax Rate %
                            </Label>
                            <Input
                              type="number"
                              min={0}
                              max={100}
                              step={0.1}
                              value={item.tax_rate}
                              onChange={(e) => updateLineItem(index, 'tax_rate', Number(e.target.value))}
                              style={{ fontSize: 'var(--text-xs)' }}
                            />
                          </div>

                          <div className="space-y-1.5">
                            <Label style={{ fontSize: 'var(--text-xs)' }} className="text-muted-foreground">
                              Discount %
                            </Label>
                            <Input
                              type="number"
                              min={0}
                              max={100}
                              step={0.1}
                              value={item.discount_percent}
                              onChange={(e) => updateLineItem(index, 'discount_percent', Number(e.target.value))}
                              style={{ fontSize: 'var(--text-xs)' }}
                            />
                          </div>

                          <div className="space-y-1.5">
                            <Label style={{ fontSize: 'var(--text-xs)' }} className="text-muted-foreground">
                              Total
                            </Label>
                            <div
                              className="h-8 flex items-center px-3 rounded-md border border-glass-border/50 bg-glass-bg/50 font-medium"
                              style={{ fontSize: 'var(--text-xs)' }}
                            >
                              {formatCurrency(
                                item.quantity_ordered *
                                  item.unit_price *
                                  (1 - (item.discount_percent ?? 0) / 100) *
                                  (1 + (item.tax_rate ?? 0) / 100),
                                'INR'
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* ── Calculated Totals ──────────────────────────────────── */}
                {formData.items.length > 0 && (
                  <div className="border-t border-glass-border pt-3">
                    <div className="flex flex-col items-end gap-1.5">
                      <div className="flex items-center gap-8">
                        <span className="text-muted-foreground" style={{ fontSize: 'var(--text-sm)' }}>
                          Subtotal
                        </span>
                        <span className="font-medium" style={{ fontSize: 'var(--text-sm)' }}>
                          {formatCurrency(calculatedTotals.subtotal, 'INR')}
                        </span>
                      </div>
                      <div className="flex items-center gap-8">
                        <span className="text-muted-foreground" style={{ fontSize: 'var(--text-sm)' }}>
                          Tax
                        </span>
                        <span className="font-medium" style={{ fontSize: 'var(--text-sm)' }}>
                          {formatCurrency(calculatedTotals.taxAmount, 'INR')}
                        </span>
                      </div>
                      <div className="flex items-center gap-8">
                        <span className="text-muted-foreground" style={{ fontSize: 'var(--text-sm)' }}>
                          Discount
                        </span>
                        <span className="font-medium" style={{ fontSize: 'var(--text-sm)' }}>
                          -{formatCurrency(calculatedTotals.discountAmount, 'INR')}
                        </span>
                      </div>
                      <div className="flex items-center gap-8 pt-1 border-t border-glass-border w-full justify-end">
                        <span className="font-bold" style={{ fontSize: 'var(--text-base)' }}>
                          Total
                        </span>
                        <span className="font-bold text-module-erp" style={{ fontSize: 'var(--text-base)' }}>
                          {formatCurrency(calculatedTotals.totalAmount, 'INR')}
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => formModal.close()}
                disabled={isSubmitting}
                style={{ fontSize: 'var(--text-sm)' }}
              >
                Cancel
              </Button>
              <Button
                className="bg-module-erp hover:bg-module-erp/90 text-white press-scale"
                onClick={handleSubmit}
                disabled={isSubmitting || !formData.so_number}
                style={{ fontSize: 'var(--text-sm)' }}
              >
                {isSubmitting
                  ? 'Saving...'
                  : editingOrder
                    ? 'Update Order'
                    : 'Create Order'}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* ══════════════════════════════════════════════════════════════════
            DELETE CONFIRMATION DIALOG
            ══════════════════════════════════════════════════════════════════ */}
        <ConfirmDialog
          open={deleteModal.isOpen}
          onOpenChange={deleteModal.setIsOpen}
          title="Delete Sales Order"
          description={`Are you sure you want to delete sales order "${deletingOrder?.so_number || ''}"? This action cannot be undone.`}
          confirmLabel="Delete"
          variant="destructive"
          onConfirm={confirmDelete}
          isLoading={isSubmitting}
        />
      </div>
    </PageTransition>
  );
}
