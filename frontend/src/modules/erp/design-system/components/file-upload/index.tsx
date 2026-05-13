'use client';

import { cn } from '@/lib/utils';
import { Upload } from 'lucide-react';

interface FileUploadProps {
  accept?: string;
  label?: string;
  onChange?: (files: FileList) => void;
  className?: string;
}

export function FileUpload({ accept, label = 'Upload file', onChange, className }: FileUploadProps) {
  return (
    <label className={cn('flex flex-col items-center justify-center border-2 border-dashed border-glass-border rounded-xl p-6 cursor-pointer hover:border-module-erp/30 hover:bg-glass-hover/20 transition-colors duration-[var(--motion-fast)]', className)}>
      <Upload className="h-6 w-6 text-muted-foreground mb-2" strokeWidth={1.8} />
      <span className="text-sm text-muted-foreground">{label}</span>
      <input
        type="file"
        accept={accept}
        className="hidden"
        onChange={(e) => e.target.files && onChange?.(e.target.files)}
      />
    </label>
  );
}
