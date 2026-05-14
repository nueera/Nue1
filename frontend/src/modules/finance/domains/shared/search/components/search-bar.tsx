// @ts-nocheck
'use client';

import { useState, useCallback } from 'react';
import { Search, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useSearch } from '../hook';

interface SearchBarProps {
  onSearch?: (query: string) => void;
  placeholder?: string;
}

export function SearchBar({ onSearch, placeholder = 'Search across finance...' }: SearchBarProps) {
  const [query, setQuery] = useState('');
  const { data, isLoading } = useSearch(query);

  const handleClear = useCallback(() => {
    setQuery('');
    onSearch?.('');
  }, [onSearch]);

  return (
    <div className="relative w-full max-w-lg">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          type="text"
          value={query}
          onChange={(e) => { setQuery(e.target.value); onSearch?.(e.target.value); }}
          placeholder={placeholder}
          className="pl-9 pr-9"
        />
        {query && (
          <Button variant="ghost" size="icon" className="absolute right-1 top-1/2 -translate-y-1/2 h-6 w-6" onClick={handleClear}>
            <X className="h-3.5 w-3.5" />
          </Button>
        )}
      </div>
      {isLoading && query && (
        <div className="absolute top-full left-0 right-0 mt-1 text-xs text-muted-foreground p-2">Searching...</div>
      )}
    </div>
  );
}
