'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Download, FileSpreadsheet, FileText, X } from 'lucide-react';
import { motion } from 'framer-motion';

interface AnalyticsExportDialogProps {
  onClose?: () => void;
  onExport?: (config: ExportConfig) => void;
}

interface ExportConfig {
  format: 'csv' | 'xlsx' | 'pdf';
  dateRange: string;
  sections: string[];
  includeCharts: boolean;
}

export function AnalyticsExportDialog({ onClose, onExport }: AnalyticsExportDialogProps) {
  const [format, setFormat] = useState<'csv' | 'xlsx' | 'pdf'>('xlsx');
  const [dateRange, setDateRange] = useState('30d');
  const [sections, setSections] = useState<string[]>(['overview', 'campaigns', 'channels']);
  const [includeCharts, setIncludeCharts] = useState(true);

  const availableSections = [
    { id: 'overview', label: 'Overview Metrics' },
    { id: 'campaigns', label: 'Campaign Performance' },
    { id: 'channels', label: 'Channel Breakdown' },
    { id: 'attribution', label: 'Attribution Data' },
    { id: 'goals', label: 'Goal Tracking' },
    { id: 'roi', label: 'ROI Analysis' },
  ];

  const toggleSection = (id: string) => {
    setSections((prev) => prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]);
  };

  const handleExport = () => {
    onExport?.({ format, dateRange, sections, includeCharts });
  };

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <Card className="border-border/50 w-full max-w-md mx-4">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-semibold flex items-center gap-2">
              <Download className="h-5 w-5 text-emerald-600" />
              Export Analytics
            </CardTitle>
            {onClose && (
              <Button variant="ghost" size="icon" className="h-8 w-8" onClick={onClose}>
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Format</Label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { value: 'csv' as const, icon: FileText, label: 'CSV' },
                { value: 'xlsx' as const, icon: FileSpreadsheet, label: 'Excel' },
                { value: 'pdf' as const, icon: FileText, label: 'PDF' },
              ].map((f) => (
                <Button key={f.value} variant={format === f.value ? 'default' : 'outline'} size="sm" onClick={() => setFormat(f.value)} className="gap-1.5">
                  <f.icon className="h-4 w-4" />
                  {f.label}
                </Button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <Label>Date Range</Label>
            <Select value={dateRange} onValueChange={setDateRange}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="7d">Last 7 days</SelectItem>
                <SelectItem value="30d">Last 30 days</SelectItem>
                <SelectItem value="90d">Last 90 days</SelectItem>
                <SelectItem value="12m">Last 12 months</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Sections</Label>
            <div className="space-y-2">
              {availableSections.map((section) => (
                <div key={section.id} className="flex items-center gap-2">
                  <Checkbox
                    id={`section-${section.id}`}
                    checked={sections.includes(section.id)}
                    onCheckedChange={() => toggleSection(section.id)}
                  />
                  <label htmlFor={`section-${section.id}`} className="text-sm cursor-pointer">{section.label}</label>
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Checkbox id="include-charts" checked={includeCharts} onCheckedChange={(v) => setIncludeCharts(!!v)} />
            <label htmlFor="include-charts" className="text-sm cursor-pointer">Include charts (PDF only)</label>
          </div>

          <div className="flex items-center gap-2 pt-2">
            <Button onClick={handleExport} className="flex-1">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
            {onClose && <Button variant="outline" onClick={onClose}>Cancel</Button>}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
