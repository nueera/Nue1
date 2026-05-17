'use client';

import { ModuleErrorBoundary } from '@/components/shared/ModuleErrorBoundary';

export default function ErpError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return <ModuleErrorBoundary error={error} reset={reset} moduleId="erp" />;
}
