'use client';

import { useState } from 'react';
import { MapPin, Pencil, Check, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { DataCard } from '../../../../shared/components/data-card/data-card';
import type { Address } from '../types';

interface EmployeeAddressProps {
  address?: Address;
  onSave?: (address: Address) => void;
  isLoading?: boolean;
}

export function EmployeeAddress({ address, onSave, isLoading }: EmployeeAddressProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [form, setForm] = useState<Address>({
    present: address?.present ?? '',
    permanent: address?.permanent ?? '',
  });

  const handleSave = () => {
    onSave?.(form);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setForm({
      present: address?.present ?? '',
      permanent: address?.permanent ?? '',
    });
    setIsEditing(false);
  };

  return (
    <DataCard
      title="Address"
      action={
        !isEditing && onSave ? (
          <Button variant="ghost" size="sm" className="text-module-erp" onClick={() => setIsEditing(true)}>
            <Pencil className="h-3.5 w-3.5 mr-1" />
            Edit
          </Button>
        ) : null
      }
    >
      {!address && !isEditing ? (
        <div className="flex flex-col items-center justify-center py-8 text-center">
          <MapPin className="h-8 w-8 text-muted-foreground/20 mb-3" />
          <p className="text-sm text-muted-foreground">No address added yet</p>
          {onSave && (
            <Button variant="outline" size="sm" className="mt-3" onClick={() => setIsEditing(true)}>
              Add Address
            </Button>
          )}
        </div>
      ) : isEditing ? (
        <div className="space-y-4">
          <div className="space-y-2">
            <Label className="text-xs text-muted-foreground">Present Address</Label>
            <Textarea
              value={form.present}
              onChange={(e) => setForm((p) => ({ ...p, present: e.target.value }))}
              className="bg-white/5 border-white/10 min-h-[70px]"
              placeholder="Enter present address"
            />
          </div>
          <div className="space-y-2">
            <Label className="text-xs text-muted-foreground">Permanent Address</Label>
            <Textarea
              value={form.permanent}
              onChange={(e) => setForm((p) => ({ ...p, permanent: e.target.value }))}
              className="bg-white/5 border-white/10 min-h-[70px]"
              placeholder="Enter permanent address"
            />
            <button
              type="button"
              onClick={() => setForm((p) => ({ ...p, permanent: p.present }))}
              className="text-xs text-module-erp hover:underline"
            >
              Same as present address
            </button>
          </div>
          <div className="flex items-center justify-end gap-2 pt-2">
            <Button variant="outline" size="sm" onClick={handleCancel}>
              <X className="h-3.5 w-3.5 mr-1" />
              Cancel
            </Button>
            <Button size="sm" onClick={handleSave} disabled={isLoading} className="bg-module-erp hover:bg-module-erp/90 text-white">
              <Check className="h-3.5 w-3.5 mr-1" />
              Save
            </Button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <p className="text-xs text-muted-foreground mb-1 flex items-center gap-1.5">
              <MapPin className="h-3 w-3" />
              Present Address
            </p>
            <p className="text-sm text-foreground whitespace-pre-wrap">{address!.present}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground mb-1 flex items-center gap-1.5">
              <MapPin className="h-3 w-3" />
              Permanent Address
            </p>
            <p className="text-sm text-foreground whitespace-pre-wrap">{address!.permanent}</p>
          </div>
        </div>
      )}
    </DataCard>
  );
}
