'use client';

import { useState, useRef } from 'react';
import { cn } from '@/lib/utils';
import { EmptyState } from '../../../../shared/components/empty-state/empty-state';
import { FileUp, File, CheckCircle2, Clock, AlertCircle, Upload, X } from 'lucide-react';

interface DocumentItem {
  id: string;
  name: string;
  type: string;
  required: boolean;
  status: 'pending' | 'uploaded' | 'verified' | 'rejected';
  uploadedAt?: string;
  fileUrl?: string;
}

interface DocumentCollectorProps {
  documents: DocumentItem[];
  isLoading?: boolean;
  onUpload?: (documentId: string, file: File) => void;
  onRemove?: (documentId: string) => void;
}

const STATUS_CONFIG: Record<DocumentItem['status'], { icon: typeof File; label: string; colorClass: string; bgClass: string }> = {
  pending: { icon: Clock, label: 'Pending', colorClass: 'text-amber-500', bgClass: 'bg-amber-500/10' },
  uploaded: { icon: CheckCircle2, label: 'Uploaded', colorClass: 'text-green-500', bgClass: 'bg-green-500/10' },
  verified: { icon: CheckCircle2, label: 'Verified', colorClass: 'text-emerald-500', bgClass: 'bg-emerald-500/10' },
  rejected: { icon: AlertCircle, label: 'Rejected', colorClass: 'text-red-500', bgClass: 'bg-red-500/10' },
};

export function DocumentCollector({ documents, isLoading, onUpload, onRemove }: DocumentCollectorProps) {
  const [dragActive, setDragActive] = useState(false);
  const [uploadingId, setUploadingId] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') setDragActive(true);
    else if (e.type === 'dragleave') setDragActive(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0] && uploadingId) {
      onUpload?.(uploadingId, e.dataTransfer.files[0]);
      setUploadingId(null);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0] && uploadingId) {
      onUpload?.(uploadingId, e.target.files[0]);
      setUploadingId(null);
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-3">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white/5 animate-pulse">
            <div className="w-8 h-8 rounded-lg bg-white/10" />
            <div className="flex-1 space-y-1">
              <div className="h-3 bg-white/10 rounded w-1/2" />
              <div className="h-2 bg-white/10 rounded w-1/4" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (documents.length === 0) {
    return (
      <EmptyState
        icon={FileUp}
        title="No documents required"
        description="Documents will be listed here based on the onboarding template."
      />
    );
  }

  const pendingCount = documents.filter((d) => d.status === 'pending').length;
  const completedCount = documents.filter((d) => d.status === 'verified').length;

  return (
    <div className="space-y-4">
      {/* Summary */}
      <div className="flex items-center gap-4 px-4 py-3 rounded-xl bg-white/5 border border-white/5">
        <div className="flex items-center gap-2">
          <FileUp className="h-4 w-4 text-module-erp" strokeWidth={1.8} />
          <span className="text-sm font-medium text-foreground">
            {completedCount}/{documents.length} verified
          </span>
        </div>
        {pendingCount > 0 && (
          <span className="text-xs text-amber-500">{pendingCount} pending</span>
        )}
      </div>

      {/* Drag & Drop Zone */}
      {dragActive && (
        <div
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          className="flex items-center justify-center h-32 border-2 border-dashed border-module-erp/50 rounded-2xl bg-module-erp/5 transition-all duration-200"
        >
          <div className="text-center">
            <Upload className="h-6 w-6 text-module-erp mx-auto mb-2" strokeWidth={1.8} />
            <p className="text-sm text-module-erp font-medium">Drop file here</p>
          </div>
        </div>
      )}

      {/* Hidden file input */}
      <input ref={fileInputRef} type="file" className="hidden" onChange={handleFileSelect} />

      {/* Document List */}
      <div className="space-y-2">
        {documents.map((doc) => {
          const config = STATUS_CONFIG[doc.status];
          const StatusIcon = config.icon;
          const isPending = doc.status === 'pending' || doc.status === 'rejected';

          return (
            <div
              key={doc.id}
              className={cn(
                'flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200',
                doc.status === 'verified' ? 'bg-green-500/5 border border-green-500/10' : 'bg-white/5 border border-white/5 hover:bg-white/10',
                doc.status === 'rejected' && 'bg-red-500/5 border border-red-500/10',
              )}
            >
              <div className={cn('flex items-center justify-center w-8 h-8 rounded-lg shrink-0', config.bgClass)}>
                {doc.status === 'uploaded' || doc.status === 'verified' ? (
                  <File className={cn('h-4 w-4', config.colorClass)} strokeWidth={1.8} />
                ) : (
                  <StatusIcon className={cn('h-4 w-4', config.colorClass)} strokeWidth={1.8} />
                )}
              </div>

              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground truncate">
                  {doc.name}
                  {doc.required && <span className="text-red-500 ml-0.5">*</span>}
                </p>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className={cn('text-xs font-medium', config.colorClass)}>{config.label}</span>
                  {doc.uploadedAt && (
                    <span className="text-xs text-muted-foreground">· {doc.uploadedAt}</span>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                {isPending && onUpload && (
                  <button
                    onClick={() => {
                      setUploadingId(doc.id);
                      fileInputRef.current?.click();
                    }}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-module-erp/10 text-module-erp text-xs font-medium hover:bg-module-erp/20 transition-colors"
                  >
                    <Upload className="h-3 w-3" strokeWidth={1.8} /> Upload
                  </button>
                )}
                {doc.status === 'uploaded' && onRemove && (
                  <button
                    onClick={() => onRemove(doc.id)}
                    className="p-1.5 rounded-lg hover:bg-red-500/10 transition-colors"
                    aria-label="Remove document"
                  >
                    <X className="h-3.5 w-3.5 text-red-400" strokeWidth={1.8} />
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export type { DocumentItem };
