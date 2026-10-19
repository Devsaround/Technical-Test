import { NextResponse } from 'next/server';

// Next.js 15 no longer caches GET route handlers by default; keep this
// constant response statically rendered at build time as it was on Next.js 14.
export const dynamic = 'force-static';

export const GET = () => {
  return NextResponse.json({ message: 'pong' });
};