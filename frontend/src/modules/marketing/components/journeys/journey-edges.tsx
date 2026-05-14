// @ts-nocheck
'use client';

import React from 'react';
import type { JourneyNode, JourneyEdge } from '@/modules/marketing/types';

interface JourneyEdgesProps {
  nodes: JourneyNode[];
  edges: JourneyEdge[];
}

export const JourneyEdges = React.memo(function JourneyEdges({ nodes, edges }: JourneyEdgesProps) {
  const nodeMap = new Map(nodes.map((n) => [n.id, n]));

  return (
    <svg className="absolute inset-0 pointer-events-none" style={{ width: '2000px', height: '2000px' }}>
      <defs>
        <marker
          id="arrowhead"
          markerWidth="10"
          markerHeight="7"
          refX="10"
          refY="3.5"
          orient="auto"
        >
          <polygon points="0 0, 10 3.5, 0 7" fill="hsl(var(--muted-foreground))" />
        </marker>
      </defs>
      {edges.map((edge) => {
        const sourceNode = nodeMap.get(edge.source);
        const targetNode = nodeMap.get(edge.target);
        if (!sourceNode || !targetNode) return null;

        const sourceX = sourceNode.position.x + 90;
        const sourceY = sourceNode.position.y + 50;
        const targetX = targetNode.position.x + 90;
        const targetY = targetNode.position.y;

        const midY = (sourceY + targetY) / 2;

        return (
          <g key={edge.id}>
            <path
              d={`M ${sourceX} ${sourceY} C ${sourceX} ${midY}, ${targetX} ${midY}, ${targetX} ${targetY}`}
              fill="none"
              stroke="hsl(var(--muted-foreground))"
              strokeWidth={2}
              strokeDasharray={edge.condition ? '6 3' : 'none'}
              markerEnd="url(#arrowhead)"
              opacity={0.5}
            />
            {edge.label && (
              <text
                x={(sourceX + targetX) / 2}
                y={midY - 5}
                textAnchor="middle"
                className="text-[10px] fill-muted-foreground"
              >
                {edge.label}
              </text>
            )}
          </g>
        );
      })}
    </svg>
  );
});
