import { NextRequest, NextResponse } from 'next/server';

export function middleware(req: NextRequest) {
  if (!req.url.includes('/api')) {
    if (
      !req.url.includes('/log-in') &&
      !req.url.includes('/create-account') &&
      !req.cookies.tweetsession
    ) {
      return NextResponse.redirect(new URL('/log-in', req.url));
    }
    if (req.url.includes('/log-in') || req.url.includes('/create-account')) {
      if (req.cookies.tweetsession) {
        return NextResponse.redirect(new URL('/log-in', req.url));
      }
    }
  }
}
