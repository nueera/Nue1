// @ts-nocheck
import type { Lead, LeadRating, LeadSource, LeadStatus } from "./types";
import { LEAD_RATINGS, LEAD_SOURCES, LEAD_STATUSES } from "./constants";
export function isLeadQualified(lead: Lead): boolean { return lead.status === "qualified" || lead.leadScore >= 70; }
export function getLeadScoreColor(score: number): string { if (score >= 80) return "text-status-success"; if (score >= 60) return "text-status-warning"; if (score >= 40) return "text-status-elevated"; return "text-status-danger"; }
export function computeLeadGrade(score: number): "A"|"B"|"C"|"D"|"F" { if (score >= 90) return "A"; if (score >= 75) return "B"; if (score >= 55) return "C"; if (score >= 35) return "D"; return "F"; }
export function formatLeadSource(source: LeadSource): string { return LEAD_SOURCES.find(s => s.value === source)?.label ?? source; }
export function mapLeadToContact(lead: Lead) { return { firstName: lead.firstName, lastName: lead.lastName, email: lead.email, phone: lead.phone, title: lead.title, company: lead.company }; }
export function validateLeadConversion(lead: Lead): { valid: boolean; errors: string[] } { const errors: string[] = []; if (!lead.email) errors.push("Lead must have email"); if (!lead.firstName || !lead.lastName) errors.push("Lead must have full name"); if (lead.status === "converted") errors.push("Lead already converted"); if (lead.status === "junk") errors.push("Cannot convert junk lead"); return { valid: errors.length === 0, errors }; }
export function getLeadStatusLabel(status: LeadStatus): string { return LEAD_STATUSES.find(s => s.value === status)?.label ?? status; }
export function getLeadRatingColor(rating: LeadRating): string { return LEAD_RATINGS.find(r => r.value === rating)?.color ?? "text-status-neutral"; }