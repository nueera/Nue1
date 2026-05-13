// Employees Hooks — Zoho Payroll
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { employeesService } from './service';
import { employeesKeys } from './query-keys';
import type { PaginatedRequest } from '../../../types/finance-common';
import type { Employee } from './types';

export function useEmployeesList(params?: PaginatedRequest) {
  return useQuery({ queryKey: employeesKeys.list((params || {}) as Record<string, unknown>), queryFn: () => employeesService.getAll(params) });
}

export function useEmployee(id: string) {
  return useQuery({ queryKey: employeesKeys.detail(id), queryFn: () => employeesService.getById(id), enabled: !!id });
}

export function useCreateEmployee() {
  const qc = useQueryClient();
  return useMutation({ mutationFn: employeesService.create, onSuccess: () => { qc.invalidateQueries({ queryKey: employeesKeys.all }); } });
}

export function useUpdateEmployee() {
  const qc = useQueryClient();
  return useMutation({ mutationFn: ({ id, data }: { id: string; data: Partial<Employee> }) => employeesService.update(id, data), onSuccess: () => { qc.invalidateQueries({ queryKey: employeesKeys.all }); } });
}

export function useDeleteEmployee() {
  const qc = useQueryClient();
  return useMutation({ mutationFn: employeesService.delete, onSuccess: () => { qc.invalidateQueries({ queryKey: employeesKeys.all }); } });
}

