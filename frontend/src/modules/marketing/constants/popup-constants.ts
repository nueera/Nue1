// ============================================================================
// Popup Constants
// Trigger types, targeting options, and configuration for Popups domain
// ============================================================================

import type { PopupTrigger, PopupTargeting } from '../types';

// ---------------------------------------------------------------------------
// Popup Trigger Config
// ---------------------------------------------------------------------------

export const POPUP_TRIGGER_CONFIG: Record<PopupTrigger, { label: string; description: string; hasConfig: boolean }> = {
  time_on_page: { label: 'Time on Page', description: 'Show after X seconds on the page', hasConfig: true },
  scroll_percentage: { label: 'Scroll Percentage', description: 'Show after scrolling X% of the page', hasConfig: true },
  exit_intent: { label: 'Exit Intent', description: 'Show when user attempts to leave', hasConfig: false },
  click_element: { label: 'Click Element', description: 'Show when a specific element is clicked', hasConfig: true },
  page_load: { label: 'Page Load', description: 'Show immediately on page load', hasConfig: false },
  inactivity: { label: 'Inactivity', description: 'Show after X seconds of inactivity', hasConfig: true },
  manual: { label: 'Manual', description: 'Triggered manually via API or code', hasConfig: false },
};

// ---------------------------------------------------------------------------
// Popup Targeting Config
// ---------------------------------------------------------------------------

export const POPUP_TARGETING_CONFIG: Record<PopupTargeting, { label: string; description: string }> = {
  all_visitors: { label: 'All Visitors', description: 'Show to every visitor' },
  new_visitors: { label: 'New Visitors', description: 'First-time visitors only' },
  returning_visitors: { label: 'Returning Visitors', description: 'Visitors who have been before' },
  specific_pages: { label: 'Specific Pages', description: 'Only on selected pages' },
  specific_segments: { label: 'Specific Segments', description: 'Only to contacts in selected segments' },
  geo_location: { label: 'Geo Location', description: 'Based on geographic location' },
  device_type: { label: 'Device Type', description: 'Desktop, mobile, or tablet' },
  utm_source: { label: 'UTM Source', description: 'Based on UTM parameters' },
};

// ---------------------------------------------------------------------------
// Popup Type Config
// ---------------------------------------------------------------------------

export const POPUP_TYPE_CONFIG = {
  popup: { label: 'Popup', description: 'Center overlay popup', maxWidth: '600px' },
  slide_in: { label: 'Slide In', description: 'Slides in from the side', maxWidth: '400px' },
  floating_bar: { label: 'Floating Bar', description: 'Horizontal bar at top or bottom', maxWidth: '100%' },
  full_screen: { label: 'Full Screen', description: 'Takes over entire screen', maxWidth: '100%' },
  sticky_bar: { label: 'Sticky Bar', description: 'Sticks to top of page', maxWidth: '100%' },
} as const;

// ---------------------------------------------------------------------------
// Popup Display Frequency Options
// ---------------------------------------------------------------------------

export const POPUP_FREQUENCY_OPTIONS = [
  { value: 'every_time', label: 'Every Time' },
  { value: 'once_per_session', label: 'Once Per Session' },
  { value: 'once_per_day', label: 'Once Per Day' },
  { value: 'once_per_week', label: 'Once Per Week' },
  { value: 'once_per_month', label: 'Once Per Month' },
  { value: 'once_ever', label: 'Once Ever' },
] as const;
