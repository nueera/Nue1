// @ts-nocheck
'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from '@/components/ui/select';
import { X, Filter } from 'lucide-react';

interface FilterOption {
  label: string;
  value: string;
}

interface FilterGroup {
  key: string;
  label: string;
  options: FilterOption[];
}

interface SearchFiltersProps {
  filters: FilterGroup[];
  values: Record<string, string>;
  onChange: (key: string, value: string) => void;
  onClearAll?: () => void;
}

export function SearchFilters({ filters, values, onChange, onClearAll }: SearchFiltersProps) {
  const activeCount = Object.values(values).filter((v) => v && v !== 'all').length;

  return (
    <Card className="border-border/50">
      <CardContent className="p-3">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Filter className="h-4 w-4" />
            <span>Filters</span>
            {activeCount > 0 && <Badge variant="secondary" className="text-xs">{activeCount} active</Badge>}
          </div>
          {activeCount > 0 && (
            <Button variant="ghost" size="sm" className="h-7 text-xs" onClick={onClearAll}>
              <X className="h-3 w-3 mr-1" />Clear all
            </Button>
          )}
        </div>
        <div className="flex flex-wrap gap-3">
          {filters.map((filter) => (
            <div key={filter.key} className="space-y-1">
              <label className="text-xs text-muted-foreground">{filter.label}</label>
              <Select value={values[filter.key] ?? 'all'} onValueChange={(v) => onChange(filter.key, v)}>
                <SelectTrigger className="h-8 text-xs w-[140px]"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All {filter.label}</SelectItem>
                  {filter.options.map((opt) => (
                    <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
