'use client';

import { useState, useCallback, useRef } from 'react';
import { Upload, X, FileImage, FileText, AlertCircle, CheckCircle2 } from 'lucide-react';

interface ExpenseReceiptUploadProps {
  onUpload: (file: File) => void;
  onRemove?: () => void;
  existingUrl?: string;
  maxFileSizeMB?: number;
  acceptedTypes?: string[];
  isLoading?: boolean;
}

const DEFAULT_ACCEPTED = ['image/jpeg', 'image/png', 'image/webp', 'application/pdf'];

export function ExpenseReceiptUpload({
  onUpload,
  onRemove,
  existingUrl,
  maxFileSizeMB = 5,
  acceptedTypes = DEFAULT_ACCEPTED,
  isLoading,
}: ExpenseReceiptUploadProps) {
  const [dragOver, setDragOver] = useState(false);
  const [preview, setPreview] = useState<string | null>(existingUrl || null);
  const [fileName, setFileName] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const validateFile = useCallback((file: File): string | null => {
    if (!acceptedTypes.includes(file.type)) {
      return `Invalid file type. Accepted: ${acceptedTypes.map((t) => t.split('/')[1]).join(', ')}`;
    }
    if (file.size > maxFileSizeMB * 1024 * 1024) {
      return `File too large. Maximum size: ${maxFileSizeMB}MB`;
    }
    return null;
  }, [acceptedTypes, maxFileSizeMB]);

  const handleFile = useCallback((file: File) => {
    setError(null);
    setSuccess(false);

    const validationError = validateFile(file);
    if (validationError) {
      setError(validationError);
      return;
    }

    setFileName(file.name);

    if (file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => setPreview(e.target?.result as string);
      reader.readAsDataURL(file);
    } else {
      setPreview(null);
    }

    onUpload(file);
    setSuccess(true);
  }, [validateFile, onUpload]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  }, [handleFile]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  }, []);

  const handleDragLeave = useCallback(() => {
    setDragOver(false);
  }, []);

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  }, [handleFile]);

  const handleRemove = () => {
    setPreview(null);
    setFileName(null);
    setError(null);
    setSuccess(false);
    if (inputRef.current) inputRef.current.value = '';
    onRemove?.();
  };

  return (
    <div className="space-y-3">
      <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
        Receipt Upload
      </label>

      {/* Drop zone */}
      {!preview && !fileName && (
        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onClick={() => inputRef.current?.click()}
          className={`relative flex flex-col items-center justify-center gap-3 p-8 border-2 border-dashed rounded-2xl cursor-pointer transition-all duration-200 ${
            dragOver
              ? 'border-module-erp/50 bg-module-erp/5'
              : 'border-white/10 bg-white/[0.02] hover:border-white/20 hover:bg-white/5'
          }`}
        >
          <Upload className={`h-8 w-8 transition-colors ${dragOver ? 'text-module-erp' : 'text-muted-foreground/30'}`} />
          <div className="text-center">
            <p className="text-sm font-medium text-foreground">
              {dragOver ? 'Drop your file here' : 'Drag & drop or click to upload'}
            </p>
            <p className="text-[10px] text-muted-foreground/50 mt-1">
              JPEG, PNG, WebP, or PDF · Max {maxFileSizeMB}MB
            </p>
          </div>
          <input
            ref={inputRef}
            type="file"
            accept={acceptedTypes.join(',')}
            onChange={handleInputChange}
            className="hidden"
          />
        </div>
      )}

      {/* Preview */}
      {(preview || fileName) && (
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-4">
          <div className="flex items-start gap-3">
            {preview ? (
              <img
                src={preview}
                alt="Receipt preview"
                className="w-20 h-20 object-cover rounded-lg border border-white/10"
              />
            ) : (
              <div className="w-20 h-20 flex items-center justify-center rounded-lg bg-white/5 border border-white/10">
                <FileText className="h-8 w-8 text-muted-foreground/30" />
              </div>
            )}
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground truncate">
                {fileName || 'receipt'}
              </p>
              {success && (
                <div className="flex items-center gap-1 mt-1">
                  <CheckCircle2 className="h-3 w-3 text-emerald-400" />
                  <span className="text-[10px] text-emerald-400">Uploaded successfully</span>
                </div>
              )}
            </div>
            <button
              onClick={handleRemove}
              className="p-1.5 rounded-lg hover:bg-red-500/10 text-muted-foreground hover:text-red-400 transition-all duration-200"
              aria-label="Remove receipt"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="flex items-center gap-2 px-3 py-2 bg-red-500/5 border border-red-500/20 rounded-lg">
          <AlertCircle className="h-3.5 w-3.5 text-red-400 shrink-0" />
          <span className="text-xs text-red-400">{error}</span>
        </div>
      )}

      {/* Loading overlay */}
      {isLoading && (
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 border-2 border-module-erp/30 border-t-module-erp rounded-full animate-spin" />
          <span className="text-xs text-muted-foreground">Uploading...</span>
        </div>
      )}
    </div>
  );
}
