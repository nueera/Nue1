'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { FolderOpen, Plus, Edit, Trash2, ChevronRight, Folder } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import type { TemplateCategory } from '@/modules/marketing/types';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface TemplateCategoriesProps {
  categories?: TemplateCategory[];
  onSelect?: (category: TemplateCategory) => void;
  selectedCategoryId?: string;
  onCreate?: (data: { name: string; icon?: string }) => void;
  onUpdate?: (id: string, data: { name: string; icon?: string }) => void;
  onDelete?: (id: string) => void;
  className?: string;
}

// ---------------------------------------------------------------------------
// Mock Data
// ---------------------------------------------------------------------------

const MOCK_CATEGORIES: TemplateCategory[] = [
  { id: '1', name: 'Welcome', icon: '👋', count: 5 },
  { id: '2', name: 'Newsletter', icon: '📰', count: 8 },
  { id: '3', name: 'Promotional', icon: '🎉', count: 12 },
  { id: '4', name: 'Transactional', icon: '📋', count: 6 },
  { id: '5', name: 'Event', icon: '📅', count: 3 },
  { id: '6', name: 'Re-engagement', icon: '💝', count: 4 },
];

const ICON_OPTIONS = ['👋', '📰', '🎉', '📋', '📅', '💝', '🚀', '💡', '🏆', '🎯', '📧', '✉️', '🔥', '⭐', '🎁', '📢'];

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export function TemplateCategories({
  categories = MOCK_CATEGORIES,
  onSelect,
  selectedCategoryId,
  onCreate,
  onUpdate,
  onDelete,
  className,
}: TemplateCategoriesProps) {
  const [localCategories, setLocalCategories] = useState<TemplateCategory[]>(categories);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editCategory, setEditCategory] = useState<TemplateCategory | null>(null);
  const [form, setForm] = useState({ name: '', icon: '📧' });
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<TemplateCategory | null>(null);

  const openCreate = () => {
    setEditCategory(null);
    setForm({ name: '', icon: '📧' });
    setDialogOpen(true);
  };

  const openEdit = (category: TemplateCategory) => {
    setEditCategory(category);
    setForm({ name: category.name, icon: category.icon ?? '📧' });
    setDialogOpen(true);
  };

  const openDelete = (category: TemplateCategory) => {
    setDeleteTarget(category);
    setDeleteDialogOpen(true);
  };

  const handleSave = () => {
    if (!form.name.trim()) return;

    if (editCategory) {
      const updated = localCategories.map((c) =>
        c.id === editCategory.id ? { ...c, name: form.name, icon: form.icon } : c
      );
      setLocalCategories(updated);
      onUpdate?.(editCategory.id, { name: form.name, icon: form.icon });
    } else {
      const newCategory: TemplateCategory = {
        id: `cat_${Date.now()}`,
        name: form.name,
        icon: form.icon,
        count: 0,
      };
      setLocalCategories([...localCategories, newCategory]);
      onCreate?.({ name: form.name, icon: form.icon });
    }
    setDialogOpen(false);
  };

  const handleDelete = () => {
    if (!deleteTarget) return;
    const updated = localCategories.filter((c) => c.id !== deleteTarget.id);
    setLocalCategories(updated);
    onDelete?.(deleteTarget.id);
    setDeleteDialogOpen(false);
    setDeleteTarget(null);
  };

  const totalCount = localCategories.reduce((sum, c) => sum + c.count, 0);

  return (
    <Card className={cn('border-border/50', className)}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm flex items-center gap-2">
            <FolderOpen className="h-4 w-4 text-muted-foreground" />
            Template Categories
          </CardTitle>
          <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700 text-xs" onClick={openCreate}>
            <Plus className="h-3 w-3 mr-1" />
            New
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-1">
        {/* All Templates Option */}
        <button
          className={cn(
            'flex items-center justify-between w-full p-2.5 rounded-lg transition-colors text-left',
            !selectedCategoryId
              ? 'bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-800'
              : 'hover:bg-muted/30 border border-transparent'
          )}
          onClick={() => onSelect?.({ id: 'all', name: 'All Templates', count: totalCount })}
        >
          <div className="flex items-center gap-2">
            <Folder className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm font-medium">All Templates</span>
          </div>
          <Badge variant="outline" className="text-[10px] px-1.5 py-0">
            {totalCount}
          </Badge>
        </button>

        <div className="my-1 border-t" />

        {/* Category List */}
        <div className="max-h-96 overflow-y-auto space-y-0.5">
          <AnimatePresence>
            {localCategories.map((category) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -8 }}
                className={cn(
                  'flex items-center justify-between p-2.5 rounded-lg transition-colors group',
                  selectedCategoryId === category.id
                    ? 'bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-800'
                    : 'hover:bg-muted/30 border border-transparent'
                )}
              >
                <button
                  className="flex items-center gap-2 flex-1 min-w-0 text-left"
                  onClick={() => onSelect?.(category)}
                >
                  <span className="text-base">{category.icon ?? '📁'}</span>
                  <span className="text-sm font-medium truncate">{category.name}</span>
                  <Badge variant="outline" className="text-[10px] px-1.5 py-0 shrink-0">
                    {category.count}
                  </Badge>
                </button>
                <div className="flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-7 w-7"
                    onClick={() => openEdit(category)}
                  >
                    <Edit className="h-3.5 w-3.5" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-7 w-7 text-destructive"
                    onClick={() => openDelete(category)}
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {localCategories.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            <FolderOpen className="h-8 w-8 mx-auto mb-2 opacity-20" />
            <p className="text-sm font-medium">No categories yet</p>
            <p className="text-xs mt-1">Create your first template category</p>
          </div>
        )}
      </CardContent>

      {/* Create / Edit Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>
              {editCategory ? 'Edit Category' : 'New Category'}
            </DialogTitle>
            <DialogDescription>
              {editCategory
                ? 'Update the category name and icon.'
                : 'Create a new template category to organize your templates.'}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div>
              <Label className="text-xs text-muted-foreground">Category Name *</Label>
              <Input
                value={form.name}
                onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
                placeholder="e.g. Promotional"
                className="h-9 mt-1"
                autoFocus
              />
            </div>

            <div>
              <Label className="text-xs text-muted-foreground">Icon</Label>
              <div className="grid grid-cols-8 gap-1.5 mt-2">
                {ICON_OPTIONS.map((icon) => (
                  <button
                    key={icon}
                    type="button"
                    className={cn(
                      'h-9 w-9 rounded-md border text-lg flex items-center justify-center transition-colors',
                      form.icon === icon
                        ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/30'
                        : 'border-border hover:bg-muted/30'
                    )}
                    onClick={() => setForm((p) => ({ ...p, icon }))}
                  >
                    {icon}
                  </button>
                ))}
              </div>
            </div>

            <div className="p-3 rounded-lg bg-muted/30 border border-border/50">
              <p className="text-xs text-muted-foreground">Preview</p>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-base">{form.icon}</span>
                <span className="text-sm font-medium">{form.name || 'Category Name'}</span>
                <Badge variant="outline" className="text-[10px] px-1.5 py-0">0</Badge>
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button variant="ghost" onClick={() => setDialogOpen(false)}>
              Cancel
            </Button>
            <Button
              className="bg-emerald-600 hover:bg-emerald-700"
              onClick={handleSave}
              disabled={!form.name.trim()}
            >
              {editCategory ? 'Update' : 'Create Category'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle>Delete Category</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete <strong>{deleteTarget?.name}</strong>?
              Templates in this category will be moved to &quot;Uncategorized&quot;.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="ghost" onClick={() => setDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDelete}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  );
}
