// @ts-nocheck
// ============================================================================
// CRM Module — Root Query-Key Factory
// ============================================================================

export const crmKeys = {
  all: ['crm'] as const,

  // Core CRM
  leads: {
    all: ['crm', 'leads'] as const,
    lists: () => [...crmKeys.leads.all, 'list'] as const,
    list: (filters: Record<string, unknown>) => [...crmKeys.leads.lists(), filters] as const,
    details: () => [...crmKeys.leads.all, 'detail'] as const,
    detail: (id: string) => [...crmKeys.leads.details(), id] as const,
    stats: () => [...crmKeys.leads.all, 'stats'] as const,
    activities: (id: string) => [...crmKeys.leads.detail(id), 'activities'] as const,
    duplicates: () => [...crmKeys.leads.all, 'duplicates'] as const,
  },

  contacts: {
    all: ['crm', 'contacts'] as const,
    lists: () => [...crmKeys.contacts.all, 'list'] as const,
    list: (filters: Record<string, unknown>) => [...crmKeys.contacts.lists(), filters] as const,
    details: () => [...crmKeys.contacts.all, 'detail'] as const,
    detail: (id: string) => [...crmKeys.contacts.details(), id] as const,
    stats: () => [...crmKeys.contacts.all, 'stats'] as const,
    hierarchy: (id: string) => [...crmKeys.contacts.detail(id), 'hierarchy'] as const,
    duplicates: () => [...crmKeys.contacts.all, 'duplicates'] as const,
  },

  accounts: {
    all: ['crm', 'accounts'] as const,
    lists: () => [...crmKeys.accounts.all, 'list'] as const,
    list: (filters: Record<string, unknown>) => [...crmKeys.accounts.lists(), filters] as const,
    details: () => [...crmKeys.accounts.all, 'detail'] as const,
    detail: (id: string) => [...crmKeys.accounts.details(), id] as const,
    stats: () => [...crmKeys.accounts.all, 'stats'] as const,
    hierarchy: (id: string) => [...crmKeys.accounts.detail(id), 'hierarchy'] as const,
    duplicates: () => [...crmKeys.accounts.all, 'duplicates'] as const,
  },

  deals: {
    all: ['crm', 'deals'] as const,
    lists: () => [...crmKeys.deals.all, 'list'] as const,
    list: (filters: Record<string, unknown>) => [...crmKeys.deals.lists(), filters] as const,
    details: () => [...crmKeys.deals.all, 'detail'] as const,
    detail: (id: string) => [...crmKeys.deals.details(), id] as const,
    pipeline: () => [...crmKeys.deals.all, 'pipeline'] as const,
    pipelineById: (id: string) => [...crmKeys.deals.pipeline(), id] as const,
    stats: () => [...crmKeys.deals.all, 'stats'] as const,
    forecast: () => [...crmKeys.deals.all, 'forecast'] as const,
    products: (id: string) => [...crmKeys.deals.detail(id), 'products'] as const,
    competitors: (id: string) => [...crmKeys.deals.detail(id), 'competitors'] as const,
  },

  activities: {
    all: ['crm', 'activities'] as const,
    lists: () => [...crmKeys.activities.all, 'list'] as const,
    list: (filters: Record<string, unknown>) => [...crmKeys.activities.lists(), filters] as const,
    tasks: (filters: Record<string, unknown>) => [...crmKeys.activities.all, 'tasks', filters] as const,
    events: (filters: Record<string, unknown>) => [...crmKeys.activities.all, 'events', filters] as const,
    calls: (filters: Record<string, unknown>) => [...crmKeys.activities.all, 'calls', filters] as const,
    details: () => [...crmKeys.activities.all, 'detail'] as const,
    detail: (id: string) => [...crmKeys.activities.details(), id] as const,
    stats: () => [...crmKeys.activities.all, 'stats'] as const,
    overdue: () => [...crmKeys.activities.all, 'overdue'] as const,
  },

  quotes: {
    all: ['crm', 'quotes'] as const,
    lists: () => [...crmKeys.quotes.all, 'list'] as const,
    list: (filters: Record<string, unknown>) => [...crmKeys.quotes.lists(), filters] as const,
    details: () => [...crmKeys.quotes.all, 'detail'] as const,
    detail: (id: string) => [...crmKeys.quotes.details(), id] as const,
    stats: () => [...crmKeys.quotes.all, 'stats'] as const,
    approvals: (id: string) => [...crmKeys.quotes.detail(id), 'approvals'] as const,
  },

  salesOrders: {
    all: ['crm', 'sales-orders'] as const,
    lists: () => [...crmKeys.salesOrders.all, 'list'] as const,
    list: (filters: Record<string, unknown>) => [...crmKeys.salesOrders.lists(), filters] as const,
    details: () => [...crmKeys.salesOrders.all, 'detail'] as const,
    detail: (id: string) => [...crmKeys.salesOrders.details(), id] as const,
    stats: () => [...crmKeys.salesOrders.all, 'stats'] as const,
  },

  invoices: {
    all: ['crm', 'invoices'] as const,
    lists: () => [...crmKeys.invoices.all, 'list'] as const,
    list: (filters: Record<string, unknown>) => [...crmKeys.invoices.lists(), filters] as const,
    details: () => [...crmKeys.invoices.all, 'detail'] as const,
    detail: (id: string) => [...crmKeys.invoices.details(), id] as const,
    payments: (id: string) => [...crmKeys.invoices.detail(id), 'payments'] as const,
    stats: () => [...crmKeys.invoices.all, 'stats'] as const,
  },

  purchaseOrders: {
    all: ['crm', 'purchase-orders'] as const,
    lists: () => [...crmKeys.purchaseOrders.all, 'list'] as const,
    list: (filters: Record<string, unknown>) => [...crmKeys.purchaseOrders.lists(), filters] as const,
    details: () => [...crmKeys.purchaseOrders.all, 'detail'] as const,
    detail: (id: string) => [...crmKeys.purchaseOrders.details(), id] as const,
    receipts: (id: string) => [...crmKeys.purchaseOrders.detail(id), 'receipts'] as const,
    stats: () => [...crmKeys.purchaseOrders.all, 'stats'] as const,
  },

  products: {
    all: ['crm', 'products'] as const,
    lists: () => [...crmKeys.products.all, 'list'] as const,
    list: (filters: Record<string, unknown>) => [...crmKeys.products.lists(), filters] as const,
    details: () => [...crmKeys.products.all, 'detail'] as const,
    detail: (id: string) => [...crmKeys.products.details(), id] as const,
    pricing: (id: string) => [...crmKeys.products.detail(id), 'pricing'] as const,
    inventory: (id: string) => [...crmKeys.products.detail(id), 'inventory'] as const,
    stats: () => [...crmKeys.products.all, 'stats'] as const,
  },

  priceBooks: {
    all: ['crm', 'price-books'] as const,
    lists: () => [...crmKeys.priceBooks.all, 'list'] as const,
    list: (filters: Record<string, unknown>) => [...crmKeys.priceBooks.lists(), filters] as const,
    details: () => [...crmKeys.priceBooks.all, 'detail'] as const,
    detail: (id: string) => [...crmKeys.priceBooks.details(), id] as const,
    entries: (id: string) => [...crmKeys.priceBooks.detail(id), 'entries'] as const,
    tiers: (id: string) => [...crmKeys.priceBooks.detail(id), 'tiers'] as const,
  },

  vendors: {
    all: ['crm', 'vendors'] as const,
    lists: () => [...crmKeys.vendors.all, 'list'] as const,
    list: (filters: Record<string, unknown>) => [...crmKeys.vendors.lists(), filters] as const,
    details: () => [...crmKeys.vendors.all, 'detail'] as const,
    detail: (id: string) => [...crmKeys.vendors.details(), id] as const,
    products: (id: string) => [...crmKeys.vendors.detail(id), 'products'] as const,
    stats: () => [...crmKeys.vendors.all, 'stats'] as const,
  },

  cases: {
    all: ['crm', 'cases'] as const,
    lists: () => [...crmKeys.cases.all, 'list'] as const,
    list: (filters: Record<string, unknown>) => [...crmKeys.cases.lists(), filters] as const,
    details: () => [...crmKeys.cases.all, 'detail'] as const,
    detail: (id: string) => [...crmKeys.cases.details(), id] as const,
    stats: () => [...crmKeys.cases.all, 'stats'] as const,
    sla: (id: string) => [...crmKeys.cases.detail(id), 'sla'] as const,
    escalations: () => [...crmKeys.cases.all, 'escalations'] as const,
  },

  cpq: {
    all: ['crm', 'cpq'] as const,
    config: () => [...crmKeys.cpq.all, 'config'] as const,
    productRules: (filters: Record<string, unknown>) => [...crmKeys.cpq.all, 'productRules', filters] as const,
    pricingRules: (filters: Record<string, unknown>) => [...crmKeys.cpq.all, 'pricingRules', filters] as const,
    discountRules: (filters: Record<string, unknown>) => [...crmKeys.cpq.all, 'discountRules', filters] as const,
    bundles: (filters: Record<string, unknown>) => [...crmKeys.cpq.all, 'bundles', filters] as const,
  },

  workflows: {
    all: ['crm', 'workflows'] as const,
    lists: () => [...crmKeys.workflows.all, 'list'] as const,
    list: (filters: Record<string, unknown>) => [...crmKeys.workflows.lists(), filters] as const,
    details: () => [...crmKeys.workflows.all, 'detail'] as const,
    detail: (id: string) => [...crmKeys.workflows.details(), id] as const,
    executions: (id: string) => [...crmKeys.workflows.detail(id), 'executions'] as const,
    logs: (id: string) => [...crmKeys.workflows.detail(id), 'logs'] as const,
  },

  blueprint: {
    all: ['crm', 'blueprint'] as const,
    lists: () => [...crmKeys.blueprint.all, 'list'] as const,
    list: (filters: Record<string, unknown>) => [...crmKeys.blueprint.lists(), filters] as const,
    details: () => [...crmKeys.blueprint.all, 'detail'] as const,
    detail: (id: string) => [...crmKeys.blueprint.details(), id] as const,
    states: (id: string) => [...crmKeys.blueprint.detail(id), 'states'] as const,
    executions: (id: string) => [...crmKeys.blueprint.detail(id), 'executions'] as const,
  },

  cadences: {
    all: ['crm', 'cadences'] as const,
    lists: () => [...crmKeys.cadences.all, 'list'] as const,
    list: (filters: Record<string, unknown>) => [...crmKeys.cadences.lists(), filters] as const,
    details: () => [...crmKeys.cadences.all, 'detail'] as const,
    detail: (id: string) => [...crmKeys.cadences.details(), id] as const,
    executions: (id: string) => [...crmKeys.cadences.detail(id), 'executions'] as const,
    results: (id: string) => [...crmKeys.cadences.detail(id), 'results'] as const,
  },

  pageLayouts: {
    all: ['crm', 'page-layouts'] as const,
    lists: () => [...crmKeys.pageLayouts.all, 'list'] as const,
    list: (filters: Record<string, unknown>) => [...crmKeys.pageLayouts.lists(), filters] as const,
    details: () => [...crmKeys.pageLayouts.all, 'detail'] as const,
    detail: (id: string) => [...crmKeys.pageLayouts.details(), id] as const,
    fields: (id: string) => [...crmKeys.pageLayouts.detail(id), 'fields'] as const,
  },

  journey: {
    all: ['crm', 'journey'] as const,
    lists: () => [...crmKeys.journey.all, 'list'] as const,
    list: (filters: Record<string, unknown>) => [...crmKeys.journey.lists(), filters] as const,
    details: () => [...crmKeys.journey.all, 'detail'] as const,
    detail: (id: string) => [...crmKeys.journey.details(), id] as const,
    nodes: (id: string) => [...crmKeys.journey.detail(id), 'nodes'] as const,
    stats: (id: string) => [...crmKeys.journey.detail(id), 'stats'] as const,
  },

  zia: {
    all: ['crm', 'zia'] as const,
    config: () => [...crmKeys.zia.all, 'config'] as const,
    agents: () => [...crmKeys.zia.all, 'agents'] as const,
    predictions: (filters: Record<string, unknown>) => [...crmKeys.zia.all, 'predictions', filters] as const,
    forecasts: (filters: Record<string, unknown>) => [...crmKeys.zia.all, 'forecasts', filters] as const,
    recommendations: (filters: Record<string, unknown>) => [...crmKeys.zia.all, 'recommendations', filters] as const,
    enrichment: (filters: Record<string, unknown>) => [...crmKeys.zia.all, 'enrichment', filters] as const,
    anomalies: (filters: Record<string, unknown>) => [...crmKeys.zia.all, 'anomalies', filters] as const,
    bi: (filters: Record<string, unknown>) => [...crmKeys.zia.all, 'bi', filters] as const,
    voiceOfCustomer: (filters: Record<string, unknown>) => [...crmKeys.zia.all, 'voiceOfCustomer', filters] as const,
    customAI: (filters: Record<string, unknown>) => [...crmKeys.zia.all, 'customAI', filters] as const,
  },

  territories: {
    all: ['crm', 'territories'] as const,
    lists: () => [...crmKeys.territories.all, 'list'] as const,
    list: (filters: Record<string, unknown>) => [...crmKeys.territories.lists(), filters] as const,
    details: () => [...crmKeys.territories.all, 'detail'] as const,
    detail: (id: string) => [...crmKeys.territories.details(), id] as const,
    members: (id: string) => [...crmKeys.territories.detail(id), 'members'] as const,
    rules: (id: string) => [...crmKeys.territories.detail(id), 'rules'] as const,
    hierarchy: () => [...crmKeys.territories.all, 'hierarchy'] as const,
  },

  teams: {
    all: ['crm', 'teams'] as const,
    lists: () => [...crmKeys.teams.all, 'list'] as const,
    list: (filters: Record<string, unknown>) => [...crmKeys.teams.lists(), filters] as const,
    details: () => [...crmKeys.teams.all, 'detail'] as const,
    detail: (id: string) => [...crmKeys.teams.details(), id] as const,
    members: (id: string) => [...crmKeys.teams.detail(id), 'members'] as const,
    sharingRules: (id: string) => [...crmKeys.teams.detail(id), 'sharingRules'] as const,
  },

  roles: {
    all: ['crm', 'roles'] as const,
    lists: () => [...crmKeys.roles.all, 'list'] as const,
    list: (filters: Record<string, unknown>) => [...crmKeys.roles.lists(), filters] as const,
    details: () => [...crmKeys.roles.all, 'detail'] as const,
    detail: (id: string) => [...crmKeys.roles.details(), id] as const,
  },

  profiles: {
    all: ['crm', 'profiles'] as const,
    lists: () => [...crmKeys.profiles.all, 'list'] as const,
    list: (filters: Record<string, unknown>) => [...crmKeys.profiles.lists(), filters] as const,
    details: () => [...crmKeys.profiles.all, 'detail'] as const,
    detail: (id: string) => [...crmKeys.profiles.details(), id] as const,
    permissions: (id: string) => [...crmKeys.profiles.detail(id), 'permissions'] as const,
  },

  reports: {
    all: ['crm', 'reports'] as const,
    lists: () => [...crmKeys.reports.all, 'list'] as const,
    list: (filters: Record<string, unknown>) => [...crmKeys.reports.lists(), filters] as const,
    details: () => [...crmKeys.reports.all, 'detail'] as const,
    detail: (id: string) => [...crmKeys.reports.details(), id] as const,
    data: (id: string) => [...crmKeys.reports.detail(id), 'data'] as const,
    charts: (id: string) => [...crmKeys.reports.detail(id), 'charts'] as const,
    schedules: () => [...crmKeys.reports.all, 'schedules'] as const,
  },

  dashboards: {
    all: ['crm', 'dashboards'] as const,
    lists: () => [...crmKeys.dashboards.all, 'list'] as const,
    list: (filters: Record<string, unknown>) => [...crmKeys.dashboards.lists(), filters] as const,
    details: () => [...crmKeys.dashboards.all, 'detail'] as const,
    detail: (id: string) => [...crmKeys.dashboards.details(), id] as const,
    widgets: (id: string) => [...crmKeys.dashboards.detail(id), 'widgets'] as const,
    filters: (id: string) => [...crmKeys.dashboards.detail(id), 'filters'] as const,
  },

  forecasting: {
    all: ['crm', 'forecasting'] as const,
    periods: (filters: Record<string, unknown>) => [...crmKeys.forecasting.all, 'periods', filters] as const,
    targets: (filters: Record<string, unknown>) => [...crmKeys.forecasting.all, 'targets', filters] as const,
    adjustments: (filters: Record<string, unknown>) => [...crmKeys.forecasting.all, 'adjustments', filters] as const,
    history: (filters: Record<string, unknown>) => [...crmKeys.forecasting.all, 'history', filters] as const,
    rollup: (filters: Record<string, unknown>) => [...crmKeys.forecasting.all, 'rollup', filters] as const,
  },

  customerAnalytics: {
    all: ['crm', 'customer-analytics'] as const,
    segments: (filters: Record<string, unknown>) => [...crmKeys.customerAnalytics.all, 'segments', filters] as const,
    lifecycle: (filters: Record<string, unknown>) => [...crmKeys.customerAnalytics.all, 'lifecycle', filters] as const,
    churn: (filters: Record<string, unknown>) => [...crmKeys.customerAnalytics.all, 'churn', filters] as const,
    health: (filters: Record<string, unknown>) => [...crmKeys.customerAnalytics.all, 'health', filters] as const,
    engagement: (filters: Record<string, unknown>) => [...crmKeys.customerAnalytics.all, 'engagement', filters] as const,
  },

  pipelineAnalytics: {
    all: ['crm', 'pipeline-analytics'] as const,
    snapshots: (filters: Record<string, unknown>) => [...crmKeys.pipelineAnalytics.all, 'snapshots', filters] as const,
    velocity: (filters: Record<string, unknown>) => [...crmKeys.pipelineAnalytics.all, 'velocity', filters] as const,
    conversion: (filters: Record<string, unknown>) => [...crmKeys.pipelineAnalytics.all, 'conversion', filters] as const,
    aging: (filters: Record<string, unknown>) => [...crmKeys.pipelineAnalytics.all, 'aging', filters] as const,
    sourceMetrics: (filters: Record<string, unknown>) => [...crmKeys.pipelineAnalytics.all, 'sourceMetrics', filters] as const,
  },

  customModules: {
    all: ['crm', 'custom-modules'] as const,
    lists: () => [...crmKeys.customModules.all, 'list'] as const,
    list: (filters: Record<string, unknown>) => [...crmKeys.customModules.lists(), filters] as const,
    details: () => [...crmKeys.customModules.all, 'detail'] as const,
    detail: (id: string) => [...crmKeys.customModules.details(), id] as const,
    fields: (id: string) => [...crmKeys.customModules.detail(id), 'fields'] as const,
    records: (id: string, filters: Record<string, unknown>) => [...crmKeys.customModules.detail(id), 'records', filters] as const,
    relations: (id: string) => [...crmKeys.customModules.detail(id), 'relations'] as const,
  },

  canvas: {
    all: ['crm', 'canvas'] as const,
    templates: (filters: Record<string, unknown>) => [...crmKeys.canvas.all, 'templates', filters] as const,
    detail: (id: string) => [...crmKeys.canvas.all, 'detail', id] as const,
    components: (id: string) => [...crmKeys.canvas.detail(id), 'components'] as const,
    bindings: (id: string) => [...crmKeys.canvas.detail(id), 'bindings'] as const,
  },

  clientScripts: {
    all: ['crm', 'client-scripts'] as const,
    lists: () => [...crmKeys.clientScripts.all, 'list'] as const,
    list: (filters: Record<string, unknown>) => [...crmKeys.clientScripts.lists(), filters] as const,
    details: () => [...crmKeys.clientScripts.all, 'detail'] as const,
    detail: (id: string) => [...crmKeys.clientScripts.details(), id] as const,
    logs: (id: string) => [...crmKeys.clientScripts.detail(id), 'logs'] as const,
  },

  functions: {
    all: ['crm', 'functions'] as const,
    lists: () => [...crmKeys.functions.all, 'list'] as const,
    list: (filters: Record<string, unknown>) => [...crmKeys.functions.lists(), filters] as const,
    details: () => [...crmKeys.functions.all, 'detail'] as const,
    detail: (id: string) => [...crmKeys.functions.details(), id] as const,
    executions: (id: string) => [...crmKeys.functions.detail(id), 'executions'] as const,
    logs: (id: string) => [...crmKeys.functions.detail(id), 'logs'] as const,
  },

  widgets: {
    all: ['crm', 'widgets'] as const,
    lists: () => [...crmKeys.widgets.all, 'list'] as const,
    list: (filters: Record<string, unknown>) => [...crmKeys.widgets.lists(), filters] as const,
    details: () => [...crmKeys.widgets.all, 'detail'] as const,
    detail: (id: string) => [...crmKeys.widgets.details(), id] as const,
    config: (id: string) => [...crmKeys.widgets.detail(id), 'config'] as const,
  },

  apis: {
    all: ['crm', 'apis'] as const,
    endpoints: () => [...crmKeys.apis.all, 'endpoints'] as const,
    keys: () => [...crmKeys.apis.all, 'keys'] as const,
    usage: (filters: Record<string, unknown>) => [...crmKeys.apis.all, 'usage', filters] as const,
    webhooks: () => [...crmKeys.apis.all, 'webhooks'] as const,
    auditLogs: (filters: Record<string, unknown>) => [...crmKeys.apis.all, 'auditLogs', filters] as const,
  },

  sandbox: {
    all: ['crm', 'sandbox'] as const,
    lists: () => [...crmKeys.sandbox.all, 'list'] as const,
    detail: (id: string) => [...crmKeys.sandbox.all, 'detail', id] as const,
    changes: (id: string) => [...crmKeys.sandbox.detail(id), 'changes'] as const,
  },

  portals: {
    all: ['crm', 'portals'] as const,
    lists: () => [...crmKeys.portals.all, 'list'] as const,
    list: (filters: Record<string, unknown>) => [...crmKeys.portals.lists(), filters] as const,
    details: () => [...crmKeys.portals.all, 'detail'] as const,
    detail: (id: string) => [...crmKeys.portals.details(), id] as const,
    users: (id: string) => [...crmKeys.portals.detail(id), 'users'] as const,
    config: (id: string) => [...crmKeys.portals.detail(id), 'config'] as const,
  },

  calendar: {
    all: ['crm', 'calendar'] as const,
    events: (filters: Record<string, unknown>) => [...crmKeys.calendar.all, 'events', filters] as const,
    slots: (filters: Record<string, unknown>) => [...crmKeys.calendar.all, 'slots', filters] as const,
    workingHours: () => [...crmKeys.calendar.all, 'workingHours'] as const,
    holidays: () => [...crmKeys.calendar.all, 'holidays'] as const,
  },

  email: {
    all: ['crm', 'email'] as const,
    messages: (filters: Record<string, unknown>) => [...crmKeys.email.all, 'messages', filters] as const,
    templates: (filters: Record<string, unknown>) => [...crmKeys.email.all, 'templates', filters] as const,
    folders: () => [...crmKeys.email.all, 'folders'] as const,
    accounts: () => [...crmKeys.email.all, 'accounts'] as const,
    stats: () => [...crmKeys.email.all, 'stats'] as const,
    mailMerge: (filters: Record<string, unknown>) => [...crmKeys.email.all, 'mailMerge', filters] as const,
  },

  social: {
    all: ['crm', 'social'] as const,
    profiles: (filters: Record<string, unknown>) => [...crmKeys.social.all, 'profiles', filters] as const,
    posts: (filters: Record<string, unknown>) => [...crmKeys.social.all, 'posts', filters] as const,
    interactions: (filters: Record<string, unknown>) => [...crmKeys.social.all, 'interactions', filters] as const,
    monitoring: (filters: Record<string, unknown>) => [...crmKeys.social.all, 'monitoring', filters] as const,
  },

  sms: {
    all: ['crm', 'sms'] as const,
    messages: (filters: Record<string, unknown>) => [...crmKeys.sms.all, 'messages', filters] as const,
    conversations: (filters: Record<string, unknown>) => [...crmKeys.sms.all, 'conversations', filters] as const,
    templates: (filters: Record<string, unknown>) => [...crmKeys.sms.all, 'templates', filters] as const,
  },

  salesiq: {
    all: ['crm', 'salesiq'] as const,
    sessions: (filters: Record<string, unknown>) => [...crmKeys.salesiq.all, 'sessions', filters] as const,
    messages: (sessionId: string) => [...crmKeys.salesiq.all, 'messages', sessionId] as const,
    agents: () => [...crmKeys.salesiq.all, 'agents'] as const,
    visitors: (filters: Record<string, unknown>) => [...crmKeys.salesiq.all, 'visitors', filters] as const,
    stats: () => [...crmKeys.salesiq.all, 'stats'] as const,
  },

  omniChannel: {
    all: ['crm', 'omni-channel'] as const,
    config: () => [...crmKeys.omniChannel.all, 'config'] as const,
    queues: (filters: Record<string, unknown>) => [...crmKeys.omniChannel.all, 'queues', filters] as const,
    routing: () => [...crmKeys.omniChannel.all, 'routing'] as const,
    agents: () => [...crmKeys.omniChannel.all, 'agents'] as const,
    stats: () => [...crmKeys.omniChannel.all, 'stats'] as const,
  },

  notes: {
    all: ['crm', 'notes'] as const,
    lists: () => [...crmKeys.notes.all, 'list'] as const,
    byParent: (parentId: string) => [...crmKeys.notes.all, 'byParent', parentId] as const,
    details: () => [...crmKeys.notes.all, 'detail'] as const,
    detail: (id: string) => [...crmKeys.notes.details(), id] as const,
  },

  attachments: {
    all: ['crm', 'attachments'] as const,
    byParent: (parentId: string) => [...crmKeys.attachments.all, 'byParent', parentId] as const,
    detail: (id: string) => [...crmKeys.attachments.all, 'detail', id] as const,
  },

  tags: {
    all: ['crm', 'tags'] as const,
    lists: () => [...crmKeys.tags.all, 'list'] as const,
    list: (filters: Record<string, unknown>) => [...crmKeys.tags.lists(), filters] as const,
    detail: (id: string) => [...crmKeys.tags.all, 'detail', id] as const,
  },

  search: {
    all: ['crm', 'search'] as const,
    global: (query: string) => [...crmKeys.search.all, 'global', query] as const,
    suggestions: (query: string) => [...crmKeys.search.all, 'suggestions', query] as const,
    advanced: (filters: Record<string, unknown>) => [...crmKeys.search.all, 'advanced', filters] as const,
  },

  import: {
    all: ['crm', 'import'] as const,
    jobs: (filters: Record<string, unknown>) => [...crmKeys.import.all, 'jobs', filters] as const,
    detail: (id: string) => [...crmKeys.import.all, 'detail', id] as const,
    errors: (id: string) => [...crmKeys.import.detail(id), 'errors'] as const,
    summary: (id: string) => [...crmKeys.import.detail(id), 'summary'] as const,
  },

  settings: {
    all: ['crm', 'settings'] as const,
    general: () => [...crmKeys.settings.all, 'general'] as const,
    security: () => [...crmKeys.settings.all, 'security'] as const,
    dataAdmin: () => [...crmKeys.settings.all, 'dataAdmin'] as const,
    automation: () => [...crmKeys.settings.all, 'automation'] as const,
    marketplace: () => [...crmKeys.settings.all, 'marketplace'] as const,
    developer: () => [...crmKeys.settings.all, 'developer'] as const,
  },
} as const;
