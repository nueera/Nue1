// ============================================================================
// Smoke Test: Error Sanitization (src/components/providers/)
// ============================================================================

import { describe, it, expect } from 'vitest';
import { sanitizeErrorMessage } from '@/components/providers/query-provider';

describe('sanitizeErrorMessage()', () => {
  it('passes through safe messages', () => {
    expect(sanitizeErrorMessage('Not found')).toBe('Not found');
  });

  it('passes through "An unexpected error occurred" messages', () => {
    expect(sanitizeErrorMessage('An unexpected error occurred')).toBe('An unexpected error occurred');
  });

  it('blocks messages containing "token"', () => {
    expect(sanitizeErrorMessage('Invalid token: abc123')).toBe('An unexpected error occurred. Please try again.');
  });

  it('blocks messages containing "api_key"', () => {
    expect(sanitizeErrorMessage('Missing api_key parameter')).toBe('An unexpected error occurred. Please try again.');
  });

  it('blocks messages containing "password"', () => {
    expect(sanitizeErrorMessage('password verification failed')).toBe('An unexpected error occurred. Please try again.');
  });

  it('blocks messages containing "authorization"', () => {
    expect(sanitizeErrorMessage('authorization header missing')).toBe('An unexpected error occurred. Please try again.');
  });

  it('blocks messages containing "secret"', () => {
    expect(sanitizeErrorMessage('client_secret is invalid')).toBe('An unexpected error occurred. Please try again.');
  });

  it('blocks very long messages (likely stack traces)', () => {
    const longMsg = 'a'.repeat(201);
    expect(sanitizeErrorMessage(longMsg)).toBe('An unexpected error occurred. Please try again.');
  });

  it('allows messages at exactly 200 chars', () => {
    const msg = 'a'.repeat(200);
    expect(sanitizeErrorMessage(msg)).toBe(msg);
  });

  it('blocks messages containing "internal"', () => {
    expect(sanitizeErrorMessage('Internal server error')).toBe('An unexpected error occurred. Please try again.');
  });

  it('blocks ECONNREFUSED errors', () => {
    expect(sanitizeErrorMessage('ECONNREFUSED 127.0.0.1:5432')).toBe('An unexpected error occurred. Please try again.');
  });
});
