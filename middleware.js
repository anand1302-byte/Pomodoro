import { NextResponse } from 'next/server';

export function middleware(request) {
  // Check if user is accessing dashboard without being logged in
  if (request.nextUrl.pathname.startsWith('/dashboard')) {
    // In a real app, you'd check for a valid JWT token
    // For this demo, we'll let the client-side handle the redirect
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*']
};