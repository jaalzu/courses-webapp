import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { createServerClient } from '@supabase/ssr';

export async function proxy(request: NextRequest) { 
  
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });
  
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          );
          response = NextResponse.next({
            request,
          });
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  if (request.nextUrl.pathname === '/auth/callback') {
    return response;
  }

  await supabase.auth.getUser();
  const { data: { session } } = await supabase.auth.getSession();

  const protectedPaths = ['/dashboard', '/profile', '/faqs', '/favoritos'];
  const isProtectedPath = protectedPaths.some(path => 
    request.nextUrl.pathname.startsWith(path)
  );

  if (!session && isProtectedPath) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  if (session && request.nextUrl.pathname === '/login') {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  return response;
}

export const config = {
  matcher: [
    '/dashboard/:path*', 
    '/profile/:path*',
    '/faqs/:path*',
    '/favoritos/:path*',
    '/login',
    '/comunidad/:path*',
    '/course-access/:path*',
    '/metricas/:path*',
    '/auth/callback', 
  ],
};