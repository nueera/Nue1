'use client';

import { useState, useMemo, useCallback } from 'react';
import { motion } from 'framer-motion';
import {
  Plus,
  Eye,
  Pencil,
  Trash2,
  MoreHorizontal,
  FileText,
  ShoppingCart,
  X,
} from 'lucide-react';

import { PageTransition } from '@/modules/erp/design-system/components/animations';
import { SmartTable } from '@/modules/erp/shared/components/smart-table';
import { StatusBadge } from '@/modules/erp/shared/components/status-badge';
import { ConfirmDialog } from '@/modules/erp/shared/components/confirm-dialog';
import { EmptyState } from '@/modules/erp/shared/components/empty-state';
import { useModal } from '@/modules/erp/shared/hooks';

import { erpService } from '@/lib/services';
import {
  mockPurchaseOrders,
  mockSuppliers,
  mockWarehouses,
  mockProducts,
} from '@/modules/erp/data/mock/operations.mock';
import type {
  PurchaseOrder,
  PurchaseOrderCreate,
  PurchaseOrderUpdate,
  PurchaseOrderItemCreate,
  POStatus,
  PaymentStatus,
} from '@/modules/erp/types/erp-operations';
import { PO_STATUSES, PAYMENT_STATUSES } from '@/modules/erp/core/utils/constants';
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
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Textarea } from '@/components/ui/textarea';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Separator } from '@/components/ui/separator';

import type { ColumnDef } from '@tanstack/react-table';

// ── Animation easing ────────────────────────────────────────────────────────
const EASE_STANDARD = [0.25, 0.46, 0.45, 0.94] as const;

// ── Form line item type ─────────────────────────────────────────────────────
interface FormLineItem {
  id: string;
  product_id: string;
  quantity_ordered: number;
  unit_price: number;
  tax_rate: number;
  discount_percent: number;
  total_price: number;
}

// ── Form state type ─────────────────────────────────────────────────────────
interface POFormState {
  po_number: string;
  supplier_id: string;
  warehouse_id: string;
  order_date: string;
  expected_delivery_date: string;
  status: POStatus;
  payment_status: PaymentStatus;
  payment_method: string;
  notes: string;
  internal_notes: string;
  shipping_cost: number;
  items: FormLineItem[];
}

const initialFormState: POFormState = {
  po_number: '',
  supplier_id: '',
  warehouse_id: '',
  order_date: new Date().toISOString().split('T')[0],
  expected_delivery_date: '',
  status: 'draft',
  payment_status: 'unpaid',
  payment_method: '',
  notes: '',
  internal_notes: '',
  shipping_cost: 0,
  items: [],
};

// ── Helper: compute line total ──────────────────────────────────────────────
function computeLineTotal(item: FormLineItem): number {
  const base = item.quantity_ordered * item.unit_price;
  const discount = base * (item.discount_percent / 100);
  const afterDiscount = base - discount;
  const tax = afterDiscount * (item.tax_rate / 100);
  return afterDiscount + tax;
}

// ── Helper: generate unique id for line items ──────────────────────────────
let lineItemCounter = 0;
function newLineItemId(): string {
  lineItemCounter += 1;
  return `line-${Date.now()}-${lineItemCounter}`;
}

function createEmptyLineItem(): FormLineItem {
  return {
    id: newLineItemId(),
    product_id: '',
    quantity_ordered: 1,
    unit_price: 0,
    tax_rate: 0,
    discount_percent: 0,
    total_price: 0,
  };
}

// ============================================================================
// Main Page Component
// ============================================================================

export default function PurchaseOrdersPage() {
  // ── Data state ──────────────────────────────────────────────────────────
  const [purchaseOrders, setPurchaseOrders] = useState<PurchaseOrder[]>(mockPurchaseOrders);
  const [isLoading, setIsLoading] = useState(false);

  // ── Filter state ────────────────────────────────────────────────────────
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [paymentFilter, setPaymentFilter] = useState<string>('all');

  // ── Modal state ─────────────────────────────────────────────────────────
  const viewModal = useModal();
  const formModal = useModal();
  const deleteModal = useModal();

  // ── Selected PO for view/edit/delete ────────────────────────────────────
  const [selectedPO, setSelectedPO] = useState<PurchaseOrder | null>(null);
  const [editingPO, setEditingPO] = useState<PurchaseOrder | null>(null);
  const [deletingPO, setDeletingPO] = useState<PurchaseOrder | null>(null);

  // ── Form state ──────────────────────────────────────────────────────────
  const [form, setForm] = useState<POFormState>(initialFormState);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // ── Filtered data ───────────────────────────────────────────────────────
  const filteredData = useMemo(() => {
    let data = purchaseOrders;
    if (statusFilter !== 'all') {
      data = data.filter((po) => po.status === statusFilter);
    }
    if (paymentFilter !== 'all') {
      data = data.filter((po) => po.payment_status === paymentFilter);
    }
    return data;
  }, [purchaseOrders, statusFilter, paymentFilter]);

  // ── Computed totals from form items ─────────────────────────────────────
  const formTotals = useMemo(() => {
    const subtotal = form.items.reduce((sum, item) => {
      const base = item.quantity_ordered * item.unit_price;
      const discount = base * (item.discount_percent / 100);
      return sum + (base - discount);
    }, 0);
    const taxAmount = form.items.reduce((sum, item) => {
      const base = item.quantity_ordered * item.unit_price;
      const discount = base * (item.discount_percent / 100);
      const afterDiscount = base - discount;
      return sum + afterDiscount * (item.tax_rate / 100);
    }, 0);
    const total = subtotal + taxAmount + form.shipping_cost;
    return { subtotal, taxAmount, total };
  }, [form.items, form.shipping_cost]);

  // ── Handlers ────────────────────────────────────────────────────────────
  const handleView = useCallback((po: PurchaseOrder) => {
    setSelectedPO(po);
    viewModal.open();
  }, [viewModal]);

  const handleEdit = useCallback((po: PurchaseOrder) => {
    setEditingPO(po);
    setForm({
      po_number: po.po_number,
      supplier_id: String(po.supplier_id),
      warehouse_id: String(po.warehouse_id),
      order_date: po.order_date,
      expected_delivery_date: po.expected_delivery_date || '',
      status: po.status,
      payment_status: po.payment_status,
      payment_method: po.payment_method || '',
      notes: po.notes || '',
      internal_notes: po.internal_notes || '',
      shipping_cost: po.shipping_cost,
      items: po.items.map((item) => ({
        id: newLineItemId(),
        product_id: String(item.product_id),
        quantity_ordered: item.quantity_ordered,
        unit_price: item.unit_price,
        tax_rate: item.tax_rate,
        discount_percent: item.discount_percent,
        total_price: item.total_price,
      })),
    });
    formModal.open();
  }, [formModal]);

  const handleCreate = useCallback(() => {
    setEditingPO(null);
    // Generate a new PO number
    const nextNum = purchaseOrders.length + 1;
    const newPoNumber = `PO-2024-${String(nextNum).padStart(3, '0')}`;
    setForm({
      ...initialFormState,
      po_number: newPoNumber,
      order_date: new Date().toISOString().split('T')[0],
    });
    formModal.open();
  }, [formModal, purchaseOrders.length]);

  const handleDelete = useCallback((po: PurchaseOrder) => {
    setDeletingPO(po);
    deleteModal.open();
  }, [deleteModal]);

  const confirmDelete = useCallback(async () => {
    if (!deletingPO) return;
    setIsSubmitting(true);
    try {
      // Try API first, fallback to mock
      try {
        await erpService.deletePurchaseOrder(deletingPO.id);
      } catch {
        // Mock: remove locally
      }
      setPurchaseOrders((prev) => prev.filter((po) => po.id !== deletingPO.id));
      deleteModal.close();
      setDeletingPO(null);
    } finally {
      setIsSubmitting(false);
    }
  }, [deletingPO, deleteModal]);

  const handleSubmit = useCallback(async () => {
    if (!form.po_number || !form.supplier_id || !form.warehouse_id) return;
    setIsSubmitting(true);
    try {
      const formItems: PurchaseOrderItemCreate[] = form.items.map((item) => ({
        product_id: Number(item.product_id),
        quantity_ordered: item.quantity_ordered,
        unit_price: item.unit_price,
        tax_rate: item.tax_rate,
        discount_percent: item.discount_percent,
        total_price: computeLineTotal(item),
        notes: null,
      }));

      if (editingPO) {
        // Update
        const updateData: PurchaseOrderUpdate = {
          po_number: form.po_number,
          supplier_id: Number(form.supplier_id),
          warehouse_id: Number(form.warehouse_id),
          order_date: form.order_date,
          expected_delivery_date: form.expected_delivery_date || null,
          status: form.status,
          payment_status: form.payment_status,
          payment_method: form.payment_method || null,
          notes: form.notes || null,
          internal_notes: form.internal_notes || null,
          shipping_cost: form.shipping_cost,
          subtotal: formTotals.subtotal,
          tax_amount: formTotals.taxAmount,
          total_amount: formTotals.total,
          items: formItems,
        };
        try {
          await erpService.updatePurchaseOrder(editingPO.id, updateData);
        } catch {
          // Mock update locally
        }
        setPurchaseOrders((prev) =>
          prev.map((po) => {
            if (po.id !== editingPO.id) return po;
            const supplier = mockSuppliers.find((s) => s.id === Number(form.supplier_id));
            const warehouse = mockWarehouses.find((w) => w.id === Number(form.warehouse_id));
            return {
              ...po,
              ...updateData,
              supplier_name: supplier?.name,
              warehouse_name: warehouse?.name,
              items: formItems.map((fi, idx) => {
                const product = mockProducts.find((p) => p.id === fi.product_id);
                return {
                  id: po.items[idx]?.id ?? idx + 1,
                  purchase_order_id: po.id,
                  product_id: fi.product_id,
                  quantity_ordered: fi.quantity_ordered,
                  quantity_received: po.items[idx]?.quantity_received ?? 0,
                  unit_price: fi.unit_price,
                  tax_rate: fi.tax_rate,
                  discount_percent: fi.discount_percent,
                  total_price: fi.total_price,
                  notes: fi.notes,
                  created_at: po.items[idx]?.created_at ?? new Date().toISOString(),
                  updated_at: new Date().toISOString(),
                  product_name: product?.name,
                  product_sku: product?.sku,
                };
              }),
            } as PurchaseOrder;
          })
        );
      } else {
        // Create
        const createData: PurchaseOrderCreate = {
          po_number: form.po_number,
          supplier_id: Number(form.supplier_id),
          warehouse_id: Number(form.warehouse_id),
          order_date: form.order_date,
          expected_delivery_date: form.expected_delivery_date || null,
          status: form.status,
          payment_status: form.payment_status,
          payment_method: form.payment_method || null,
          notes: form.notes || null,
          internal_notes: form.internal_notes || null,
          shipping_cost: form.shipping_cost,
          subtotal: formTotals.subtotal,
          tax_amount: formTotals.taxAmount,
          total_amount: formTotals.total,
          items: formItems,
        };
        let newPO: PurchaseOrder | null = null;
        try {
          const result = await erpService.createPurchaseOrder(createData);
          newPO = result as PurchaseOrder;
        } catch {
          // Mock: create locally
          const supplier = mockSuppliers.find((s) => s.id === Number(form.supplier_id));
          const warehouse = mockWarehouses.find((w) => w.id === Number(form.warehouse_id));
          const maxId = purchaseOrders.reduce((max, po) => Math.max(max, po.id), 0);
          newPO = {
            id: maxId + 1,
            po_number: createData.po_number,
            supplier_id: createData.supplier_id,
            warehouse_id: createData.warehouse_id,
            order_date: createData.order_date,
            expected_delivery_date: createData.expected_delivery_date ?? null,
            actual_delivery_date: null,
            status: createData.status ?? 'draft',
            subtotal: createData.subtotal ?? formTotals.subtotal,
            tax_amount: createData.tax_amount ?? formTotals.taxAmount,
            shipping_cost: createData.shipping_cost ?? 0,
            total_amount: createData.total_amount ?? formTotals.total,
            currency: 'INR',
            payment_status: createData.payment_status ?? 'unpaid',
            payment_method: createData.payment_method ?? null,
            notes: createData.notes ?? null,
            internal_notes: createData.internal_notes ?? null,
            items: formItems.map((fi, idx) => {
              const product = mockProducts.find((p) => p.id === fi.product_id);
              return {
                id: idx + 1,
                purchase_order_id: maxId + 1,
                product_id: fi.product_id,
                quantity_ordered: fi.quantity_ordered,
                quantity_received: 0,
                unit_price: fi.unit_price,
                tax_rate: fi.tax_rate ?? 0,
                discount_percent: fi.discount_percent ?? 0,
                total_price: fi.total_price ?? 0,
                notes: fi.notes ?? null,
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString(),
                product_name: product?.name ?? null,
                product_sku: product?.sku ?? null,
              };
            }),
            owner_id: null,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
            supplier_name: supplier?.name ?? null,
            warehouse_name: warehouse?.name ?? null,
          };
        }
        if (newPO) {
          setPurchaseOrders((prev) => [newPO!, ...prev]);
        }
      }
      formModal.close();
      setEditingPO(null);
    } finally {
      setIsSubmitting(false);
    }
  }, [form, editingPO, formTotals, formModal, purchaseOrders]);

  // ── Form update helpers ─────────────────────────────────────────────────
  const updateForm = useCallback((field: keyof POFormState, value: string | number) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  }, []);

  const updateLineItem = useCallback((itemId: string, field: keyof FormLineItem, value: string | number) => {
    setForm((prev) => ({
      ...prev,
      items: prev.items.map((item) => {
        if (item.id !== itemId) return item;
        const updated = { ...item, [field]: value };
        // Auto-calculate total when numeric fields change
        if (['quantity_ordered', 'unit_price', 'tax_rate', 'discount_percent'].includes(field)) {
          updated.total_price = computeLineTotal(updated);
        }
        // Auto-fill unit_price and tax_rate from product selection
        if (field === 'product_id') {
          const product = mockProducts.find((p) => p.id === Number(value));
          if (product) {
            updated.unit_price = product.cost_price ?? 0;
            updated.tax_rate = product.tax_rate ?? 0;
            updated.total_price = computeLineTotal(updated);
          }
        }
        return updated;
      }),
    }));
  }, []);

  const addLineItem = useCallback(() => {
    setForm((prev) => ({
      ...prev,
      items: [...prev.items, createEmptyLineItem()],
    }));
  }, []);

  const removeLineItem = useCallback((itemId: string) => {
    setForm((prev) => ({
      ...prev,
      items: prev.items.filter((item) => item.id !== itemId),
    }));
  }, []);

  // ── Table columns ───────────────────────────────────────────────────────
  const columns = useMemo<ColumnDef<PurchaseOrder>[]>(
    () => [
      {
        accessorKey: 'po_number',
        header: 'PO Number',
        size: 140,
        cell: ({ row }) => (
          <span className="font-semibold text-module-erp">
            {row.original.po_number}
          </span>
        ),
      },
      {
        accessorKey: 'supplier_name',
        header: 'Supplier',
        size: 180,
        cell: ({ row }) => (
          <span className="text-foreground">
            {row.original.supplier_name || '\u2014'}
          </span>
        ),
      },
      {
        accessorKey: 'warehouse_name',
        header: 'Warehouse',
        size: 180,
        cell: ({ row }) => (
          <span className="text-foreground">
            {row.original.warehouse_name || '\u2014'}
          </span>
        ),
      },
      {
        accessorKey: 'order_date',
        header: 'Order Date',
        size: 130,
        cell: ({ row }) => (
          <span className="text-muted-foreground">
            {formatDate(row.original.order_date)}
          </span>
        ),
      },
      {
        accessorKey: 'expected_delivery_date',
        header: 'Expected Delivery',
        size: 150,
        cell: ({ row }) => (
          <span className="text-muted-foreground">
            {row.original.expected_delivery_date
              ? formatDate(row.original.expected_delivery_date)
              : '\u2014'}
          </span>
        ),
      },
      {
        accessorKey: 'total_amount',
        header: 'Total Amount',
        size: 150,
        cell: ({ row }) => (
          <span className="font-semibold text-foreground">
            {formatCurrency(row.original.total_amount, row.original.currency || 'INR')}
          </span>
        ),
      },
      {
        accessorKey: 'status',
        header: 'Status',
        size: 120,
        cell: ({ row }) => <StatusBadge status={row.original.status} />,
      },
      {
        accessorKey: 'payment_status',
        header: 'Payment',
        size: 120,
        cell: ({ row }) => <StatusBadge status={row.original.payment_status} />,
      },
      {
        id: 'actions',
        header: '',
        size: 60,
        cell: ({ row }) => (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 press-scale"
                onClick={(e) => e.stopPropagation()}
              >
                <MoreHorizontal className="h-4 w-4" strokeWidth={1.8} />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-40">
              <DropdownMenuItem onClick={() => handleView(row.original)}>
                <Eye className="h-3.5 w-3.5 mr-2" strokeWidth={1.8} />
                View
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleEdit(row.original)}>
                <Pencil className="h-3.5 w-3.5 mr-2" strokeWidth={1.8} />
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => handleDelete(row.original)}
                className="text-red-600 focus:text-red-600 focus:bg-red-50 dark:focus:bg-red-950/30"
              >
                <Trash2 className="h-3.5 w-3.5 mr-2" strokeWidth={1.8} />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ),
      },
    ],
    [handleView, handleEdit, handleDelete]
  );

  // ── Row click handler ───────────────────────────────────────────────────
  const handleRowClick = useCallback(
    (po: PurchaseOrder) => {
      handleView(po);
    },
    [handleView]
  );

  // ── Render ──────────────────────────────────────────────────────────────
  return (
    <PageTransition>
      <div className="p-4 sm:p-6 lg:p-8 space-y-6">
        {/* ── Header ─────────────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.18, ease: EASE_STANDARD }}
          className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
        >
          <div>
            <h1
              className="text-foreground font-semibold"
              style={{
                fontSize: 'var(--text-xl)',
                letterSpacing: 'var(--tracking-tight)',
                lineHeight: 'var(--leading-tight)',
              }}
            >
              Purchase Orders
            </h1>
            <p
              className="text-muted-foreground mt-1"
              style={{
                fontSize: 'var(--text-sm)',
                letterSpacing: 'var(--tracking-normal)',
              }}
            >
              Track procurement from suppliers
            </p>
          </div>
          <Button
            onClick={handleCreate}
            className="bg-module-erp hover:bg-module-erp/90 text-white press-scale gap-2 self-start"
          >
            <Plus className="h-4 w-4" strokeWidth={2} />
            New Purchase Order
          </Button>
        </motion.div>

        {/* ── Filter Bar ─────────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.18, ease: EASE_STANDARD, delay: 0.03 }}
          className="glass-surface rounded-xl p-4 flex flex-col sm:flex-row gap-3"
        >
          <div className="flex-1 min-w-[180px]">
            <Label
              className="text-muted-foreground mb-1.5 block"
              style={{ fontSize: 'var(--text-xs)', letterSpacing: 'var(--tracking-wide)' }}
            >
              Status
            </Label>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="All Statuses" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                {PO_STATUSES.map((s) => (
                  <SelectItem key={s.value} value={s.value}>
                    {s.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex-1 min-w-[180px]">
            <Label
              className="text-muted-foreground mb-1.5 block"
              style={{ fontSize: 'var(--text-xs)', letterSpacing: 'var(--tracking-wide)' }}
            >
              Payment Status
            </Label>
            <Select value={paymentFilter} onValueChange={setPaymentFilter}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="All Payment" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Payment</SelectItem>
                {PAYMENT_STATUSES.map((s) => (
                  <SelectItem key={s.value} value={s.value}>
                    {s.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          {(statusFilter !== 'all' || paymentFilter !== 'all') && (
            <div className="flex items-end">
              <Button
                variant="ghost"
                size="sm"
                className="press-scale text-muted-foreground"
                onClick={() => {
                  setStatusFilter('all');
                  setPaymentFilter('all');
                }}
              >
                <X className="h-3.5 w-3.5 mr-1" strokeWidth={1.8} />
                Clear
              </Button>
            </div>
          )}
        </motion.div>

        {/* ── SmartTable ─────────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.28, ease: EASE_STANDARD, delay: 0.06 }}
        >
          {filteredData.length === 0 && !isLoading ? (
            <EmptyState
              icon={ShoppingCart}
              title="No purchase orders found"
              description="Create your first purchase order to start tracking procurement from suppliers."
              action={{ label: 'New Purchase Order', onClick: handleCreate }}
            />
          ) : (
            <SmartTable
              data={filteredData}
              columns={columns}
              searchable
              searchPlaceholder="Search purchase orders..."
              pageSize={10}
              onRowClick={handleRowClick}
              isLoading={isLoading}
              emptyMessage="No purchase orders found"
              emptyDescription="Try adjusting your search or filters"
            />
          )}
        </motion.div>

        {/* ── View PO Detail Dialog ──────────────────────────────────────── */}
        <Dialog open={viewModal.isOpen} onOpenChange={viewModal.setIsOpen}>
          <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
            {selectedPO && (
              <>
                <DialogHeader>
                  <DialogTitle
                    className="flex items-center gap-3"
                    style={{
                      fontSize: 'var(--text-lg)',
                      letterSpacing: 'var(--tracking-tight)',
                      lineHeight: 'var(--leading-tight)',
                    }}
                  >
                    <FileText className="h-5 w-5 text-module-erp" strokeWidth={1.8} />
                    {selectedPO.po_number}
                  </DialogTitle>
                  <DialogDescription>
                    Purchase order details and line items
                  </DialogDescription>
                </DialogHeader>

                {/* PO Header Info */}
                <div className="glass-surface rounded-xl p-4 space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div>
                      <Label
                        className="text-muted-foreground"
                        style={{ fontSize: 'var(--text-xs)', letterSpacing: 'var(--tracking-wide)' }}
                      >
                        PO Number
                      </Label>
                      <p className="font-semibold text-module-erp" style={{ fontSize: 'var(--text-sm)' }}>
                        {selectedPO.po_number}
                      </p>
                    </div>
                    <div>
                      <Label
                        className="text-muted-foreground"
                        style={{ fontSize: 'var(--text-xs)', letterSpacing: 'var(--tracking-wide)' }}
                      >
                        Supplier
                      </Label>
                      <p className="font-medium text-foreground" style={{ fontSize: 'var(--text-sm)' }}>
                        {selectedPO.supplier_name || '\u2014'}
                      </p>
                    </div>
                    <div>
                      <Label
                        className="text-muted-foreground"
                        style={{ fontSize: 'var(--text-xs)', letterSpacing: 'var(--tracking-wide)' }}
                      >
                        Warehouse
                      </Label>
                      <p className="font-medium text-foreground" style={{ fontSize: 'var(--text-sm)' }}>
                        {selectedPO.warehouse_name || '\u2014'}
                      </p>
                    </div>
                    <div>
                      <Label
                        className="text-muted-foreground"
                        style={{ fontSize: 'var(--text-xs)', letterSpacing: 'var(--tracking-wide)' }}
                      >
                        Order Date
                      </Label>
                      <p className="text-foreground" style={{ fontSize: 'var(--text-sm)' }}>
                        {formatDate(selectedPO.order_date)}
                      </p>
                    </div>
                    <div>
                      <Label
                        className="text-muted-foreground"
                        style={{ fontSize: 'var(--text-xs)', letterSpacing: 'var(--tracking-wide)' }}
                      >
                        Expected Delivery
                      </Label>
                      <p className="text-foreground" style={{ fontSize: 'var(--text-sm)' }}>
                        {selectedPO.expected_delivery_date
                          ? formatDate(selectedPO.expected_delivery_date)
                          : '\u2014'}
                      </p>
                    </div>
                    <div>
                      <Label
                        className="text-muted-foreground"
                        style={{ fontSize: 'var(--text-xs)', letterSpacing: 'var(--tracking-wide)' }}
                      >
                        Actual Delivery
                      </Label>
                      <p className="text-foreground" style={{ fontSize: 'var(--text-sm)' }}>
                        {selectedPO.actual_delivery_date
                          ? formatDate(selectedPO.actual_delivery_date)
                          : '\u2014'}
                      </p>
                    </div>
                    <div>
                      <Label
                        className="text-muted-foreground"
                        style={{ fontSize: 'var(--text-xs)', letterSpacing: 'var(--tracking-wide)' }}
                      >
                        Status
                      </Label>
                      <div className="mt-1">
                        <StatusBadge status={selectedPO.status} />
                      </div>
                    </div>
                    <div>
                      <Label
                        className="text-muted-foreground"
                        style={{ fontSize: 'var(--text-xs)', letterSpacing: 'var(--tracking-wide)' }}
                      >
                        Payment Status
                      </Label>
                      <div className="mt-1">
                        <StatusBadge status={selectedPO.payment_status} />
                      </div>
                    </div>
                    <div>
                      <Label
                        className="text-muted-foreground"
                        style={{ fontSize: 'var(--text-xs)', letterSpacing: 'var(--tracking-wide)' }}
                      >
                        Payment Method
                      </Label>
                      <p className="text-foreground" style={{ fontSize: 'var(--text-sm)' }}>
                        {selectedPO.payment_method || '\u2014'}
                      </p>
                    </div>
                  </div>

                  {selectedPO.notes && (
                    <div>
                      <Label
                        className="text-muted-foreground"
                        style={{ fontSize: 'var(--text-xs)', letterSpacing: 'var(--tracking-wide)' }}
                      >
                        Notes
                      </Label>
                      <p className="text-foreground mt-1" style={{ fontSize: 'var(--text-sm)' }}>
                        {selectedPO.notes}
                      </p>
                    </div>
                  )}
                  {selectedPO.internal_notes && (
                    <div>
                      <Label
                        className="text-muted-foreground"
                        style={{ fontSize: 'var(--text-xs)', letterSpacing: 'var(--tracking-wide)' }}
                      >
                        Internal Notes
                      </Label>
                      <p className="text-foreground mt-1" style={{ fontSize: 'var(--text-sm)' }}>
                        {selectedPO.internal_notes}
                      </p>
                    </div>
                  )}
                </div>

                {/* Line Items Table */}
                {selectedPO.items.length > 0 && (
                  <div className="space-y-3">
                    <h3
                      className="font-medium text-foreground"
                      style={{
                        fontSize: 'var(--text-sm)',
                        letterSpacing: 'var(--tracking-tight)',
                      }}
                    >
                      Line Items ({selectedPO.items.length})
                    </h3>
                    <div className="glass-surface rounded-xl overflow-hidden">
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
                                Qty Received
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
                                Tax %
                              </TableHead>
                              <TableHead
                                className="text-xs uppercase tracking-widest text-muted-foreground/70 font-medium text-right"
                                style={{ fontSize: 'var(--text-xs)', letterSpacing: 'var(--tracking-wide)' }}
                              >
                                Discount %
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
                            {selectedPO.items.map((item) => (
                              <TableRow
                                key={item.id}
                                className="border-b border-glass-border/20"
                              >
                                <TableCell
                                  className="text-sm"
                                  style={{ fontSize: 'var(--text-sm)' }}
                                >
                                  <div>
                                    <span className="font-medium text-foreground">
                                      {item.product_name || '\u2014'}
                                    </span>
                                    {item.product_sku && (
                                      <span className="text-muted-foreground ml-2" style={{ fontSize: 'var(--text-xs)' }}>
                                        ({item.product_sku})
                                      </span>
                                    )}
                                  </div>
                                </TableCell>
                                <TableCell
                                  className="text-sm text-right"
                                  style={{ fontSize: 'var(--text-sm)' }}
                                >
                                  {item.quantity_ordered}
                                </TableCell>
                                <TableCell
                                  className="text-sm text-right"
                                  style={{ fontSize: 'var(--text-sm)' }}
                                >
                                  {item.quantity_received}
                                </TableCell>
                                <TableCell
                                  className="text-sm text-right"
                                  style={{ fontSize: 'var(--text-sm)' }}
                                >
                                  {formatCurrency(item.unit_price, selectedPO.currency || 'INR')}
                                </TableCell>
                                <TableCell
                                  className="text-sm text-right"
                                  style={{ fontSize: 'var(--text-sm)' }}
                                >
                                  {item.tax_rate}%
                                </TableCell>
                                <TableCell
                                  className="text-sm text-right"
                                  style={{ fontSize: 'var(--text-sm)' }}
                                >
                                  {item.discount_percent}%
                                </TableCell>
                                <TableCell
                                  className="text-sm text-right font-semibold"
                                  style={{ fontSize: 'var(--text-sm)' }}
                                >
                                  {formatCurrency(item.total_price, selectedPO.currency || 'INR')}
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </div>
                    </div>
                  </div>
                )}

                {/* Summary */}
                <div className="glass-surface rounded-xl p-4">
                  <div className="flex flex-col items-end gap-2">
                    <div className="flex justify-between w-full max-w-xs">
                      <span
                        className="text-muted-foreground"
                        style={{ fontSize: 'var(--text-sm)', letterSpacing: 'var(--tracking-normal)' }}
                      >
                        Subtotal
                      </span>
                      <span
                        className="text-foreground"
                        style={{ fontSize: 'var(--text-sm)' }}
                      >
                        {formatCurrency(selectedPO.subtotal, selectedPO.currency || 'INR')}
                      </span>
                    </div>
                    <div className="flex justify-between w-full max-w-xs">
                      <span
                        className="text-muted-foreground"
                        style={{ fontSize: 'var(--text-sm)', letterSpacing: 'var(--tracking-normal)' }}
                      >
                        Tax
                      </span>
                      <span
                        className="text-foreground"
                        style={{ fontSize: 'var(--text-sm)' }}
                      >
                        {formatCurrency(selectedPO.tax_amount, selectedPO.currency || 'INR')}
                      </span>
                    </div>
                    <div className="flex justify-between w-full max-w-xs">
                      <span
                        className="text-muted-foreground"
                        style={{ fontSize: 'var(--text-sm)', letterSpacing: 'var(--tracking-normal)' }}
                      >
                        Shipping
                      </span>
                      <span
                        className="text-foreground"
                        style={{ fontSize: 'var(--text-sm)' }}
                      >
                        {formatCurrency(selectedPO.shipping_cost, selectedPO.currency || 'INR')}
                      </span>
                    </div>
                    <Separator className="my-1" />
                    <div className="flex justify-between w-full max-w-xs">
                      <span
                        className="font-semibold text-foreground"
                        style={{
                          fontSize: 'var(--text-base)',
                          letterSpacing: 'var(--tracking-tight)',
                        }}
                      >
                        Total
                      </span>
                      <span
                        className="font-bold text-module-erp"
                        style={{
                          fontSize: 'var(--text-base)',
                          letterSpacing: 'var(--tracking-tight)',
                        }}
                      >
                        {formatCurrency(selectedPO.total_amount, selectedPO.currency || 'INR')}
                      </span>
                    </div>
                  </div>
                </div>
              </>
            )}
          </DialogContent>
        </Dialog>

        {/* ── Create/Edit PO Dialog ──────────────────────────────────────── */}
        <Dialog open={formModal.isOpen} onOpenChange={formModal.setIsOpen}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle
                style={{
                  fontSize: 'var(--text-lg)',
                  letterSpacing: 'var(--tracking-tight)',
                  lineHeight: 'var(--leading-tight)',
                }}
              >
                {editingPO ? 'Edit Purchase Order' : 'New Purchase Order'}
              </DialogTitle>
              <DialogDescription>
                {editingPO
                  ? 'Update the purchase order details below.'
                  : 'Fill in the details to create a new purchase order.'}
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-6">
              {/* Header Fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="space-y-1.5">
                  <Label
                    htmlFor="po_number"
                    style={{ fontSize: 'var(--text-sm)', letterSpacing: 'var(--tracking-normal)' }}
                  >
                    PO Number <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="po_number"
                    value={form.po_number}
                    onChange={(e) => updateForm('po_number', e.target.value)}
                    placeholder="PO-2024-001"
                    style={{ fontSize: 'var(--text-sm)' }}
                  />
                </div>

                <div className="space-y-1.5">
                  <Label
                    htmlFor="supplier_id"
                    style={{ fontSize: 'var(--text-sm)', letterSpacing: 'var(--tracking-normal)' }}
                  >
                    Supplier <span className="text-red-500">*</span>
                  </Label>
                  <Select
                    value={form.supplier_id}
                    onValueChange={(v) => updateForm('supplier_id', v)}
                  >
                    <SelectTrigger id="supplier_id">
                      <SelectValue placeholder="Select supplier" />
                    </SelectTrigger>
                    <SelectContent>
                      {mockSuppliers
                        .filter((s) => s.is_active)
                        .map((s) => (
                          <SelectItem key={s.id} value={String(s.id)}>
                            {s.name}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-1.5">
                  <Label
                    htmlFor="warehouse_id"
                    style={{ fontSize: 'var(--text-sm)', letterSpacing: 'var(--tracking-normal)' }}
                  >
                    Warehouse <span className="text-red-500">*</span>
                  </Label>
                  <Select
                    value={form.warehouse_id}
                    onValueChange={(v) => updateForm('warehouse_id', v)}
                  >
                    <SelectTrigger id="warehouse_id">
                      <SelectValue placeholder="Select warehouse" />
                    </SelectTrigger>
                    <SelectContent>
                      {mockWarehouses
                        .filter((w) => w.is_active)
                        .map((w) => (
                          <SelectItem key={w.id} value={String(w.id)}>
                            {w.name}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-1.5">
                  <Label
                    htmlFor="order_date"
                    style={{ fontSize: 'var(--text-sm)', letterSpacing: 'var(--tracking-normal)' }}
                  >
                    Order Date
                  </Label>
                  <Input
                    id="order_date"
                    type="date"
                    value={form.order_date}
                    onChange={(e) => updateForm('order_date', e.target.value)}
                    style={{ fontSize: 'var(--text-sm)' }}
                  />
                </div>

                <div className="space-y-1.5">
                  <Label
                    htmlFor="expected_delivery_date"
                    style={{ fontSize: 'var(--text-sm)', letterSpacing: 'var(--tracking-normal)' }}
                  >
                    Expected Delivery
                  </Label>
                  <Input
                    id="expected_delivery_date"
                    type="date"
                    value={form.expected_delivery_date}
                    onChange={(e) => updateForm('expected_delivery_date', e.target.value)}
                    style={{ fontSize: 'var(--text-sm)' }}
                  />
                </div>

                <div className="space-y-1.5">
                  <Label
                    htmlFor="status"
                    style={{ fontSize: 'var(--text-sm)', letterSpacing: 'var(--tracking-normal)' }}
                  >
                    Status
                  </Label>
                  <Select
                    value={form.status}
                    onValueChange={(v) => updateForm('status', v as POStatus)}
                  >
                    <SelectTrigger id="status">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      {PO_STATUSES.map((s) => (
                        <SelectItem key={s.value} value={s.value}>
                          {s.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-1.5">
                  <Label
                    htmlFor="payment_status"
                    style={{ fontSize: 'var(--text-sm)', letterSpacing: 'var(--tracking-normal)' }}
                  >
                    Payment Status
                  </Label>
                  <Select
                    value={form.payment_status}
                    onValueChange={(v) => updateForm('payment_status', v as PaymentStatus)}
                  >
                    <SelectTrigger id="payment_status">
                      <SelectValue placeholder="Select payment status" />
                    </SelectTrigger>
                    <SelectContent>
                      {PAYMENT_STATUSES.map((s) => (
                        <SelectItem key={s.value} value={s.value}>
                          {s.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-1.5">
                  <Label
                    htmlFor="payment_method"
                    style={{ fontSize: 'var(--text-sm)', letterSpacing: 'var(--tracking-normal)' }}
                  >
                    Payment Method
                  </Label>
                  <Select
                    value={form.payment_method}
                    onValueChange={(v) => updateForm('payment_method', v)}
                  >
                    <SelectTrigger id="payment_method">
                      <SelectValue placeholder="Select method" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Bank Transfer">Bank Transfer</SelectItem>
                      <SelectItem value="Credit Card">Credit Card</SelectItem>
                      <SelectItem value="UPI">UPI</SelectItem>
                      <SelectItem value="Cash">Cash</SelectItem>
                      <SelectItem value="Cheque">Cheque</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-1.5">
                  <Label
                    htmlFor="shipping_cost"
                    style={{ fontSize: 'var(--text-sm)', letterSpacing: 'var(--tracking-normal)' }}
                  >
                    Shipping Cost
                  </Label>
                  <Input
                    id="shipping_cost"
                    type="number"
                    min={0}
                    step={0.01}
                    value={form.shipping_cost}
                    onChange={(e) => updateForm('shipping_cost', Number(e.target.value))}
                    placeholder="0.00"
                    style={{ fontSize: 'var(--text-sm)' }}
                  />
                </div>
              </div>

              {/* Notes */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label
                    htmlFor="notes"
                    style={{ fontSize: 'var(--text-sm)', letterSpacing: 'var(--tracking-normal)' }}
                  >
                    Notes
                  </Label>
                  <Textarea
                    id="notes"
                    value={form.notes}
                    onChange={(e) => updateForm('notes', e.target.value)}
                    placeholder="External notes (visible to supplier)"
                    rows={3}
                    style={{ fontSize: 'var(--text-sm)' }}
                  />
                </div>
                <div className="space-y-1.5">
                  <Label
                    htmlFor="internal_notes"
                    style={{ fontSize: 'var(--text-sm)', letterSpacing: 'var(--tracking-normal)' }}
                  >
                    Internal Notes
                  </Label>
                  <Textarea
                    id="internal_notes"
                    value={form.internal_notes}
                    onChange={(e) => updateForm('internal_notes', e.target.value)}
                    placeholder="Internal notes (not visible to supplier)"
                    rows={3}
                    style={{ fontSize: 'var(--text-sm)' }}
                  />
                </div>
              </div>

              {/* ── Line Items ───────────────────────────────────────────── */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3
                    className="font-medium text-foreground"
                    style={{
                      fontSize: 'var(--text-sm)',
                      letterSpacing: 'var(--tracking-tight)',
                    }}
                  >
                    Line Items ({form.items.length})
                  </h3>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={addLineItem}
                    className="press-scale gap-1.5"
                  >
                    <Plus className="h-3.5 w-3.5" strokeWidth={2} />
                    Add Item
                  </Button>
                </div>

                {form.items.length === 0 ? (
                  <div className="glass-surface rounded-xl p-6 text-center">
                    <ShoppingCart
                      className="h-8 w-8 text-muted-foreground/20 mx-auto mb-2"
                      strokeWidth={1.5}
                    />
                    <p
                      className="text-muted-foreground/60"
                      style={{ fontSize: 'var(--text-sm)', letterSpacing: 'var(--tracking-normal)' }}
                    >
                      No items added yet. Click &quot;Add Item&quot; to add line items.
                    </p>
                  </div>
                ) : (
                  <div className="glass-surface rounded-xl overflow-hidden">
                    <div className="overflow-x-auto">
                      <Table>
                        <TableHeader>
                          <TableRow className="border-b border-glass-border hover:bg-transparent">
                            <TableHead
                              className="text-xs uppercase tracking-widest text-muted-foreground/70 font-medium"
                              style={{ fontSize: 'var(--text-xs)', letterSpacing: 'var(--tracking-wide)', minWidth: 180 }}
                            >
                              Product
                            </TableHead>
                            <TableHead
                              className="text-xs uppercase tracking-widest text-muted-foreground/70 font-medium text-right"
                              style={{ fontSize: 'var(--text-xs)', letterSpacing: 'var(--tracking-wide)', minWidth: 90 }}
                            >
                              Qty
                            </TableHead>
                            <TableHead
                              className="text-xs uppercase tracking-widest text-muted-foreground/70 font-medium text-right"
                              style={{ fontSize: 'var(--text-xs)', letterSpacing: 'var(--tracking-wide)', minWidth: 110 }}
                            >
                              Unit Price
                            </TableHead>
                            <TableHead
                              className="text-xs uppercase tracking-widest text-muted-foreground/70 font-medium text-right"
                              style={{ fontSize: 'var(--text-xs)', letterSpacing: 'var(--tracking-wide)', minWidth: 80 }}
                            >
                              Tax %
                            </TableHead>
                            <TableHead
                              className="text-xs uppercase tracking-widest text-muted-foreground/70 font-medium text-right"
                              style={{ fontSize: 'var(--text-xs)', letterSpacing: 'var(--tracking-wide)', minWidth: 90 }}
                            >
                              Discount %
                            </TableHead>
                            <TableHead
                              className="text-xs uppercase tracking-widest text-muted-foreground/70 font-medium text-right"
                              style={{ fontSize: 'var(--text-xs)', letterSpacing: 'var(--tracking-wide)', minWidth: 110 }}
                            >
                              Total
                            </TableHead>
                            <TableHead
                              className="text-xs uppercase tracking-widest text-muted-foreground/70 font-medium w-12"
                              style={{ fontSize: 'var(--text-xs)', letterSpacing: 'var(--tracking-wide)' }}
                            />
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {form.items.map((item) => (
                            <TableRow
                              key={item.id}
                              className="border-b border-glass-border/20"
                            >
                              <TableCell>
                                <Select
                                  value={item.product_id}
                                  onValueChange={(v) => updateLineItem(item.id, 'product_id', v)}
                                >
                                  <SelectTrigger style={{ fontSize: 'var(--text-sm)', minWidth: 160 }}>
                                    <SelectValue placeholder="Select product" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    {mockProducts
                                      .filter((p) => p.is_active)
                                      .map((p) => (
                                        <SelectItem key={p.id} value={String(p.id)}>
                                          {p.name}
                                        </SelectItem>
                                      ))}
                                  </SelectContent>
                                </Select>
                              </TableCell>
                              <TableCell>
                                <Input
                                  type="number"
                                  min={1}
                                  value={item.quantity_ordered}
                                  onChange={(e) =>
                                    updateLineItem(
                                      item.id,
                                      'quantity_ordered',
                                      Number(e.target.value)
                                    )
                                  }
                                  className="text-right w-20"
                                  style={{ fontSize: 'var(--text-sm)' }}
                                />
                              </TableCell>
                              <TableCell>
                                <Input
                                  type="number"
                                  min={0}
                                  step={0.01}
                                  value={item.unit_price}
                                  onChange={(e) =>
                                    updateLineItem(
                                      item.id,
                                      'unit_price',
                                      Number(e.target.value)
                                    )
                                  }
                                  className="text-right w-28"
                                  style={{ fontSize: 'var(--text-sm)' }}
                                />
                              </TableCell>
                              <TableCell>
                                <Input
                                  type="number"
                                  min={0}
                                  max={100}
                                  step={0.1}
                                  value={item.tax_rate}
                                  onChange={(e) =>
                                    updateLineItem(
                                      item.id,
                                      'tax_rate',
                                      Number(e.target.value)
                                    )
                                  }
                                  className="text-right w-20"
                                  style={{ fontSize: 'var(--text-sm)' }}
                                />
                              </TableCell>
                              <TableCell>
                                <Input
                                  type="number"
                                  min={0}
                                  max={100}
                                  step={0.1}
                                  value={item.discount_percent}
                                  onChange={(e) =>
                                    updateLineItem(
                                      item.id,
                                      'discount_percent',
                                      Number(e.target.value)
                                    )
                                  }
                                  className="text-right w-20"
                                  style={{ fontSize: 'var(--text-sm)' }}
                                />
                              </TableCell>
                              <TableCell>
                                <span
                                  className="font-semibold text-foreground block text-right"
                                  style={{ fontSize: 'var(--text-sm)' }}
                                >
                                  {formatCurrency(computeLineTotal(item), 'INR')}
                                </span>
                              </TableCell>
                              <TableCell>
                                <Button
                                  type="button"
                                  variant="ghost"
                                  size="icon"
                                  className="h-8 w-8 press-scale text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30"
                                  onClick={() => removeLineItem(item.id)}
                                  aria-label="Remove item"
                                >
                                  <X className="h-4 w-4" strokeWidth={1.8} />
                                </Button>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </div>
                )}

                {/* Form Summary */}
                {form.items.length > 0 && (
                  <div className="glass-surface rounded-xl p-4">
                    <div className="flex flex-col items-end gap-2">
                      <div className="flex justify-between w-full max-w-xs">
                        <span
                          className="text-muted-foreground"
                          style={{ fontSize: 'var(--text-sm)', letterSpacing: 'var(--tracking-normal)' }}
                        >
                          Subtotal
                        </span>
                        <span
                          className="text-foreground"
                          style={{ fontSize: 'var(--text-sm)' }}
                        >
                          {formatCurrency(formTotals.subtotal, 'INR')}
                        </span>
                      </div>
                      <div className="flex justify-between w-full max-w-xs">
                        <span
                          className="text-muted-foreground"
                          style={{ fontSize: 'var(--text-sm)', letterSpacing: 'var(--tracking-normal)' }}
                        >
                          Tax
                        </span>
                        <span
                          className="text-foreground"
                          style={{ fontSize: 'var(--text-sm)' }}
                        >
                          {formatCurrency(formTotals.taxAmount, 'INR')}
                        </span>
                      </div>
                      <div className="flex justify-between w-full max-w-xs">
                        <span
                          className="text-muted-foreground"
                          style={{ fontSize: 'var(--text-sm)', letterSpacing: 'var(--tracking-normal)' }}
                        >
                          Shipping
                        </span>
                        <span
                          className="text-foreground"
                          style={{ fontSize: 'var(--text-sm)' }}
                        >
                          {formatCurrency(form.shipping_cost, 'INR')}
                        </span>
                      </div>
                      <Separator className="my-1" />
                      <div className="flex justify-between w-full max-w-xs">
                        <span
                          className="font-semibold text-foreground"
                          style={{
                            fontSize: 'var(--text-base)',
                            letterSpacing: 'var(--tracking-tight)',
                          }}
                        >
                          Total
                        </span>
                        <span
                          className="font-bold text-module-erp"
                          style={{
                            fontSize: 'var(--text-base)',
                            letterSpacing: 'var(--tracking-tight)',
                          }}
                        >
                          {formatCurrency(formTotals.total, 'INR')}
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <DialogFooter className="gap-2">
              <Button
                variant="outline"
                onClick={() => formModal.close()}
                disabled={isSubmitting}
                className="press-scale"
              >
                Cancel
              </Button>
              <Button
                onClick={handleSubmit}
                disabled={
                  isSubmitting ||
                  !form.po_number ||
                  !form.supplier_id ||
                  !form.warehouse_id
                }
                className="bg-module-erp hover:bg-module-erp/90 text-white press-scale"
              >
                {isSubmitting
                  ? 'Saving...'
                  : editingPO
                  ? 'Update Purchase Order'
                  : 'Create Purchase Order'}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* ── Delete Confirmation Dialog ──────────────────────────────────── */}
        <ConfirmDialog
          open={deleteModal.isOpen}
          onOpenChange={deleteModal.setIsOpen}
          title="Delete Purchase Order"
          description={
            deletingPO
              ? `Are you sure you want to delete purchase order "${deletingPO.po_number}"? This action cannot be undone.`
              : ''
          }
          confirmLabel="Delete"
          variant="destructive"
          onConfirm={confirmDelete}
          isLoading={isSubmitting}
        />
      </div>
    </PageTransition>
  );
}
