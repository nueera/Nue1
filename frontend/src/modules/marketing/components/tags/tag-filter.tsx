'use client';

import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Filter, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TagFilterProps {
  availableTags: string[];
  selectedTags: string[];
  onToggleTag: (tag: string) => void;
  onClearAll?: () => void;
  className?: string;
}

export function TagFilter({ availableTags, selectedTags, onToggleTag, onClearAll, className }: TagFilterProps) {
  const [expanded, setExpanded] = useState(false);
  const displayTags = expanded ? availableTags : availableTags.slice(0, 8);

  return (
    <div className={cn('space-y-2', className)}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Filter className="h-4 w-4" />
          <span>Filter by tags</span>
          {selectedTags.length > 0 && <span className="text-xs font-medium">({selectedTags.length} selected)</span>}
        </div>
        {selectedTags.length > 0 && (
          <Button variant="ghost" size="sm" className="h-7 text-xs" onClick={onClearAll}>
            <X className="h-3 w-3 mr-1" />Clear
          </Button>
        )}
      </div>
      <div className="flex flex-wrap gap-1.5">
        {displayTags.map((tag) => (
          <Badge
            key={tag}
            variant={selectedTags.includes(tag) ? 'default' : 'outline'}
            className="text-xs cursor-pointer hover:opacity-80 transition-opacity"
            onClick={() => onToggleTag(tag)}
          >
            {tag}
          </Badge>
        ))}
        {availableTags.length > 8 && !expanded && (
          <Button variant="ghost" size="sm" className="h-6 text-xs" onClick={() => setExpanded(true)}>
            +{availableTags.length - 8} more
          </Button>
        )}
      </div>
    </div>
  );
}
