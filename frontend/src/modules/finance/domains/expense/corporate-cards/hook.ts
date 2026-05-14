// @ts-nocheck
// Hooks — Auto-generated
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { corporateCardsService } from './service';
import { corporateCardsKeys } from './query-keys';

export function usecorporateCardsList(params?: Record<string, unknown>) {
  return useQuery({
    queryKey: [...corporateCardsKeys.all, 'list', params],
    queryFn: () => corporateCardsService.getAllCards(params),
  });
}
export function useCorporateCard(id: string) {
  return useQuery({
    queryKey: corporateCardsKeys.detail(id),
    queryFn: () => corporateCardsService.getCardById(id),
    enabled: !!id,
  });
}
export function useGetTransactions(linkId: string) {
  return useQuery({
    queryKey: [...corporateCardsKeys.all, 'getTransactions', linkId],
    queryFn: () => corporateCardsService.getTransactions(linkId),
    enabled: !!linkId,
  });
}
export function useAssignToUser() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (args: { cardId: string, userId: string }) => corporateCardsService.assignToUser(...Object.values(args)),
    onSuccess: () => { qc.invalidateQueries({ queryKey: corporateCardsKeys.all }); },
  });
}
