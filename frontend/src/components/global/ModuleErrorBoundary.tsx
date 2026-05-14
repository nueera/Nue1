'use client';

import { Component, type ErrorInfo, type ReactNode } from 'react';
import { AlertTriangle } from 'lucide-react';

interface ModuleErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
  moduleName?: string;
  moduleColor?: string;
}

interface ModuleErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

export class ModuleErrorBoundary extends Component<ModuleErrorBoundaryProps, ModuleErrorBoundaryState> {
  constructor(props: ModuleErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ModuleErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error(`[${this.props.moduleName || 'Module'} Error Boundary]`, error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      const moduleName = this.props.moduleName || 'this module';
      const bgColor = this.props.moduleColor || 'bg-primary';

      return (
        <div className="flex flex-col items-center justify-center min-h-[400px] p-8 text-center">
          <div className="w-16 h-16 rounded-full bg-status-danger/15 flex items-center justify-center mb-4">
            <AlertTriangle className="h-8 w-8 text-status-danger" />
          </div>
          <h2 className="text-lg font-semibold text-foreground mb-2">Something went wrong</h2>
          <p className="text-sm text-muted-foreground max-w-md mb-4">
            An error occurred in {moduleName}. Please try refreshing the page.
          </p>
          <button
            onClick={() => this.setState({ hasError: false, error: null })}
            className={`px-4 py-2 rounded-lg ${bgColor} text-white text-sm font-medium hover:opacity-90 transition-opacity`}
          >
            Try Again
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
