// @ts-nocheck
// ============================================================================
// Journey Validation Utils — Validate nodes, edges, flow, unreachable nodes
// ============================================================================

import type { JourneyNode, JourneyEdge, JourneyNodeType } from '../types';

export interface JourneyValidationError {
  type: 'error' | 'warning';
  message: string;
  nodeId?: string;
  edgeId?: string;
}

export function validateJourneyNodes(nodes: JourneyNode[]): JourneyValidationError[] {
  const errors: JourneyValidationError[] = [];

  const triggerNodes = nodes.filter((n) => n.type === 'trigger');
  const exitNodes = nodes.filter((n) => n.type === 'exit');

  if (triggerNodes.length === 0) {
    errors.push({ type: 'error', message: 'Journey must have at least one trigger node' });
  }

  if (triggerNodes.length > 1) {
    errors.push({
      type: 'error',
      message: 'Journey can only have one trigger node',
      nodeId: triggerNodes[1].id,
    });
  }

  if (exitNodes.length === 0 && nodes.length > 0) {
    errors.push({ type: 'warning', message: 'Consider adding an exit node to complete the journey' });
  }

  // Validate node configs
  for (const node of nodes) {
    if (node.type === 'email' && !node.config.templateId && !node.config.contentHtml) {
      errors.push({
        type: 'error',
        message: 'Email node must have a template or content',
        nodeId: node.id,
      });
    }
    if (node.type === 'delay' && !node.config.delayMinutes && !node.config.delayHours) {
      errors.push({
        type: 'error',
        message: 'Delay node must specify a delay duration',
        nodeId: node.id,
      });
    }
    if (node.type === 'condition' && !node.config.conditionField) {
      errors.push({
        type: 'warning',
        message: 'Condition node should have a condition configured',
        nodeId: node.id,
      });
    }
  }

  return errors;
}

export function validateJourneyEdges(edges: JourneyEdge[], nodes: JourneyNode[]): JourneyValidationError[] {
  const errors: JourneyValidationError[] = [];
  const nodeIds = new Set(nodes.map((n) => n.id));

  for (const edge of edges) {
    if (!nodeIds.has(edge.source)) {
      errors.push({
        type: 'error',
        message: `Edge references unknown source node: ${edge.source}`,
        edgeId: edge.id,
      });
    }
    if (!nodeIds.has(edge.target)) {
      errors.push({
        type: 'error',
        message: `Edge references unknown target node: ${edge.target}`,
        edgeId: edge.id,
      });
    }
  }

  // Check for duplicate edges
  const edgeKeys = new Set<string>();
  for (const edge of edges) {
    const key = `${edge.source}->${edge.target}`;
    if (edgeKeys.has(key)) {
      errors.push({
        type: 'warning',
        message: 'Duplicate edge detected between same nodes',
        edgeId: edge.id,
      });
    }
    edgeKeys.add(key);
  }

  return errors;
}

export function validateJourneyFlow(nodes: JourneyNode[], edges: JourneyEdge[]): JourneyValidationError[] {
  const errors: JourneyValidationError[] = [
    ...validateJourneyNodes(nodes),
    ...validateJourneyEdges(edges, nodes),
  ];

  // Check for disconnected nodes
  if (nodes.length > 1) {
    const connectedNodeIds = new Set<string>();
    for (const edge of edges) {
      connectedNodeIds.add(edge.source);
      connectedNodeIds.add(edge.target);
    }
    const disconnectedNodes = nodes.filter(
      (n) => !connectedNodeIds.has(n.id) && n.type !== 'trigger'
    );
    for (const node of disconnectedNodes) {
      errors.push({
        type: 'warning',
        message: `Node "${node.label}" is not connected to the journey flow`,
        nodeId: node.id,
      });
    }
  }

  return errors;
}

export function hasUnreachableNodes(nodes: JourneyNode[], edges: JourneyEdge[]): boolean {
  if (nodes.length === 0) return false;

  const triggerNodes = nodes.filter((n) => n.type === 'trigger');
  if (triggerNodes.length === 0) return true;

  const reachableNodeIds = new Set<string>();
  const queue = [triggerNodes[0].id];
  reachableNodeIds.add(triggerNodes[0].id);

  while (queue.length > 0) {
    const current = queue.shift()!;
    const outgoingEdges = edges.filter((e) => e.source === current);
    for (const edge of outgoingEdges) {
      if (!reachableNodeIds.has(edge.target)) {
        reachableNodeIds.add(edge.target);
        queue.push(edge.target);
      }
    }
  }

  return nodes.some((n) => !reachableNodeIds.has(n.id));
}
