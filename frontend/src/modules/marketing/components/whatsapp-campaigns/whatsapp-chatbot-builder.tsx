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
import { Bot, Plus, Trash2, ArrowRight, GripVertical } from 'lucide-react';
import { motion } from 'framer-motion';

interface FlowNode {
  id: string;
  type: 'message' | 'condition' | 'action';
  label: string;
  content: string;
  nextId?: string;
}

interface WhatsappChatbotBuilderProps {
  className?: string;
}

export function WhatsappChatbotBuilder({ className }: WhatsappChatbotBuilderProps) {
  const [nodes, setNodes] = useState<FlowNode[]>([
    { id: '1', type: 'message', label: 'Welcome', content: 'Hello! How can I help you?', nextId: '2' },
    { id: '2', type: 'condition', label: 'Check Intent', content: 'If user asks about pricing', nextId: '3' },
    { id: '3', type: 'message', label: 'Pricing Info', content: 'Our plans start at $29/mo.' },
  ]);

  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
  const selectedNode = nodes.find((n) => n.id === selectedNodeId);

  const addNode = (type: FlowNode['type']) => {
    const newId = String(Date.now());
    const newNode: FlowNode = {
      id: newId,
      type,
      label: type === 'message' ? 'New Message' : type === 'condition' ? 'New Condition' : 'New Action',
      content: '',
    };
    setNodes([...nodes, newNode]);
    setSelectedNodeId(newId);
  };

  const removeNode = (id: string) => {
    setNodes(nodes.filter((n) => n.id !== id));
    if (selectedNodeId === id) setSelectedNodeId(null);
  };

  const updateNode = (id: string, updates: Partial<FlowNode>) => {
    setNodes(nodes.map((n) => (n.id === id ? { ...n, ...updates } : n)));
  };

  const NODE_COLORS: Record<string, string> = {
    message: 'border-emerald-300 bg-emerald-50 dark:bg-emerald-950/20',
    condition: 'border-amber-300 bg-amber-50 dark:bg-amber-950/20',
    action: 'border-blue-300 bg-blue-50 dark:bg-blue-950/20',
  };

  const NODE_ICONS: Record<string, string> = {
    message: '💬',
    condition: '🔀',
    action: '⚡',
  };

  return (
    <div className={cn('grid grid-cols-1 lg:grid-cols-3 gap-4', className)}>
      {/* Flow Canvas */}
      <div className="lg:col-span-2">
        <Card className="border-border/50">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm flex items-center gap-2">
                <Bot className="h-4 w-4 text-muted-foreground" />
                Chatbot Flow
              </CardTitle>
              <div className="flex items-center gap-1">
                <Button variant="outline" size="sm" className="text-xs h-7" onClick={() => addNode('message')}>
                  <Plus className="h-3 w-3 mr-1" />Message
                </Button>
                <Button variant="outline" size="sm" className="text-xs h-7" onClick={() => addNode('condition')}>
                  <Plus className="h-3 w-3 mr-1" />Condition
                </Button>
                <Button variant="outline" size="sm" className="text-xs h-7" onClick={() => addNode('action')}>
                  <Plus className="h-3 w-3 mr-1" />Action
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-2 pb-6">
            {nodes.map((node, index) => (
              <div key={node.id}>
                <motion.div
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  className={cn(
                    'flex items-center gap-2 p-3 rounded-lg border-2 cursor-pointer transition-colors',
                    NODE_COLORS[node.type],
                    selectedNodeId === node.id && 'ring-2 ring-emerald-500'
                  )}
                  onClick={() => setSelectedNodeId(node.id)}
                >
                  <GripVertical className="h-4 w-4 text-muted-foreground shrink-0" />
                  <span className="text-sm">{NODE_ICONS[node.type]}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{node.label}</p>
                    {node.content && (
                      <p className="text-xs text-muted-foreground truncate">{node.content}</p>
                    )}
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-7 w-7 shrink-0"
                    onClick={(e) => { e.stopPropagation(); removeNode(node.id); }}
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </Button>
                </motion.div>
                {index < nodes.length - 1 && (
                  <div className="flex justify-center py-1">
                    <ArrowRight className="h-4 w-4 text-muted-foreground/40 rotate-90" />
                  </div>
                )}
              </div>
            ))}
            {nodes.length === 0 && (
              <p className="text-sm text-muted-foreground text-center py-8">
                No flow nodes yet. Add messages, conditions, and actions to build your chatbot.
              </p>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Node Editor */}
      <div>
        <Card className="border-border/50">
          <CardHeader>
            <CardTitle className="text-sm">Edit Node</CardTitle>
          </CardHeader>
          <CardContent>
            {selectedNode ? (
              <div className="space-y-3">
                <div>
                  <Label className="text-xs text-muted-foreground">Label</Label>
                  <Input
                    value={selectedNode.label}
                    onChange={(e) => updateNode(selectedNode.id, { label: e.target.value })}
                    className="h-9 mt-1"
                  />
                </div>
                <div>
                  <Label className="text-xs text-muted-foreground">Content</Label>
                  <Textarea
                    value={selectedNode.content}
                    onChange={(e) => updateNode(selectedNode.id, { content: e.target.value })}
                    className="mt-1 resize-none"
                    rows={4}
                  />
                </div>
                <Badge variant="outline" className="text-xs capitalize">{selectedNode.type} Node</Badge>
              </div>
            ) : (
              <p className="text-sm text-muted-foreground text-center py-8">
                Select a node to edit its properties
              </p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
