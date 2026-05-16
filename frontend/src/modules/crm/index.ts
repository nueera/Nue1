// ============================================================================
// CRM Module — Barrel Export
// ============================================================================

// Core
export * from './core';

// API
export { crmApiClient } from './api/client';

// Domains — Core CRM
export * as LeadsModule from './domains/leads';
export * as ContactsModule from './domains/contacts';
export * as AccountsModule from './domains/accounts';
export * as DealsModule from './domains/deals';

// Domains — Activities & Communication
export * as ActivitiesModule from './domains/activities';
export * as CalendarModule from './domains/calendar';
export * as EmailModule from './domains/email';
export * as SocialModule from './domains/social';
export * as SmsModule from './domains/sms';
export * as SalesIQModule from './domains/salesiq';
export * as OmniChannelModule from './domains/omni-channel';

// Domains — Sales Operations
export * as QuotesModule from './domains/quotes';
export * as SalesOrdersModule from './domains/sales-orders';
export * as InvoicesModule from './domains/invoices';
export * as PurchaseOrdersModule from './domains/purchase-orders';
export * as ProductsModule from './domains/products';
export * as PriceBooksModule from './domains/price-books';
export * as VendorsModule from './domains/vendors';
export * as CasesModule from './domains/cases';
export * as CPQModule from './domains/cpq';

// Domains — Automation & Process
export * as WorkflowsModule from './domains/workflows';
export * as BlueprintModule from './domains/blueprint';
export * as CadencesModule from './domains/cadences';
export * as PageLayoutsModule from './domains/page-layouts';
export * as JourneyOrchestrationModule from './domains/journey-orchestration';

// Domains — AI & Intelligence
export * as ZiaModule from './domains/zia';

// Domains — Territory & Team Management
export * as TerritoriesModule from './domains/territories';
export * as TeamsModule from './domains/teams';
export * as RolesProfilesModule from './domains/roles-profiles';

// Domains — Analytics & Reports
export * as ReportsModule from './domains/reports';
export * as DashboardsModule from './domains/dashboards';
export * as ForecastingModule from './domains/forecasting';
export * as CustomerAnalyticsModule from './domains/customer-analytics';
export * as PipelineAnalyticsModule from './domains/pipeline-analytics';

// Domains — Platform & Customization
export * as CustomModulesModule from './domains/custom-modules';
export * as CanvasModule from './domains/canvas';
export * as ClientScriptsModule from './domains/client-scripts';
export * as FunctionsModule from './domains/functions';
export * as WidgetsModule from './domains/widgets';
export * as ApisModule from './domains/apis';
export * as SandboxModule from './domains/sandbox';
export * as PortalsModule from './domains/portals';

// Domains — Shared Cross-Module
export * as NotesModule from './domains/notes';
export * as AttachmentsModule from './domains/attachments';
export * as TagsModule from './domains/tags';
export * as SearchModule from './domains/search';
export * as ImportModule from './domains/import';
export * as SettingsModule from './domains/settings';
export * as QuickCreateModule from './domains/quick-create';

// Convenience re-exports — Core CRM (most used)
export { useLeads, useLead, useCreateLead, useUpdateLead, useDeleteLead, useConvertLead, useLeadStats } from './domains/leads/hook';
export { leadService } from './domains/leads/service';

export { useContacts, useContact, useCreateContact, useUpdateContact, useDeleteContact, useMergeContacts } from './domains/contacts/hook';
export { contactService } from './domains/contacts/service';

export { useAccounts, useAccount, useCreateAccount, useUpdateAccount, useDeleteAccount, useAccountStats } from './domains/accounts/hook';
export { accountService } from './domains/accounts/service';

export { useDeals, useDeal, useCreateDeal, useUpdateDeal, useDeleteDeal, useDealPipeline, useMoveDealStage, useCloseDeal, useDealStats, useDealForecast } from './domains/deals/hook';
export { dealService } from './domains/deals/service';

// Mock Server
export { startCrmMockServer, stopCrmMockServer } from './data/mock/mock-handlers';
