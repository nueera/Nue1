// @ts-nocheck
export * from './types';
export * from './constants';
export { customerKeys } from './query-keys';
export { customerService } from './service';
export { getCustomerStatusLabel, getCustomerStatusColor, formatCustomerOutstanding, formatCustomerRevenue, isCustomerActive, hasOverdueBalance, getCustomerDisplayName, getPrimaryContact, computeCustomerRisk } from './utils';
export { createCustomerSchema, updateCustomerSchema, customerStatementSchema, customerContactSchema, type CreateCustomerInput, type UpdateCustomerInput, type CustomerStatementInput, type CustomerContactInput } from './schema';
export { useCustomers, useCustomer, useCustomerTransactions, useCustomerStatement, useCreateCustomer, useUpdateCustomer, useDeleteCustomer, useSearchCustomers, useCustomerStats, useBulkDeleteCustomers, useExportCustomers } from './hook';
export * from './components';
