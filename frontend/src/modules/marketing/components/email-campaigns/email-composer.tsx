'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Toggle } from '@/components/ui/toggle';
import { Textarea } from '@/components/ui/textarea';
import { MergeFieldPicker } from '../shared/merge-field-picker';
import { TemplateSelector } from '../shared/template-selector';
import {
  Bold,
  Italic,
  Underline,
  Link,
  Image,
  List,
  ListOrdered,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Code,
  Eye,
  CodeXml,
} from 'lucide-react';

interface EmailComposerProps {
  value?: string;
  onChange?: (html: string) => void;
  className?: string;
}

export function EmailComposer({ value = '', onChange, className }: EmailComposerProps) {
  const [isSourceMode, setIsSourceMode] = useState(false);
  const [sourceContent, setSourceContent] = useState(value);

  const handleMergeField = (field: { key: string }) => {
    const mergeTag = `{{${field.key}}}`;
    if (isSourceMode) {
      const newContent = sourceContent + mergeTag;
      setSourceContent(newContent);
      onChange?.(newContent);
    } else {
      // Insert into visual editor
      document.execCommand('insertText', false, mergeTag);
    }
  };

  const handleTemplateSelect = (template: { id: string; contentHtml?: string }) => {
    const html = template.contentHtml ?? '';
    setSourceContent(html);
    onChange?.(html);
  };

  const handleSourceChange = (text: string) => {
    setSourceContent(text);
    onChange?.(text);
  };

  const toolbarButtons = [
    { icon: Bold, label: 'Bold', command: 'bold' },
    { icon: Italic, label: 'Italic', command: 'italic' },
    { icon: Underline, label: 'Underline', command: 'underline' },
    { icon: Separator, label: 'sep1', command: '' },
    { icon: Link, label: 'Link', command: 'createLink' },
    { icon: Image, label: 'Image', command: 'insertImage' },
    { icon: List, label: 'Bullet List', command: 'insertUnorderedList' },
    { icon: ListOrdered, label: 'Numbered List', command: 'insertOrderedList' },
    { icon: AlignLeft, label: 'Align Left', command: 'justifyLeft' },
    { icon: AlignCenter, label: 'Align Center', command: 'justifyCenter' },
    { icon: AlignRight, label: 'Align Right', command: 'justifyRight' },
  ];

  return (
    <Card className={cn('border-border/50', className)}>
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-0.5 p-2 border-b bg-muted/20">
        {toolbarButtons.map((btn, i) => {
          if (btn.label.startsWith('sep')) {
            return <Separator key={i} orientation="vertical" className="h-6 mx-1" />;
          }
          const Icon = btn.icon;
          return (
            <Toggle
              key={i}
              size="sm"
              aria-label={btn.label}
              onClick={() => {
                if (btn.command === 'createLink') {
                  const url = prompt('Enter URL:');
                  if (url) document.execCommand(btn.command, false, url);
                } else if (btn.command === 'insertImage') {
                  const url = prompt('Enter image URL:');
                  if (url) document.execCommand(btn.command, false, url);
                } else if (btn.command) {
                  document.execCommand(btn.command, false);
                }
              }}
              className="h-8 w-8 p-0"
            >
              <Icon className="h-4 w-4" />
            </Toggle>
          );
        })}

        <Separator orientation="vertical" className="h-6 mx-1" />

        <MergeFieldPicker onSelect={handleMergeField} className="h-8 text-xs" />

        <TemplateSelector
          onChange={(value, template) => handleTemplateSelect(template as { id: string; contentHtml?: string })}
          className="h-8 text-xs"
        />

        <div className="ml-auto">
          <Button
            variant="ghost"
            size="sm"
            className="h-8 gap-1 text-xs"
            onClick={() => setIsSourceMode(!isSourceMode)}
          >
            {isSourceMode ? <Eye className="h-3.5 w-3.5" /> : <CodeXml className="h-3.5 w-3.5" />}
            {isSourceMode ? 'Visual' : 'HTML'}
          </Button>
        </div>
      </div>

      {/* Editor */}
      <CardContent className="p-0">
        {isSourceMode ? (
          <Textarea
            value={sourceContent}
            onChange={(e) => handleSourceChange(e.target.value)}
            className="min-h-[400px] rounded-none border-0 font-mono text-xs resize-none focus-visible:ring-0"
            placeholder="Write HTML source code here..."
          />
        ) : (
          <div
            contentEditable
            className="min-h-[400px] p-4 outline-none prose prose-sm max-w-none focus:outline-none text-sm"
            dangerouslySetInnerHTML={{ __html: value }}
            onInput={(e) => {
              onChange?.((e.target as HTMLElement).innerHTML);
            }}
          />
        )}
      </CardContent>
    </Card>
  );
}
