import { request as httpsRequest } from 'https';
import { request as httpRequest } from 'http';
import { createClient } from '@supabase/supabase-js';
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

const QUERY_TIMEOUT_MS = 8000;

export async function queryWithTimeout<T>(promise: PromiseLike<T>, label: string): Promise<T> {
  const timeout = new Promise<never>((_, reject) => {
    setTimeout(() => reject(new Error(`[Supabase] Query timed out: ${label}`)), QUERY_TIMEOUT_MS);
  });
  return Promise.race([promise, timeout]);
}

function nodeFetch(input: RequestInfo | URL, init?: RequestInit): Promise<Response> {
  let url: URL;
  if (input instanceof URL) {
    url = new URL(input.href);
  } else if (typeof input === 'string') {
    url = new URL(input);
  } else if ('url' in input) {
    url = new URL(input.url);
  } else {
    url = new URL(String(input));
  }

  const isHttps = url.protocol === 'https:';
  const reqFn = isHttps ? httpsRequest : httpRequest;
  const headers: Record<string, string> = {};
  if (init?.headers) {
    const h = init.headers;
    if ('forEach' in h) {
      (h as Headers).forEach((value, key) => { headers[key] = value; });
    } else {
      const plain = h as Record<string, string>;
      for (const key of Object.keys(plain)) {
        headers[key] = plain[key];
      }
    }
  }

  const controller = init?.signal;

  return new Promise((resolve, reject) => {
    const req = reqFn(
      {
        hostname: url.hostname,
        port: url.port || (isHttps ? 443 : 80),
        path: url.pathname + url.search,
        method: init?.method || 'GET',
        headers,
        rejectUnauthorized: true,
        agent: false,
      },
      (res) => {
        const chunks: Buffer[] = [];
        res.on('data', (chunk) => chunks.push(chunk));
        res.on('end', () => {
          try {
            const body = Buffer.concat(chunks);
            const response = new Response(body, {
              status: res.statusCode || 200,
              statusText: res.statusMessage || '',
              headers: new Headers(res.headers as Record<string, string>),
            });
            resolve(response);
          } catch (e) {
            reject(e);
          }
        });
        res.on('error', (e) => reject(e));
      },
    );

    req.on('error', (e) => {
      if (e.message === 'aborted') {
        reject(new DOMException('The operation was aborted', 'AbortError'));
      } else {
        reject(e);
      }
    });

    if (controller) {
      controller.addEventListener('abort', () => {
        req.destroy(new DOMException('The operation was aborted', 'AbortError'));
      });
    }

    if (init?.body) {
      req.write(typeof init.body === 'string' ? init.body : String(init.body));
    }

    req.end();
  });
}

function getEnv() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) {
    throw new Error('Missing Supabase environment variables.');
  }
  return { url, key };
}

export function getSupabaseClient() {
  const { url, key } = getEnv();

  return createClient(url, key, {
    global: {
      fetch: nodeFetch,
    },
    auth: {
      persistSession: false,
      autoRefreshToken: false,
      detectSessionInUrl: false,
    },
  });
}

export async function createAuthClient() {
  const { url, key } = getEnv();
  const cookieStore = await cookies();

  return createServerClient(url, key, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value, options }) => {
          try {
            cookieStore.set(name, value, options);
          } catch {
            // Ignore - not in a Server Action / Route Handler context
          }
        });
      },
    },
  });
}

export async function requireAdmin() {
  const supabase = await createAuthClient();

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;

  const { data: admin } = await supabase
    .from('admin_users')
    .select('*')
    .eq('id', user.id)
    .single();

  return admin ?? null;
}
