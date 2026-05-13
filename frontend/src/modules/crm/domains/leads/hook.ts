import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { leadService } from "./service"; import { leadKeys } from "./query-keys"; import type { LeadConversionData } from "./types";
export function useLeads(params?: Record<string, string | number | boolean | undefined>) { return useQuery({ queryKey: leadKeys.list(params || {}), queryFn: () => leadService.getAll(params) }); }
export function useLead(id: string) { return useQuery({ queryKey: leadKeys.detail(id), queryFn: () => leadService.getById(id), enabled: !!id }); }
export function useCreateLead() { const qc = useQueryClient(); return useMutation({ mutationFn: leadService.create, onSuccess: () => { qc.invalidateQueries({ queryKey: leadKeys.all }); } }); }
export function useUpdateLead() { const qc = useQueryClient(); return useMutation({ mutationFn: ({ id, data }: { id: string; data: Partial<Lead> }) => leadService.update(id, data), onSuccess: () => { qc.invalidateQueries({ queryKey: leadKeys.all }); } }); }
export function useDeleteLead() { const qc = useQueryClient(); return useMutation({ mutationFn: leadService.delete, onSuccess: () => { qc.invalidateQueries({ queryKey: leadKeys.all }); } }); }
export function useConvertLead() { const qc = useQueryClient(); return useMutation({ mutationFn: ({ id, data }: { id: string; data: LeadConversionData }) => leadService.convertToContact(id, data), onSuccess: () => { qc.invalidateQueries({ queryKey: leadKeys.all }); } }); }
export function useLeadStats() { return useQuery({ queryKey: leadKeys.stats(), queryFn: () => leadService.getStats() }); }
export function useLeadDuplicates(email: string) { return useQuery({ queryKey: leadKeys.duplicates(), queryFn: () => leadService.duplicateCheck(email), enabled: !!email }); }
export function useMassUpdateLeads() { const qc = useQueryClient(); return useMutation({ mutationFn: ({ ids, data }: { ids: string[]; data: Partial<Lead> }) => leadService.massUpdate(ids, data), onSuccess: () => { qc.invalidateQueries({ queryKey: leadKeys.all }); } }); }
export function useImportLeads() { const qc = useQueryClient(); return useMutation({ mutationFn: leadService.importLeads, onSuccess: () => { qc.invalidateQueries({ queryKey: leadKeys.all }); } }); }
export function useExportLeads() { return useMutation({ mutationFn: leadService.exportLeads }); }