export * from './types';
export * from './constants';
export { dealKeys as dealKeys } from './query-keys';
export { dealService } from './service';
export { computeWeightedPipeline } from './utils';
export { createDealSchema, updateDealSchema, dealStageChangeSchema, dealCloseSchema, dealProductSchema, dealMassUpdateSchema } from './schema';
export type { CreateDealInput, DealStageChangeInput, DealProductInput } from './schema';
export { useDeals, useDeal, useCreateDeal, useUpdateDeal, useDeleteDeal, useDealPipeline, useMoveDealStage, useCloseDeal, useDealStats, useDealForecast, useDealProducts, useMassUpdateDeals } from './hook';
export * from './components';