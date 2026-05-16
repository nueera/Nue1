// ============================================================================
// CRM Module — Error Boundary
// ============================================================================

'use client';

import { Component, type ErrorInfo, type ReactNode } from 'react';
import { AlertTriangle } from 'lucide-react';

interface CrmErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
}

interface CrmErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

export class CrmErrorBoundary extends Component<CrmErrorBoundaryProps, CrmErrorBoundaryState> {
  constructor(props: CrmErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): CrmErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('[CRM Error Boundary]', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }
      return (
        <div className="flex flex-col items-center justify-center min-h-[400px] p-8 text-center">
          <div className="w-16 h-16 rounded-full bg-status-danger/15 flex items-center justify-center mb-4">
            <AlertTriangle className="h-8 w-8 text-status-danger" />
          </div>
          <h2 className="text-lg font-semibold text-foreground mb-2">Something went wrong</h2>
          <p className="text-sm text-muted-foreground max-w-md mb-4">
            An error occurred in the CRM module. Please try refreshing the page.
          </p>
          <button
            onClick={() => this.setState({ hasError: false, error: null })}
            className="px-4 py-2 rounded-lg bg-module-crm text-white text-sm font-medium hover:opacity-90 transition-opacity"
          >
            Try Again
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
