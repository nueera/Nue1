// @ts-nocheck
// ============================================================================
// Marketing Mock Data Collections
// Comprehensive mock data for all Marketing module entities
// ============================================================================

import type {
  Lead,
  LeadActivity,
  MarketingContact,
  Campaign,
  EmailCampaign,
  SmsCampaign,
  WhatsappCampaign,
  SocialCampaign,
  Journey,
  SignupForm,
  LandingPage,
  Popup,
  Audience,
  Segment,
  ScoringRule,
  LeadStageDefinition,
  StageTransition,
  MarketingPlan,
  EcommerceStore,
  AbandonedCart,
  PurchaseFollowup,
  ProductCampaign,
  MarketingAnalytics,
  Workflow,
  SmartUrl,
  CrmSyncConfig,
  ConsentRecord,
  GdprRequest,
  UnsubscribeEntry,
  Integration,
  MarketingDashboard,
  ABTest,
  SocialAccount,
  SocialPost,
  EmailTemplate,
  TemplateCategory,
} from '../types';

// ---------------------------------------------------------------------------
// Helper utilities
// ---------------------------------------------------------------------------

const id = (prefix: string, num: number) => `${prefix}${String(num).padStart(4, '0')}`;
const rand = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;
const pick = <T,>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];
const dateStr = (daysAgo: number) => {
  const d = new Date();
  d.setDate(d.getDate() - daysAgo);
  return d.toISOString();
};

// ---------------------------------------------------------------------------
// 50 Leads with varied sources, stages, scores
// ---------------------------------------------------------------------------

const LEAD_SOURCES = ['website', 'social_media', 'email', 'referral', 'paid_ads', 'organic_search', 'events', 'webinar', 'content_download', 'chat', 'phone', 'partner'] as const;
const LEAD_STAGES = ['new', 'contacted', 'qualified', 'proposal', 'negotiation', 'closed_won', 'closed_lost', 'nurturing'] as const;
const LEAD_STATUSES = ['active', 'inactive', 'converted', 'disqualified', 'recycled'] as const;
const FIRST_NAMES = ['Emma', 'Liam', 'Olivia', 'Noah', 'Ava', 'Ethan', 'Sophia', 'Mason', 'Isabella', 'William', 'Mia', 'James', 'Charlotte', 'Benjamin', 'Amelia', 'Lucas', 'Harper', 'Henry', 'Evelyn', 'Alexander', 'Abigail', 'Daniel', 'Emily', 'Michael', 'Madison', 'Sebastian', 'Luna', 'Jack', 'Chloe', 'Owen', 'Penelope', 'Aiden', 'Layla', 'Samuel', 'Riley', 'Ryan', 'Zoey', 'Nathan', 'Nora', 'Caleb', 'Lily', 'Christian', 'Eleanor', 'Dylan', 'Hannah', 'Isaac', 'Lillian', 'Joshua', 'Addison', 'Andrew'];
const LAST_NAMES = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 'Rodriguez', 'Martinez', 'Hernandez', 'Lopez', 'Gonzalez', 'Wilson', 'Anderson', 'Thomas', 'Taylor', 'Moore', 'Jackson', 'Martin', 'Lee', 'Perez', 'Thompson', 'White', 'Harris', 'Sanchez', 'Clark', 'Ramirez', 'Lewis', 'Robinson', 'Walker', 'Young', 'Allen', 'King', 'Wright', 'Scott', 'Torres', 'Nguyen', 'Hill', 'Flores', 'Green', 'Adams', 'Nelson', 'Baker', 'Hall', 'Rivera', 'Campbell', 'Mitchell', 'Carter', 'Roberts'];
const COMPANIES = ['Acme Corp', 'Globex Inc', 'Initech', 'Umbrella Co', 'Stark Industries', 'Wayne Enterprises', 'Aperture Science', 'Cyberdyne Systems', 'Soylent Corp', 'Wonka Industries', 'Oscorp', 'Massive Dynamic', 'Prestige Worldwide', 'Hooli', 'Pied Piper', 'Dunder Mifflin', 'Sterling Cooper', 'Pawnee Corp', 'Wernham Hogg', 'Pentonix Ltd', 'Vehement Capital', 'Horizon Labs', 'Nexus Group', 'Pinnacle Systems', 'Atlas Corp', 'Forge Industries', 'Beacon Tech', 'Summit Solutions', 'Catalyst Ventures', 'Apex Dynamics'];

const ACTIVITY_TYPES = ['email_open', 'email_click', 'page_visit', 'form_submit', 'download', 'event_attend', 'social_engage', 'call', 'meeting', 'note'] as const;

export const mockLeads: Lead[] = Array.from({ length: 50 }, (_, i) => {
  const firstName = FIRST_NAMES[i % FIRST_NAMES.length];
  const lastName = LAST_NAMES[i % LAST_NAMES.length];
  const company = COMPANIES[i % COMPANIES.length];
  const stage = LEAD_STAGES[i % LEAD_STAGES.length];
  const source = LEAD_SOURCES[i % LEAD_SOURCES.length];
  const engagement = rand(10, 90);
  const fit = rand(10, 90);
  const behavior = rand(10, 90);
  const total = Math.round((engagement + fit + behavior) / 3);

  const activities: LeadActivity[] = Array.from({ length: rand(2, 8) }, (_, j) => ({
    id: `act-${i}-${j}`,
    leadId: id('LD-', i + 1),
    type: ACTIVITY_TYPES[j % ACTIVITY_TYPES.length],
    description: `${ACTIVITY_TYPES[j % ACTIVITY_TYPES.length].replace('_', ' ')} activity`,
    timestamp: dateStr(rand(1, 90)),
  }));

  return {
    id: id('LD-', i + 1),
    firstName,
    lastName,
    email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@${company.toLowerCase().replace(/\s/g, '')}.com`,
    phone: `+1${rand(200, 999)}${rand(200, 999)}${rand(1000, 9999)}`,
    company,
    jobTitle: pick(['CEO', 'CTO', 'VP Marketing', 'Marketing Manager', 'Director of Sales', 'Head of Growth', 'CMO', 'Marketing Coordinator', 'Sales Manager', 'Business Development']),
    source,
    stage,
    status: LEAD_STATUSES[i % LEAD_STATUSES.length],
    score: { total, engagement, fit, behavior, lastUpdated: dateStr(rand(0, 7)) },
    assignedTo: pick(['user-1', 'user-2', 'user-3', 'user-4', undefined]) as string | undefined,
    tags: [pick(['hot', 'warm', 'cold', 'enterprise', 'smb', 'startup', 'partner', 'churned']), pick(['q1', 'q2', 'q3', 'q4', 'priority', 'follow-up'])].filter(Boolean) as string[],
    activities,
    createdAt: dateStr(rand(30, 365)),
    updatedAt: dateStr(rand(0, 30)),
    lastContactedAt: dateStr(rand(0, 14)),
    notes: i % 3 === 0 ? 'Follow up next week' : undefined,
  };
});

// ---------------------------------------------------------------------------
// 30 Marketing Contacts
// ---------------------------------------------------------------------------

const CONTACT_PREFERENCES = ['email', 'sms', 'whatsapp', 'phone'] as const;

export const mockContacts: MarketingContact[] = Array.from({ length: 30 }, (_, i) => {
  const firstName = FIRST_NAMES[i % FIRST_NAMES.length];
  const lastName = LAST_NAMES[(i + 5) % LAST_NAMES.length];
  const company = COMPANIES[(i + 3) % COMPANIES.length];

  return {
    id: id('CT-', i + 1),
    firstName,
    lastName,
    email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@${company.toLowerCase().replace(/\s/g, '')}.com`,
    phone: `+1${rand(200, 999)}${rand(200, 999)}${rand(1000, 9999)}`,
    company,
    jobTitle: pick(['Marketing Director', 'VP Sales', 'Growth Lead', 'Product Manager', 'CEO', 'CMO', 'Digital Marketing Specialist', 'Content Strategist']),
    preferences: [CONTACT_PREFERENCES[i % CONTACT_PREFERENCES.length], CONTACT_PREFERENCES[(i + 1) % CONTACT_PREFERENCES.length]],
    timeline: Array.from({ length: rand(3, 10) }, (_, j) => ({
      id: `tl-${i}-${j}`,
      type: pick(['email_sent', 'email_opened', 'email_clicked', 'sms_sent', 'form_submitted', 'page_visited', 'purchase'] as const),
      description: `Activity ${j + 1}`,
      timestamp: dateStr(rand(1, 60)),
      campaignId: id('CAMP-', rand(1, 20)),
    })),
    tags: [pick(['vip', 'enterprise', 'smb', 'new', 'loyal', 'at-risk']), pick(['tech', 'finance', 'healthcare', 'retail', 'education'])] as string[],
    leadId: i < 30 ? id('LD-', i + 1) : undefined,
    subscribedAt: dateStr(rand(60, 365)),
    bounceCount: rand(0, 3),
    lastEngagedAt: dateStr(rand(0, 14)),
  };
});

// ---------------------------------------------------------------------------
// 20 Campaigns across all types
// ---------------------------------------------------------------------------

const CAMPAIGN_NAMES = ['Spring Sale', 'Welcome Series', 'Product Launch', 'Re-engagement', 'Newsletter Weekly', 'Black Friday', 'Holiday Special', 'Year End Review', 'New Feature', 'Customer Spotlight', 'Summer Promo', 'Back to School', 'Flash Sale', 'Loyalty Rewards', 'Referral Program', 'Onboarding Drip', 'Win-Back', 'Survey Campaign', 'Event Invitation', 'Monthly Digest'];

const CHANNELS = ['email', 'sms', 'whatsapp', 'facebook', 'instagram', 'linkedin', 'twitter', 'google_ads', 'web_push'] as const;
const CAMPAIGN_STATUSES = ['draft', 'scheduled', 'sending', 'active', 'paused', 'completed', 'archived'] as const;

export const mockCampaigns: Campaign[] = Array.from({ length: 20 }, (_, i) => {
  const type = pick(['email', 'sms', 'whatsapp', 'social', 'multi_channel'] as const);
  const channel = CHANNELS[i % CHANNELS.length];
  const sent = rand(500, 50000);
  const delivered = Math.round(sent * (0.85 + Math.random() * 0.12));
  const opened = Math.round(delivered * (0.15 + Math.random() * 0.3));
  const clicked = Math.round(opened * (0.1 + Math.random() * 0.3));
  const bounced = sent - delivered;

  return {
    id: id('CAMP-', i + 1),
    name: CAMPAIGN_NAMES[i],
    type,
    channel,
    status: CAMPAIGN_STATUSES[i % CAMPAIGN_STATUSES.length],
    subject: i < 12 ? CAMPAIGN_NAMES[i] : undefined,
    previewText: i < 12 ? `Check out our ${CAMPAIGN_NAMES[i].toLowerCase()} deals!` : undefined,
    fromName: 'Marketing Team',
    fromEmail: i < 12 ? 'marketing@company.com' : undefined,
    audienceId: id('AUD-', rand(1, 12)),
    segmentId: rand(0, 1) ? id('SEG-', rand(1, 8)) : undefined,
    metrics: {
      sent,
      delivered,
      opened,
      clicked,
      bounced,
      unsubscribed: rand(0, Math.round(sent * 0.02)),
      complained: rand(0, Math.round(sent * 0.005)),
      converted: rand(0, Math.round(clicked * 0.3)),
      revenue: rand(1000, 50000),
    },
    scheduledAt: i % 3 === 0 ? dateStr(rand(0, 14)) : undefined,
    sentAt: i % 2 === 0 ? dateStr(rand(1, 60)) : undefined,
    completedAt: i % 4 === 0 ? dateStr(rand(0, 30)) : undefined,
    tags: [pick(['promotional', 'transactional', 'newsletter', 'drip', 'event']), pick(['high-priority', 'normal', 'low-priority'])] as string[],
    createdAt: dateStr(rand(30, 180)),
    updatedAt: dateStr(rand(0, 14)),
    createdBy: pick(['user-1', 'user-2', 'user-3']),
  };
});

// Email Campaigns (subset)
export const mockEmailCampaigns: EmailCampaign[] = mockCampaigns.filter(c => c.type === 'email').map((c, i) => ({
  ...c,
  type: 'email' as const,
  subject: c.subject || `Email Campaign ${i + 1}`,
  preheader: c.previewText || 'Preview text here',
  templateId: id('TPL-', rand(1, 10)),
  contentHtml: '<html><body><h1>Campaign Content</h1></body></html>',
  contentText: 'Campaign Content',
  replyToEmail: 'reply@company.com',
}));

// SMS Campaigns
export const mockSmsCampaigns: SmsCampaign[] = mockCampaigns.filter(c => c.type === 'sms').map((c, i) => ({
  ...c,
  type: 'sms' as const,
  message: `Hey! Check out our latest offer: ${c.name}. Reply STOP to unsubscribe.`,
  senderId: 'NUEMKT',
  shortLink: `https://nue.one/s/${rand(1000, 9999)}`,
  optOutMessage: 'Reply STOP to opt out',
}));

// WhatsApp Campaigns
export const mockWhatsappCampaigns: WhatsappCampaign[] = mockCampaigns.filter(c => c.type === 'whatsapp').map((c, i) => ({
  ...c,
  type: 'whatsapp' as const,
  templateName: pick(['welcome_message', 'order_confirmation', 'promotional_offer', 'event_reminder']),
  templateLanguage: 'en',
  headerText: c.name,
  bodyText: `Hello! We have an exciting offer for you: ${c.name}.`,
  footerText: 'Unsubscribe: Reply STOP',
  buttonActions: ['Visit Website', 'Learn More'],
}));

// Social Campaigns
export const mockSocialCampaigns: SocialCampaign[] = mockCampaigns.filter(c => c.type === 'social').map((c, i) => ({
  ...c,
  type: 'social' as const,
  platform: pick(['facebook', 'instagram', 'linkedin', 'twitter'] as const),
  postContent: `🎉 Exciting news! ${c.name} is here. Don't miss out! #marketing #campaign`,
  mediaUrls: [`https://cdn.nue.one/campaigns/media-${i + 1}.jpg`],
  targetAudience: pick(['all_followers', 'custom_audience', 'lookalike']),
  budget: rand(100, 5000),
  impressions: rand(10000, 500000),
  engagement: rand(500, 50000),
}));

// ---------------------------------------------------------------------------
// 10 Customer Journeys with nodes and edges
// ---------------------------------------------------------------------------

const JOURNEY_NAMES = ['Welcome Series', 'Onboarding Flow', 'Win-Back Journey', 'Post-Purchase', 'Lead Nurturing', 'Re-engagement', 'Abandoned Cart', 'Event Follow-Up', 'Subscription Lifecycle', 'Customer Advocacy'];
const JOURNEY_TRIGGERS = ['list_entry', 'form_submit', 'page_visit', 'email_open', 'email_click', 'purchase', 'custom_event', 'date_based', 'score_threshold', 'api_call'] as const;
const NODE_TYPES = ['trigger', 'delay', 'email', 'sms', 'whatsapp', 'condition', 'action', 'exit', 'webhook', 'update_field'] as const;

export const mockJourneys: Journey[] = Array.from({ length: 10 }, (_, i) => {
  const nodeCount = rand(4, 10);
  const nodes = Array.from({ length: nodeCount }, (_, j) => ({
    id: `node-${i}-${j}`,
    type: NODE_TYPES[j % NODE_TYPES.length],
    label: NODE_TYPES[j % NODE_TYPES.length].replace('_', ' '),
    config: { delay: j === 1 ? '2 hours' : undefined },
    position: { x: j * 250, y: (j % 2) * 120 },
  }));

  const edges = Array.from({ length: nodeCount - 1 }, (_, j) => ({
    id: `edge-${i}-${j}`,
    source: `node-${i}-${j}`,
    target: `node-${i}-${j + 1}`,
    label: j % 3 === 0 ? 'Yes' : undefined,
    condition: j % 3 === 0 ? 'opened > 0' : undefined,
  }));

  return {
    id: id('JRN-', i + 1),
    name: JOURNEY_NAMES[i],
    description: `Automated ${JOURNEY_NAMES[i].toLowerCase()} journey for better engagement`,
    trigger: JOURNEY_TRIGGERS[i % JOURNEY_TRIGGERS.length],
    triggerConfig: { event: JOURNEY_TRIGGERS[i % JOURNEY_TRIGGERS.length] },
    nodes,
    edges,
    status: pick(['draft', 'active', 'paused', 'completed', 'archived'] as const),
    enrolledCount: rand(100, 10000),
    activeCount: rand(50, 3000),
    completedCount: rand(20, 5000),
    tags: [pick(['automation', 'engagement', 'conversion', 'retention'])],
    createdAt: dateStr(rand(30, 180)),
    updatedAt: dateStr(rand(0, 14)),
  };
});

// ---------------------------------------------------------------------------
// 15 Signup Forms with fields
// ---------------------------------------------------------------------------

const FORM_THEMES = ['minimal', 'card', 'full', 'popup', 'slide_in', 'floating_bar'] as const;
const FORM_NAMES = ['Newsletter Signup', 'Contact Us', 'Free Trial', 'Demo Request', 'Ebook Download', 'Webinar Registration', 'Early Access', 'Beta Program', 'Partner Application', 'Quote Request', 'Event RSVP', 'Product Update', 'Consultation Request', 'Feedback Form', 'Survey'];

export const mockSignupForms: SignupForm[] = Array.from({ length: 15 }, (_, i) => {
  const fieldCount = rand(3, 7);
  const fields = Array.from({ length: fieldCount }, (_, j) => ({
    id: `field-${i}-${j}`,
    type: pick(['text', 'email', 'phone', 'select', 'checkbox', 'textarea', 'consent'] as const),
    label: ['First Name', 'Last Name', 'Email', 'Phone', 'Company', 'Message', 'I agree to the privacy policy'][j % 7],
    name: ['firstName', 'lastName', 'email', 'phone', 'company', 'message', 'consent'][j % 7],
    placeholder: ['John', 'Doe', 'john@example.com', '+1 555-0100', 'Acme Inc', 'Your message...', ''][j % 7],
    required: j < 3,
    options: j === 3 ? ['Option A', 'Option B', 'Option C'] : undefined,
    order: j,
  }));

  return {
    id: id('FRM-', i + 1),
    name: FORM_NAMES[i],
    fields,
    theme: FORM_THEMES[i % FORM_THEMES.length],
    submitButtonText: pick(['Subscribe', 'Get Access', 'Register', 'Submit', 'Sign Up', 'Join Now']),
    successMessage: 'Thanks for signing up!',
    redirectUrl: i % 3 === 0 ? '/thank-you' : undefined,
    doubleOptIn: i % 2 === 0,
    tags: [pick(['lead-gen', 'newsletter', 'event', 'content'])],
    submissions: rand(50, 5000),
    conversionRate: Math.round((5 + Math.random() * 25) * 100) / 100,
    status: pick(['active', 'inactive', 'draft'] as const),
    createdAt: dateStr(rand(30, 180)),
    updatedAt: dateStr(rand(0, 14)),
  };
});

// ---------------------------------------------------------------------------
// 10 Landing Pages with sections
// ---------------------------------------------------------------------------

const PAGE_SECTIONS = ['hero', 'features', 'testimonials', 'pricing', 'cta', 'faq', 'form', 'video', 'gallery', 'stats'] as const;

export const mockLandingPages: LandingPage[] = Array.from({ length: 10 }, (_, i) => {
  const sectionCount = rand(3, 6);
  const sections = Array.from({ length: sectionCount }, (_, j) => PAGE_SECTIONS[(i + j) % PAGE_SECTIONS.length]);
  const totalViews = rand(500, 50000);
  const totalConversions = Math.round(totalViews * (0.02 + Math.random() * 0.08));

  return {
    id: id('LP-', i + 1),
    name: [`Product Launch ${i + 1}`, 'Free Trial', 'Summer Sale', 'Webinar Replay', 'Annual Report', 'New Feature', 'Partner Program', 'Case Study', 'Demo Page', 'Special Offer'][i],
    slug: `landing-page-${i + 1}`,
    url: `https://nue.one/lp/landing-page-${i + 1}`,
    sections,
    variants: Array.from({ length: 2 }, (_, v) => ({
      id: `variant-${i}-${v}`,
      name: v === 0 ? 'Control' : `Variant ${v}`,
      sections,
      views: Math.round(totalViews / 2),
      conversions: v === 0 ? Math.round(totalConversions * 0.45) : Math.round(totalConversions * 0.55),
      conversionRate: v === 0 ? 3.2 : 4.1,
      isControl: v === 0,
    })),
    totalViews,
    totalConversions,
    conversionRate: Math.round((totalConversions / totalViews) * 10000) / 100,
    status: pick(['published', 'draft', 'archived'] as const),
    publishedAt: dateStr(rand(10, 90)),
    createdAt: dateStr(rand(60, 180)),
    updatedAt: dateStr(rand(0, 14)),
  };
});

// ---------------------------------------------------------------------------
// 8 Popups with triggers
// ---------------------------------------------------------------------------

const POPUP_TRIGGERS = ['time_on_page', 'scroll_percentage', 'exit_intent', 'click_element', 'page_load', 'inactivity'] as const;
const POPUP_TARGETINGS = ['all_visitors', 'new_visitors', 'returning_visitors', 'specific_pages', 'specific_segments'] as const;

export const mockPopups: Popup[] = Array.from({ length: 8 }, (_, i) => {
  const views = rand(1000, 50000);
  const conversions = Math.round(views * (0.01 + Math.random() * 0.05));

  return {
    id: id('POP-', i + 1),
    name: ['Welcome Popup', 'Exit Intent', 'Newsletter Bar', 'Flash Sale', 'Cookie Consent', 'Free Trial Popup', 'Survey Popup', 'Announcement'][i],
    type: pick(['popup', 'slide_in', 'floating_bar', 'full_screen', 'sticky_bar'] as const),
    trigger: POPUP_TRIGGERS[i % POPUP_TRIGGERS.length],
    triggerConfig: { seconds: rand(3, 15), percentage: rand(30, 80) },
    targeting: [POPUP_TARGETINGS[i % POPUP_TARGETINGS.length]],
    targetingConfig: { pages: ['/pricing', '/features'] },
    views,
    conversions,
    conversionRate: Math.round((conversions / views) * 10000) / 100,
    status: pick(['active', 'inactive', 'draft'] as const),
    createdAt: dateStr(rand(30, 180)),
    updatedAt: dateStr(rand(0, 14)),
  };
});

// ---------------------------------------------------------------------------
// 12 Audiences with member counts
// ---------------------------------------------------------------------------

const AUDIENCE_NAMES = ['All Subscribers', 'Active Users', 'Enterprise Leads', 'SMB Contacts', 'Newsletter', 'Product Users', 'Event Attendees', 'Partners', 'VIP Customers', 'Cold Leads', 'New Signups', 'Churned Users'];

export const mockAudiences: Audience[] = Array.from({ length: 12 }, (_, i) => {
  const memberCount = rand(500, 50000);
  const activeCount = Math.round(memberCount * (0.5 + Math.random() * 0.4));

  return {
    id: id('AUD-', i + 1),
    name: AUDIENCE_NAMES[i],
    description: `${AUDIENCE_NAMES[i]} audience segment`,
    memberCount,
    activeCount,
    growth: Array.from({ length: 12 }, (_, m) => ({
      date: new Date(2024, m, 1).toISOString().split('T')[0],
      added: rand(50, 500),
      removed: rand(10, 100),
      total: memberCount + rand(-500, 500),
    })),
    tags: [pick(['primary', 'secondary', 'dynamic', 'static'])],
    createdAt: dateStr(rand(60, 365)),
    updatedAt: dateStr(rand(0, 14)),
  };
});

// ---------------------------------------------------------------------------
// 8 Segments with rules
// ---------------------------------------------------------------------------

const SEGMENT_NAMES = ['High Engagement', 'Enterprise Prospects', 'Cold Contacts', 'Recent Signups', 'Email Clickers', 'Cart Abandoners', 'VIP Customers', 'At-Risk Users'];

export const mockSegments: Segment[] = Array.from({ length: 8 }, (_, i) => ({
  id: id('SEG-', i + 1),
  name: SEGMENT_NAMES[i],
  description: `${SEGMENT_NAMES[i]} segment definition`,
  rules: Array.from({ length: rand(1, 3) }, (_, j) => ({
    id: `rule-${i}-${j}`,
    name: `Rule ${j + 1}`,
    conditions: Array.from({ length: rand(1, 3) }, (_, k) => ({
      id: `cond-${i}-${j}-${k}`,
      field: ['email_opens', 'page_views', 'lead_score', 'last_activity', 'company_size', 'signup_date'][k % 6],
      operator: pick(['greater_than', 'less_than', 'equals', 'contains', 'between'] as const),
      value: [5, 10, 80, 'enterprise', 30, '2024-01-01'][k % 6],
      logicalOperator: k === 0 ? 'and' as const : pick(['and', 'or'] as const),
    })),
  })),
  memberCount: rand(100, 10000),
  isDynamic: i % 2 === 0,
  lastEvaluatedAt: dateStr(rand(0, 3)),
  tags: [pick(['dynamic', 'static', 'auto'])],
  createdAt: dateStr(rand(30, 180)),
  updatedAt: dateStr(rand(0, 7)),
}));

// ---------------------------------------------------------------------------
// 10 Scoring Rules
// ---------------------------------------------------------------------------

const SCORING_CRITERIA = ['email_engagement', 'web_activity', 'social_engagement', 'demographic_fit', 'behavioral', 'custom'] as const;

export const mockScoringRules: ScoringRule[] = Array.from({ length: 10 }, (_, i) => ({
  id: id('SCR-', i + 1),
  name: [
    'Email Open Bonus', 'Email Click Bonus', 'Page Visit Bonus', 'Form Submission', 'High Value Page',
    'Inactivity Penalty', 'Bounce Penalty', 'Unsubscribe Penalty', 'Job Title Match', 'Company Size Fit',
  ][i],
  criteria: SCORING_CRITERIA[i % SCORING_CRITERIA.length],
  condition: i < 5 ? 'Action performed within 30 days' : 'Negative signal detected',
  points: i < 5 ? rand(5, 20) : rand(-15, -5),
  isPositive: i < 5,
  isActive: i !== 7,
}));

// ---------------------------------------------------------------------------
// 6 Stage Definitions with transitions
// ---------------------------------------------------------------------------

export const mockLeadStages: LeadStageDefinition[] = [
  { id: 'stage-new', name: 'New', order: 0, color: 'blue', probability: 10, isDefault: true },
  { id: 'stage-contacted', name: 'Contacted', order: 1, color: 'cyan', probability: 20, isDefault: false },
  { id: 'stage-qualified', name: 'Qualified', order: 2, color: 'green', probability: 40, isDefault: false },
  { id: 'stage-proposal', name: 'Proposal', order: 3, color: 'amber', probability: 60, isDefault: false },
  { id: 'stage-negotiation', name: 'Negotiation', order: 4, color: 'orange', probability: 80, isDefault: false },
  { id: 'stage-closed-won', name: 'Closed Won', order: 5, color: 'emerald', probability: 100, isDefault: false },
];

export const mockStageTransitions: StageTransition[] = Array.from({ length: 15 }, (_, i) => ({
  id: `trans-${i + 1}`,
  leadId: id('LD-', rand(1, 50)),
  fromStage: mockLeadStages[rand(0, 4)].name,
  toStage: mockLeadStages[rand(1, 5)].name,
  reason: i % 3 === 0 ? 'Lead responded to email' : undefined,
  timestamp: dateStr(rand(1, 60)),
  performedBy: pick(['user-1', 'user-2', 'user-3']),
}));

// ---------------------------------------------------------------------------
// 8 Marketing Plans with activities
// ---------------------------------------------------------------------------

const PLAN_ACTIVITIES = ['campaign', 'content', 'event', 'social_post', 'ad_spend', 'review', 'meeting', 'deadline'] as const;

export const mockMarketingPlans: MarketingPlan[] = Array.from({ length: 8 }, (_, i) => ({
  id: id('PLN-', i + 1),
  name: ['Q1 Marketing Plan', 'Product Launch 2024', 'Brand Awareness Campaign', 'Customer Retention Strategy', 'Holiday Season Plan', 'Content Marketing Roadmap', 'Partnership Expansion', 'Digital Transformation'][i],
  description: `Strategic marketing plan for ${['Q1', 'product launch', 'brand awareness', 'retention', 'holidays', 'content', 'partnerships', 'digital'][i]}`,
  startDate: '2024-01-01',
  endDate: '2024-12-31',
  activities: Array.from({ length: rand(3, 8) }, (_, j) => PLAN_ACTIVITIES[(i + j) % PLAN_ACTIVITIES.length]),
  budget: {
    allocated: rand(10000, 100000),
    spent: rand(5000, 80000),
    remaining: rand(5000, 30000),
    currency: 'USD',
  },
  milestones: Array.from({ length: rand(2, 5) }, (_, j) => ({
    id: `ms-${i}-${j}`,
    name: [`Phase ${j + 1}`, 'Launch', 'Review', 'Optimize', 'Report'][j % 5],
    dueDate: new Date(2024, j * 2 + 1, 1).toISOString().split('T')[0],
    completed: j < 2,
    completedAt: j < 2 ? new Date(2024, j * 2, 28).toISOString().split('T')[0] : undefined,
  })),
  status: pick(['planning', 'active', 'completed', 'on_hold', 'cancelled'] as const),
  tags: [pick(['strategic', 'tactical', 'quarterly', 'annual'])],
  createdAt: dateStr(rand(90, 365)),
  updatedAt: dateStr(rand(0, 14)),
}));

// ---------------------------------------------------------------------------
// 5 E-Commerce Stores with carts
// ---------------------------------------------------------------------------

const STORE_PLATFORMS = ['shopify', 'woocommerce', 'magento', 'bigcommerce', 'custom'] as const;

export const mockEcommerceStores: EcommerceStore[] = Array.from({ length: 5 }, (_, i) => ({
  id: id('STR-', i + 1),
  name: ['Main Store', 'EU Storefront', 'Wholesale Portal', 'Subscription Box', 'Pop-Up Shop'][i],
  platform: STORE_PLATFORMS[i],
  domain: [`shop${i + 1}.nue.one`, `eu.nue.one`, `wholesale.nue.one`, `box.nue.one`, `popup.nue.one`][i],
  currency: ['USD', 'EUR', 'USD', 'USD', 'GBP'][i],
  productCount: rand(50, 500),
  orderCount: rand(1000, 50000),
  revenue: rand(50000, 500000),
  connectedAt: dateStr(rand(60, 365)),
  status: i === 3 ? 'error' as const : 'connected' as const,
}));

export const mockAbandonedCarts: AbandonedCart[] = Array.from({ length: 20 }, (_, i) => {
  const itemCount = rand(1, 5);
  return {
    id: id('CART-', i + 1),
    contactId: id('CT-', rand(1, 30)),
    storeId: id('STR-', rand(1, 5)),
    items: Array.from({ length: itemCount }, (_, j) => ({
      productId: `prod-${rand(1, 100)}`,
      name: `Product ${rand(1, 100)}`,
      quantity: rand(1, 3),
      price: rand(10, 200),
    })),
    total: rand(20, 500),
    currency: 'USD',
    abandonedAt: dateStr(rand(1, 14)),
    recoveredAt: i % 5 === 0 ? dateStr(rand(0, 7)) : undefined,
    recoveryEmailSent: i % 3 === 0,
    recoverySmsSent: i % 5 === 0,
    status: i % 5 === 0 ? 'recovered' as const : i % 4 === 0 ? 'expired' as const : 'active' as const,
  };
});

export const mockPurchaseFollowups: PurchaseFollowup[] = Array.from({ length: 8 }, (_, i) => ({
  id: id('PF-', i + 1),
  name: ['Thank You Email', 'Review Request', 'Cross-Sell', 'Upsell Premium', 'Referral Ask', 'Satisfaction Survey', 'Reorder Reminder', 'Loyalty Reward'][i],
  triggerEvent: pick(['purchase', 'delivery', 'review_request', 'cross_sell', 'upsell'] as const),
  templateId: id('TPL-', rand(1, 10)),
  delayDays: rand(1, 14),
  status: i % 4 === 0 ? 'inactive' as const : 'active' as const,
  sentCount: rand(100, 5000),
  conversionRate: Math.round((2 + Math.random() * 15) * 100) / 100,
}));

export const mockProductCampaigns: ProductCampaign[] = Array.from({ length: 10 }, (_, i) => ({
  id: id('PC-', i + 1),
  name: [`Product Launch ${i + 1}`, 'Summer Sale', 'Clearance Event', 'Featured Collection', 'Bundle Deal'][i % 5],
  productId: `prod-${rand(1, 100)}`,
  type: pick(['launch', 'promotion', 'clearance', 'featured', 'bundle'] as const),
  startDate: dateStr(rand(0, 30)),
  endDate: dateStr(rand(30, 90)),
  discount: i % 2 === 0 ? rand(5, 30) : undefined,
  status: pick(['draft', 'active', 'completed', 'cancelled'] as const),
  metrics: {
    sent: rand(1000, 50000),
    delivered: rand(900, 45000),
    opened: rand(200, 15000),
    clicked: rand(50, 5000),
    bounced: rand(10, 500),
    unsubscribed: rand(0, 100),
    complained: rand(0, 20),
    converted: rand(10, 1000),
    revenue: rand(1000, 30000),
  },
}));

// ---------------------------------------------------------------------------
// Analytics Data
// ---------------------------------------------------------------------------

export const mockMarketingAnalytics: MarketingAnalytics = {
  period: 'last_30_days',
  startDate: dateStr(30),
  endDate: dateStr(0),
  totalSent: 245000,
  totalDelivered: 231750,
  totalOpened: 57850,
  totalClicked: 17350,
  totalConverted: 3470,
  totalRevenue: 89450,
  openRate: 24.96,
  clickRate: 7.48,
  conversionRate: 20.0,
  bounceRate: 5.41,
  unsubscribeRate: 0.32,
  byChannel: {
    email: { sent: 150000, opened: 37500, clicked: 11250, converted: 2250, revenue: 45000 },
    sms: { sent: 40000, opened: 16000, clicked: 4800, converted: 960, revenue: 19200 },
    whatsapp: { sent: 25000, opened: 8750, clicked: 1250, converted: 150, revenue: 7500 },
    facebook: { sent: 10000, opened: 2000, clicked: 600, converted: 60, revenue: 6000 },
    instagram: { sent: 8000, opened: 1600, clicked: 400, converted: 30, revenue: 4800 },
    linkedin: { sent: 5000, opened: 750, clicked: 150, converted: 10, revenue: 3450 },
    twitter: { sent: 3000, opened: 450, clicked: 90, converted: 5, revenue: 1500 },
    google_ads: { sent: 2000, opened: 400, clicked: 120, converted: 3, revenue: 1200 },
    web_push: { sent: 2000, opened: 400, clicked: 90, converted: 5, revenue: 800 },
  },
};

// Monthly analytics
export const mockMonthlyAnalytics: MarketingAnalytics[] = Array.from({ length: 12 }, (_, i) => {
  const month = new Date(2024, i, 1);
  const sent = rand(150000, 300000);
  const delivered = Math.round(sent * 0.94);
  const opened = Math.round(delivered * (0.2 + Math.random() * 0.1));
  const clicked = Math.round(opened * (0.25 + Math.random() * 0.15));

  return {
    period: month.toLocaleString('default', { month: 'long', year: 'numeric' }),
    startDate: month.toISOString().split('T')[0],
    endDate: new Date(2024, i + 1, 0).toISOString().split('T')[0],
    totalSent: sent,
    totalDelivered: delivered,
    totalOpened: opened,
    totalClicked: clicked,
    totalConverted: Math.round(clicked * 0.2),
    totalRevenue: rand(50000, 150000),
    openRate: Math.round((opened / delivered) * 10000) / 100,
    clickRate: Math.round((clicked / opened) * 10000) / 100,
    conversionRate: Math.round(20 + Math.random() * 10),
    bounceRate: Math.round((1 - delivered / sent) * 10000) / 100,
    unsubscribeRate: Math.round(Math.random() * 100) / 100,
    byChannel: {
      email: { sent: sent * 0.6, opened: opened * 0.65, clicked: clicked * 0.65, converted: Math.round(clicked * 0.13), revenue: rand(25000, 80000) },
      sms: { sent: sent * 0.16, opened: opened * 0.28, clicked: clicked * 0.28, converted: Math.round(clicked * 0.055), revenue: rand(10000, 30000) },
      whatsapp: { sent: sent * 0.1, opened: opened * 0.15, clicked: clicked * 0.07, converted: Math.round(clicked * 0.009), revenue: rand(5000, 15000) },
      facebook: { sent: sent * 0.04, opened: opened * 0.03, clicked: clicked * 0.03, converted: Math.round(clicked * 0.003), revenue: rand(2000, 8000) },
      instagram: { sent: sent * 0.03, opened: opened * 0.03, clicked: clicked * 0.02, converted: Math.round(clicked * 0.002), revenue: rand(1500, 6000) },
      linkedin: { sent: sent * 0.02, opened: opened * 0.01, clicked: clicked * 0.01, converted: Math.round(clicked * 0.001), revenue: rand(1000, 5000) },
      twitter: { sent: sent * 0.02, opened: opened * 0.01, clicked: clicked * 0.005, converted: Math.round(clicked * 0.0003), revenue: rand(500, 3000) },
      google_ads: { sent: sent * 0.01, opened: opened * 0.007, clicked: clicked * 0.007, converted: Math.round(clicked * 0.0002), revenue: rand(500, 2000) },
      web_push: { sent: sent * 0.02, opened: opened * 0.007, clicked: clicked * 0.005, converted: Math.round(clicked * 0.0003), revenue: rand(300, 1500) },
    },
  };
});

// ---------------------------------------------------------------------------
// 10 Workflows with triggers/actions
// ---------------------------------------------------------------------------

const WORKFLOW_TRIGGERS = ['form_submitted', 'link_clicked', 'page_visited', 'list_joined', 'tag_added', 'field_changed', 'score_threshold', 'date_reached', 'api_call', 'manual'] as const;
const WORKFLOW_CONDITIONS = ['has_tag', 'in_list', 'field_value', 'score_range', 'activity_count', 'time_since', 'device_type', 'geo_location', 'utm_param'] as const;
const WORKFLOW_ACTIONS = ['send_email', 'send_sms', 'add_tag', 'remove_tag', 'add_to_list', 'remove_from_list', 'update_field', 'notify_user', 'create_task', 'webhook', 'wait', 'score_adjust', 'send_whatsapp'] as const;

export const mockWorkflows: Workflow[] = Array.from({ length: 10 }, (_, i) => ({
  id: id('WF-', i + 1),
  name: ['Welcome Email', 'Lead Scoring', 'Tag on Click', 'Drip Campaign', 'CRM Sync', 'Abandoned Cart Recovery', 'Post-Purchase Follow-up', 'Event Reminder', 'Re-engagement', 'NPS Survey'][i],
  description: `Automated workflow: ${['Welcome Email', 'Lead Scoring', 'Tag on Click', 'Drip Campaign', 'CRM Sync', 'Abandoned Cart Recovery', 'Post-Purchase Follow-up', 'Event Reminder', 'Re-engagement', 'NPS Survey'][i]}`,
  trigger: WORKFLOW_TRIGGERS[i % WORKFLOW_TRIGGERS.length],
  triggerConfig: { event: WORKFLOW_TRIGGERS[i % WORKFLOW_TRIGGERS.length] },
  conditions: [WORKFLOW_CONDITIONS[i % WORKFLOW_CONDITIONS.length]],
  actions: Array.from({ length: rand(2, 5) }, (_, j) => ({
    type: WORKFLOW_ACTIONS[(i + j) % WORKFLOW_ACTIONS.length],
    config: { templateId: id('TPL-', rand(1, 10)), delay: `${rand(1, 48)} hours` },
    order: j,
  })),
  status: pick(['active', 'inactive', 'draft'] as const),
  executionCount: rand(100, 10000),
  lastExecutedAt: dateStr(rand(0, 3)),
  logs: Array.from({ length: rand(3, 8) }, (_, j) => ({
    id: `log-${i}-${j}`,
    workflowId: id('WF-', i + 1),
    contactId: id('CT-', rand(1, 30)),
    action: WORKFLOW_ACTIONS[(i + j) % WORKFLOW_ACTIONS.length],
    status: pick(['success', 'success', 'success', 'failed', 'skipped'] as const),
    executedAt: dateStr(rand(1, 7)),
    error: j % 4 === 0 ? 'Template not found' : undefined,
  })),
  createdAt: dateStr(rand(30, 180)),
  updatedAt: dateStr(rand(0, 7)),
}));

// ---------------------------------------------------------------------------
// 15 Smart URLs with goals
// ---------------------------------------------------------------------------

export const mockSmartUrls: SmartUrl[] = Array.from({ length: 15 }, (_, i) => {
  const clicks = rand(100, 10000);
  const uniqueClicks = Math.round(clicks * (0.6 + Math.random() * 0.3));
  const conversions = Math.round(clicks * (0.02 + Math.random() * 0.08));

  return {
    id: id('URL-', i + 1),
    name: ['Spring Sale Link', 'Product Demo', 'Newsletter Archive', 'Whitepaper Download', 'Webinar Registration', 'Free Trial', 'Partner Referral', 'Social Bio Link', 'Email Signature', 'Ad Landing Page', 'QR Code Event', 'SMS Short Link', 'Push Notification', 'In-App Link', 'Affiliate Link'][i],
    originalUrl: `https://nue.one/${['sale', 'demo', 'newsletter', 'whitepaper', 'webinar', 'trial', 'partner', 'social', 'signature', 'ad', 'event', 'sms', 'push', 'app', 'affiliate'][i]}`,
    shortCode: `n${rand(1000, 9999)}`,
    shortUrl: `https://nue.one/s/n${rand(1000, 9999)}`,
    goals: Array.from({ length: rand(1, 3) }, (_, j) => ({
      id: `goal-${i}-${j}`,
      name: ['Purchase', 'Sign Up', 'Download', 'Page View', 'Form Submit'][j % 5],
      type: pick(['page_visit', 'purchase', 'form_submit', 'custom_event'] as const),
      targetUrl: j % 2 === 0 ? '/thank-you' : undefined,
      value: rand(10, 100),
      conversions: Math.round(conversions * (j === 0 ? 0.6 : 0.3)),
      conversionRate: Math.round((conversions / clicks) * 10000) / 100,
    })),
    clicks,
    uniqueClicks,
    conversions,
    utmSource: pick(['email', 'social', 'paid', 'organic', 'referral']),
    utmMedium: pick(['cpc', 'cpm', 'email', 'social', 'affiliate']),
    utmCampaign: `campaign-${i + 1}`,
    utmContent: i % 2 === 0 ? `variant-${rand(1, 3)}` : undefined,
    utmTerm: i % 3 === 0 ? 'marketing+automation' : undefined,
    createdAt: dateStr(rand(30, 180)),
  };
});

// ---------------------------------------------------------------------------
// CRM Sync Configs
// ---------------------------------------------------------------------------

export const mockCrmSyncConfigs: CrmSyncConfig[] = [
  {
    id: 'sync-1',
    crmType: 'salesforce',
    enabled: true,
    fieldMappings: [
      { marketingField: 'email', crmField: 'Email', direction: 'bidirectional' },
      { marketingField: 'firstName', crmField: 'FirstName', direction: 'bidirectional' },
      { marketingField: 'lastName', crmField: 'LastName', direction: 'bidirectional' },
      { marketingField: 'company', crmField: 'Company', direction: 'marketing_to_crm' },
      { marketingField: 'leadScore', crmField: 'Lead_Score__c', direction: 'marketing_to_crm' },
    ],
    syncFrequency: 'realtime',
    lastSyncAt: dateStr(0),
    syncLogs: Array.from({ length: 5 }, (_, j) => ({
      id: `slog-1-${j}`,
      timestamp: dateStr(j),
      recordsSynced: rand(10, 500),
      errors: rand(0, 3),
      direction: 'bidirectional',
      status: pick(['success', 'success', 'partial'] as const),
    })),
  },
  {
    id: 'sync-2',
    crmType: 'hubspot',
    enabled: true,
    fieldMappings: [
      { marketingField: 'email', crmField: 'email', direction: 'bidirectional' },
      { marketingField: 'phone', crmField: 'phone', direction: 'bidirectional' },
      { marketingField: 'lifecycleStage', crmField: 'lifecyclestage', direction: 'crm_to_marketing' },
    ],
    syncFrequency: 'hourly',
    lastSyncAt: dateStr(1),
    syncLogs: Array.from({ length: 3 }, (_, j) => ({
      id: `slog-2-${j}`,
      timestamp: dateStr(j),
      recordsSynced: rand(50, 200),
      errors: 0,
      direction: 'bidirectional',
      status: 'success' as const,
    })),
  },
  {
    id: 'sync-3',
    crmType: 'pipedrive',
    enabled: false,
    fieldMappings: [
      { marketingField: 'email', crmField: 'email', direction: 'marketing_to_crm' },
    ],
    syncFrequency: 'daily',
    syncLogs: [],
  },
];

// ---------------------------------------------------------------------------
// Compliance Records
// ---------------------------------------------------------------------------

export const mockConsentRecords: ConsentRecord[] = Array.from({ length: 30 }, (_, i) => ({
  id: `consent-${i + 1}`,
  contactId: id('CT-', rand(1, 30)),
  type: pick(['email', 'sms', 'whatsapp', 'tracking', 'marketing', 'third_party'] as const),
  granted: i % 5 !== 0,
  source: pick(['signup_form', 'preference_center', 'checkbox', 'import', 'api'] as const),
  ipAddress: `192.168.${rand(1, 255)}.${rand(1, 255)}`,
  timestamp: dateStr(rand(1, 90)),
  expiresAt: i % 3 === 0 ? dateStr(rand(180, 365)) : undefined,
}));

export const mockGdprRequests: GdprRequest[] = Array.from({ length: 8 }, (_, i) => ({
  id: `gdpr-${i + 1}`,
  contactId: id('CT-', rand(1, 30)),
  type: pick(['access', 'deletion', 'portability', 'rectification', 'objection', 'restriction'] as const),
  status: pick(['pending', 'processing', 'completed', 'rejected'] as const),
  requestedAt: dateStr(rand(1, 30)),
  completedAt: i % 3 === 0 ? dateStr(rand(0, 7)) : undefined,
  notes: i % 2 === 0 ? 'Verified identity' : undefined,
}));

export const mockUnsubscribeEntries: UnsubscribeEntry[] = Array.from({ length: 15 }, (_, i) => ({
  id: `unsub-${i + 1}`,
  contactId: id('CT-', rand(1, 30)),
  channel: pick(['email', 'sms', 'whatsapp', 'all'] as const),
  reason: pick(['too_frequent', 'not_relevant', 'never_subscribed', 'other'] as const),
  timestamp: dateStr(rand(1, 60)),
}));

// ---------------------------------------------------------------------------
// Integration Configs
// ---------------------------------------------------------------------------

const INTEGRATION_CATEGORIES = ['crm', 'analytics', 'advertising', 'social_media', 'ecommerce', 'content', 'communication', 'data', 'automation'] as const;

export const mockIntegrations: Integration[] = [
  { id: 'int-1', name: 'Salesforce', category: 'crm', description: 'Sync contacts and leads with Salesforce CRM', status: 'connected', connectedAt: dateStr(90), lastSyncAt: dateStr(0), config: { instance: 'na1.salesforce.com' } },
  { id: 'int-2', name: 'HubSpot', category: 'crm', description: 'Bi-directional sync with HubSpot', status: 'connected', connectedAt: dateStr(60), lastSyncAt: dateStr(1), config: { portalId: '12345' } },
  { id: 'int-3', name: 'Google Analytics', category: 'analytics', description: 'Track marketing attribution in GA4', status: 'connected', connectedAt: dateStr(120), lastSyncAt: dateStr(0), config: { propertyId: 'GA-12345' } },
  { id: 'int-4', name: 'Facebook Ads', category: 'advertising', description: 'Sync audiences and track ad performance', status: 'connected', connectedAt: dateStr(45), lastSyncAt: dateStr(1), config: { adAccountId: 'act_12345' } },
  { id: 'int-5', name: 'LinkedIn Ads', category: 'advertising', description: 'Matched audiences for LinkedIn campaigns', status: 'disconnected', config: {} },
  { id: 'int-6', name: 'Shopify', category: 'ecommerce', description: 'Sync products, orders, and customer data', status: 'connected', connectedAt: dateStr(30), lastSyncAt: dateStr(0), config: { storeUrl: 'shop.myshopify.com' } },
  { id: 'int-7', name: 'WordPress', category: 'content', description: 'Embed forms and track page visits', status: 'connected', connectedAt: dateStr(60), config: { siteUrl: 'blog.nue.one' } },
  { id: 'int-8', name: 'Slack', category: 'communication', description: 'Send notifications to Slack channels', status: 'connected', connectedAt: dateStr(90), config: { channel: '#marketing' } },
  { id: 'int-9', name: 'Zapier', category: 'automation', description: 'Connect with 5000+ apps via Zapier', status: 'error', connectedAt: dateStr(30), lastSyncAt: dateStr(7), config: { zapCount: 12 } },
  { id: 'int-10', name: 'Stripe', category: 'ecommerce', description: 'Track purchase events and revenue', status: 'connected', connectedAt: dateStr(45), lastSyncAt: dateStr(0), config: { mode: 'live' } },
  { id: 'int-11', name: 'Twitter/X', category: 'social_media', description: 'Schedule and publish tweets', status: 'pending', config: {} },
  { id: 'int-12', name: 'Segment', category: 'data', description: 'Unified customer data pipeline', status: 'connected', connectedAt: dateStr(75), lastSyncAt: dateStr(0), config: { sourceId: 'src_123' } },
];

// ---------------------------------------------------------------------------
// Dashboard Metrics and Chart Data
// ---------------------------------------------------------------------------

export const mockMarketingDashboard: MarketingDashboard = {
  period: 'last_30_days',
  metrics: [
    { id: 'metric-1', label: 'Total Contacts', value: '24,580', change: 5.2, changeLabel: 'vs last month', format: 'number' },
    { id: 'metric-2', label: 'Active Campaigns', value: '12', change: 3, changeLabel: 'vs last month', format: 'number' },
    { id: 'metric-3', label: 'Email Open Rate', value: '24.8%', change: 2.1, changeLabel: 'vs last month', format: 'percentage' },
    { id: 'metric-4', label: 'Click Rate', value: '7.5%', change: -0.3, changeLabel: 'vs last month', format: 'percentage' },
    { id: 'metric-5', label: 'Revenue', value: '$89,450', change: 12.4, changeLabel: 'vs last month', format: 'currency' },
    { id: 'metric-6', label: 'New Leads', value: '1,247', change: 8.7, changeLabel: 'vs last month', format: 'number' },
    { id: 'metric-7', label: 'Conversion Rate', value: '20.0%', change: 1.5, changeLabel: 'vs last month', format: 'percentage' },
    { id: 'metric-8', label: 'Unsubscribe Rate', value: '0.32%', change: -0.05, changeLabel: 'vs last month', format: 'percentage' },
  ],
  charts: {
    campaignPerformance: {
      labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
      datasets: [
        { label: 'Sent', data: [61250, 61250, 61250, 61250] },
        { label: 'Opened', data: [12500, 15800, 14200, 15350] },
        { label: 'Clicked', data: [3750, 4500, 4100, 5000] },
      ],
    },
    leadTrends: {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      datasets: [
        { label: 'New Leads', data: [850, 920, 1100, 1050, 1200, 1350, 1150, 1280, 1400, 1180, 1250, 1247] },
        { label: 'Qualified', data: [340, 380, 450, 420, 490, 550, 470, 520, 570, 480, 510, 500] },
        { label: 'Converted', data: [68, 76, 90, 84, 98, 110, 94, 104, 114, 96, 102, 100] },
      ],
    },
    channelDistribution: {
      labels: ['Email', 'SMS', 'WhatsApp', 'Facebook', 'Instagram', 'LinkedIn', 'Twitter', 'Google Ads', 'Web Push'],
      datasets: [
        { label: 'Revenue', data: [45000, 19200, 7500, 6000, 4800, 3450, 1500, 1200, 800] },
      ],
    },
    revenueByCampaign: {
      labels: mockCampaigns.slice(0, 10).map(c => c.name),
      datasets: [
        { label: 'Revenue', data: mockCampaigns.slice(0, 10).map(c => c.metrics.revenue) },
      ],
    },
    audienceGrowth: {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      datasets: [
        { label: 'Total Contacts', data: [18500, 19200, 20100, 20800, 21400, 22000, 22500, 23100, 23600, 24000, 24300, 24580] },
        { label: 'Active', data: [14800, 15360, 16080, 16640, 17120, 17600, 18000, 18480, 18880, 19200, 19440, 19664] },
      ],
    },
  },
};

// ---------------------------------------------------------------------------
// A/B Tests
// ---------------------------------------------------------------------------

export const mockABTests: ABTest[] = Array.from({ length: 8 }, (_, i) => {
  const variantCount = 2;
  const variants = Array.from({ length: variantCount }, (_, v) => {
    const impressions = rand(1000, 10000);
    const conversions = Math.round(impressions * (0.02 + Math.random() * 0.06));
    return {
      id: `abv-${i}-${v}`,
      name: v === 0 ? 'Control' : `Variant ${String.fromCharCode(65 + v)}`,
      description: v === 0 ? 'Original version' : 'Test variation',
      trafficPercent: Math.round(100 / variantCount),
      impressions,
      conversions,
      conversionRate: Math.round((conversions / impressions) * 10000) / 100,
      isControl: v === 0,
      isWinner: v === 1 && i % 3 === 0,
    };
  });

  return {
    id: id('AB-', i + 1),
    name: ['Subject Line Test', 'CTA Button Color', 'Send Time Test', 'From Name Test', 'Content Layout', 'Hero Image', 'Pricing Display', 'Email Preview Text'][i],
    type: pick(['subject_line', 'cta', 'send_time', 'from_name', 'design', 'content'] as const),
    campaignId: id('CAMP-', rand(1, 20)),
    variants,
    status: pick(['draft', 'running', 'completed', 'paused'] as const),
    confidenceLevel: Math.round((85 + Math.random() * 14) * 100) / 100,
    startDate: dateStr(rand(7, 30)),
    endDate: i % 3 === 0 ? dateStr(rand(0, 7)) : undefined,
    winningVariantId: i % 3 === 0 ? `abv-${i}-1` : undefined,
    createdAt: dateStr(rand(14, 60)),
  };
});

// ---------------------------------------------------------------------------
// Social Accounts & Posts
// ---------------------------------------------------------------------------

export const mockSocialAccounts: SocialAccount[] = [
  { id: 'soc-1', platform: 'facebook', accountName: 'NueOne Official', accountId: 'nueone.official', followers: 25000, connectedAt: dateStr(180), status: 'connected' },
  { id: 'soc-2', platform: 'instagram', accountName: '@nueone', accountId: 'nueone', followers: 18000, connectedAt: dateStr(120), status: 'connected' },
  { id: 'soc-3', platform: 'linkedin', accountName: 'NueOne Inc', accountId: 'nueone-inc', followers: 12000, connectedAt: dateStr(90), status: 'connected' },
  { id: 'soc-4', platform: 'twitter', accountName: '@nueone', accountId: 'nueone', followers: 8500, connectedAt: dateStr(60), status: 'expired' },
  { id: 'soc-5', platform: 'tiktok', accountName: '@nueone', accountId: 'nueone', followers: 35000, connectedAt: dateStr(45), status: 'connected' },
  { id: 'soc-6', platform: 'youtube', accountName: 'NueOne', accountId: 'nueone', followers: 50000, connectedAt: dateStr(200), status: 'connected' },
];

export const mockSocialPosts: SocialPost[] = Array.from({ length: 15 }, (_, i) => ({
  id: `post-${i + 1}`,
  accountId: `soc-${(i % 6) + 1}`,
  platform: mockSocialAccounts[i % 6].platform,
  content: [
    '🚀 Exciting product launch coming soon! Stay tuned...',
    '📊 Marketing automation just got easier. Learn how →',
    '💡 5 tips to improve your email open rates',
    '🎉 We just hit 25K followers! Thank you!',
    '📅 Join our webinar this Thursday at 2 PM ET',
    '✨ New feature alert: Smart URL tracking is here',
    '📈 Our latest case study shows 40% ROI improvement',
    '🎯 Targeting the right audience matters more than ever',
    '🏆 Proud to be named a Leader in Marketing Automation',
    '🔗 Check out our new integration with Salesforce',
    '📱 SMS marketing: The underrated channel',
    '🤖 AI-powered lead scoring is changing the game',
    '💬 Customer story: How Acme Corp grew 3x with us',
    '🎓 Free marketing course: Email Masterclass',
    '⚡ Quick tip: A/B test your subject lines!',
  ][i],
  mediaUrls: i % 3 === 0 ? [`https://cdn.nue.one/social/post-${i + 1}.jpg`] : undefined,
  scheduledAt: i % 3 === 0 ? dateStr(rand(0, 7)) : undefined,
  publishedAt: i % 2 === 0 ? dateStr(rand(1, 14)) : undefined,
  likes: rand(50, 2000),
  comments: rand(5, 200),
  shares: rand(10, 500),
  impressions: rand(1000, 50000),
  status: pick(['draft', 'scheduled', 'published', 'failed'] as const),
}));

// ---------------------------------------------------------------------------
// Email Templates
// ---------------------------------------------------------------------------

export const mockTemplateCategories: TemplateCategory[] = [
  { id: 'cat-1', name: 'Welcome', icon: '👋', count: 5 },
  { id: 'cat-2', name: 'Promotional', icon: '🎉', count: 8 },
  { id: 'cat-3', name: 'Transactional', icon: '📦', count: 6 },
  { id: 'cat-4', name: 'Newsletter', icon: '📰', count: 4 },
  { id: 'cat-5', name: 'Event', icon: '📅', count: 3 },
  { id: 'cat-6', name: 'Re-engagement', icon: '🔄', count: 4 },
];

export const mockEmailTemplates: EmailTemplate[] = Array.from({ length: 15 }, (_, i) => ({
  id: id('TPL-', i + 1),
  name: ['Welcome Email', 'Welcome Series #2', 'Welcome Series #3', 'Flash Sale', 'Monthly Promo', 'Seasonal Discount', 'Order Confirmation', 'Shipping Update', 'Password Reset', 'Weekly Digest', 'Monthly Newsletter', 'Quarterly Report', 'Webinar Invite', 'Event Reminder', 'Win-Back Offer'][i],
  subject: ['Welcome to NueOne!', 'Getting Started', 'Your First Week', '⚡ Flash Sale!', 'This Month\'s Deals', 'Seasonal Savings', 'Your Order is Confirmed', 'Your Package is on the Way', 'Reset Your Password', 'This Week at NueOne', 'Monthly Update', 'Q4 Report Inside', 'Join Our Webinar', 'Don\'t Forget!', 'We Miss You'][i],
  preheader: i < 10 ? 'Preview text for this email' : undefined,
  contentHtml: `<html><body><h1>${['Welcome', 'Getting Started', 'First Week', 'Flash Sale', 'Monthly Deals', 'Seasonal Savings', 'Order Confirmed', 'Shipping Update', 'Reset Password', 'Weekly Digest', 'Monthly Update', 'Q4 Report', 'Webinar Invite', 'Event Reminder', 'We Miss You'][i]}</h1></body></html>`,
  contentText: i % 2 === 0 ? 'Plain text version' : undefined,
  category: mockTemplateCategories[i % mockTemplateCategories.length].name,
  tags: [pick(['onboarding', 'promotional', 'transactional', 'engagement', 'retention'])],
  usageCount: rand(10, 5000),
  status: i === 7 ? 'draft' as const : i === 8 ? 'archived' as const : 'active' as const,
  createdAt: dateStr(rand(30, 365)),
  updatedAt: dateStr(rand(0, 14)),
}));
