import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { itemService } from './service';
import { itemKeys } from './query-keys';
import type { Item } from './types';

export function useItems(params?: Record<string, string | number | boolean | undefined>) {
  return useQuery({ queryKey: itemKeys.list(params || {}), queryFn: () => itemService.getAll(params) });
}

export function useItem(id: string) {
  return useQuery({ queryKey: itemKeys.detail(id), queryFn: () => itemService.getById(id), enabled: !!id });
}

export function useItemGroups() {
  return useQuery({ queryKey: itemKeys.groups(), queryFn: () => itemService.getGroups() });
}

export function useCreateItem() {
  const qc = useQueryClient();
  return useMutation({ mutationFn: itemService.create, onSuccess: () => { qc.invalidateQueries({ queryKey: itemKeys.all }); } });
}

export function useUpdateItem() {
  const qc = useQueryClient();
  return useMutation({ mutationFn: ({ id, data }: { id: string; data: Partial<Item> }) => itemService.update(id, data), onSuccess: () => { qc.invalidateQueries({ queryKey: itemKeys.all }); } });
}

export function useDeleteItem() {
  const qc = useQueryClient();
  return useMutation({ mutationFn: itemService.delete, onSuccess: () => { qc.invalidateQueries({ queryKey: itemKeys.all }); } });
}

export function useSearchItems(query: string) {
  return useQuery({ queryKey: itemKeys.search(query), queryFn: () => itemService.search(query), enabled: query.length >= 2 });
}
