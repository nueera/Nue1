// @ts-nocheck
export * from './types';
export * from './constants';
export { territoriesKeys } from './query-keys';
export { territoriesService } from './service';
export { getTerritoryLabel } from './utils';
export { createTerritorySchema, updateTerritorySchema, type CreateTerritoryInput, type UpdateTerritoryInput } from './schema';
export { useTerritorys, useTerritory, useCreateTerritory, useUpdateTerritory, useDeleteTerritory } from './hook';
export * from './components';