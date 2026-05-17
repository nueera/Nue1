'use client';

import { ModuleErrorBoundary } from '@/components/shared/ModuleErrorBoundary';

export default function MarketingError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return <ModuleErrorBoundary error={error} reset={reset} moduleId="marketing" />;
}
