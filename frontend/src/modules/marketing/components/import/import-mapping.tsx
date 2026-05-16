'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from '@/components/ui/select';
import { ArrowRight, ArrowLeft } from 'lucide-react';

interface ImportMappingProps {
  onBack?: () => void;
  onNext?: () => void;
}

const SOURCE_FIELDS = ['Email', 'First Name', 'Last Name', 'Phone', 'Company', 'Job Title', 'City', 'Country'];
const TARGET_FIELDS = ['email', 'firstName', 'lastName', 'phone', 'company', 'jobTitle', 'city', 'country'];

export function ImportMapping({ onBack, onNext }: ImportMappingProps) {
  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground">Map your file columns to the corresponding fields.</p>
      <div className="space-y-2">
        {SOURCE_FIELDS.map((source, idx) => (
          <div key={source} className="flex items-center gap-2">
            <div className="flex-1 p-2 bg-muted/30 rounded text-sm">{source}</div>
            <ArrowRight className="h-4 w-4 text-muted-foreground shrink-0" />
            <Select defaultValue={TARGET_FIELDS[idx]}>
              <SelectTrigger className="flex-1 h-9 text-sm"><SelectValue /></SelectTrigger>
              <SelectContent>
                {TARGET_FIELDS.map((t) => <SelectItem key={t} value={t}>{t}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
        ))}
      </div>
      <div className="flex items-center gap-2">
        <Button variant="outline" onClick={onBack}><ArrowLeft className="h-4 w-4 mr-2" />Back</Button>
        <Button onClick={onNext}>Next</Button>
      </div>
    </div>
  );
}
