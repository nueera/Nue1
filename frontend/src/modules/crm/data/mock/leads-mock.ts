// @ts-nocheck
// ============================================================================
// CRM Mock Data — Lead Mock Data & Generator
// ============================================================================

import type { Lead, LeadSource, LeadStatus, LeadRating } from '../../domains/leads/types';
import { FIRST_NAMES, LAST_NAMES, COMPANY_PREFIXES, COMPANY_SUFFIXES, INDUSTRIES, CITIES, STATES, COUNTRIES, LEAD_SOURCES, FAKER_SEED } from './faker-setup';

function seededRandom(seed: number): () => number {
  let s = seed;
  return () => { s = (s * 16807) % 2147483647; return (s - 1) / 2147483646; };
}

const rand = seededRandom(FAKER_SEED);
const pick = <T>(arr: T[]): T => arr[Math.floor(rand() * arr.length)];
const randInt = (min: number, max: number) => Math.floor(rand() * (max - min + 1)) + min;

const sources: LeadSource[] = ['web', 'referral', 'advertisement', 'cold-call', 'trade-show', 'social-media', 'email-campaign', 'partner', 'organic', 'other'];
const statuses: LeadStatus[] = ['new', 'contacted', 'qualified', 'unqualified', 'converted', 'nurturing', 'junk'];
const ratings: LeadRating[] = ['hot', 'warm', 'cold'];

function generateLead(id: number): Lead {
  const firstName = pick(FIRST_NAMES);
  const lastName = pick(LAST_NAMES);
  return {
    id: `lead-${id}`,
    firstName,
    lastName,
    email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@${pick(COMPANY_PREFIXES).toLowerCase()}.com`,
    phone: `+1 (${randInt(200, 999)}) ${randInt(200, 999)}-${randInt(1000, 9999)}`,
    company: `${pick(COMPANY_PREFIXES)} ${pick(COMPANY_SUFFIXES)}`,
    title: pick(['CEO', 'CTO', 'VP Sales', 'Director', 'Manager', 'Lead Engineer', 'Analyst', 'Consultant']),
    leadSource: pick(sources),
    status: pick(statuses),
    rating: pick(ratings),
    leadScore: randInt(0, 100),
    industry: pick(INDUSTRIES),
    annualRevenue: randInt(100000, 50000000),
    website: `https://${pick(COMPANY_PREFIXES).toLowerCase()}${pick(COMPANY_SUFFIXES).toLowerCase().replace(' ', '')}.com`,
    description: `Lead from ${pick(LEAD_SOURCES)}`,
    street: `${randInt(100, 9999)} ${pick(['Main', 'Oak', 'Pine', 'Elm', 'Maple'])} St`,
    city: pick(CITIES),
    state: pick(STATES),
    zipCode: `${randInt(10000, 99999)}`,
    country: pick(COUNTRIES),
    assignedTo: `user-${randInt(1, 10)}`,
    lastActivityDate: new Date(Date.now() - randInt(0, 30) * 86400000).toISOString(),
    nextFollowUp: new Date(Date.now() + randInt(0, 14) * 86400000).toISOString(),
    createdAt: new Date(Date.now() - randInt(1, 180) * 86400000).toISOString(),
    updatedAt: new Date(Date.now() - randInt(0, 7) * 86400000).toISOString(),
    owner: `user-${randInt(1, 10)}`,
    modifiedBy: `user-${randInt(1, 10)}`,
    tags: [pick(['priority', 'follow-up', 'vip', 'enterprise', 'warm', 'cold'])],
  };
}

export const leads: Lead[] = Array.from({ length: 50 }, (_, i) => generateLead(i + 1));

export function getLeadById(id: string): Lead | undefined {
  return leads.find((l) => l.id === id);
}

export function getLeadsByStatus(status: LeadStatus): Lead[] {
  return leads.filter((l) => l.status === status);
}

export function getLeadsBySource(source: LeadSource): Lead[] {
  return leads.filter((l) => l.leadSource === source);
}
