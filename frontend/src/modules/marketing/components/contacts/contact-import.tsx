// @ts-nocheck
'use client';

import { useState, useCallback } from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useImportContacts } from '@/modules/marketing/hooks/use-contacts';
import type { CreateContactInput } from '@/modules/marketing/schemas/contact.schema';
import {
  Upload,
  ArrowRight,
  ArrowLeft,
  FileSpreadsheet,
  CheckCircle2,
  AlertCircle,
  Loader2,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface ContactImportProps {
  onComplete?: (count: number) => void;
  onCancel?: () => void;
  className?: string;
}

const CSV_FIELDS = [
  { key: 'firstName', label: 'First Name', required: true },
  { key: 'lastName', label: 'Last Name', required: true },
  { key: 'email', label: 'Email', required: true },
  { key: 'phone', label: 'Phone', required: false },
  { key: 'company', label: 'Company', required: false },
  { key: 'title', label: 'Title', required: false },
];

type ImportStep = 'upload' | 'map' | 'preview' | 'import';

export function ContactImport({ onComplete, onCancel, className }: ContactImportProps) {
  const importContacts = useImportContacts();
  const [step, setStep] = useState<ImportStep>('upload');
  const [csvData, setCsvData] = useState<string[][]>([]);
  const [csvHeaders, setCsvHeaders] = useState<string[]>([]);
  const [fieldMap, setFieldMap] = useState<Record<string, string>>({});
  const [isImporting, setIsImporting] = useState(false);
  const [importResult, setImportResult] = useState<{ success: number; failed: number } | null>(null);

  const steps: { key: ImportStep; label: string }[] = [
    { key: 'upload', label: 'Upload' },
    { key: 'map', label: 'Map Fields' },
    { key: 'preview', label: 'Preview' },
    { key: 'import', label: 'Import' },
  ];

  const currentStepIndex = steps.findIndex((s) => s.key === step);

  const handleFileUpload = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (evt) => {
      const text = evt.target?.result as string;
      const rows = text
        .split('\n')
        .map((row) => row.split(',').map((cell) => cell.trim().replace(/^"|"$/g, '')))
        .filter((row) => row.some((cell) => cell.length > 0));

      if (rows.length > 0) {
        setCsvHeaders(rows[0]);
        setCsvData(rows.slice(1));
        const autoMap: Record<string, string> = {};
        rows[0].forEach((header, index) => {
          const match = CSV_FIELDS.find(
            (f) =>
              f.key.toLowerCase() === header.toLowerCase() ||
              f.label.toLowerCase() === header.toLowerCase()
          );
          if (match) {
            autoMap[match.key] = String(index);
          }
        });
        setFieldMap(autoMap);
      }
    };
    reader.readAsText(file);
  }, []);

  const mappedContacts = csvData
    .map((row) => {
      const contact: Record<string, string> = {};
      Object.entries(fieldMap).forEach(([fieldKey, colIndex]) => {
        contact[fieldKey] = row[Number(colIndex)] ?? '';
      });
      return contact;
    })
    .filter((contact) => contact.email || contact.firstName);

  const handleImport = async () => {
    setIsImporting(true);
    try {
      const contacts: CreateContactInput[] = mappedContacts.map((contact) => ({
        firstName: contact.firstName || 'Unknown',
        lastName: contact.lastName || 'Unknown',
        email: contact.email || 'unknown@example.com',
        phone: contact.phone,
        company: contact.company,
        title: contact.title,
        preferences: ['email'],
        tags: [],
      }));
      await importContacts.mutateAsync(contacts);
      setImportResult({ success: contacts.length, failed: 0 });
      onComplete?.(contacts.length);
    } catch {
      setImportResult({ success: 0, failed: mappedContacts.length });
    } finally {
      setIsImporting(false);
    }
  };

  return (
    <Card className={cn('border-border/50', className)}>
      <CardHeader>
        <CardTitle className="text-base">Import Contacts</CardTitle>
        <div className="flex items-center gap-2 mt-2">
          {steps.map((s, i) => (
            <div key={s.key} className="flex items-center gap-2">
              <div
                className={cn(
                  'flex items-center justify-center h-6 w-6 rounded-full text-xs font-medium',
                  i <= currentStepIndex
                    ? 'bg-emerald-600 text-white'
                    : 'bg-muted text-muted-foreground'
                )}
              >
                {i + 1}
              </div>
              <span
                className={cn(
                  'text-xs',
                  i <= currentStepIndex ? 'text-foreground font-medium' : 'text-muted-foreground'
                )}
              >
                {s.label}
              </span>
              {i < steps.length - 1 && <div className="w-8 h-px bg-border mx-1" />}
            </div>
          ))}
        </div>
      </CardHeader>
      <CardContent>
        <AnimatePresence mode="wait">
        <motion.div key={step} initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -12 }} transition={{ duration: 0.2 }}>
        {step === 'upload' && (
          <div className="space-y-4">
            <div className="border-2 border-dashed border-border rounded-xl p-8 text-center hover:border-emerald-400 transition-colors">
              <Upload className="h-10 w-10 mx-auto text-muted-foreground/40 mb-3" />
              <p className="text-sm font-medium text-foreground">Upload CSV File</p>
              <p className="text-xs text-muted-foreground mt-1">Drag and drop or click to select</p>
              <input
                type="file"
                accept=".csv"
                onChange={handleFileUpload}
                className="relative mt-3"
              />
            </div>
            {csvHeaders.length > 0 && (
              <div className="p-3 rounded-lg bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800">
                <p className="text-xs font-medium text-emerald-700 dark:text-emerald-300">
                  <FileSpreadsheet className="h-3.5 w-3.5 inline mr-1" />
                  {csvData.length} rows with {csvHeaders.length} columns detected
                </p>
              </div>
            )}
          </div>
        )}

        {step === 'map' && (
          <div className="space-y-3">
            <p className="text-xs text-muted-foreground">Map CSV columns to contact fields.</p>
            {CSV_FIELDS.map((field) => (
              <div key={field.key} className="flex items-center gap-3">
                <div className="w-40 shrink-0">
                  <span className="text-xs font-medium text-foreground">
                    {field.label}
                    {field.required && <span className="text-destructive ml-0.5">*</span>}
                  </span>
                </div>
                <ArrowRight className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
                <Select
                  value={fieldMap[field.key] ?? ''}
                  onValueChange={(value) =>
                    setFieldMap((prev) => ({ ...prev, [field.key]: value }))
                  }
                >
                  <SelectTrigger className="flex-1 h-8 text-xs">
                    <SelectValue placeholder="Select column..." />
                  </SelectTrigger>
                  <SelectContent>
                    {csvHeaders.map((header, index) => (
                      <SelectItem key={index} value={String(index)}>
                        {header}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            ))}
          </div>
        )}

        {step === 'preview' && (
          <div className="space-y-3">
            <p className="text-xs text-muted-foreground">
              {mappedContacts.length} contacts will be imported.
            </p>
            <div className="max-h-72 overflow-y-auto border rounded-lg">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-xs">First Name</TableHead>
                    <TableHead className="text-xs">Last Name</TableHead>
                    <TableHead className="text-xs">Email</TableHead>
                    <TableHead className="text-xs">Company</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mappedContacts.slice(0, 10).map((c, i) => (
                    <TableRow key={i}>
                      <TableCell className="text-xs">{c.firstName}</TableCell>
                      <TableCell className="text-xs">{c.lastName}</TableCell>
                      <TableCell className="text-xs">{c.email}</TableCell>
                      <TableCell className="text-xs">{c.company || '—'}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        )}

        {step === 'import' && (
          <div className="space-y-4 text-center py-4">
            {isImporting ? (
              <div className="flex flex-col items-center gap-3">
                <Loader2 className="h-8 w-8 animate-spin text-emerald-600" />
                <p className="text-sm text-muted-foreground">Importing contacts...</p>
              </div>
            ) : importResult ? (
              <div className="flex flex-col items-center gap-3">
                {importResult.success > 0 ? (
                  <>
                    <CheckCircle2 className="h-10 w-10 text-emerald-600" />
                    <p className="text-sm font-medium">Successfully imported {importResult.success} contacts!</p>
                  </>
                ) : (
                  <>
                    <AlertCircle className="h-10 w-10 text-destructive" />
                    <p className="text-sm font-medium">Import failed.</p>
                  </>
                )}
              </div>
            ) : null}
          </div>
        )}
        </motion.div>
        </AnimatePresence>

        {!importResult && (
          <div className="flex items-center justify-between mt-6 pt-4 border-t">
            <Button
              variant="ghost"
              onClick={() => {
                if (step === 'upload') onCancel?.();
                else {
                  const prevIndex = currentStepIndex - 1;
                  if (prevIndex >= 0) setStep(steps[prevIndex].key);
                }
              }}
            >
              <ArrowLeft className="h-4 w-4 mr-1" />
              {step === 'upload' ? 'Cancel' : 'Back'}
            </Button>
            <Button
              className="bg-emerald-600 hover:bg-emerald-700"
              onClick={() => {
                if (step === 'import') handleImport();
                else {
                  const nextIndex = currentStepIndex + 1;
                  if (nextIndex < steps.length) setStep(steps[nextIndex].key);
                }
              }}
              disabled={(step === 'upload' && csvData.length === 0) || isImporting}
            >
              {step === 'import' ? 'Start Import' : 'Next'}
              {step !== 'import' && <ArrowRight className="h-4 w-4 ml-1" />}
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
