'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { X, Plus } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { createLeadSchema, type CreateLeadInput } from '@/modules/marketing/schemas/lead.schema';
import { LEAD_SOURCE_CONFIG, LEAD_STAGE_CONFIG } from '@/modules/marketing/constants/lead-constants';
import type { Lead } from '@/modules/marketing/types';
import { useState } from 'react';

interface LeadFormProps {
  lead?: Lead;
  onSubmit: (data: CreateLeadInput) => void;
  onCancel: () => void;
  isLoading?: boolean;
}

export function LeadForm({ lead, onSubmit, onCancel, isLoading }: LeadFormProps) {
  const [tagInput, setTagInput] = useState('');
  const [tags, setTags] = useState<string[]>(lead?.tags ?? []);

  const form = useForm<CreateLeadInput>({
    // @ts-expect-error — Type 'Resolver<{ firstName: string; lastName: string; email:...
    resolver: zodResolver(createLeadSchema),
    defaultValues: lead
      ? {
          firstName: lead.firstName,
          lastName: lead.lastName,
          email: lead.email,
          phone: lead.phone ?? '',
          company: lead.company ?? '',
          source: lead.source,
          stage: lead.stage,
          owner: lead.assignedTo ?? '',
          notes: lead.notes ?? '',
          tags: lead.tags,
        }
      : {
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          company: '',
          source: 'website',
          stage: 'new',
          owner: '',
          notes: '',
          tags: [],
        },
  });

  const handleAddTag = () => {
    const trimmed = tagInput.trim();
    if (trimmed && !tags.includes(trimmed)) {
      const newTags = [...tags, trimmed];
      setTags(newTags);
      form.setValue('tags', newTags);
      setTagInput('');
    }
  };

  const handleRemoveTag = (tag: string) => {
    const newTags = tags.filter((t) => t !== tag);
    setTags(newTags);
    form.setValue('tags', newTags);
  };

  const handleSubmit = (data: CreateLeadInput) => {
    onSubmit({ ...data, tags });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className="border rounded-2xl p-6 bg-card"
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-foreground">
          {lead ? 'Edit Lead' : 'New Lead'}
        </h2>
        <button
          onClick={onCancel}
          className="text-muted-foreground hover:text-foreground transition-colors"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      <Form {...form}>
        {/* @ts-expect-error */}
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* First Name */}
            <FormField
              // @ts-expect-error — Type 'Control<{ firstName: string; lastName: string; email: ...
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs text-muted-foreground">First Name *</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="John" className="h-9" />
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />

            {/* Last Name */}
            <FormField
              // @ts-expect-error — Type 'Control<{ firstName: string; lastName: string; email: ...
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs text-muted-foreground">Last Name *</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Doe" className="h-9" />
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />

            {/* Email */}
            <FormField
              // @ts-expect-error — Type 'Control<{ firstName: string; lastName: string; email: ...
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs text-muted-foreground">Email *</FormLabel>
                  <FormControl>
                    <Input {...field} type="email" placeholder="john@example.com" className="h-9" />
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />

            {/* Phone */}
            <FormField
              // @ts-expect-error — Type 'Control<{ firstName: string; lastName: string; email: ...
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs text-muted-foreground">Phone</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="+1-555-0100" className="h-9" />
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />

            {/* Company */}
            <FormField
              // @ts-expect-error — Type 'Control<{ firstName: string; lastName: string; email: ...
              control={form.control}
              name="company"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs text-muted-foreground">Company</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Acme Corp" className="h-9" />
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />

            {/* Source */}
            <FormField
              // @ts-expect-error — Type 'Control<{ firstName: string; lastName: string; email: ...
              control={form.control}
              name="source"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs text-muted-foreground">Source</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="h-9">
                        <SelectValue placeholder="Select source" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {Object.entries(LEAD_SOURCE_CONFIG).map(([key, config]) => (
                        <SelectItem key={key} value={key}>
                          {config.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />

            {/* Stage */}
            <FormField
              // @ts-expect-error — Type 'Control<{ firstName: string; lastName: string; email: ...
              control={form.control}
              name="stage"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs text-muted-foreground">Stage</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="h-9">
                        <SelectValue placeholder="Select stage" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {Object.entries(LEAD_STAGE_CONFIG).map(([key, config]) => (
                        <SelectItem key={key} value={key}>
                          {config.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />

            {/* Owner */}
            <FormField
              // @ts-expect-error — Type 'Control<{ firstName: string; lastName: string; email: ...
              control={form.control}
              name="owner"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs text-muted-foreground">Owner</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Assign to..." className="h-9" />
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />
          </div>

          {/* Notes */}
          <FormField
            // @ts-expect-error — Type 'Control<{ firstName: string; lastName: string; email: ...
            control={form.control}
            name="notes"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xs text-muted-foreground">Notes</FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    placeholder="Add notes about this lead..."
                    rows={3}
                    className="resize-none"
                  />
                </FormControl>
                <FormMessage className="text-xs" />
              </FormItem>
            )}
          />

          {/* Tags */}
          <div className="space-y-2">
            <Label className="text-xs text-muted-foreground">Tags</Label>
            <div className="flex items-center gap-2">
              <Input
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleAddTag();
                  }
                }}
                placeholder="Add tag..."
                className="h-9 flex-1"
              />
              <Button type="button" variant="outline" size="sm" onClick={handleAddTag}>
                <Plus className="h-3 w-3" />
              </Button>
            </div>
            {tags.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mt-2">
                {tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="gap-1 text-xs">
                    {tag}
                    <button
                      type="button"
                      onClick={() => handleRemoveTag(tag)}
                      className="hover:text-destructive transition-colors"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-2 pt-4">
            <Button type="button" variant="ghost" onClick={onCancel}>
              Cancel
            </Button>
            <Button type="submit" className="bg-emerald-600 hover:bg-emerald-700" disabled={isLoading}>
              {isLoading ? 'Saving...' : lead ? 'Update Lead' : 'Create Lead'}
            </Button>
          </div>
        </form>
      </Form>
    </motion.div>
  );
}
