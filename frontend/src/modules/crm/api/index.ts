// ============================================================================
// CRM API — Barrel Export
// ============================================================================

export { crmApiClient } from './client';

// Core CRM APIs
export { leadService } from '../domains/leads/service';
export { contactService } from '../domains/contacts/service';
export { accountService } from '../domains/accounts/service';
export { dealService } from '../domains/deals/service';

// Activities & Communication APIs
export { activitiesService } from '../domains/activities/service';
export { calendarService } from '../domains/calendar/service';
export { emailService } from '../domains/email/service';
export { socialService } from '../domains/social/service';
export { smsService } from '../domains/sms/service';
export { salesiqService } from '../domains/salesiq/service';
export { omniChannelService } from '../domains/omni-channel/service';

// Sales Operations APIs
export { quotesService } from '../domains/quotes/service';
export { salesOrdersService } from '../domains/sales-orders/service';
export { invoicesService } from '../domains/invoices/service';
export { purchaseOrdersService } from '../domains/purchase-orders/service';
export { productsService } from '../domains/products/service';
export { priceBooksService } from '../domains/price-books/service';
export { vendorsService } from '../domains/vendors/service';
export { casesService } from '../domains/cases/service';
export { cpqService } from '../domains/cpq/service';

// Automation & Process APIs
export { workflowsService } from '../domains/workflows/service';
export { blueprintService } from '../domains/blueprint/service';
export { cadencesService } from '../domains/cadences/service';
export { pageLayoutsService } from '../domains/page-layouts/service';
export { journeyService } from '../domains/journey-orchestration/service';

// AI & Intelligence APIs
export { ziaService } from '../domains/zia/service';

// Territory & Team APIs
export { territoriesService } from '../domains/territories/service';
export { teamsService } from '../domains/teams/service';
export { rolesService } from '../domains/roles-profiles/service';

// Analytics & Reports APIs
export { reportsService } from '../domains/reports/service';
export { dashboardsService } from '../domains/dashboards/service';
export { forecastingService } from '../domains/forecasting/service';
export { customerAnalyticsService } from '../domains/customer-analytics/service';
export { pipelineAnalyticsService } from '../domains/pipeline-analytics/service';

// Platform & Customization APIs
export { customModulesService } from '../domains/custom-modules/service';
export { canvasService } from '../domains/canvas/service';
export { clientScriptsService } from '../domains/client-scripts/service';
export { functionsService } from '../domains/functions/service';
export { widgetsService } from '../domains/widgets/service';
export { apisService } from '../domains/apis/service';
export { sandboxService } from '../domains/sandbox/service';
export { portalsService } from '../domains/portals/service';

// Shared Cross-Module APIs
export { notesService } from '../domains/notes/service';
export { attachmentsService } from '../domains/attachments/service';
export { tagsService } from '../domains/tags/service';
export { searchService } from '../domains/search/service';
export { importService } from '../domains/import/service';
export { settingsService } from '../domains/settings/service';
export { quickCreateService } from '../domains/quick-create/service';
