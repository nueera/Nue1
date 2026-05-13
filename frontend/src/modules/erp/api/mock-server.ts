/**
 * Simple mock server using fetch interception — no MSW dependency.
 *
 * In browser environments this intercepts `window.fetch` and returns mock
 * data for matching URLs.  On the server (SSR) it becomes a no-op.
 *
 * Usage – call once at the app entry point:
 * ```ts
 * if (process.env.NODE_ENV === 'development') {
 *   startMockServer();
 * }
 * ```
 */

let _interceptorActive = false;
let _originalFetch: typeof window.fetch | null = null;

export async function startMockServer(): Promise<void> {
  // Only runs in the browser
  if (typeof window === 'undefined') return;
  if (_interceptorActive) return;

  const { getMockResponse } = await import('./mock-handlers');
  _originalFetch = window.fetch.bind(window);

  window.fetch = async (input, init) => {
    const url = typeof input === 'string' ? input : input instanceof Request ? input.url : String(input);
    const method = init?.method || 'GET';

    const mockResponse = getMockResponse(url, method);
    if (mockResponse !== null) {
      return new Response(JSON.stringify(mockResponse), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    return _originalFetch!(input, init);
  };

  _interceptorActive = true;

  // eslint-disable-next-line no-console
  console.log(
    '%c[Mock Server] Fetch interceptor active',
    'color:#22c55e;font-weight:bold'
  );
}

/**
 * Stop the fetch interceptor (useful for HMR or testing teardown).
 */
export function stopMockServer(): void {
  if (typeof window === 'undefined' || !_interceptorActive || !_originalFetch) return;

  window.fetch = _originalFetch;
  _originalFetch = null;
  _interceptorActive = false;
}
