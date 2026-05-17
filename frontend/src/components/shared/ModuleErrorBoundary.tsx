'use client';

import { AlertTriangle, RotateCcw, Home } from 'lucide-react';
import { sanitizeErrorMessage } from '@/components/providers/query-provider';

type ModuleId = 'erp' | 'crm' | 'finance' | 'marketing';

interface ModuleErrorBoundaryProps {
  error: Error & { digest?: string };
  reset: () => void;
  moduleId: ModuleId;
  moduleName?: string;
}

const MODULE_NAMES: Record<ModuleId, string> = {
  erp: 'ERP',
  crm: 'CRM',
  finance: 'Finance',
  marketing: 'Marketing',
};

export function ModuleErrorBoundary({
  error,
  reset,
  moduleId,
  moduleName,
}: ModuleErrorBoundaryProps) {
  const displayName = moduleName ?? MODULE_NAMES[moduleId];

  const displayMessage = sanitizeErrorMessage(
    error.message || `An unexpected error occurred in the ${displayName} module.`
  );

  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] p-8 text-center">
      <div className="w-16 h-16 rounded-full bg-status-danger/15 flex items-center justify-center mb-4">
        <AlertTriangle className="h-8 w-8 text-status-danger" />
      </div>
      <h2 className="text-lg font-semibold text-foreground mb-2">Something went wrong</h2>
      <p className="text-sm text-muted-foreground max-w-md mb-2">
        {displayMessage}
      </p>
      {error.digest && (
        <p className="text-xs text-muted-foreground/60 mb-4">
          Reference: {error.digest}
        </p>
      )}
      {!error.digest && <div className="mb-4" />}
      <div className="flex items-center gap-3">
        <button
          onClick={reset}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg bg-module-${moduleId} text-white text-sm font-medium hover:opacity-90 transition-opacity press-scale`}
        >
          <RotateCcw className="h-3.5 w-3.5" />
          Try Again
        </button>
        <a
          href="/"
          className="flex items-center gap-2 px-4 py-2 rounded-lg border border-border text-sm font-medium text-foreground hover:bg-muted transition-colors"
        >
          <Home className="h-3.5 w-3.5" />
          Go Home
        </a>
      </div>
    </div>
  );
}
