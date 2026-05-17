'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import { motion } from 'framer-motion';
import { PageTransition } from '@/modules/erp/design-system/components/animations';
import { SmartTable } from '@/modules/erp/shared/components/smart-table';
import { StatusBadge } from '@/modules/erp/shared/components/status-badge';
import { ConfirmDialog } from '@/modules/erp/shared/components/confirm-dialog';
import { EmptyState } from '@/modules/erp/shared/components/empty-state';
import { useModal, useSearch } from '@/modules/erp/shared/hooks';
import { erpService } from '@/lib/services';
import { formatCurrency, formatDate, prettifyStatus } from '@/lib/format';
import { PRODUCT_TYPES, PRODUCT_UNITS } from '@/modules/erp/core/utils/constants';
import type { Product, ProductCreate, ProductUpdate, ProductType, Category, Supplier } from '@/modules/erp/types/erp-operations';
import { mockProducts, mockCategories, mockSuppliers } from '@/modules/erp/data/mock';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter,
} from '@/components/ui/dialog';
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from '@/components/ui/select';
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Plus, MoreVertical, Pencil, Trash2, Package, Search,
} from 'lucide-react';
import type { ColumnDef } from '@tanstack/react-table';

// ── Animation easing ────────────────────────────────────────────────────────
const EASE = [0.25, 0.46, 0.45, 0.94] as const;

// ── Empty form state ────────────────────────────────────────────────────────
const emptyForm: ProductCreate & { is_active: boolean } = {
  name: '',
  sku: '',
  barcode: '',
  product_type: 'physical',
  category_id: null,
  supplier_id: null,
  cost_price: null,
  selling_price: null,
  mrp: null,
  tax_rate: null,
  unit: 'piece',
  min_stock_level: 0,
  max_stock_level: null,
  track_inventory: true,
  description: '',
  is_active: true,
};

// ── Page Component ──────────────────────────────────────────────────────────

export default function ProductsPage() {
  // Data state
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Modal state
  const formModal = useModal();
  const deleteModal = useModal();

  // Form state
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [form, setForm] = useState<ProductCreate & { is_active: boolean }>(emptyForm);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [deleteTarget, setDeleteTarget] = useState<Product | null>(null);

  // Filter state
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [filterType, setFilterType] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');

  // Search
  const { search, setSearch, debouncedSearch } = useSearch();

  // ── Data fetching ───────────────────────────────────────────────────────

  const fetchProducts = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await erpService.getProducts();
      const data = (response as any)?.data ?? (response as any)?.items ?? response;
      setProducts(Array.isArray(data) ? data : mockProducts);
    } catch {
      setProducts(mockProducts);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const fetchCategories = useCallback(async () => {
    try {
      const response = await erpService.getCategories();
      const data = (response as any)?.data ?? (response as any)?.items ?? response;
      setCategories(Array.isArray(data) ? data : mockCategories);
    } catch {
      setCategories(mockCategories);
    }
  }, []);

  const fetchSuppliers = useCallback(async () => {
    try {
      const response = await erpService.getSuppliers();
      const data = (response as any)?.data ?? (response as any)?.items ?? response;
      setSuppliers(Array.isArray(data) ? data : mockSuppliers);
    } catch {
      setSuppliers(mockSuppliers);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
    fetchCategories();
    fetchSuppliers();
  }, [fetchProducts, fetchCategories, fetchSuppliers]);

  // ── Filtered data ───────────────────────────────────────────────────────

  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Search filter
    if (debouncedSearch) {
      const q = debouncedSearch.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.sku.toLowerCase().includes(q) ||
          (p.category_name && p.category_name.toLowerCase().includes(q)) ||
          (p.supplier_name && p.supplier_name.toLowerCase().includes(q))
      );
    }

    // Category filter
    if (filterCategory !== 'all') {
      result = result.filter((p) => String(p.category_id) === filterCategory);
    }

    // Type filter
    if (filterType !== 'all') {
      result = result.filter((p) => p.product_type === filterType);
    }

    // Status filter
    if (filterStatus !== 'all') {
      const isActive = filterStatus === 'active';
      result = result.filter((p) => p.is_active === isActive);
    }

    return result;
  }, [products, debouncedSearch, filterCategory, filterType, filterStatus]);

  // ── Form helpers ────────────────────────────────────────────────────────

  const updateForm = useCallback((field: string, value: unknown) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setFormErrors((prev) => {
      const next = { ...prev };
      delete next[field];
      return next;
    });
  }, []);

  const validateForm = useCallback((): boolean => {
    const errors: Record<string, string> = {};
    if (!form.name.trim()) errors.name = 'Product name is required';
    if (!form.sku.trim()) errors.sku = 'SKU is required';
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  }, [form]);

  const resetForm = useCallback(() => {
    setForm(emptyForm);
    setFormErrors({});
    setEditingProduct(null);
  }, []);

  // ── CRUD operations ─────────────────────────────────────────────────────

  const handleOpenCreate = useCallback(() => {
    resetForm();
    setEditingProduct(null);
    formModal.open();
  }, [resetForm, formModal]);

  const handleOpenEdit = useCallback((product: Product) => {
    setEditingProduct(product);
    setForm({
      name: product.name,
      sku: product.sku,
      barcode: product.barcode ?? '',
      product_type: product.product_type,
      category_id: product.category_id ?? null,
      supplier_id: product.supplier_id ?? null,
      cost_price: product.cost_price ?? null,
      selling_price: product.selling_price ?? null,
      mrp: product.mrp ?? null,
      tax_rate: product.tax_rate ?? null,
      unit: product.unit,
      min_stock_level: product.min_stock_level,
      max_stock_level: product.max_stock_level ?? null,
      track_inventory: product.track_inventory,
      description: product.description ?? '',
      is_active: product.is_active,
    });
    setFormErrors({});
    formModal.open();
  }, [formModal]);

  const handleSubmit = useCallback(async () => {
    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      if (editingProduct) {
        // Update
        try {
          await erpService.updateProduct(editingProduct.id, form as ProductUpdate);
        } catch {
          // Fallback: update locally
        }
        setProducts((prev) =>
          prev.map((p) => {
            if (p.id !== editingProduct.id) return p;
            const cat = categories.find((c) => c.id === form.category_id);
            const sup = suppliers.find((s) => s.id === form.supplier_id);
            return {
              ...p,
              ...form,
              category_name: cat?.name ?? p.category_name,
              supplier_name: sup?.name ?? p.supplier_name,
            } as Product;
          })
        );
      } else {
        // Create
        let newId = Date.now();
        try {
          const response = await erpService.createProduct(form);
          newId = (response as any)?.id ?? newId;
        } catch {
          // Fallback: create locally
        }
        const cat = categories.find((c) => c.id === form.category_id);
        const sup = suppliers.find((s) => s.id === form.supplier_id);
        const newProduct: Product = {
          id: newId,
          name: form.name,
          sku: form.sku,
          barcode: form.barcode || null,
          product_type: form.product_type as ProductType,
          category_id: form.category_id,
          supplier_id: form.supplier_id,
          cost_price: form.cost_price,
          selling_price: form.selling_price,
          mrp: form.mrp,
          tax_rate: form.tax_rate,
          unit: form.unit as Product['unit'],
          min_stock_level: form.min_stock_level ?? 0,
          max_stock_level: form.max_stock_level,
          track_inventory: form.track_inventory ?? true,
          description: form.description || null,
          image_url: null,
          is_active: form.is_active,
          owner_id: null,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
          category_name: cat?.name ?? undefined,
          supplier_name: sup?.name ?? undefined,
        };
        setProducts((prev) => [newProduct, ...prev]);
      }

      formModal.close();
      resetForm();
    } catch {
      // Silently handle error
    } finally {
      setIsSubmitting(false);
    }
  }, [form, editingProduct, validateForm, formModal, resetForm, categories, suppliers]);

  const handleDelete = useCallback(async () => {
    if (!deleteTarget) return;
    setIsSubmitting(true);
    try {
      try {
        await erpService.deleteProduct(deleteTarget.id);
      } catch {
        // Fallback: delete locally
      }
      setProducts((prev) => prev.filter((p) => p.id !== deleteTarget.id));
      deleteModal.close();
      setDeleteTarget(null);
    } catch {
      // Silently handle error
    } finally {
      setIsSubmitting(false);
    }
  }, [deleteTarget, deleteModal]);

  const handleDeleteClick = useCallback((product: Product) => {
    setDeleteTarget(product);
    deleteModal.open();
  }, [deleteModal]);

  // ── Table columns ───────────────────────────────────────────────────────

  const columns: ColumnDef<Product>[] = useMemo(
    () => [
      {
        accessorKey: 'name',
        header: 'Product',
        size: 240,
        cell: ({ row }) => {
          const product = row.original;
          return (
            <div className="flex flex-col gap-0.5">
              <span
                className="font-medium text-foreground truncate max-w-[200px]"
                style={{ fontSize: 'var(--text-sm)', letterSpacing: 'var(--tracking-tight)' }}
              >
                {product.name}
              </span>
              <span
                className="text-muted-foreground"
                style={{ fontSize: 'var(--text-xs)', letterSpacing: 'var(--tracking-wide)' }}
              >
                {product.sku}
              </span>
            </div>
          );
        },
      },
      {
        accessorKey: 'product_type',
        header: 'Type',
        size: 120,
        cell: ({ row }) => (
          <Badge
            variant="outline"
            className="border-glass-border/50 bg-glass-bg/50"
            style={{ fontSize: 'var(--text-xs)' }}
          >
            {prettifyStatus(row.original.product_type)}
          </Badge>
        ),
      },
      {
        accessorKey: 'category_name',
        header: 'Category',
        size: 140,
        cell: ({ row }) => (
          <span
            className="text-foreground/80"
            style={{ fontSize: 'var(--text-sm)', letterSpacing: 'var(--tracking-normal)' }}
          >
            {row.original.category_name || '\u2014'}
          </span>
        ),
      },
      {
        accessorKey: 'supplier_name',
        header: 'Supplier',
        size: 160,
        cell: ({ row }) => (
          <span
            className="text-foreground/80"
            style={{ fontSize: 'var(--text-sm)', letterSpacing: 'var(--tracking-normal)' }}
          >
            {row.original.supplier_name || '\u2014'}
          </span>
        ),
      },
      {
        accessorKey: 'cost_price',
        header: 'Cost Price',
        size: 120,
        cell: ({ row }) => (
          <span
            className="text-foreground/80 tabular-nums"
            style={{ fontSize: 'var(--text-sm)', letterSpacing: 'var(--tracking-normal)' }}
          >
            {row.original.cost_price != null ? formatCurrency(row.original.cost_price, 'INR') : '\u2014'}
          </span>
        ),
      },
      {
        accessorKey: 'selling_price',
        header: 'Selling Price',
        size: 120,
        cell: ({ row }) => (
          <span
            className="font-medium text-foreground tabular-nums"
            style={{ fontSize: 'var(--text-sm)', letterSpacing: 'var(--tracking-normal)' }}
          >
            {row.original.selling_price != null ? formatCurrency(row.original.selling_price, 'INR') : '\u2014'}
          </span>
        ),
      },
      {
        accessorKey: 'min_stock_level',
        header: 'Stock',
        size: 90,
        cell: ({ row }) => {
          const product = row.original;
          const isLow = product.track_inventory && product.min_stock_level > 0;
          return (
            <span
              className={isLow ? 'text-amber-600 dark:text-amber-400' : 'text-foreground/80'}
              style={{ fontSize: 'var(--text-sm)', letterSpacing: 'var(--tracking-normal)' }}
            >
              Min: {product.min_stock_level}
              {product.max_stock_level != null ? ` / ${product.max_stock_level}` : ''}
            </span>
          );
        },
      },
      {
        accessorKey: 'is_active',
        header: 'Status',
        size: 100,
        cell: ({ row }) => (
          <StatusBadge status={row.original.is_active ? 'active' : 'inactive'} />
        ),
      },
      {
        id: 'actions',
        header: '',
        size: 50,
        cell: ({ row }) => {
          const product = row.original;
          return (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 press-scale"
                  onClick={(e) => e.stopPropagation()}
                >
                  <MoreVertical className="h-4 w-4" strokeWidth={1.8} />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-40">
                <DropdownMenuItem onClick={() => handleOpenEdit(product)}>
                  <Pencil className="h-3.5 w-3.5 mr-2" strokeWidth={1.8} />
                  Edit
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => handleDeleteClick(product)}
                  className="text-red-600 dark:text-red-400 focus:text-red-600 focus:bg-red-500/10"
                >
                  <Trash2 className="h-3.5 w-3.5 mr-2" strokeWidth={1.8} />
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          );
        },
      },
    ],
    [handleOpenEdit, handleDeleteClick]
  );

  // ── Render ──────────────────────────────────────────────────────────────

  return (
    <PageTransition>
      <div className="p-4 sm:p-6 lg:p-8">
        {/* ── Page Header ─────────────────────────────────────────────── */}
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
              Products
            </h1>
            <p
              className="text-muted-foreground mt-1"
              style={{
                fontSize: 'var(--text-sm)',
                letterSpacing: 'var(--tracking-normal)',
                lineHeight: 'var(--leading-normal)',
              }}
            >
              Manage your product catalog
            </p>
          </div>

          <Button
            onClick={handleOpenCreate}
            className="bg-module-erp hover:bg-module-erp/90 text-white press-scale self-start sm:self-auto"
          >
            <Plus className="h-4 w-4 mr-2" strokeWidth={2} />
            Add Product
          </Button>
        </motion.div>

        {/* ── Filter Bar ──────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2, delay: 0.06, ease: EASE }}
          className="glass-surface hover-lift rounded-xl p-4 mb-6"
        >
          <div className="flex flex-col sm:flex-row gap-3">
            {/* Category Filter */}
            <div className="flex-1 min-w-0">
              <Select value={filterCategory} onValueChange={setFilterCategory}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {categories.map((cat) => (
                    <SelectItem key={cat.id} value={String(cat.id)}>
                      {cat.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Product Type Filter */}
            <div className="flex-1 min-w-0">
              <Select value={filterType} onValueChange={setFilterType}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Product Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  {PRODUCT_TYPES.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Status Filter */}
            <div className="flex-1 min-w-0">
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </motion.div>

        {/* ── Data Table ──────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1, ease: EASE }}
        >
          {!isLoading && filteredProducts.length === 0 && !debouncedSearch && filterCategory === 'all' && filterType === 'all' && filterStatus === 'all' ? (
            <EmptyState
              icon={Package}
              title="No products yet"
              description="Get started by adding your first product to the catalog."
              action={{ label: 'Add Product', onClick: handleOpenCreate }}
            />
          ) : (
            <SmartTable
              data={filteredProducts}
              columns={columns}
              searchable
              searchPlaceholder="Search products by name, SKU, category, or supplier..."
              isLoading={isLoading}
              emptyMessage="No products found"
              emptyDescription="Try adjusting your search or filters"
            />
          )}
        </motion.div>

        {/* ── Create / Edit Dialog ────────────────────────────────────── */}
        <Dialog
          open={formModal.isOpen}
          onOpenChange={(open) => {
            if (!open) {
              formModal.close();
              resetForm();
            }
          }}
        >
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle
                style={{
                  fontSize: 'var(--text-lg)',
                  letterSpacing: 'var(--tracking-tight)',
                }}
              >
                {editingProduct ? 'Edit Product' : 'Add Product'}
              </DialogTitle>
            </DialogHeader>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-4">
              {/* Name */}
              <div className="space-y-1.5 sm:col-span-2">
                <Label htmlFor="name" className="text-foreground/80">
                  Product Name <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="name"
                  value={form.name}
                  onChange={(e) => updateForm('name', e.target.value)}
                  placeholder="Enter product name"
                  className={formErrors.name ? 'border-red-500' : ''}
                />
                {formErrors.name && (
                  <p className="text-red-500 text-xs">{formErrors.name}</p>
                )}
              </div>

              {/* SKU */}
              <div className="space-y-1.5">
                <Label htmlFor="sku" className="text-foreground/80">
                  SKU <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="sku"
                  value={form.sku}
                  onChange={(e) => updateForm('sku', e.target.value)}
                  placeholder="e.g. PROD-001"
                  className={formErrors.sku ? 'border-red-500' : ''}
                />
                {formErrors.sku && (
                  <p className="text-red-500 text-xs">{formErrors.sku}</p>
                )}
              </div>

              {/* Barcode */}
              <div className="space-y-1.5">
                <Label htmlFor="barcode" className="text-foreground/80">
                  Barcode
                </Label>
                <Input
                  id="barcode"
                  value={form.barcode ?? ''}
                  onChange={(e) => updateForm('barcode', e.target.value || null)}
                  placeholder="Optional barcode"
                />
              </div>

              {/* Product Type */}
              <div className="space-y-1.5">
                <Label className="text-foreground/80">Product Type</Label>
                <Select
                  value={form.product_type ?? 'physical'}
                  onValueChange={(v) => updateForm('product_type', v)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    {PRODUCT_TYPES.map((type) => (
                      <SelectItem key={type.value} value={type.value}>
                        {type.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Unit */}
              <div className="space-y-1.5">
                <Label className="text-foreground/80">Unit</Label>
                <Select
                  value={form.unit ?? 'piece'}
                  onValueChange={(v) => updateForm('unit', v)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select unit" />
                  </SelectTrigger>
                  <SelectContent>
                    {PRODUCT_UNITS.map((u) => (
                      <SelectItem key={u.value} value={u.value}>
                        {u.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Category */}
              <div className="space-y-1.5">
                <Label className="text-foreground/80">Category</Label>
                <Select
                  value={form.category_id ? String(form.category_id) : 'none'}
                  onValueChange={(v) => updateForm('category_id', v === 'none' ? null : Number(v))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">None</SelectItem>
                    {categories.map((cat) => (
                      <SelectItem key={cat.id} value={String(cat.id)}>
                        {cat.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Supplier */}
              <div className="space-y-1.5">
                <Label className="text-foreground/80">Supplier</Label>
                <Select
                  value={form.supplier_id ? String(form.supplier_id) : 'none'}
                  onValueChange={(v) => updateForm('supplier_id', v === 'none' ? null : Number(v))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select supplier" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">None</SelectItem>
                    {suppliers.map((sup) => (
                      <SelectItem key={sup.id} value={String(sup.id)}>
                        {sup.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Cost Price */}
              <div className="space-y-1.5">
                <Label htmlFor="cost_price" className="text-foreground/80">
                  Cost Price
                </Label>
                <Input
                  id="cost_price"
                  type="number"
                  step="0.01"
                  min="0"
                  value={form.cost_price ?? ''}
                  onChange={(e) => updateForm('cost_price', e.target.value ? Number(e.target.value) : null)}
                  placeholder="0.00"
                />
              </div>

              {/* Selling Price */}
              <div className="space-y-1.5">
                <Label htmlFor="selling_price" className="text-foreground/80">
                  Selling Price
                </Label>
                <Input
                  id="selling_price"
                  type="number"
                  step="0.01"
                  min="0"
                  value={form.selling_price ?? ''}
                  onChange={(e) => updateForm('selling_price', e.target.value ? Number(e.target.value) : null)}
                  placeholder="0.00"
                />
              </div>

              {/* MRP */}
              <div className="space-y-1.5">
                <Label htmlFor="mrp" className="text-foreground/80">
                  MRP
                </Label>
                <Input
                  id="mrp"
                  type="number"
                  step="0.01"
                  min="0"
                  value={form.mrp ?? ''}
                  onChange={(e) => updateForm('mrp', e.target.value ? Number(e.target.value) : null)}
                  placeholder="0.00"
                />
              </div>

              {/* Tax Rate */}
              <div className="space-y-1.5">
                <Label htmlFor="tax_rate" className="text-foreground/80">
                  Tax Rate (%)
                </Label>
                <Input
                  id="tax_rate"
                  type="number"
                  step="0.01"
                  min="0"
                  max="100"
                  value={form.tax_rate ?? ''}
                  onChange={(e) => updateForm('tax_rate', e.target.value ? Number(e.target.value) : null)}
                  placeholder="0"
                />
              </div>

              {/* Min Stock Level */}
              <div className="space-y-1.5">
                <Label htmlFor="min_stock_level" className="text-foreground/80">
                  Min Stock Level
                </Label>
                <Input
                  id="min_stock_level"
                  type="number"
                  min="0"
                  value={form.min_stock_level ?? 0}
                  onChange={(e) => updateForm('min_stock_level', e.target.value ? Number(e.target.value) : 0)}
                  placeholder="0"
                />
              </div>

              {/* Max Stock Level */}
              <div className="space-y-1.5">
                <Label htmlFor="max_stock_level" className="text-foreground/80">
                  Max Stock Level
                </Label>
                <Input
                  id="max_stock_level"
                  type="number"
                  min="0"
                  value={form.max_stock_level ?? ''}
                  onChange={(e) => updateForm('max_stock_level', e.target.value ? Number(e.target.value) : null)}
                  placeholder="Optional"
                />
              </div>

              {/* Track Inventory */}
              <div className="flex items-center gap-3 py-1">
                <Switch
                  id="track_inventory"
                  checked={form.track_inventory}
                  onCheckedChange={(checked) => updateForm('track_inventory', checked)}
                />
                <Label htmlFor="track_inventory" className="text-foreground/80 cursor-pointer">
                  Track Inventory
                </Label>
              </div>

              {/* Is Active */}
              <div className="flex items-center gap-3 py-1">
                <Switch
                  id="is_active"
                  checked={form.is_active}
                  onCheckedChange={(checked) => updateForm('is_active', checked)}
                />
                <Label htmlFor="is_active" className="text-foreground/80 cursor-pointer">
                  Active
                </Label>
              </div>

              {/* Description */}
              <div className="space-y-1.5 sm:col-span-2">
                <Label htmlFor="description" className="text-foreground/80">
                  Description
                </Label>
                <Textarea
                  id="description"
                  value={form.description ?? ''}
                  onChange={(e) => updateForm('description', e.target.value || null)}
                  placeholder="Product description (optional)"
                  rows={3}
                  className="resize-none"
                />
              </div>
            </div>

            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => {
                  formModal.close();
                  resetForm();
                }}
                disabled={isSubmitting}
                className="press-scale"
              >
                Cancel
              </Button>
              <Button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="bg-module-erp hover:bg-module-erp/90 text-white press-scale"
              >
                {isSubmitting
                  ? 'Saving...'
                  : editingProduct
                    ? 'Update Product'
                    : 'Create Product'}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* ── Delete Confirmation Dialog ──────────────────────────────── */}
        <ConfirmDialog
          open={deleteModal.isOpen}
          onOpenChange={(open) => {
            if (!open) {
              deleteModal.close();
              setDeleteTarget(null);
            }
          }}
          title="Delete Product"
          description={
            deleteTarget
              ? `Are you sure you want to delete "${deleteTarget.name}" (${deleteTarget.sku})? This action cannot be undone.`
              : 'Are you sure you want to delete this product?'
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
