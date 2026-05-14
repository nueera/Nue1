// ============================================================================
// Smoke Test: Accessible Form Helpers (src/lib/form-helpers)
// ============================================================================

import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { AccessibleField } from '@/lib/form-helpers';

describe('AccessibleField', () => {
  it('renders label with htmlFor pointing to input id', () => {
    render(
      <AccessibleField label="Email">
        <input type="email" />
      </AccessibleField>
    );

    const label = screen.getByText('Email');
    const input = screen.getByRole('textbox');
    expect(label).toHaveAttribute('for', input.id);
  });

  it('shows required indicator when required', () => {
    render(
      <AccessibleField label="Name" required>
        <input type="text" />
      </AccessibleField>
    );

    expect(screen.getByText('*')).toBeInTheDocument();
    const input = screen.getByRole('textbox');
    expect(input).toHaveAttribute('aria-required', 'true');
  });

  it('displays error message with role="alert"', () => {
    render(
      <AccessibleField label="Password" error="Too short">
        <input type="password" />
      </AccessibleField>
    );

    const error = screen.getByRole('alert');
    expect(error).toHaveTextContent('Too short');
  });

  it('displays hint text when provided and no error', () => {
    render(
      <AccessibleField label="Username" hint="3-20 characters">
        <input type="text" />
      </AccessibleField>
    );

    expect(screen.getByText('3-20 characters')).toBeInTheDocument();
  });

  it('hides hint when error is present', () => {
    render(
      <AccessibleField label="Username" hint="3-20 characters" error="Required">
        <input type="text" />
      </AccessibleField>
    );

    expect(screen.queryByText('3-20 characters')).not.toBeInTheDocument();
    expect(screen.getByRole('alert')).toHaveTextContent('Required');
  });

  it('uses custom inputId when provided', () => {
    render(
      <AccessibleField label="Phone" inputId="phone-field">
        <input type="tel" />
      </AccessibleField>
    );

    const input = screen.getByRole('textbox');
    expect(input).toHaveAttribute('id', 'phone-field');
  });

  it('sets aria-invalid when error exists', () => {
    render(
      <AccessibleField label="Email" error="Invalid format">
        <input type="email" />
      </AccessibleField>
    );

    const input = screen.getByRole('textbox');
    expect(input).toHaveAttribute('aria-invalid');
  });

  it('clicking label focuses the input', async () => {
    const user = userEvent.setup();
    render(
      <AccessibleField label="Search">
        <input type="search" />
      </AccessibleField>
    );

    await user.click(screen.getByText('Search'));
    expect(screen.getByRole('searchbox')).toHaveFocus();
  });
});
