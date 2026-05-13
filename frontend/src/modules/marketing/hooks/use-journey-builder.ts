'use client';

// ============================================================================
// Journey Builder Hook — Canvas state, node drag, validation, selection
// ============================================================================

import { useState, useCallback, useMemo } from 'react';
import type { JourneyNode, JourneyEdge, JourneyNodeType } from '../types';

interface JourneyBuilderState {
  nodes: JourneyNode[];
  edges: JourneyEdge[];
  selectedNodeId: string | null;
  selectedEdgeId: string | null;
  isDragging: boolean;
  zoom: number;
  panOffset: { x: number; y: number };
}

export function useJourneyBuilder(initialNodes: JourneyNode[] = [], initialEdges: JourneyEdge[] = []) {
  const [state, setState] = useState<JourneyBuilderState>({
    nodes: initialNodes,
    edges: initialEdges,
    selectedNodeId: null,
    selectedEdgeId: null,
    isDragging: false,
    zoom: 1,
    panOffset: { x: 0, y: 0 },
  });

  const addNode = useCallback((type: JourneyNodeType, label: string, position: { x: number; y: number }) => {
    const newNode: JourneyNode = {
      id: `node-${Date.now()}`,
      type,
      label,
      config: {},
      position,
    };
    setState((prev) => ({ ...prev, nodes: [...prev.nodes, newNode] }));
    return newNode;
  }, []);

  const updateNode = useCallback((id: string, updates: Partial<JourneyNode>) => {
    setState((prev) => ({
      ...prev,
      nodes: prev.nodes.map((n) => (n.id === id ? { ...n, ...updates } : n)),
    }));
  }, []);

  const removeNode = useCallback((id: string) => {
    setState((prev) => ({
      ...prev,
      nodes: prev.nodes.filter((n) => n.id !== id),
      edges: prev.edges.filter((e) => e.source !== id && e.target !== id),
      selectedNodeId: prev.selectedNodeId === id ? null : prev.selectedNodeId,
    }));
  }, []);

  const addEdge = useCallback((edge: Omit<JourneyEdge, 'id'>) => {
    const newEdge: JourneyEdge = { ...edge, id: `edge-${Date.now()}` };
    setState((prev) => ({ ...prev, edges: [...prev.edges, newEdge] }));
    return newEdge;
  }, []);

  const removeEdge = useCallback((id: string) => {
    setState((prev) => ({
      ...prev,
      edges: prev.edges.filter((e) => e.id !== id),
      selectedEdgeId: prev.selectedEdgeId === id ? null : prev.selectedEdgeId,
    }));
  }, []);

  const selectNode = useCallback((id: string | null) => {
    setState((prev) => ({ ...prev, selectedNodeId: id, selectedEdgeId: null }));
  }, []);

  const selectEdge = useCallback((id: string | null) => {
    setState((prev) => ({ ...prev, selectedEdgeId: id, selectedNodeId: null }));
  }, []);

  const setDragging = useCallback((isDragging: boolean) => {
    setState((prev) => ({ ...prev, isDragging }));
  }, []);

  const setZoom = useCallback((zoom: number) => {
    setState((prev) => ({ ...prev, zoom: Math.max(0.25, Math.min(2, zoom)) }));
  }, []);

  const setPanOffset = useCallback((offset: { x: number; y: number }) => {
    setState((prev) => ({ ...prev, panOffset: offset }));
  }, []);

  const onNodeDrag = useCallback((id: string, position: { x: number; y: number }) => {
    setState((prev) => ({
      ...prev,
      nodes: prev.nodes.map((n) => (n.id === id ? { ...n, position } : n)),
    }));
  }, []);

  const validation = useMemo(() => {
    const errors: string[] = [];
    const triggerNodes = state.nodes.filter((n) => n.type === 'trigger');
    const exitNodes = state.nodes.filter((n) => n.type === 'exit');

    if (triggerNodes.length === 0) {
      errors.push('Journey must have at least one trigger node');
    }
    if (triggerNodes.length > 1) {
      errors.push('Journey can only have one trigger node');
    }
    if (exitNodes.length === 0) {
      errors.push('Journey should have at least one exit node');
    }

    // Check for unreachable nodes
    const reachableNodeIds = new Set<string>();
    if (triggerNodes.length > 0) {
      const queue = [triggerNodes[0].id];
      reachableNodeIds.add(triggerNodes[0].id);
      while (queue.length > 0) {
        const current = queue.shift()!;
        const outgoingEdges = state.edges.filter((e) => e.source === current);
        for (const edge of outgoingEdges) {
          if (!reachableNodeIds.has(edge.target)) {
            reachableNodeIds.add(edge.target);
            queue.push(edge.target);
          }
        }
      }
    }
    const unreachableNodes = state.nodes.filter((n) => !reachableNodeIds.has(n.id));
    if (unreachableNodes.length > 0) {
      errors.push(`${unreachableNodes.length} unreachable node(s) detected`);
    }

    return { isValid: errors.length === 0, errors };
  }, [state.nodes, state.edges]);

  const reset = useCallback(() => {
    setState({
      nodes: initialNodes,
      edges: initialEdges,
      selectedNodeId: null,
      selectedEdgeId: null,
      isDragging: false,
      zoom: 1,
      panOffset: { x: 0, y: 0 },
    });
  }, [initialNodes, initialEdges]);

  return {
    ...state,
    addNode,
    updateNode,
    removeNode,
    addEdge,
    removeEdge,
    selectNode,
    selectEdge,
    setDragging,
    setZoom,
    setPanOffset,
    onNodeDrag,
    validation,
    reset,
    selectedNode: state.selectedNodeId ? state.nodes.find((n) => n.id === state.selectedNodeId) ?? null : null,
    selectedEdge: state.selectedEdgeId ? state.edges.find((e) => e.id === state.selectedEdgeId) ?? null : null,
  };
}
