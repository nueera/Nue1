import { useState } from 'react';
import { useDebounce } from './use-debounce';

export function useSearch(initialValue = '', debounceMs = 300) {
  const [search, setSearch] = useState(initialValue);
  const debouncedSearch = useDebounce(search, debounceMs);

  const clearSearch = () => setSearch('');

  return { search, setSearch, debouncedSearch, clearSearch };
}
