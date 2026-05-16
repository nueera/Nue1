'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { StickyNote, Save, X } from 'lucide-react';
import { motion } from 'framer-motion';

interface NoteFormProps {
  initialContent?: string;
  onSave?: (content: string) => void;
  onCancel?: () => void;
}

export function NoteForm({ initialContent, onSave, onCancel }: NoteFormProps) {
  const [content, setContent] = useState(initialContent ?? '');

  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
      <Card className="border-border/50">
        <CardHeader className="pb-2">
          <CardTitle className="text-base font-semibold flex items-center gap-2">
            <StickyNote className="h-4 w-4 text-emerald-600" />
            {initialContent ? 'Edit Note' : 'Add Note'}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <Textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Write a note..."
            rows={4}
            className="text-sm"
          />
          <div className="flex items-center gap-2">
            <Button size="sm" onClick={() => onSave?.(content)} disabled={!content.trim()}>
              <Save className="h-4 w-4 mr-2" />Save
            </Button>
            {onCancel && (
              <Button variant="outline" size="sm" onClick={onCancel}>
                <X className="h-4 w-4 mr-2" />Cancel
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
