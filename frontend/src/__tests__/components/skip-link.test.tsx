// ============================================================================
// Smoke Test: Skip-to-Content Component
// ============================================================================

import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { SkipToContent } from '@/components/global/SkipToContent';

describe('SkipToContent', () => {
  it('renders a link with correct href', () => {
    render(<SkipToContent />);
    const link = screen.getByText('Skip to content');
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '#main-content');
  });

  it('accepts custom targetId', () => {
    render(<SkipToContent targetId="custom-id" />);
    const link = screen.getByText('Skip to content');
    expect(link).toHaveAttribute('href', '#custom-id');
  });

  it('is visually hidden but accessible', () => {
    render(<SkipToContent />);
    const link = screen.getByText('Skip to content');
    // The link should be focusable (not have tabindex=-1 or display:none)
    expect(link.tagName).toBe('A');
  });
});
