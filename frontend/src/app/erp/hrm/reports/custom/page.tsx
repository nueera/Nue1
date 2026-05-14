'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { PageTransition } from '@/modules/erp/design-system/components/animations';
import {
  Wrench,
  Download,
  Eye,
  Plus,
  Trash2,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';

interface ReportField {
  id: string;
  field: string;
  label: string;
}

const availableFields = [
  { value: 'employeeName', label: 'Employee Name' },
  { value: 'department', label: 'Department' },
  { value: 'position', label: 'Position' },
  { value: 'status', label: 'Status' },
  { value: 'joinDate', label: 'Join Date' },
  { value: 'salary', label: 'Salary' },
  { value: 'leaveBalance', label: 'Leave Balance' },
  { value: 'attendance', label: 'Attendance %' },
  { value: 'performanceRating', label: 'Performance Rating' },
];

const reportTypes = [
  { value: 'employee', label: 'Employee Report' },
  { value: 'attendance', label: 'Attendance Report' },
  { value: 'leave', label: 'Leave Report' },
  { value: 'payroll', label: 'Payroll Report' },
];

const filterOperators = ['equals', 'not equals', 'contains', 'greater than', 'less than'];

interface FilterCondition {
  id: string;
  field: string;
  operator: string;
  value: string;
}

export default function CustomReportPage() {
  const [reportType, setReportType] = useState('');
  const [selectedFields, setSelectedFields] = useState<ReportField[]>([]);
  const [filters, setFilters] = useState<FilterCondition[]>([]);
  const [previewOpen, setPreviewOpen] = useState(false);

  const addField = (fieldValue: string) => {
    const field = availableFields.find(f => f.value === fieldValue);
    if (field && !selectedFields.find(f => f.field === field.value)) {
      setSelectedFields(prev => [...prev, { id: `f-${Date.now()}`, field: field.value, label: field.label }]);
    }
  };

  const removeField = (id: string) => {
    setSelectedFields(prev => prev.filter(f => f.id !== id));
  };

  const addFilter = () => {
    setFilters(prev => [...prev, { id: `fl-${Date.now()}`, field: '', operator: 'equals', value: '' }]);
  };

  const updateFilter = (id: string, key: keyof FilterCondition, value: string) => {
    setFilters(prev => prev.map(f => f.id === id ? { ...f, [key]: value } : f));
  };

  const removeFilter = (id: string) => {
    setFilters(prev => prev.filter(f => f.id !== id));
  };

  return (
    <PageTransition>
      <div className="p-4 sm:p-6 lg:p-8">
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.24, ease: [0.25, 0.46, 0.45, 0.94] as const }}
          className="mb-6"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-purple-500/10 text-purple-500">
              <Wrench className="h-5 w-5" strokeWidth={1.8} />
            </div>
            <h1
              className="font-bold text-foreground"
              style={{ fontSize: 'var(--text-xl)', letterSpacing: 'var(--tracking-tight)', lineHeight: 'var(--leading-tight)' }}
            >
              Custom Report Builder
            </h1>
          </div>
          <p
            className="text-muted-foreground mt-1"
            style={{ fontSize: 'var(--text-sm)', letterSpacing: 'var(--tracking-normal)', lineHeight: 'var(--leading-normal)' }}
          >
            Build custom reports with filters and field selection
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Report configuration */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.05, ease: [0.25, 0.46, 0.45, 0.94] as const }}
            className="lg:col-span-2 space-y-6"
          >
            {/* Report type */}
            <div className="border border-glass-border/40 bg-glass-bg/20 rounded-xl p-6">
              <h2
                className="font-semibold text-foreground mb-4"
                style={{ fontSize: 'var(--text-base)', letterSpacing: 'var(--tracking-tight)' }}
              >
                Report Type
              </h2>
              <Select value={reportType} onValueChange={setReportType}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select report type" />
                </SelectTrigger>
                <SelectContent>
                  {reportTypes.map((type) => (
                    <SelectItem key={type.value} value={type.value}>{type.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Field selection */}
            <div className="border border-glass-border/40 bg-glass-bg/20 rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h2
                  className="font-semibold text-foreground"
                  style={{ fontSize: 'var(--text-base)', letterSpacing: 'var(--tracking-tight)' }}
                >
                  Select Fields
                </h2>
                <Select onValueChange={addField}>
                  <SelectTrigger className="w-[200px]" size="sm">
                    <SelectValue placeholder="Add field..." />
                  </SelectTrigger>
                  <SelectContent>
                    {availableFields
                      .filter(f => !selectedFields.find(sf => sf.field === f.value))
                      .map((field) => (
                        <SelectItem key={field.value} value={field.value}>{field.label}</SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              </div>
              {selectedFields.length === 0 ? (
                <p className="text-muted-foreground text-center py-8" style={{ fontSize: 'var(--text-sm)' }}>
                  No fields selected. Add fields from the dropdown above.
                </p>
              ) : (
                <div className="flex flex-wrap gap-2">
                  {selectedFields.map((field) => (
                    <Badge
                      key={field.id}
                      variant="outline"
                      className="flex items-center gap-1.5 py-1.5 px-3 bg-module-erp/5 text-module-erp border-module-erp/20"
                      style={{ fontSize: 'var(--text-sm)' }}
                    >
                      {field.label}
                      <button
                        onClick={() => removeField(field.id)}
                        className="ml-1 hover:text-red-500 transition-colors"
                        aria-label={`Remove ${field.label}`}
                      >
                        <Trash2 className="h-3 w-3" strokeWidth={1.8} />
                      </button>
                    </Badge>
                  ))}
                </div>
              )}
            </div>

            {/* Filters */}
            <div className="border border-glass-border/40 bg-glass-bg/20 rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h2
                  className="font-semibold text-foreground"
                  style={{ fontSize: 'var(--text-base)', letterSpacing: 'var(--tracking-tight)' }}
                >
                  Filters
                </h2>
                <Button variant="outline" size="sm" className="gap-1.5" onClick={addFilter}>
                  <Plus className="h-3.5 w-3.5" strokeWidth={1.8} />
                  Add Filter
                </Button>
              </div>
              {filters.length === 0 ? (
                <p className="text-muted-foreground text-center py-8" style={{ fontSize: 'var(--text-sm)' }}>
                  No filters applied. Add filters to narrow down your report.
                </p>
              ) : (
                <div className="space-y-3">
                  {filters.map((filter) => (
                    <div key={filter.id} className="flex items-center gap-3">
                      <Select value={filter.field} onValueChange={(v) => updateFilter(filter.id, 'field', v)}>
                        <SelectTrigger className="flex-1" size="sm">
                          <SelectValue placeholder="Field" />
                        </SelectTrigger>
                        <SelectContent>
                          {availableFields.map((f) => (
                            <SelectItem key={f.value} value={f.value}>{f.label}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <Select value={filter.operator} onValueChange={(v) => updateFilter(filter.id, 'operator', v)}>
                        <SelectTrigger className="w-[140px]" size="sm">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {filterOperators.map((op) => (
                            <SelectItem key={op} value={op}>{op}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <Input
                        placeholder="Value"
                        value={filter.value}
                        onChange={(e) => updateFilter(filter.id, 'value', e.target.value)}
                        className="flex-1"
                        size={1}
                      />
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 shrink-0"
                        onClick={() => removeFilter(filter.id)}
                      >
                        <Trash2 className="h-4 w-4 text-red-500" strokeWidth={1.8} />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>

          {/* Preview / Actions sidebar */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] as const }}
            className="space-y-4"
          >
            <div className="border border-glass-border/40 bg-glass-bg/20 rounded-xl p-6">
              <h2
                className="font-semibold text-foreground mb-4"
                style={{ fontSize: 'var(--text-base)', letterSpacing: 'var(--tracking-tight)' }}
              >
                Report Summary
              </h2>
              <div className="space-y-3">
                <div>
                  <p className="text-muted-foreground" style={{ fontSize: 'var(--text-xs)', letterSpacing: 'var(--tracking-wide)' }}>
                    Report Type
                  </p>
                  <p className="text-foreground font-medium" style={{ fontSize: 'var(--text-sm)' }}>
                    {reportType ? reportTypes.find(t => t.value === reportType)?.label : 'Not selected'}
                  </p>
                </div>
                <div>
                  <p className="text-muted-foreground" style={{ fontSize: 'var(--text-xs)', letterSpacing: 'var(--tracking-wide)' }}>
                    Selected Fields
                  </p>
                  <p className="text-foreground font-medium" style={{ fontSize: 'var(--text-sm)' }}>
                    {selectedFields.length} field(s)
                  </p>
                </div>
                <div>
                  <p className="text-muted-foreground" style={{ fontSize: 'var(--text-xs)', letterSpacing: 'var(--tracking-wide)' }}>
                    Filters
                  </p>
                  <p className="text-foreground font-medium" style={{ fontSize: 'var(--text-sm)' }}>
                    {filters.length} filter(s)
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Button
                className="w-full bg-module-erp hover:bg-module-erp/90 text-white gap-2 press-scale"
                disabled={!reportType || selectedFields.length === 0}
              >
                <Eye className="h-4 w-4" strokeWidth={1.8} />
                Generate Preview
              </Button>
              <Button
                variant="outline"
                className="w-full gap-2"
                disabled={!reportType || selectedFields.length === 0}
              >
                <Download className="h-4 w-4" strokeWidth={1.8} />
                Export CSV
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </PageTransition>
  );
}
