// @ts-nocheck
// ============================================================================
// Workflow Service — CRUD + list, activate, deactivate, getLogs, duplicate
// ============================================================================

import { marketingApi } from '../api/client';
import { JOURNEYS_ENDPOINTS, AUTOMATION_ENDPOINTS } from '../api/endpoints';
import type { Workflow, WorkflowLog, ApiResponse, PaginatedResponse, PaginatedRequest } from '../types';

export interface CreateWorkflowInput {
  name: string;
  description?: string;
  trigger: Workflow['trigger'];
  triggerConfig?: Record<string, unknown>;
  conditions?: Workflow['conditions'];
  actions: Workflow['actions'];
}

export interface UpdateWorkflowInput extends Partial<CreateWorkflowInput> {}

export const workflowService = {
  list: async (params?: PaginatedRequest): Promise<PaginatedResponse<Workflow>> => {
    return marketingApi.getPaginated<Workflow>(AUTOMATION_ENDPOINTS.workflowList, params);
  },

  getById: async (id: string): Promise<ApiResponse<Workflow>> => {
    return marketingApi.get<Workflow>(AUTOMATION_ENDPOINTS.workflowDetail(id));
  },

  create: async (data: CreateWorkflowInput): Promise<ApiResponse<Workflow>> => {
    return marketingApi.post<Workflow>(AUTOMATION_ENDPOINTS.workflowList, data);
  },

  update: async (id: string, data: UpdateWorkflowInput): Promise<ApiResponse<Workflow>> => {
    return marketingApi.patch<Workflow>(AUTOMATION_ENDPOINTS.workflowDetail(id), data);
  },

  delete: async (id: string): Promise<ApiResponse<void>> => {
    return marketingApi.delete<void>(AUTOMATION_ENDPOINTS.workflowDetail(id));
  },

  activate: async (id: string): Promise<ApiResponse<Workflow>> => {
    return marketingApi.post<Workflow>(`${AUTOMATION_ENDPOINTS.workflowDetail(id)}/activate`);
  },

  deactivate: async (id: string): Promise<ApiResponse<Workflow>> => {
    return marketingApi.post<Workflow>(`${AUTOMATION_ENDPOINTS.workflowDetail(id)}/deactivate`);
  },

  getLogs: async (id: string, params?: PaginatedRequest): Promise<PaginatedResponse<WorkflowLog>> => {
    return marketingApi.getPaginated<WorkflowLog>(AUTOMATION_ENDPOINTS.workflowLogs(id), params);
  },

  duplicate: async (id: string): Promise<ApiResponse<Workflow>> => {
    return marketingApi.post<Workflow>(`${AUTOMATION_ENDPOINTS.workflowDetail(id)}/duplicate`);
  },
};
