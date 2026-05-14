// @ts-nocheck
// Shipments Hooks — Zoho Inventory
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { shipmentsService } from './service';
import { shipmentsKeys } from './query-keys';
import type { PaginatedRequest } from '../../../types/finance-common';
import type { Shipment } from './types';

export function useShipmentsList(params?: PaginatedRequest) {
  return useQuery({ queryKey: shipmentsKeys.list((params || {}) as Record<string, unknown>), queryFn: () => shipmentsService.getAll(params) });
}

export function useShipment(id: string) {
  return useQuery({ queryKey: shipmentsKeys.detail(id), queryFn: () => shipmentsService.getById(id), enabled: !!id });
}

export function useCreateShipment() {
  const qc = useQueryClient();
  return useMutation({ mutationFn: shipmentsService.create, onSuccess: () => { qc.invalidateQueries({ queryKey: shipmentsKeys.all }); } });
}

export function useUpdateShipment() {
  const qc = useQueryClient();
  return useMutation({ mutationFn: ({ id, data }: { id: string; data: Partial<Shipment> }) => shipmentsService.update(id, data), onSuccess: () => { qc.invalidateQueries({ queryKey: shipmentsKeys.all }); } });
}

