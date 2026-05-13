// ============================================================================
// CRM Mock Data — Barrel Export
// ============================================================================

export * from './faker-setup';
export { leads, getLeadById, getLeadsByStatus, getLeadsBySource } from './leads-mock';
export { contacts, getContactById, getContactsByAccount } from './contacts-mock';
export { accounts, getAccountById } from './accounts-mock';
export { deals, getDealById, getDealsByStage, getDealsByAccount } from './deals-mock';
