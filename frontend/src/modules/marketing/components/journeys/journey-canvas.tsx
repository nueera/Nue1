'use client';

import { useState, useRef, useCallback } from 'react';
import { cn } from '@/lib/utils';
import type { JourneyNode, JourneyEdge } from '@/modules/marketing/types';
import { JourneyTriggerNode } from './journey-trigger-node';
import { JourneyEmailNode } from './journey-email-node';
import { JourneySmsNode } from './journey-sms-node';
import { JourneyWhatsappNode } from './journey-whatsapp-node';
import { JourneyWaitNode } from './journey-wait-node';
import { JourneyConditionNode } from './journey-condition-node';
import { JourneyActionNode } from './journey-action-node';
import { JourneyExitNode } from './journey-exit-node';
import { JourneyEdges } from './journey-edges';
import { JourneyMiniMap } from './journey-mini-map';
import { ZoomIn, ZoomOut, Maximize2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface JourneyCanvasProps {
  nodes: JourneyNode[];
  edges: JourneyEdge[];
  selectedNodeId: string | null;
  onNodeSelect: (nodeId: string | null) => void;
  onNodeMove: (nodeId: string, position: { x: number; y: number }) => void;
}

export function JourneyCanvas({ nodes, edges, selectedNodeId, onNodeSelect, onNodeMove }: JourneyCanvasProps) {
  const canvasRef = useRef<HTMLDivElement>(null);
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isPanning, setIsPanning] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [draggingNodeId, setDraggingNodeId] = useState<string | null>(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

  const handleWheel = useCallback((e: React.WheelEvent) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? -0.1 : 0.1;
    setZoom((prev) => Math.max(0.3, Math.min(2, prev + delta)));
  }, []);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if (e.target === canvasRef.current || (e.target as HTMLElement).classList.contains('canvas-bg')) {
      setIsPanning(true);
      setDragStart({ x: e.clientX - pan.x, y: e.clientY - pan.y });
      onNodeSelect(null);
    }
  }, [pan, onNodeSelect]);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (isPanning) {
      setPan({ x: e.clientX - dragStart.x, y: e.clientY - dragStart.y });
    }
    if (draggingNodeId) {
      const rect = canvasRef.current?.getBoundingClientRect();
      if (!rect) return;
      const x = (e.clientX - rect.left - pan.x) / zoom - dragOffset.x;
      const y = (e.clientY - rect.top - pan.y) / zoom - dragOffset.y;
      onNodeMove(draggingNodeId, { x: Math.max(0, x), y: Math.max(0, y) });
    }
  }, [isPanning, dragStart, draggingNodeId, dragOffset, pan, zoom, onNodeMove]);

  const handleMouseUp = useCallback(() => {
    setIsPanning(false);
    setDraggingNodeId(null);
  }, []);

  const handleNodeMouseDown = useCallback((nodeId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const node = nodes.find((n) => n.id === nodeId);
    if (!node) return;
    setDraggingNodeId(nodeId);
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;
    setDragOffset({
      x: (e.clientX - rect.left - pan.x) / zoom - node.position.x,
      y: (e.clientY - rect.top - pan.y) / zoom - node.position.y,
    });
    onNodeSelect(nodeId);
  }, [nodes, pan, zoom, onNodeSelect]);

  const renderNode = (node: JourneyNode) => {
    const isSelected = selectedNodeId === node.id;
    const commonProps = {
      node,
      isSelected,
      onMouseDown: (e: React.MouseEvent) => handleNodeMouseDown(node.id, e),
    };

    switch (node.type) {
      case 'trigger': return <JourneyTriggerNode {...commonProps} />;
      case 'email': return <JourneyEmailNode {...commonProps} />;
      case 'sms': return <JourneySmsNode {...commonProps} />;
      case 'whatsapp': return <JourneyWhatsappNode {...commonProps} />;
      case 'delay': return <JourneyWaitNode {...commonProps} />;
      case 'condition': return <JourneyConditionNode {...commonProps} />;
      case 'action': return <JourneyActionNode {...commonProps} />;
      case 'exit': return <JourneyExitNode {...commonProps} />;
      default: return <JourneyActionNode {...commonProps} />;
    }
  };

  return (
    <div className="relative h-full overflow-hidden bg-muted/10">
      {/* Zoom Controls */}
      <div className="absolute top-3 right-3 z-10 flex items-center gap-1 bg-card rounded-lg border shadow-sm p-1">
        <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => setZoom((z) => Math.max(0.3, z - 0.2))}>
          <ZoomOut className="h-3.5 w-3.5" />
        </Button>
        <span className="text-xs font-medium w-10 text-center tabular-nums">{Math.round(zoom * 100)}%</span>
        <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => setZoom((z) => Math.min(2, z + 0.2))}>
          <ZoomIn className="h-3.5 w-3.5" />
        </Button>
        <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => { setZoom(1); setPan({ x: 0, y: 0 }); }}>
          <Maximize2 className="h-3.5 w-3.5" />
        </Button>
      </div>

      {/* Mini Map */}
      <div className="absolute bottom-3 right-3 z-10">
        <JourneyMiniMap nodes={nodes} zoom={zoom} pan={pan} />
      </div>

      {/* Canvas */}
      <div
        ref={canvasRef}
        className="canvas-bg w-full h-full cursor-grab active:cursor-grabbing"
        onWheel={handleWheel}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        <div
          className="relative"
          style={{
            transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
            transformOrigin: '0 0',
          }}
        >
          {/* Grid */}
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle, hsl(var(--border)) 1px, transparent 1px)',
            backgroundSize: '24px 24px',
            width: '4000px',
            height: '4000px',
            opacity: 0.3,
          }} />

          {/* Edges */}
          <JourneyEdges nodes={nodes} edges={edges} />

          {/* Nodes */}
          {nodes.map((node) => (
            <div
              key={node.id}
              className="absolute"
              style={{ left: node.position.x, top: node.position.y }}
            >
              {renderNode(node)}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
