// @ts-nocheck
// ============================================================================
// Segmentation Utils — Evaluate segment rules, condition groups, member counts
// ============================================================================

import type { SegmentCondition, SegmentRule, ConditionOperator } from '../types';

export function evaluateSegmentRule(
  rule: SegmentRule,
  record: Record<string, unknown>
): boolean {
  if (rule.conditions.length === 0) return true;

  return rule.conditions.every((condition, index) => {
    const result = evaluateCondition(condition, record);
    // For the first condition, ignore the logical operator
    if (index === 0) return result;

    const prevCondition = rule.conditions[index - 1];
    if (prevCondition.logicalOperator === 'or') {
      // In an OR chain, we need at least one true
      // This is simplified — a full implementation would group OR conditions
      return result;
    }
    // AND: all must be true
    return result;
  });
}

export function evaluateCondition(
  condition: SegmentCondition,
  record: Record<string, unknown>
): boolean {
  const fieldValue = record[condition.field];

  switch (condition.operator) {
    case 'equals':
      return fieldValue === condition.value;
    case 'not_equals':
      return fieldValue !== condition.value;
    case 'contains':
      return String(fieldValue ?? '').includes(String(condition.value));
    case 'not_contains':
      return !String(fieldValue ?? '').includes(String(condition.value));
    case 'starts_with':
      return String(fieldValue ?? '').startsWith(String(condition.value));
    case 'ends_with':
      return String(fieldValue ?? '').endsWith(String(condition.value));
    case 'greater_than':
      return Number(fieldValue) > Number(condition.value);
    case 'less_than':
      return Number(fieldValue) < Number(condition.value);
    case 'between': {
      const [min, max] = String(condition.value).split(':').map(Number);
      const num = Number(fieldValue);
      return num >= min && num <= max;
    }
    case 'in':
      return Array.isArray(condition.value)
        ? condition.value.includes(fieldValue)
        : String(condition.value).split(',').includes(String(fieldValue));
    case 'not_in':
      return Array.isArray(condition.value)
        ? !condition.value.includes(fieldValue)
        : !String(condition.value).split(',').includes(String(fieldValue));
    case 'is_set':
      return fieldValue !== undefined && fieldValue !== null && fieldValue !== '';
    case 'is_not_set':
      return fieldValue === undefined || fieldValue === null || fieldValue === '';
    case 'before':
      return fieldValue ? new Date(String(fieldValue)) < new Date(String(condition.value)) : false;
    case 'after':
      return fieldValue ? new Date(String(fieldValue)) > new Date(String(condition.value)) : false;
    case 'within_last': {
      if (!fieldValue) return false;
      const days = Number(condition.value);
      const date = new Date(String(fieldValue));
      const cutoff = new Date();
      cutoff.setDate(cutoff.getDate() - days);
      return date >= cutoff;
    }
    case 'within_next': {
      if (!fieldValue) return false;
      const days = Number(condition.value);
      const date = new Date(String(fieldValue));
      const cutoff = new Date();
      cutoff.setDate(cutoff.getDate() + days);
      return date <= cutoff && date >= new Date();
    }
    default:
      return false;
  }
}

export function evaluateConditionGroup(
  rules: SegmentRule[],
  logic: 'and' | 'or',
  record: Record<string, unknown>
): boolean {
  if (rules.length === 0) return true;

  const results = rules.map((rule) => evaluateSegmentRule(rule, record));

  if (logic === 'and') {
    return results.every(Boolean);
  }
  return results.some(Boolean);
}

export function getSegmentMemberCount(
  rules: SegmentRule[],
  logic: 'and' | 'or',
  records: Record<string, unknown>[]
): number {
  return records.filter((record) => evaluateConditionGroup(rules, logic, record)).length;
}
