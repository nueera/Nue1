// @ts-nocheck
'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from '@/components/ui/table';
import { ArrowLeft, Upload } from 'lucide-react';

interface ImportPreviewProps {
  onBack?: () => void;
  onImport?: () => void;
}

const PREVIEW_ROWS = [
  { email: 'john@example.com', firstName: 'John', lastName: 'Doe', phone: '+1234567890', company: 'Acme Inc', status: 'valid' },
  { email: 'jane@example.com', firstName: 'Jane', lastName: 'Smith', phone: '+0987654321', company: 'Corp Ltd', status: 'valid' },
  { email: 'invalid-email', firstName: 'Bob', lastName: 'Jones', phone: '', company: '', status: 'error' },
  { email: 'alice@example.com', firstName: 'Alice', lastName: 'Brown', phone: '+111222333', company: 'Tech Co', status: 'valid' },
  { email: 'duplicated@example.com', firstName: 'Eve', lastName: 'Davis', phone: '', company: '', status: 'warning' },
];

export function ImportPreview({ onBack, onImport }: ImportPreviewProps) {
  const validCount = PREVIEW_ROWS.filter((r) => r.status === 'valid').length;
  const errorCount = PREVIEW_ROWS.filter((r) => r.status === 'error').length;
  const warningCount = PREVIEW_ROWS.filter((r) => r.status === 'warning').length;

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3 text-sm">
        <Badge variant="default" className="text-xs">{validCount} valid</Badge>
        {warningCount > 0 && <Badge variant="secondary" className="text-xs">{warningCount} warnings</Badge>}
        {errorCount > 0 && <Badge variant="destructive" className="text-xs">{errorCount} errors</Badge>}
      </div>

      <div className="rounded-lg border overflow-x-auto max-h-64 overflow-y-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-xs">Status</TableHead>
              <TableHead className="text-xs">Email</TableHead>
              <TableHead className="text-xs">First Name</TableHead>
              <TableHead className="text-xs">Last Name</TableHead>
              <TableHead className="text-xs">Company</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {PREVIEW_ROWS.map((row, idx) => (
              <TableRow key={idx} className={row.status === 'error' ? 'bg-red-50/50 dark:bg-red-950/20' : row.status === 'warning' ? 'bg-amber-50/50 dark:bg-amber-950/20' : ''}>
                <TableCell><Badge variant={row.status === 'valid' ? 'default' : row.status === 'error' ? 'destructive' : 'secondary'} className="text-xs">{row.status}</Badge></TableCell>
                <TableCell className="text-xs">{row.email}</TableCell>
                <TableCell className="text-xs">{row.firstName}</TableCell>
                <TableCell className="text-xs">{row.lastName}</TableCell>
                <TableCell className="text-xs">{row.company || '—'}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center gap-2">
        <Button variant="outline" onClick={onBack}><ArrowLeft className="h-4 w-4 mr-2" />Back</Button>
        <Button onClick={onImport} disabled={validCount === 0}><Upload className="h-4 w-4 mr-2" />Import {validCount} records</Button>
      </div>
    </div>
  );
}
