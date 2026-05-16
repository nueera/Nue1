// HostedPages Hooks — Zoho Billing
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { hostedPagesService } from './service';
import { hostedPagesKeys } from './query-keys';
import type { PaginatedRequest } from '../../../types/finance-common';
import type { HostedPage } from './types';

export function useHostedPagesList(params?: PaginatedRequest) {
  return useQuery({ queryKey: hostedPagesKeys.list((params || {}) as Record<string, unknown>), queryFn: () => hostedPagesService.getAll(params) });
}

export function useHostedPage(id: string) {
  return useQuery({ queryKey: hostedPagesKeys.detail(id), queryFn: () => hostedPagesService.getById(id), enabled: !!id });
}

