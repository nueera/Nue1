'use client';

import { useState } from 'react';
import { UserPlus, Check, Users, AlertCircle } from 'lucide-react';
import type { TrainingProgram } from '../types';

interface Employee {
  id: string;
  name: string;
  department: string;
}

interface TrainingEnrollmentProps {
  program: TrainingProgram;
  employees: Employee[];
  onEnroll: (employeeIds: string[]) => void;
  onCancel?: () => void;
  isLoading?: boolean;
}

export function TrainingEnrollment({ program, employees, onEnroll, onCancel, isLoading }: TrainingEnrollmentProps) {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [search, setSearch] = useState('');

  const availableSlots = program.maxParticipants - program.enrolledCount;
  const isFull = availableSlots <= 0;

  const filtered = employees.filter(
    (e) => e.name.toLowerCase().includes(search.toLowerCase()) || e.department.toLowerCase().includes(search.toLowerCase())
  );

  const toggleEmployee = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((eid) => eid !== id) : [...prev, id]
    );
  };

  const overCapacity = selectedIds.length > availableSlots;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!overCapacity) onEnroll(selectedIds);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Program info */}
      <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-4">
        <h4 className="text-sm font-semibold text-foreground">{program.title}</h4>
        <div className="flex items-center gap-3 mt-1 text-[10px] text-muted-foreground">
          <span>{program.category}</span>
          <span>Capacity: {program.enrolledCount}/{program.maxParticipants}</span>
          <span>Available: {availableSlots}</span>
        </div>
        {isFull && (
          <div className="flex items-center gap-2 mt-2 px-3 py-2 bg-red-500/5 border border-red-500/20 rounded-lg">
            <AlertCircle className="h-3.5 w-3.5 text-red-400" />
            <span className="text-xs text-red-400">This program is at full capacity</span>
          </div>
        )}
      </div>

      {/* Search */}
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search employees..."
        className="w-full bg-white/5 backdrop-blur-md border border-white/10 rounded-xl px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/50 outline-none focus:border-module-erp/50 transition-all duration-200"
      />

      {/* Employee list */}
      <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl max-h-64 overflow-y-auto">
        {filtered.map((emp) => {
          const isSelected = selectedIds.includes(emp.id);
          return (
            <button
              key={emp.id}
              type="button"
              onClick={() => !isFull && toggleEmployee(emp.id)}
              disabled={isFull}
              className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-white/5 transition-all duration-200 border-b border-white/5 last:border-0 disabled:opacity-50"
            >
              <div className={`w-4 h-4 rounded border flex items-center justify-center shrink-0 transition-all ${isSelected ? 'bg-module-erp border-module-erp text-white' : 'border-white/20'}`}>
                {isSelected && <Check className="h-3 w-3" />}
              </div>
              <div className="flex-1 text-left min-w-0">
                <p className="text-sm text-foreground truncate">{emp.name}</p>
                <p className="text-[10px] text-muted-foreground">{emp.department}</p>
              </div>
            </button>
          );
        })}
      </div>

      {overCapacity && (
        <div className="flex items-center gap-2 px-3 py-2 bg-amber-500/5 border border-amber-500/20 rounded-lg">
          <AlertCircle className="h-3.5 w-3.5 text-amber-400" />
          <span className="text-xs text-amber-400">Selected {selectedIds.length} employees exceeds available slots ({availableSlots})</span>
        </div>
      )}

      {/* Actions */}
      <div className="flex items-center gap-3 pt-2">
        <button
          type="submit"
          disabled={isFull || selectedIds.length === 0 || overCapacity || isLoading}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-module-erp text-white text-sm font-medium hover:bg-module-erp/90 press-scale transition-all duration-200 disabled:opacity-50"
        >
          <UserPlus className="h-4 w-4" />
          {isLoading ? 'Enrolling...' : `Enroll ${selectedIds.length} Employee${selectedIds.length !== 1 ? 's' : ''}`}
        </button>
        {onCancel && (
          <button type="button" onClick={onCancel} className="px-5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-sm text-muted-foreground hover:bg-white/10 transition-all duration-200">Cancel</button>
        )}
      </div>
    </form>
  );
}
