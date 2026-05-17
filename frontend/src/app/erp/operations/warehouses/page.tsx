'use client';

import { useState, useMemo, useCallback } from 'react';
import { motion } from 'framer-motion';
import { PageTransition } from '@/modules/erp/design-system/components/animations';
import { type ColumnDef } from '@tanstack/react-table';
import {
  Plus,
  MoreHorizontal,
  Pencil,
  Trash2,
  Warehouse as WarehouseIcon,
} from 'lucide-react';
import { mockWarehouses } from '@/modules/erp/data/mock/operations.mock';
import type { Warehouse, WarehouseCreate, WarehouseUpdate } from '@/modules/erp/types/erp-operations';
import { SmartTable } from '@/modules/erp/shared/components/smart-table';
import { StatusBadge } from '@/modules/erp/shared/components/status-badge';
import { ConfirmDialog } from '@/modules/erp/shared/components/confirm-dialog';
import { EmptyState } from '@/modules/erp/shared/components/empty-state';
import { useModal } from '@/modules/erp/shared/hooks';
import { formatDate, prettifyStatus } from '@/lib/format';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
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

// ── Animation Easing ────────────────────────────────────────────────────────
const EASE = [0.25, 0.46, 0.45, 0.94] as const;

// ── Form Default ────────────────────────────────────────────────────────────
const emptyForm: WarehouseCreate = {
  name: '',
  code: '',
  address: '',
  city: '',
  state: '',
  country: '',
  postal_code: '',
  manager_name: '',
  phone: '',
  email: '',
  capacity: null,
  is_active: true,
  notes: '',
};

// ── Table Columns ───────────────────────────────────────────────────────────
function getColumns(
  onEdit: (warehouse: Warehouse) => void,
  onDelete: (warehouse: Warehouse) => void
): ColumnDef<Warehouse>[] {
  return [
    {
      id: 'name_code',
      header: 'Name',
      accessorFn: (row) => row.name,
      cell: ({ row }) => (
        <div className="min-w-0">
          <p
            className="font-medium text-foreground truncate"
            style={{ fontSize: 'var(--text-sm)' }}
          >
            {row.original.name}
          </p>
          {row.original.code && (
            <p
              className="text-muted-foreground truncate"
              style={{ fontSize: 'var(--text-xs)' }}
            >
              {row.original.code}
            </p>
          )}
        </div>
      ),
    },
    {
      id: 'location',
      header: 'Location',
      accessorFn: (row) =>
        [row.city, row.state, row.country].filter(Boolean).join(', '),
      cell: ({ row }) => {
        const parts = [row.original.city, row.original.state, row.original.country].filter(Boolean);
        if (parts.length === 0) {
          return (
            <span className="text-muted-foreground" style={{ fontSize: 'var(--text-sm)' }}>
              &mdash;
            </span>
          );
        }
        return (
          <span
            className="text-foreground truncate block max-w-[200px]"
            style={{ fontSize: 'var(--text-sm)' }}
          >
            {parts.join(', ')}
          </span>
        );
      },
    },
    {
      id: 'manager',
      header: 'Manager',
      accessorFn: (row) => row.manager_name ?? '',
      cell: ({ row }) => (
        <span
          className={row.original.manager_name ? 'text-foreground' : 'text-muted-foreground'}
          style={{ fontSize: 'var(--text-sm)' }}
        >
          {row.original.manager_name || '\u2014'}
        </span>
      ),
    },
    {
      id: 'contact',
      header: 'Phone / Email',
      cell: ({ row }) => {
        const { phone, email } = row.original;
        if (!phone && !email) {
          return (
            <span className="text-muted-foreground" style={{ fontSize: 'var(--text-sm)' }}>
              &mdash;
            </span>
          );
        }
        return (
          <div className="min-w-0">
            {phone && (
              <p
                className="text-foreground truncate"
                style={{ fontSize: 'var(--text-xs)' }}
              >
                {phone}
              </p>
            )}
            {email && (
              <p
                className="text-muted-foreground truncate"
                style={{ fontSize: 'var(--text-xs)' }}
              >
                {email}
              </p>
            )}
          </div>
        );
      },
    },
    {
      id: 'capacity',
      header: 'Capacity',
      accessorFn: (row) => row.capacity ?? 0,
      cell: ({ row }) => {
        if (row.original.capacity == null) {
          return (
            <span className="text-muted-foreground" style={{ fontSize: 'var(--text-sm)' }}>
              &mdash;
            </span>
          );
        }
        return (
          <span className="text-foreground" style={{ fontSize: 'var(--text-sm)' }}>
            {row.original.capacity.toLocaleString()} units
          </span>
        );
      },
    },
    {
      id: 'status',
      header: 'Status',
      accessorFn: (row: Warehouse) => (row.is_active ? 'active' : 'inactive'),
      cell: ({ row }) => (
        <StatusBadge status={row.original.is_active ? 'active' : 'inactive'} />
      ),
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
              className="h-8 w-8 press-scale"
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

// ── Page Component ──────────────────────────────────────────────────────────

export default function WarehousesPage() {
  // ── State ─────────────────────────────────────────────────────────────────
  const [warehouses, setWarehouses] = useState<Warehouse[]>(mockWarehouses);
  const [isLoading, setIsLoading] = useState(false);

  // Create / Edit dialog
  const createModal = useModal();
  const [editingWarehouse, setEditingWarehouse] = useState<Warehouse | null>(null);
  const [formData, setFormData] = useState<WarehouseCreate>(emptyForm);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Delete confirmation
  const [deleteTarget, setDeleteTarget] = useState<Warehouse | null>(null);
  const deleteModal = useModal();
  const [isDeleting, setIsDeleting] = useState(false);

  // ── Handlers ──────────────────────────────────────────────────────────────
  const handleOpenCreate = useCallback(() => {
    setEditingWarehouse(null);
    setFormData(emptyForm);
    createModal.open();
  }, [createModal]);

  const handleOpenEdit = useCallback(
    (warehouse: Warehouse) => {
      setEditingWarehouse(warehouse);
      setFormData({
        name: warehouse.name,
        code: warehouse.code ?? '',
        address: warehouse.address ?? '',
        city: warehouse.city ?? '',
        state: warehouse.state ?? '',
        country: warehouse.country ?? '',
        postal_code: warehouse.postal_code ?? '',
        manager_name: warehouse.manager_name ?? '',
        phone: warehouse.phone ?? '',
        email: warehouse.email ?? '',
        capacity: warehouse.capacity ?? null,
        is_active: warehouse.is_active,
        notes: warehouse.notes ?? '',
      });
      createModal.open();
    },
    [createModal]
  );

  const handleOpenDelete = useCallback((warehouse: Warehouse) => {
    setDeleteTarget(warehouse);
    deleteModal.open();
  }, [deleteModal]);

  const handleSubmit = useCallback(async () => {
    if (!formData.name.trim()) return;
    setIsSubmitting(true);

    try {
      // Attempt API call, fall back to mock manipulation
      try {
        if (editingWarehouse) {
          // await erpService.updateWarehouse(editingWarehouse.id, formData);
        } else {
          // await erpService.createWarehouse(formData);
        }
      } catch {
        // API not available — use mock
      }

      // Optimistic local update
      if (editingWarehouse) {
        setWarehouses((prev) =>
          prev.map((w) =>
            w.id === editingWarehouse.id
              ? { ...w, ...formData, updated_at: new Date().toISOString() }
              : w
          )
        );
      } else {
        const newWarehouse: Warehouse = {
          id: Math.max(0, ...warehouses.map((w) => w.id)) + 1,
          name: formData.name,
          code: formData.code ?? null,
          address: formData.address ?? null,
          city: formData.city ?? null,
          state: formData.state ?? null,
          country: formData.country ?? null,
          postal_code: formData.postal_code ?? null,
          manager_name: formData.manager_name ?? null,
          phone: formData.phone ?? null,
          email: formData.email ?? null,
          capacity: formData.capacity ?? null,
          is_active: formData.is_active ?? true,
          notes: formData.notes ?? null,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        };
        setWarehouses((prev) => [...prev, newWarehouse]);
      }

      createModal.close();
    } finally {
      setIsSubmitting(false);
    }
  }, [formData, editingWarehouse, warehouses, createModal]);

  const handleDelete = useCallback(async () => {
    if (!deleteTarget) return;
    setIsDeleting(true);

    try {
      try {
        // await erpService.deleteWarehouse(deleteTarget.id);
      } catch {
        // API not available — use mock
      }

      setWarehouses((prev) => prev.filter((w) => w.id !== deleteTarget.id));
      deleteModal.close();
      setDeleteTarget(null);
    } finally {
      setIsDeleting(false);
    }
  }, [deleteTarget, deleteModal]);

  // ── Form helpers ──────────────────────────────────────────────────────────
  const updateField = useCallback(
    <K extends keyof WarehouseCreate>(key: K, value: WarehouseCreate[K]) => {
      setFormData((prev) => ({ ...prev, [key]: value }));
    },
    []
  );

  // ── Columns (memoized with handler closures) ──────────────────────────────
  const columns = useMemo(
    () => getColumns(handleOpenEdit, handleOpenDelete),
    [handleOpenEdit, handleOpenDelete]
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
              Warehouses
            </h1>
            <p
              className="text-muted-foreground mt-1"
              style={{
                fontSize: 'var(--text-sm)',
                letterSpacing: 'var(--tracking-normal)',
                lineHeight: 'var(--leading-normal)',
              }}
            >
              Manage storage locations and capacity
            </p>
          </div>

          <Button
            className="bg-module-erp hover:bg-module-erp/90 text-white gap-2 press-scale"
            style={{ fontSize: 'var(--text-sm)' }}
            onClick={handleOpenCreate}
          >
            <Plus className="h-4 w-4" strokeWidth={1.8} />
            Add Warehouse
          </Button>
        </motion.div>

        {/* ── Table ───────────────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1, ease: EASE }}
        >
          {warehouses.length === 0 && !isLoading ? (
            <div className="glass-surface rounded-xl p-8">
              <EmptyState
                icon={WarehouseIcon}
                title="No warehouses found"
                description="Get started by adding your first warehouse to manage storage locations."
                action={{
                  label: 'Add Warehouse',
                  onClick: handleOpenCreate,
                }}
              />
            </div>
          ) : (
            <SmartTable
              data={warehouses}
              columns={columns}
              searchable
              searchPlaceholder="Search warehouses..."
              isLoading={isLoading}
              emptyMessage="No warehouses found"
              emptyDescription="Try adjusting your search or add a new warehouse"
            />
          )}
        </motion.div>

        {/* ── Create / Edit Dialog ────────────────────────────────────────── */}
        <Dialog
          open={createModal.isOpen}
          onOpenChange={(open) => {
            if (!open) createModal.close();
          }}
        >
          <DialogContent className="sm:max-w-[640px] max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle
                style={{
                  fontSize: 'var(--text-lg)',
                  letterSpacing: 'var(--tracking-tight)',
                }}
              >
                {editingWarehouse ? 'Edit Warehouse' : 'Add Warehouse'}
              </DialogTitle>
              <DialogDescription
                style={{
                  fontSize: 'var(--text-sm)',
                  letterSpacing: 'var(--tracking-normal)',
                }}
              >
                {editingWarehouse
                  ? 'Update warehouse information below.'
                  : 'Fill in the details to create a new warehouse.'}
              </DialogDescription>
            </DialogHeader>

            <div className="grid gap-5 py-4">
              {/* Name */}
              <div className="grid gap-2">
                <Label
                  htmlFor="wh-name"
                  style={{ fontSize: 'var(--text-sm)', letterSpacing: 'var(--tracking-normal)' }}
                >
                  Name <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="wh-name"
                  value={formData.name}
                  onChange={(e) => updateField('name', e.target.value)}
                  placeholder="e.g. Main Warehouse"
                  className="press-scale"
                  style={{ fontSize: 'var(--text-sm)' }}
                />
              </div>

              {/* Code */}
              <div className="grid gap-2">
                <Label
                  htmlFor="wh-code"
                  style={{ fontSize: 'var(--text-sm)', letterSpacing: 'var(--tracking-normal)' }}
                >
                  Code
                </Label>
                <Input
                  id="wh-code"
                  value={formData.code ?? ''}
                  onChange={(e) => updateField('code', e.target.value || null)}
                  placeholder="e.g. WH-MAIN"
                  className="press-scale"
                  style={{ fontSize: 'var(--text-sm)' }}
                />
              </div>

              {/* Address */}
              <div className="grid gap-2">
                <Label
                  htmlFor="wh-address"
                  style={{ fontSize: 'var(--text-sm)', letterSpacing: 'var(--tracking-normal)' }}
                >
                  Address
                </Label>
                <Input
                  id="wh-address"
                  value={formData.address ?? ''}
                  onChange={(e) => updateField('address', e.target.value || null)}
                  placeholder="Street address"
                  className="press-scale"
                  style={{ fontSize: 'var(--text-sm)' }}
                />
              </div>

              {/* City / State */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label
                    htmlFor="wh-city"
                    style={{ fontSize: 'var(--text-sm)', letterSpacing: 'var(--tracking-normal)' }}
                  >
                    City
                  </Label>
                  <Input
                    id="wh-city"
                    value={formData.city ?? ''}
                    onChange={(e) => updateField('city', e.target.value || null)}
                    placeholder="City"
                    className="press-scale"
                    style={{ fontSize: 'var(--text-sm)' }}
                  />
                </div>
                <div className="grid gap-2">
                  <Label
                    htmlFor="wh-state"
                    style={{ fontSize: 'var(--text-sm)', letterSpacing: 'var(--tracking-normal)' }}
                  >
                    State
                  </Label>
                  <Input
                    id="wh-state"
                    value={formData.state ?? ''}
                    onChange={(e) => updateField('state', e.target.value || null)}
                    placeholder="State"
                    className="press-scale"
                    style={{ fontSize: 'var(--text-sm)' }}
                  />
                </div>
              </div>

              {/* Country / Postal Code */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label
                    htmlFor="wh-country"
                    style={{ fontSize: 'var(--text-sm)', letterSpacing: 'var(--tracking-normal)' }}
                  >
                    Country
                  </Label>
                  <Input
                    id="wh-country"
                    value={formData.country ?? ''}
                    onChange={(e) => updateField('country', e.target.value || null)}
                    placeholder="Country"
                    className="press-scale"
                    style={{ fontSize: 'var(--text-sm)' }}
                  />
                </div>
                <div className="grid gap-2">
                  <Label
                    htmlFor="wh-postal"
                    style={{ fontSize: 'var(--text-sm)', letterSpacing: 'var(--tracking-normal)' }}
                  >
                    Postal Code
                  </Label>
                  <Input
                    id="wh-postal"
                    value={formData.postal_code ?? ''}
                    onChange={(e) => updateField('postal_code', e.target.value || null)}
                    placeholder="Postal code"
                    className="press-scale"
                    style={{ fontSize: 'var(--text-sm)' }}
                  />
                </div>
              </div>

              {/* Separator */}
              <div className="border-t border-glass-border/30" />

              {/* Manager Name */}
              <div className="grid gap-2">
                <Label
                  htmlFor="wh-manager"
                  style={{ fontSize: 'var(--text-sm)', letterSpacing: 'var(--tracking-normal)' }}
                >
                  Manager Name
                </Label>
                <Input
                  id="wh-manager"
                  value={formData.manager_name ?? ''}
                  onChange={(e) => updateField('manager_name', e.target.value || null)}
                  placeholder="e.g. John Doe"
                  className="press-scale"
                  style={{ fontSize: 'var(--text-sm)' }}
                />
              </div>

              {/* Phone / Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label
                    htmlFor="wh-phone"
                    style={{ fontSize: 'var(--text-sm)', letterSpacing: 'var(--tracking-normal)' }}
                  >
                    Phone
                  </Label>
                  <Input
                    id="wh-phone"
                    value={formData.phone ?? ''}
                    onChange={(e) => updateField('phone', e.target.value || null)}
                    placeholder="+1-234-567-8900"
                    className="press-scale"
                    style={{ fontSize: 'var(--text-sm)' }}
                  />
                </div>
                <div className="grid gap-2">
                  <Label
                    htmlFor="wh-email"
                    style={{ fontSize: 'var(--text-sm)', letterSpacing: 'var(--tracking-normal)' }}
                  >
                    Email
                  </Label>
                  <Input
                    id="wh-email"
                    type="email"
                    value={formData.email ?? ''}
                    onChange={(e) => updateField('email', e.target.value || null)}
                    placeholder="warehouse@example.com"
                    className="press-scale"
                    style={{ fontSize: 'var(--text-sm)' }}
                  />
                </div>
              </div>

              {/* Capacity */}
              <div className="grid gap-2">
                <Label
                  htmlFor="wh-capacity"
                  style={{ fontSize: 'var(--text-sm)', letterSpacing: 'var(--tracking-normal)' }}
                >
                  Capacity
                </Label>
                <Input
                  id="wh-capacity"
                  type="number"
                  min={0}
                  value={formData.capacity ?? ''}
                  onChange={(e) => {
                    const val = e.target.value;
                    updateField('capacity', val === '' ? null : Number(val));
                  }}
                  placeholder="e.g. 10000"
                  className="press-scale"
                  style={{ fontSize: 'var(--text-sm)' }}
                />
              </div>

              {/* Is Active */}
              <div className="flex items-center justify-between gap-4 rounded-lg border border-glass-border/30 bg-glass-bg/20 p-3">
                <div>
                  <Label
                    htmlFor="wh-active"
                    className="cursor-pointer"
                    style={{ fontSize: 'var(--text-sm)', letterSpacing: 'var(--tracking-normal)' }}
                  >
                    Active
                  </Label>
                  <p
                    className="text-muted-foreground"
                    style={{ fontSize: 'var(--text-xs)', letterSpacing: 'var(--tracking-normal)' }}
                  >
                    Inactive warehouses are hidden from selection lists
                  </p>
                </div>
                <Switch
                  id="wh-active"
                  checked={formData.is_active ?? true}
                  onCheckedChange={(checked) => updateField('is_active', checked)}
                />
              </div>

              {/* Notes */}
              <div className="grid gap-2">
                <Label
                  htmlFor="wh-notes"
                  style={{ fontSize: 'var(--text-sm)', letterSpacing: 'var(--tracking-normal)' }}
                >
                  Notes
                </Label>
                <Textarea
                  id="wh-notes"
                  value={formData.notes ?? ''}
                  onChange={(e) => updateField('notes', e.target.value || null)}
                  placeholder="Additional notes about this warehouse..."
                  rows={3}
                  className="press-scale resize-none"
                  style={{ fontSize: 'var(--text-sm)' }}
                />
              </div>
            </div>

            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => createModal.close()}
                disabled={isSubmitting}
                className="press-scale"
                style={{ fontSize: 'var(--text-sm)' }}
              >
                Cancel
              </Button>
              <Button
                onClick={handleSubmit}
                disabled={isSubmitting || !formData.name.trim()}
                className="bg-module-erp hover:bg-module-erp/90 text-white press-scale"
                style={{ fontSize: 'var(--text-sm)' }}
              >
                {isSubmitting
                  ? 'Saving...'
                  : editingWarehouse
                    ? 'Update Warehouse'
                    : 'Create Warehouse'}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* ── Delete Confirmation Dialog ──────────────────────────────────── */}
        <ConfirmDialog
          open={deleteModal.isOpen}
          onOpenChange={(open) => {
            if (!open) {
              deleteModal.close();
              setDeleteTarget(null);
            }
          }}
          title="Delete Warehouse"
          description={
            deleteTarget
              ? `Are you sure you want to delete "${deleteTarget.name}"? This action cannot be undone.`
              : 'Are you sure you want to delete this warehouse?'
          }
          confirmLabel="Delete"
          variant="destructive"
          onConfirm={handleDelete}
          isLoading={isDeleting}
        />
      </div>
    </PageTransition>
  );
}
