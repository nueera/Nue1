'use client';

import { useState } from 'react';
import { Phone, User, Heart, Plus, Pencil, Trash2, Check, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { DataCard } from '../../../../shared/components/data-card/data-card';
import { EmptyState } from '../../../../shared/components/empty-state/empty-state';
import { ConfirmDialog } from '../../../../shared/components/confirm-dialog/confirm-dialog';
import type { EmergencyContact } from '../types';

interface EmployeeEmergencyContactsProps {
  contacts?: EmergencyContact[];
  onAdd?: (contact: EmergencyContact) => void;
  onUpdate?: (index: number, contact: EmergencyContact) => void;
  onDelete?: (index: number) => void;
  isLoading?: boolean;
}

const RELATIONSHIPS = ['Spouse', 'Parent', 'Sibling', 'Child', 'Friend', 'Other'];

export function EmployeeEmergencyContacts({
  contacts = [],
  onAdd,
  onUpdate,
  onDelete,
  isLoading,
}: EmployeeEmergencyContactsProps) {
  const [isAdding, setIsAdding] = useState(false);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [deleteIndex, setDeleteIndex] = useState<number | null>(null);
  const [form, setForm] = useState<EmergencyContact>({ name: '', relationship: '', phone: '' });

  const resetForm = () => {
    setForm({ name: '', relationship: '', phone: '' });
    setIsAdding(false);
    setEditIndex(null);
  };

  const handleAdd = () => {
    if (!form.name || !form.relationship || !form.phone) return;
    onAdd?.(form);
    resetForm();
  };

  const handleUpdate = () => {
    if (editIndex === null || !form.name || !form.relationship || !form.phone) return;
    onUpdate?.(editIndex, form);
    resetForm();
  };

  const startEdit = (idx: number) => {
    const contact = contacts[idx];
    setForm({ ...contact });
    setEditIndex(idx);
    setIsAdding(false);
  };

  return (
    <div className="space-y-4">
      <DataCard
        title="Emergency Contacts"
        action={
          onAdd && !isAdding && editIndex === null ? (
            <Button variant="ghost" size="sm" className="text-module-erp" onClick={() => setIsAdding(true)}>
              <Plus className="h-3.5 w-3.5 mr-1" />
              Add Contact
            </Button>
          ) : null
        }
      >
        {/* Add / Edit Form */}
        {(isAdding || editIndex !== null) && (
          <div className="mb-4 p-4 rounded-xl bg-white/5 border border-white/10 space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="space-y-1">
                <Label className="text-xs text-muted-foreground">Name</Label>
                <Input
                  value={form.name}
                  onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
                  className="bg-white/5 border-white/10"
                  placeholder="Contact name"
                />
              </div>
              <div className="space-y-1">
                <Label className="text-xs text-muted-foreground">Relationship</Label>
                <Input
                  value={form.relationship}
                  onChange={(e) => setForm((p) => ({ ...p, relationship: e.target.value }))}
                  className="bg-white/5 border-white/10"
                  placeholder="e.g. Spouse"
                />
              </div>
              <div className="space-y-1">
                <Label className="text-xs text-muted-foreground">Phone</Label>
                <Input
                  value={form.phone}
                  onChange={(e) => setForm((p) => ({ ...p, phone: e.target.value }))}
                  className="bg-white/5 border-white/10"
                  placeholder="+91 XXXXX XXXXX"
                />
              </div>
            </div>
            <div className="flex items-center justify-end gap-2">
              <Button variant="outline" size="sm" onClick={resetForm}>
                <X className="h-3.5 w-3.5 mr-1" /> Cancel
              </Button>
              <Button size="sm" onClick={editIndex !== null ? handleUpdate : handleAdd} className="bg-module-erp hover:bg-module-erp/90 text-white">
                <Check className="h-3.5 w-3.5 mr-1" /> {editIndex !== null ? 'Update' : 'Add'}
              </Button>
            </div>
          </div>
        )}

        {/* Contacts List */}
        {contacts.length === 0 && !isAdding ? (
          <EmptyState
            icon={Heart}
            title="No emergency contacts"
            description="Add emergency contacts for this employee."
          />
        ) : (
          <div className="space-y-2">
            {contacts.map((contact, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between gap-3 p-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-200"
              >
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-9 h-9 rounded-full bg-module-erp/15 text-module-erp shrink-0">
                    <User className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">{contact.name}</p>
                    <div className="flex items-center gap-3 mt-0.5">
                      <span className="text-xs text-muted-foreground flex items-center gap-1">
                        <Heart className="h-3 w-3" />
                        {contact.relationship}
                      </span>
                      <span className="text-xs text-muted-foreground flex items-center gap-1">
                        <Phone className="h-3 w-3" />
                        {contact.phone}
                      </span>
                    </div>
                  </div>
                </div>

                {(onUpdate || onDelete) && (
                  <div className="flex items-center gap-1 shrink-0">
                    {onUpdate && (
                      <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => startEdit(idx)}>
                        <Pencil className="h-3.5 w-3.5" />
                      </Button>
                    )}
                    {onDelete && (
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-red-500" onClick={() => setDeleteIndex(idx)}>
                        <Trash2 className="h-3.5 w-3.5" />
                      </Button>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </DataCard>

      {/* Delete Confirmation */}
      <ConfirmDialog
        open={deleteIndex !== null}
        onOpenChange={(open) => !open && setDeleteIndex(null)}
        title="Delete Contact"
        description="Are you sure you want to remove this emergency contact?"
        confirmLabel="Delete"
        variant="destructive"
        onConfirm={() => {
          if (deleteIndex !== null) {
            onDelete?.(deleteIndex);
            setDeleteIndex(null);
          }
        }}
      />
    </div>
  );
}
