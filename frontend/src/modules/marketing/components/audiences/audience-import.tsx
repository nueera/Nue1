'use client';

import { useState, useCallback, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import {
  Upload,
  FileText,
  Check,
  AlertCircle,
  ArrowRight,
  ArrowLeft,
  X,
} from 'lucide-react';

interface AudienceImportProps {
  onComplete?: (imported: number) => void;
  onCancel?: () => void;
}

type ImportStep = 'upload' | 'mapping' | 'preview' | 'importing' | 'done';

export function AudienceImport({ onComplete, onCancel }: AudienceImportProps) {
  const [step, setStep] = useState<ImportStep>('upload');
  const [file, setFile] = useState<File | null>(null);
  const [importProgress, setImportProgress] = useState(0);
  const [imported, setImported] = useState(0);
  const [errors, setErrors] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Cleanup interval on unmount
  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  const columnMapping = [
    { csv: 'First Name', field: 'firstName' },
    { csv: 'Last Name', field: 'lastName' },
    { csv: 'Email', field: 'email' },
    { csv: 'Phone', field: 'phone' },
    { csv: 'Company', field: 'company' },
  ];

  const handleFileDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile && (droppedFile.type === 'text/csv' || droppedFile.name.endsWith('.csv'))) {
      setFile(droppedFile);
    }
  }, []);

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) setFile(selectedFile);
  }, []);

  const handleImport = () => {
    setStep('importing');
    // Simulate import progress
    let progress = 0;
    intervalRef.current = setInterval(() => {
      progress += Math.random() * 15;
      if (progress >= 100) {
        progress = 100;
        if (intervalRef.current) clearInterval(intervalRef.current);
        intervalRef.current = null;
        setImported(247);
        setErrors(3);
        setStep('done');
        onComplete?.(247);
      }
      setImportProgress(Math.min(Math.round(progress), 100));
    }, 200);
  };

  const steps: Array<{ key: ImportStep; label: string }> = [
    { key: 'upload', label: 'Upload' },
    { key: 'mapping', label: 'Mapping' },
    { key: 'preview', label: 'Preview' },
    { key: 'importing', label: 'Import' },
  ];

  const currentStepIndex = steps.findIndex((s) => s.key === step);

  return (
    <div className="max-w-lg mx-auto space-y-4">
      {/* Step Indicator */}
      <div className="flex items-center gap-2 justify-center">
        {steps.map((s, i) => (
          <div key={s.key} className="flex items-center gap-2">
            <div className={cn(
              'flex items-center justify-center w-7 h-7 rounded-full text-xs font-medium',
              i <= currentStepIndex ? 'bg-emerald-500 text-white' : 'bg-muted text-muted-foreground'
            )}>
              {i < currentStepIndex ? <Check className="h-3.5 w-3.5" /> : i + 1}
            </div>
            <span className={cn('text-xs', i <= currentStepIndex ? 'text-foreground font-medium' : 'text-muted-foreground')}>
              {s.label}
            </span>
            {i < steps.length - 1 && <div className="w-8 h-px bg-border" />}
          </div>
        ))}
      </div>

      {/* Upload Step */}
      {step === 'upload' && (
        <div className="animate-in fade-in slide-in-from-right-2 duration-200">
          <Card className="border-border/50">
            <CardHeader>
              <CardTitle className="text-sm">Upload CSV File</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div
                onDragOver={(e) => e.preventDefault()}
                onDrop={handleFileDrop}
                className={cn(
                  'border-2 border-dashed rounded-xl p-8 text-center transition-colors',
                  file ? 'border-emerald-500 bg-emerald-50/50 dark:bg-emerald-950/10' : 'border-border hover:border-emerald-400'
                )}
              >
                <Upload className="h-8 w-8 mx-auto text-muted-foreground mb-3" />
                {file ? (
                  <div>
                    <div className="flex items-center justify-center gap-2">
                      <FileText className="h-4 w-4 text-emerald-500" />
                      <span className="text-sm font-medium">{file.name}</span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">{(file.size / 1024).toFixed(1)} KB</p>
                  </div>
                ) : (
                  <div>
                    <p className="text-sm text-muted-foreground">Drag & drop your CSV file here</p>
                    <p className="text-xs text-muted-foreground mt-1">or click to browse</p>
                  </div>
                )}
                <input
                  type="file"
                  accept=".csv"
                  className="absolute inset-0 opacity-0 cursor-pointer"
                  onChange={handleFileSelect}
                  style={{ position: 'absolute' }}
                />
              </div>
              <div className="flex items-center justify-end gap-2">
                {onCancel && <Button variant="outline" size="sm" onClick={onCancel}>Cancel</Button>}
                <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700" disabled={!file} onClick={() => setStep('mapping')}>
                  Next <ArrowRight className="h-3.5 w-3.5 ml-1" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Mapping Step */}
      {step === 'mapping' && (
        <div className="animate-in fade-in slide-in-from-right-2 duration-200">
          <Card className="border-border/50">
            <CardHeader>
              <CardTitle className="text-sm">Column Mapping</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-xs text-muted-foreground">Map your CSV columns to contact fields</p>
              {columnMapping.map((map) => (
                <div key={map.field} className="flex items-center gap-3 p-2 rounded-lg border border-border/50">
                  <Badge variant="outline" className="text-[10px]">{map.csv}</Badge>
                  <ArrowRight className="h-3.5 w-3.5 text-muted-foreground" />
                  <Badge variant="secondary" className="text-[10px]">{map.field}</Badge>
                </div>
              ))}
              <div className="flex items-center justify-between pt-2">
                <Button variant="outline" size="sm" onClick={() => setStep('upload')}>
                  <ArrowLeft className="h-3.5 w-3.5 mr-1" />Back
                </Button>
                <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700" onClick={() => setStep('preview')}>
                  Next <ArrowRight className="h-3.5 w-3.5 ml-1" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Preview Step */}
      {step === 'preview' && (
        <div className="animate-in fade-in slide-in-from-right-2 duration-200">
          <Card className="border-border/50">
            <CardHeader>
              <CardTitle className="text-sm">Preview Import</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 rounded-lg bg-muted/50 text-center">
                  <p className="text-lg font-bold text-foreground">250</p>
                  <p className="text-xs text-muted-foreground">Rows to import</p>
                </div>
                <div className="p-3 rounded-lg bg-muted/50 text-center">
                  <p className="text-lg font-bold text-foreground">5</p>
                  <p className="text-xs text-muted-foreground">Columns mapped</p>
                </div>
              </div>
              <div className="text-xs text-muted-foreground p-3 rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 flex items-start gap-2">
                <AlertCircle className="h-4 w-4 text-amber-500 shrink-0 mt-0.5" />
                <span>3 rows have missing email addresses and will be skipped</span>
              </div>
              <div className="flex items-center justify-between pt-2">
                <Button variant="outline" size="sm" onClick={() => setStep('mapping')}>
                  <ArrowLeft className="h-3.5 w-3.5 mr-1" />Back
                </Button>
                <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700" onClick={handleImport}>
                  Start Import
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Importing Step */}
      {step === 'importing' && (
        <div className="animate-in fade-in slide-in-from-right-2 duration-200">
          <Card className="border-border/50">
            <CardContent className="p-6 text-center space-y-4">
              <div className="animate-spin mx-auto h-10 w-10 border-2 border-emerald-500 border-t-transparent rounded-full" />
              <p className="text-sm font-medium">Importing contacts...</p>
              <Progress value={importProgress} className="h-2" />
              <p className="text-xs text-muted-foreground">{importProgress}% complete</p>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Done Step */}
      {step === 'done' && (
        <div className="animate-in fade-in zoom-in-95 duration-200">
          <Card className="border-border/50">
            <CardContent className="p-6 text-center space-y-4">
              <div className="h-12 w-12 rounded-full bg-emerald-100 dark:bg-emerald-950/30 flex items-center justify-center mx-auto">
                <Check className="h-6 w-6 text-emerald-600" />
              </div>
              <div>
                <p className="text-lg font-semibold text-foreground">Import Complete!</p>
                <p className="text-sm text-muted-foreground mt-1">
                  {imported} contacts imported successfully
                </p>
                {errors > 0 && (
                  <p className="text-xs text-amber-600 mt-1">{errors} rows skipped due to errors</p>
                )}
              </div>
              <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700" onClick={onCancel}>
                Done
              </Button>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
