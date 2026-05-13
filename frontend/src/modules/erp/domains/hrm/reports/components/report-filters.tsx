'use client';

import { useState } from 'react';
import { Filter, Calendar, Building2, Users, X } from 'lucide-react';

interface ReportFiltersProps {
  onApply: (filters: ReportFilterValues) => void;
  onReset?: () => void;
  departments?: string[];
  employeeTypes?: string[];
  statuses?: string[];
  showDateRange?: boolean;
  showDepartment?: boolean;
  showStatus?: boolean;
  showEmployeeType?: boolean;
  initialFilters?: Partial<ReportFilterValues>;
}

export interface ReportFilterValues {
  startDate: string;
  endDate: string;
  departments: string[];
  statuses: string[];
  employeeTypes: string[];
}

const DEFAULT_DEPARTMENTS = ['Engineering', 'Marketing', 'Sales', 'HR', 'Finance', 'Operations', 'Design', 'Product'];
const DEFAULT_EMPLOYEE_TYPES = ['full-time', 'part-time', 'contract', 'intern'];
const DEFAULT_STATUSES = ['active', 'inactive', 'on-leave', 'onboarding', 'notice', 'terminated'];

export function ReportFilters({
  onApply,
  onReset,
  departments = DEFAULT_DEPARTMENTS,
  employeeTypes = DEFAULT_EMPLOYEE_TYPES,
  statuses = DEFAULT_STATUSES,
  showDateRange = true,
  showDepartment = true,
  showStatus = true,
  showEmployeeType = true,
  initialFilters,
}: ReportFiltersProps) {
  const [startDate, setStartDate] = useState(initialFilters?.startDate || '');
  const [endDate, setEndDate] = useState(initialFilters?.endDate || '');
  const [selectedDepts, setSelectedDepts] = useState<string[]>(initialFilters?.departments || []);
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>(initialFilters?.statuses || []);
  const [selectedEmpTypes, setSelectedEmpTypes] = useState<string[]>(initialFilters?.employeeTypes || []);

  const inputClass = 'w-full bg-white/5 backdrop-blur-md border border-white/10 rounded-xl px-3 py-2 text-sm text-foreground outline-none focus:border-module-erp/50 transition-all duration-200';

  const toggleItem = (list: string[], item: string, setter: (v: string[]) => void) => {
    setter(list.includes(item) ? list.filter((i) => i !== item) : [...list, item]);
  };

  const activeFilterCount = [
    startDate && endDate ? 1 : 0,
    selectedDepts.length > 0 ? 1 : 0,
    selectedStatuses.length > 0 ? 1 : 0,
    selectedEmpTypes.length > 0 ? 1 : 0,
  ].reduce((a, b) => a + b, 0);

  const handleApply = () => {
    onApply({
      startDate,
      endDate,
      departments: selectedDepts,
      statuses: selectedStatuses,
      employeeTypes: selectedEmpTypes,
    });
  };

  const handleReset = () => {
    setStartDate('');
    setEndDate('');
    setSelectedDepts([]);
    setSelectedStatuses([]);
    setSelectedEmpTypes([]);
    onReset?.();
  };

  return (
    <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-5 space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-module-erp" />
          <h3 className="text-sm font-semibold text-foreground">Filters</h3>
          {activeFilterCount > 0 && (
            <span className="px-1.5 py-0.5 text-[9px] font-medium bg-module-erp/10 text-module-erp rounded-md border border-module-erp/20">
              {activeFilterCount} active
            </span>
          )}
        </div>
        <button onClick={handleReset} className="flex items-center gap-1 text-[10px] text-muted-foreground hover:text-foreground transition-colors">
          <X className="h-3 w-3" />
          Reset
        </button>
      </div>

      {/* Date Range */}
      {showDateRange && (
        <div className="space-y-2">
          <label className="text-[10px] text-muted-foreground uppercase tracking-wider flex items-center gap-1.5">
            <Calendar className="h-3 w-3" />
            Date Range
          </label>
          <div className="grid grid-cols-2 gap-3">
            <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} className={inputClass} placeholder="From" />
            <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} min={startDate} className={inputClass} placeholder="To" />
          </div>
        </div>
      )}

      {/* Department Multi-select */}
      {showDepartment && (
        <div className="space-y-2">
          <label className="text-[10px] text-muted-foreground uppercase tracking-wider flex items-center gap-1.5">
            <Building2 className="h-3 w-3" />
            Department
          </label>
          <div className="flex flex-wrap gap-1.5">
            {departments.map((dept) => {
              const isSelected = selectedDepts.includes(dept);
              return (
                <button
                  key={dept}
                  type="button"
                  onClick={() => toggleItem(selectedDepts, dept, setSelectedDepts)}
                  className={`px-2.5 py-1 text-[10px] font-medium rounded-lg border transition-all duration-200 ${
                    isSelected
                      ? 'bg-module-erp/10 border-module-erp/30 text-module-erp'
                      : 'bg-white/5 border-white/10 text-muted-foreground hover:bg-white/10'
                  }`}
                >
                  {dept}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Status */}
      {showStatus && (
        <div className="space-y-2">
          <label className="text-[10px] text-muted-foreground uppercase tracking-wider">Status</label>
          <div className="flex flex-wrap gap-1.5">
            {statuses.map((status) => {
              const isSelected = selectedStatuses.includes(status);
              return (
                <button
                  key={status}
                  type="button"
                  onClick={() => toggleItem(selectedStatuses, status, setSelectedStatuses)}
                  className={`px-2.5 py-1 text-[10px] font-medium rounded-lg border transition-all duration-200 capitalize ${
                    isSelected
                      ? 'bg-module-erp/10 border-module-erp/30 text-module-erp'
                      : 'bg-white/5 border-white/10 text-muted-foreground hover:bg-white/10'
                  }`}
                >
                  {status.replace('-', ' ')}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Employee Type */}
      {showEmployeeType && (
        <div className="space-y-2">
          <label className="text-[10px] text-muted-foreground uppercase tracking-wider flex items-center gap-1.5">
            <Users className="h-3 w-3" />
            Employee Type
          </label>
          <div className="flex flex-wrap gap-1.5">
            {employeeTypes.map((type) => {
              const isSelected = selectedEmpTypes.includes(type);
              return (
                <button
                  key={type}
                  type="button"
                  onClick={() => toggleItem(selectedEmpTypes, type, setSelectedEmpTypes)}
                  className={`px-2.5 py-1 text-[10px] font-medium rounded-lg border transition-all duration-200 capitalize ${
                    isSelected
                      ? 'bg-module-erp/10 border-module-erp/30 text-module-erp'
                      : 'bg-white/5 border-white/10 text-muted-foreground hover:bg-white/10'
                  }`}
                >
                  {type.replace('-', ' ')}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Apply Button */}
      <button
        onClick={handleApply}
        className="w-full px-4 py-2 rounded-xl bg-module-erp text-white text-xs font-medium hover:bg-module-erp/90 press-scale transition-all duration-200"
      >
        Apply Filters
      </button>
    </div>
  );
}
