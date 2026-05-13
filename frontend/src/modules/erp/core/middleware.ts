import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const protectedPaths = ['/erp'];
const authPaths = ['/login', '/register', '/forgot-password'];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Check if path is protected
  const isProtected = protectedPaths.some((path) => pathname.startsWith(path));
  const isAuthPath = authPaths.some((path) => pathname.startsWith(path));

  // For now, since we use client-side auth (Zustand persist),
  // we just let all requests through. Server-side auth checks
  // would be added here when a real backend is integrated.
  return NextResponse.next();
}

export const config = {
  matcher: ['/erp/:path*', '/login', '/register', '/forgot-password'],
};
