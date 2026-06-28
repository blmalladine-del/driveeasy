import { request as httpsRequest } from 'https';
import { createServerClient } from '@supabase/ssr';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

function nodeFetch(input: RequestInfo | URL, init?: RequestInit): Promise<Response> {
  let url: URL;
  if (input instanceof URL) url = new URL(input.href);
  else if (typeof input === 'string') url = new URL(input);
  else if ('url' in input) url = new URL(input.url);
  else url = new URL(String(input));

  const isHttps = url.protocol === 'https:';
  const reqFn = isHttps ? httpsRequest : httpsRequest;
  const headers: Record<string, string> = {};
  if (init?.headers) {
    const h = init.headers;
    if ('forEach' in h) {
      (h as Headers).forEach((value, key) => { headers[key] = value; });
    } else {
      const plain = h as Record<string, string>;
      for (const key of Object.keys(plain)) headers[key] = plain[key];
    }
  }

  return new Promise((resolve, reject) => {
    const req = reqFn(
      {
        hostname: url.hostname,
        port: url.port || 443,
        path: url.pathname + url.search,
        method: init?.method || 'GET',
        headers,
        rejectUnauthorized: true,
      },
      (res) => {
        const chunks: Buffer[] = [];
        res.on('data', (chunk) => chunks.push(chunk));
        res.on('end', () => {
          try {
            resolve(new Response(Buffer.concat(chunks), {
              status: res.statusCode || 200,
              statusText: res.statusMessage || '',
              headers: new Headers(res.headers as Record<string, string>),
            }));
          } catch (e) { reject(e); }
        });
        res.on('error', (e) => reject(e));
      },
    );
    req.on('error', reject);
    if (init?.body) req.write(typeof init.body === 'string' ? init.body : String(init.body));
    req.end();
  });
}

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (!pathname.startsWith('/admin') || pathname === '/admin/login') {
    return NextResponse.next();
  }

  let session: any = null;
  try {
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() { return request.cookies.getAll(); },
          setAll() {},
        },
        global: {
          fetch: nodeFetch,
        },
      },
    );

    const result = await supabase.auth.getSession();
    session = result.data?.session ?? null;
  } catch {
    return NextResponse.next();
  }

  if (!session) {
    const url = request.nextUrl.clone();
    url.pathname = '/admin/login';
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin', '/admin/:path*'],
};
