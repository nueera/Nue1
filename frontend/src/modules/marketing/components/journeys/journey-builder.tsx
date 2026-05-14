// @ts-nocheck
'use client';

import { useState, useCallback } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { JourneyCanvas } from './journey-canvas';
import { JourneyNodePalette } from './journey-node-palette';
import { JourneyNodeConfig } from './journey-node-config';
import { JourneyTemplates } from './journey-templates';
import { JourneyAnalytics } from './journey-analytics';
import type { Journey, JourneyNode, JourneyEdge, JourneyNodeType } from '@/modules/marketing/types';
import {
  ArrowLeft,
  Save,
  Play,
  Pause,
  Eye,
  Settings,
  LayoutTemplate,
  BarChart3,
} from 'lucide-react';
// framer-motion removed - no motion used in this component

interface JourneyBuilderProps {
  journey?: Journey;
  onSave?: (data: Partial<Journey>) => void;
  onBack?: () => void;
  onActivate?: () => void;
  onPause?: () => void;
}

export function JourneyBuilder({ journey, onSave, onBack, onActivate, onPause }: JourneyBuilderProps) {
  const [nodes, setNodes] = useState<JourneyNode[]>(
    journey?.nodes ?? [
      { id: 'trigger-1', type: 'trigger', label: 'Entry Trigger', config: { triggerType: 'list_entry' }, position: { x: 400, y: 50 } },
      { id: 'exit-1', type: 'exit', label: 'Exit', config: {}, position: { x: 400, y: 600 } },
    ]
  );
  const [edges, setEdges] = useState<JourneyEdge[]>(journey?.edges ?? [
    { id: 'e1', source: 'trigger-1', target: 'exit-1', label: 'Default' },
  ]);
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<string>('design');
  const [journeyName, setJourneyName] = useState(journey?.name ?? 'Untitled Journey');

  const selectedNode = nodes.find((n) => n.id === selectedNodeId) ?? null;

  const handleAddNode = useCallback((type: JourneyNodeType) => {
    const id = `${type}-${Date.now()}`;
    const lastNode = nodes[nodes.length - 2]; // Before exit
    const newNode: JourneyNode = {
      id,
      type,
      label: getNodeLabel(type),
      config: {},
      position: {
        x: 200 + Math.random() * 400,
        y: (lastNode?.position.y ?? 100) + 120,
      },
    };
    setNodes((prev) => [...prev.slice(0, -1), newNode, prev[prev.length - 1]]);
    setSelectedNodeId(id);
  }, [nodes]);

  const handleUpdateNode = useCallback((nodeId: string, config: Record<string, unknown>) => {
    setNodes((prev) => prev.map((n) => (n.id === nodeId ? { ...n, config: { ...n.config, ...config } } : n)));
  }, []);

  const handleRemoveNode = useCallback((nodeId: string) => {
    setNodes((prev) => prev.filter((n) => n.id !== nodeId));
    setEdges((prev) => prev.filter((e) => e.source !== nodeId && e.target !== nodeId));
    if (selectedNodeId === nodeId) setSelectedNodeId(null);
  }, [selectedNodeId]);

  const handleSave = () => {
    onSave?.({ name: journeyName, nodes, edges });
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
            value={journeyName}
            onChange={(e) => setJourneyName(e.target.value)}
            className="text-lg font-semibold bg-transparent outline-none text-foreground"
          />
        </div>
        <div className="flex items-center gap-2">
          {journey?.status === 'active' ? (
            <Button variant="outline" size="sm" onClick={onPause}>
              <Pause className="h-4 w-4 mr-1" />Pause
            </Button>
          ) : (
            <Button variant="outline" size="sm" onClick={onActivate}>
              <Play className="h-4 w-4 mr-1" />Activate
            </Button>
          )}
          <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700" onClick={handleSave}>
            <Save className="h-4 w-4 mr-1" />Save
          </Button>
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
          <div className="px-4 pt-2">
            <TabsList className="h-9">
              <TabsTrigger value="design" className="text-xs"><Settings className="h-3.5 w-3.5 mr-1" />Design</TabsTrigger>
              <TabsTrigger value="templates" className="text-xs"><LayoutTemplate className="h-3.5 w-3.5 mr-1" />Templates</TabsTrigger>
              <TabsTrigger value="analytics" className="text-xs"><BarChart3 className="h-3.5 w-3.5 mr-1" />Analytics</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="design" className="flex-1 flex overflow-hidden m-0">
            {/* Node Palette */}
            <div className="w-52 border-r bg-muted/20">
              <ScrollArea className="h-full">
                <div className="p-3">
                  <JourneyNodePalette onAddNode={handleAddNode} />
                </div>
              </ScrollArea>
            </div>

            {/* Canvas */}
            <div className="flex-1 overflow-hidden">
              <JourneyCanvas
                nodes={nodes}
                edges={edges}
                selectedNodeId={selectedNodeId}
                onNodeSelect={setSelectedNodeId}
                onNodeMove={(nodeId, position) => {
                  setNodes((prev) => prev.map((n) => (n.id === nodeId ? { ...n, position } : n)));
                }}
              />
            </div>

            {/* Config Panel */}
            <div className="w-72 border-l bg-muted/20">
              <ScrollArea className="h-full">
                <div className="p-3">
                  {selectedNode ? (
                    <JourneyNodeConfig
                      node={selectedNode}
                      onUpdate={(config) => handleUpdateNode(selectedNode.id, config)}
                      onRemove={() => handleRemoveNode(selectedNode.id)}
                    />
                  ) : (
                    <div className="text-center py-12 text-muted-foreground">
                      <Settings className="h-8 w-8 mx-auto mb-2 opacity-30" />
                      <p className="text-xs">Select a node to configure</p>
                    </div>
                  )}
                </div>
              </ScrollArea>
            </div>
          </TabsContent>

          <TabsContent value="templates" className="flex-1 m-0 overflow-auto p-4">
            <JourneyTemplates onSelectTemplate={(templateNodes, templateEdges) => {
              setNodes(templateNodes);
              setEdges(templateEdges);
              setActiveTab('design');
            }} />
          </TabsContent>

          <TabsContent value="analytics" className="flex-1 m-0 overflow-auto p-4">
            <JourneyAnalytics journeyId={journey?.id ?? 'new'} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

function getNodeLabel(type: JourneyNodeType): string {
  const labels: Record<JourneyNodeType, string> = {
    trigger: 'Trigger',
    delay: 'Wait',
    email: 'Send Email',
    sms: 'Send SMS',
    whatsapp: 'Send WhatsApp',
    condition: 'Condition',
    action: 'Action',
    exit: 'Exit',
    webhook: 'Webhook',
    update_field: 'Update Field',
    add_to_list: 'Add to List',
    remove_from_list: 'Remove from List',
    score: 'Adjust Score',
    notification: 'Notification',
  };
  return labels[type] ?? type;
}
