'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { TemplateVariables } from './template-variables';
import type { EmailTemplate } from '@/modules/marketing/types';
import { GripVertical, Plus, Trash2, MoveUp, MoveDown, Type, ImageIcon, Columns, Minus, Save } from 'lucide-react';
import { motion } from 'framer-motion';

interface Section {
  id: string;
  type: 'text' | 'image' | 'columns' | 'divider' | 'button' | 'header';
  content: string;
}

interface TemplateEditorProps {
  template?: EmailTemplate;
  onSave?: (data: { name: string; subject: string; sections: Section[] }) => void;
  className?: string;
}

export function TemplateEditor({ template, onSave, className }: TemplateEditorProps) {
  const [name, setName] = useState(template?.name ?? '');
  const [subject, setSubject] = useState(template?.subject ?? '');
  const [sections, setSections] = useState<Section[]>([
    { id: '1', type: 'header', content: 'Welcome!' },
    { id: '2', type: 'text', content: 'Hello {{first_name}}, thank you for joining us.' },
    { id: '3', type: 'button', content: 'Get Started' },
    { id: '4', type: 'divider', content: '' },
    { id: '5', type: 'text', content: 'Best regards, The Team' },
  ]);
  const [selectedSection, setSelectedSection] = useState<string | null>(null);

  const addSection = (type: Section['type']) => {
    const newSection: Section = {
      id: String(Date.now()),
      type,
      content: type === 'divider' ? '' : type === 'button' ? 'Click Here' : 'New content',
    };
    setSections([...sections, newSection]);
  };

  const removeSection = (id: string) => {
    setSections(sections.filter((s) => s.id !== id));
    if (selectedSection === id) setSelectedSection(null);
  };

  const moveSection = (id: string, direction: 'up' | 'down') => {
    const index = sections.findIndex((s) => s.id === id);
    if (direction === 'up' && index > 0) {
      const newSections = [...sections];
      [newSections[index - 1], newSections[index]] = [newSections[index], newSections[index - 1]];
      setSections(newSections);
    } else if (direction === 'down' && index < sections.length - 1) {
      const newSections = [...sections];
      [newSections[index], newSections[index + 1]] = [newSections[index + 1], newSections[index]];
      setSections(newSections);
    }
  };

  const updateSection = (id: string, content: string) => {
    setSections(sections.map((s) => (s.id === id ? { ...s, content } : s)));
  };

  const SECTION_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
    header: Type,
    text: Type,
    image: ImageIcon,
    columns: Columns,
    divider: Minus,
    button: Type,
  };

  const SECTION_COLORS: Record<string, string> = {
    header: 'border-emerald-200 bg-emerald-50 dark:bg-emerald-950/20',
    text: 'border-blue-200 bg-blue-50 dark:bg-blue-950/20',
    image: 'border-purple-200 bg-purple-50 dark:bg-purple-950/20',
    columns: 'border-amber-200 bg-amber-50 dark:bg-amber-950/20',
    divider: 'border-gray-200 bg-gray-50 dark:bg-gray-950/20',
    button: 'border-pink-200 bg-pink-50 dark:bg-pink-950/20',
  };

  return (
    <div className={cn('grid grid-cols-1 lg:grid-cols-3 gap-4', className)}>
      {/* Editor */}
      <div className="lg:col-span-2 space-y-4">
        <Card className="border-border/50">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm">Template Builder</CardTitle>
              <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700 text-xs" onClick={() => onSave?.({ name, subject, sections })}>
                <Save className="h-3 w-3 mr-1" />Save
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <Label className="text-xs text-muted-foreground">Template Name</Label>
                <Input value={name} onChange={(e) => setName(e.target.value)} className="h-9 mt-1" />
              </div>
              <div>
                <Label className="text-xs text-muted-foreground">Subject Line</Label>
                <Input value={subject} onChange={(e) => setSubject(e.target.value)} className="h-9 mt-1" />
              </div>
            </div>

            <Separator />

            {/* Sections */}
            <div className="space-y-2">
              {sections.map((section) => {
                const Icon = SECTION_ICONS[section.type] ?? Type;
                const colorClass = SECTION_COLORS[section.type] ?? '';
                const isSelected = selectedSection === section.id;

                return (
                  <motion.div
                    key={section.id}
                    layout
                    className={cn(
                      'flex items-start gap-2 p-3 rounded-lg border-2 transition-colors cursor-pointer',
                      colorClass,
                      isSelected && 'ring-2 ring-emerald-500'
                    )}
                    onClick={() => setSelectedSection(section.id)}
                  >
                    <GripVertical className="h-4 w-4 text-muted-foreground mt-1 shrink-0 cursor-grab" />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1 mb-1">
                        <Icon className="h-3.5 w-3.5 text-muted-foreground" />
                        <Badge variant="outline" className="text-[10px] px-1.5 py-0 capitalize">{section.type}</Badge>
                      </div>
                      {section.type === 'divider' ? (
                        <div className="border-t border-gray-300 my-2" />
                      ) : (
                        <Textarea
                          value={section.content}
                          onChange={(e) => updateSection(section.id, e.target.value)}
                          rows={2}
                          className="text-xs resize-none bg-white/50 dark:bg-black/10"
                          onClick={(e) => e.stopPropagation()}
                        />
                      )}
                    </div>
                    <div className="flex flex-col gap-0.5 shrink-0">
                      <Button variant="ghost" size="icon" className="h-6 w-6" onClick={(e) => { e.stopPropagation(); moveSection(section.id, 'up'); }}>
                        <MoveUp className="h-3 w-3" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-6 w-6" onClick={(e) => { e.stopPropagation(); moveSection(section.id, 'down'); }}>
                        <MoveDown className="h-3 w-3" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-6 w-6 text-destructive" onClick={(e) => { e.stopPropagation(); removeSection(section.id); }}>
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Add Section */}
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs text-muted-foreground">Add:</span>
              {(['header', 'text', 'image', 'button', 'divider', 'columns'] as const).map((type) => (
                <Button key={type} variant="outline" size="sm" className="text-xs h-7 capitalize" onClick={() => addSection(type)}>
                  <Plus className="h-3 w-3 mr-1" />{type}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Variables Panel */}
      <div>
        <TemplateVariables
          onSelect={(field) => {
            if (selectedSection) {
              updateSection(selectedSection, (sections.find((s) => s.id === selectedSection)?.content ?? '') + ` {{${field.key}}}`);
            }
          }}
        />
      </div>
    </div>
  );
}
