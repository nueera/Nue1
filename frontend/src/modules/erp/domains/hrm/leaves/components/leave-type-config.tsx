'use client';

import { useState } from 'react';
import { Settings2, Plus, Pencil, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ACCRUAL_FREQUENCY_LABELS } from '../constants';
import type { LeavePolicy, LeaveType } from '../types';

interface LeaveTypeConfigProps {
  policies: LeavePolicy[];
  onSave: (policy: LeavePolicy) => void;
  onDelete?: (id: string) => void;
  className?: string;
}

const LEAVE_TYPE_OPTIONS: LeaveType[] = ['annual', 'sick', 'personal', 'maternity', 'paternity', 'unpaid'];

const DEFAULT_POLICY: Omit<LeavePolicy, 'id'> = {
  leaveType: 'annual',
  totalDays: 20,
  carryForward: true,
  maxCarryForward: 5,
  accrualFrequency: 'monthly',
  probationPeriod: 3,
};

export function LeaveTypeConfig({ policies, onSave, onDelete, className }: LeaveTypeConfigProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editingPolicy, setEditingPolicy] = useState<LeavePolicy | null>(null);
  const [form, setForm] = useState(DEFAULT_POLICY);

  const startEdit = (policy?: LeavePolicy) => {
    if (policy) {
      setEditingPolicy(policy);
      setForm({
        leaveType: policy.leaveType,
        totalDays: policy.totalDays,
        carryForward: policy.carryForward,
        maxCarryForward: policy.maxCarryForward,
        accrualFrequency: policy.accrualFrequency,
        probationPeriod: policy.probationPeriod,
      });
    } else {
      setEditingPolicy(null);
      setForm(DEFAULT_POLICY);
    }
    setIsEditing(true);
  };

  const handleSave = () => {
    const policy: LeavePolicy = {
      id: editingPolicy?.id || `policy-${Date.now()}`,
      ...form,
    };
    onSave(policy);
    setIsEditing(false);
    setEditingPolicy(null);
  };

  return (
    <div className={`bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-4 sm:p-6 space-y-5 ${className || ''}`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Settings2 className="h-5 w-5 text-module-erp" strokeWidth={1.8} />
          <h3 className="font-semibold text-foreground text-base">Leave Type Configuration</h3>
        </div>
        <Button
          size="sm"
          onClick={() => startEdit()}
          className="bg-module-erp hover:bg-module-erp/90 text-white press-scale h-8"
        >
          <Plus className="h-3.5 w-3.5 mr-1.5" strokeWidth={1.8} />
          Add Type
        </Button>
      </div>

      {/* Policy List */}
      <div className="space-y-3">
        {policies.map((policy) => (
          <div
            key={policy.id}
            className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-4 hover:bg-white/10 transition-all duration-200"
          >
            <div className="flex items-start justify-between">
              <div className="space-y-2">
                <p className="font-medium text-foreground capitalize text-sm">{policy.leaveType} Leave</p>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-6 gap-y-1 text-xs text-muted-foreground">
                  <span>Total Days: <span className="text-foreground font-medium">{policy.totalDays}</span></span>
                  <span>Carry Forward: <span className="text-foreground font-medium">{policy.carryForward ? 'Yes' : 'No'}</span></span>
                  {policy.carryForward && (
                    <span>Max Carry: <span className="text-foreground font-medium">{policy.maxCarryForward}</span></span>
                  )}
                  <span>Accrual: <span className="text-foreground font-medium">{ACCRUAL_FREQUENCY_LABELS[policy.accrualFrequency]}</span></span>
                  <span>Probation: <span className="text-foreground font-medium">{policy.probationPeriod} months</span></span>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <Button variant="ghost" size="icon" className="h-7 w-7 press-scale" onClick={() => startEdit(policy)}>
                  <Pencil className="h-3.5 w-3.5" strokeWidth={1.8} />
                </Button>
                {onDelete && (
                  <Button variant="ghost" size="icon" className="h-7 w-7 text-red-500 press-scale" onClick={() => onDelete(policy.id)}>
                    <Trash2 className="h-3.5 w-3.5" strokeWidth={1.8} />
                  </Button>
                )}
              </div>
            </div>
          </div>
        ))}

        {policies.length === 0 && !isEditing && (
          <p className="text-sm text-muted-foreground text-center py-8">No leave type policies configured</p>
        )}
      </div>

      {/* Edit Form */}
      {isEditing && (
        <div className="bg-white/5 border border-module-erp/20 rounded-xl p-4 space-y-4">
          <h4 className="text-sm font-medium text-foreground">
            {editingPolicy ? 'Edit' : 'New'} Leave Type
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-foreground">Leave Type</label>
              <select
                value={form.leaveType}
                onChange={(e) => setForm({ ...form, leaveType: e.target.value as LeaveType })}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-foreground outline-none focus:border-module-erp/50 transition-colors"
              >
                {LEAVE_TYPE_OPTIONS.map((t) => (
                  <option key={t} value={t} className="bg-zinc-900 capitalize">{t}</option>
                ))}
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-medium text-foreground">Total Days</label>
              <input
                type="number"
                value={form.totalDays}
                onChange={(e) => setForm({ ...form, totalDays: Number(e.target.value) })}
                min={0}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-foreground outline-none focus:border-module-erp/50 transition-colors"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-medium text-foreground">Accrual Frequency</label>
              <select
                value={form.accrualFrequency}
                onChange={(e) => setForm({ ...form, accrualFrequency: e.target.value as 'monthly' | 'quarterly' | 'yearly' })}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-foreground outline-none focus:border-module-erp/50 transition-colors"
              >
                {Object.entries(ACCRUAL_FREQUENCY_LABELS).map(([key, label]) => (
                  <option key={key} value={key} className="bg-zinc-900">{label}</option>
                ))}
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-medium text-foreground">Probation Period (months)</label>
              <input
                type="number"
                value={form.probationPeriod}
                onChange={(e) => setForm({ ...form, probationPeriod: Number(e.target.value) })}
                min={0}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-foreground outline-none focus:border-module-erp/50 transition-colors"
              />
            </div>

            <div className="flex items-center gap-3">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={form.carryForward}
                  onChange={(e) => setForm({ ...form, carryForward: e.target.checked })}
                  className="rounded border-white/20 bg-white/5 text-module-erp focus:ring-module-erp/50"
                />
                <span className="text-xs font-medium text-foreground">Carry Forward</span>
              </label>
            </div>

            {form.carryForward && (
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-foreground">Max Carry Forward Days</label>
                <input
                  type="number"
                  value={form.maxCarryForward}
                  onChange={(e) => setForm({ ...form, maxCarryForward: Number(e.target.value) })}
                  min={0}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-foreground outline-none focus:border-module-erp/50 transition-colors"
                />
              </div>
            )}
          </div>

          <div className="flex items-center justify-end gap-2 pt-2">
            <Button variant="ghost" size="sm" onClick={() => setIsEditing(false)} className="h-8">
              Cancel
            </Button>
            <Button size="sm" onClick={handleSave} className="bg-module-erp hover:bg-module-erp/90 text-white press-scale h-8">
              Save Policy
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
