// @ts-nocheck
export * from './types';
export * from './constants';
export { settingsKeys } from './query-keys';
export { settingsService } from './service';
export { getCRMSettingsLabel } from './utils';
export { createCRMSettingsSchema, updateCRMSettingsSchema, type CreateCRMSettingsInput, type UpdateCRMSettingsInput } from './schema';
export { useCRMSettingss, useCRMSettings, useCreateCRMSettings, useUpdateCRMSettings, useDeleteCRMSettings } from './hook';
export * from './components';