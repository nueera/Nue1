'use client';

import { useState, useMemo, useCallback, useEffect } from 'react';
import { motion } from 'framer-motion';
import { PageTransition } from '@/modules/erp/design-system/components/animations';
import { type ColumnDef } from '@tanstack/react-table';
import {
  Plus,
  Warehouse,
  AlertTriangle,
  Pencil,
  Trash2,
  MoreHorizontal,
  Package,
  RefreshCw,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { erpService } from '@/lib/services';

import {
  mockInventory,
  mockLowStockAlerts,
  mockProducts,
  mockWarehouses,
} from '@/modules/erp/data/mock';
import type {
  InventoryItem,
  InventoryCreate,
  InventoryUpdate,
  InventoryStatus,
  LowStockAlert,
} from '@/modules/erp/types/erp-operations';
import { INVENTORY_STATUSES } from '@/modules/erp/core/utils/constants';
import { SmartTable } from '@/modules/erp/shared/components/smart-table';
import { StatusBadge } from '@/modules/erp/shared/components/status-badge';
import { useModal, useSearch } from '@/modules/erp/shared/hooks';
import { ConfirmDialog } from '@/modules/erp/shared/components/confirm-dialog';
import { EmptyState } from '@/modules/erp/shared/components/empty-state';
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

// ── Animation config ─────────────────────────────────────────────────────────
const EASE = [0.25, 0.46, 0.45, 0.94] as const;

// ── Helper: quantity color ────────────────────────────────────────────────────
function getQuantityColor(qty: number, minStock?: number): string {
  if (qty === 0) return 'text-red-600 dark:text-red-400';
  if (minStock !== undefined && qty <= minStock) return 'text-amber-600 dark:text-amber-400';
  if (minStock !== undefined && qty <= minStock * 1.5) return 'text-amber-500 dark:text-amber-300';
  return 'text-green-600 dark:text-green-400';
}

// ── Form state type ───────────────────────────────────────────────────────────
interface InventoryFormData {
  product_id: string;
  warehouse_id: string;
  quantity_on_hand: string;
  quantity_reserved: string;
  quantity_on_order: string;
  batch_number: string;
  bin_location: string;
  expiry_date: string;
  status: InventoryStatus;
}

const emptyForm: InventoryFormData = {
  product_id: '',
  warehouse_id: '',
  quantity_on_hand: '0',
  quantity_reserved: '0',
  quantity_on_order: '0',
  batch_number: '',
  bin_location: '',
  expiry_date: '',
  status: 'in_stock',
};

function formToCreate(form: InventoryFormData): InventoryCreate {
  return {
    product_id: Number(form.product_id),
    warehouse_id: Number(form.warehouse_id),
    quantity_on_hand: Number(form.quantity_on_hand) || 0,
    quantity_reserved: Number(form.quantity_reserved) || 0,
    quantity_available: (Number(form.quantity_on_hand) || 0) - (Number(form.quantity_reserved) || 0),
    quantity_on_order: Number(form.quantity_on_order) || 0,
    batch_number: form.batch_number || null,
    bin_location: form.bin_location || null,
    expiry_date: form.expiry_date || null,
    status: form.status,
  };
}

function formToUpdate(form: InventoryFormData): InventoryUpdate {
  return {
    quantity_on_hand: Number(form.quantity_on_hand) || 0,
    quantity_reserved: Number(form.quantity_reserved) || 0,
    quantity_available: (Number(form.quantity_on_hand) || 0) - (Number(form.quantity_reserved) || 0),
    quantity_on_order: Number(form.quantity_on_order) || 0,
    batch_number: form.batch_number || null,
    bin_location: form.bin_location || null,
    expiry_date: form.expiry_date || null,
    status: form.status,
  };
}

function validateForm(form: InventoryFormData): Record<string, string> {
  const errors: Record<string, string> = {};
  if (!form.product_id) errors.product_id = 'Product is required';
  if (!form.warehouse_id) errors.warehouse_id = 'Warehouse is required';
  if (Number(form.quantity_on_hand) < 0) errors.quantity_on_hand = 'Quantity cannot be negative';
  if (Number(form.quantity_reserved) < 0) errors.quantity_reserved = 'Reserved cannot be negative';
  if (Number(form.quantity_reserved) > Number(form.quantity_on_hand))
    errors.quantity_reserved = 'Reserved cannot exceed on-hand quantity';
  if (Number(form.quantity_on_order) < 0) errors.quantity_on_order = 'On order cannot be negative';
  return errors;
}

// ── Table columns ─────────────────────────────────────────────────────────────
function getColumns(
  onEdit: (item: InventoryItem) => void,
  onDelete: (item: InventoryItem) => void
): ColumnDef<InventoryItem>[] {
  return [
    {
      id: 'product',
      header: 'Product',
      accessorFn: (row) => row.product_name,
      cell: ({ row }) => (
        <div>
          <p className="font-medium text-foreground" style={{ fontSize: 'var(--text-sm)' }}>
            {row.original.product_name || '—'}
          </p>
          <p className="text-muted-foreground" style={{ fontSize: 'var(--text-xs)' }}>
            {row.original.product_sku || '—'}
          </p>
        </div>
      ),
    },
    {
      id: 'warehouse_name',
      header: 'Warehouse',
      accessorFn: (row) => row.warehouse_name,
      cell: ({ row }) => (
        <div className="flex items-center gap-1.5">
          <Warehouse className="h-3.5 w-3.5 text-muted-foreground shrink-0" strokeWidth={1.8} />
          <span style={{ fontSize: 'var(--text-sm)' }}>{row.original.warehouse_name || '—'}</span>
        </div>
      ),
    },
    {
      accessorKey: 'quantity_on_hand',
      header: 'On Hand',
      cell: ({ row }) => {
        const qty = row.original.quantity_on_hand;
        const min = row.original.min_stock_level;
        return (
          <span className={cn('font-medium tabular-nums', getQuantityColor(qty, min))} style={{ fontSize: 'var(--text-sm)' }}>
            {qty.toLocaleString()}
          </span>
        );
      },
    },
    {
      accessorKey: 'quantity_reserved',
      header: 'Reserved',
      cell: ({ getValue }) => (
        <span className="text-muted-foreground tabular-nums" style={{ fontSize: 'var(--text-sm)' }}>
          {(getValue() as number).toLocaleString()}
        </span>
      ),
    },
    {
      accessorKey: 'quantity_available',
      header: 'Available',
      cell: ({ getValue }) => (
        <span className="font-medium text-foreground tabular-nums" style={{ fontSize: 'var(--text-sm)' }}>
          {(getValue() as number).toLocaleString()}
        </span>
      ),
    },
    {
      accessorKey: 'quantity_on_order',
      header: 'On Order',
      cell: ({ getValue }) => (
        <span className="text-muted-foreground tabular-nums" style={{ fontSize: 'var(--text-sm)' }}>
          {(getValue() as number).toLocaleString()}
        </span>
      ),
    },
    {
      accessorKey: 'batch_number',
      header: 'Batch #',
      cell: ({ getValue }) => (
        <span className="text-muted-foreground" style={{ fontSize: 'var(--text-sm)' }}>
          {(getValue() as string | null) || '—'}
        </span>
      ),
    },
    {
      accessorKey: 'bin_location',
      header: 'Bin Location',
      cell: ({ getValue }) => (
        <span className="text-muted-foreground font-mono" style={{ fontSize: 'var(--text-sm)' }}>
          {(getValue() as string | null) || '—'}
        </span>
      ),
    },
    {
      accessorKey: 'status',
      header: 'Status',
      cell: ({ getValue }) => <StatusBadge status={getValue() as string} />,
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
            <DropdownMenuItem onClick={() => onEdit(row.original)}>
              <Pencil className="h-4 w-4 mr-2" strokeWidth={1.8} />
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem
              variant="destructive"
              onClick={() => onDelete(row.original)}
            >
              <Trash2 className="h-4 w-4 mr-2" strokeWidth={1.8} />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
      enableSorting: false,
    },
  ];
}

// ============================================================================
// Page Component
// ============================================================================

export default function InventoryPage() {
  // ── Data state ────────────────────────────────────────────────────────────
  const [inventory, setInventory] = useState<InventoryItem[]>([]);
  const [lowStockAlerts, setLowStockAlerts] = useState<LowStockAlert[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // ── Filter state ──────────────────────────────────────────────────────────
  const [warehouseFilter, setWarehouseFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  // ── Modal state ───────────────────────────────────────────────────────────
  const formModal = useModal();
  const deleteModal = useModal();
  const [editingItem, setEditingItem] = useState<InventoryItem | null>(null);
  const [deletingItem, setDeletingItem] = useState<InventoryItem | null>(null);
  const [formData, setFormData] = useState<InventoryFormData>(emptyForm);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  // ── Search state ──────────────────────────────────────────────────────────
  const { search, setSearch, debouncedSearch } = useSearch('');

  // ── Fetch data ────────────────────────────────────────────────────────────
  const fetchInventory = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const [inventoryRes, alertsRes] = await Promise.all([
        erpService.getInventory(),
        erpService.getLowStockAlerts(),
      ]);
      setInventory(
        Array.isArray(inventoryRes) ? inventoryRes : (inventoryRes as any)?.data ?? []
      );
      setLowStockAlerts(
        Array.isArray(alertsRes) ? alertsRes : (alertsRes as any)?.data ?? []
      );
    } catch {
      // Fallback to mock data on error
      setInventory(mockInventory);
      setLowStockAlerts(mockLowStockAlerts);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchInventory();
  }, [fetchInventory]);

  // ── Filtered data ─────────────────────────────────────────────────────────
  const filteredInventory = useMemo(() => {
    return inventory.filter((item) => {
      // Warehouse filter
      if (warehouseFilter !== 'all' && String(item.warehouse_id) !== warehouseFilter) {
        return false;
      }
      // Status filter
      if (statusFilter !== 'all' && item.status !== statusFilter) {
        return false;
      }
      // Search filter
      if (debouncedSearch) {
        const q = debouncedSearch.toLowerCase();
        const matchesSearch =
          (item.product_name?.toLowerCase().includes(q)) ||
          (item.product_sku?.toLowerCase().includes(q)) ||
          (item.warehouse_name?.toLowerCase().includes(q)) ||
          (item.batch_number?.toLowerCase().includes(q)) ||
          (item.bin_location?.toLowerCase().includes(q));
        if (!matchesSearch) return false;
      }
      return true;
    });
  }, [inventory, warehouseFilter, statusFilter, debouncedSearch]);

  // ── Form helpers ──────────────────────────────────────────────────────────
  const openCreateModal = useCallback(() => {
    setEditingItem(null);
    setFormData(emptyForm);
    setFormErrors({});
    formModal.open();
  }, [formModal]);

  const openEditModal = useCallback(
    (item: InventoryItem) => {
      setEditingItem(item);
      setFormData({
        product_id: String(item.product_id),
        warehouse_id: String(item.warehouse_id),
        quantity_on_hand: String(item.quantity_on_hand),
        quantity_reserved: String(item.quantity_reserved),
        quantity_on_order: String(item.quantity_on_order),
        batch_number: item.batch_number || '',
        bin_location: item.bin_location || '',
        expiry_date: item.expiry_date ? item.expiry_date.split('T')[0] : '',
        status: item.status,
      });
      setFormErrors({});
      formModal.open();
    },
    [formModal]
  );

  const openDeleteModal = useCallback(
    (item: InventoryItem) => {
      setDeletingItem(item);
      deleteModal.open();
    },
    [deleteModal]
  );

  const updateFormField = useCallback(
    (field: keyof InventoryFormData, value: string) => {
      setFormData((prev) => ({ ...prev, [field]: value }));
      // Clear error for the field on change
      if (formErrors[field]) {
        setFormErrors((prev) => {
          const next = { ...prev };
          delete next[field];
          return next;
        });
      }
    },
    [formErrors]
  );

  // ── CRUD handlers ─────────────────────────────────────────────────────────
  const handleSubmit = useCallback(async () => {
    const errors = validateForm(formData);
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setIsSubmitting(true);
    try {
      if (editingItem) {
        // Update
        const updateData = formToUpdate(formData);
        try {
          await erpService.updateInventory(editingItem.id, updateData);
        } catch {
          // Silently fail — mock mode
        }
        setInventory((prev) =>
          prev.map((item) =>
            item.id === editingItem.id
              ? {
                  ...item,
                  ...updateData,
                  quantity_available:
                    (Number(formData.quantity_on_hand) || 0) -
                    (Number(formData.quantity_reserved) || 0),
                  status: formData.status,
                  updated_at: new Date().toISOString(),
                }
              : item
          )
        );
      } else {
        // Create
        const createData = formToCreate(formData);
        let newItem: InventoryItem;
        try {
          const res = await erpService.createInventory(createData);
          newItem = res as InventoryItem;
        } catch {
          // Mock create
          const product = mockProducts.find((p) => p.id === Number(formData.product_id));
          const warehouse = mockWarehouses.find((w) => w.id === Number(formData.warehouse_id));
          newItem = {
            id: Math.max(0, ...inventory.map((i) => i.id)) + 1,
            product_id: Number(formData.product_id),
            warehouse_id: Number(formData.warehouse_id),
            quantity_on_hand: Number(formData.quantity_on_hand) || 0,
            quantity_reserved: Number(formData.quantity_reserved) || 0,
            quantity_available:
              (Number(formData.quantity_on_hand) || 0) - (Number(formData.quantity_reserved) || 0),
            quantity_on_order: Number(formData.quantity_on_order) || 0,
            batch_number: formData.batch_number || null,
            expiry_date: formData.expiry_date || null,
            bin_location: formData.bin_location || null,
            status: formData.status,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
            product_name: product?.name,
            product_sku: product?.sku,
            warehouse_name: warehouse?.name,
            min_stock_level: product?.min_stock_level,
          };
        }
        setInventory((prev) => [...prev, newItem]);
      }

      formModal.close();
    } catch {
      setError('Failed to save inventory entry. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  }, [formData, editingItem, formModal, inventory]);

  const handleDelete = useCallback(async () => {
    if (!deletingItem) return;
    setIsSubmitting(true);
    try {
      // Note: erpService does not expose deleteInventory; operates on local state only
      setInventory((prev) => prev.filter((item) => item.id !== deletingItem.id));
      deleteModal.close();
    } catch {
      setError('Failed to delete inventory entry. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  }, [deletingItem, deleteModal]);

  // ── Columns ───────────────────────────────────────────────────────────────
  const columns = useMemo(
    () => getColumns(openEditModal, openDeleteModal),
    [openEditModal, openDeleteModal]
  );

  // ── Summary stats ─────────────────────────────────────────────────────────
  const stats = useMemo(() => {
    const totalItems = inventory.length;
    const totalOnHand = inventory.reduce((sum, i) => sum + i.quantity_on_hand, 0);
    const totalAvailable = inventory.reduce((sum, i) => sum + i.quantity_available, 0);
    const lowStockCount = inventory.filter((i) => i.status === 'low_stock').length;
    const outOfStockCount = inventory.filter((i) => i.status === 'out_of_stock').length;
    return { totalItems, totalOnHand, totalAvailable, lowStockCount, outOfStockCount };
  }, [inventory]);

  return (
    <PageTransition>
      <div className="p-4 sm:p-6 lg:p-8">
        {/* ── Page header ──────────────────────────────────────────────────── */}
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
              Inventory
            </h1>
            <p
              className="text-muted-foreground mt-1"
              style={{
                fontSize: 'var(--text-sm)',
                letterSpacing: 'var(--tracking-normal)',
                lineHeight: 'var(--leading-normal)',
              }}
            >
              Stock levels across all warehouses
            </p>
          </div>
          <Button
            onClick={openCreateModal}
            className="bg-module-erp hover:bg-module-erp/90 text-white gap-2 press-scale"
            style={{ fontSize: 'var(--text-sm)' }}
          >
            <Plus className="h-4 w-4" strokeWidth={1.8} />
            Add Stock Entry
          </Button>
        </motion.div>

        {/* ── Low Stock Alert Banner ────────────────────────────────────────── */}
        {lowStockAlerts.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.24, delay: 0.04, ease: EASE }}
            className="mb-6"
          >
            <div className="glass-surface rounded-xl border border-amber-500/25 bg-amber-500/5 overflow-hidden">
              <div className="px-4 py-3 border-b border-amber-500/15 flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 text-amber-600 dark:text-amber-400" strokeWidth={1.8} />
                <h3
                  className="font-semibold text-amber-700 dark:text-amber-300"
                  style={{ fontSize: 'var(--text-sm)', letterSpacing: 'var(--tracking-tight)' }}
                >
                  Low Stock Alerts
                </h3>
                <span
                  className="ml-auto px-2 py-0.5 rounded-full bg-amber-500/15 text-amber-700 dark:text-amber-300 font-medium"
                  style={{ fontSize: 'var(--text-xs)' }}
                >
                  {lowStockAlerts.length} item{lowStockAlerts.length !== 1 ? 's' : ''}
                </span>
              </div>
              <div className="max-h-48 overflow-y-auto smooth-scroll">
                {lowStockAlerts.map((alert) => (
                  <div
                    key={`alert-${alert.product_id}-${alert.warehouse_id}`}
                    className={cn(
                      'px-4 py-3 flex flex-col sm:flex-row sm:items-center gap-2 border-b border-amber-500/8 last:border-b-0',
                      alert.status === 'out_of_stock' ? 'bg-red-500/5' : 'bg-transparent'
                    )}
                  >
                    <div className="flex items-center gap-2 flex-1 min-w-0">
                      {alert.status === 'out_of_stock' ? (
                        <span className="shrink-0 flex items-center justify-center h-6 w-6 rounded-full bg-red-500/15 text-red-600 dark:text-red-400">
                          <AlertTriangle className="h-3.5 w-3.5" strokeWidth={2} />
                        </span>
                      ) : (
                        <span className="shrink-0 flex items-center justify-center h-6 w-6 rounded-full bg-amber-500/15 text-amber-600 dark:text-amber-400">
                          <AlertTriangle className="h-3.5 w-3.5" strokeWidth={2} />
                        </span>
                      )}
                      <div className="min-w-0">
                        <p
                          className="font-medium text-foreground truncate"
                          style={{ fontSize: 'var(--text-sm)' }}
                        >
                          {alert.product_name}
                        </p>
                        <p
                          className="text-muted-foreground"
                          style={{ fontSize: 'var(--text-xs)' }}
                        >
                          {alert.sku}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 sm:gap-6 ml-8 sm:ml-0">
                      <div className="text-right">
                        <p
                          className={cn(
                            'font-semibold tabular-nums',
                            alert.quantity_on_hand === 0
                              ? 'text-red-600 dark:text-red-400'
                              : 'text-amber-600 dark:text-amber-400'
                          )}
                          style={{ fontSize: 'var(--text-sm)' }}
                        >
                          {alert.quantity_on_hand.toLocaleString()} on hand
                        </p>
                        <p
                          className="text-muted-foreground"
                          style={{ fontSize: 'var(--text-xs)' }}
                        >
                          Min: {alert.min_stock_level.toLocaleString()}
                        </p>
                      </div>
                      <StatusBadge status={alert.status} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* ── Summary cards ─────────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.24, delay: 0.06, ease: EASE }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6"
        >
          {[
            { label: 'Total Items', value: stats.totalItems, color: 'text-foreground' },
            { label: 'Total On Hand', value: stats.totalOnHand.toLocaleString(), color: 'text-green-600 dark:text-green-400' },
            { label: 'Low Stock', value: stats.lowStockCount, color: 'text-amber-600 dark:text-amber-400' },
            { label: 'Out of Stock', value: stats.outOfStockCount, color: 'text-red-600 dark:text-red-400' },
          ].map((stat) => (
            <div
              key={stat.label}
              className="glass-surface rounded-xl p-4 border border-glass-border/50"
            >
              <p
                className="text-muted-foreground mb-1"
                style={{ fontSize: 'var(--text-xs)', letterSpacing: 'var(--tracking-wide)' }}
              >
                {stat.label}
              </p>
              <p
                className={cn('font-bold tabular-nums', stat.color)}
                style={{ fontSize: 'var(--text-xl)', letterSpacing: 'var(--tracking-tight)' }}
              >
                {stat.value}
              </p>
            </div>
          ))}
        </motion.div>

        {/* ── Error banner ──────────────────────────────────────────────────── */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-4 px-4 py-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400 text-sm flex items-center justify-between"
          >
            <span>{error}</span>
            <button
              onClick={() => setError(null)}
              className="ml-2 text-red-500 hover:text-red-700 dark:hover:text-red-300 press-scale"
            >
              Dismiss
            </button>
          </motion.div>
        )}

        {/* ── Filter bar ───────────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.24, delay: 0.08, ease: EASE }}
          className="flex flex-wrap items-center gap-3 mb-6"
        >
          <Select value={warehouseFilter} onValueChange={setWarehouseFilter}>
            <SelectTrigger className="w-[180px]" size="sm">
              <Warehouse className="h-3.5 w-3.5 mr-1.5 text-muted-foreground" strokeWidth={1.8} />
              <SelectValue placeholder="Warehouse" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Warehouses</SelectItem>
              {mockWarehouses.map((wh) => (
                <SelectItem key={wh.id} value={String(wh.id)}>
                  {wh.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[160px]" size="sm">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              {INVENTORY_STATUSES.map((s) => (
                <SelectItem key={s.value} value={s.value}>
                  {s.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Button
            variant="ghost"
            size="sm"
            onClick={fetchInventory}
            className="ml-auto text-muted-foreground hover:text-foreground gap-1.5 press-scale"
            disabled={isLoading}
          >
            <RefreshCw className={cn('h-3.5 w-3.5', isLoading && 'animate-spin')} strokeWidth={1.8} />
            Refresh
          </Button>
        </motion.div>

        {/* ── Table ─────────────────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1, ease: EASE }}
        >
          {filteredInventory.length === 0 && !isLoading ? (
            <EmptyState
              icon={Package}
              title="No inventory found"
              description="No inventory entries match your current filters. Try adjusting your search or add a new stock entry."
              action={{ label: 'Add Stock Entry', onClick: openCreateModal }}
            />
          ) : (
            <SmartTable
              data={filteredInventory}
              columns={columns}
              searchable
              searchPlaceholder="Search by product, SKU, warehouse, batch..."
              isLoading={isLoading}
              emptyMessage="No inventory entries found"
              emptyDescription="Try adjusting your search or filters"
            />
          )}
        </motion.div>

        {/* ── Create / Edit Dialog ──────────────────────────────────────────── */}
        <Dialog open={formModal.isOpen} onOpenChange={formModal.setIsOpen}>
          <DialogContent className="sm:max-w-[520px] max-h-[85vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle
                style={{ fontSize: 'var(--text-lg)', letterSpacing: 'var(--tracking-tight)' }}
              >
                {editingItem ? 'Edit Inventory Entry' : 'Add Stock Entry'}
              </DialogTitle>
              <DialogDescription
                style={{ fontSize: 'var(--text-sm)', letterSpacing: 'var(--tracking-normal)' }}
              >
                {editingItem
                  ? 'Update the stock details for this inventory entry.'
                  : 'Add a new stock entry to track inventory for a product in a warehouse.'}
              </DialogDescription>
            </DialogHeader>

            <div className="grid gap-4 py-4">
              {/* Product */}
              <div className="grid gap-2">
                <Label
                  htmlFor="product_id"
                  style={{ fontSize: 'var(--text-sm)', letterSpacing: 'var(--tracking-normal)' }}
                >
                  Product <span className="text-red-500">*</span>
                </Label>
                <Select
                  value={formData.product_id}
                  onValueChange={(v) => updateFormField('product_id', v)}
                  disabled={!!editingItem}
                >
                  <SelectTrigger
                    id="product_id"
                    className={cn(formErrors.product_id && 'border-red-500')}
                  >
                    <SelectValue placeholder="Select product" />
                  </SelectTrigger>
                  <SelectContent>
                    {mockProducts
                      .filter((p) => p.track_inventory && p.is_active)
                      .map((p) => (
                        <SelectItem key={p.id} value={String(p.id)}>
                          {p.name} ({p.sku})
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
                {formErrors.product_id && (
                  <p className="text-red-500" style={{ fontSize: 'var(--text-xs)' }}>
                    {formErrors.product_id}
                  </p>
                )}
              </div>

              {/* Warehouse */}
              <div className="grid gap-2">
                <Label
                  htmlFor="warehouse_id"
                  style={{ fontSize: 'var(--text-sm)', letterSpacing: 'var(--tracking-normal)' }}
                >
                  Warehouse <span className="text-red-500">*</span>
                </Label>
                <Select
                  value={formData.warehouse_id}
                  onValueChange={(v) => updateFormField('warehouse_id', v)}
                  disabled={!!editingItem}
                >
                  <SelectTrigger
                    id="warehouse_id"
                    className={cn(formErrors.warehouse_id && 'border-red-500')}
                  >
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
                {formErrors.warehouse_id && (
                  <p className="text-red-500" style={{ fontSize: 'var(--text-xs)' }}>
                    {formErrors.warehouse_id}
                  </p>
                )}
              </div>

              {/* Quantity fields */}
              <div className="grid grid-cols-3 gap-3">
                <div className="grid gap-2">
                  <Label
                    htmlFor="quantity_on_hand"
                    style={{ fontSize: 'var(--text-sm)', letterSpacing: 'var(--tracking-normal)' }}
                  >
                    On Hand
                  </Label>
                  <Input
                    id="quantity_on_hand"
                    type="number"
                    min="0"
                    value={formData.quantity_on_hand}
                    onChange={(e) => updateFormField('quantity_on_hand', e.target.value)}
                    className={cn(formErrors.quantity_on_hand && 'border-red-500')}
                  />
                  {formErrors.quantity_on_hand && (
                    <p className="text-red-500" style={{ fontSize: 'var(--text-xs)' }}>
                      {formErrors.quantity_on_hand}
                    </p>
                  )}
                </div>
                <div className="grid gap-2">
                  <Label
                    htmlFor="quantity_reserved"
                    style={{ fontSize: 'var(--text-sm)', letterSpacing: 'var(--tracking-normal)' }}
                  >
                    Reserved
                  </Label>
                  <Input
                    id="quantity_reserved"
                    type="number"
                    min="0"
                    value={formData.quantity_reserved}
                    onChange={(e) => updateFormField('quantity_reserved', e.target.value)}
                    className={cn(formErrors.quantity_reserved && 'border-red-500')}
                  />
                  {formErrors.quantity_reserved && (
                    <p className="text-red-500" style={{ fontSize: 'var(--text-xs)' }}>
                      {formErrors.quantity_reserved}
                    </p>
                  )}
                </div>
                <div className="grid gap-2">
                  <Label
                    htmlFor="quantity_on_order"
                    style={{ fontSize: 'var(--text-sm)', letterSpacing: 'var(--tracking-normal)' }}
                  >
                    On Order
                  </Label>
                  <Input
                    id="quantity_on_order"
                    type="number"
                    min="0"
                    value={formData.quantity_on_order}
                    onChange={(e) => updateFormField('quantity_on_order', e.target.value)}
                    className={cn(formErrors.quantity_on_order && 'border-red-500')}
                  />
                  {formErrors.quantity_on_order && (
                    <p className="text-red-500" style={{ fontSize: 'var(--text-xs)' }}>
                      {formErrors.quantity_on_order}
                    </p>
                  )}
                </div>
              </div>

              {/* Available (computed) */}
              <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-muted/30 border border-glass-border/30">
                <span
                  className="text-muted-foreground"
                  style={{ fontSize: 'var(--text-sm)', letterSpacing: 'var(--tracking-normal)' }}
                >
                  Available:
                </span>
                <span
                  className="font-semibold text-foreground tabular-nums"
                  style={{ fontSize: 'var(--text-sm)' }}
                >
                  {Math.max(0, (Number(formData.quantity_on_hand) || 0) - (Number(formData.quantity_reserved) || 0)).toLocaleString()}
                </span>
                <span
                  className="text-muted-foreground ml-1"
                  style={{ fontSize: 'var(--text-xs)' }}
                >
                  (on hand - reserved)
                </span>
              </div>

              {/* Batch & Location */}
              <div className="grid grid-cols-2 gap-3">
                <div className="grid gap-2">
                  <Label
                    htmlFor="batch_number"
                    style={{ fontSize: 'var(--text-sm)', letterSpacing: 'var(--tracking-normal)' }}
                  >
                    Batch #
                  </Label>
                  <Input
                    id="batch_number"
                    type="text"
                    placeholder="e.g. BATCH-2024-01"
                    value={formData.batch_number}
                    onChange={(e) => updateFormField('batch_number', e.target.value)}
                  />
                </div>
                <div className="grid gap-2">
                  <Label
                    htmlFor="bin_location"
                    style={{ fontSize: 'var(--text-sm)', letterSpacing: 'var(--tracking-normal)' }}
                  >
                    Bin Location
                  </Label>
                  <Input
                    id="bin_location"
                    type="text"
                    placeholder="e.g. A1-B2-C3"
                    value={formData.bin_location}
                    onChange={(e) => updateFormField('bin_location', e.target.value)}
                  />
                </div>
              </div>

              {/* Expiry Date */}
              <div className="grid gap-2">
                <Label
                  htmlFor="expiry_date"
                  style={{ fontSize: 'var(--text-sm)', letterSpacing: 'var(--tracking-normal)' }}
                >
                  Expiry Date
                </Label>
                <Input
                  id="expiry_date"
                  type="date"
                  value={formData.expiry_date}
                  onChange={(e) => updateFormField('expiry_date', e.target.value)}
                />
              </div>

              {/* Status */}
              <div className="grid gap-2">
                <Label
                  htmlFor="status"
                  style={{ fontSize: 'var(--text-sm)', letterSpacing: 'var(--tracking-normal)' }}
                >
                  Status
                </Label>
                <Select
                  value={formData.status}
                  onValueChange={(v) => updateFormField('status', v as InventoryStatus)}
                >
                  <SelectTrigger id="status">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    {INVENTORY_STATUSES.map((s) => (
                      <SelectItem key={s.value} value={s.value}>
                        {s.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
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
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="bg-module-erp hover:bg-module-erp/90 text-white press-scale"
                style={{ fontSize: 'var(--text-sm)' }}
              >
                {isSubmitting ? 'Saving...' : editingItem ? 'Update Entry' : 'Create Entry'}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* ── Delete Confirmation Dialog ────────────────────────────────────── */}
        <ConfirmDialog
          open={deleteModal.isOpen}
          onOpenChange={deleteModal.setIsOpen}
          title="Delete Inventory Entry"
          description={
            deletingItem
              ? `Are you sure you want to delete the inventory entry for "${deletingItem.product_name}" in "${deletingItem.warehouse_name}"? This action cannot be undone.`
              : 'Are you sure you want to delete this inventory entry?'
          }
          confirmLabel="Delete"
          variant="destructive"
          onConfirm={handleDelete}
          isLoading={isSubmitting}
        />
      </div>
    </PageTransition>
  );
}
