// @ts-nocheck
'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import type { JourneyNode } from '@/modules/marketing/types';

interface JourneyMiniMapProps {
  nodes: JourneyNode[];
  zoom: number;
  pan: { x: number; y: number };
}

const nodeColors: Record<string, string> = {
  trigger: 'bg-amber-400',
  email: 'bg-blue-400',
  sms: 'bg-emerald-400',
  whatsapp: 'bg-green-400',
  delay: 'bg-violet-400',
  condition: 'bg-orange-400',
  action: 'bg-gray-400',
  exit: 'bg-red-400',
  webhook: 'bg-gray-500',
  update_field: 'bg-gray-400',
  add_to_list: 'bg-gray-400',
  remove_from_list: 'bg-gray-400',
  score: 'bg-gray-400',
  notification: 'bg-gray-400',
};

export const JourneyMiniMap = React.memo(function JourneyMiniMap({ nodes, zoom, pan }: JourneyMiniMapProps) {
  const scale = 0.08;
  const mapWidth = 160;
  const mapHeight = 100;

  return (
    <div className="w-40 h-24 bg-card border rounded-lg shadow-sm overflow-hidden relative">
      <div className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: 'radial-gradient(circle, hsl(var(--border)) 1px, transparent 1px)',
          backgroundSize: '8px 8px',
        }}
      />
      {/* Viewport indicator */}
      <div
        className="absolute border border-emerald-500/50 bg-emerald-500/5 rounded-sm"
        style={{
          width: Math.min(mapWidth, mapWidth / zoom),
          height: Math.min(mapHeight, mapHeight / zoom),
          left: Math.max(0, -pan.x * scale),
          top: Math.max(0, -pan.y * scale),
        }}
      />
      {/* Node dots */}
      {nodes.map((node) => (
        <div
          key={node.id}
          className={cn('absolute w-2 h-2 rounded-full', nodeColors[node.type] ?? 'bg-gray-400')}
          style={{
            left: node.position.x * scale,
            top: node.position.y * scale,
          }}
        />
      ))}
    </div>
  );
});
