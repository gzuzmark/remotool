import { NextFetchEvent, NextRequest, NextResponse } from 'next/server';

export async function middleware(req: NextRequest, ev: NextFetchEvent) {
  const slug = req.nextUrl.pathname.split('/').pop();

  // TODO: With new versions we maybe could remove this workaroud https://github.com/vercel/next.js/discussions/38615
  // https://github.com/vercel/next.js/discussions/35211

  if (
    req.nextUrl.pathname.startsWith('/api') || //  exclude all API routes
    req.nextUrl.pathname.startsWith('/static') || // exclude static files
    req.nextUrl.pathname.includes('.') // exclude all files in the public folder
  ) {
    return;
  }

  if (!slug) {
    return NextResponse.next();
  }

  const slugFetch = await fetch(`${req.nextUrl.origin}/api/get-url/${slug}`);
  if (slugFetch.status === 404) {
    return NextResponse.redirect(req.nextUrl.origin);
  }

  const data = await slugFetch.json();
  console.log('🚀 ~ file: middleware.ts ~ line 27 ~ middleware ~ data', data);
  if (data?.matchId) {
    return NextResponse.redirect(new URL(`/match/${data?.matchId}`, req.url));
  }
}

export const config = {
  matcher: '/:slug',
};
