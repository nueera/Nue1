// @ts-nocheck
'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Upload, X, FileText, FileImage, FileSpreadsheet, File as FileIcon } from 'lucide-react';

export interface Attachment {
  id: string;
  name: string;
  size: number;
  type: string;
  url?: string;
  uploadedAt?: string;
}

export interface FileAttachmentProps {
  attachments: Attachment[];
  onUpload: (files: FileList) => void;
  onRemove: (id: string) => void;
  maxFiles?: number;
  className?: string;
}

function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
}

function getFileIcon(type: string) {
  if (type.startsWith('image/')) return FileImage;
  if (type.includes('spreadsheet') || type.includes('csv') || type.includes('excel'))
    return FileSpreadsheet;
  if (type.includes('pdf') || type.includes('text') || type.includes('document'))
    return FileText;
  return FileIcon;
}

export function FileAttachment({
  attachments,
  onUpload,
  onRemove,
  maxFiles = 10,
  className,
}: FileAttachmentProps) {
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const canUpload = attachments.length < maxFiles;

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      onUpload(e.target.files);
      // Reset input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  return (
    <div className={cn('space-y-3', className)}>
      <div className="flex items-center justify-between">
        <h4 className="text-sm font-medium text-foreground">
          Attachments
          {attachments.length > 0 && (
            <span className="ml-1.5 text-muted-foreground font-normal">
              ({attachments.length}/{maxFiles})
            </span>
          )}
        </h4>
        {canUpload && (
          <Button variant="outline" size="sm" onClick={handleUploadClick} className="gap-1.5">
            <Upload className="size-3.5" />
            Upload
          </Button>
        )}
      </div>

      <input
        ref={fileInputRef}
        type="file"
        multiple
        className="hidden"
        onChange={handleFileChange}
        accept="*/*"
      />

      {attachments.length === 0 ? (
        <div className="rounded-md border border-dashed py-8 text-center text-sm text-muted-foreground">
          No attachments yet
        </div>
      ) : (
        <div className="space-y-2 max-h-64 overflow-y-auto pr-1 scrollbar-thin">
          {attachments.map((attachment) => {
            const IconComponent = getFileIcon(attachment.type);

            return (
              <div
                key={attachment.id}
                className="flex items-center gap-3 rounded-md border px-3 py-2 group"
              >
                <IconComponent className="size-4 shrink-0 text-muted-foreground" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{attachment.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {formatFileSize(attachment.size)}
                    {attachment.uploadedAt && ` · ${attachment.uploadedAt}`}
                  </p>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7 shrink-0 text-muted-foreground opacity-0 group-hover:opacity-100 hover:text-destructive transition-opacity"
                  onClick={() => onRemove(attachment.id)}
                  aria-label={`Remove ${attachment.name}`}
                >
                  <X className="size-3.5" />
                </Button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
