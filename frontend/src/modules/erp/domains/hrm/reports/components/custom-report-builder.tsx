'use client';

import { useState } from 'react';
import { Plus, Trash2, Settings2, Eye, BarChart3, Table2, PieChart, TrendingUp, Filter } from 'lucide-react';
import { REPORT_CATEGORIES, CHART_TYPES } from '../constants';

interface CustomReportBuilderProps {
  onSave: (config: {
    name: string;
    category: string;
    description: string;
    fields: string[];
    filters: Array<{ field: string; operator: string; value: unknown }>;
    groupBy: string[];
    chartType?: string;
  }) => void;
  onCancel?: () => void;
  isLoading?: boolean;
}

const DATA_SOURCE_FIELDS: Record<string, string[]> = {
  Employee: ['firstName', 'lastName', 'email', 'department', 'position', 'status', 'employmentType', 'joinDate', 'salary'],
  Attendance: ['employeeName', 'date', 'checkIn', 'checkOut', 'status', 'hoursWorked'],
  Leave: ['employeeName', 'leaveType', 'startDate', 'endDate', 'days', 'status', 'reason'],
  Payroll: ['employeeName', 'month', 'basicSalary', 'deductions', 'bonus', 'netSalary', 'status'],
  Performance: ['employeeName', 'cycleName', 'rating', 'reviewerType', 'status'],
  Recruitment: ['jobTitle', 'candidateName', 'stage', 'appliedAt', 'rating'],
  Training: ['programTitle', 'category', 'trainer', 'status', 'enrolledCount', 'completedCount'],
  Expense: ['employeeName', 'category', 'amount', 'date', 'status'],
  Shift: ['employeeName', 'shiftName', 'startTime', 'endTime', 'date'],
  Loan: ['employeeName', 'loanType', 'amount', 'outstandingBalance', 'status', 'emi'],
};

const FILTER_OPERATORS = ['eq', 'neq', 'gt', 'gte', 'lt', 'lte', 'contains', 'between', 'in'];

const CHART_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  bar: BarChart3,
  line: TrendingUp,
  pie: PieChart,
  table: Table2,
};

export function CustomReportBuilder({ onSave, onCancel, isLoading }: CustomReportBuilderProps) {
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [selectedFields, setSelectedFields] = useState<string[]>([]);
  const [filters, setFilters] = useState<Array<{ field: string; operator: string; value: unknown }>>([]);
  const [groupBy, setGroupBy] = useState<string[]>([]);
  const [chartType, setChartType] = useState<string>('table');
  const [previewMode, setPreviewMode] = useState(false);

  const availableFields = category ? DATA_SOURCE_FIELDS[category] || [] : [];

  const toggleField = (field: string) => {
    setSelectedFields((prev) =>
      prev.includes(field) ? prev.filter((f) => f !== field) : [...prev, field]
    );
  };

  const addFilter = () => {
    setFilters((prev) => [...prev, { field: '', operator: 'eq', value: '' }]);
  };

  const updateFilter = (index: number, key: 'field' | 'operator' | 'value', val: string) => {
    setFilters((prev) => prev.map((f, i) => (i === index ? { ...f, [key]: val } : f)));
  };

  const removeFilter = (index: number) => {
    setFilters((prev) => prev.filter((_, i) => i !== index));
  };

  const toggleGroupBy = (field: string) => {
    setGroupBy((prev) =>
      prev.includes(field) ? prev.filter((f) => f !== field) : [...prev, field]
    );
  };

  const isValid = name && category && selectedFields.length > 0;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      name,
      category,
      description,
      fields: selectedFields,
      filters: filters.filter((f) => f.field),
      groupBy,
      chartType: chartType === 'table' ? undefined : chartType,
    });
  };

  const inputClass = 'w-full bg-white/5 backdrop-blur-md border border-white/10 rounded-xl px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/50 outline-none focus:border-module-erp/50 transition-all duration-200';

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Basic Info */}
      <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-5 space-y-4">
        <h4 className="text-xs font-medium text-muted-foreground uppercase tracking-wider flex items-center gap-2">
          <Settings2 className="h-3.5 w-3.5" />
          Report Configuration
        </h4>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-[10px] text-muted-foreground uppercase tracking-wider">Report Name <span className="text-red-400">*</span></label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g., Monthly Attrition Report" className={inputClass} required />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] text-muted-foreground uppercase tracking-wider">Data Source <span className="text-red-400">*</span></label>
            <select value={category} onChange={(e) => { setCategory(e.target.value); setSelectedFields([]); setGroupBy([]); setFilters([]); }} className={inputClass} required>
              <option value="" disabled>Select data source</option>
              {REPORT_CATEGORIES.map((cat) => <option key={cat} value={cat}>{cat}</option>)}
            </select>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-[10px] text-muted-foreground uppercase tracking-wider">Description</label>
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Describe what this report shows..." rows={2} className={`${inputClass} resize-none`} />
        </div>
      </div>

      {/* Field Selection */}
      {category && (
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-5 space-y-4">
          <h4 className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Select Columns <span className="text-red-400">*</span></h4>
          <div className="flex flex-wrap gap-2">
            {availableFields.map((field) => {
              const isSelected = selectedFields.includes(field);
              return (
                <button
                  key={field}
                  type="button"
                  onClick={() => toggleField(field)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition-all duration-200 ${
                    isSelected
                      ? 'bg-module-erp/10 border-module-erp/30 text-module-erp'
                      : 'bg-white/5 border-white/10 text-muted-foreground hover:bg-white/10'
                  }`}
                >
                  {field}
                </button>
              );
            })}
          </div>
          {selectedFields.length > 0 && (
            <p className="text-[10px] text-muted-foreground">{selectedFields.length} column{selectedFields.length !== 1 ? 's' : ''} selected</p>
          )}
        </div>
      )}

      {/* Filters */}
      {category && (
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-5 space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-medium text-muted-foreground uppercase tracking-wider flex items-center gap-2">
              <Filter className="h-3.5 w-3.5" />
              Filters
            </h4>
            <button type="button" onClick={addFilter} className="flex items-center gap-1 px-2.5 py-1 text-[10px] font-medium bg-white/5 border border-white/10 rounded-lg text-muted-foreground hover:bg-white/10 transition-all duration-200">
              <Plus className="h-3 w-3" />
              Add Filter
            </button>
          </div>

          {filters.length === 0 && (
            <p className="text-[10px] text-muted-foreground/50 text-center py-2">No filters applied. Click "Add Filter" to add one.</p>
          )}

          <div className="space-y-2">
            {filters.map((filter, i) => (
              <div key={i} className="flex items-center gap-2">
                <select value={filter.field} onChange={(e) => updateFilter(i, 'field', e.target.value)} className={`${inputClass} flex-1`}>
                  <option value="" disabled>Field</option>
                  {availableFields.map((f) => <option key={f} value={f}>{f}</option>)}
                </select>
                <select value={filter.operator} onChange={(e) => updateFilter(i, 'operator', e.target.value)} className={`${inputClass} w-28`}>
                  {FILTER_OPERATORS.map((op) => <option key={op} value={op}>{op}</option>)}
                </select>
                <input type="text" value={String(filter.value)} onChange={(e) => updateFilter(i, 'value', e.target.value)} placeholder="Value" className={`${inputClass} flex-1`} />
                <button type="button" onClick={() => removeFilter(i)} className="p-2 text-red-400 hover:bg-red-500/10 rounded-lg transition-colors">
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Group By */}
      {selectedFields.length > 0 && (
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-5 space-y-4">
          <h4 className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Group By</h4>
          <div className="flex flex-wrap gap-2">
            {selectedFields.map((field) => {
              const isSelected = groupBy.includes(field);
              return (
                <button
                  key={field}
                  type="button"
                  onClick={() => toggleGroupBy(field)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition-all duration-200 ${
                    isSelected
                      ? 'bg-violet-500/10 border-violet-500/30 text-violet-400'
                      : 'bg-white/5 border-white/10 text-muted-foreground hover:bg-white/10'
                  }`}
                >
                  {field}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Chart Type */}
      <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-5 space-y-4">
        <h4 className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Visualization</h4>
        <div className="flex flex-wrap gap-2">
          {CHART_TYPES.map((type) => {
            const Icon = CHART_ICONS[type];
            const isSelected = chartType === type;
            return (
              <button
                key={type}
                type="button"
                onClick={() => setChartType(type)}
                className={`flex items-center gap-2 px-4 py-2.5 text-xs font-medium rounded-lg border transition-all duration-200 ${
                  isSelected
                    ? 'bg-module-erp/10 border-module-erp/30 text-module-erp'
                    : 'bg-white/5 border-white/10 text-muted-foreground hover:bg-white/10'
                }`}
              >
                {Icon && <Icon className="h-4 w-4" />}
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </button>
            );
          })}
        </div>
      </div>

      {/* Preview toggle */}
      <button
        type="button"
        onClick={() => setPreviewMode(!previewMode)}
        className="flex items-center gap-2 text-xs text-module-erp hover:underline"
      >
        <Eye className="h-3.5 w-3.5" />
        {previewMode ? 'Hide Preview' : 'Preview Report'}
      </button>

      {previewMode && selectedFields.length > 0 && (
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-5">
          <h4 className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3">Preview</h4>
          {chartType === 'table' ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/10">
                    {selectedFields.map((f) => (
                      <th key={f} className="text-left text-[10px] font-medium text-muted-foreground uppercase tracking-wider px-3 py-2">{f}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-white/5">
                    {selectedFields.map((f) => (
                      <td key={f} className="px-3 py-2 text-xs text-muted-foreground/30">Sample data</td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          ) : (
            <div className="flex items-center justify-center h-32 text-xs text-muted-foreground">
              Chart visualization will render with real data
            </div>
          )}
        </div>
      )}

      {/* Actions */}
      <div className="flex items-center gap-3 pt-2">
        <button type="submit" disabled={!isValid || isLoading} className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-module-erp text-white text-sm font-medium hover:bg-module-erp/90 press-scale transition-all duration-200 disabled:opacity-50">
          {isLoading ? 'Saving...' : 'Save Report'}
        </button>
        {onCancel && (
          <button type="button" onClick={onCancel} className="px-5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-sm text-muted-foreground hover:bg-white/10 transition-all duration-200">Cancel</button>
        )}
      </div>
    </form>
  );
}
