import { useState } from 'react';

interface UsePaginationOptions {
  initialPage?: number;
  initialPageSize?: number;
}

export function usePagination({ initialPage = 1, initialPageSize = 10 }: UsePaginationOptions = {}) {
  const [page, setPage] = useState(initialPage);
  const [pageSize, setPageSize] = useState(initialPageSize);

  const nextPage = () => setPage((p) => p + 1);
  const prevPage = () => setPage((p) => Math.max(1, p - 1));
  const goToPage = (p: number) => setPage(Math.max(1, p));
  const changePageSize = (size: number) => { setPageSize(size); setPage(1); };

  return { page, pageSize, nextPage, prevPage, goToPage, changePageSize, setPage };
}
