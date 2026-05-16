'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Upload, FileSpreadsheet, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { ImportMapping } from './import-mapping';
import { ImportPreview } from './import-preview';
import { ImportResult } from './import-result';

type Step = 'upload' | 'mapping' | 'preview' | 'result';

interface ImportWizardProps {
  entityType: string;
  onComplete?: () => void;
  onCancel?: () => void;
}

export function ImportWizard({ entityType, onComplete, onCancel }: ImportWizardProps) {
  const [step, setStep] = useState<Step>('upload');
  const [file, setFile] = useState<File | null>(null);

  const steps: Array<{ key: Step; label: string }> = [
    { key: 'upload', label: 'Upload' },
    { key: 'mapping', label: 'Map Fields' },
    { key: 'preview', label: 'Preview' },
    { key: 'result', label: 'Result' },
  ];

  const currentIdx = steps.findIndex((s) => s.key === step);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) setFile(e.target.files[0]);
  };

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
      <Card className="border-border/50">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-semibold">Import {entityType}</CardTitle>
          <div className="flex items-center gap-2 mt-2">
            {steps.map((s, idx) => (
              <div key={s.key} className="flex items-center gap-2">
                <div className={`flex items-center justify-center h-6 w-6 rounded-full text-xs font-medium ${idx <= currentIdx ? 'bg-emerald-600 text-white' : 'bg-muted text-muted-foreground'}`}>
                  {idx + 1}
                </div>
                <span className={`text-xs ${idx <= currentIdx ? 'text-foreground font-medium' : 'text-muted-foreground'}`}>{s.label}</span>
                {idx < steps.length - 1 && <ArrowRight className="h-3 w-3 text-muted-foreground" />}
              </div>
            ))}
          </div>
        </CardHeader>
        <CardContent>
          {step === 'upload' && (
            <div className="space-y-4">
              <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-emerald-400 transition-colors">
                <Upload className="h-10 w-10 text-muted-foreground mx-auto mb-3" />
                <p className="text-sm text-muted-foreground mb-2">Drag & drop or click to upload</p>
                <p className="text-xs text-muted-foreground">Supports CSV, XLSX</p>
                <input type="file" accept=".csv,.xlsx,.xls" onChange={handleFileChange} className="hidden" id="import-file" />
                <Button variant="outline" size="sm" className="mt-3" onClick={() => document.getElementById('import-file')?.click()}>
                  <FileSpreadsheet className="h-4 w-4 mr-2" />Choose File
                </Button>
              </div>
              {file && (
                <div className="flex items-center gap-2 p-2 bg-muted/30 rounded-lg">
                  <FileSpreadsheet className="h-4 w-4 text-emerald-600" />
                  <span className="text-sm">{file.name}</span>
                  <Button variant="outline" size="sm" className="ml-auto" onClick={() => setStep('mapping')}>Next</Button>
                </div>
              )}
            </div>
          )}
          {step === 'mapping' && <ImportMapping onBack={() => setStep('upload')} onNext={() => setStep('preview')} />}
          {step === 'preview' && <ImportPreview onBack={() => setStep('mapping')} onImport={() => setStep('result')} />}
          {step === 'result' && <ImportResult onComplete={onComplete} />}
        </CardContent>
      </Card>
    </motion.div>
  );
}
