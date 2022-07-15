import { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  if (!req.url.includes('/api')) {
    if (
      !req.url.includes('/log-in') &&
      !req.url.includes('/create-account') &&
      !req.cookies.tweetsession
    ) {
      console.log('not allowed user');
    }
  }
}
