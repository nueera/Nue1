'use client';

import { useState } from 'react';
import { Building2, CreditCard, Pencil, Check, X } from 'lucide-react';
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
import { DataCard } from '../../../../shared/components/data-card/data-card';
import type { BankDetail } from '../types';

interface EmployeeBankDetailsProps {
  bankDetails?: BankDetail;
  onSave?: (details: BankDetail) => void;
  isLoading?: boolean;
}

const ACCOUNT_TYPES = ['Savings', 'Current', 'Salary'];

export function EmployeeBankDetails({ bankDetails, onSave, isLoading }: EmployeeBankDetailsProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [form, setForm] = useState<BankDetail>({
    bankName: bankDetails?.bankName ?? '',
    accountNumber: bankDetails?.accountNumber ?? '',
    ifscCode: bankDetails?.ifscCode ?? '',
    accountType: bankDetails?.accountType ?? 'Savings',
  });

  const handleSave = () => {
    onSave?.(form);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setForm({
      bankName: bankDetails?.bankName ?? '',
      accountNumber: bankDetails?.accountNumber ?? '',
      ifscCode: bankDetails?.ifscCode ?? '',
      accountType: bankDetails?.accountType ?? 'Savings',
    });
    setIsEditing(false);
  };

  return (
    <DataCard
      title="Bank Details"
      action={
        !isEditing && onSave ? (
          <Button variant="ghost" size="sm" className="text-module-erp" onClick={() => setIsEditing(true)}>
            <Pencil className="h-3.5 w-3.5 mr-1" />
            Edit
          </Button>
        ) : null
      }
    >
      {!bankDetails && !isEditing ? (
        <div className="flex flex-col items-center justify-center py-8 text-center">
          <CreditCard className="h-8 w-8 text-muted-foreground/20 mb-3" />
          <p className="text-sm text-muted-foreground">No bank details added yet</p>
          {onSave && (
            <Button variant="outline" size="sm" className="mt-3" onClick={() => setIsEditing(true)}>
              Add Bank Details
            </Button>
          )}
        </div>
      ) : isEditing ? (
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-xs text-muted-foreground">Bank Name</Label>
              <Input
                value={form.bankName}
                onChange={(e) => setForm((p) => ({ ...p, bankName: e.target.value }))}
                className="bg-white/5 border-white/10"
                placeholder="Enter bank name"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-xs text-muted-foreground">Account Number</Label>
              <Input
                value={form.accountNumber}
                onChange={(e) => setForm((p) => ({ ...p, accountNumber: e.target.value }))}
                className="bg-white/5 border-white/10"
                placeholder="Enter account number"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-xs text-muted-foreground">IFSC Code</Label>
              <Input
                value={form.ifscCode}
                onChange={(e) => setForm((p) => ({ ...p, ifscCode: e.target.value.toUpperCase() }))}
                className="bg-white/5 border-white/10"
                placeholder="Enter IFSC code"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-xs text-muted-foreground">Account Type</Label>
              <Select value={form.accountType} onValueChange={(v) => setForm((p) => ({ ...p, accountType: v }))}>
                <SelectTrigger className="bg-white/5 border-white/10">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {ACCOUNT_TYPES.map((t) => (
                    <SelectItem key={t} value={t}>{t}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
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
          <DetailField icon={Building2} label="Bank Name" value={bankDetails!.bankName} />
          <DetailField icon={CreditCard} label="Account Number" value={maskAccountNumber(bankDetails!.accountNumber)} />
          <DetailField label="IFSC Code" value={bankDetails!.ifscCode} />
          <DetailField label="Account Type" value={bankDetails!.accountType} />
        </div>
      )}
    </DataCard>
  );
}

function DetailField({
  icon: Icon,
  label,
  value,
}: {
  icon?: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  label: string;
  value: string;
}) {
  return (
    <div>
      <p className="text-xs text-muted-foreground mb-1 flex items-center gap-1.5">
        {Icon && <Icon className="h-3 w-3" />}
        {label}
      </p>
      <p className="text-sm font-medium text-foreground">{value}</p>
    </div>
  );
}

function maskAccountNumber(account: string): string {
  if (account.length <= 4) return account;
  return '••••••' + account.slice(-4);
}
