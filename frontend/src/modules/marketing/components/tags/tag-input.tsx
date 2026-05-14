// @ts-nocheck
'use client';

import { useState, KeyboardEvent } from 'react';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { X } from 'lucide-react';

interface TagInputProps {
  tags: string[];
  onAddTag: (tag: string) => void;
  onRemoveTag: (tag: string) => void;
  placeholder?: string;
  maxTags?: number;
}

export function TagInput({ tags, onAddTag, onRemoveTag, placeholder = 'Add tag...', maxTags = 20 }: TagInputProps) {
  const [value, setValue] = useState('');

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      const tag = value.trim().toLowerCase();
      if (tag && !tags.includes(tag) && tags.length < maxTags) {
        onAddTag(tag);
        setValue('');
      }
    }
    if (e.key === 'Backspace' && !value && tags.length > 0) {
      onRemoveTag(tags[tags.length - 1]);
    }
  };

  return (
    <div className="flex flex-wrap items-center gap-1.5 p-2 rounded-lg border border-border bg-card min-h-[40px]">
      {tags.map((tag) => (
        <Badge key={tag} variant="secondary" className="text-xs gap-1 pr-1">
          {tag}
          <button onClick={() => onRemoveTag(tag)} className="hover:text-destructive transition-colors">
            <X className="h-3 w-3" />
          </button>
        </Badge>
      ))}
      <Input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={tags.length < maxTags ? placeholder : ''}
        className="border-0 shadow-none p-0 h-6 text-sm flex-1 min-w-[80px] focus-visible:ring-0"
        disabled={tags.length >= maxTags}
      />
    </div>
  );
}
