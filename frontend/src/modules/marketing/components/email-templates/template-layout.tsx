// @ts-nocheck
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  LayoutTemplate,
  GripVertical,
  Plus,
  Trash2,
  MoveUp,
  MoveDown,
  Type,
  Image as ImageIcon,
  Columns,
  Minus,
  MousePointerClick,
  Palette,
} from 'lucide-react';
import { motion } from 'framer-motion';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface LayoutBlock {
  id: string;
  type: 'header' | 'body' | 'footer' | 'text' | 'image' | 'button' | 'divider' | 'columns' | 'spacer';
  content: string;
  style: {
    backgroundColor: string;
    textColor: string;
    padding: string;
    alignment: 'left' | 'center' | 'right';
  };
}

interface LayoutConfig {
  width: '600px' | '500px' | '700px';
  backgroundColor: string;
  borderRadius: string;
}

interface TemplateLayoutProps {
  onLayoutChange?: (blocks: LayoutBlock[], config: LayoutConfig) => void;
  className?: string;
}

// ---------------------------------------------------------------------------
// Default Data
// ---------------------------------------------------------------------------

const DEFAULT_BLOCKS: LayoutBlock[] = [
  {
    id: 'h1',
    type: 'header',
    content: 'Your Company Logo',
    style: { backgroundColor: '#ffffff', textColor: '#1f2937', padding: '20px', alignment: 'center' },
  },
  {
    id: 'b1',
    type: 'body',
    content: 'Hello {{first_name}},\n\nThank you for joining us! We\'re excited to have you on board.',
    style: { backgroundColor: '#ffffff', textColor: '#374151', padding: '24px', alignment: 'left' },
  },
  {
    id: 'btn1',
    type: 'button',
    content: 'Get Started',
    style: { backgroundColor: '#10b981', textColor: '#ffffff', padding: '16px', alignment: 'center' },
  },
  {
    id: 'sp1',
    type: 'spacer',
    content: '',
    style: { backgroundColor: '#ffffff', textColor: '#374151', padding: '16px', alignment: 'center' },
  },
  {
    id: 'f1',
    type: 'footer',
    content: '© 2025 Acme Corp. You received this because you signed up.\n{{unsubscribe_url}}',
    style: { backgroundColor: '#f9fafb', textColor: '#6b7280', padding: '16px', alignment: 'center' },
  },
];

const DEFAULT_CONFIG: LayoutConfig = {
  width: '600px',
  backgroundColor: '#f3f4f6',
  borderRadius: '8px',
};

// ---------------------------------------------------------------------------
// Block Icon Map
// ---------------------------------------------------------------------------

const BLOCK_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  header: Type,
  body: Type,
  text: Type,
  image: ImageIcon,
  button: MousePointerClick,
  divider: Minus,
  columns: Columns,
  spacer: Minus,
  footer: Type,
};

const BLOCK_COLORS: Record<string, string> = {
  header: 'border-emerald-300 bg-emerald-50 dark:bg-emerald-950/20',
  body: 'border-blue-300 bg-blue-50 dark:bg-blue-950/20',
  text: 'border-blue-300 bg-blue-50 dark:bg-blue-950/20',
  image: 'border-purple-300 bg-purple-50 dark:bg-purple-950/20',
  button: 'border-pink-300 bg-pink-50 dark:bg-pink-950/20',
  divider: 'border-gray-300 bg-gray-50 dark:bg-gray-950/20',
  columns: 'border-amber-300 bg-amber-50 dark:bg-amber-950/20',
  spacer: 'border-gray-200 bg-gray-50/50 dark:bg-gray-950/10',
  footer: 'border-gray-300 bg-gray-50 dark:bg-gray-950/20',
};

const BLOCK_SECTION_MAP: Record<string, 'header' | 'body' | 'footer'> = {
  header: 'header',
  body: 'body',
  text: 'body',
  image: 'body',
  button: 'body',
  divider: 'body',
  columns: 'body',
  spacer: 'body',
  footer: 'footer',
};

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export function TemplateLayout({ onLayoutChange, className }: TemplateLayoutProps) {
  const [blocks, setBlocks] = useState<LayoutBlock[]>(DEFAULT_BLOCKS);
  const [config, setConfig] = useState<LayoutConfig>(DEFAULT_CONFIG);
  const [selectedBlockId, setSelectedBlockId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'layout' | 'style'>('layout');

  const selectedBlock = blocks.find((b) => b.id === selectedBlockId);

  // Handlers
  const addBlock = (type: LayoutBlock['type']) => {
    const newBlock: LayoutBlock = {
      id: `blk_${Date.now()}`,
      type,
      content: type === 'divider' || type === 'spacer' ? '' : type === 'button' ? 'Click Here' : 'New content',
      style: {
        backgroundColor: '#ffffff',
        textColor: '#374151',
        padding: '16px',
        alignment: 'center',
      },
    };
    const updated = [...blocks, newBlock];
    setBlocks(updated);
    setSelectedBlockId(newBlock.id);
    onLayoutChange?.(updated, config);
  };

  const removeBlock = (id: string) => {
    const updated = blocks.filter((b) => b.id !== id);
    setBlocks(updated);
    if (selectedBlockId === id) setSelectedBlockId(null);
    onLayoutChange?.(updated, config);
  };

  const moveBlock = (id: string, direction: 'up' | 'down') => {
    const index = blocks.findIndex((b) => b.id === id);
    if (direction === 'up' && index > 0) {
      const newBlocks = [...blocks];
      [newBlocks[index - 1], newBlocks[index]] = [newBlocks[index], newBlocks[index - 1]];
      setBlocks(newBlocks);
      onLayoutChange?.(newBlocks, config);
    } else if (direction === 'down' && index < blocks.length - 1) {
      const newBlocks = [...blocks];
      [newBlocks[index], newBlocks[index + 1]] = [newBlocks[index + 1], newBlocks[index]];
      setBlocks(newBlocks);
      onLayoutChange?.(newBlocks, config);
    }
  };

  const updateBlockContent = (id: string, content: string) => {
    const updated = blocks.map((b) => (b.id === id ? { ...b, content } : b));
    setBlocks(updated);
    onLayoutChange?.(updated, config);
  };

  const updateBlockStyle = (id: string, style: Partial<LayoutBlock['style']>) => {
    const updated = blocks.map((b) =>
      b.id === id ? { ...b, style: { ...b.style, ...style } } : b
    );
    setBlocks(updated);
    onLayoutChange?.(updated, config);
  };

  const updateConfig = (updates: Partial<LayoutConfig>) => {
    const newConfig = { ...config, ...updates };
    setConfig(newConfig);
    onLayoutChange?.(blocks, newConfig);
  };

  // Group blocks by section
  const headerBlocks = blocks.filter((b) => BLOCK_SECTION_MAP[b.type] === 'header');
  const bodyBlocks = blocks.filter((b) => BLOCK_SECTION_MAP[b.type] === 'body');
  const footerBlocks = blocks.filter((b) => BLOCK_SECTION_MAP[b.type] === 'footer');

  return (
    <div className={cn('grid grid-cols-1 lg:grid-cols-3 gap-4', className)}>
      {/* Layout Editor */}
      <div className="lg:col-span-2">
        <Card className="border-border/50">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm flex items-center gap-2">
                <LayoutTemplate className="h-4 w-4 text-muted-foreground" />
                Layout Builder
              </CardTitle>
              <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as 'layout' | 'style')}>
                <TabsList className="h-7">
                  <TabsTrigger value="layout" className="text-[10px] px-2">Layout</TabsTrigger>
                  <TabsTrigger value="style" className="text-[10px] px-2">Style</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </CardHeader>
          <CardContent>
            {activeTab === 'layout' ? (
              <div className="space-y-4">
                {/* Header Section */}
                <div>
                  <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                    Header
                  </p>
                  <div className="space-y-2">
                    {headerBlocks.map((block) => (
                      <BlockItem
                        key={block.id}
                        block={block}
                        isSelected={selectedBlockId === block.id}
                        onSelect={() => setSelectedBlockId(block.id)}
                        onMoveUp={() => moveBlock(block.id, 'up')}
                        onMoveDown={() => moveBlock(block.id, 'down')}
                        onRemove={() => removeBlock(block.id)}
                        onUpdateContent={(c) => updateBlockContent(block.id, c)}
                      />
                    ))}
                  </div>
                </div>

                <Separator />

                {/* Body Section */}
                <div>
                  <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                    Body
                  </p>
                  <div className="space-y-2">
                    {bodyBlocks.map((block) => (
                      <BlockItem
                        key={block.id}
                        block={block}
                        isSelected={selectedBlockId === block.id}
                        onSelect={() => setSelectedBlockId(block.id)}
                        onMoveUp={() => moveBlock(block.id, 'up')}
                        onMoveDown={() => moveBlock(block.id, 'down')}
                        onRemove={() => removeBlock(block.id)}
                        onUpdateContent={(c) => updateBlockContent(block.id, c)}
                      />
                    ))}
                  </div>
                </div>

                <Separator />

                {/* Footer Section */}
                <div>
                  <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                    Footer
                  </p>
                  <div className="space-y-2">
                    {footerBlocks.map((block) => (
                      <BlockItem
                        key={block.id}
                        block={block}
                        isSelected={selectedBlockId === block.id}
                        onSelect={() => setSelectedBlockId(block.id)}
                        onMoveUp={() => moveBlock(block.id, 'up')}
                        onMoveDown={() => moveBlock(block.id, 'down')}
                        onRemove={() => removeBlock(block.id)}
                        onUpdateContent={(c) => updateBlockContent(block.id, c)}
                      />
                    ))}
                  </div>
                </div>

                {/* Add Block Buttons */}
                <div className="flex items-center gap-2 flex-wrap pt-2">
                  <span className="text-xs text-muted-foreground">Add:</span>
                  {(['header', 'text', 'image', 'button', 'divider', 'columns', 'spacer', 'footer'] as const).map((type) => (
                    <Button
                      key={type}
                      variant="outline"
                      size="sm"
                      className="text-xs h-7 capitalize"
                      onClick={() => addBlock(type)}
                    >
                      <Plus className="h-3 w-3 mr-1" />
                      {type}
                    </Button>
                  ))}
                </div>
              </div>
            ) : (
              /* Style Tab */
              <div className="space-y-4">
                {/* Global Config */}
                <div className="space-y-3">
                  <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">
                    Global Settings
                  </p>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <Label className="text-xs text-muted-foreground">Template Width</Label>
                      <Select
                        value={config.width}
                        onValueChange={(v) => updateConfig({ width: v as LayoutConfig['width'] })}
                      >
                        <SelectTrigger className="h-9 mt-1">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="500px">Narrow (500px)</SelectItem>
                          <SelectItem value="600px">Standard (600px)</SelectItem>
                          <SelectItem value="700px">Wide (700px)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label className="text-xs text-muted-foreground">Border Radius</Label>
                      <Select
                        value={config.borderRadius}
                        onValueChange={(v) => updateConfig({ borderRadius: v })}
                      >
                        <SelectTrigger className="h-9 mt-1">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="0px">None</SelectItem>
                          <SelectItem value="4px">Small</SelectItem>
                          <SelectItem value="8px">Medium</SelectItem>
                          <SelectItem value="16px">Large</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div>
                    <Label className="text-xs text-muted-foreground">Background Color</Label>
                    <div className="flex items-center gap-2 mt-1">
                      <input
                        type="color"
                        value={config.backgroundColor}
                        onChange={(e) => updateConfig({ backgroundColor: e.target.value })}
                        className="h-9 w-9 rounded border border-border cursor-pointer"
                      />
                      <Input
                        value={config.backgroundColor}
                        onChange={(e) => updateConfig({ backgroundColor: e.target.value })}
                        className="h-9 text-xs font-mono"
                      />
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Block-specific Style */}
                {selectedBlock ? (
                  <div className="space-y-3">
                    <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">
                      Block: <span className="capitalize">{selectedBlock.type}</span>
                    </p>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <Label className="text-xs text-muted-foreground">Background</Label>
                        <div className="flex items-center gap-2 mt-1">
                          <input
                            type="color"
                            value={selectedBlock.style.backgroundColor}
                            onChange={(e) => updateBlockStyle(selectedBlock.id, { backgroundColor: e.target.value })}
                            className="h-9 w-9 rounded border border-border cursor-pointer"
                          />
                          <Input
                            value={selectedBlock.style.backgroundColor}
                            onChange={(e) => updateBlockStyle(selectedBlock.id, { backgroundColor: e.target.value })}
                            className="h-9 text-xs font-mono"
                          />
                        </div>
                      </div>
                      <div>
                        <Label className="text-xs text-muted-foreground">Text Color</Label>
                        <div className="flex items-center gap-2 mt-1">
                          <input
                            type="color"
                            value={selectedBlock.style.textColor}
                            onChange={(e) => updateBlockStyle(selectedBlock.id, { textColor: e.target.value })}
                            className="h-9 w-9 rounded border border-border cursor-pointer"
                          />
                          <Input
                            value={selectedBlock.style.textColor}
                            onChange={(e) => updateBlockStyle(selectedBlock.id, { textColor: e.target.value })}
                            className="h-9 text-xs font-mono"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <Label className="text-xs text-muted-foreground">Padding</Label>
                        <Select
                          value={selectedBlock.style.padding}
                          onValueChange={(v) => updateBlockStyle(selectedBlock.id, { padding: v })}
                        >
                          <SelectTrigger className="h-9 mt-1">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="8px">Compact</SelectItem>
                            <SelectItem value="16px">Normal</SelectItem>
                            <SelectItem value="24px">Spacious</SelectItem>
                            <SelectItem value="32px">Extra</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label className="text-xs text-muted-foreground">Alignment</Label>
                        <Select
                          value={selectedBlock.style.alignment}
                          onValueChange={(v) => updateBlockStyle(selectedBlock.id, { alignment: v as 'left' | 'center' | 'right' })}
                        >
                          <SelectTrigger className="h-9 mt-1">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="left">Left</SelectItem>
                            <SelectItem value="center">Center</SelectItem>
                            <SelectItem value="right">Right</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                ) : (
                  <p className="text-xs text-muted-foreground text-center py-6">
                    Select a block to edit its style properties
                  </p>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Live Preview */}
      <div>
        <Card className="border-border/50 sticky top-4">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm flex items-center gap-2">
              <Palette className="h-4 w-4 text-muted-foreground" />
              Preview
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div
              className="mx-auto border rounded-lg overflow-hidden shadow-sm"
              style={{
                maxWidth: config.width,
                backgroundColor: config.backgroundColor,
                borderRadius: config.borderRadius,
              }}
            >
              {blocks.map((block) => {
                const isSelected = selectedBlockId === block.id;
                return (
                  <div
                    key={block.id}
                    className={cn(
                      'cursor-pointer transition-all',
                      isSelected && 'ring-2 ring-emerald-500 ring-inset'
                    )}
                    style={{
                      backgroundColor: block.style.backgroundColor,
                      color: block.style.textColor,
                      padding: block.style.padding,
                      textAlign: block.style.alignment,
                    }}
                    onClick={() => setSelectedBlockId(block.id)}
                  >
                    {block.type === 'divider' ? (
                      <hr className="border-t border-gray-300" />
                    ) : block.type === 'spacer' ? (
                      <div className="h-4" />
                    ) : block.type === 'image' ? (
                      <div className="rounded border-2 border-dashed border-gray-300 h-20 flex items-center justify-center">
                        <ImageIcon className="h-6 w-6 text-gray-300" />
                      </div>
                    ) : block.type === 'button' ? (
                      <div
                        className="inline-block rounded-md px-6 py-2.5 font-medium text-sm"
                        style={{
                          backgroundColor: block.style.backgroundColor === '#ffffff' ? '#10b981' : block.style.backgroundColor,
                          color: block.style.textColor === '#374151' ? '#ffffff' : block.style.textColor,
                        }}
                      >
                        {block.content || 'Button'}
                      </div>
                    ) : (
                      <p className="text-sm whitespace-pre-wrap">
                        {block.content || `(${block.type} block)`}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// BlockItem Sub-component
// ---------------------------------------------------------------------------

interface BlockItemProps {
  block: LayoutBlock;
  isSelected: boolean;
  onSelect: () => void;
  onMoveUp: () => void;
  onMoveDown: () => void;
  onRemove: () => void;
  onUpdateContent: (content: string) => void;
}

function BlockItem({ block, isSelected, onSelect, onMoveUp, onMoveDown, onRemove, onUpdateContent }: BlockItemProps) {
  const Icon = BLOCK_ICONS[block.type] ?? Type;
  const colorClass = BLOCK_COLORS[block.type] ?? '';

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 4 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn(
        'flex items-start gap-2 p-3 rounded-lg border-2 transition-colors cursor-pointer',
        colorClass,
        isSelected && 'ring-2 ring-emerald-500'
      )}
      onClick={onSelect}
    >
      <GripVertical className="h-4 w-4 text-muted-foreground mt-1 shrink-0 cursor-grab" />
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-1 mb-1">
          <Icon className="h-3.5 w-3.5 text-muted-foreground" />
          <Badge variant="outline" className="text-[10px] px-1.5 py-0 capitalize">
            {block.type}
          </Badge>
        </div>
        {block.type === 'divider' ? (
          <div className="border-t border-gray-300 my-2" />
        ) : block.type === 'spacer' ? (
          <p className="text-xs text-muted-foreground italic">Spacer block</p>
        ) : (
          <Textarea
            value={block.content}
            onChange={(e) => onUpdateContent(e.target.value)}
            rows={2}
            className="text-xs resize-none bg-white/50 dark:bg-black/10"
            onClick={(e) => e.stopPropagation()}
          />
        )}
      </div>
      <div className="flex flex-col gap-0.5 shrink-0">
        <Button variant="ghost" size="icon" className="h-6 w-6" onClick={(e) => { e.stopPropagation(); onMoveUp(); }}>
          <MoveUp className="h-3 w-3" />
        </Button>
        <Button variant="ghost" size="icon" className="h-6 w-6" onClick={(e) => { e.stopPropagation(); onMoveDown(); }}>
          <MoveDown className="h-3 w-3" />
        </Button>
        <Button variant="ghost" size="icon" className="h-6 w-6 text-destructive" onClick={(e) => { e.stopPropagation(); onRemove(); }}>
          <Trash2 className="h-3 w-3" />
        </Button>
      </div>
    </motion.div>
  );
}
