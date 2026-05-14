// @ts-nocheck
'use client';

import { useState } from 'react';
import { Upload, FileText, CheckCircle, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useStartImport, useUploadImportFile, useGetImportTemplates } from '../hook';

type WizardStep = 'upload' | 'mapping' | 'preview' | 'importing' | 'complete';

interface ImportWizardProps {
  entityType: string;
  onComplete?: () => void;
  onCancel?: () => void;
}

export function ImportWizard({ entityType, onComplete, onCancel }: ImportWizardProps) {
  const [step, setStep] = useState<WizardStep>('upload');
  const [file, setFile] = useState<File | null>(null);
  const { data: templates } = useGetImportTemplates(entityType);
  const uploadMutation = useUploadImportFile();
  const startMutation = useStartImport();

  const steps = [
    { id: 'upload', label: 'Upload File' },
    { id: 'mapping', label: 'Map Columns' },
    { id: 'preview', label: 'Preview' },
    { id: 'importing', label: 'Importing' },
    { id: 'complete', label: 'Complete' },
  ];

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="h-5 w-5" />
          Import 
        </CardTitle>
        <CardDescription>Follow the steps to import your data</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-2 mb-6">
          {steps.map((s, i) => (
            <div key={s.id} className="flex items-center gap-2">
              <div className={`flex items-center justify-center h-8 w-8 rounded-full text-xs font-medium ${
                steps.findIndex(x => x.id === step) >= i
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-muted-foreground'
              }`}>{i + 1}</div>
              <span className="text-xs hidden sm:inline">{s.label}</span>
              {i < steps.length - 1 && <div className="w-6 h-px bg-border" />}
            </div>
          ))}
        </div>

        {step === 'upload' && (
          <div className="space-y-4">
            <div className="border-2 border-dashed rounded-lg p-8 text-center hover:border-primary/50 transition-colors cursor-pointer"
              onClick={() => document.getElementById('import-file-input')?.click()}>
              <Upload className="h-10 w-10 mx-auto mb-3 text-muted-foreground" />
              <p className="text-sm font-medium">Click to upload or drag & drop</p>
              <p className="text-xs text-muted-foreground mt-1">CSV, XLSX, or TSV files supported</p>
              <input id="import-file-input" type="file" className="hidden" accept=".csv,.xlsx,.tsv"
                onChange={(e) => { const f = e.target.files?.[0]; if (f) setFile(f); }} />
            </div>
            {file && (
              <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                <div className="flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  <span className="text-sm">{file.name}</span>
                </div>
                <Button size="sm" onClick={() => setStep('mapping')}>Next</Button>
              </div>
            )}
          </div>
        )}

        {step === 'mapping' && (
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">Map your file columns to the required fields.</p>
            <div className="space-y-2">
              {templates?.data?.columns?.map((col: { name: string; required: boolean }) => (
                <div key={col.name} className="flex items-center gap-3 p-2 border rounded">
                  <span className="text-sm font-medium w-40">{col.name}{col.required && ' *'}</span>
                  <span className="text-xs text-muted-foreground">←</span>
                  <span className="text-sm text-muted-foreground">Select column...</span>
                </div>
              ))}
            </div>
            <div className="flex gap-2 justify-end">
              <Button variant="outline" onClick={onCancel}>Cancel</Button>
              <Button onClick={() => setStep('preview')}>Next</Button>
            </div>
          </div>
        )}

        {step === 'preview' && (
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">Preview your data before importing.</p>
            <div className="border rounded-lg p-4 text-center text-sm text-muted-foreground">
              Preview will appear here
            </div>
            <div className="flex gap-2 justify-end">
              <Button variant="outline" onClick={() => setStep('mapping')}>Back</Button>
              <Button onClick={() => setStep('complete')}>Start Import</Button>
            </div>
          </div>
        )}

        {step === 'complete' && (
          <div className="text-center space-y-4 py-6">
            <CheckCircle className="h-12 w-12 mx-auto text-green-500" />
            <h3 className="text-lg font-semibold">Import Complete</h3>
            <p className="text-sm text-muted-foreground">Your data has been imported successfully.</p>
            <Button onClick={onComplete}>Done</Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
