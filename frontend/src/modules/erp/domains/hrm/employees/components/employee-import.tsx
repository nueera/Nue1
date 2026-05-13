'use client';

import { useState, useCallback } from 'react';
import { Upload, FileText, X, FileSpreadsheet, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { Employee } from '../types';

interface EmployeeImportProps {
  onImport: (employees: Partial<Employee>[]) => void;
  onClose?: () => void;
}

interface ParsedRow {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  department: string;
  position: string;
  employmentType: string;
  joinDate: string;
  salary: string;
}

export function EmployeeImport({ onImport, onClose }: EmployeeImportProps) {
  const [file, setFile] = useState<File | null>(null);
  const [parsedData, setParsedData] = useState<ParsedRow[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const parseCSV = useCallback((text: string): ParsedRow[] => {
    const lines = text.trim().split('\n');
    if (lines.length < 2) {
      setError('CSV file must contain at least a header row and one data row.');
      return [];
    }

    const headers = lines[0].split(',').map((h) => h.trim().toLowerCase());
    const requiredHeaders = ['firstname', 'lastname', 'email'];
    const missingHeaders = requiredHeaders.filter((h) => !headers.includes(h));
    if (missingHeaders.length > 0) {
      setError(`Missing required columns: ${missingHeaders.join(', ')}`);
      return [];
    }

    const rows: ParsedRow[] = [];
    for (let i = 1; i < lines.length; i++) {
      const values = lines[i].split(',').map((v) => v.trim());
      if (values.length < headers.length) continue;
      const row: Record<string, string> = {};
      headers.forEach((h, idx) => {
        row[h] = values[idx] || '';
      });
      rows.push({
        firstName: row.firstname || '',
        lastName: row.lastname || '',
        email: row.email || '',
        phone: row.phone || '',
        department: row.department || '',
        position: row.position || '',
        employmentType: row.employmenttype || 'full-time',
        joinDate: row.joindate || '',
        salary: row.salary || '0',
      });
    }
    return rows;
  }, []);

  const handleFile = useCallback(
    async (selectedFile: File) => {
      if (!selectedFile.name.endsWith('.csv')) {
        setError('Please upload a CSV file.');
        return;
      }
      setFile(selectedFile);
      setError(null);
      setIsProcessing(true);

      try {
        const text = await selectedFile.text();
        const data = parseCSV(text);
        setParsedData(data);
      } catch {
        setError('Failed to parse the file. Please check the format.');
      } finally {
        setIsProcessing(false);
      }
    },
    [parseCSV]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      const droppedFile = e.dataTransfer.files[0];
      if (droppedFile) handleFile(droppedFile);
    },
    [handleFile]
  );

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => setIsDragging(false);

  const handleImport = () => {
    if (parsedData.length === 0) return;
    onImport(parsedData as unknown as Partial<Employee>[]);
  };

  return (
    <div className="space-y-6">
      {/* Upload Area */}
      {!file ? (
        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          className={`flex flex-col items-center justify-center py-12 border-2 border-dashed rounded-2xl transition-all duration-200 ${
            isDragging
              ? 'border-module-erp bg-module-erp/5'
              : 'border-white/20 bg-white/5 hover:border-white/30 hover:bg-white/10'
          }`}
        >
          <Upload className="h-10 w-10 text-muted-foreground/40 mb-4" />
          <p className="text-sm font-medium text-foreground">Drop your CSV file here</p>
          <p className="text-xs text-muted-foreground mt-1">or click to browse</p>
          <input
            type="file"
            accept=".csv"
            onChange={(e) => {
              const f = e.target.files?.[0];
              if (f) handleFile(f);
            }}
            className="absolute inset-0 opacity-0 cursor-pointer"
            style={{ position: 'relative', marginTop: '12px' }}
          />
          <p className="text-xs text-muted-foreground/60 mt-4">
            Required columns: firstName, lastName, email
          </p>
        </div>
      ) : (
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-module-erp/15 text-module-erp">
                <FileSpreadsheet className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">{file.name}</p>
                <p className="text-xs text-muted-foreground">
                  {(file.size / 1024).toFixed(1)} KB · {parsedData.length} records
                </p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={() => {
                setFile(null);
                setParsedData([]);
                setError(null);
              }}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="flex items-center gap-2 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-500 text-sm">
          <AlertCircle className="h-4 w-4 shrink-0" />
          {error}
        </div>
      )}

      {/* Preview Table */}
      {parsedData.length > 0 && (
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden">
          <div className="px-4 py-3 border-b border-white/10">
            <h3 className="text-sm font-semibold text-foreground">Preview ({parsedData.length} records)</h3>
          </div>
          <div className="overflow-x-auto max-h-64 overflow-y-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="px-4 py-2 text-left text-xs font-medium text-muted-foreground uppercase">Name</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-muted-foreground uppercase">Email</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-muted-foreground uppercase">Department</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-muted-foreground uppercase">Position</th>
                </tr>
              </thead>
              <tbody>
                {parsedData.slice(0, 20).map((row, idx) => (
                  <tr key={idx} className="border-b border-white/5 hover:bg-white/5">
                    <td className="px-4 py-2 text-foreground">{row.firstName} {row.lastName}</td>
                    <td className="px-4 py-2 text-muted-foreground">{row.email}</td>
                    <td className="px-4 py-2 text-muted-foreground">{row.department || '-'}</td>
                    <td className="px-4 py-2 text-muted-foreground">{row.position || '-'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            {parsedData.length > 20 && (
              <p className="px-4 py-2 text-xs text-muted-foreground text-center">
                Showing 20 of {parsedData.length} records
              </p>
            )}
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="flex items-center justify-end gap-3">
        {onClose && (
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
        )}
        <Button
          onClick={handleImport}
          disabled={parsedData.length === 0 || isProcessing}
          className="bg-module-erp hover:bg-module-erp/90 text-white"
        >
          {isProcessing ? 'Processing...' : `Import ${parsedData.length} Employees`}
        </Button>
      </div>
    </div>
  );
}
