import { useState } from 'react';
import type { SortingState } from '@tanstack/react-table';

export function useSort(initialState: SortingState = []) {
  const [sorting, setSorting] = useState<SortingState>(initialState);
  return { sorting, setSorting };
}
