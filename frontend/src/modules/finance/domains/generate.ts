/**
 * Finance Domains Generator
 * Generates all domain directories with types, constants, services, hooks, and components.
 */
import { writeFileSync, mkdirSync } from 'fs';
import { join } from 'path';

const BASE = '/home/z/my-project/repo/frontend/src/modules/finance/domains';

// ─────────────────────────────────────────────────────────────────────────────
// DOMAIN DEFINITIONS
// ─────────────────────────────────────────────────────────────────────────────

interface SubDomain {
  name: string;
  hasListComponent?: boolean;
  hasSelectorComponent?: boolean;
  hasSearchBarComponent?: boolean;
  hasWizardComponent?: boolean;
  hasRendererComponent?: boolean;
  typesExtra?: string;
  constantsExtra?: string;
  serviceMethods?: string[];
  schemaExtra?: string;
  utilsExtra?: string;
  hookExtra?: string;
  listColumns?: string;
}

interface DomainConfig {
  name: string;
  label: string;
  subDomains: SubDomain[];
}

const domains: DomainConfig[] = [
  // ─── INVOICE ────────────────────────────────────────────────────────────
  {
    name: 'invoice',
    label: 'Zoho Invoice',
    subDomains: [
      {
        name: 'estimates',
        hasListComponent: true,
        typesExtra: `
export type EstimateType = 'detailed' | 'itemized' | 'service';
export interface Estimate {
  id: string;
  estimateNumber: string;
  customerId: string;
  customerName: string;
  lineItems: LineItem[];
  subtotal: Money;
  taxTotal: Money;
  total: Money;
  status: EstimateStatus;
  date: string;
  expiryDate: string;
  type: EstimateType;
  notes: string;
  templateId: string;
  createdAt: string;
  updatedAt: string;
}`,
        listColumns: `
    { accessorKey: 'estimateNumber', header: 'Estimate #' },
    { accessorKey: 'customerName', header: 'Customer' },
    {
      accessorKey: 'total', header: 'Total',
      cell: ({ getValue }) => {
        const m = getValue() as Money;
        return \`\${m.currency} \${m.amount.toLocaleString()}\`;
      },
    },
    {
      accessorKey: 'status', header: 'Status',
      cell: ({ getValue }) => {
        const s = getValue() as EstimateStatus;
        const c = ESTIMATE_STATUS_CONFIG[s];
        return <Badge variant={s === 'approved' ? 'default' : s === 'declined' ? 'destructive' : 'secondary'}>{c?.label ?? s}</Badge>;
      },
    },
    { accessorKey: 'date', header: 'Date' },
    { accessorKey: 'expiryDate', header: 'Expiry' },`,
        serviceMethods: ['getAll', 'getById', 'create', 'update', 'delete', 'convertToInvoice', 'send', 'markAsAccepted', 'markAsDeclined', 'getStats'],
        hookExtra: `
export function useConvertEstimate() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id }: { id: string }) => estimateService.convertToInvoice(id),
    onSuccess: () => { qc.invalidateQueries({ queryKey: estimateKeys.all }); },
  });
}
export function useSendEstimate() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id }: { id: string }) => estimateService.send(id),
    onSuccess: () => { qc.invalidateQueries({ queryKey: estimateKeys.all }); },
  });
}`,
        schemaExtra: `
export const createEstimateSchema = z.object({
  customerId: z.string().min(1, 'Customer is required'),
  lineItems: z.array(z.object({ item: z.string(), quantity: z.number().positive(), rate: z.number() })).min(1),
  date: z.string(),
  expiryDate: z.string(),
  notes: z.string().optional(),
});
export type CreateEstimateInput = z.infer<typeof createEstimateSchema>;
export const updateEstimateSchema = createEstimateSchema.partial();
export type UpdateEstimateInput = z.infer<typeof updateEstimateSchema>;`,
      },
      {
        name: 'invoices',
        hasListComponent: true,
        typesExtra: `
export interface Invoice {
  id: string;
  invoiceNumber: string;
  customerId: string;
  customerName: string;
  lineItems: LineItem[];
  subtotal: Money;
  taxTotal: Money;
  total: Money;
  status: InvoiceStatus;
  date: string;
  dueDate: string;
  paymentTermsId: string;
  notes: string;
  templateId: string;
  lastPaymentDate: string;
  balance: Money;
  createdAt: string;
  updatedAt: string;
}
export interface InvoicePayment {
  id: string;
  invoiceId: string;
  paymentId: string;
  amount: Money;
  date: string;
}`,
        listColumns: `
    { accessorKey: 'invoiceNumber', header: 'Invoice #' },
    { accessorKey: 'customerName', header: 'Customer' },
    {
      accessorKey: 'total', header: 'Total',
      cell: ({ getValue }) => {
        const m = getValue() as Money;
        return \`\${m.currency} \${m.amount.toLocaleString()}\`;
      },
    },
    {
      accessorKey: 'balance', header: 'Balance',
      cell: ({ getValue }) => {
        const m = getValue() as Money;
        return \`\${m.currency} \${m.amount.toLocaleString()}\`;
      },
    },
    {
      accessorKey: 'status', header: 'Status',
      cell: ({ getValue }) => {
        const s = getValue() as InvoiceStatus;
        const c = INVOICE_STATUS_CONFIG[s];
        return <Badge variant={s === 'paid' ? 'default' : s === 'overdue' ? 'destructive' : 'secondary'}>{c?.label ?? s}</Badge>;
      },
    },
    { accessorKey: 'date', header: 'Date' },
    { accessorKey: 'dueDate', header: 'Due Date' },`,
        serviceMethods: ['getAll', 'getById', 'create', 'update', 'delete', 'send', 'markAsPaid', 'void', 'recordPayment', 'getStats'],
        hookExtra: `
export function useSendInvoice() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id }: { id: string }) => invoiceService.send(id),
    onSuccess: () => { qc.invalidateQueries({ queryKey: invoiceKeys.all }); },
  });
}
export function useVoidInvoice() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id }: { id: string }) => invoiceService.void(id),
    onSuccess: () => { qc.invalidateQueries({ queryKey: invoiceKeys.all }); },
  });
}
export function useRecordPayment() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: { amount: number; date: string; method: string } }) => invoiceService.recordPayment(id, data),
    onSuccess: () => { qc.invalidateQueries({ queryKey: invoiceKeys.all }); },
  });
}`,
        schemaExtra: `
export const createInvoiceSchema = z.object({
  customerId: z.string().min(1, 'Customer is required'),
  lineItems: z.array(z.object({ item: z.string(), quantity: z.number().positive(), rate: z.number() })).min(1),
  date: z.string(),
  dueDate: z.string(),
  paymentTermsId: z.string().optional(),
  notes: z.string().optional(),
});
export type CreateInvoiceInput = z.infer<typeof createInvoiceSchema>;
export const updateInvoiceSchema = createInvoiceSchema.partial();
export type UpdateInvoiceInput = z.infer<typeof updateInvoiceSchema>;`,
      },
      {
        name: 'recurring',
        typesExtra: `
export type RecurringFrequency = 'weekly' | 'biweekly' | 'monthly' | 'quarterly' | 'semi_annually' | 'annually';
export type RecurringStatus = 'active' | 'paused' | 'expired' | 'cancelled';
export interface RecurringInvoice {
  id: string;
  profileName: string;
  customerId: string;
  customerName: string;
  frequency: RecurringFrequency;
  startDate: string;
  endDate: string;
  nextInvoiceDate: string;
  lastInvoiceDate: string;
  amount: Money;
  status: RecurringStatus;
  invoicesGenerated: number;
  createdAt: string;
}`,
        serviceMethods: ['getAll', 'getById', 'create', 'update', 'delete', 'pause', 'resume', 'stop'],
      },
      {
        name: 'credit-notes',
        typesExtra: `
export type CreditNoteStatus = 'open' | 'closed' | 'void';
export interface CreditNote {
  id: string;
  creditNoteNumber: string;
  customerId: string;
  customerName: string;
  invoiceId: string;
  amount: Money;
  status: CreditNoteStatus;
  date: string;
  reason: string;
  reference: string;
  createdAt: string;
}`,
        serviceMethods: ['getAll', 'getById', 'create', 'update', 'delete', 'applyToInvoice', 'refund', 'void'],
      },
      {
        name: 'payments',
        hasListComponent: true,
        typesExtra: `
export type PaymentMethod = 'credit_card' | 'bank_transfer' | 'check' | 'cash' | 'wire_transfer' | 'paypal' | 'stripe';
export interface Payment {
  id: string;
  paymentNumber: string;
  customerId: string;
  customerName: string;
  invoiceId: string;
  amount: Money;
  date: string;
  method: PaymentMethod;
  reference: string;
  status: PaymentStatus;
  gateway: string;
  createdAt: string;
}`,
        listColumns: `
    { accessorKey: 'paymentNumber', header: 'Payment #' },
    { accessorKey: 'customerName', header: 'Customer' },
    {
      accessorKey: 'amount', header: 'Amount',
      cell: ({ getValue }) => {
        const m = getValue() as Money;
        return \`\${m.currency} \${m.amount.toLocaleString()}\`;
      },
    },
    {
      accessorKey: 'status', header: 'Status',
      cell: ({ getValue }) => {
        const s = getValue() as PaymentStatus;
        const c = PAYMENT_STATUS_CONFIG[s];
        return <Badge variant={s === 'completed' ? 'default' : s === 'failed' ? 'destructive' : 'secondary'}>{c?.label ?? s}</Badge>;
      },
    },
    { accessorKey: 'method', header: 'Method' },
    { accessorKey: 'date', header: 'Date' },`,
        serviceMethods: ['getAll', 'getById', 'create', 'update', 'delete', 'refund', 'getStats'],
        schemaExtra: `
export const createPaymentSchema = z.object({
  customerId: z.string().min(1),
  amount: z.number().positive(),
  date: z.string(),
  method: z.enum(['credit_card','bank_transfer','check','cash','wire_transfer','paypal','stripe'] as const),
  reference: z.string().optional(),
});
export type CreatePaymentInput = z.infer<typeof createPaymentSchema>;`,
      },
      {
        name: 'projects',
        typesExtra: `
export type ProjectStatus = 'active' | 'completed' | 'on_hold' | 'cancelled';
export interface Project {
  id: string;
  name: string;
  customerId: string;
  customerName: string;
  description: string;
  status: ProjectStatus;
  budget: Money;
  spent: Money;
  startDate: string;
  endDate: string;
  progress: number;
  createdAt: string;
}`,
        serviceMethods: ['getAll', 'getById', 'create', 'update', 'delete', 'getTasks', 'getTimeEntries'],
      },
      {
        name: 'time-tracking',
        typesExtra: `
export interface TimeEntry {
  id: string;
  projectId: string;
  projectName: string;
  taskId: string;
  userId: string;
  userName: string;
  date: string;
  startTime: string;
  endTime: string;
  duration: number;
  description: string;
  billable: boolean;
  hourlyRate: Money;
  createdAt: string;
}
export interface TimerState {
  isRunning: boolean;
  startTime: string | null;
  projectId: string | null;
  taskId: string | null;
  elapsedSeconds: number;
}`,
        serviceMethods: ['getAll', 'getById', 'create', 'update', 'delete', 'startTimer', 'stopTimer', 'getTimerState'],
      },
      {
        name: 'customer-portal',
        typesExtra: `
export interface PortalPreference {
  id: string;
  organizationId: string;
  portalUrl: string;
  allowViewInvoices: boolean;
  allowMakePayments: boolean;
  allowDownload: boolean;
  customLogo: string;
  primaryColor: string;
  welcomeMessage: string;
  createdAt: string;
}
export interface PortalSession {
  id: string;
  contactId: string;
  token: string;
  expiresAt: string;
  lastAccessedAt: string;
}`,
        serviceMethods: ['getPreferences', 'updatePreferences', 'createSession', 'getSession', 'revokeSession'],
      },
    ],
  },

  // ─── BILLING ────────────────────────────────────────────────────────────
  {
    name: 'billing',
    label: 'Zoho Billing',
    subDomains: [
      {
        name: 'products',
        hasListComponent: true,
        typesExtra: `
export type BillingProductStatus = 'active' | 'archived';
export interface BillingProduct {
  id: string;
  name: string;
  description: string;
  status: BillingProductStatus;
  productType: 'goods' | 'service' | 'digital';
  sku: string;
  createdAt: string;
  updatedAt: string;
}`,
        listColumns: `
    { accessorKey: 'name', header: 'Product Name' },
    { accessorKey: 'sku', header: 'SKU' },
    { accessorKey: 'productType', header: 'Type' },
    {
      accessorKey: 'status', header: 'Status',
      cell: ({ getValue }) => {
        const s = getValue() as string;
        return <Badge variant={s === 'active' ? 'default' : 'secondary'}>{s}</Badge>;
      },
    },
    { accessorKey: 'description', header: 'Description' },`,
        serviceMethods: ['getAll', 'getById', 'create', 'update', 'delete', 'archive', 'getPlans'],
        schemaExtra: `
export const createProductSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  description: z.string().optional(),
  productType: z.enum(['goods','service','digital'] as const),
  sku: z.string().optional(),
});
export type CreateProductInput = z.infer<typeof createProductSchema>;`,
      },
      {
        name: 'plans',
        hasListComponent: true,
        typesExtra: `
export type PlanFrequency = 'monthly' | 'quarterly' | 'semi_annually' | 'annually';
export type PlanStatus = 'active' | 'archived';
export interface Plan {
  id: string;
  name: string;
  productId: string;
  productName: string;
  price: Money;
  frequency: PlanFrequency;
  trialDays: number;
  setupFee: Money;
  features: string[];
  status: PlanStatus;
  subscriberCount: number;
  createdAt: string;
}`,
        listColumns: `
    { accessorKey: 'name', header: 'Plan Name' },
    { accessorKey: 'productName', header: 'Product' },
    {
      accessorKey: 'price', header: 'Price',
      cell: ({ getValue }) => {
        const m = getValue() as Money;
        return \`\${m.currency} \${m.amount.toLocaleString()}\`;
      },
    },
    { accessorKey: 'frequency', header: 'Frequency' },
    { accessorKey: 'trialDays', header: 'Trial Days' },
    { accessorKey: 'subscriberCount', header: 'Subscribers' },
    {
      accessorKey: 'status', header: 'Status',
      cell: ({ getValue }) => {
        const s = getValue() as string;
        return <Badge variant={s === 'active' ? 'default' : 'secondary'}>{s}</Badge>;
      },
    },`,
        serviceMethods: ['getAll', 'getById', 'create', 'update', 'delete', 'archive', 'getSubscribers'],
        schemaExtra: `
export const createPlanSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  productId: z.string().min(1, 'Product is required'),
  price: z.number().positive(),
  frequency: z.enum(['monthly','quarterly','semi_annually','annually'] as const),
  trialDays: z.number().min(0).default(0),
  setupFee: z.number().min(0).default(0),
  features: z.array(z.string()).default([]),
});
export type CreatePlanInput = z.infer<typeof createPlanSchema>;`,
      },
      {
        name: 'addons',
        typesExtra: `
export type AddonType = 'recurring' | 'one_time';
export type AddonStatus = 'active' | 'archived';
export interface Addon {
  id: string;
  name: string;
  code: string;
  type: AddonType;
  price: Money;
  productIds: string[];
  status: AddonStatus;
  description: string;
  createdAt: string;
}`,
        serviceMethods: ['getAll', 'getById', 'create', 'update', 'delete', 'archive'],
      },
      {
        name: 'coupons',
        hasListComponent: true,
        typesExtra: `
export type CouponDiscountType = 'percentage' | 'flat';
export type CouponStatus = 'active' | 'expired' | 'disabled';
export interface Coupon {
  id: string;
  code: string;
  discountType: CouponDiscountType;
  discountValue: number;
  minPurchase: Money;
  maxRedemptions: number;
  usedCount: number;
  validFrom: string;
  validTo: string;
  status: CouponStatus;
  applicableProducts: string[];
  createdAt: string;
}`,
        listColumns: `
    { accessorKey: 'code', header: 'Code' },
    {
      accessorKey: 'discountValue', header: 'Discount',
      cell: ({ row }) => {
        const c = row.original;
        return c.discountType === 'percentage' ? \`\${c.discountValue}%\` : \`\${c.discountValue} flat\`;
      },
    },
    { accessorKey: 'maxRedemptions', header: 'Max Uses' },
    { accessorKey: 'usedCount', header: 'Used' },
    {
      accessorKey: 'status', header: 'Status',
      cell: ({ getValue }) => {
        const s = getValue() as CouponStatus;
        return <Badge variant={s === 'active' ? 'default' : s === 'expired' ? 'destructive' : 'secondary'}>{s}</Badge>;
      },
    },
    { accessorKey: 'validTo', header: 'Expires' },`,
        serviceMethods: ['getAll', 'getById', 'create', 'update', 'delete', 'disable', 'getStats'],
        schemaExtra: `
export const createCouponSchema = z.object({
  code: z.string().min(1, 'Code is required'),
  discountType: z.enum(['percentage','flat'] as const),
  discountValue: z.number().positive(),
  minPurchase: z.number().min(0).default(0),
  maxRedemptions: z.number().positive(),
  validFrom: z.string(),
  validTo: z.string(),
});
export type CreateCouponInput = z.infer<typeof createCouponSchema>;`,
      },
      {
        name: 'subscriptions',
        hasListComponent: true,
        typesExtra: `
export interface Subscription {
  id: string;
  customerId: string;
  customerName: string;
  planId: string;
  planName: string;
  amount: Money;
  frequency: PlanFrequency;
  startDate: string;
  nextBilling: string;
  status: SubscriptionStatus;
  trialEnd: string;
  couponId: string;
  addOns: { addonId: string; quantity: number }[];
  createdAt: string;
}`,
        listColumns: `
    { accessorKey: 'customerName', header: 'Customer' },
    { accessorKey: 'planName', header: 'Plan' },
    {
      accessorKey: 'amount', header: 'Amount',
      cell: ({ getValue }) => {
        const m = getValue() as Money;
        return \`\${m.currency} \${m.amount.toLocaleString()}\`;
      },
    },
    { accessorKey: 'frequency', header: 'Frequency' },
    {
      accessorKey: 'status', header: 'Status',
      cell: ({ getValue }) => {
        const s = getValue() as SubscriptionStatus;
        const c = SUBSCRIPTION_STATUS_CONFIG[s];
        return <Badge variant={s === 'live' ? 'default' : s === 'cancelled' ? 'destructive' : 'secondary'}>{c?.label ?? s}</Badge>;
      },
    },
    { accessorKey: 'nextBilling', header: 'Next Billing' },`,
        serviceMethods: ['getAll', 'getById', 'create', 'update', 'delete', 'pause', 'resume', 'cancel', 'changePlan', 'addAddon', 'removeAddon'],
        schemaExtra: `
export const createSubscriptionSchema = z.object({
  customerId: z.string().min(1, 'Customer is required'),
  planId: z.string().min(1, 'Plan is required'),
  startDate: z.string(),
  couponId: z.string().optional(),
});
export type CreateSubscriptionInput = z.infer<typeof createSubscriptionSchema>;`,
      },
      {
        name: 'dunning',
        typesExtra: `
export type DunningAction = 'send_reminder' | 'charge_late_fee' | 'suspend_subscription' | 'cancel_subscription';
export type DunningRuleStatus = 'active' | 'inactive';
export interface DunningRule {
  id: string;
  name: string;
  description: string;
  triggersAfterDays: number;
  action: DunningAction;
  templateId: string;
  status: DunningRuleStatus;
  order: number;
  createdAt: string;
}
export interface DunningEvent {
  id: string;
  subscriptionId: string;
  ruleId: string;
  action: DunningAction;
  triggeredAt: string;
  result: 'success' | 'failed';
  message: string;
}`,
        serviceMethods: ['getAllRules', 'getRuleById', 'createRule', 'updateRule', 'deleteRule', 'reorderRules', 'getEvents', 'retryEvent'],
      },
      {
        name: 'hosted-pages',
        typesExtra: `
export type HostedPageType = 'checkout' | 'portal' | 'update_payment';
export type HostedPageStatus = 'active' | 'expired' | 'used';
export interface HostedPage {
  id: string;
  type: HostedPageType;
  url: string;
  planId: string;
  planName: string;
  status: HostedPageStatus;
  expiresAt: string;
  createdAt: string;
  completedAt: string;
  subscriptionId: string;
}`,
        serviceMethods: ['getAll', 'getById', 'createCheckoutPage', 'createPortalPage', 'createUpdatePaymentPage', 'expire'],
      },
      {
        name: 'reports',
        typesExtra: `
export type ReportPeriod = 'daily' | 'weekly' | 'monthly' | 'quarterly' | 'annually';
export interface RevenueReport {
  id: string;
  period: ReportPeriod;
  startDate: string;
  endDate: string;
  mrr: Money;
  arr: Money;
  newSubscriptions: number;
  churnedSubscriptions: number;
  netNewMRR: Money;
  churnRate: number;
}
export interface SubscriptionMetrics {
  totalSubscribers: number;
  activeSubscribers: number;
  trialSubscribers: number;
  mrr: Money;
  arr: Money;
  arpu: Money;
  ltv: Money;
  churnRate: number;
}`,
        serviceMethods: ['getRevenueReport', 'getSubscriptionMetrics', 'getCohortAnalysis', 'getChurnAnalysis', 'getMRRBreakdown'],
      },
    ],
  },

  // ─── EXPENSE ────────────────────────────────────────────────────────────
  {
    name: 'expense',
    label: 'Zoho Expense',
    subDomains: [
      {
        name: 'expenses',
        hasListComponent: true,
        typesExtra: `
export interface Expense {
  id: string;
  description: string;
  category: string;
  amount: Money;
  date: string;
  vendor: string;
  status: ExpenseStatus;
  receipt: boolean;
  project: string;
  reportId: string;
  merchant: string;
  paymentMode: string;
  isBillable: boolean;
  createdAt: string;
  updatedAt: string;
}`,
        listColumns: `
    { accessorKey: 'description', header: 'Description' },
    {
      accessorKey: 'amount', header: 'Amount',
      cell: ({ getValue }) => {
        const m = getValue() as Money;
        return \`\${m.currency} \${m.amount.toLocaleString()}\`;
      },
    },
    { accessorKey: 'category', header: 'Category' },
    { accessorKey: 'vendor', header: 'Vendor' },
    {
      accessorKey: 'status', header: 'Status',
      cell: ({ getValue }) => {
        const s = getValue() as ExpenseStatus;
        const c = EXPENSE_STATUS_CONFIG[s];
        return <Badge variant={s === 'approved' || s === 'reimbursed' ? 'default' : s === 'rejected' ? 'destructive' : 'secondary'}>{c?.label ?? s}</Badge>;
      },
    },
    { accessorKey: 'date', header: 'Date' },
    {
      accessorKey: 'receipt', header: 'Receipt',
      cell: ({ getValue }) => getValue() ? <Badge variant='outline'>Yes</Badge> : <Badge variant='secondary'>No</Badge>,
    },`,
        serviceMethods: ['getAll', 'getById', 'create', 'update', 'delete', 'submit', 'approve', 'reject', 'getReceipt', 'uploadReceipt', 'getStats'],
        schemaExtra: `
export const createExpenseSchema = z.object({
  description: z.string().min(1, 'Description is required'),
  category: z.string().min(1, 'Category is required'),
  amount: z.number().positive(),
  date: z.string(),
  vendor: z.string().optional(),
  isBillable: z.boolean().default(true),
});
export type CreateExpenseInput = z.infer<typeof createExpenseSchema>;`,
      },
      {
        name: 'expense-reports',
        hasListComponent: true,
        typesExtra: `
export type ExpenseReportStatus = 'draft' | 'submitted' | 'approved' | 'rejected' | 'reimbursed';
export interface ExpenseReport {
  id: string;
  reportNumber: string;
  title: string;
  submittedBy: string;
  submittedByName: string;
  totalAmount: Money;
  expenseCount: number;
  status: ExpenseReportStatus;
  submittedAt: string;
  approvedAt: string;
  reimbursedAt: string;
  policyId: string;
  createdAt: string;
}`,
        listColumns: `
    { accessorKey: 'reportNumber', header: 'Report #' },
    { accessorKey: 'title', header: 'Title' },
    { accessorKey: 'submittedByName', header: 'Submitted By' },
    {
      accessorKey: 'totalAmount', header: 'Total',
      cell: ({ getValue }) => {
        const m = getValue() as Money;
        return \`\${m.currency} \${m.amount.toLocaleString()}\`;
      },
    },
    { accessorKey: 'expenseCount', header: 'Expenses' },
    {
      accessorKey: 'status', header: 'Status',
      cell: ({ getValue }) => {
        const s = getValue() as string;
        return <Badge variant={s === 'approved' || s === 'reimbursed' ? 'default' : s === 'rejected' ? 'destructive' : 'secondary'}>{s}</Badge>;
      },
    },
    { accessorKey: 'submittedAt', header: 'Submitted' },`,
        serviceMethods: ['getAll', 'getById', 'create', 'update', 'delete', 'submit', 'approve', 'reject', 'reimburse', 'getExpenses'],
        schemaExtra: `
export const createExpenseReportSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  policyId: z.string().optional(),
});
export type CreateExpenseReportInput = z.infer<typeof createExpenseReportSchema>;`,
      },
      {
        name: 'trips',
        typesExtra: `
export type TripStatus = 'planned' | 'in_progress' | 'completed' | 'cancelled';
export interface Trip {
  id: string;
  name: string;
  destination: string;
  startDate: string;
  endDate: string;
  purpose: string;
  status: TripStatus;
  totalExpenses: Money;
  budget: Money;
  userId: string;
  userName: string;
  itinerary: { date: string; location: string; notes: string }[];
  createdAt: string;
}`,
        serviceMethods: ['getAll', 'getById', 'create', 'update', 'delete', 'addItinerary', 'getExpenses', 'complete'],
      },
      {
        name: 'per-diem',
        typesExtra: `
export interface PerDiemRate {
  id: string;
  destination: string;
  country: string;
  accommodationRate: Money;
  mealsRate: Money;
  incidentalsRate: Money;
  totalDailyRate: Money;
  effectiveFrom: string;
  effectiveTo: string;
  isActive: boolean;
}
export interface PerDiemEntry {
  id: string;
  tripId: string;
  date: string;
  destination: string;
  rateId: string;
  meals: number;
  accommodation: number;
  incidentals: number;
  total: Money;
}`,
        serviceMethods: ['getAllRates', 'getRateById', 'createRate', 'updateRate', 'deleteRate', 'getEntries', 'createEntry'],
      },
      {
        name: 'mileage',
        typesExtra: `
export type MileageType = 'round_trip' | 'one_way';
export interface MileageRate {
  id: string;
  vehicleType: string;
  ratePerUnit: Money;
  unit: 'mile' | 'km';
  effectiveFrom: string;
  isActive: boolean;
}
export interface MileageEntry {
  id: string;
  date: string;
  fromLocation: string;
  toLocation: string;
  distance: number;
  unit: 'mile' | 'km';
  type: MileageType;
  rateId: string;
  amount: Money;
  userId: string;
  vehicleType: string;
  createdAt: string;
}`,
        serviceMethods: ['getAllRates', 'createRate', 'updateRate', 'getEntries', 'createEntry', 'updateEntry', 'deleteEntry'],
      },
      {
        name: 'corporate-cards',
        typesExtra: `
export type CardStatus = 'active' | 'blocked' | 'cancelled' | 'expired';
export interface CorporateCard {
  id: string;
  cardNumber: string;
  cardholderName: string;
  userId: string;
  userName: string;
  limit: Money;
  spent: Money;
  available: Money;
  status: CardStatus;
  expiryDate: string;
  lastTransactionDate: string;
  issuedAt: string;
}
export interface CardTransaction {
  id: string;
  cardId: string;
  amount: Money;
  merchant: string;
  category: string;
  date: string;
  status: 'posted' | 'pending';
  expenseId: string;
}`,
        serviceMethods: ['getAllCards', 'getCardById', 'blockCard', 'unblockCard', 'cancelCard', 'getTransactions', 'assignToUser'],
      },
      {
        name: 'advances',
        typesExtra: `
export type AdvanceStatus = 'pending' | 'approved' | 'partially_used' | 'used' | 'returned' | 'rejected';
export interface Advance {
  id: string;
  requestNumber: string;
  userId: string;
  userName: string;
  amount: Money;
  used: Money;
  returned: Money;
  balance: Money;
  status: AdvanceStatus;
  purpose: string;
  requestedAt: string;
  approvedAt: string;
  dueDate: string;
}`,
        serviceMethods: ['getAll', 'getById', 'create', 'approve', 'reject', 'recordUsage', 'recordReturn', 'getStats'],
      },
      {
        name: 'petty-cash',
        typesExtra: `
export type PettyCashStatus = 'active' | 'closed';
export interface PettyCashFund {
  id: string;
  name: string;
  custodian: string;
  custodianName: string;
  balance: Money;
  initialAmount: Money;
  status: PettyCashStatus;
  lastReplenished: string;
  createdAt: string;
}
export interface PettyCashTransaction {
  id: string;
  fundId: string;
  type: 'disbursement' | 'replenishment';
  amount: Money;
  description: string;
  date: string;
  receiptUrl: string;
}`,
        serviceMethods: ['getAllFunds', 'getFundById', 'createFund', 'disburse', 'replenish', 'closeFund', 'getTransactions'],
      },
      {
        name: 'purchase-requests',
        typesExtra: `
export type PurchaseRequestStatus = 'draft' | 'submitted' | 'approved' | 'rejected' | 'ordered' | 'cancelled';
export interface PurchaseRequest {
  id: string;
  requestNumber: string;
  title: string;
  requestedBy: string;
  requestedByName: string;
  items: { name: string; quantity: number; estimatedCost: Money }[];
  totalEstimate: Money;
  status: PurchaseRequestStatus;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  requestedAt: string;
  approvedAt: string;
  notes: string;
}`,
        serviceMethods: ['getAll', 'getById', 'create', 'update', 'submit', 'approve', 'reject', 'cancel', 'convertToOrder'],
      },
      {
        name: 'policies',
        typesExtra: `
export type PolicyType = 'expense' | 'travel' | 'mileage' | 'per_diem' | 'advance';
export interface Policy {
  id: string;
  name: string;
  type: PolicyType;
  description: string;
  rules: { field: string; operator: string; value: unknown; message: string }[];
  approvers: { level: number; userId: string; userName: string }[];
  isActive: boolean;
  effectiveFrom: string;
  effectiveTo: string;
  createdAt: string;
}`,
        serviceMethods: ['getAll', 'getById', 'create', 'update', 'delete', 'activate', 'deactivate'],
      },
      {
        name: 'approvals',
        typesExtra: `
export type ApprovalAction = 'approved' | 'rejected' | 'returned' | 'forwarded';
export interface Approval {
  id: string;
  entityType: string;
  entityId: string;
  entityNumber: string;
  submittedBy: string;
  submittedByName: string;
  currentApprover: string;
  currentApproverName: string;
  level: number;
  totalLevels: number;
  status: 'pending' | 'approved' | 'rejected' | 'returned';
  submittedAt: string;
  actionAt: string;
  action: ApprovalAction;
  comments: string;
}
export interface ApprovalHistory {
  id: string;
  approvalId: string;
  action: ApprovalAction;
  actionBy: string;
  actionByName: string;
  comments: string;
  actionAt: string;
  level: number;
}`,
        serviceMethods: ['getPending', 'getHistory', 'approve', 'reject', 'return', 'forward', 'bulkApprove', 'bulkReject'],
      },
      {
        name: 'analytics',
        typesExtra: `
export interface ExpenseAnalytics {
  totalExpenses: Money;
  avgExpensePerEmployee: Money;
  topCategories: { category: string; amount: Money; percentage: number }[];
  monthlyTrend: { month: string; amount: Money }[];
  policyViolations: number;
  approvalTurnaroundDays: number;
  reimbursementRate: number;
}
export interface CategoryBreakdown {
  category: string;
  amount: Money;
  count: number;
  percentage: number;
}
export interface EmployeeSpending {
  employeeId: string;
  employeeName: string;
  totalSpent: Money;
  expenseCount: number;
  pendingCount: number;
}`,
        serviceMethods: ['getOverview', 'getCategoryBreakdown', 'getMonthlyTrend', 'getEmployeeSpending', 'getPolicyViolations', 'getApprovalMetrics'],
      },
    ],
  },

  // ─── INVENTORY ──────────────────────────────────────────────────────────
  {
    name: 'inventory',
    label: 'Zoho Inventory',
    subDomains: [
      {
        name: 'items',
        hasListComponent: true,
        typesExtra: `
export type ItemType = 'inventory' | 'non_inventory' | 'service' | 'digital';
export interface InventoryItem {
  id: string;
  name: string;
  sku: string;
  type: ItemType;
  category: string;
  unit: string;
  sellingPrice: Money;
  costPrice: Money;
  stockOnHand: number;
  reorderLevel: number;
  warehouseId: string;
  warehouseName: string;
  image: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}`,
        listColumns: `
    { accessorKey: 'name', header: 'Item Name' },
    { accessorKey: 'sku', header: 'SKU' },
    { accessorKey: 'type', header: 'Type' },
    { accessorKey: 'category', header: 'Category' },
    {
      accessorKey: 'sellingPrice', header: 'Selling Price',
      cell: ({ getValue }) => {
        const m = getValue() as Money;
        return \`\${m.currency} \${m.amount.toLocaleString()}\`;
      },
    },
    { accessorKey: 'stockOnHand', header: 'In Stock' },
    {
      accessorKey: 'isActive', header: 'Active',
      cell: ({ getValue }) => getValue() ? <Badge variant='default'>Yes</Badge> : <Badge variant='secondary'>No</Badge>,
    },`,
        serviceMethods: ['getAll', 'getById', 'create', 'update', 'delete', 'archive', 'adjustStock', 'getVariants'],
        schemaExtra: `
export const createItemSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  sku: z.string().optional(),
  type: z.enum(['inventory','non_inventory','service','digital'] as const),
  category: z.string().optional(),
  unit: z.string().default('ea'),
  sellingPrice: z.number().positive(),
  costPrice: z.number().min(0),
  reorderLevel: z.number().min(0).default(0),
});
export type CreateItemInput = z.infer<typeof createItemSchema>;`,
      },
      {
        name: 'warehouses',
        typesExtra: `
export interface Warehouse {
  id: string;
  name: string;
  address: Address;
  isDefault: boolean;
  stockValue: Money;
  itemCount: number;
  capacity: number;
  usedCapacity: number;
  manager: string;
  managerName: string;
  isActive: boolean;
  createdAt: string;
}`,
        serviceMethods: ['getAll', 'getById', 'create', 'update', 'delete', 'transferStock', 'getStockLevels'],
      },
      {
        name: 'batch-tracking',
        typesExtra: `
export type BatchStatus = 'in_stock' | 'expired' | 'damaged' | 'sold';
export interface Batch {
  id: string;
  batchNumber: string;
  itemId: string;
  itemName: string;
  warehouseId: string;
  warehouseName: string;
  quantity: number;
  remainingQuantity: number;
  manufactureDate: string;
  expiryDate: string;
  status: BatchStatus;
  costPrice: Money;
  notes: string;
  createdAt: string;
}
export interface SerialNumber {
  id: string;
  serialNumber: string;
  itemId: string;
  itemName: string;
  warehouseId: string;
  status: 'in_stock' | 'sold' | 'defective';
  purchaseDate: string;
  saleDate: string;
}`,
        serviceMethods: ['getAllBatches', 'getBatchById', 'createBatch', 'updateBatch', 'getSerialNumbers', 'createSerialNumber', 'getExpiringBatches'],
      },
      {
        name: 'sales-orders',
        typesExtra: `
export type SalesOrderStatus = 'draft' | 'confirmed' | 'packed' | 'shipped' | 'delivered' | 'cancelled';
export interface SalesOrder {
  id: string;
  orderNumber: string;
  customerId: string;
  customerName: string;
  lineItems: LineItem[];
  subtotal: Money;
  taxTotal: Money;
  total: Money;
  status: SalesOrderStatus;
  date: string;
  shipmentDate: string;
  warehouseId: string;
  notes: string;
  createdAt: string;
}`,
        serviceMethods: ['getAll', 'getById', 'create', 'update', 'delete', 'confirm', 'cancel', 'createPackage', 'createInvoice'],
      },
      {
        name: 'packages',
        typesExtra: `
export type PackageStatus = 'pending' | 'packed' | 'shipped' | 'delivered';
export interface Package {
  id: string;
  packageNumber: string;
  salesOrderId: string;
  customerId: string;
  customerName: string;
  warehouseId: string;
  warehouseName: string;
  items: { itemId: string; itemName: string; quantity: number; packed: number }[];
  status: PackageStatus;
  weight: number;
  weightUnit: string;
  dimensions: { length: number; width: number; height: number; unit: string };
  trackingNumber: string;
  carrier: string;
  createdAt: string;
}`,
        serviceMethods: ['getAll', 'getById', 'create', 'update', 'delete', 'markAsPacked', 'markAsShipped', 'markAsDelivered'],
      },
      {
        name: 'shipments',
        typesExtra: `
export type ShipmentStatus = 'not_shipped' | 'in_transit' | 'delivered' | 'returned';
export interface Shipment {
  id: string;
  shipmentNumber: string;
  packageId: string;
  carrier: string;
  service: string;
  trackingNumber: string;
  status: ShipmentStatus;
  shippedDate: string;
  deliveredDate: string;
  estimatedDelivery: string;
  origin: Address;
  destination: Address;
  cost: Money;
  notes: string;
  createdAt: string;
}
export interface TrackingEvent {
  id: string;
  shipmentId: string;
  status: string;
  location: string;
  timestamp: string;
  description: string;
}`,
        serviceMethods: ['getAll', 'getById', 'create', 'update', 'track', 'cancel', 'returnShipment', 'getTrackingEvents', 'getCarriers'],
      },
      {
        name: 'purchase-orders',
        typesExtra: `
export type PurchaseOrderStatus = 'draft' | 'issued' | 'partially_received' | 'received' | 'cancelled';
export interface PurchaseOrder {
  id: string;
  orderNumber: string;
  vendorId: string;
  vendorName: string;
  lineItems: LineItem[];
  subtotal: Money;
  taxTotal: Money;
  total: Money;
  status: PurchaseOrderStatus;
  date: string;
  expectedDelivery: string;
  warehouseId: string;
  notes: string;
  receivedQuantity: number;
  createdAt: string;
}`,
        serviceMethods: ['getAll', 'getById', 'create', 'update', 'delete', 'issue', 'receive', 'cancel', 'createBill'],
      },
      {
        name: 'stock-adjustments',
        typesExtra: `
export type AdjustmentType = 'quantity' | 'value';
export type AdjustmentReason = 'damage' | 'theft' | 'stock_take' | 'write_off' | 'correction' | 'other';
export interface StockAdjustment {
  id: string;
  adjustmentNumber: string;
  type: AdjustmentType;
  reason: AdjustmentReason;
  date: string;
  warehouseId: string;
  warehouseName: string;
  items: { itemId: string; itemName: string; oldQuantity: number; newQuantity: number; difference: number }[];
  totalValue: Money;
  notes: string;
  status: 'draft' | 'approved' | 'cancelled';
  createdAt: string;
}`,
        serviceMethods: ['getAll', 'getById', 'create', 'update', 'approve', 'cancel', 'getReasons'],
      },
      {
        name: 'transfers',
        typesExtra: `
export type TransferStatus = 'draft' | 'in_transit' | 'received' | 'cancelled';
export interface StockTransfer {
  id: string;
  transferNumber: string;
  fromWarehouseId: string;
  fromWarehouseName: string;
  toWarehouseId: string;
  toWarehouseName: string;
  items: { itemId: string; itemName: string; quantity: number; received: number }[];
  status: TransferStatus;
  date: string;
  expectedArrival: string;
  receivedDate: string;
  notes: string;
  createdAt: string;
}`,
        serviceMethods: ['getAll', 'getById', 'create', 'update', 'ship', 'receive', 'cancel'],
      },
      {
        name: 'reports',
        typesExtra: `
export interface InventoryReport {
  id: string;
  type: 'stock_summary' | 'sales_detail' | 'purchase_detail' | 'profitability' | 'inventory_valuation';
  period: string;
  generatedAt: string;
  data: Record<string, unknown>;
}
export interface StockSummary {
  itemId: string;
  itemName: string;
  sku: string;
  warehouse: string;
  stockOnHand: number;
  committed: number;
  available: number;
  reorderLevel: number;
  needsReorder: boolean;
  value: Money;
}
export interface InventoryValuation {
  warehouse: string;
  totalItems: number;
  totalValue: Money;
  byCategory: { category: string; itemCount: number; value: Money }[];
}`,
        serviceMethods: ['getStockSummary', 'getInventoryValuation', 'getSalesReport', 'getPurchaseReport', 'getProfitabilityReport', 'getReorderReport'],
      },
    ],
  },

  // ─── CHECKOUT ───────────────────────────────────────────────────────────
  {
    name: 'checkout',
    label: 'Zoho Checkout',
    subDomains: [
      {
        name: 'payment-pages',
        hasListComponent: true,
        typesExtra: `
export type PaymentPageStatus = 'active' | 'inactive' | 'archived';
export interface PaymentPage {
  id: string;
  name: string;
  url: string;
  amount: Money;
  description: string;
  status: PaymentPageStatus;
  isRecurring: boolean;
  frequency: string;
  totalPayments: number;
  totalCollected: Money;
  customFields: { label: string; type: string; required: boolean }[];
  templateId: string;
  createdAt: string;
}`,
        listColumns: `
    { accessorKey: 'name', header: 'Page Name' },
    {
      accessorKey: 'amount', header: 'Amount',
      cell: ({ getValue }) => {
        const m = getValue() as Money;
        return \`\${m.currency} \${m.amount.toLocaleString()}\`;
      },
    },
    {
      accessorKey: 'status', header: 'Status',
      cell: ({ getValue }) => {
        const s = getValue() as string;
        return <Badge variant={s === 'active' ? 'default' : 'secondary'}>{s}</Badge>;
      },
    },
    { accessorKey: 'totalPayments', header: 'Payments' },
    {
      accessorKey: 'totalCollected', header: 'Collected',
      cell: ({ getValue }) => {
        const m = getValue() as Money;
        return \`\${m.currency} \${m.amount.toLocaleString()}\`;
      },
    },
    { accessorKey: 'createdAt', header: 'Created' },`,
        serviceMethods: ['getAll', 'getById', 'create', 'update', 'delete', 'activate', 'deactivate', 'getPayments'],
        schemaExtra: `
export const createPaymentPageSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  amount: z.number().positive(),
  description: z.string().optional(),
  isRecurring: z.boolean().default(false),
});
export type CreatePaymentPageInput = z.infer<typeof createPaymentPageSchema>;`,
      },
      {
        name: 'payment-links',
        hasListComponent: true,
        typesExtra: `
export type PaymentLinkStatus = 'active' | 'expired' | 'used' | 'cancelled';
export interface PaymentLink {
  id: string;
  linkNumber: string;
  url: string;
  amount: Money;
  description: string;
  status: PaymentLinkStatus;
  customerId: string;
  customerName: string;
  expiresAt: string;
  maxUses: number;
  usedCount: number;
  isRecurring: boolean;
  createdAt: string;
}`,
        listColumns: `
    { accessorKey: 'linkNumber', header: 'Link #' },
    { accessorKey: 'customerName', header: 'Customer' },
    {
      accessorKey: 'amount', header: 'Amount',
      cell: ({ getValue }) => {
        const m = getValue() as Money;
        return \`\${m.currency} \${m.amount.toLocaleString()}\`;
      },
    },
    {
      accessorKey: 'status', header: 'Status',
      cell: ({ getValue }) => {
        const s = getValue() as string;
        return <Badge variant={s === 'active' ? 'default' : s === 'expired' || s === 'cancelled' ? 'destructive' : 'secondary'}>{s}</Badge>;
      },
    },
    { accessorKey: 'usedCount', header: 'Used' },
    { accessorKey: 'expiresAt', header: 'Expires' },`,
        serviceMethods: ['getAll', 'getById', 'create', 'cancel', 'expire', 'getTransactions'],
        schemaExtra: `
export const createPaymentLinkSchema = z.object({
  customerId: z.string().min(1),
  amount: z.number().positive(),
  description: z.string().optional(),
  expiresAt: z.string().optional(),
  maxUses: z.number().positive().default(1),
});
export type CreatePaymentLinkInput = z.infer<typeof createPaymentLinkSchema>;`,
      },
      {
        name: 'transactions',
        hasListComponent: true,
        typesExtra: `
export type TransactionType = 'payment' | 'refund' | 'chargeback';
export interface CheckoutTransaction {
  id: string;
  transactionNumber: string;
  type: TransactionType;
  amount: Money;
  fee: Money;
  net: Money;
  customerId: string;
  customerName: string;
  paymentPageId: string;
  paymentLinkId: string;
  method: string;
  status: PaymentStatus;
  gateway: string;
  gatewayReference: string;
  date: string;
  refundedAmount: Money;
  createdAt: string;
}`,
        listColumns: `
    { accessorKey: 'transactionNumber', header: 'Transaction #' },
    { accessorKey: 'customerName', header: 'Customer' },
    {
      accessorKey: 'amount', header: 'Amount',
      cell: ({ getValue }) => {
        const m = getValue() as Money;
        return \`\${m.currency} \${m.amount.toLocaleString()}\`;
      },
    },
    { accessorKey: 'type', header: 'Type' },
    { accessorKey: 'method', header: 'Method' },
    {
      accessorKey: 'status', header: 'Status',
      cell: ({ getValue }) => {
        const s = getValue() as PaymentStatus;
        const c = PAYMENT_STATUS_CONFIG[s];
        return <Badge variant={s === 'completed' ? 'default' : s === 'failed' ? 'destructive' : 'secondary'}>{c?.label ?? s}</Badge>;
      },
    },
    { accessorKey: 'date', header: 'Date' },`,
        serviceMethods: ['getAll', 'getById', 'refund', 'getStats', 'export'],
        schemaExtra: `
export const refundTransactionSchema = z.object({
  transactionId: z.string().min(1),
  amount: z.number().positive(),
  reason: z.string().optional(),
});
export type RefundTransactionInput = z.infer<typeof refundTransactionSchema>;`,
      },
    ],
  },

  // ─── COMMERCE ───────────────────────────────────────────────────────────
  {
    name: 'commerce',
    label: 'Zoho Commerce',
    subDomains: [
      {
        name: 'storefront',
        typesExtra: `
export type StorefrontStatus = 'published' | 'draft' | 'unpublished';
export interface Storefront {
  id: string;
  name: string;
  domain: string;
  status: StorefrontStatus;
  theme: string;
  logo: string;
  favicon: string;
  primaryColor: string;
  currency: string;
  language: string;
  pages: { slug: string; title: string; type: string }[];
  seo: { title: string; description: string; keywords: string[] };
  analytics: { googleAnalyticsId: string; facebookPixelId: string };
  createdAt: string;
  updatedAt: string;
}`,
        serviceMethods: ['get', 'update', 'publish', 'unpublish', 'getPages', 'updatePage', 'getSEO', 'updateSEO'],
      },
      {
        name: 'products',
        hasListComponent: true,
        typesExtra: `
export type ProductVisibility = 'visible' | 'hidden' | 'featured';
export interface CommerceProduct {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: Money;
  salePrice: Money;
  category: string;
  images: string[];
  visibility: ProductVisibility;
  stock: number;
  sku: string;
  tags: string[];
  variants: { name: string; options: string[] }[];
  rating: number;
  reviewCount: number;
  createdAt: string;
}`,
        listColumns: `
    { accessorKey: 'name', header: 'Product' },
    { accessorKey: 'sku', header: 'SKU' },
    {
      accessorKey: 'price', header: 'Price',
      cell: ({ getValue }) => {
        const m = getValue() as Money;
        return \`\${m.currency} \${m.amount.toLocaleString()}\`;
      },
    },
    { accessorKey: 'category', header: 'Category' },
    { accessorKey: 'stock', header: 'Stock' },
    {
      accessorKey: 'visibility', header: 'Visibility',
      cell: ({ getValue }) => {
        const s = getValue() as string;
        return <Badge variant={s === 'featured' ? 'default' : s === 'hidden' ? 'secondary' : 'outline'}>{s}</Badge>;
      },
    },
    { accessorKey: 'rating', header: 'Rating' },`,
        serviceMethods: ['getAll', 'getById', 'create', 'update', 'delete', 'updateVisibility', 'addVariant', 'removeVariant', 'getReviews'],
        schemaExtra: `
export const createCommerceProductSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  description: z.string().optional(),
  price: z.number().positive(),
  category: z.string().optional(),
  sku: z.string().optional(),
  visibility: z.enum(['visible','hidden','featured'] as const).default('visible'),
});
export type CreateCommerceProductInput = z.infer<typeof createCommerceProductSchema>;`,
      },
      {
        name: 'orders',
        hasListComponent: true,
        typesExtra: `
export interface CommerceOrder {
  id: string;
  orderNumber: string;
  customerId: string;
  customerName: string;
  customerEmail: string;
  items: { productId: string; name: string; quantity: number; price: Money }[];
  subtotal: Money;
  shipping: Money;
  tax: Money;
  total: Money;
  status: OrderStatus;
  shippingAddress: Address;
  billingAddress: Address;
  trackingNumber: string;
  carrier: string;
  paymentMethod: string;
  paymentStatus: PaymentStatus;
  notes: string;
  createdAt: string;
  updatedAt: string;
}`,
        listColumns: `
    { accessorKey: 'orderNumber', header: 'Order #' },
    { accessorKey: 'customerName', header: 'Customer' },
    {
      accessorKey: 'total', header: 'Total',
      cell: ({ getValue }) => {
        const m = getValue() as Money;
        return \`\${m.currency} \${m.amount.toLocaleString()}\`;
      },
    },
    {
      accessorKey: 'status', header: 'Status',
      cell: ({ getValue }) => {
        const s = getValue() as OrderStatus;
        const c = ORDER_STATUS_CONFIG[s];
        return <Badge variant={s === 'delivered' ? 'default' : s === 'cancelled' ? 'destructive' : 'secondary'}>{c?.label ?? s}</Badge>;
      },
    },
    {
      accessorKey: 'paymentStatus', header: 'Payment',
      cell: ({ getValue }) => {
        const s = getValue() as PaymentStatus;
        const c = PAYMENT_STATUS_CONFIG[s];
        return <Badge variant={s === 'completed' ? 'default' : 'secondary'}>{c?.label ?? s}</Badge>;
      },
    },
    { accessorKey: 'createdAt', header: 'Date' },`,
        serviceMethods: ['getAll', 'getById', 'update', 'cancel', 'refund', 'updateTracking', 'getStats', 'export'],
        schemaExtra: `
export const updateOrderSchema = z.object({
  status: z.enum(['pending','confirmed','processing','shipped','delivered','cancelled'] as const).optional(),
  trackingNumber: z.string().optional(),
  carrier: z.string().optional(),
  notes: z.string().optional(),
});
export type UpdateOrderInput = z.infer<typeof updateOrderSchema>;`,
      },
      {
        name: 'discounts',
        typesExtra: `
export type DiscountType = 'percentage' | 'flat' | 'buy_x_get_y' | 'free_shipping';
export type DiscountScope = 'store' | 'category' | 'product';
export type DiscountStatus = 'active' | 'scheduled' | 'expired' | 'disabled';
export interface Discount {
  id: string;
  name: string;
  code: string;
  type: DiscountType;
  value: number;
  scope: DiscountScope;
  scopeRef: string;
  minPurchase: Money;
  maxDiscount: Money;
  usageLimit: number;
  usedCount: number;
  validFrom: string;
  validTo: string;
  status: DiscountStatus;
  createdAt: string;
}`,
        serviceMethods: ['getAll', 'getById', 'create', 'update', 'delete', 'disable', 'enable', 'getStats'],
      },
      {
        name: 'analytics',
        typesExtra: `
export interface CommerceAnalytics {
  totalRevenue: Money;
  totalOrders: number;
  avgOrderValue: Money;
  conversionRate: number;
  topProducts: { productId: string; name: string; revenue: Money; quantity: number }[];
  revenueByDay: { date: string; revenue: Money; orders: number }[];
  visitors: number;
  bounceRate: number;
  cartAbandonmentRate: number;
}
export interface SalesMetrics {
  period: string;
  revenue: Money;
  orders: number;
  returns: number;
  netRevenue: Money;
  customerAcquisitionCost: Money;
  lifetimeValue: Money;
}`,
        serviceMethods: ['getOverview', 'getSalesMetrics', 'getProductPerformance', 'getCustomerInsights', 'getTrafficAnalytics', 'getConversionFunnel'],
      },
    ],
  },

  // ─── PAYROLL ────────────────────────────────────────────────────────────
  {
    name: 'payroll',
    label: 'Zoho Payroll',
    subDomains: [
      {
        name: 'employees',
        hasListComponent: true,
        typesExtra: `
export type EmployeeStatus = 'active' | 'on_leave' | 'terminated' | 'onboarding';
export type EmploymentType = 'full_time' | 'part_time' | 'contractor' | 'intern';
export interface PayrollEmployee {
  id: string;
  employeeId: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  department: string;
  designation: string;
  employmentType: EmploymentType;
  status: EmployeeStatus;
  hireDate: string;
  terminationDate: string;
  salary: Money;
  bankAccount: string;
  taxId: string;
  address: Address;
  emergencyContact: { name: string; phone: string; relationship: string };
  createdAt: string;
  updatedAt: string;
}`,
        listColumns: `
    { accessorKey: 'employeeId', header: 'Emp. ID' },
    {
      id: 'name', header: 'Name',
      accessorFn: (row) => \`\${row.firstName} \${row.lastName}\`,
      cell: ({ row }) => (
        <div>
          <p className='font-medium text-foreground'>{row.original.firstName} {row.original.lastName}</p>
          <p className='text-xs text-muted-foreground'>{row.original.email}</p>
        </div>
      ),
    },
    { accessorKey: 'department', header: 'Department' },
    { accessorKey: 'designation', header: 'Designation' },
    {
      accessorKey: 'salary', header: 'Salary',
      cell: ({ getValue }) => {
        const m = getValue() as Money;
        return \`\${m.currency} \${m.amount.toLocaleString()}\`;
      },
    },
    {
      accessorKey: 'status', header: 'Status',
      cell: ({ getValue }) => {
        const s = getValue() as EmployeeStatus;
        return <Badge variant={s === 'active' ? 'default' : s === 'terminated' ? 'destructive' : 'secondary'}>{s.replace('_', ' ')}</Badge>;
      },
    },`,
        serviceMethods: ['getAll', 'getById', 'create', 'update', 'delete', 'onboard', 'terminate', 'getPayslips', 'getSalaryStructure'],
        schemaExtra: `
export const createEmployeeSchema = z.object({
  firstName: z.string().min(1, 'First name required'),
  lastName: z.string().min(1, 'Last name required'),
  email: z.string().email('Invalid email'),
  department: z.string().min(1, 'Department required'),
  designation: z.string().min(1, 'Designation required'),
  employmentType: z.enum(['full_time','part_time','contractor','intern'] as const),
  salary: z.number().positive(),
  hireDate: z.string(),
});
export type CreateEmployeeInput = z.infer<typeof createEmployeeSchema>;`,
      },
      {
        name: 'pay-runs',
        hasListComponent: true,
        typesExtra: `
export type PayRunStatus = 'draft' | 'processing' | 'completed' | 'cancelled';
export interface PayRun {
  id: string;
  name: string;
  payDate: string;
  period: string;
  totalAmount: Money;
  employeeCount: number;
  status: PayRunStatus;
  processedAt: string;
  bankPaymentStatus: 'pending' | 'processed' | 'failed';
  createdAt: string;
}`,
        listColumns: `
    { accessorKey: 'name', header: 'Pay Run' },
    { accessorKey: 'period', header: 'Period' },
    { accessorKey: 'payDate', header: 'Pay Date' },
    {
      accessorKey: 'totalAmount', header: 'Total',
      cell: ({ getValue }) => {
        const m = getValue() as Money;
        return \`\${m.currency} \${m.amount.toLocaleString()}\`;
      },
    },
    { accessorKey: 'employeeCount', header: 'Employees' },
    {
      accessorKey: 'status', header: 'Status',
      cell: ({ getValue }) => {
        const s = getValue() as PayRunStatus;
        return <Badge variant={s === 'completed' ? 'default' : s === 'cancelled' ? 'destructive' : 'secondary'}>{s}</Badge>;
      },
    },`,
        serviceMethods: ['getAll', 'getById', 'create', 'process', 'cancel', 'getPayslips', 'processBankPayments', 'getStats'],
        schemaExtra: `
export const createPayRunSchema = z.object({
  name: z.string().min(1, 'Name required'),
  payDate: z.string(),
  period: z.string(),
  employeeIds: z.array(z.string()).optional(),
});
export type CreatePayRunInput = z.infer<typeof createPayRunSchema>;`,
      },
      {
        name: 'benefits',
        typesExtra: `
export type BenefitType = 'health' | 'dental' | 'vision' | 'life_insurance' | 'retirement_401k' | 'hra' | 'fsa' | 'commuter' | 'other';
export type BenefitStatus = 'active' | 'waived' | 'cancelled' | 'pending_enrollment';
export interface Benefit {
  id: string;
  name: string;
  type: BenefitType;
  provider: string;
  employeeContribution: Money;
  employerContribution: Money;
  totalCost: Money;
  description: string;
  enrollmentPeriod: string;
  status: BenefitStatus;
  employeeCount: number;
  createdAt: string;
}
export interface EmployeeBenefit {
  id: string;
  employeeId: string;
  benefitId: string;
  benefitName: string;
  employeeContribution: Money;
  employerContribution: Money;
  status: BenefitStatus;
  enrolledAt: string;
}`,
        serviceMethods: ['getAll', 'getById', 'create', 'update', 'delete', 'enrollEmployee', 'waiveEmployee', 'getEmployeeBenefits'],
      },
      {
        name: 'taxes',
        typesExtra: `
export type TaxType = 'federal' | 'state' | 'local' | 'social_security' | 'medicare' | 'futa' | 'suta' | 'other';
export interface TaxConfiguration {
  id: string;
  name: string;
  type: TaxType;
  rate: number;
  wageBase: Money;
  employerRate: number;
  effectiveFrom: string;
  effectiveTo: string;
  isActive: boolean;
  jurisdiction: string;
  description: string;
}
export interface TaxWithholding {
  id: string;
  employeeId: string;
  taxId: string;
  taxName: string;
  filingStatus: string;
  allowances: number;
  additionalWithholding: Money;
  exempt: boolean;
}`,
        serviceMethods: ['getAllConfigurations', 'getConfigurationById', 'createConfiguration', 'updateConfiguration', 'getWithholdings', 'updateWithholding', 'calculateTaxes'],
      },
      {
        name: 'reports',
        typesExtra: `
export interface PayrollReport {
  id: string;
  type: 'payroll_summary' | 'tax_liability' | 'employee_earnings' | 'benefit_costs' | 'time_off';
  period: string;
  generatedAt: string;
  data: Record<string, unknown>;
}
export interface PayrollSummary {
  period: string;
  grossPay: Money;
  netPay: Money;
  totalTaxes: Money;
  totalBenefits: Money;
  totalDeductions: Money;
  employeeCount: number;
}
export interface TaxLiability {
  taxName: string;
  employeePortion: Money;
  employerPortion: Money;
  total: Money;
}`,
        serviceMethods: ['getPayrollSummary', 'getTaxLiability', 'getEmployeeEarnings', 'getBenefitCosts', 'getTimeOffReport', 'exportReport'],
      },
    ],
  },

  // ─── SHARED ─────────────────────────────────────────────────────────────
  {
    name: 'shared',
    label: 'Cross-product',
    subDomains: [
      {
        name: 'contacts',
        hasSelectorComponent: true,
        hasListComponent: true,
        typesExtra: `
export type ContactType = 'customer' | 'vendor' | 'both';
export interface Contact {
  id: string;
  name: string;
  email: string;
  phone: string;
  type: ContactType;
  company: string;
  designation: string;
  billingAddress: Address;
  shippingAddress: Address;
  currency: string;
  paymentTermsId: string;
  outstandingAmount: Money;
  unusedCredits: Money;
  notes: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}`,
        listColumns: `
    { accessorKey: 'name', header: 'Name' },
    { accessorKey: 'email', header: 'Email' },
    { accessorKey: 'company', header: 'Company' },
    {
      accessorKey: 'type', header: 'Type',
      cell: ({ getValue }) => {
        const s = getValue() as string;
        return <Badge variant='outline'>{s}</Badge>;
      },
    },
    {
      accessorKey: 'outstandingAmount', header: 'Outstanding',
      cell: ({ getValue }) => {
        const m = getValue() as Money;
        return \`\${m.currency} \${m.amount.toLocaleString()}\`;
      },
    },
    {
      accessorKey: 'isActive', header: 'Active',
      cell: ({ getValue }) => getValue() ? <Badge variant='default'>Yes</Badge> : <Badge variant='secondary'>No</Badge>,
    },`,
        serviceMethods: ['getAll', 'getById', 'create', 'update', 'delete', 'search', 'merge', 'getTransactions'],
        schemaExtra: `
export const createContactSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email'),
  phone: z.string().optional(),
  type: z.enum(['customer','vendor','both'] as const),
  company: z.string().optional(),
});
export type CreateContactInput = z.infer<typeof createContactSchema>;`,
      },
      {
        name: 'tags',
        typesExtra: `
export interface Tag {
  id: string;
  name: string;
  color: string;
  entityType: string;
  usageCount: number;
  createdAt: string;
}
export interface TaggedEntity {
  entityId: string;
  entityType: string;
  tagIds: string[];
}`,
        serviceMethods: ['getAll', 'getById', 'create', 'update', 'delete', 'tagEntity', 'untagEntity', 'getEntitiesByTag'],
      },
      {
        name: 'search',
        hasSearchBarComponent: true,
        typesExtra: `
export type SearchEntityType = 'invoice' | 'estimate' | 'payment' | 'expense' | 'subscription' | 'item' | 'contact' | 'order' | 'employee';
export interface SearchResult {
  id: string;
  type: SearchEntityType;
  title: string;
  subtitle: string;
  url: string;
  score: number;
  highlights: { field: string; snippet: string }[];
}
export interface SearchSuggestion {
  text: string;
  type: SearchEntityType;
  count: number;
}
export interface GlobalSearchResponse {
  query: string;
  results: SearchResult[];
  suggestions: SearchSuggestion[];
  totalResults: number;
  took: number;
}`,
        serviceMethods: ['search', 'getSuggestions', 'getRecentSearches', 'saveRecentSearch', 'clearRecentSearches'],
      },
      {
        name: 'import',
        hasWizardComponent: true,
        typesExtra: `
export type ImportStatus = 'pending' | 'processing' | 'completed' | 'failed' | 'partial';
export type ImportEntityType = 'invoices' | 'expenses' | 'contacts' | 'items' | 'transactions' | 'employees';
export interface ImportJob {
  id: string;
  entityType: ImportEntityType;
  fileName: string;
  totalRows: number;
  processedRows: number;
  successCount: number;
  errorCount: number;
  skipCount: number;
  status: ImportStatus;
  mapping: { sourceColumn: string; targetField: string }[];
  duplicateHandling: 'skip' | 'overwrite' | 'create_new';
  startedAt: string;
  completedAt: string;
  errors: { row: number; column: string; message: string }[];
  createdAt: string;
}
export interface ImportTemplate {
  entityType: ImportEntityType;
  columns: { name: string; required: boolean; sample: string }[];
}`,
        serviceMethods: ['getTemplates', 'uploadFile', 'getImportStatus', 'startImport', 'cancelImport', 'getErrors', 'downloadTemplate'],
      },
      {
        name: 'notes',
        typesExtra: `
export interface Note {
  id: string;
  entityType: string;
  entityId: string;
  content: string;
  authorId: string;
  authorName: string;
  isPinned: boolean;
  createdAt: string;
  updatedAt: string;
}`,
        serviceMethods: ['getAll', 'getById', 'create', 'update', 'delete', 'pin', 'unpin', 'getByEntity'],
      },
      {
        name: 'attachments',
        typesExtra: `
export interface Attachment {
  id: string;
  entityType: string;
  entityId: string;
  fileName: string;
  fileSize: number;
  fileType: string;
  url: string;
  thumbnailUrl: string;
  uploadedBy: string;
  uploadedByName: string;
  createdAt: string;
}`,
        serviceMethods: ['getAll', 'upload', 'delete', 'download', 'getByEntity'],
      },
      {
        name: 'comments',
        typesExtra: `
export interface Comment {
  id: string;
  entityType: string;
  entityId: string;
  content: string;
  authorId: string;
  authorName: string;
  parentCommentId: string;
  mentions: string[];
  reactions: { emoji: string; userIds: string[] }[];
  createdAt: string;
  updatedAt: string;
}`,
        serviceMethods: ['getAll', 'getById', 'create', 'update', 'delete', 'addReaction', 'removeReaction', 'getByEntity'],
      },
      {
        name: 'workflows',
        typesExtra: `
export type WorkflowTrigger = 'record_created' | 'record_updated' | 'field_changed' | 'scheduled' | 'manual';
export type WorkflowAction = 'send_email' | 'update_field' | 'create_task' | 'webhook' | 'create_record';
export type WorkflowStatus = 'active' | 'inactive' | 'draft';
export interface Workflow {
  id: string;
  name: string;
  description: string;
  entityType: string;
  trigger: WorkflowTrigger;
  triggerCondition: { field: string; operator: string; value: unknown }[];
  actions: { type: WorkflowAction; config: Record<string, unknown> }[];
  status: WorkflowStatus;
  executionCount: number;
  lastExecutedAt: string;
  createdAt: string;
  updatedAt: string;
}
export interface WorkflowExecution {
  id: string;
  workflowId: string;
  triggerEntityId: string;
  status: 'success' | 'failed' | 'running';
  startedAt: string;
  completedAt: string;
  error: string;
}`,
        serviceMethods: ['getAll', 'getById', 'create', 'update', 'delete', 'activate', 'deactivate', 'execute', 'getExecutions', 'getLogs'],
      },
      {
        name: 'custom-fields',
        hasRendererComponent: true,
        typesExtra: `
export type CustomFieldType = 'text' | 'number' | 'date' | 'dropdown' | 'checkbox' | 'url' | 'email' | 'phone' | 'textarea' | 'multiselect';
export interface CustomField {
  id: string;
  name: string;
  label: string;
  type: CustomFieldType;
  entityType: string;
  isRequired: boolean;
  isActive: boolean;
  placeholder: string;
  tooltip: string;
  options: { value: string; label: string }[];
  defaultValue: unknown;
  sortOrder: number;
  validation: { pattern: string; message: string };
  createdAt: string;
}
export interface CustomFieldValue {
  fieldId: string;
  entityId: string;
  value: unknown;
}`,
        serviceMethods: ['getAll', 'getById', 'create', 'update', 'delete', 'getByEntityType', 'getValues', 'updateValues', 'reorder'],
      },
      {
        name: 'templates',
        typesExtra: `
export type TemplateType = 'invoice' | 'estimate' | 'credit_note' | 'purchase_order' | 'sales_order' | 'payment_receipt';
export interface Template {
  id: string;
  name: string;
  type: TemplateType;
  isDefault: boolean;
  thumbnailUrl: string;
  settings: {
    headerHtml: string;
    footerHtml: string;
    showLogo: boolean;
    showPaymentInfo: boolean;
    colorScheme: string;
    fontFamily: string;
    fontSize: number;
  };
  createdAt: string;
  updatedAt: string;
}`,
        serviceMethods: ['getAll', 'getById', 'create', 'update', 'delete', 'setDefault', 'getByType', 'preview', 'duplicate'],
      },
    ],
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// FILE GENERATORS
// ─────────────────────────────────────────────────────────────────────────────

function pascalCase(s: string): string {
  return s.split('-').map(p => p.charAt(0).toUpperCase() + p.slice(1)).join('');
}

function camelCase(s: string): string {
  const p = pascalCase(s);
  return p.charAt(0).toLowerCase() + p.slice(1);
}

const COMMON_IMPORTS = `import type { Money, Address, LineItem, TaxRate, InvoiceStatus, EstimateStatus, BillStatus, PaymentStatus, SubscriptionStatus, ExpenseStatus, OrderStatus, ApiResponse, PaginatedResponse, PaginatedRequest } from '../types/finance-common';`;

function generateTypes(sub: SubDomain, domain: DomainConfig): string {
  return `// ${pascalCase(sub.name)} Types — ${domain.label}
${COMMON_IMPORTS}
${sub.typesExtra || ''}
`;
}

function generateConstants(sub: SubDomain, domain: DomainConfig): string {
  const name = pascalCase(sub.name);
  const statusConfigs: string[] = [];

  // Check for common status types used in the subdomain
  const typesStr = sub.typesExtra || '';
  if (typesStr.includes('InvoiceStatus')) statusConfigs.push('INVOICE_STATUS_CONFIG');
  if (typesStr.includes('EstimateStatus')) statusConfigs.push('ESTIMATE_STATUS_CONFIG');
  if (typesStr.includes('PaymentStatus')) statusConfigs.push('PAYMENT_STATUS_CONFIG');
  if (typesStr.includes('SubscriptionStatus')) statusConfigs.push('SUBSCRIPTION_STATUS_CONFIG');
  if (typesStr.includes('ExpenseStatus')) statusConfigs.push('EXPENSE_STATUS_CONFIG');
  if (typesStr.includes('OrderStatus')) statusConfigs.push('ORDER_STATUS_CONFIG');

  const reExportStatuses = statusConfigs.length > 0
    ? `\n// Re-export relevant status configs from finance-common constants
export { ${statusConfigs.join(', ')} } from '../constants/finance-common';\n`
    : '';

  return `// ${name} Constants — ${domain.label}
${reExportStatuses}${sub.constantsExtra || ''}
`;
}

function generateQueryKeys(sub: SubDomain, domain: DomainConfig): string {
  const name = camelCase(sub.name);
  const keys = pascalCase(sub.name);
  return `// ${keys} Query Keys — ${domain.label}

export const ${name}Keys = {
  all: ['${domain.name}', '${sub.name}'] as const,
  lists: () => [...${name}Keys.all, 'list'] as const,
  list: (params: Record<string, unknown>) => [...${name}Keys.lists(), params] as const,
  details: () => [...${name}Keys.all, 'detail'] as const,
  detail: (id: string) => [...${name}Keys.details(), id] as const,
  stats: () => [...${name}Keys.all, 'stats'] as const,
} as const;
`;
}

function generateSchema(sub: SubDomain, domain: DomainConfig): string {
  const name = pascalCase(sub.name);
  return `// ${name} Schema — ${domain.label}
import { z } from 'zod';
${sub.schemaExtra || ''}
`;
}

function generateService(sub: SubDomain, domain: DomainConfig): string {
  const name = camelCase(sub.name);
  const keys = pascalCase(sub.name);
  const methods = sub.serviceMethods || ['getAll', 'getById', 'create', 'update', 'delete'];

  const methodBodies: Record<string, string> = {
    getAll: `    return financeApiClient.get<PaginatedResponse<${pascalCase(sub.name.replace(/s$/, ''))}>>('/${domain.name}/${sub.name}', params as Record<string, string | number | boolean | undefined>);`,
    getById: `    return financeApiClient.get<ApiResponse<${pascalCase(sub.name.replace(/s$/, ''))}>>('/${domain.name}/${sub.name}/' + id);`,
    create: `    return financeApiClient.post<ApiResponse<${pascalCase(sub.name.replace(/s$/, ''))}>>('/${domain.name}/${sub.name}', data);`,
    update: `    return financeApiClient.put<ApiResponse<${pascalCase(sub.name.replace(/s$/, ''))}>>('/${domain.name}/${sub.name}/' + id, data);`,
    delete: `    return financeApiClient.delete<ApiResponse<void>>('/${domain.name}/${sub.name}/' + id);`,
  };

  const customMethodSignatures: Record<string, string> = {};

  // Domain-specific methods
  const methodLines = methods.map(m => {
    if (methodBodies[m]) {
      if (m === 'getAll') return `  ${m}: (params?: PaginatedRequest) => {\n${methodBodies[m]}\n  },`;
      if (m === 'getById') return `  ${m}: (id: string) => {\n${methodBodies[m]}\n  },`;
      if (m === 'create') return `  ${m}: (data: Partial<${pascalCase(sub.name.replace(/s$/, ''))}>) => {\n${methodBodies[m]}\n  },`;
      if (m === 'update') return `  ${m}: (id: string, data: Partial<${pascalCase(sub.name.replace(/s$/, ''))}>) => {\n${methodBodies[m]}\n  },`;
      return `  ${m}: () => {\n${methodBodies[m]}\n  },`;
    }
    // Generate custom method stubs
    return `  ${m}: (...args: unknown[]) => {\n    // TODO: Implement ${m}\n    return Promise.resolve({ success: true, data: {} as never });\n  },`;
  });

  return `// ${keys} Service — ${domain.label}
import { financeApiClient } from '../../../api/client';
import type { ApiResponse, PaginatedResponse, PaginatedRequest } from '../types/finance-common';
import type { ${pascalCase(sub.name.replace(/s$/, ''))} } from './types';

export const ${name}Service = {
${methodLines.join('\n')}
};
`;
}

function generateUtils(sub: SubDomain, domain: DomainConfig): string {
  const name = pascalCase(sub.name);
  const singular = pascalCase(sub.name.replace(/s$/, ''));
  return `// ${name} Utils — ${domain.label}
${sub.utilsExtra || ''}
export function format${singular}Number(num: string, prefix: string): string {
  return \`\${prefix}-\${num}\`;
}

export function get${singular}StatusLabel(status: string): string {
  return status.replace(/_/g, ' ').replace(/\\b\\w/g, c => c.toUpperCase());
}
`;
}

function generateHook(sub: SubDomain, domain: DomainConfig): string {
  const name = camelCase(sub.name);
  const keys = pascalCase(sub.name);
  const singular = pascalCase(sub.name.replace(/s$/, ''));
  const methods = sub.serviceMethods || ['getAll', 'getById', 'create', 'update', 'delete'];

  const hookLines: string[] = [];

  if (methods.includes('getAll')) {
    hookLines.push(`export function use${keys}List(params?: PaginatedRequest) {
  return useQuery({ queryKey: ${name}Keys.list((params || {}) as Record<string, unknown>), queryFn: () => ${name}Service.getAll(params) });
}`);
  }
  if (methods.includes('getById')) {
    hookLines.push(`export function use${singular}(id: string) {
  return useQuery({ queryKey: ${name}Keys.detail(id), queryFn: () => ${name}Service.getById(id), enabled: !!id });
}`);
  }
  if (methods.includes('create')) {
    hookLines.push(`export function useCreate${singular}() {
  const qc = useQueryClient();
  return useMutation({ mutationFn: ${name}Service.create, onSuccess: () => { qc.invalidateQueries({ queryKey: ${name}Keys.all }); } });
}`);
  }
  if (methods.includes('update')) {
    hookLines.push(`export function useUpdate${singular}() {
  const qc = useQueryClient();
  return useMutation({ mutationFn: ({ id, data }: { id: string; data: Partial<${singular}> }) => ${name}Service.update(id, data), onSuccess: () => { qc.invalidateQueries({ queryKey: ${name}Keys.all }); } });
}`);
  }
  if (methods.includes('delete')) {
    hookLines.push(`export function useDelete${singular}() {
  const qc = useQueryClient();
  return useMutation({ mutationFn: ${name}Service.delete, onSuccess: () => { qc.invalidateQueries({ queryKey: ${name}Keys.all }); } });
}`);
  }
  if (methods.includes('getStats')) {
    hookLines.push(`export function use${keys}Stats() {
  return useQuery({ queryKey: ${name}Keys.stats(), queryFn: () => ${name}Service.getStats() });
}`);
  }

  return `// ${keys} Hooks — ${domain.label}
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { ${name}Service } from './service';
import { ${name}Keys } from './query-keys';
import type { PaginatedRequest } from '../types/finance-common';
import type { ${singular} } from './types';

${hookLines.join('\n\n')}
${sub.hookExtra || ''}
`;
}

function generateListComponent(sub: SubDomain, domain: DomainConfig): string {
  const name = camelCase(sub.name);
  const keys = pascalCase(sub.name);
  const singular = pascalCase(sub.name.replace(/s$/, ''));

  // Determine what status configs need importing
  const typesStr = sub.typesExtra || '';
  const statusImports: string[] = [];
  if (typesStr.includes('InvoiceStatus')) statusImports.push('INVOICE_STATUS_CONFIG');
  if (typesStr.includes('EstimateStatus')) statusImports.push('ESTIMATE_STATUS_CONFIG');
  if (typesStr.includes('PaymentStatus')) statusImports.push('PAYMENT_STATUS_CONFIG');
  if (typesStr.includes('SubscriptionStatus')) statusImports.push('SUBSCRIPTION_STATUS_CONFIG');
  if (typesStr.includes('ExpenseStatus')) statusImports.push('EXPENSE_STATUS_CONFIG');
  if (typesStr.includes('OrderStatus')) statusImports.push('ORDER_STATUS_CONFIG');

  const statusImportLine = statusImports.length > 0
    ? `import { ${statusImports.join(', ')} } from '../constants/finance-common';\n`
    : '';

  // Determine type imports needed
  const typeImports: string[] = ['Money'];
  if (typesStr.includes('InvoiceStatus')) typeImports.push('InvoiceStatus');
  if (typesStr.includes('EstimateStatus')) typeImports.push('EstimateStatus');
  if (typesStr.includes('PaymentStatus')) typeImports.push('PaymentStatus');
  if (typesStr.includes('SubscriptionStatus')) typeImports.push('SubscriptionStatus');
  if (typesStr.includes('ExpenseStatus')) typeImports.push('ExpenseStatus');
  if (typesStr.includes('OrderStatus')) typeImports.push('OrderStatus');
  if (typesStr.includes('CouponStatus')) typeImports.push('CouponStatus');

  // Add domain-specific type imports from the types.ts
  const customTypeImports: string[] = [];
  const regex = /export\s+(?:type|interface)\s+(\w+)/g;
  let match;
  while ((match = regex.exec(sub.typesExtra || '')) !== null) {
    customTypeImports.push(match[1]);
  }

  const columns = sub.listColumns || `    { accessorKey: 'id', header: 'ID' },
    { accessorKey: 'name', header: 'Name' },`;

  return `'use client';

import { useState, useMemo } from 'react';
import {
  useReactTable, getCoreRowModel, getSortedRowModel,
  getPaginationRowModel, getFilteredRowModel, flexRender,
  type ColumnDef, type SortingState,
} from '@tanstack/react-table';
import { ArrowUpDown, ChevronUp, ChevronDown, ChevronLeft, ChevronRight, MoreHorizontal, Plus } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
${statusImportLine}import type { ${typeImports.join(', ')} } from '../types/finance-common';
import type { ${singular} } from '../types';
${customTypeImports.length > 0 ? `import type { ${customTypeImports.filter(t => t !== singular).join(', ')} } from '../types';` : ''}

interface ${keys}ListProps {
  data: ${singular}[];
  isLoading?: boolean;
  onRowClick?: (item: ${singular}) => void;
  onEdit?: (item: ${singular}) => void;
  onDelete?: (item: ${singular}) => void;
  onCreateNew?: () => void;
}

function SortIcon({ column }: { column: { getIsSorted: () => false | 'asc' | 'desc' } }) {
  const sorted = column.getIsSorted();
  if (sorted === 'asc') return <ChevronUp className="h-3.5 w-3.5 ml-1" />;
  if (sorted === 'desc') return <ChevronDown className="h-3.5 w-3.5 ml-1" />;
  return <ArrowUpDown className="h-3 w-3 ml-1 opacity-30" />;
}

export function ${keys}List({ data, isLoading, onRowClick, onEdit, onDelete, onCreateNew }: ${keys}ListProps) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = useState('');

  const columns = useMemo<ColumnDef<${singular}>[]>(() => [
${columns}
    {
      id: 'actions', header: '', size: 48, enableSorting: false,
      cell: ({ row }) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild><Button variant="ghost" size="icon" className="h-8 w-8" onClick={e => e.stopPropagation()}><MoreHorizontal className="h-4 w-4" /></Button></DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={e => { e.stopPropagation(); onEdit?.(row.original); }}>Edit</DropdownMenuItem>
            <DropdownMenuItem onClick={e => { e.stopPropagation(); onDelete?.(row.original); }} className="text-destructive">Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ], [onEdit, onDelete]);

  const table = useReactTable({
    data, columns, state: { sorting, globalFilter }, onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter, getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(), getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(), initialState: { pagination: { pageSize: 10 } },
    getRowId: (row) => row.id,
  });

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2 px-3 py-2 rounded-lg border border-border bg-card flex-1 max-w-md">
          <input type="text" value={globalFilter} onChange={e => setGlobalFilter(e.target.value)} placeholder="Search ${sub.name.replace(/-/g, ' ')}..." className="flex-1 bg-transparent text-foreground placeholder:text-muted-foreground/60 outline-none text-sm" />
        </div>
        {onCreateNew && (
          <Button onClick={onCreateNew}><Plus className="h-4 w-4 mr-1" />New ${singular}</Button>
        )}
      </div>
      <div className="rounded-xl border overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map(hg => (
                <TableRow key={hg.id} className="border-b hover:bg-transparent">
                  {hg.headers.map(header => (
                    <TableHead key={header.id} className={cn('text-xs uppercase tracking-wider text-muted-foreground font-medium h-10', header.column.getCanSort() && 'cursor-pointer hover:text-foreground transition-colors')} onClick={header.column.getToggleSortingHandler()} style={{ width: header.getSize() !== 150 ? header.getSize() : undefined }}>
                      <div className="flex items-center">{header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}{header.column.getCanSort() && <SortIcon column={header.column} />}</div>
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {isLoading ? Array.from({ length: 5 }).map((_, i) => (
                <TableRow key={i} className="border-b">{columns.map((_, j) => <TableCell key={j} className="py-3.5"><Skeleton className="h-3.5 w-full max-w-[120px] rounded" /></TableCell>)}</TableRow>
              )) : table.getRowModel().rows?.length ? table.getRowModel().rows.map(row => (
                <TableRow key={row.id} className={cn('border-b transition-colors hover:bg-muted/50', onRowClick && 'cursor-pointer')} onClick={() => onRowClick?.(row.original)}>
                  {row.getVisibleCells().map(cell => <TableCell key={cell.id} className="text-sm py-3.5">{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>)}
                </TableRow>
              )) : (
                <TableRow><TableCell colSpan={columns.length} className="h-48 text-center text-muted-foreground">No ${sub.name.replace(/-/g, ' ')} found</TableCell></TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
      {!isLoading && table.getPageCount() > 0 && (
        <div className="border rounded-lg px-3 py-2.5 flex items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}</p>
          <div className="flex items-center gap-1">
            <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}><ChevronLeft className="h-4 w-4" /></Button>
            <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}><ChevronRight className="h-4 w-4" /></Button>
          </div>
        </div>
      )}
    </div>
  );
}
`;
}

function generateSelectorComponent(sub: SubDomain, domain: DomainConfig): string {
  const name = camelCase(sub.name);
  const keys = pascalCase(sub.name);
  const singular = pascalCase(sub.name.replace(/s$/, ''));

  return `'use client';

import { useState } from 'react';
import { Check, ChevronsUpDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { use${keys}List } from '../hook';
import type { ${singular} } from '../types';

interface ${singular}SelectorProps {
  value?: string;
  onValueChange?: (id: string, item: ${singular}) => void;
  placeholder?: string;
}

export function ${singular}Selector({ value, onValueChange, placeholder = 'Select ${singular.toLowerCase()}...' }: ${singular}SelectorProps) {
  const [open, setOpen] = useState(false);
  const { data, isLoading } = use${keys}List();

  const items = data?.data ?? [];

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" role="combobox" aria-expanded={open} className="w-full justify-between">
          {value ? items.find((i) => i.id === value)?.name ?? placeholder : placeholder}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0" align="start">
        <Command>
          <CommandInput placeholder="Search..." />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup>
              {isLoading ? (
                <CommandItem disabled>Loading...</CommandItem>
              ) : (
                items.map((item) => (
                  <CommandItem
                    key={item.id}
                    value={item.id}
                    onSelect={() => {
                      onValueChange?.(item.id, item);
                      setOpen(false);
                    }}
                  >
                    <Check className={cn('mr-2 h-4 w-4', value === item.id ? 'opacity-100' : 'opacity-0')} />
                    {item.name}
                  </CommandItem>
                ))
              )}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
`;
}

function generateSearchBarComponent(sub: SubDomain, domain: DomainConfig): string {
  return `'use client';

import { useState, useCallback } from 'react';
import { Search, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useSearch } from '../hook';

interface SearchBarProps {
  onSearch?: (query: string) => void;
  placeholder?: string;
}

export function SearchBar({ onSearch, placeholder = 'Search across finance...' }: SearchBarProps) {
  const [query, setQuery] = useState('');
  const { data, isLoading } = useSearch(query);

  const handleClear = useCallback(() => {
    setQuery('');
    onSearch?.('');
  }, [onSearch]);

  return (
    <div className="relative w-full max-w-lg">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          type="text"
          value={query}
          onChange={(e) => { setQuery(e.target.value); onSearch?.(e.target.value); }}
          placeholder={placeholder}
          className="pl-9 pr-9"
        />
        {query && (
          <Button variant="ghost" size="icon" className="absolute right-1 top-1/2 -translate-y-1/2 h-6 w-6" onClick={handleClear}>
            <X className="h-3.5 w-3.5" />
          </Button>
        )}
      </div>
      {isLoading && query && (
        <div className="absolute top-full left-0 right-0 mt-1 text-xs text-muted-foreground p-2">Searching...</div>
      )}
    </div>
  );
}
`;
}

function generateWizardComponent(sub: SubDomain, domain: DomainConfig): string {
  const keys = pascalCase(sub.name);

  return `'use client';

import { useState } from 'react';
import { Upload, FileText, CheckCircle, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useStartImport, useUploadImportFile, useGetImportTemplates } from '../hook';

type WizardStep = 'upload' | 'mapping' | 'preview' | 'importing' | 'complete';

interface ImportWizardProps {
  entityType: string;
  onComplete?: () => void;
  onCancel?: () => void;
}

export function ImportWizard({ entityType, onComplete, onCancel }: ImportWizardProps) {
  const [step, setStep] = useState<WizardStep>('upload');
  const [file, setFile] = useState<File | null>(null);
  const { data: templates } = useGetImportTemplates(entityType);
  const uploadMutation = useUploadImportFile();
  const startMutation = useStartImport();

  const steps = [
    { id: 'upload', label: 'Upload File' },
    { id: 'mapping', label: 'Map Columns' },
    { id: 'preview', label: 'Preview' },
    { id: 'importing', label: 'Importing' },
    { id: 'complete', label: 'Complete' },
  ];

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="h-5 w-5" />
          Import ${keys.replace(/Import/, '')}
        </CardTitle>
        <CardDescription>Follow the steps to import your data</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-2 mb-6">
          {steps.map((s, i) => (
            <div key={s.id} className="flex items-center gap-2">
              <div className={\`flex items-center justify-center h-8 w-8 rounded-full text-xs font-medium \${
                steps.findIndex(x => x.id === step) >= i
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-muted-foreground'
              }\`}>{i + 1}</div>
              <span className="text-xs hidden sm:inline">{s.label}</span>
              {i < steps.length - 1 && <div className="w-6 h-px bg-border" />}
            </div>
          ))}
        </div>

        {step === 'upload' && (
          <div className="space-y-4">
            <div className="border-2 border-dashed rounded-lg p-8 text-center hover:border-primary/50 transition-colors cursor-pointer"
              onClick={() => document.getElementById('import-file-input')?.click()}>
              <Upload className="h-10 w-10 mx-auto mb-3 text-muted-foreground" />
              <p className="text-sm font-medium">Click to upload or drag & drop</p>
              <p className="text-xs text-muted-foreground mt-1">CSV, XLSX, or TSV files supported</p>
              <input id="import-file-input" type="file" className="hidden" accept=".csv,.xlsx,.tsv"
                onChange={(e) => { const f = e.target.files?.[0]; if (f) setFile(f); }} />
            </div>
            {file && (
              <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                <div className="flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  <span className="text-sm">{file.name}</span>
                </div>
                <Button size="sm" onClick={() => setStep('mapping')}>Next</Button>
              </div>
            )}
          </div>
        )}

        {step === 'mapping' && (
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">Map your file columns to the required fields.</p>
            <div className="space-y-2">
              {templates?.data?.columns?.map((col: { name: string; required: boolean }) => (
                <div key={col.name} className="flex items-center gap-3 p-2 border rounded">
                  <span className="text-sm font-medium w-40">{col.name}{col.required && ' *'}</span>
                  <span className="text-xs text-muted-foreground">←</span>
                  <span className="text-sm text-muted-foreground">Select column...</span>
                </div>
              ))}
            </div>
            <div className="flex gap-2 justify-end">
              <Button variant="outline" onClick={onCancel}>Cancel</Button>
              <Button onClick={() => setStep('preview')}>Next</Button>
            </div>
          </div>
        )}

        {step === 'preview' && (
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">Preview your data before importing.</p>
            <div className="border rounded-lg p-4 text-center text-sm text-muted-foreground">
              Preview will appear here
            </div>
            <div className="flex gap-2 justify-end">
              <Button variant="outline" onClick={() => setStep('mapping')}>Back</Button>
              <Button onClick={() => setStep('complete')}>Start Import</Button>
            </div>
          </div>
        )}

        {step === 'complete' && (
          <div className="text-center space-y-4 py-6">
            <CheckCircle className="h-12 w-12 mx-auto text-green-500" />
            <h3 className="text-lg font-semibold">Import Complete</h3>
            <p className="text-sm text-muted-foreground">Your data has been imported successfully.</p>
            <Button onClick={onComplete}>Done</Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
`;
}

function generateRendererComponent(sub: SubDomain, domain: DomainConfig): string {
  const keys = pascalCase(sub.name);
  const singular = keys.replace(/CustomField$/, 'CustomField');

  return `'use client';

import type { CustomField, CustomFieldValue } from '../types';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';

interface CustomFieldRendererProps {
  fields: CustomField[];
  values: Record<string, unknown>;
  onChange: (fieldId: string, value: unknown) => void;
  readOnly?: boolean;
}

export function CustomFieldRenderer({ fields, values, onChange, readOnly }: CustomFieldRendererProps) {
  return (
    <div className="space-y-4">
      {fields.map((field) => {
        const val = values[field.id];

        if (readOnly) {
          return (
            <div key={field.id} className="flex flex-col gap-1">
              <Label className="text-xs text-muted-foreground">{field.label}</Label>
              <p className="text-sm">{val != null ? String(val) : '—'}</p>
            </div>
          );
        }

        switch (field.type) {
          case 'text':
          case 'email':
          case 'phone':
          case 'url':
            return (
              <div key={field.id} className="flex flex-col gap-1.5">
                <Label className="text-sm">{field.label}{field.isRequired && ' *'}</Label>
                <Input
                  type={field.type === 'email' ? 'email' : field.type === 'url' ? 'url' : field.type === 'phone' ? 'tel' : 'text'}
                  value={(val as string) ?? ''}
                  onChange={(e) => onChange(field.id, e.target.value)}
                  placeholder={field.placeholder}
                />
              </div>
            );
          case 'number':
            return (
              <div key={field.id} className="flex flex-col gap-1.5">
                <Label className="text-sm">{field.label}{field.isRequired && ' *'}</Label>
                <Input
                  type="number"
                  value={(val as number) ?? ''}
                  onChange={(e) => onChange(field.id, Number(e.target.value))}
                />
              </div>
            );
          case 'date':
            return (
              <div key={field.id} className="flex flex-col gap-1.5">
                <Label className="text-sm">{field.label}{field.isRequired && ' *'}</Label>
                <Input
                  type="date"
                  value={(val as string) ?? ''}
                  onChange={(e) => onChange(field.id, e.target.value)}
                />
              </div>
            );
          case 'textarea':
            return (
              <div key={field.id} className="flex flex-col gap-1.5">
                <Label className="text-sm">{field.label}{field.isRequired && ' *'}</Label>
                <Textarea
                  value={(val as string) ?? ''}
                  onChange={(e) => onChange(field.id, e.target.value)}
                  placeholder={field.placeholder}
                />
              </div>
            );
          case 'dropdown':
            return (
              <div key={field.id} className="flex flex-col gap-1.5">
                <Label className="text-sm">{field.label}{field.isRequired && ' *'}</Label>
                <Select value={(val as string) ?? ''} onValueChange={(v) => onChange(field.id, v)}>
                  <SelectTrigger><SelectValue placeholder={field.placeholder || 'Select...'} /></SelectTrigger>
                  <SelectContent>
                    {field.options.map((opt) => (
                      <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            );
          case 'checkbox':
            return (
              <div key={field.id} className="flex items-center gap-2">
                <Checkbox
                  checked={(val as boolean) ?? false}
                  onCheckedChange={(checked) => onChange(field.id, !!checked)}
                />
                <Label className="text-sm">{field.label}</Label>
              </div>
            );
          default:
            return (
              <div key={field.id} className="flex flex-col gap-1.5">
                <Label className="text-sm">{field.label}</Label>
                <Input value={val != null ? String(val) : ''} onChange={(e) => onChange(field.id, e.target.value)} />
              </div>
            );
        }
      })}
    </div>
  );
}
`;
}

function generateComponentsIndex(sub: SubDomain, domain: DomainConfig): string {
  const keys = pascalCase(sub.name);
  const singular = pascalCase(sub.name.replace(/s$/, ''));
  const lines: string[] = [];

  if (sub.hasListComponent) {
    lines.push(`export { ${keys}List } from './${sub.name}-list';`);
  }
  if (sub.hasSelectorComponent) {
    lines.push(`export { ${singular}Selector } from './${singular.toLowerCase()}-selector';`);
  }
  if (sub.hasSearchBarComponent) {
    lines.push(`export { SearchBar } from './search-bar';`);
  }
  if (sub.hasWizardComponent) {
    lines.push(`export { ImportWizard } from './import-wizard';`);
  }
  if (sub.hasRendererComponent) {
    lines.push(`export { CustomFieldRenderer } from './custom-field-renderer';`);
  }

  return lines.join('\n') + '\n';
}

function generateSubDomainIndex(sub: SubDomain, domain: DomainConfig): string {
  const name = camelCase(sub.name);
  const keys = pascalCase(sub.name);
  const singular = pascalCase(sub.name.replace(/s$/, ''));

  const lines: string[] = [
    `export * from './types';`,
    `export * from './constants';`,
    `export { ${name}Keys } from './query-keys';`,
    `export { ${name}Service } from './service';`,
  ];

  // Export schema items
  const typesStr = sub.schemaExtra || '';
  const schemaExports: string[] = [];
  const schemaRegex = /export\s+(?:const|type)\s+(\w+)/g;
  let match;
  while ((match = schemaRegex.exec(typesStr)) !== null) {
    schemaExports.push(match[1]);
  }
  if (schemaExports.length > 0) {
    lines.push(`export { ${schemaExports.join(', ')} } from './schema';`);
  }

  // Export hooks
  const hookExports: string[] = [];
  const hookStr = sub.hookExtra || '';
  const hookRegex = /export\s+function\s+(use\w+)/g;
  while ((match = hookRegex.exec(hookStr)) !== null) {
    hookExports.push(match[1]);
  }
  // Also add standard hooks
  const methods = sub.serviceMethods || ['getAll', 'getById', 'create', 'update', 'delete'];
  if (methods.includes('getAll')) hookExports.push(`use${keys}List`);
  if (methods.includes('getById')) hookExports.push(`use${singular}`);
  if (methods.includes('create')) hookExports.push(`useCreate${singular}`);
  if (methods.includes('update')) hookExports.push(`useUpdate${singular}`);
  if (methods.includes('delete')) hookExports.push(`useDelete${singular}`);
  if (methods.includes('getStats')) hookExports.push(`use${keys}Stats`);

  // Deduplicate and also add extra hook names
  const extraHookExports: string[] = [];
  while ((match = hookRegex.exec(hookStr)) !== null) {
    if (!hookExports.includes(match[1])) extraHookExports.push(match[1]);
  }

  lines.push(`export { ${[...hookExports, ...extraHookExports].join(', ')} } from './hook';`);

  // Export utils
  lines.push(`export * from './utils';`);

  // Export components
  const compLines: string[] = [];
  if (sub.hasListComponent) compLines.push(`${keys}List`);
  if (sub.hasSelectorComponent) compLines.push(`${singular}Selector`);
  if (sub.hasSearchBarComponent) compLines.push(`SearchBar`);
  if (sub.hasWizardComponent) compLines.push(`ImportWizard`);
  if (sub.hasRendererComponent) compLines.push(`CustomFieldRenderer`);
  if (compLines.length > 0) {
    lines.push(`export { ${compLines.join(', ')} } from './components';`);
  }

  return lines.join('\n') + '\n';
}

function generateDomainIndex(domain: DomainConfig): string {
  const lines = domain.subDomains.map(sub => {
    return `export * from './${sub.name}';`;
  });
  return `// ${domain.label} — Barrel Export\n${lines.join('\n')}\n`;
}

// ─────────────────────────────────────────────────────────────────────────────
// MAIN GENERATION
// ─────────────────────────────────────────────────────────────────────────────

for (const domain of domains) {
  const domainDir = join(BASE, domain.name);

  for (const sub of domain.subDomains) {
    const subDir = join(domainDir, sub.name);
    mkdirSync(subDir, { recursive: true });
    mkdirSync(join(subDir, 'components'), { recursive: true });

    // types.ts
    writeFileSync(join(subDir, 'types.ts'), generateTypes(sub, domain));

    // constants.ts
    writeFileSync(join(subDir, 'constants.ts'), generateConstants(sub, domain));

    // query-keys.ts
    writeFileSync(join(subDir, 'query-keys.ts'), generateQueryKeys(sub, domain));

    // schema.ts
    writeFileSync(join(subDir, 'schema.ts'), generateSchema(sub, domain));

    // service.ts
    writeFileSync(join(subDir, 'service.ts'), generateService(sub, domain));

    // utils.ts
    writeFileSync(join(subDir, 'utils.ts'), generateUtils(sub, domain));

    // hook.ts
    writeFileSync(join(subDir, 'hook.ts'), generateHook(sub, domain));

    // components
    if (sub.hasListComponent) {
      writeFileSync(join(subDir, 'components', `${sub.name}-list.tsx`), generateListComponent(sub, domain));
    }
    if (sub.hasSelectorComponent) {
      const singular = pascalCase(sub.name.replace(/s$/, ''));
      writeFileSync(join(subDir, 'components', `${singular.toLowerCase()}-selector.tsx`), generateSelectorComponent(sub, domain));
    }
    if (sub.hasSearchBarComponent) {
      writeFileSync(join(subDir, 'components', 'search-bar.tsx'), generateSearchBarComponent(sub, domain));
    }
    if (sub.hasWizardComponent) {
      writeFileSync(join(subDir, 'components', 'import-wizard.tsx'), generateWizardComponent(sub, domain));
    }
    if (sub.hasRendererComponent) {
      writeFileSync(join(subDir, 'components', 'custom-field-renderer.tsx'), generateRendererComponent(sub, domain));
    }

    // components/index.ts
    writeFileSync(join(subDir, 'components', 'index.ts'), generateComponentsIndex(sub, domain));

    // sub-domain index.ts
    writeFileSync(join(subDir, 'index.ts'), generateSubDomainIndex(sub, domain));
  }

  // domain index.ts
  writeFileSync(join(domainDir, 'index.ts'), generateDomainIndex(domain));
}

console.log('✅ All finance domain files generated successfully!');
