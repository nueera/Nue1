// @ts-nocheck
'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import type { Audience } from '@/modules/marketing/types';
import { Save, X, Plus } from 'lucide-react';
import { motion } from 'framer-motion';

interface AudienceFormProps {
  audience?: Audience;
  onSave?: (data: Partial<Audience>) => void;
  onCancel?: () => void;
}

export function AudienceForm({ audience, onSave, onCancel }: AudienceFormProps) {
  const [name, setName] = useState(audience?.name ?? '');
  const [description, setDescription] = useState(audience?.description ?? '');
  const [tags, setTags] = useState<string[]>(audience?.tags ?? []);
  const [newTag, setNewTag] = useState('');

  const handleAddTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      setTags([...tags, newTag.trim()]);
      setNewTag('');
    }
  };

  const handleRemoveTag = (tag: string) => {
    setTags(tags.filter((t) => t !== tag));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave?.({ name, description, tags });
  };

  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.2 }}>
      <Card className="border-border/50 max-w-lg mx-auto">
        <CardHeader>
          <CardTitle className="text-lg">{audience ? 'Edit Audience' : 'Create Audience'}</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <Label className="text-xs">Name</Label>
              <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g., Newsletter Subscribers" className="h-9" required />
            </div>

            <div className="space-y-1.5">
              <Label className="text-xs">Description</Label>
              <Textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Describe this audience..." className="min-h-[80px]" rows={3} />
            </div>

            <div className="space-y-1.5">
              <Label className="text-xs">Tags</Label>
              <div className="flex flex-wrap gap-1.5 mb-2">
                {tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="text-xs gap-1">
                    {tag}
                    <button onClick={() => handleRemoveTag(tag)} className="hover:text-destructive">
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>
              <div className="flex items-center gap-2">
                <Input value={newTag} onChange={(e) => setNewTag(e.target.value)} placeholder="Add tag..." className="h-8 text-sm" onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTag())} />
                <Button type="button" variant="outline" size="icon" className="h-8 w-8 shrink-0" onClick={handleAddTag}>
                  <Plus className="h-3.5 w-3.5" />
                </Button>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              {onCancel && (
                <Button type="button" variant="outline" size="sm" onClick={onCancel}>
                  Cancel
                </Button>
              )}
              <Button type="submit" size="sm" className="bg-emerald-600 hover:bg-emerald-700">
                <Save className="h-4 w-4 mr-1" />
                {audience ? 'Update' : 'Create'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  );
}
