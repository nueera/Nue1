'use client';

import { createContext, useContext, useCallback, useState, useEffect, useRef, Suspense } from 'react';
import { usePathname } from 'next/navigation';
import { AccentProgressBar } from '@/components/global/AccentProgressBar';
import { ModuleSkeleton } from '@/components/global/ModuleSkeleton';

/* ============================================================
   LOADING CONTEXT
   ============================================================ */

interface LoadingContextValue {
  isLoading: boolean;
  startLoading: (moduleId?: string) => void;
  stopLoading: () => void;
  currentModuleId: string | null;
}

const LoadingContext = createContext<LoadingContextValue>({
  isLoading: false,
  startLoading: () => {},
  stopLoading: () => {},
  currentModuleId: null,
});

export function useLoading() {
  return useContext(LoadingContext);
}

/* ============================================================
   SKELETON FALLBACK
   ============================================================ */

interface SkeletonFallbackProps {
  moduleId?: string;
}

function SkeletonFallback({ moduleId }: SkeletonFallbackProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[40vh] gap-3">
      {/* Spinner */}
      <div className="relative">
        <div
          className="h-8 w-8 rounded-full border-2 border-transparent animate-spin"
          style={{
            borderColor: 'var(--skeleton-bg)',
            borderTopColor: moduleId
              ? `var(--module-${moduleId})`
              : 'var(--module-erp)',
          }}
        />
      </div>
      <p className="text-sm text-muted-foreground animate-pulse">Loading...</p>
    </div>
  );
}

/* ============================================================
   GLOBAL LOADING PROVIDER
   ============================================================ */

interface GlobalLoadingProviderProps {
  children: React.ReactNode;
  moduleId?: string;
}

export function GlobalLoadingProvider({ children, moduleId }: GlobalLoadingProviderProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [currentModuleId, setCurrentModuleId] = useState<string | null>(moduleId ?? null);
  const [progressVisible, setProgressVisible] = useState(false);
  const pathname = usePathname();
  const prevPathnameRef = useRef(pathname);
  const loadingTimeoutRef = useRef<ReturnType<typeof setTimeout>>();

  // Start loading
  const startLoading = useCallback((modId?: string) => {
    if (modId) setCurrentModuleId(modId);
    setIsLoading(true);
    setProgressVisible(true);

    // Safety: auto-stop after 10 seconds
    if (loadingTimeoutRef.current) clearTimeout(loadingTimeoutRef.current);
    loadingTimeoutRef.current = setTimeout(() => {
      setIsLoading(false);
      setProgressVisible(false);
    }, 10000);
  }, []);

  // Stop loading
  const stopLoading = useCallback(() => {
    setIsLoading(false);
    // Progress bar handles its own exit animation
    setProgressVisible(false);
    if (loadingTimeoutRef.current) clearTimeout(loadingTimeoutRef.current);
  }, []);

  // Detect route changes → auto start/stop progress bar
  useEffect(() => {
    if (pathname !== prevPathnameRef.current) {
      prevPathnameRef.current = pathname;

      // Briefly show progress bar on route change
      setProgressVisible(true);
      setIsLoading(true);

      // Simulate loading complete after a short delay
      const timer = setTimeout(() => {
        setIsLoading(false);
        setProgressVisible(false);
      }, 600);

      return () => clearTimeout(timer);
    }
  }, [pathname]);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (loadingTimeoutRef.current) clearTimeout(loadingTimeoutRef.current);
    };
  }, []);

  // Derive moduleId from pathname if not explicitly set
  const resolvedModuleId = currentModuleId ?? (() => {
    if (pathname.startsWith('/erp')) return 'erp';
    if (pathname.startsWith('/crm')) return 'crm';
    if (pathname.startsWith('/finance')) return 'finance';
    if (pathname.startsWith('/marketing')) return 'marketing';
    if (pathname.startsWith('/analytics')) return 'analytics';
    return undefined;
  })();

  const contextValue: LoadingContextValue = {
    isLoading,
    startLoading,
    stopLoading,
    currentModuleId: resolvedModuleId ?? null,
  };

  return (
    <LoadingContext.Provider value={contextValue}>
      {/* Top progress bar */}
      <AccentProgressBar visible={progressVisible} moduleId={resolvedModuleId} />

      {/* Content with Suspense boundary */}
      <Suspense fallback={<SkeletonFallback moduleId={resolvedModuleId} />}>
        {children}
      </Suspense>
    </LoadingContext.Provider>
  );
}

export default GlobalLoadingProvider;
