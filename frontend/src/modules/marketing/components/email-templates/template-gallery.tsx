'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import type { EmailTemplate, TemplateCategory } from '@/modules/marketing/types';
import { Search, Plus, FileText, Eye } from 'lucide-react';
import { motion } from 'framer-motion';

interface TemplateGalleryProps {
  templates?: EmailTemplate[];
  categories?: TemplateCategory[];
  onSelect?: (template: EmailTemplate) => void;
  onCreateNew?: () => void;
  className?: string;
}

const MOCK_CATEGORIES: TemplateCategory[] = [
  { id: '1', name: 'Welcome', count: 5 },
  { id: '2', name: 'Newsletter', count: 8 },
  { id: '3', name: 'Promotional', count: 12 },
  { id: '4', name: 'Transactional', count: 6 },
  { id: '5', name: 'Event', count: 3 },
];

const MOCK_TEMPLATES: EmailTemplate[] = [
  { id: '1', name: 'Welcome Email', subject: 'Welcome to our community!', preheader: 'Get started with...', contentHtml: '<h1>Welcome!</h1>', category: 'Welcome', tags: ['onboarding'], usageCount: 245, status: 'active', createdAt: '2024-01-15', updatedAt: '2024-02-20' },
  { id: '2', name: 'Monthly Newsletter', subject: 'Your monthly update', contentHtml: '<h1>Newsletter</h1>', category: 'Newsletter', tags: ['newsletter'], usageCount: 89, status: 'active', createdAt: '2024-01-20', updatedAt: '2024-03-01' },
  { id: '3', name: 'Flash Sale Alert', subject: 'Limited time offer!', contentHtml: '<h1>Sale!</h1>', category: 'Promotional', tags: ['sale'], usageCount: 156, status: 'active', createdAt: '2024-02-01', updatedAt: '2024-02-28' },
  { id: '4', name: 'Order Confirmation', subject: 'Your order is confirmed', contentHtml: '<h1>Order</h1>', category: 'Transactional', tags: ['order'], usageCount: 1200, status: 'active', createdAt: '2024-01-10', updatedAt: '2024-01-10' },
  { id: '5', name: 'Event Invitation', subject: 'You\'re invited!', contentHtml: '<h1>Event</h1>', category: 'Event', tags: ['event'], usageCount: 34, status: 'draft', createdAt: '2024-03-01', updatedAt: '2024-03-01' },
  { id: '6', name: 'Re-engagement', subject: 'We miss you!', contentHtml: '<h1>Come back</h1>', category: 'Promotional', tags: ['retention'], usageCount: 67, status: 'active', createdAt: '2024-02-15', updatedAt: '2024-03-10' },
];

export function TemplateGallery({ templates = MOCK_TEMPLATES, categories = MOCK_CATEGORIES, onSelect, onCreateNew, className }: TemplateGalleryProps) {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const filteredTemplates = templates.filter((t) => {
    if (search && !t.name.toLowerCase().includes(search.toLowerCase())) return false;
    if (activeCategory !== 'all' && t.category !== activeCategory) return false;
    return true;
  });

  return (
    <div className={cn('space-y-4', className)}>
      {/* Category Tabs + Search */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="flex items-center gap-1 flex-wrap">
          <Button
            variant={activeCategory === 'all' ? 'default' : 'ghost'}
            size="sm"
            className={cn('text-xs h-8', activeCategory === 'all' && 'bg-emerald-600 hover:bg-emerald-700')}
            onClick={() => setActiveCategory('all')}
          >
            All
          </Button>
          {categories.map((cat) => (
            <Button
              key={cat.id}
              variant={activeCategory === cat.name ? 'default' : 'ghost'}
              size="sm"
              className={cn('text-xs h-8', activeCategory === cat.name && 'bg-emerald-600 hover:bg-emerald-700')}
              onClick={() => setActiveCategory(cat.name)}
            >
              {cat.name} ({cat.count})
            </Button>
          ))}
        </div>
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-border bg-card flex-1 sm:flex-none sm:w-48">
            <Search className="h-3.5 w-3.5 text-muted-foreground" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search templates..."
              className="flex-1 bg-transparent text-foreground placeholder:text-muted-foreground/60 outline-none text-xs"
            />
          </div>
          {onCreateNew && (
            <Button onClick={onCreateNew} className="bg-emerald-600 hover:bg-emerald-700 shrink-0" size="sm">
              <Plus className="h-4 w-4 mr-1" />New
            </Button>
          )}
        </div>
      </div>

      {/* Template Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredTemplates.map((template, index) => (
          <motion.div
            key={template.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2, delay: index * 0.03 }}
          >
            <Card
              className="hover:shadow-md transition-all duration-200 cursor-pointer border-border/50 group"
              onClick={() => onSelect?.(template)}
            >
              <CardContent className="p-0">
                {/* Thumbnail */}
                <div className="h-32 bg-muted/30 rounded-t-lg flex items-center justify-center relative overflow-hidden">
                  <FileText className="h-10 w-10 text-muted-foreground/20" />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors flex items-center justify-center">
                    <Eye className="h-6 w-6 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </div>
                {/* Info */}
                <div className="p-3">
                  <h3 className="text-sm font-medium truncate">{template.name}</h3>
                  <p className="text-xs text-muted-foreground truncate mt-0.5">{template.subject}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <Badge variant="outline" className="text-[10px] px-1.5 py-0">{template.category}</Badge>
                    <span className="text-[10px] text-muted-foreground">{template.usageCount} uses</span>
                    <Badge
                      variant={template.status === 'active' ? 'default' : 'secondary'}
                      className={cn(
                        'text-[10px] px-1.5 py-0 ml-auto',
                        template.status === 'active' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300' : ''
                      )}
                    >
                      {template.status}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {filteredTemplates.length === 0 && (
        <div className="text-center py-12 text-muted-foreground">
          <FileText className="h-10 w-10 mx-auto mb-3 opacity-20" />
          <p className="text-sm font-medium">No templates found</p>
          <p className="text-xs mt-1">Try adjusting your search or category filter</p>
        </div>
      )}
    </div>
  );
}
