import { useEffect, useRef, useState } from 'react';

interface UseInfiniteScrollOptions {
  fetchMore: () => Promise<void>;
  hasMore: boolean;
  threshold?: number;
}

export function useInfiniteScroll({ fetchMore, hasMore, threshold = 200 }: UseInfiniteScrollOptions) {
  const [isLoading, setIsLoading] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);

  const lastElementRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (observerRef.current) observerRef.current.disconnect();

    observerRef.current = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !isLoading) {
          setIsLoading(true);
          fetchMore().finally(() => setIsLoading(false));
        }
      },
      { rootMargin: `${threshold}px` }
    );

    if (lastElementRef.current) {
      observerRef.current.observe(lastElementRef.current);
    }

    return () => observerRef.current?.disconnect();
  }, [fetchMore, hasMore, isLoading, threshold]);

  return { lastElementRef, isLoading };
}
