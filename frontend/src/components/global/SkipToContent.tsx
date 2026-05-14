'use client';

// ============================================================================
// Skip to Content Link
// Accessibility component — the very first focusable element on the page.
// Hidden visually until focused via Tab, then appears as a floating button.
// ============================================================================

interface SkipToContentProps {
  /** ID of the main content landmark (default: "main-content") */
  targetId?: string;
}

export function SkipToContent({ targetId = 'main-content' }: SkipToContentProps) {
  return (
    <a
      href={`#${targetId}`}
      className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[9999] focus:rounded-lg focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground focus:text-sm focus:font-medium focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
    >
      Skip to content
    </a>
  );
}
