'use client';

import { useState } from 'react';
import { Check, UserPlus, CalendarDays } from 'lucide-react';
import type { ShiftType } from '../types';

interface Employee {
  id: string;
  name: string;
  department: string;
  currentShift?: string;
}

interface ShiftAssignmentBulkProps {
  employees: Employee[];
  shiftTypes: ShiftType[];
  onSubmit: (data: {
    employeeIds: string[];
    shiftTypeId: string;
    startDate: string;
    endDate?: string;
  }) => void;
  isLoading?: boolean;
}

export function ShiftAssignmentBulk({ employees, shiftTypes, onSubmit, isLoading }: ShiftAssignmentBulkProps) {
  const [selectedEmployeeIds, setSelectedEmployeeIds] = useState<string[]>([]);
  const [shiftTypeId, setShiftTypeId] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [search, setSearch] = useState('');

  const filteredEmployees = employees.filter(
    (e) =>
      e.name.toLowerCase().includes(search.toLowerCase()) ||
      e.department.toLowerCase().includes(search.toLowerCase())
  );

  const toggleEmployee = (id: string) => {
    setSelectedEmployeeIds((prev) =>
      prev.includes(id) ? prev.filter((eid) => eid !== id) : [...prev, id]
    );
  };

  const toggleAll = () => {
    if (selectedEmployeeIds.length === filteredEmployees.length) {
      setSelectedEmployeeIds([]);
    } else {
      setSelectedEmployeeIds(filteredEmployees.map((e) => e.id));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      employeeIds: selectedEmployeeIds,
      shiftTypeId,
      startDate,
      endDate: endDate || undefined,
    });
  };

  const isValid = selectedEmployeeIds.length > 0 && shiftTypeId && startDate;

  const inputClass = 'w-full bg-white/5 backdrop-blur-md border border-white/10 rounded-xl px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/50 outline-none focus:border-module-erp/50 focus:ring-1 focus:ring-module-erp/20 transition-all duration-200';

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Shift Selection */}
      <div className="space-y-2">
        <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
          Assign Shift <span className="text-red-400">*</span>
        </label>
        <select
          value={shiftTypeId}
          onChange={(e) => setShiftTypeId(e.target.value)}
          className={inputClass}
          required
        >
          <option value="" disabled>Select a shift type</option>
          {shiftTypes.map((st) => (
            <option key={st.id} value={st.id}>
              {st.name} ({st.startTime} – {st.endTime})
            </option>
          ))}
        </select>
      </div>

      {/* Date Range */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
            Effective From <span className="text-red-400">*</span>
          </label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className={inputClass}
            required
          />
        </div>
        <div className="space-y-2">
          <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
            Until (Optional)
          </label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            min={startDate}
            className={inputClass}
          />
        </div>
      </div>

      {/* Employee Selection */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
            Select Employees <span className="text-red-400">*</span>
          </label>
          <span className="text-xs text-module-erp font-medium">
            {selectedEmployeeIds.length} selected
          </span>
        </div>

        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search employees..."
          className={inputClass}
        />

        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl max-h-64 overflow-y-auto">
          <div className="sticky top-0 bg-white/5 backdrop-blur-xl border-b border-white/10 px-4 py-2">
            <button
              type="button"
              onClick={toggleAll}
              className="flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              <div className={`w-4 h-4 rounded border flex items-center justify-center transition-all ${
                selectedEmployeeIds.length === filteredEmployees.length && filteredEmployees.length > 0
                  ? 'bg-module-erp border-module-erp text-white'
                  : 'border-white/20'
              }`}>
                {selectedEmployeeIds.length === filteredEmployees.length && filteredEmployees.length > 0 && (
                  <Check className="h-3 w-3" />
                )}
              </div>
              Select All
            </button>
          </div>

          {filteredEmployees.length === 0 ? (
            <div className="px-4 py-8 text-center text-sm text-muted-foreground">
              No employees found
            </div>
          ) : (
            filteredEmployees.map((emp) => (
              <button
                key={emp.id}
                type="button"
                onClick={() => toggleEmployee(emp.id)}
                className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-white/5 transition-all duration-200 border-b border-white/5 last:border-0"
              >
                <div className={`w-4 h-4 rounded border flex items-center justify-center shrink-0 transition-all ${
                  selectedEmployeeIds.includes(emp.id)
                    ? 'bg-module-erp border-module-erp text-white'
                    : 'border-white/20'
                }`}>
                  {selectedEmployeeIds.includes(emp.id) && (
                    <Check className="h-3 w-3" />
                  )}
                </div>
                <div className="flex-1 text-left min-w-0">
                  <p className="text-sm text-foreground truncate">{emp.name}</p>
                  <p className="text-[10px] text-muted-foreground">{emp.department}</p>
                </div>
                {emp.currentShift && (
                  <span className="text-[10px] text-muted-foreground/60 shrink-0">
                    Current: {emp.currentShift}
                  </span>
                )}
              </button>
            ))
          )}
        </div>
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={!isValid || isLoading}
        className="w-full flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-module-erp text-white text-sm font-medium hover:bg-module-erp/90 press-scale transition-all duration-200 disabled:opacity-50"
      >
        <UserPlus className="h-4 w-4" />
        {isLoading ? 'Assigning...' : `Assign Shift to ${selectedEmployeeIds.length} Employee${selectedEmployeeIds.length !== 1 ? 's' : ''}`}
      </button>
    </form>
  );
}
