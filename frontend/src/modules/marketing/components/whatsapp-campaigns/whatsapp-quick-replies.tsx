// @ts-nocheck
'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Plus, Trash2, Zap } from 'lucide-react';
import { motion } from 'framer-motion';

interface QuickReply {
  id: string;
  text: string;
  keyword: string;
  response: string;
}

interface WhatsappQuickRepliesProps {
  className?: string;
}

export function WhatsappQuickReplies({ className }: WhatsappQuickRepliesProps) {
  const [replies, setReplies] = useState<QuickReply[]>([
    { id: '1', text: 'View Pricing', keyword: 'pricing', response: 'Our plans start at $29/mo. Visit our website for details.' },
    { id: '2', text: 'Contact Support', keyword: 'help', response: 'A support agent will be with you shortly.' },
    { id: '3', text: 'Book Demo', keyword: 'demo', response: 'You can book a demo at https://calendly.com/our-team' },
  ]);

  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState({ text: '', keyword: '', response: '' });

  const addReply = () => {
    if (!form.text || !form.response) return;
    const newReply: QuickReply = { id: String(Date.now()), ...form };
    setReplies([...replies, newReply]);
    setForm({ text: '', keyword: '', response: '' });
  };

  const removeReply = (id: string) => {
    setReplies(replies.filter((r) => r.id !== id));
  };

  const startEdit = (reply: QuickReply) => {
    setEditingId(reply.id);
    setForm({ text: reply.text, keyword: reply.keyword, response: reply.response });
  };

  const saveEdit = () => {
    if (!editingId) return;
    setReplies(replies.map((r) => (r.id === editingId ? { ...r, ...form } : r)));
    setEditingId(null);
    setForm({ text: '', keyword: '', response: '' });
  };

  return (
    <Card className={cn('border-border/50', className)}>
      <CardHeader>
        <CardTitle className="text-sm flex items-center gap-2">
          <Zap className="h-4 w-4 text-muted-foreground" />
          Quick Reply Configuration
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Existing Quick Replies */}
        <div className="space-y-2">
          {replies.map((reply) => (
            <motion.div
              key={reply.id}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center justify-between p-3 rounded-lg border border-border/50 hover:bg-muted/30 transition-colors"
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-medium">{reply.text}</p>
                  {reply.keyword && (
                    <Badge variant="outline" className="text-[10px] px-1.5 py-0">
                      /{reply.keyword}
                    </Badge>
                  )}
                </div>
                <p className="text-xs text-muted-foreground mt-0.5 truncate">{reply.response}</p>
              </div>
              <div className="flex items-center gap-1 shrink-0 ml-2">
                <Button variant="ghost" size="sm" className="h-7 text-xs" onClick={() => startEdit(reply)}>
                  Edit
                </Button>
                <Button variant="ghost" size="icon" className="h-7 w-7 text-destructive" onClick={() => removeReply(reply.id)}>
                  <Trash2 className="h-3.5 w-3.5" />
                </Button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Add/Edit Form */}
        <div className="p-3 rounded-lg border border-dashed border-border space-y-2">
          <p className="text-xs font-medium text-muted-foreground">
            {editingId ? 'Edit Quick Reply' : 'Add Quick Reply'}
          </p>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <Label className="text-[10px] text-muted-foreground">Button Text *</Label>
              <Input
                value={form.text}
                onChange={(e) => setForm((p) => ({ ...p, text: e.target.value }))}
                placeholder="View Pricing"
                className="h-8 text-xs"
              />
            </div>
            <div>
              <Label className="text-[10px] text-muted-foreground">Keyword</Label>
              <Input
                value={form.keyword}
                onChange={(e) => setForm((p) => ({ ...p, keyword: e.target.value }))}
                placeholder="pricing"
                className="h-8 text-xs"
              />
            </div>
          </div>
          <div>
            <Label className="text-[10px] text-muted-foreground">Auto Response *</Label>
            <Input
              value={form.response}
              onChange={(e) => setForm((p) => ({ ...p, response: e.target.value }))}
              placeholder="Our plans start at..."
              className="h-8 text-xs"
            />
          </div>
          <div className="flex justify-end gap-2">
            {editingId && (
              <Button variant="ghost" size="sm" className="text-xs h-7" onClick={() => { setEditingId(null); setForm({ text: '', keyword: '', response: '' }); }}>
                Cancel
              </Button>
            )}
            <Button size="sm" className="text-xs h-7 bg-emerald-600 hover:bg-emerald-700" onClick={editingId ? saveEdit : addReply} disabled={!form.text || !form.response}>
              <Plus className="h-3 w-3 mr-1" />
              {editingId ? 'Update' : 'Add'}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
