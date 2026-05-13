'use client';

import { useState } from 'react';
import { Plus, Edit2, Trash2, Settings, ToggleLeft, ToggleRight } from 'lucide-react';
import type { ExpenseCategory } from '../types';
import { fmtExpenseAmount } from '../expense.utils';
import { ConfirmDialog } from '../../../../shared/components/confirm-dialog';
import { EmptyState } from '../../../../shared/components/empty-state';

interface ExpenseCategoryConfigProps {
  categories: ExpenseCategory[];
  onAdd?: (category: Omit<ExpenseCategory, 'id'>) => void;
  onEdit?: (category: ExpenseCategory) => void;
  onDelete?: (id: string) => void;
  isLoading?: boolean;
}

export function ExpenseCategoryConfig({ categories, onAdd, onEdit, onDelete, isLoading }: ExpenseCategoryConfigProps) {
  const [showAddForm, setShowAddForm] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  // Form state
  const [formName, setFormName] = useState('');
  const [formDescription, setFormDescription] = useState('');
  const [formRequiresReceipt, setFormRequiresReceipt] = useState(false);
  const [formMaxAmount, setFormMaxAmount] = useState<number>(0);

  const resetForm = () => {
    setFormName('');
    setFormDescription('');
    setFormRequiresReceipt(false);
    setFormMaxAmount(0);
    setEditId(null);
    setShowAddForm(false);
  };

  const startEdit = (cat: ExpenseCategory) => {
    setFormName(cat.name);
    setFormDescription(cat.description || '');
    setFormRequiresReceipt(cat.requiresReceipt);
    setFormMaxAmount(cat.maxAmount || 0);
    setEditId(cat.id);
    setShowAddForm(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const data = {
      name: formName,
      description: formDescription || undefined,
      requiresReceipt: formRequiresReceipt,
      maxAmount: formMaxAmount > 0 ? formMaxAmount : undefined,
    };

    if (editId && onEdit) {
      onEdit({ id: editId, ...data });
    } else if (onAdd) {
      onAdd(data);
    }
    resetForm();
  };

  const inputClass = 'w-full bg-white/5 backdrop-blur-md border border-white/10 rounded-xl px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/50 outline-none focus:border-module-erp/50 focus:ring-1 focus:ring-module-erp/20 transition-all duration-200';

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Settings className="h-4 w-4 text-muted-foreground" />
          <h3 className="text-sm font-semibold text-foreground">Expense Categories</h3>
        </div>
        {onAdd && !showAddForm && (
          <button
            onClick={() => { resetForm(); setShowAddForm(true); }}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-module-erp/10 border border-module-erp/20 text-module-erp rounded-lg hover:bg-module-erp/20 transition-all duration-200"
          >
            <Plus className="h-3.5 w-3.5" />
            Add Category
          </button>
        )}
      </div>

      {/* Add/Edit Form */}
      {showAddForm && (
        <form onSubmit={handleSubmit} className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-5 space-y-4">
          <h4 className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
            {editId ? 'Edit Category' : 'New Category'}
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-[10px] text-muted-foreground">Name *</label>
              <input
                type="text"
                value={formName}
                onChange={(e) => setFormName(e.target.value)}
                placeholder="e.g., Travel"
                className={inputClass}
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] text-muted-foreground">Max Amount</label>
              <input
                type="number"
                min={0}
                value={formMaxAmount || ''}
                onChange={(e) => setFormMaxAmount(Number(e.target.value))}
                placeholder="No limit"
                className={inputClass}
              />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-[10px] text-muted-foreground">Description</label>
            <input
              type="text"
              value={formDescription}
              onChange={(e) => setFormDescription(e.target.value)}
              placeholder="Optional description"
              className={inputClass}
            />
          </div>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setFormRequiresReceipt(!formRequiresReceipt)}
              className={`relative w-10 h-5 rounded-full transition-all duration-200 ${
                formRequiresReceipt ? 'bg-module-erp' : 'bg-white/10'
              }`}
            >
              <span className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white transition-transform duration-200 ${
                formRequiresReceipt ? 'translate-x-5' : ''
              }`} />
            </button>
            <span className="text-xs text-muted-foreground">Requires receipt</span>
          </div>
          <div className="flex items-center gap-2">
            <button type="submit" className="px-4 py-2 rounded-xl bg-module-erp text-white text-xs font-medium hover:bg-module-erp/90 transition-all duration-200">
              {editId ? 'Update' : 'Add'}
            </button>
            <button type="button" onClick={resetForm} className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-xs text-muted-foreground hover:bg-white/10 transition-all duration-200">
              Cancel
            </button>
          </div>
        </form>
      )}

      {/* Categories List */}
      {isLoading ? (
        <div className="space-y-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="bg-white/5 border border-white/10 rounded-xl p-4 animate-pulse flex items-center justify-between">
              <div className="h-4 w-32 bg-white/10 rounded" />
              <div className="h-6 w-16 bg-white/10 rounded" />
            </div>
          ))}
        </div>
      ) : categories.length === 0 ? (
        <EmptyState icon={Settings} title="No categories" description="Add expense categories to organize claims" />
      ) : (
        <div className="space-y-2">
          {categories.map((cat) => (
            <div
              key={cat.id}
              className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-4 hover:bg-white/[0.07] transition-all duration-200 group"
            >
              <div className="flex items-center justify-between">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h4 className="text-sm font-medium text-foreground">{cat.name}</h4>
                    {cat.requiresReceipt && (
                      <span className="px-1.5 py-0.5 text-[9px] font-medium bg-amber-500/10 text-amber-400 rounded border border-amber-500/15">
                        Receipt Required
                      </span>
                    )}
                  </div>
                  {cat.description && (
                    <p className="text-xs text-muted-foreground mt-0.5">{cat.description}</p>
                  )}
                  {cat.maxAmount && (
                    <p className="text-[10px] text-muted-foreground/50 mt-1">
                      Max: {fmtExpenseAmount(cat.maxAmount)}
                    </p>
                  )}
                </div>
                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  {onEdit && (
                    <button
                      onClick={() => startEdit(cat)}
                      className="p-1.5 rounded-lg hover:bg-white/10 text-muted-foreground hover:text-foreground transition-all duration-200"
                    >
                      <Edit2 className="h-3.5 w-3.5" />
                    </button>
                  )}
                  {onDelete && (
                    <button
                      onClick={() => setDeleteId(cat.id)}
                      className="p-1.5 rounded-lg hover:bg-red-500/10 text-muted-foreground hover:text-red-400 transition-all duration-200"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <ConfirmDialog
        open={!!deleteId}
        onOpenChange={(open) => !open && setDeleteId(null)}
        title="Delete Category"
        description="Are you sure you want to delete this expense category? Existing claims in this category will not be affected."
        confirmLabel="Delete"
        variant="destructive"
        onConfirm={() => {
          if (deleteId && onDelete) onDelete(deleteId);
          setDeleteId(null);
        }}
      />
    </div>
  );
}
