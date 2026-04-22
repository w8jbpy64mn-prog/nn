import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isAdminRoute = pathname.startsWith('/admin');
  const isLoginRoute = pathname.startsWith('/admin/login');
  const adminToken = request.cookies.get('chef_admin_session');

  if (isAdminRoute && !isLoginRoute && !adminToken) {
    return NextResponse.redirect(new URL('/admin/login', request.url));
  }

  if (isLoginRoute && adminToken) {
    return NextResponse.redirect(new URL('/admin', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
