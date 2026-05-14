'use client';

// ============================================================================
// FileUpload
// Promoted from modules/erp/design-system/components/file-upload to shared.
// Generic file upload drop zone — not ERP-specific.
// ============================================================================

import { cn } from '@/lib/utils';
import { Upload } from 'lucide-react';

interface FileUploadProps {
  accept?: string;
  label?: string;
  onChange?: (files: FileList) => void;
  className?: string;
  /** Unique ID for the hidden input (required for label association) */
  id?: string;
}

export function FileUpload({ accept, label = 'Upload file', onChange, className, id }: FileUploadProps) {
  const inputId = id ?? 'file-upload';
  return (
    <label
      htmlFor={inputId}
      className={cn(
        'flex flex-col items-center justify-center border-2 border-dashed border-glass-border rounded-xl p-6 cursor-pointer hover:border-primary/30 hover:bg-glass-hover/20 transition-colors',
        className
      )}
    >
      <Upload className="h-6 w-6 text-muted-foreground mb-2" strokeWidth={1.8} />
      <span className="text-sm text-muted-foreground">{label}</span>
      <input
        id={inputId}
        type="file"
        accept={accept}
        className="hidden"
        onChange={(e) => e.target.files && onChange?.(e.target.files)}
      />
    </label>
  );
}
