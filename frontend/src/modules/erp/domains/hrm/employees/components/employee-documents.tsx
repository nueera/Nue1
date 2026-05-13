'use client';

import { useState } from 'react';
import { FileText, Upload, Download, Trash2, File } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { EmptyState } from '../../../../shared/components/empty-state/empty-state';
import { ConfirmDialog } from '../../../../shared/components/confirm-dialog/confirm-dialog';
import type { Document } from '../types';

interface EmployeeDocumentsProps {
  documents: Document[];
  onUpload?: (file: File) => void;
  onDownload?: (document: Document) => void;
  onDelete?: (document: Document) => void;
  isLoading?: boolean;
}

export function EmployeeDocuments({ documents, onUpload, onDownload, onDelete, isLoading }: EmployeeDocumentsProps) {
  const [deleteTarget, setDeleteTarget] = useState<Document | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && onUpload) {
      onUpload(file);
      e.target.value = '';
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="h-14 bg-white/5 rounded-lg animate-pulse" />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Upload Button */}
      {onUpload && (
        <div className="flex justify-end">
          <label className="cursor-pointer">
            <Button className="bg-module-erp hover:bg-module-erp/90 text-white" asChild>
              <span>
                <Upload className="h-4 w-4 mr-2" />
                Upload Document
              </span>
            </Button>
            <input type="file" className="hidden" onChange={handleFileChange} />
          </label>
        </div>
      )}

      {/* Documents List */}
      {documents.length === 0 ? (
        <EmptyState
          icon={FileText}
          title="No documents"
          description="Upload documents like ID proofs, contracts, or certificates."
          action={
            onUpload
              ? {
                  label: 'Upload Document',
                  onClick: () => document.querySelector<HTMLInputElement>('input[type="file"]')?.click(),
                }
              : undefined
          }
        />
      ) : (
        <div className="space-y-2">
          {documents.map((doc) => (
            <div
              key={doc.id}
              className="flex items-center justify-between gap-3 p-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-200"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-module-erp/15 text-module-erp shrink-0">
                  <File className="h-4 w-4" />
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">{doc.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {doc.type} · {new Date(doc.uploadedAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1 shrink-0">
                {onDownload && (
                  <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => onDownload(doc)}>
                    <Download className="h-4 w-4" />
                  </Button>
                )}
                {onDelete && (
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-red-500 hover:text-red-400" onClick={() => setDeleteTarget(doc)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Delete Confirmation */}
      <ConfirmDialog
        open={!!deleteTarget}
        onOpenChange={(open) => !open && setDeleteTarget(null)}
        title="Delete Document"
        description={`Are you sure you want to delete "${deleteTarget?.name}"? This action cannot be undone.`}
        confirmLabel="Delete"
        variant="destructive"
        onConfirm={() => {
          if (deleteTarget && onDelete) {
            onDelete(deleteTarget);
            setDeleteTarget(null);
          }
        }}
      />
    </div>
  );
}
