'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { useCallback } from 'react';

export function useQueryParams() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const setParam = useCallback((key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    router.push(`?${params.toString()}`, { scroll: false });
  }, [searchParams, router]);

  const getParam = useCallback((key: string) => searchParams.get(key), [searchParams]);

  return { setParam, getParam, searchParams };
}
