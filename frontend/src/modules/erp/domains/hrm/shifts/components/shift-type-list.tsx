'use client';

import { useState } from 'react';
import { Clock, Edit2, Trash2, Moon, Sun } from 'lucide-react';
import type { ShiftType } from '../types';
import { calcShiftHours } from '../shift.utils';
import { SHIFT_LABELS } from '../constants';
import { StatusBadge } from '../../../../shared/components/status-badge';
import { ConfirmDialog } from '../../../../shared/components/confirm-dialog';
import { EmptyState } from '../../../../shared/components/empty-state';

interface ShiftTypeListProps {
  data: ShiftType[];
  isLoading?: boolean;
  onEdit?: (shift: ShiftType) => void;
  onDelete?: (id: string) => void;
}

export function ShiftTypeList({ data, isLoading, onEdit, onDelete }: ShiftTypeListProps) {
  const [deleteId, setDeleteId] = useState<string | null>(null);

  if (isLoading) {
    return (
      <div className="space-y-3">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-5 animate-pulse">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <div className="h-4 w-32 bg-white/10 rounded" />
                <div className="h-3 w-48 bg-white/10 rounded" />
              </div>
              <div className="h-8 w-20 bg-white/10 rounded" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <EmptyState
        icon={Clock}
        title="No shift types found"
        description="Create your first shift type to get started"
        action={{ label: 'Create Shift Type', onClick: () => {} }}
      />
    );
  }

  return (
    <>
      <div className="space-y-3">
        {data.map((shift) => {
          const hours = calcShiftHours(shift.startTime, shift.endTime);
          return (
            <div
              key={shift.id}
              className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-5 hover:bg-white/10 transition-all duration-200 group"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{ backgroundColor: shift.color ? `${shift.color}20` : 'rgba(59,130,246,0.1)' }}
                  >
                    {shift.isNightShift ? (
                      <Moon className="h-5 w-5" style={{ color: shift.color || '#3B82F6' }} />
                    ) : (
                      <Sun className="h-5 w-5" style={{ color: shift.color || '#3B82F6' }} />
                    )}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-foreground text-sm">
                        {SHIFT_LABELS[shift.name.toLowerCase()] || shift.name}
                      </h3>
                      {shift.isNightShift && (
                        <span className="px-1.5 py-0.5 text-[10px] font-medium bg-indigo-500/10 text-indigo-400 rounded-md border border-indigo-500/15">
                          Night
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-3 mt-1 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {shift.startTime} – {shift.endTime}
                      </span>
                      <span>{hours}h shift</span>
                      <span>Grace: {shift.graceMinutes} min</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  {onEdit && (
                    <button
                      onClick={() => onEdit(shift)}
                      className="p-2 rounded-lg hover:bg-white/10 text-muted-foreground hover:text-foreground transition-all duration-200"
                      aria-label={`Edit ${shift.name}`}
                    >
                      <Edit2 className="h-4 w-4" />
                    </button>
                  )}
                  {onDelete && (
                    <button
                      onClick={() => setDeleteId(shift.id)}
                      className="p-2 rounded-lg hover:bg-red-500/10 text-muted-foreground hover:text-red-400 transition-all duration-200"
                      aria-label={`Delete ${shift.name}`}
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <ConfirmDialog
        open={!!deleteId}
        onOpenChange={(open) => !open && setDeleteId(null)}
        title="Delete Shift Type"
        description="Are you sure you want to delete this shift type? This action cannot be undone. Employees assigned to this shift will need to be reassigned."
        confirmLabel="Delete"
        variant="destructive"
        onConfirm={() => {
          if (deleteId && onDelete) onDelete(deleteId);
          setDeleteId(null);
        }}
      />
    </>
  );
}
