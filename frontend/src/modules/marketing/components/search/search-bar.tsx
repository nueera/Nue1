'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, X, SlidersHorizontal } from 'lucide-react';

interface SearchBarProps {
  value?: string;
  placeholder?: string;
  onSearch?: (query: string) => void;
  onChange?: (value: string) => void;
  onToggleFilters?: () => void;
  showFilters?: boolean;
}

export function SearchBar({ value: externalValue, placeholder = 'Search...', onSearch, onChange, onToggleFilters, showFilters }: SearchBarProps) {
  const [internalValue, setInternalValue] = useState('');
  const value = externalValue ?? internalValue;

  const handleChange = (v: string) => {
    setInternalValue(v);
    onChange?.(v);
  };

  const handleClear = () => {
    handleChange('');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') onSearch?.(value);
  };

  return (
    <div className="flex items-center gap-2">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          value={value}
          onChange={(e) => handleChange(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className="pl-9 h-9 pr-8"
        />
        {value && (
          <Button variant="ghost" size="icon" className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7" onClick={handleClear}>
            <X className="h-3.5 w-3.5" />
          </Button>
        )}
      </div>
      {onToggleFilters && (
        <Button variant={showFilters ? 'default' : 'outline'} size="icon" className="h-9 w-9" onClick={onToggleFilters}>
          <SlidersHorizontal className="h-4 w-4" />
        </Button>
      )}
    </div>
  );
}
