// ============================================================================
// URL Builder Utils — Smart URLs, UTM params, URL shortening
// ============================================================================

export interface UtmParams {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_content?: string;
  utm_term?: string;
}

export function buildSmartUrl(baseUrl: string, params?: UtmParams): string {
  if (!params) return baseUrl;

  const url = new URL(baseUrl);
  for (const [key, value] of Object.entries(params)) {
    if (value) {
      url.searchParams.set(key, value);
    }
  }

  return url.toString();
}

export function buildUtmParams(params: UtmParams): string {
  const searchParams = new URLSearchParams();
  for (const [key, value] of Object.entries(params)) {
    if (value) {
      searchParams.set(key, value);
    }
  }
  const str = searchParams.toString();
  return str ? `?${str}` : '';
}

export function parseUtmParams(url: string): UtmParams {
  try {
    const parsed = new URL(url);
    return {
      utm_source: parsed.searchParams.get('utm_source') ?? undefined,
      utm_medium: parsed.searchParams.get('utm_medium') ?? undefined,
      utm_campaign: parsed.searchParams.get('utm_campaign') ?? undefined,
      utm_content: parsed.searchParams.get('utm_content') ?? undefined,
      utm_term: parsed.searchParams.get('utm_term') ?? undefined,
    };
  } catch {
    return {};
  }
}

export function shortenUrl(url: string, domain: string = 'nue1.link'): string {
  // Generate a short code from the URL hash
  const hash = simpleHash(url);
  const shortCode = hash.toString(36).slice(0, 7);
  return `https://${domain}/${shortCode}`;
}

/**
 * Simple hash function for URL shortening
 * Not cryptographically secure — just for demo purposes
 */
function simpleHash(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash |= 0; // Convert to 32-bit integer
  }
  return Math.abs(hash);
}
