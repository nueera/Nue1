// @ts-nocheck
// ============================================================================
// CRM Mock Data — Contact Mock Data & Generator
// ============================================================================

import type { Contact, ContactStatus, ContactType, ContactLifecycle } from '../../domains/contacts/types';
import { FIRST_NAMES, LAST_NAMES, COMPANY_PREFIXES, COMPANY_SUFFIXES, CITIES, STATES, COUNTRIES, FAKER_SEED } from './faker-setup';

function seededRandom(seed: number): () => number { let s = seed; return () => { s = (s * 16807) % 2147483647; return (s - 1) / 2147483646; }; }
const rand = seededRandom(FAKER_SEED + 1);
const pick = <T>(arr: T[]): T => arr[Math.floor(rand() * arr.length)];
const randInt = (min: number, max: number) => Math.floor(rand() * (max - min + 1)) + min;

const statuses: ContactStatus[] = ['active', 'inactive', 'bounced', 'subscribed', 'unsubscribed'];
const types: ContactType[] = ['customer', 'prospect', 'vendor', 'partner', 'employee', 'other'];
const lifecycles: ContactLifecycle[] = ['subscriber', 'lead', 'opportunity', 'customer', 'churned', 'evangelist'];

function generateContact(id: number): Contact {
  const firstName = pick(FIRST_NAMES);
  const lastName = pick(LAST_NAMES);
  const companyName = `${pick(COMPANY_PREFIXES)} ${pick(COMPANY_SUFFIXES)}`;
  return {
    id: `contact-${id}`, firstName, lastName,
    email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@${pick(COMPANY_PREFIXES).toLowerCase()}.com`,
    phone: `+1 (${randInt(200, 999)}) ${randInt(200, 999)}-${randInt(1000, 9999)}`,
    mobile: `+1 (${randInt(200, 999)}) ${randInt(200, 999)}-${randInt(1000, 9999)}`,
    title: pick(['CEO', 'CTO', 'VP Sales', 'Director', 'Manager', 'Engineer', 'Analyst']),
    department: pick(['Sales', 'Engineering', 'Marketing', 'Finance', 'Operations', 'HR']),
    accountId: `account-${randInt(1, 30)}`, accountName: companyName,
    status: pick(statuses), type: pick(types), lifecycle: pick(lifecycles),
    leadSource: pick(['web', 'referral', 'partner', 'organic']),
    mailingStreet: `${randInt(100, 9999)} ${pick(['Main', 'Oak', 'Pine'])} St`,
    mailingCity: pick(CITIES), mailingState: pick(STATES), mailingZip: `${randInt(10000, 99999)}`, mailingCountry: pick(COUNTRIES),
    description: `Contact at ${companyName}`, emailOptOut: rand() > 0.8, doNotCall: rand() > 0.9,
    reportsTo: `contact-${randInt(1, 50)}`,
    twitter: `@${firstName.toLowerCase()}${lastName.toLowerCase()}`,
    linkedin: `linkedin.com/in/${firstName.toLowerCase()}${lastName.toLowerCase()}`,
    facebook: `fb.com/${firstName.toLowerCase()}.${lastName.toLowerCase()}`,
    createdAt: new Date(Date.now() - randInt(1, 365) * 86400000).toISOString(),
    updatedAt: new Date(Date.now() - randInt(0, 7) * 86400000).toISOString(),
    owner: `user-${randInt(1, 10)}`, modifiedBy: `user-${randInt(1, 10)}`,
    tags: [pick(['key-contact', 'decision-maker', 'influencer', 'champion'])],
  };
}

export const contacts: Contact[] = Array.from({ length: 50 }, (_, i) => generateContact(i + 1));
export function getContactById(id: string): Contact | undefined { return contacts.find((c) => c.id === id); }
export function getContactsByAccount(accountId: string): Contact[] { return contacts.filter((c) => c.accountId === accountId); }
