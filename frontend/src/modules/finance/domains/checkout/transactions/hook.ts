// Transactions Hooks — Zoho Checkout
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { transactionsService } from './service';
import { transactionsKeys } from './query-keys';
import type { PaginatedRequest } from '../../../types/finance-common';
import type { Transaction } from './types';

export function useTransactionsList(params?: PaginatedRequest) {
  return useQuery({ queryKey: transactionsKeys.list((params || {}) as Record<string, unknown>), queryFn: () => transactionsService.getAll(params) });
}

export function useTransaction(id: string) {
  return useQuery({ queryKey: transactionsKeys.detail(id), queryFn: () => transactionsService.getById(id), enabled: !!id });
}

export function useTransactionsStats() {
  return useQuery({ queryKey: transactionsKeys.stats(), queryFn: () => transactionsService.getStats() });
}

