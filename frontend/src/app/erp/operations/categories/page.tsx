'use client';

import { useState, useMemo, useCallback } from 'react';
import { motion } from 'framer-motion';
import { PageTransition } from '@/modules/erp/design-system/components/animations';
import { type ColumnDef } from '@tanstack/react-table';
import { erpService } from '@/lib/services';
import { mockCategories } from '@/modules/erp/data/mock';
import type { Category, CategoryCreate, CategoryUpdate } from '@/modules/erp/types/erp-operations';
import { SmartTable } from '@/modules/erp/shared/components/smart-table';
import { StatusBadge } from '@/modules/erp/shared/components/status-badge';
import { ConfirmDialog } from '@/modules/erp/shared/components/confirm-dialog';
import { EmptyState } from '@/modules/erp/shared/components/empty-state';
import { useModal } from '@/modules/erp/shared/hooks';
import {
  Plus,
  MoreHorizontal,
  Pencil,
  Trash2,
  Tag,
} from 'lucide-react';
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
const emptyForm: CategoryCreate = {
  name: '',
  slug: '',
  description: '',
  parent_id: null,
  sort_order: 0,
  is_active: true,
};

// ── Table Columns ───────────────────────────────────────────────────────────
function getColumns(
  categories: Category[],
  onEdit: (category: Category) => void,
  onDelete: (category: Category) => void
): ColumnDef<Category>[] {
  return [
    {
      id: 'name',
      header: 'Name',
      accessorFn: (row) => row.name,
      cell: ({ row }) => {
        const category = row.original;
        const parentCategory = category.parent_id
          ? categories.find((c) => c.id === category.parent_id)
          : null;

        return (
          <div className="min-w-0">
            <p
              className="font-medium text-foreground truncate"
              style={{ fontSize: 'var(--text-sm)' }}
            >
              {category.name}
            </p>
            {parentCategory && (
              <p
                className="text-muted-foreground truncate"
                style={{ fontSize: 'var(--text-xs)' }}
              >
                {parentCategory.name}
              </p>
            )}
          </div>
        );
      },
    },
    {
      id: 'slug',
      header: 'Slug',
      accessorFn: (row) => row.slug ?? '',
      cell: ({ row }) => {
        const slug = row.original.slug;
        if (!slug) {
          return (
            <span className="text-muted-foreground" style={{ fontSize: 'var(--text-sm)' }}>
              &mdash;
            </span>
          );
        }
        return (
          <span
            className="font-mono text-muted-foreground truncate block max-w-[160px]"
            style={{ fontSize: 'var(--text-sm)' }}
          >
            {slug}
          </span>
        );
      },
    },
    {
      id: 'description',
      header: 'Description',
      accessorFn: (row) => row.description ?? '',
      cell: ({ row }) => {
        const desc = row.original.description;
        if (!desc) {
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
            {desc.length > 60 ? desc.slice(0, 59) + '…' : desc}
          </span>
        );
      },
    },
    {
      id: 'sort_order',
      header: 'Sort Order',
      accessorFn: (row) => row.sort_order,
      cell: ({ row }) => (
        <span
          className="text-foreground tabular-nums"
          style={{ fontSize: 'var(--text-sm)' }}
        >
          {row.original.sort_order}
        </span>
      ),
    },
    {
      id: 'status',
      header: 'Status',
      accessorFn: (row) => (row.is_active ? 'active' : 'inactive'),
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

export default function CategoriesPage() {
  // ── State ─────────────────────────────────────────────────────────────────
  const [categories, setCategories] = useState<Category[]>(mockCategories);
  const [isLoading, setIsLoading] = useState(false);

  // Create / Edit dialog
  const createModal = useModal();
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [formData, setFormData] = useState<CategoryCreate>(emptyForm);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Delete confirmation
  const [deleteTarget, setDeleteTarget] = useState<Category | null>(null);
  const deleteModal = useModal();
  const [isDeleting, setIsDeleting] = useState(false);

  // ── Handlers ──────────────────────────────────────────────────────────────
  const handleOpenCreate = useCallback(() => {
    setEditingCategory(null);
    setFormData(emptyForm);
    createModal.open();
  }, [createModal]);

  const handleOpenEdit = useCallback(
    (category: Category) => {
      setEditingCategory(category);
      setFormData({
        name: category.name,
        slug: category.slug ?? '',
        description: category.description ?? '',
        parent_id: category.parent_id ?? null,
        sort_order: category.sort_order,
        is_active: category.is_active,
      });
      createModal.open();
    },
    [createModal]
  );

  const handleOpenDelete = useCallback((category: Category) => {
    setDeleteTarget(category);
    deleteModal.open();
  }, [deleteModal]);

  const handleSubmit = useCallback(async () => {
    if (!formData.name.trim()) return;
    setIsSubmitting(true);

    try {
      // Attempt API call, fall back to mock manipulation
      try {
        if (editingCategory) {
          // await erpService.updateCategory(editingCategory.id, formData);
        } else {
          // await erpService.createCategory(formData);
        }
      } catch {
        // API not available — use mock
      }

      // Optimistic local update
      if (editingCategory) {
        setCategories((prev) =>
          prev.map((c) =>
            c.id === editingCategory.id
              ? { ...c, ...formData, updated_at: new Date().toISOString() }
              : c
          )
        );
      } else {
        const newCategory: Category = {
          id: Math.max(0, ...categories.map((c) => c.id)) + 1,
          name: formData.name,
          description: formData.description ?? null,
          slug: formData.slug ?? null,
          parent_id: formData.parent_id ?? null,
          sort_order: formData.sort_order ?? 0,
          is_active: formData.is_active ?? true,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        };
        setCategories((prev) => [...prev, newCategory]);
      }

      createModal.close();
    } finally {
      setIsSubmitting(false);
    }
  }, [formData, editingCategory, categories, createModal]);

  const handleDelete = useCallback(async () => {
    if (!deleteTarget) return;
    setIsDeleting(true);

    try {
      try {
        // await erpService.deleteCategory(deleteTarget.id);
      } catch {
        // API not available — use mock
      }

      setCategories((prev) => prev.filter((c) => c.id !== deleteTarget.id));
      deleteModal.close();
      setDeleteTarget(null);
    } finally {
      setIsDeleting(false);
    }
  }, [deleteTarget, deleteModal]);

  // ── Form helpers ──────────────────────────────────────────────────────────
  const updateField = useCallback(
    <K extends keyof CategoryCreate>(key: K, value: CategoryCreate[K]) => {
      setFormData((prev) => ({ ...prev, [key]: value }));
    },
    []
  );

  // Available parent categories (exclude current if editing, to prevent self-referencing)
  const parentOptions = useMemo(() => {
    return categories.filter((c) => {
      if (editingCategory && c.id === editingCategory.id) return false;
      return true;
    });
  }, [categories, editingCategory]);

  // ── Columns (memoized with handler closures) ──────────────────────────────
  const columns = useMemo(
    () => getColumns(categories, handleOpenEdit, handleOpenDelete),
    [categories, handleOpenEdit, handleOpenDelete]
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
              Categories
            </h1>
            <p
              className="text-muted-foreground mt-1"
              style={{
                fontSize: 'var(--text-sm)',
                letterSpacing: 'var(--tracking-normal)',
                lineHeight: 'var(--leading-normal)',
              }}
            >
              Organize your product taxonomy
            </p>
          </div>

          <Button
            className="bg-module-erp hover:bg-module-erp/90 text-white gap-2 press-scale"
            style={{ fontSize: 'var(--text-sm)' }}
            onClick={handleOpenCreate}
          >
            <Plus className="h-4 w-4" strokeWidth={1.8} />
            Add Category
          </Button>
        </motion.div>

        {/* ── Table ───────────────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1, ease: EASE }}
        >
          {categories.length === 0 && !isLoading ? (
            <div className="glass-surface rounded-xl p-8">
              <EmptyState
                icon={Tag}
                title="No categories found"
                description="Get started by adding your first category to organize your products."
                action={{
                  label: 'Add Category',
                  onClick: handleOpenCreate,
                }}
              />
            </div>
          ) : (
            <SmartTable
              data={categories}
              columns={columns}
              searchable
              searchPlaceholder="Search categories..."
              isLoading={isLoading}
              emptyMessage="No categories found"
              emptyDescription="Try adjusting your search or add a new category"
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
          <DialogContent className="sm:max-w-[560px] max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle
                style={{
                  fontSize: 'var(--text-lg)',
                  letterSpacing: 'var(--tracking-tight)',
                }}
              >
                {editingCategory ? 'Edit Category' : 'Add Category'}
              </DialogTitle>
              <DialogDescription
                style={{
                  fontSize: 'var(--text-sm)',
                  letterSpacing: 'var(--tracking-normal)',
                }}
              >
                {editingCategory
                  ? 'Update category information below.'
                  : 'Fill in the details to create a new category.'}
              </DialogDescription>
            </DialogHeader>

            <div className="grid gap-5 py-4">
              {/* Name */}
              <div className="grid gap-2">
                <Label
                  htmlFor="cat-name"
                  style={{ fontSize: 'var(--text-sm)', letterSpacing: 'var(--tracking-normal)' }}
                >
                  Name <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="cat-name"
                  value={formData.name}
                  onChange={(e) => updateField('name', e.target.value)}
                  placeholder="e.g. Electronics"
                  className="press-scale"
                  style={{ fontSize: 'var(--text-sm)' }}
                />
              </div>

              {/* Slug */}
              <div className="grid gap-2">
                <Label
                  htmlFor="cat-slug"
                  style={{ fontSize: 'var(--text-sm)', letterSpacing: 'var(--tracking-normal)' }}
                >
                  Slug
                </Label>
                <Input
                  id="cat-slug"
                  value={formData.slug ?? ''}
                  onChange={(e) => updateField('slug', e.target.value || null)}
                  placeholder="e.g. electronics"
                  className="press-scale font-mono"
                  style={{ fontSize: 'var(--text-sm)' }}
                />
                <p
                  className="text-muted-foreground"
                  style={{ fontSize: 'var(--text-xs)', letterSpacing: 'var(--tracking-normal)' }}
                >
                  URL-friendly identifier. Auto-generated from name if left blank.
                </p>
              </div>

              {/* Description */}
              <div className="grid gap-2">
                <Label
                  htmlFor="cat-desc"
                  style={{ fontSize: 'var(--text-sm)', letterSpacing: 'var(--tracking-normal)' }}
                >
                  Description
                </Label>
                <Textarea
                  id="cat-desc"
                  value={formData.description ?? ''}
                  onChange={(e) => updateField('description', e.target.value || null)}
                  placeholder="Brief description of this category..."
                  rows={3}
                  className="press-scale resize-none"
                  style={{ fontSize: 'var(--text-sm)' }}
                />
              </div>

              {/* Parent Category */}
              <div className="grid gap-2">
                <Label
                  htmlFor="cat-parent"
                  style={{ fontSize: 'var(--text-sm)', letterSpacing: 'var(--tracking-normal)' }}
                >
                  Parent Category
                </Label>
                <Select
                  value={formData.parent_id != null ? String(formData.parent_id) : 'none'}
                  onValueChange={(val) => {
                    updateField('parent_id', val === 'none' ? null : Number(val));
                  }}
                >
                  <SelectTrigger
                    id="cat-parent"
                    className="press-scale"
                    style={{ fontSize: 'var(--text-sm)' }}
                  >
                    <SelectValue placeholder="None (top-level)" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">None (top-level)</SelectItem>
                    {parentOptions.map((cat) => (
                      <SelectItem key={cat.id} value={String(cat.id)}>
                        {cat.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Sort Order */}
              <div className="grid gap-2">
                <Label
                  htmlFor="cat-sort"
                  style={{ fontSize: 'var(--text-sm)', letterSpacing: 'var(--tracking-normal)' }}
                >
                  Sort Order
                </Label>
                <Input
                  id="cat-sort"
                  type="number"
                  min={0}
                  value={formData.sort_order ?? 0}
                  onChange={(e) => {
                    const val = e.target.value;
                    updateField('sort_order', val === '' ? 0 : Number(val));
                  }}
                  placeholder="0"
                  className="press-scale"
                  style={{ fontSize: 'var(--text-sm)' }}
                />
                <p
                  className="text-muted-foreground"
                  style={{ fontSize: 'var(--text-xs)', letterSpacing: 'var(--tracking-normal)' }}
                >
                  Lower numbers appear first in lists
                </p>
              </div>

              {/* Is Active */}
              <div className="flex items-center justify-between gap-4 rounded-lg border border-glass-border/30 bg-glass-bg/20 p-3">
                <div>
                  <Label
                    htmlFor="cat-active"
                    className="cursor-pointer"
                    style={{ fontSize: 'var(--text-sm)', letterSpacing: 'var(--tracking-normal)' }}
                  >
                    Active
                  </Label>
                  <p
                    className="text-muted-foreground"
                    style={{ fontSize: 'var(--text-xs)', letterSpacing: 'var(--tracking-normal)' }}
                  >
                    Inactive categories are hidden from product selection
                  </p>
                </div>
                <Switch
                  id="cat-active"
                  checked={formData.is_active ?? true}
                  onCheckedChange={(checked) => updateField('is_active', checked)}
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
                  : editingCategory
                    ? 'Update Category'
                    : 'Create Category'}
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
          title="Delete Category"
          description={
            deleteTarget
              ? `Are you sure you want to delete "${deleteTarget.name}"? This action cannot be undone.`
              : 'Are you sure you want to delete this category?'
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
