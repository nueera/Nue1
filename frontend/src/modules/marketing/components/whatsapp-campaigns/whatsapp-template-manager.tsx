'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Plus, Edit, Trash2, CheckCircle2, Clock, AlertCircle, FileText } from 'lucide-react';
import { motion } from 'framer-motion';

interface Template {
  id: string;
  name: string;
  language: string;
  category: string;
  status: 'approved' | 'pending' | 'rejected';
  bodyText: string;
}

const MOCK_TEMPLATES: Template[] = [
  { id: '1', name: 'welcome_message', language: 'en', category: 'MARKETING', status: 'approved', bodyText: 'Hello {{1}}! Welcome to our service.' },
  { id: '2', name: 'order_confirmation', language: 'en', category: 'UTILITY', status: 'approved', bodyText: 'Your order #{{1}} has been confirmed.' },
  { id: '3', name: 'appointment_reminder', language: 'en', category: 'UTILITY', status: 'pending', bodyText: 'Reminder: You have an appointment on {{1}}.' },
  { id: '4', name: 'promo_offer', language: 'en', category: 'MARKETING', status: 'rejected', bodyText: 'Special offer! Get {{1}}% off!' },
];

const STATUS_CONFIG: Record<string, { icon: React.ComponentType<{ className?: string }>; label: string; color: string }> = {
  approved: { icon: CheckCircle2, label: 'Approved', color: 'text-emerald-600 bg-emerald-50 dark:bg-emerald-900/30 dark:text-emerald-400' },
  pending: { icon: Clock, label: 'Pending', color: 'text-amber-600 bg-amber-50 dark:bg-amber-900/30 dark:text-amber-400' },
  rejected: { icon: AlertCircle, label: 'Rejected', color: 'text-red-600 bg-red-50 dark:bg-red-900/30 dark:text-red-400' },
};

interface WhatsappTemplateManagerProps {
  className?: string;
}

export function WhatsappTemplateManager({ className }: WhatsappTemplateManagerProps) {
  const [templates, setTemplates] = useState(MOCK_TEMPLATES);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editTemplate, setEditTemplate] = useState<Template | null>(null);
  const [form, setForm] = useState({ name: '', language: 'en', category: 'MARKETING', bodyText: '' });

  const openCreate = () => {
    setEditTemplate(null);
    setForm({ name: '', language: 'en', category: 'MARKETING', bodyText: '' });
    setDialogOpen(true);
  };

  const openEdit = (template: Template) => {
    setEditTemplate(template);
    setForm({ name: template.name, language: template.language, category: template.category, bodyText: template.bodyText });
    setDialogOpen(true);
  };

  const handleSave = () => {
    if (editTemplate) {
      setTemplates(templates.map((t) => (t.id === editTemplate.id ? { ...t, ...form } : t)));
    } else {
      setTemplates([...templates, { id: String(Date.now()), ...form, status: 'pending' as const }]);
    }
    setDialogOpen(false);
  };

  const handleDelete = (id: string) => {
    setTemplates(templates.filter((t) => t.id !== id));
  };

  return (
    <Card className={cn('border-border/50', className)}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm flex items-center gap-2">
            <FileText className="h-4 w-4 text-muted-foreground" />
            WhatsApp Templates
          </CardTitle>
          <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700 text-xs" onClick={openCreate}>
            <Plus className="h-3 w-3 mr-1" />New Template
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-2">
        {templates.map((template) => {
          const statusConfig = STATUS_CONFIG[template.status];
          const StatusIcon = statusConfig.icon;
          return (
            <motion.div
              key={template.id}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center justify-between p-3 rounded-lg border border-border/50 hover:bg-muted/30 transition-colors"
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-medium truncate">{template.name}</p>
                  <Badge variant="outline" className="text-[10px] px-1.5 py-0">{template.category}</Badge>
                  <Badge variant="outline" className="text-[10px] px-1.5 py-0">{template.language}</Badge>
                </div>
                <p className="text-xs text-muted-foreground mt-0.5 truncate">{template.bodyText}</p>
              </div>
              <div className="flex items-center gap-2 shrink-0 ml-3">
                <Badge className={cn('text-[10px] gap-1', statusConfig.color)}>
                  <StatusIcon className="h-3 w-3" />
                  {statusConfig.label}
                </Badge>
                <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => openEdit(template)}>
                  <Edit className="h-3.5 w-3.5" />
                </Button>
                <Button variant="ghost" size="icon" className="h-7 w-7 text-destructive" onClick={() => handleDelete(template.id)}>
                  <Trash2 className="h-3.5 w-3.5" />
                </Button>
              </div>
            </motion.div>
          );
        })}
      </CardContent>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{editTemplate ? 'Edit Template' : 'New WhatsApp Template'}</DialogTitle>
          </DialogHeader>
          <div className="space-y-3">
            <div>
              <Label className="text-xs text-muted-foreground">Template Name *</Label>
              <Input value={form.name} onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))} placeholder="e.g. welcome_message" className="h-9 mt-1" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label className="text-xs text-muted-foreground">Language</Label>
                <Select value={form.language} onValueChange={(v) => setForm((p) => ({ ...p, language: v }))}>
                  <SelectTrigger className="h-9 mt-1"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="es">Spanish</SelectItem>
                    <SelectItem value="fr">French</SelectItem>
                    <SelectItem value="de">German</SelectItem>
                    <SelectItem value="pt">Portuguese</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="text-xs text-muted-foreground">Category</Label>
                <Select value={form.category} onValueChange={(v) => setForm((p) => ({ ...p, category: v }))}>
                  <SelectTrigger className="h-9 mt-1"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="MARKETING">Marketing</SelectItem>
                    <SelectItem value="UTILITY">Utility</SelectItem>
                    <SelectItem value="AUTHENTICATION">Authentication</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div>
              <Label className="text-xs text-muted-foreground">Body Text * <span className="text-muted-foreground/60">(use {'{{1}}, {{2}}'} for variables)</span></Label>
              <Textarea value={form.bodyText} onChange={(e) => setForm((p) => ({ ...p, bodyText: e.target.value }))} placeholder="Hello {{1}}! Welcome..." rows={4} className="mt-1 resize-none" />
            </div>
          </div>
          <DialogFooter>
            <Button variant="ghost" onClick={() => setDialogOpen(false)}>Cancel</Button>
            <Button className="bg-emerald-600 hover:bg-emerald-700" onClick={handleSave} disabled={!form.name || !form.bodyText}>
              {editTemplate ? 'Update' : 'Submit for Approval'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  );
}
