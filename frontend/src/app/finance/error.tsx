'use client';

import { ModuleErrorBoundary } from '@/components/shared/ModuleErrorBoundary';

export default function FinanceError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return <ModuleErrorBoundary error={error} reset={reset} moduleId="finance" />;
}
