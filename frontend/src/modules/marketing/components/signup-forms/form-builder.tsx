// @ts-nocheck
'use client';

import { useState, useCallback } from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { FormFieldPalette } from './form-field-palette';
import { FormFieldConfig } from './form-field-config';
import { FormPreview } from './form-preview';
import { FormThemes } from './form-themes';
import { FormEmbedCode } from './form-embed-code';
import type { FormField, FormTheme, SignupForm } from '@/modules/marketing/types';
import {
  ArrowLeft,
  Save,
  Eye,
  Code2,
  Palette,
  Settings,
} from 'lucide-react';
import { motion } from 'framer-motion';

interface FormBuilderProps {
  form?: SignupForm;
  onSave?: (form: Partial<SignupForm>) => void;
  onBack?: () => void;
}

export function FormBuilder({ form, onSave, onBack }: FormBuilderProps) {
  const [fields, setFields] = useState<FormField[]>(form?.fields ?? []);
  const [selectedFieldId, setSelectedFieldId] = useState<string | null>(null);
  const [theme, setTheme] = useState<FormTheme>(form?.theme ?? 'minimal');
  const [formName, setFormName] = useState(form?.name ?? 'Untitled Form');
  const [submitButtonText, setSubmitButtonText] = useState(form?.submitButtonText ?? 'Submit');
  const [successMessage, setSuccessMessage] = useState(form?.successMessage ?? 'Thank you!');
  const [activeTab, setActiveTab] = useState<string>('design');

  const selectedField = fields.find((f) => f.id === selectedFieldId) ?? null;

  const handleAddField = useCallback((type: FormField['type']) => {
    const newField: FormField = {
      id: `field-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      type,
      label: type.charAt(0).toUpperCase() + type.slice(1),
      name: type.toLowerCase().replace(/\s+/g, '_'),
      placeholder: `Enter ${type}...`,
      required: type === 'email',
      order: fields.length,
    };
    if (type === 'select' || type === 'radio' || type === 'checkbox') {
      newField.options = ['Option 1', 'Option 2', 'Option 3'];
    }
    setFields((prev) => [...prev, newField]);
    setSelectedFieldId(newField.id);
  }, [fields.length]);

  const handleUpdateField = useCallback((updatedField: FormField) => {
    setFields((prev) => prev.map((f) => (f.id === updatedField.id ? updatedField : f)));
  }, []);

  const handleRemoveField = useCallback((fieldId: string) => {
    setFields((prev) => prev.filter((f) => f.id !== fieldId));
    if (selectedFieldId === fieldId) setSelectedFieldId(null);
  }, [selectedFieldId]);

  const handleReorderField = useCallback((fieldId: string, direction: 'up' | 'down') => {
    setFields((prev) => {
      const idx = prev.findIndex((f) => f.id === fieldId);
      if (idx === -1) return prev;
      const newFields = [...prev];
      const swapIdx = direction === 'up' ? idx - 1 : idx + 1;
      if (swapIdx < 0 || swapIdx >= newFields.length) return prev;
      [newFields[idx], newFields[swapIdx]] = [newFields[swapIdx], newFields[idx]];
      return newFields.map((f, i) => ({ ...f, order: i }));
    });
  }, []);

  const handleSave = () => {
    onSave?.({
      name: formName,
      fields,
      theme,
      submitButtonText,
      successMessage,
    });
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b bg-card">
        <div className="flex items-center gap-3">
          {onBack && (
            <Button variant="ghost" size="icon" className="h-8 w-8" onClick={onBack}>
              <ArrowLeft className="h-4 w-4" />
            </Button>
          )}
          <input
            type="text"
            value={formName}
            onChange={(e) => setFormName(e.target.value)}
            className="text-lg font-semibold bg-transparent outline-none text-foreground"
          />
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={() => setActiveTab('preview')}>
            <Eye className="h-4 w-4 mr-1" />
            Preview
          </Button>
          <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700" onClick={handleSave}>
            <Save className="h-4 w-4 mr-1" />
            Save
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
          <div className="px-4 pt-2">
            <TabsList className="h-9">
              <TabsTrigger value="design" className="text-xs">
                <Settings className="h-3.5 w-3.5 mr-1" />
                Design
              </TabsTrigger>
              <TabsTrigger value="preview" className="text-xs">
                <Eye className="h-3.5 w-3.5 mr-1" />
                Preview
              </TabsTrigger>
              <TabsTrigger value="theme" className="text-xs">
                <Palette className="h-3.5 w-3.5 mr-1" />
                Theme
              </TabsTrigger>
              <TabsTrigger value="embed" className="text-xs">
                <Code2 className="h-3.5 w-3.5 mr-1" />
                Embed
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="design" className="flex-1 flex overflow-hidden m-0">
            <div className="flex flex-1 overflow-hidden">
              {/* Field Palette */}
              <div className="w-56 border-r bg-muted/20">
                <ScrollArea className="h-full">
                  <div className="p-3">
                    <FormFieldPalette onAddField={handleAddField} />
                  </div>
                </ScrollArea>
              </div>

              {/* Canvas */}
              <div className="flex-1 overflow-auto p-4">
                <div className="max-w-md mx-auto space-y-2">
                  {fields.length === 0 && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-center py-16 text-muted-foreground"
                    >
                      <p className="text-sm">Drag fields from the palette or click to add</p>
                    </motion.div>
                  )}
                  {fields.map((field) => (
                    <motion.div
                      key={field.id}
                      layout
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.15 }}
                      className={cn(
                        'group relative rounded-lg border-2 p-3 cursor-pointer transition-all',
                        selectedFieldId === field.id
                          ? 'border-emerald-500 bg-emerald-50/50 dark:bg-emerald-950/10'
                          : 'border-border hover:border-emerald-300'
                      )}
                      onClick={() => setSelectedFieldId(field.id)}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-medium text-muted-foreground uppercase">{field.type}</span>
                          <span className="text-sm font-medium text-foreground">{field.label}</span>
                          {field.required && (
                            <span className="text-red-500 text-xs">*</span>
                          )}
                        </div>
                        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-6 w-6"
                            onClick={(e) => { e.stopPropagation(); handleReorderField(field.id, 'up'); }}
                          >
                            ↑
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-6 w-6"
                            onClick={(e) => { e.stopPropagation(); handleReorderField(field.id, 'down'); }}
                          >
                            ↓
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-6 w-6 text-destructive"
                            onClick={(e) => { e.stopPropagation(); handleRemoveField(field.id); }}
                          >
                            ×
                          </Button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Field Config Panel */}
              <div className="w-72 border-l bg-muted/20">
                <ScrollArea className="h-full">
                  <div className="p-3">
                    {selectedField ? (
                      <FormFieldConfig
                        field={selectedField}
                        onUpdate={handleUpdateField}
                        onRemove={() => handleRemoveField(selectedField.id)}
                      />
                    ) : (
                      <div className="text-center py-12 text-muted-foreground">
                        <Settings className="h-8 w-8 mx-auto mb-2 opacity-30" />
                        <p className="text-xs">Select a field to configure</p>
                      </div>
                    )}
                  </div>
                </ScrollArea>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="preview" className="flex-1 m-0">
            <FormPreview fields={fields} theme={theme} submitButtonText={submitButtonText} successMessage={successMessage} />
          </TabsContent>

          <TabsContent value="theme" className="flex-1 m-0 p-4 overflow-auto">
            <FormThemes selectedTheme={theme} onSelectTheme={setTheme} />
          </TabsContent>

          <TabsContent value="embed" className="flex-1 m-0 p-4 overflow-auto">
            <FormEmbedCode formId={form?.id ?? 'new'} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
