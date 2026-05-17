'use client';

import { useState, useCallback, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  Plus,
  Star,
  MoreHorizontal,
  Pencil,
  Trash2,
  Mail,
  Phone,
  MapPin,
  Building2,
  Truck,
} from 'lucide-react';

import { PageTransition } from '@/modules/erp/design-system/components/animations';
import { SmartTable } from '@/modules/erp/shared/components/smart-table';
import { StatusBadge } from '@/modules/erp/shared/components/status-badge';
import { useModal } from '@/modules/erp/shared/hooks';
import { ConfirmDialog } from '@/modules/erp/shared/components/confirm-dialog';
import { EmptyState } from '@/modules/erp/shared/components/empty-state';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import type { Supplier, SupplierCreate, SupplierUpdate } from '@/modules/erp/types/erp-operations';
import { mockSuppliers } from '@/modules/erp/data/mock';
import { erpService } from '@/lib/services';
import { formatCurrency, formatDate, prettifyStatus } from '@/lib/format';

// ── Animation easing ──────────────────────────────────────────────────────
const EASE_STANDARD = [0.25, 0.46, 0.45, 0.94] as const;

// ── Star Rating Display ───────────────────────────────────────────────────
function StarRatingDisplay({ rating }: { rating: number | null | undefined }) {
  const value = rating ?? 0;
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }, (_, i) => (
        <Star
          key={i}
          className={`h-3.5 w-3.5 ${
            i < value
              ? 'text-amber-400 fill-amber-400'
              : 'text-muted-foreground/25'
          }`}
          strokeWidth={i < value ? 0 : 1.5}
        />
      ))}
    </div>
  );
}

// ── Star Rating Picker (clickable) ────────────────────────────────────────
function StarRatingPicker({
  value,
  onChange,
}: {
  value: number;
  onChange: (val: number) => void;
}) {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: 5 }, (_, i) => {
        const starValue = i + 1;
        const isFilled = starValue <= (hovered ?? value);

        return (
          <button
            key={i}
            type="button"
            onClick={() => onChange(starValue)}
            onMouseEnter={() => setHovered(starValue)}
            onMouseLeave={() => setHovered(null)}
            className="p-0.5 transition-transform duration-150 hover:scale-110 press-scale"
            aria-label={`Rate ${starValue} star${starValue > 1 ? 's' : ''}`}
          >
            <Star
              className={`h-5 w-5 transition-colors duration-150 ${
                isFilled
                  ? 'text-amber-400 fill-amber-400'
                  : 'text-muted-foreground/40'
              }`}
              strokeWidth={isFilled ? 0 : 1.5}
            />
          </button>
        );
      })}
      <span
        className="ml-2 text-muted-foreground"
        style={{ fontSize: 'var(--text-sm)' }}
      >
        {value}/5
      </span>
    </div>
  );
}

// ── Empty form state ──────────────────────────────────────────────────────
function getEmptyForm(): SupplierCreate {
  return {
    name: '',
    code: '',
    contact_person: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    country: '',
    postal_code: '',
    website: '',
    tax_id: '',
    payment_terms: '',
    notes: '',
    rating: 0,
    is_active: true,
  };
}

// ── Main Page Component ───────────────────────────────────────────────────
export default function SuppliersPage() {
  // ── State ─────────────────────────────────────────────────────────────
  const [suppliers, setSuppliers] = useState<Supplier[]>(mockSuppliers);
  const [isLoading, setIsLoading] = useState(false);
  const [formMode, setFormMode] = useState<'create' | 'edit'>('create');
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formData, setFormData] = useState<SupplierCreate>(getEmptyForm());
  const [deleteTarget, setDeleteTarget] = useState<Supplier | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const createModal = useModal();
  const deleteModal = useModal();

  // ── Form handlers ─────────────────────────────────────────────────────
  const updateField = useCallback(
    <K extends keyof SupplierCreate>(key: K, value: SupplierCreate[K]) => {
      setFormData((prev) => ({ ...prev, [key]: value }));
    },
    []
  );

  const handleOpenCreate = useCallback(() => {
    setFormMode('create');
    setEditingId(null);
    setFormData(getEmptyForm());
    createModal.open();
  }, [createModal]);

  const handleOpenEdit = useCallback(
    (supplier: Supplier) => {
      setFormMode('edit');
      setEditingId(supplier.id);
      setFormData({
        name: supplier.name,
        code: supplier.code ?? '',
        contact_person: supplier.contact_person ?? '',
        email: supplier.email ?? '',
        phone: supplier.phone ?? '',
        address: supplier.address ?? '',
        city: supplier.city ?? '',
        state: supplier.state ?? '',
        country: supplier.country ?? '',
        postal_code: supplier.postal_code ?? '',
        website: supplier.website ?? '',
        tax_id: supplier.tax_id ?? '',
        payment_terms: supplier.payment_terms ?? '',
        notes: supplier.notes ?? '',
        rating: supplier.rating ?? 0,
        is_active: supplier.is_active,
      });
      createModal.open();
    },
    [createModal]
  );

  const handleOpenDelete = useCallback(
    (supplier: Supplier) => {
      setDeleteTarget(supplier);
      deleteModal.open();
    },
    [deleteModal]
  );

  // ── CRUD operations ───────────────────────────────────────────────────
  const handleSubmit = useCallback(async () => {
    if (!formData.name.trim()) return;
    setIsSubmitting(true);

    try {
      if (formMode === 'create') {
        try {
          await erpService.createSupplier(formData);
        } catch {
          // fallback to mock
        }
        const newSupplier: Supplier = {
          id: Math.max(0, ...suppliers.map((s) => s.id)) + 1,
          name: formData.name,
          code: formData.code ?? null,
          contact_person: formData.contact_person ?? null,
          email: formData.email ?? null,
          phone: formData.phone ?? null,
          address: formData.address ?? null,
          city: formData.city ?? null,
          state: formData.state ?? null,
          country: formData.country ?? null,
          postal_code: formData.postal_code ?? null,
          website: formData.website ?? null,
          tax_id: formData.tax_id ?? null,
          payment_terms: formData.payment_terms ?? null,
          notes: formData.notes ?? null,
          rating: formData.rating ?? null,
          is_active: formData.is_active ?? true,
          owner_id: null,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        };
        setSuppliers((prev) => [...prev, newSupplier]);
      } else if (formMode === 'edit' && editingId !== null) {
        const updateData: SupplierUpdate = { ...formData };
        try {
          await erpService.updateSupplier(editingId, updateData);
        } catch {
          // fallback to mock
        }
        setSuppliers((prev) =>
          prev.map((s) =>
            s.id === editingId
              ? {
                  ...s,
                  ...updateData,
                  updated_at: new Date().toISOString(),
                }
              : s
          )
        );
      }
      createModal.close();
    } finally {
      setIsSubmitting(false);
    }
  }, [formData, formMode, editingId, suppliers, createModal]);

  const handleDelete = useCallback(async () => {
    if (!deleteTarget) return;
    setIsSubmitting(true);

    try {
      try {
        await erpService.deleteSupplier(deleteTarget.id);
      } catch {
        // fallback to mock
      }
      setSuppliers((prev) => prev.filter((s) => s.id !== deleteTarget.id));
      deleteModal.close();
      setDeleteTarget(null);
    } finally {
      setIsSubmitting(false);
    }
  }, [deleteTarget, deleteModal]);

  // ── Table columns ─────────────────────────────────────────────────────
  const columns = useMemo(
    () => [
      {
        accessorKey: 'name',
        header: 'Name',
        size: 200,
        cell: ({ row }: { row: { original: Supplier } }) => {
          const s = row.original;
          return (
            <div className="flex flex-col gap-0.5">
              <span
                className="font-semibold text-foreground"
                style={{
                  fontSize: 'var(--text-sm)',
                  letterSpacing: 'var(--tracking-tight)',
                  lineHeight: 'var(--leading-tight)',
                }}
              >
                {s.name}
              </span>
              {s.code && (
                <span
                  className="text-muted-foreground"
                  style={{
                    fontSize: 'var(--text-xs)',
                    letterSpacing: 'var(--tracking-wide)',
                  }}
                >
                  {s.code}
                </span>
              )}
            </div>
          );
        },
      },
      {
        accessorKey: 'contact_person',
        header: 'Contact Person',
        size: 150,
        cell: ({ row }: { row: { original: Supplier } }) => {
          const s = row.original;
          return (
            <span
              className={s.contact_person ? 'text-foreground' : 'text-muted-foreground/50'}
              style={{
                fontSize: 'var(--text-sm)',
                letterSpacing: 'var(--tracking-normal)',
              }}
            >
              {s.contact_person || '\u2014'}
            </span>
          );
        },
      },
      {
        id: 'contact_info',
        header: 'Email / Phone',
        size: 200,
        cell: ({ row }: { row: { original: Supplier } }) => {
          const s = row.original;
          return (
            <div className="flex flex-col gap-0.5">
              {s.email ? (
                <div className="flex items-center gap-1.5">
                  <Mail className="h-3 w-3 text-muted-foreground/50 shrink-0" strokeWidth={1.5} />
                  <span
                    className="text-foreground truncate"
                    style={{ fontSize: 'var(--text-xs)' }}
                  >
                    {s.email}
                  </span>
                </div>
              ) : null}
              {s.phone ? (
                <div className="flex items-center gap-1.5">
                  <Phone className="h-3 w-3 text-muted-foreground/50 shrink-0" strokeWidth={1.5} />
                  <span
                    className="text-foreground"
                    style={{ fontSize: 'var(--text-xs)' }}
                  >
                    {s.phone}
                  </span>
                </div>
              ) : null}
              {!s.email && !s.phone && (
                <span
                  className="text-muted-foreground/50"
                  style={{ fontSize: 'var(--text-xs)' }}
                >
                  {'\u2014'}
                </span>
              )}
            </div>
          );
        },
      },
      {
        id: 'location',
        header: 'City / State',
        size: 150,
        cell: ({ row }: { row: { original: Supplier } }) => {
          const s = row.original;
          const hasLocation = s.city || s.state;
          return (
            <div className="flex items-center gap-1.5">
              {hasLocation && (
                <MapPin className="h-3 w-3 text-muted-foreground/50 shrink-0" strokeWidth={1.5} />
              )}
              <span
                className={hasLocation ? 'text-foreground' : 'text-muted-foreground/50'}
                style={{ fontSize: 'var(--text-sm)' }}
              >
                {hasLocation
                  ? [s.city, s.state].filter(Boolean).join(', ')
                  : '\u2014'}
              </span>
            </div>
          );
        },
      },
      {
        accessorKey: 'payment_terms',
        header: 'Payment Terms',
        size: 130,
        cell: ({ row }: { row: { original: Supplier } }) => {
          const s = row.original;
          return (
            <span
              className={s.payment_terms ? 'text-foreground' : 'text-muted-foreground/50'}
              style={{
                fontSize: 'var(--text-sm)',
                letterSpacing: 'var(--tracking-normal)',
              }}
            >
              {s.payment_terms || '\u2014'}
            </span>
          );
        },
      },
      {
        accessorKey: 'rating',
        header: 'Rating',
        size: 130,
        cell: ({ row }: { row: { original: Supplier } }) => {
          return <StarRatingDisplay rating={row.original.rating} />;
        },
      },
      {
        accessorKey: 'is_active',
        header: 'Status',
        size: 110,
        cell: ({ row }: { row: { original: Supplier } }) => {
          const s = row.original;
          return (
            <StatusBadge status={s.is_active ? 'active' : 'inactive'} />
          );
        },
      },
      {
        id: 'actions',
        header: '',
        size: 50,
        cell: ({ row }: { row: { original: Supplier } }) => {
          const s = row.original;
          return (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 press-scale"
                  onClick={(e) => e.stopPropagation()}
                  aria-label={`Actions for ${s.name}`}
                >
                  <MoreHorizontal className="h-4 w-4" strokeWidth={1.5} />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-36">
                <DropdownMenuItem
                  onClick={(e) => {
                    e.stopPropagation();
                    handleOpenEdit(s);
                  }}
                  className="gap-2"
                >
                  <Pencil className="h-3.5 w-3.5" strokeWidth={1.5} />
                  Edit
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={(e) => {
                    e.stopPropagation();
                    handleOpenDelete(s);
                  }}
                  className="gap-2 text-red-600 focus:text-red-600 focus:bg-red-500/10"
                >
                  <Trash2 className="h-3.5 w-3.5" strokeWidth={1.5} />
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          );
        },
      },
    ],
    [handleOpenEdit, handleOpenDelete]
  );

  // ── Render ────────────────────────────────────────────────────────────
  return (
    <PageTransition>
      <div className="p-4 sm:p-6 lg:p-8 space-y-6">
        {/* ── Header ─────────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.18, ease: EASE_STANDARD }}
          className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
        >
          <div className="space-y-1">
            <h1
              className="font-bold text-foreground"
              style={{
                fontSize: 'var(--text-xl)',
                letterSpacing: 'var(--tracking-tight)',
                lineHeight: 'var(--leading-tight)',
              }}
            >
              Suppliers
            </h1>
            <p
              className="text-muted-foreground"
              style={{
                fontSize: 'var(--text-sm)',
                letterSpacing: 'var(--tracking-normal)',
              }}
            >
              Manage your vendor relationships
            </p>
          </div>
          <Button
            onClick={handleOpenCreate}
            className="bg-module-erp hover:bg-module-erp/90 text-white press-scale gap-2 self-start sm:self-auto"
          >
            <Plus className="h-4 w-4" strokeWidth={2} />
            Add Supplier
          </Button>
        </motion.div>

        {/* ── Table ──────────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.28, ease: EASE_STANDARD, delay: 0.06 }}
        >
          {suppliers.length === 0 && !isLoading ? (
            <div className="glass-surface rounded-xl p-6">
              <EmptyState
                icon={Truck}
                title="No suppliers yet"
                description="Add your first supplier to start managing vendor relationships"
                action={{
                  label: 'Add Supplier',
                  onClick: handleOpenCreate,
                }}
              />
            </div>
          ) : (
            <SmartTable
              data={suppliers}
              columns={columns}
              searchable
              searchPlaceholder="Search suppliers by name, code, contact..."
              pageSize={10}
              isLoading={isLoading}
              emptyMessage="No suppliers found"
              emptyDescription="Try adjusting your search or add a new supplier"
            />
          )}
        </motion.div>

        {/* ── Create / Edit Dialog ───────────────────────────────────── */}
        <Dialog open={createModal.isOpen} onOpenChange={createModal.setIsOpen}>
          <DialogContent className="sm:max-w-[640px] max-h-[85vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle
                style={{
                  fontSize: 'var(--text-lg)',
                  letterSpacing: 'var(--tracking-tight)',
                }}
              >
                {formMode === 'create' ? 'Add Supplier' : 'Edit Supplier'}
              </DialogTitle>
            </DialogHeader>

            <div className="grid gap-6 py-4">
              {/* ── Basic Info Section ─────────────────────────────── */}
              <div className="space-y-4">
                <div
                  className="font-medium text-foreground flex items-center gap-2"
                  style={{
                    fontSize: 'var(--text-sm)',
                    letterSpacing: 'var(--tracking-wide)',
                  }}
                >
                  <Building2 className="h-4 w-4 text-module-erp" strokeWidth={1.5} />
                  Basic Information
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Name */}
                  <div className="space-y-2 sm:col-span-2">
                    <Label htmlFor="supplier-name" className="text-xs">
                      Name <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="supplier-name"
                      value={formData.name}
                      onChange={(e) => updateField('name', e.target.value)}
                      placeholder="Enter supplier name"
                      className="glass-surface"
                    />
                  </div>

                  {/* Code */}
                  <div className="space-y-2">
                    <Label htmlFor="supplier-code" className="text-xs">
                      Code
                    </Label>
                    <Input
                      id="supplier-code"
                      value={formData.code ?? ''}
                      onChange={(e) => updateField('code', e.target.value || null)}
                      placeholder="e.g. SUP-001"
                      className="glass-surface"
                    />
                  </div>

                  {/* Tax ID */}
                  <div className="space-y-2">
                    <Label htmlFor="supplier-tax-id" className="text-xs">
                      Tax ID
                    </Label>
                    <Input
                      id="supplier-tax-id"
                      value={formData.tax_id ?? ''}
                      onChange={(e) => updateField('tax_id', e.target.value || null)}
                      placeholder="e.g. GST27AABCT1234A1Z5"
                      className="glass-surface"
                    />
                  </div>
                </div>
              </div>

              {/* ── Contact Section ────────────────────────────────── */}
              <div className="space-y-4">
                <div
                  className="font-medium text-foreground flex items-center gap-2"
                  style={{
                    fontSize: 'var(--text-sm)',
                    letterSpacing: 'var(--tracking-wide)',
                  }}
                >
                  <Mail className="h-4 w-4 text-module-erp" strokeWidth={1.5} />
                  Contact Details
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Contact Person */}
                  <div className="space-y-2">
                    <Label htmlFor="supplier-contact-person" className="text-xs">
                      Contact Person
                    </Label>
                    <Input
                      id="supplier-contact-person"
                      value={formData.contact_person ?? ''}
                      onChange={(e) => updateField('contact_person', e.target.value || null)}
                      placeholder="Full name"
                      className="glass-surface"
                    />
                  </div>

                  {/* Email */}
                  <div className="space-y-2">
                    <Label htmlFor="supplier-email" className="text-xs">
                      Email
                    </Label>
                    <Input
                      id="supplier-email"
                      type="email"
                      value={formData.email ?? ''}
                      onChange={(e) => updateField('email', e.target.value || null)}
                      placeholder="email@company.com"
                      className="glass-surface"
                    />
                  </div>

                  {/* Phone */}
                  <div className="space-y-2">
                    <Label htmlFor="supplier-phone" className="text-xs">
                      Phone
                    </Label>
                    <Input
                      id="supplier-phone"
                      value={formData.phone ?? ''}
                      onChange={(e) => updateField('phone', e.target.value || null)}
                      placeholder="+91-9876543210"
                      className="glass-surface"
                    />
                  </div>

                  {/* Website */}
                  <div className="space-y-2">
                    <Label htmlFor="supplier-website" className="text-xs">
                      Website
                    </Label>
                    <Input
                      id="supplier-website"
                      value={formData.website ?? ''}
                      onChange={(e) => updateField('website', e.target.value || null)}
                      placeholder="https://example.com"
                      className="glass-surface"
                    />
                  </div>
                </div>
              </div>

              {/* ── Address Section ────────────────────────────────── */}
              <div className="space-y-4">
                <div
                  className="font-medium text-foreground flex items-center gap-2"
                  style={{
                    fontSize: 'var(--text-sm)',
                    letterSpacing: 'var(--tracking-wide)',
                  }}
                >
                  <MapPin className="h-4 w-4 text-module-erp" strokeWidth={1.5} />
                  Address
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Address */}
                  <div className="space-y-2 sm:col-span-2">
                    <Label htmlFor="supplier-address" className="text-xs">
                      Street Address
                    </Label>
                    <Input
                      id="supplier-address"
                      value={formData.address ?? ''}
                      onChange={(e) => updateField('address', e.target.value || null)}
                      placeholder="123 Industrial Area"
                      className="glass-surface"
                    />
                  </div>

                  {/* City */}
                  <div className="space-y-2">
                    <Label htmlFor="supplier-city" className="text-xs">
                      City
                    </Label>
                    <Input
                      id="supplier-city"
                      value={formData.city ?? ''}
                      onChange={(e) => updateField('city', e.target.value || null)}
                      placeholder="Mumbai"
                      className="glass-surface"
                    />
                  </div>

                  {/* State */}
                  <div className="space-y-2">
                    <Label htmlFor="supplier-state" className="text-xs">
                      State
                    </Label>
                    <Input
                      id="supplier-state"
                      value={formData.state ?? ''}
                      onChange={(e) => updateField('state', e.target.value || null)}
                      placeholder="Maharashtra"
                      className="glass-surface"
                    />
                  </div>

                  {/* Country */}
                  <div className="space-y-2">
                    <Label htmlFor="supplier-country" className="text-xs">
                      Country
                    </Label>
                    <Input
                      id="supplier-country"
                      value={formData.country ?? ''}
                      onChange={(e) => updateField('country', e.target.value || null)}
                      placeholder="India"
                      className="glass-surface"
                    />
                  </div>

                  {/* Postal Code */}
                  <div className="space-y-2">
                    <Label htmlFor="supplier-postal-code" className="text-xs">
                      Postal Code
                    </Label>
                    <Input
                      id="supplier-postal-code"
                      value={formData.postal_code ?? ''}
                      onChange={(e) => updateField('postal_code', e.target.value || null)}
                      placeholder="400001"
                      className="glass-surface"
                    />
                  </div>
                </div>
              </div>

              {/* ── Business Section ───────────────────────────────── */}
              <div className="space-y-4">
                <div
                  className="font-medium text-foreground flex items-center gap-2"
                  style={{
                    fontSize: 'var(--text-sm)',
                    letterSpacing: 'var(--tracking-wide)',
                  }}
                >
                  <Truck className="h-4 w-4 text-module-erp" strokeWidth={1.5} />
                  Business Details
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Payment Terms */}
                  <div className="space-y-2">
                    <Label htmlFor="supplier-payment-terms" className="text-xs">
                      Payment Terms
                    </Label>
                    <Select
                      value={formData.payment_terms ?? ''}
                      onValueChange={(val) =>
                        updateField('payment_terms', val || null)
                      }
                    >
                      <SelectTrigger id="supplier-payment-terms" className="glass-surface">
                        <SelectValue placeholder="Select terms" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="COD">COD</SelectItem>
                        <SelectItem value="Net 15">Net 15</SelectItem>
                        <SelectItem value="Net 30">Net 30</SelectItem>
                        <SelectItem value="Net 45">Net 45</SelectItem>
                        <SelectItem value="Net 60">Net 60</SelectItem>
                        <SelectItem value="Net 90">Net 90</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Rating */}
                  <div className="space-y-2">
                    <Label className="text-xs">Rating</Label>
                    <StarRatingPicker
                      value={formData.rating ?? 0}
                      onChange={(val) => updateField('rating', val)}
                    />
                  </div>
                </div>
              </div>

              {/* ── Notes & Active ──────────────────────────────────── */}
              <div className="space-y-4">
                {/* Notes */}
                <div className="space-y-2">
                  <Label htmlFor="supplier-notes" className="text-xs">
                    Notes
                  </Label>
                  <Textarea
                    id="supplier-notes"
                    value={formData.notes ?? ''}
                    onChange={(e) => updateField('notes', e.target.value || null)}
                    placeholder="Additional notes about this supplier..."
                    rows={3}
                    className="glass-surface resize-none"
                  />
                </div>

                {/* Is Active */}
                <div className="flex items-center justify-between rounded-lg border border-glass-border/50 p-3">
                  <div className="space-y-0.5">
                    <Label
                      htmlFor="supplier-active"
                      className="text-xs font-medium"
                    >
                      Active Status
                    </Label>
                    <p
                      className="text-muted-foreground"
                      style={{ fontSize: 'var(--text-xs)' }}
                    >
                      Inactive suppliers won&apos;t appear in selection lists
                    </p>
                  </div>
                  <Switch
                    id="supplier-active"
                    checked={formData.is_active ?? true}
                    onCheckedChange={(checked) => updateField('is_active', checked)}
                  />
                </div>
              </div>
            </div>

            <DialogFooter className="gap-2">
              <Button
                variant="outline"
                onClick={() => createModal.close()}
                disabled={isSubmitting}
                className="press-scale"
              >
                Cancel
              </Button>
              <Button
                onClick={handleSubmit}
                disabled={isSubmitting || !formData.name.trim()}
                className="bg-module-erp hover:bg-module-erp/90 text-white press-scale"
              >
                {isSubmitting
                  ? 'Saving...'
                  : formMode === 'create'
                    ? 'Add Supplier'
                    : 'Save Changes'}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* ── Delete Confirmation Dialog ──────────────────────────────── */}
        <ConfirmDialog
          open={deleteModal.isOpen}
          onOpenChange={(open) => {
            deleteModal.setIsOpen(open);
            if (!open) setDeleteTarget(null);
          }}
          title="Delete Supplier"
          description={
            deleteTarget
              ? `Are you sure you want to delete "${deleteTarget.name}"? This action cannot be undone.`
              : 'Are you sure you want to delete this supplier?'
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
