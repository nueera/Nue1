// ============================================================================
// Next.js Middleware — Server-side Auth Protection
// ============================================================================
// Checks for JWT token in cookies/localStorage (client-side) before
// allowing access to protected routes. Redirects to /login if not authenticated.
// ============================================================================

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const protectedPaths = ['/erp', '/crm', '/finance', '/marketing'];
const authPaths = ['/login', '/register', '/forgot-password'];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check if path is protected
  const isProtected = protectedPaths.some((path) => pathname.startsWith(path));
  const isAuthPath = authPaths.some((path) => pathname.startsWith(path));

  // Get token from cookie (set by client-side after login)
  // Note: localStorage is not accessible in middleware, so we use cookies
  const token = request.cookies.get('nueone_access_token')?.value;
  const isAuthenticated = !!token;

  // Redirect unauthenticated users to login
  if (isProtected && !isAuthenticated) {
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('callbackUrl', pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Redirect authenticated users away from auth pages
  if (isAuthPath && isAuthenticated) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  // Add security headers
  const response = NextResponse.next();
  response.headers.set('X-Frame-Options', 'SAMEORIGIN');
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');

  return response;
}

export const config = {
  matcher: [
    '/erp/:path*',
    '/crm/:path*',
    '/finance/:path*',
    '/marketing/:path*',
    '/login',
    '/register',
    '/forgot-password',
  ],
};
